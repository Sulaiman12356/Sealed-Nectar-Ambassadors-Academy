import express from 'express';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import crypto from 'crypto';
import {
  getPublicAdmissionStats,
  getAdmissionSettings,
  createApplication,
  lookupApplicationStatus,
  getAdminApplications,
  updateApplicationStatus,
  archiveApplication,
  verifyAdminLogin,
  getAllSessions,
  setActiveSession,
  updateSettings,
  getSchoolInfo,
  updateSchoolInfo,
  getPublicBlogPosts,
  getBlogPostBySlug,
  getAllAdminBlogPosts,
  createBlogPost,
  updateBlogPost,
  deleteBlogPost,
  getPublicGalleryItems,
  getAllAdminGalleryItems,
  createGalleryItem,
  updateGalleryItem,
  deleteGalleryItem,
  getActiveAnnouncements,
  getAllAdminAnnouncements,
  createAnnouncement,
  updateAnnouncement,
  deleteAnnouncement,
  getPublicStaff,
  getAllAdminStaff,
  createStaffMember,
  updateStaffMember,
  deleteStaffMember,
  getPublicProgrammes,
  getAllAdminProgrammes,
  updateProgramme,
  getMediaLibraryItems,
  addMediaLibraryItem,
  deleteMediaLibraryItem,
  createContactEnquiry,
  getAdminContactEnquiries,
  markContactEnquiryRead,
  deleteContactEnquiry,
  getAllAdminUsers,
  createAdminUser,
  getAuditLogs,
  subscribeNewsletter,
  getDashboardSummary,
} from './src/server/db.ts';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Ensure uploads directory exists
const UPLOADS_DIR = path.resolve(__dirname, 'public', 'uploads');
if (!fs.existsSync(UPLOADS_DIR)) {
  fs.mkdirSync(UPLOADS_DIR, { recursive: true });
}

// In-memory token store for admin authentication
const activeAdminTokens = new Map<string, { userId: string; username: string; role: string; fullName: string; expiresAt: number }>();

function generateAdminToken(user: { id: string; username: string; role: string; fullName: string }) {
  const token = crypto.randomBytes(32).toString('hex');
  const expiresAt = Date.now() + 24 * 60 * 60 * 1000; // 24 hours
  activeAdminTokens.set(token, {
    userId: user.id,
    username: user.username,
    role: user.role,
    fullName: user.fullName,
    expiresAt,
  });
  return token;
}

function requireAdminAuth(req: express.Request, res: express.Response, next: express.NextFunction) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Unauthorized: Admin authentication token required' });
  }

  const token = authHeader.split(' ')[1];
  const session = activeAdminTokens.get(token);

  if (!session || session.expiresAt < Date.now()) {
    if (session) activeAdminTokens.delete(token);
    return res.status(401).json({ error: 'Unauthorized: Session expired or invalid' });
  }

  (req as any).adminUser = session;
  next();
}

// Role-based authorization checker
function requireRole(allowedRoles: string[]) {
  return (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const admin = (req as any).adminUser;
    if (!admin) {
      return res.status(401).json({ error: 'Unauthorized' });
    }
    if (admin.role === 'super_admin' || allowedRoles.includes(admin.role)) {
      return next();
    }
    return res.status(403).json({ error: 'Forbidden: You do not have permission to perform this action' });
  };
}

// Input sanitizer helper for HTML & strings
function sanitizeHtmlContent(html: string): string {
  if (!html) return '';
  return html
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/on\w+="[^"]*"/g, '')
    .replace(/on\w+='[^']*'/g, '')
    .replace(/javascript:/gi, '');
}

async function startServer() {
  const app = express();
  const PORT = process.env.PORT || 3000;

  app.use(express.json({ limit: '15mb' }));
  app.use(express.urlencoded({ extended: true, limit: '15mb' }));

  // -------------------------------------------------------------
  // Public APIs (No Admin Auth Required)
  // -------------------------------------------------------------

  // School profile / information
  app.get('/api/public/school-info', (_req, res) => {
    try {
      const info = getSchoolInfo();
      res.json(info);
    } catch (err: any) {
      console.error('Error fetching school info:', err);
      res.status(500).json({ error: 'Failed to retrieve school information' });
    }
  });

  // Admission stats
  app.get('/api/public/admission-stats', (_req, res) => {
    try {
      const stats = getPublicAdmissionStats();
      res.json(stats);
    } catch (err: any) {
      console.error('Error fetching admission stats:', err);
      res.status(500).json({ error: 'Failed to retrieve admission statistics' });
    }
  });

  // Admission submit
  app.post('/api/admissions/apply', (req, res) => {
    try {
      const {
        firstName,
        lastName,
        dateOfBirth,
        gender,
        classAppliedFor,
        guardianFullName,
        guardianRelationship,
        guardianPhone,
      } = req.body;

      if (
        !firstName?.trim() ||
        !lastName?.trim() ||
        !dateOfBirth ||
        !gender ||
        !classAppliedFor ||
        !guardianFullName?.trim() ||
        !guardianRelationship?.trim() ||
        !guardianPhone?.trim()
      ) {
        return res.status(400).json({
          error: 'Please complete all required fields (Student names, DOB, Class, Guardian name, Relationship, Phone).',
        });
      }

      const application = createApplication(req.body);
      res.status(201).json({
        success: true,
        application,
      });
    } catch (err: any) {
      if (err.code === 'DUPLICATE_APPLICATION') {
        return res.status(409).json({
          error: err.message,
          existingReference: err.existingReference,
        });
      }
      console.error('Error creating application:', err);
      res.status(500).json({ error: 'Unable to submit application due to a server error. Please try again.' });
    }
  });

  // Admission status lookup
  app.post('/api/admissions/status-lookup', (req, res) => {
    try {
      const { referenceNumber, verification } = req.body;
      if (!referenceNumber?.trim() || !verification?.trim()) {
        return res.status(400).json({ error: 'Application Reference Number and contact phone/email are required.' });
      }

      const result = lookupApplicationStatus(referenceNumber, verification);
      if (!result) {
        return res.status(404).json({ error: 'No application found with this reference number.' });
      }
      if ('error' in result) {
        return res.status(403).json({ error: result.error });
      }

      res.json(result);
    } catch (err: any) {
      console.error('Error looking up application status:', err);
      res.status(500).json({ error: 'Unable to verify status. Please try again.' });
    }
  });

  // Public Blog Posts
  app.get('/api/public/blog', (req, res) => {
    try {
      const { category, search, page, limit } = req.query;
      const data = getPublicBlogPosts({
        category: category as string,
        search: search as string,
        page: page ? parseInt(page as string, 10) : 1,
        limit: limit ? parseInt(limit as string, 10) : 12,
      });
      res.json(data);
    } catch (err: any) {
      console.error('Error fetching blog posts:', err);
      res.status(500).json({ error: 'Failed to retrieve blog posts' });
    }
  });

  app.get('/api/public/blog/:slug', (req, res) => {
    try {
      const post = getBlogPostBySlug(req.params.slug);
      if (!post) return res.status(404).json({ error: 'Blog post not found' });
      res.json(post);
    } catch (err: any) {
      console.error('Error fetching blog post:', err);
      res.status(500).json({ error: 'Failed to retrieve blog post' });
    }
  });

  // Public Campus Gallery
  app.get('/api/public/gallery', (req, res) => {
    try {
      const { category } = req.query;
      const items = getPublicGalleryItems(category as string);
      res.json(items);
    } catch (err: any) {
      console.error('Error fetching gallery:', err);
      res.status(500).json({ error: 'Failed to retrieve gallery items' });
    }
  });

  // Public Announcements
  app.get('/api/public/announcements', (_req, res) => {
    try {
      const items = getActiveAnnouncements();
      res.json(items);
    } catch (err: any) {
      console.error('Error fetching announcements:', err);
      res.status(500).json({ error: 'Failed to retrieve announcements' });
    }
  });

  // Public Staff
  app.get('/api/public/staff', (_req, res) => {
    try {
      const staff = getPublicStaff();
      res.json(staff);
    } catch (err: any) {
      console.error('Error fetching staff:', err);
      res.status(500).json({ error: 'Failed to retrieve staff profiles' });
    }
  });

  // Public Programmes
  app.get('/api/public/programmes', (_req, res) => {
    try {
      const programmes = getPublicProgrammes();
      res.json(programmes);
    } catch (err: any) {
      console.error('Error fetching programmes:', err);
      res.status(500).json({ error: 'Failed to retrieve academic programmes' });
    }
  });

  // Public Contact Form Enquiry
  app.post('/api/public/contact', (req, res) => {
    try {
      const { fullName, email, phone, subject, message } = req.body;
      if (!fullName?.trim() || !email?.trim() || !phone?.trim() || !subject?.trim() || !message?.trim()) {
        return res.status(400).json({ error: 'Please complete all required fields (Full name, email, phone, subject, message).' });
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email.trim())) {
        return res.status(400).json({ error: 'Please provide a valid email address.' });
      }

      const enquiry = createContactEnquiry({
        fullName: sanitizeHtmlContent(fullName),
        email: email.trim().toLowerCase(),
        phone: sanitizeHtmlContent(phone),
        subject: sanitizeHtmlContent(subject),
        message: sanitizeHtmlContent(message),
      });

      res.status(201).json({ success: true, enquiryId: enquiry.id });
    } catch (err: any) {
      console.error('Error saving contact enquiry:', err);
      res.status(500).json({ error: 'Unable to submit enquiry. Please try again.' });
    }
  });

  // Public Newsletter subscription
  app.post('/api/public/newsletter', (req, res) => {
    try {
      const { email } = req.body;
      if (!email || !email.includes('@')) {
        return res.status(400).json({ error: 'Valid email address required.' });
      }
      const result = subscribeNewsletter(email);
      res.json(result);
    } catch (err: any) {
      console.error('Newsletter error:', err);
      res.status(500).json({ error: 'Failed to register newsletter subscription' });
    }
  });

  // -------------------------------------------------------------
  // Admin Authentication Endpoints
  // -------------------------------------------------------------

  app.post('/api/admin/login', (req, res) => {
    try {
      const { username, password } = req.body;
      if (!username || !password) {
        return res.status(400).json({ error: 'Username and password required.' });
      }

      const user = verifyAdminLogin(username, password);
      if (!user) {
        return res.status(401).json({ error: 'Invalid administrator credentials.' });
      }

      const token = generateAdminToken(user);
      res.json({
        token,
        user: {
          id: user.id,
          username: user.username,
          fullName: user.fullName,
          role: user.role,
        },
      });
    } catch (err: any) {
      console.error('Login error:', err);
      res.status(500).json({ error: 'Internal login error.' });
    }
  });

  app.get('/api/admin/me', requireAdminAuth, (req, res) => {
    const admin = (req as any).adminUser;
    res.json({ authenticated: true, user: admin });
  });

  // Dashboard Overview Summary
  app.get('/api/admin/dashboard-summary', requireAdminAuth, (_req, res) => {
    try {
      const summary = getDashboardSummary();
      res.json(summary);
    } catch (err: any) {
      console.error('Dashboard summary error:', err);
      res.status(500).json({ error: 'Failed to retrieve dashboard summary' });
    }
  });

  // -------------------------------------------------------------
  // Admin Admissions & Applicants
  // -------------------------------------------------------------

  app.get('/api/admin/applications', requireAdminAuth, requireRole(['admissions_officer', 'super_admin']), (req, res) => {
    try {
      const { search, status, classApplied, sessionId, includeArchived } = req.query;
      const data = getAdminApplications({
        search: search as string,
        status: status as string,
        classApplied: classApplied as string,
        sessionId: sessionId as string,
        includeArchived: includeArchived === 'true',
      });
      res.json(data);
    } catch (err: any) {
      console.error('Error fetching admin applications:', err);
      res.status(500).json({ error: 'Failed to retrieve applications.' });
    }
  });

  app.patch('/api/admin/applications/:id/status', requireAdminAuth, requireRole(['admissions_officer', 'super_admin']), (req, res) => {
    try {
      const { id } = req.params;
      const { status, adminNotes } = req.body;
      const admin = (req as any).adminUser;

      if (!status) {
        return res.status(400).json({ error: 'New status is required.' });
      }

      const validStatuses = ['Submitted', 'Under Review', 'Shortlisted', 'Interview', 'Accepted', 'Declined', 'Enrolled'];
      if (!validStatuses.includes(status)) {
        return res.status(400).json({ error: 'Invalid application status provided.' });
      }

      const updated = updateApplicationStatus(id, status, adminNotes, admin.username);
      res.json({ success: true, application: updated });
    } catch (err: any) {
      console.error('Error updating application status:', err);
      res.status(500).json({ error: 'Failed to update application status.' });
    }
  });

  app.post('/api/admin/applications/:id/archive', requireAdminAuth, requireRole(['admissions_officer', 'super_admin']), (req, res) => {
    try {
      const { id } = req.params;
      const admin = (req as any).adminUser;
      archiveApplication(id, admin.username);
      res.json({ success: true, message: 'Application safely archived.' });
    } catch (err: any) {
      console.error('Error archiving application:', err);
      res.status(500).json({ error: 'Failed to archive application.' });
    }
  });

  // Admission Settings
  app.get('/api/admin/settings', requireAdminAuth, requireRole(['admissions_officer', 'super_admin']), (_req, res) => {
    try {
      const settings = getAdmissionSettings();
      const sessions = getAllSessions();
      res.json({ settings, sessions });
    } catch (err: any) {
      console.error('Error fetching admin settings:', err);
      res.status(500).json({ error: 'Failed to retrieve settings.' });
    }
  });

  app.post('/api/admin/settings', requireAdminAuth, requireRole(['super_admin', 'admissions_officer']), (req, res) => {
    try {
      const admin = (req as any).adminUser;
      const updated = updateSettings(req.body, admin.username);
      res.json({ success: true, settings: updated });
    } catch (err: any) {
      console.error('Error updating settings:', err);
      res.status(500).json({ error: 'Failed to update settings.' });
    }
  });

  app.post('/api/admin/session/activate', requireAdminAuth, requireRole(['super_admin']), (req, res) => {
    try {
      const { sessionId } = req.body;
      const admin = (req as any).adminUser;
      if (!sessionId) return res.status(400).json({ error: 'Session ID is required.' });
      setActiveSession(sessionId, admin.username);
      res.json({ success: true });
    } catch (err: any) {
      console.error('Error activating session:', err);
      res.status(500).json({ error: 'Failed to activate session.' });
    }
  });

  // -------------------------------------------------------------
  // School Information CMS
  // -------------------------------------------------------------

  app.get('/api/admin/school-info', requireAdminAuth, (_req, res) => {
    try {
      const info = getSchoolInfo();
      res.json(info);
    } catch (err: any) {
      console.error('Error fetching school info:', err);
      res.status(500).json({ error: 'Failed to fetch school information' });
    }
  });

  app.post('/api/admin/school-info', requireAdminAuth, requireRole(['super_admin']), (req, res) => {
    try {
      const admin = (req as any).adminUser;
      const updated = updateSchoolInfo(req.body, admin.username);
      res.json({ success: true, schoolInfo: updated });
    } catch (err: any) {
      console.error('Error updating school info:', err);
      res.status(500).json({ error: 'Failed to update school information' });
    }
  });

  // -------------------------------------------------------------
  // Blog CMS Endpoints
  // -------------------------------------------------------------

  app.get('/api/admin/blog', requireAdminAuth, requireRole(['content_editor', 'super_admin']), (_req, res) => {
    try {
      const posts = getAllAdminBlogPosts();
      res.json(posts);
    } catch (err: any) {
      console.error('Error fetching blog posts:', err);
      res.status(500).json({ error: 'Failed to fetch posts' });
    }
  });

  app.post('/api/admin/blog', requireAdminAuth, requireRole(['content_editor', 'super_admin']), (req, res) => {
    try {
      const admin = (req as any).adminUser;
      const { title, excerpt, content } = req.body;
      if (!title?.trim() || !excerpt?.trim() || !content?.trim()) {
        return res.status(400).json({ error: 'Title, excerpt, and content are required.' });
      }

      req.body.content = sanitizeHtmlContent(content);
      const post = createBlogPost(req.body, admin.username);
      res.status(201).json({ success: true, post });
    } catch (err: any) {
      console.error('Error creating blog post:', err);
      res.status(500).json({ error: 'Failed to create blog post' });
    }
  });

  app.put('/api/admin/blog/:id', requireAdminAuth, requireRole(['content_editor', 'super_admin']), (req, res) => {
    try {
      const admin = (req as any).adminUser;
      if (req.body.content) {
        req.body.content = sanitizeHtmlContent(req.body.content);
      }
      const post = updateBlogPost(req.params.id, req.body, admin.username);
      res.json({ success: true, post });
    } catch (err: any) {
      console.error('Error updating blog post:', err);
      res.status(500).json({ error: 'Failed to update blog post' });
    }
  });

  app.delete('/api/admin/blog/:id', requireAdminAuth, requireRole(['super_admin', 'content_editor']), (req, res) => {
    try {
      const admin = (req as any).adminUser;
      deleteBlogPost(req.params.id, admin.username);
      res.json({ success: true });
    } catch (err: any) {
      console.error('Error deleting blog post:', err);
      res.status(500).json({ error: 'Failed to delete blog post' });
    }
  });

  // -------------------------------------------------------------
  // Campus Gallery CMS Endpoints
  // -------------------------------------------------------------

  app.get('/api/admin/gallery', requireAdminAuth, requireRole(['content_editor', 'super_admin']), (_req, res) => {
    try {
      const items = getAllAdminGalleryItems();
      res.json(items);
    } catch (err: any) {
      console.error('Error fetching gallery:', err);
      res.status(500).json({ error: 'Failed to fetch gallery' });
    }
  });

  app.post('/api/admin/gallery', requireAdminAuth, requireRole(['content_editor', 'super_admin']), (req, res) => {
    try {
      const admin = (req as any).adminUser;
      const { title, src } = req.body;
      if (!title || !src) return res.status(400).json({ error: 'Title and image URL are required.' });
      const item = createGalleryItem(req.body, admin.username);
      res.status(201).json({ success: true, item });
    } catch (err: any) {
      console.error('Error adding gallery item:', err);
      res.status(500).json({ error: 'Failed to add gallery item' });
    }
  });

  app.put('/api/admin/gallery/:id', requireAdminAuth, requireRole(['content_editor', 'super_admin']), (req, res) => {
    try {
      const admin = (req as any).adminUser;
      const item = updateGalleryItem(req.params.id, req.body, admin.username);
      res.json({ success: true, item });
    } catch (err: any) {
      console.error('Error updating gallery item:', err);
      res.status(500).json({ error: 'Failed to update gallery item' });
    }
  });

  app.delete('/api/admin/gallery/:id', requireAdminAuth, requireRole(['super_admin', 'content_editor']), (req, res) => {
    try {
      const admin = (req as any).adminUser;
      deleteGalleryItem(req.params.id, admin.username);
      res.json({ success: true });
    } catch (err: any) {
      console.error('Error deleting gallery item:', err);
      res.status(500).json({ error: 'Failed to delete gallery item' });
    }
  });

  // -------------------------------------------------------------
  // Announcements CMS Endpoints
  // -------------------------------------------------------------

  app.get('/api/admin/announcements', requireAdminAuth, requireRole(['content_editor', 'super_admin']), (_req, res) => {
    try {
      const items = getAllAdminAnnouncements();
      res.json(items);
    } catch (err: any) {
      console.error('Error fetching announcements:', err);
      res.status(500).json({ error: 'Failed to fetch announcements' });
    }
  });

  app.post('/api/admin/announcements', requireAdminAuth, requireRole(['content_editor', 'super_admin']), (req, res) => {
    try {
      const admin = (req as any).adminUser;
      const { title, message } = req.body;
      if (!title || !message) return res.status(400).json({ error: 'Title and message are required.' });
      const item = createAnnouncement(req.body, admin.username);
      res.status(201).json({ success: true, item });
    } catch (err: any) {
      console.error('Error adding announcement:', err);
      res.status(500).json({ error: 'Failed to add announcement' });
    }
  });

  app.put('/api/admin/announcements/:id', requireAdminAuth, requireRole(['content_editor', 'super_admin']), (req, res) => {
    try {
      const admin = (req as any).adminUser;
      const item = updateAnnouncement(req.params.id, req.body, admin.username);
      res.json({ success: true, item });
    } catch (err: any) {
      console.error('Error updating announcement:', err);
      res.status(500).json({ error: 'Failed to update announcement' });
    }
  });

  app.delete('/api/admin/announcements/:id', requireAdminAuth, requireRole(['super_admin', 'content_editor']), (req, res) => {
    try {
      const admin = (req as any).adminUser;
      deleteAnnouncement(req.params.id, admin.username);
      res.json({ success: true });
    } catch (err: any) {
      console.error('Error deleting announcement:', err);
      res.status(500).json({ error: 'Failed to delete announcement' });
    }
  });

  // -------------------------------------------------------------
  // Staff Profiles CMS Endpoints
  // -------------------------------------------------------------

  app.get('/api/admin/staff', requireAdminAuth, requireRole(['super_admin', 'content_editor']), (_req, res) => {
    try {
      const staff = getAllAdminStaff();
      res.json(staff);
    } catch (err: any) {
      console.error('Error fetching staff:', err);
      res.status(500).json({ error: 'Failed to fetch staff' });
    }
  });

  app.post('/api/admin/staff', requireAdminAuth, requireRole(['super_admin']), (req, res) => {
    try {
      const admin = (req as any).adminUser;
      const { name, position } = req.body;
      if (!name || !position) return res.status(400).json({ error: 'Staff name and position are required.' });
      const item = createStaffMember(req.body, admin.username);
      res.status(201).json({ success: true, item });
    } catch (err: any) {
      console.error('Error adding staff member:', err);
      res.status(500).json({ error: 'Failed to add staff member' });
    }
  });

  app.put('/api/admin/staff/:id', requireAdminAuth, requireRole(['super_admin']), (req, res) => {
    try {
      const admin = (req as any).adminUser;
      const item = updateStaffMember(req.params.id, req.body, admin.username);
      res.json({ success: true, item });
    } catch (err: any) {
      console.error('Error updating staff member:', err);
      res.status(500).json({ error: 'Failed to update staff member' });
    }
  });

  app.delete('/api/admin/staff/:id', requireAdminAuth, requireRole(['super_admin']), (req, res) => {
    try {
      const admin = (req as any).adminUser;
      deleteStaffMember(req.params.id, admin.username);
      res.json({ success: true });
    } catch (err: any) {
      console.error('Error deleting staff member:', err);
      res.status(500).json({ error: 'Failed to delete staff member' });
    }
  });

  // -------------------------------------------------------------
  // Academic Programmes CMS Endpoints
  // -------------------------------------------------------------

  app.get('/api/admin/programmes', requireAdminAuth, (_req, res) => {
    try {
      const programmes = getAllAdminProgrammes();
      res.json(programmes);
    } catch (err: any) {
      console.error('Error fetching programmes:', err);
      res.status(500).json({ error: 'Failed to fetch programmes' });
    }
  });

  app.put('/api/admin/programmes/:id', requireAdminAuth, requireRole(['super_admin']), (req, res) => {
    try {
      const admin = (req as any).adminUser;
      const updated = updateProgramme(req.params.id, req.body, admin.username);
      res.json({ success: true, programme: updated });
    } catch (err: any) {
      console.error('Error updating programme:', err);
      res.status(500).json({ error: 'Failed to update programme' });
    }
  });

  // -------------------------------------------------------------
  // Media Library & File Uploads Endpoints
  // -------------------------------------------------------------

  app.get('/api/admin/media', requireAdminAuth, (req, res) => {
    try {
      const { category } = req.query;
      const items = getMediaLibraryItems(category as string);
      res.json(items);
    } catch (err: any) {
      console.error('Error fetching media:', err);
      res.status(500).json({ error: 'Failed to fetch media library' });
    }
  });

  // Secure base64 file upload endpoint
  app.post('/api/admin/media/upload', requireAdminAuth, (req, res) => {
    try {
      const admin = (req as any).adminUser;
      const { base64Data, filename, category, altText } = req.body;

      if (!base64Data || !filename) {
        return res.status(400).json({ error: 'File data and filename are required.' });
      }

      // Validate file extension
      const ext = path.extname(filename).toLowerCase();
      const allowedExts = ['.jpg', '.jpeg', '.png', '.webp', '.pdf', '.mp4'];
      if (!allowedExts.includes(ext)) {
        return res.status(400).json({ error: 'Invalid file format. Allowed: JPG, PNG, WEBP, PDF, MP4' });
      }

      // Check mime type
      const mimeMatches = base64Data.match(/^data:([a-zA-Z0-9]+\/[a-zA-Z0-9-.+]+);base64,/);
      const mimeType = mimeMatches ? mimeMatches[1] : 'application/octet-stream';
      const cleanBase64 = base64Data.replace(/^data:([a-zA-Z0-9]+\/[a-zA-Z0-9-.+]+);base64,/, '');

      const buffer = Buffer.from(cleanBase64, 'base64');
      if (buffer.length > 10 * 1024 * 1024) {
        return res.status(400).json({ error: 'File size exceeds maximum allowed limit (10MB).' });
      }

      const safeBaseName = path.basename(filename, ext).replace(/[^a-zA-Z0-9-_]/g, '_');
      const uniqueFilename = `${safeBaseName}_${Date.now()}${ext}`;
      const filePath = path.join(UPLOADS_DIR, uniqueFilename);

      fs.writeFileSync(filePath, buffer);

      const publicUrl = `/uploads/${uniqueFilename}`;
      const mediaItem = addMediaLibraryItem(
        {
          filename: uniqueFilename,
          originalName: filename,
          url: publicUrl,
          mimeType,
          sizeBytes: buffer.length,
          category: category || 'Campus',
          altText: altText || filename,
        },
        admin.username
      );

      res.status(201).json({ success: true, item: mediaItem });
    } catch (err: any) {
      console.error('File upload error:', err);
      res.status(500).json({ error: 'File upload failed.' });
    }
  });

  app.delete('/api/admin/media/:id', requireAdminAuth, requireRole(['super_admin']), (req, res) => {
    try {
      const admin = (req as any).adminUser;
      deleteMediaLibraryItem(req.params.id, admin.username);
      res.json({ success: true });
    } catch (err: any) {
      console.error('Error deleting media:', err);
      res.status(500).json({ error: 'Failed to delete media item' });
    }
  });

  // -------------------------------------------------------------
  // Contact Enquiries CMS
  // -------------------------------------------------------------

  app.get('/api/admin/enquiries', requireAdminAuth, requireRole(['super_admin', 'admissions_officer']), (_req, res) => {
    try {
      const enquiries = getAdminContactEnquiries();
      res.json(enquiries);
    } catch (err: any) {
      console.error('Error fetching enquiries:', err);
      res.status(500).json({ error: 'Failed to fetch contact enquiries' });
    }
  });

  app.patch('/api/admin/enquiries/:id/read', requireAdminAuth, requireRole(['super_admin', 'admissions_officer']), (req, res) => {
    try {
      markContactEnquiryRead(req.params.id);
      res.json({ success: true });
    } catch (err: any) {
      console.error('Error marking enquiry read:', err);
      res.status(500).json({ error: 'Failed to mark enquiry as read' });
    }
  });

  app.delete('/api/admin/enquiries/:id', requireAdminAuth, requireRole(['super_admin']), (req, res) => {
    try {
      const admin = (req as any).adminUser;
      deleteContactEnquiry(req.params.id, admin.username);
      res.json({ success: true });
    } catch (err: any) {
      console.error('Error deleting enquiry:', err);
      res.status(500).json({ error: 'Failed to delete enquiry' });
    }
  });

  // -------------------------------------------------------------
  // Audit Logs & Admin User Management
  // -------------------------------------------------------------

  app.get('/api/admin/audit-logs', requireAdminAuth, requireRole(['super_admin']), (_req, res) => {
    try {
      const logs = getAuditLogs(100);
      res.json(logs);
    } catch (err: any) {
      console.error('Error fetching audit logs:', err);
      res.status(500).json({ error: 'Failed to fetch audit logs' });
    }
  });

  app.get('/api/admin/users', requireAdminAuth, requireRole(['super_admin']), (_req, res) => {
    try {
      const users = getAllAdminUsers();
      res.json(users);
    } catch (err: any) {
      console.error('Error fetching admin users:', err);
      res.status(500).json({ error: 'Failed to fetch admin users' });
    }
  });

  app.post('/api/admin/users', requireAdminAuth, requireRole(['super_admin']), (req, res) => {
    try {
      const admin = (req as any).adminUser;
      const { username, password, role, fullName } = req.body;
      if (!username || !password || !role || !fullName) {
        return res.status(400).json({ error: 'All fields (username, password, role, full name) are required.' });
      }
      const user = createAdminUser({ username, password, role, fullName }, admin.username);
      res.status(201).json({ success: true, user });
    } catch (err: any) {
      console.error('Error creating admin user:', err);
      res.status(500).json({ error: 'Failed to create user or username already exists' });
    }
  });

  // Serve static assets from public directory
  app.use(express.static(path.resolve(__dirname, 'public')));

  // --- Vite Dev Server Middleware or Static Production Serving ---
  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  } else {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  }

  app.listen(Number(PORT), '0.0.0.0', () => {
    console.log(`Sealed Nectar Ambassadors Academy portal running on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start server:', err);
});
