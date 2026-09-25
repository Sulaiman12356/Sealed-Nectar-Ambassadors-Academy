import type { VercelRequest, VercelResponse } from '@vercel/node';
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
} from '../src/server/db.js';
import crypto from 'crypto';

// In-memory token store (works per Lambda container instance)
const activeAdminTokens = new Map<string, { userId: string; username: string; role: string; fullName: string; expiresAt: number }>();

function generateAdminToken(user: { id: string; username: string; role: string; fullName: string }) {
  const token = crypto.randomBytes(32).toString('hex');
  const expiresAt = Date.now() + 24 * 60 * 60 * 1000;
  activeAdminTokens.set(token, {
    userId: user.id,
    username: user.username,
    role: user.role,
    fullName: user.fullName,
    expiresAt,
  });
  return token;
}

function checkAdminAuth(req: VercelRequest) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) return null;
  const token = authHeader.split(' ')[1];
  const session = activeAdminTokens.get(token);
  if (!session || session.expiresAt < Date.now()) return null;
  return session;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Extract path after /api/
  const url = new URL(req.url || '', `http://${req.headers.host || 'localhost'}`);
  const pathname = url.pathname;
  const method = req.method?.toUpperCase();

  // Public: School Info
  if (pathname === '/api/public/school-info' && method === 'GET') {
    try {
      return res.status(200).json(getSchoolInfo());
    } catch (e: any) {
      return res.status(500).json({ error: e.message });
    }
  }

  // Public: Admission Stats
  if (pathname === '/api/public/admission-stats' && method === 'GET') {
    try {
      return res.status(200).json(getPublicAdmissionStats());
    } catch (e: any) {
      return res.status(500).json({ error: e.message });
    }
  }

  // Public: Apply for Admission
  if (pathname === '/api/admissions/apply' && method === 'POST') {
    try {
      const application = createApplication(req.body);
      return res.status(201).json({ success: true, application });
    } catch (e: any) {
      if (e.code === 'DUPLICATE_APPLICATION') {
        return res.status(409).json({ error: e.message, existingReference: e.existingReference });
      }
      return res.status(500).json({ error: e.message || 'Submission error' });
    }
  }

  // Public: Status Lookup
  if (pathname === '/api/admissions/status-lookup' && method === 'POST') {
    try {
      const { referenceNumber, verification } = req.body;
      const result = lookupApplicationStatus(referenceNumber, verification);
      if (!result) return res.status(404).json({ error: 'No application found.' });
      if ('error' in result) return res.status(403).json({ error: result.error });
      return res.status(200).json(result);
    } catch (e: any) {
      return res.status(500).json({ error: e.message });
    }
  }

  // Public: Blog
  if (pathname === '/api/public/blog' && method === 'GET') {
    try {
      const { category, search, page, limit } = req.query;
      const data = getPublicBlogPosts({
        category: category as string,
        search: search as string,
        page: page ? parseInt(page as string, 10) : 1,
        limit: limit ? parseInt(limit as string, 10) : 12,
      });
      return res.status(200).json(data);
    } catch (e: any) {
      return res.status(500).json({ error: e.message });
    }
  }

  if (pathname.startsWith('/api/public/blog/') && method === 'GET') {
    const slug = pathname.replace('/api/public/blog/', '');
    try {
      const post = getBlogPostBySlug(slug);
      if (!post) return res.status(404).json({ error: 'Post not found' });
      return res.status(200).json(post);
    } catch (e: any) {
      return res.status(500).json({ error: e.message });
    }
  }

  // Public: Gallery
  if (pathname === '/api/public/gallery' && method === 'GET') {
    try {
      const { category } = req.query;
      return res.status(200).json(getPublicGalleryItems(category as string));
    } catch (e: any) {
      return res.status(500).json({ error: e.message });
    }
  }

  // Public: Announcements
  if (pathname === '/api/public/announcements' && method === 'GET') {
    try {
      return res.status(200).json(getActiveAnnouncements());
    } catch (e: any) {
      return res.status(500).json({ error: e.message });
    }
  }

  // Public: Staff
  if (pathname === '/api/public/staff' && method === 'GET') {
    try {
      return res.status(200).json(getPublicStaff());
    } catch (e: any) {
      return res.status(500).json({ error: e.message });
    }
  }

  // Public: Programmes
  if (pathname === '/api/public/programmes' && method === 'GET') {
    try {
      return res.status(200).json(getPublicProgrammes());
    } catch (e: any) {
      return res.status(500).json({ error: e.message });
    }
  }

  // Public: Contact Form
  if (pathname === '/api/public/contact' && method === 'POST') {
    try {
      const result = createContactEnquiry(req.body);
      return res.status(201).json(result);
    } catch (e: any) {
      return res.status(500).json({ error: e.message });
    }
  }

  // Public: Newsletter
  if (pathname === '/api/public/newsletter' && method === 'POST') {
    try {
      return res.status(200).json(subscribeNewsletter(req.body.email));
    } catch (e: any) {
      return res.status(500).json({ error: e.message });
    }
  }

  // Admin: Login
  if (pathname === '/api/admin/login' && method === 'POST') {
    try {
      const { username, password } = req.body;
      const user = verifyAdminLogin(username, password);
      if (!user) return res.status(401).json({ error: 'Invalid administrator credentials.' });
      const token = generateAdminToken(user);
      return res.status(200).json({ token, user });
    } catch (e: any) {
      return res.status(500).json({ error: e.message });
    }
  }

  // Admin Authenticated Routes
  const admin = checkAdminAuth(req);
  if (!admin) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  if (pathname === '/api/admin/me') {
    return res.status(200).json({ authenticated: true, user: admin });
  }

  if (pathname === '/api/admin/dashboard-summary') {
    return res.status(200).json(getDashboardSummary());
  }

  if (pathname === '/api/admin/applications') {
    return res.status(200).json(getAdminApplications(req.query as any));
  }

  if (pathname === '/api/admin/blog') {
    if (method === 'GET') return res.status(200).json(getAllAdminBlogPosts());
    if (method === 'POST') return res.status(201).json(createBlogPost(req.body, admin.username));
  }

  if (pathname === '/api/admin/gallery') {
    if (method === 'GET') return res.status(200).json(getAllAdminGalleryItems());
    if (method === 'POST') return res.status(201).json(createGalleryItem(req.body, admin.username));
  }

  if (pathname === '/api/admin/announcements') {
    if (method === 'GET') return res.status(200).json(getAllAdminAnnouncements());
    if (method === 'POST') return res.status(201).json(createAnnouncement(req.body, admin.username));
  }

  if (pathname === '/api/admin/staff') {
    if (method === 'GET') return res.status(200).json(getAllAdminStaff());
    if (method === 'POST') return res.status(201).json(createStaffMember(req.body, admin.username));
  }

  if (pathname === '/api/admin/school-info') {
    if (method === 'GET') return res.status(200).json(getSchoolInfo());
    if (method === 'POST') return res.status(200).json(updateSchoolInfo(req.body, admin.username));
  }

  if (pathname === '/api/admin/settings') {
    if (method === 'GET') {
      return res.status(200).json({ settings: getAdmissionSettings(), sessions: getAllSessions() });
    }
    if (method === 'POST') {
      return res.status(200).json(updateSettings(req.body, admin.username));
    }
  }

  if (pathname === '/api/admin/media') {
    if (method === 'GET') return res.status(200).json(getMediaLibraryItems(req.query.category as string));
  }

  if (pathname === '/api/admin/enquiries') {
    if (method === 'GET') return res.status(200).json(getAdminContactEnquiries());
  }

  if (pathname === '/api/admin/audit-logs') {
    return res.status(200).json(getAuditLogs(100));
  }

  if (pathname === '/api/admin/users') {
    if (method === 'GET') return res.status(200).json(getAllAdminUsers());
    if (method === 'POST') return res.status(201).json(createAdminUser(req.body, admin.username));
  }

  return res.status(404).json({ error: 'Endpoint not found' });
}
