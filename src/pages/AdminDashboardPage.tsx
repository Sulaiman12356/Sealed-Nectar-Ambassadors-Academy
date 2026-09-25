import React, { useState, useEffect } from 'react';
import {
  LayoutDashboard,
  Users,
  GraduationCap,
  BookOpen,
  Bell,
  Image,
  Info,
  Layers,
  UserCheck,
  Settings,
  FolderOpen,
  Shield,
  History,
  LogOut,
  Menu,
  X,
  Search,
  Plus,
  Trash2,
  Edit,
  Save,
  CheckCircle2,
  AlertCircle,
  FileSpreadsheet,
  Printer,
  Eye,
  Mail,
  Phone,
  Calendar,
  Lock,
  RefreshCw,
  ExternalLink,
  ChevronRight,
  Upload,
  Globe,
  Archive
} from 'lucide-react';
import { SchoolCrest } from '../components/common/SchoolCrest';

interface AdminDashboardPageProps {
  onNavigate: (path: string) => void;
}

type TabType =
  | 'overview'
  | 'admissions'
  | 'students'
  | 'blog'
  | 'announcements'
  | 'gallery'
  | 'school_info'
  | 'programmes'
  | 'staff'
  | 'admission_settings'
  | 'media'
  | 'users'
  | 'audit'
  | 'enquiries';

export const AdminDashboardPage: React.FC<AdminDashboardPageProps> = ({ onNavigate }) => {
  // Authentication
  const [token, setToken] = useState<string | null>(() => sessionStorage.getItem('snaa_admin_token'));
  const [adminUser, setAdminUser] = useState<any>(null);

  // Login form
  const [usernameInput, setUsernameInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [loginError, setLoginError] = useState<string | null>(null);
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);

  // Active Tab
  const [activeTab, setActiveTab] = useState<TabType>('overview');
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  // Overview Summary Counts
  const [summary, setSummary] = useState<any>({
    totalApplications: 0,
    applicationsThisSession: 0,
    pendingApplications: 0,
    acceptedApplications: 0,
    publishedBlogPosts: 0,
    campusGalleryItems: 0,
    announcements: 0,
    unreadEnquiries: 0,
    activeSession: '2026/2027',
  });

  // State data for tabs
  const [applications, setApplications] = useState<any[]>([]);
  const [appSearch, setAppSearch] = useState('');
  const [appStatusFilter, setAppStatusFilter] = useState('all');
  const [selectedApp, setSelectedApp] = useState<any | null>(null);
  const [newStatus, setNewStatus] = useState('');
  const [adminNotes, setAdminNotes] = useState('');
  const [isUpdatingApp, setIsUpdatingApp] = useState(false);

  // Blog CMS
  const [blogPosts, setBlogPosts] = useState<any[]>([]);
  const [editingPost, setEditingPost] = useState<any | null>(null);
  const [isCreatingPost, setIsCreatingPost] = useState(false);
  const [postForm, setPostForm] = useState({
    title: '',
    category: 'School News',
    featuredImage: '/images/children_sealed.jpg',
    excerpt: '',
    content: '',
    author: 'SNAA Faculty',
    publicationDate: new Date().toISOString().split('T')[0],
    status: 'published',
  });

  // Announcements CMS
  const [announcements, setAnnouncements] = useState<any[]>([]);
  const [editingAnnouncement, setEditingAnnouncement] = useState<any | null>(null);
  const [isCreatingAnn, setIsCreatingAnn] = useState(false);
  const [annForm, setAnnForm] = useState({
    title: '',
    message: '',
    featuredImage: '/images/boy_and_girl_sealed.jpg',
    publishDate: new Date().toISOString().split('T')[0],
    expiryDate: '',
    status: 'published',
    displayOnHome: true,
  });

  // Gallery CMS
  const [galleryItems, setGalleryItems] = useState<any[]>([]);
  const [editingGallery, setEditingGallery] = useState<any | null>(null);
  const [isCreatingGallery, setIsCreatingGallery] = useState(false);
  const [galleryForm, setGalleryForm] = useState({
    title: '',
    category: 'Classrooms',
    src: '/images/sitting_children_sealed.jpg',
    description: '',
    tag: 'Classroom Life',
    sortOrder: 0,
    isPublished: true,
  });

  // Staff CMS
  const [staffMembers, setStaffMembers] = useState<any[]>([]);
  const [editingStaff, setEditingStaff] = useState<any | null>(null);
  const [isCreatingStaff, setIsCreatingStaff] = useState(false);
  const [staffForm, setStaffForm] = useState({
    name: '',
    position: '',
    photograph: '/images/real_teacher_sealed.jpg',
    biography: '',
    qualifications: '',
    subjects: '',
    status: 'published',
    sortOrder: 0,
  });

  // Academic Programmes CMS
  const [programmes, setProgrammes] = useState<any[]>([]);
  const [editingProg, setEditingProg] = useState<any | null>(null);

  // School Info CMS
  const [schoolInfoData, setSchoolInfoData] = useState<any | null>(null);

  // Admission Settings
  const [admissionSettingsData, setAdmissionSettingsData] = useState<any | null>(null);
  const [allSessions, setAllSessions] = useState<any[]>([]);

  // Media Library
  const [mediaItems, setMediaItems] = useState<any[]>([]);
  const [uploadCategory, setUploadCategory] = useState('Campus');
  const [uploadAlt, setUploadAlt] = useState('');
  const [isUploading, setIsUploading] = useState(false);

  // Admin Users & Audit Logs
  const [adminUsers, setAdminUsers] = useState<any[]>([]);
  const [auditLogs, setAuditLogs] = useState<any[]>([]);
  const [newUserForm, setNewUserForm] = useState({ username: '', password: '', role: 'admissions_officer', fullName: '' });

  // Contact Enquiries
  const [enquiries, setEnquiries] = useState<any[]>([]);

  // Toast / feedback message
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Confirmation modal state
  const [confirmDialog, setConfirmDialog] = useState<{
    isOpen: boolean;
    title: string;
    message: string;
    onConfirm: () => void;
  }>({ isOpen: false, title: '', message: '', onConfirm: () => {} });

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Verify auth session
  useEffect(() => {
    if (token) {
      fetch('/api/admin/me', {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((res) => {
          if (!res.ok) throw new Error('Expired');
          return res.json();
        })
        .then((data) => {
          setAdminUser(data.user);
          loadSummary(token);
        })
        .catch(() => {
          handleLogout();
        });
    }
  }, [token]);

  // Load active tab data
  useEffect(() => {
    if (!token) return;
    if (activeTab === 'overview') loadSummary(token);
    if (activeTab === 'admissions' || activeTab === 'students') loadApplications(token);
    if (activeTab === 'blog') loadBlog(token);
    if (activeTab === 'announcements') loadAnnouncements(token);
    if (activeTab === 'gallery') loadGallery(token);
    if (activeTab === 'staff') loadStaff(token);
    if (activeTab === 'programmes') loadProgrammes(token);
    if (activeTab === 'school_info') loadSchoolInfo(token);
    if (activeTab === 'admission_settings') loadAdmissionSettings(token);
    if (activeTab === 'media') loadMedia(token);
    if (activeTab === 'users') loadUsers(token);
    if (activeTab === 'audit') loadAudit(token);
    if (activeTab === 'enquiries') loadEnquiries(token);
  }, [activeTab, token]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError(null);
    setIsLoggingIn(true);

    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: usernameInput, password: passwordInput }),
      });

      const data = await res.json();
      if (res.ok) {
        sessionStorage.setItem('snaa_admin_token', data.token);
        setToken(data.token);
        setAdminUser(data.user);
      } else {
        setLoginError(data.error || 'Authentication failed. Please verify credentials.');
      }
    } catch (e) {
      setLoginError('Unable to connect to the administration server.');
    } finally {
      setIsLoggingIn(false);
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem('snaa_admin_token');
    setToken(null);
    setAdminUser(null);
  };

  // Loaders
  const loadSummary = async (authToken: string) => {
    try {
      const res = await fetch('/api/admin/dashboard-summary', {
        headers: { Authorization: `Bearer ${authToken}` },
      });
      if (res.ok) {
        const data = await res.json();
        setSummary(data);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const loadApplications = async (authToken: string) => {
    try {
      const params = new URLSearchParams();
      if (appSearch) params.append('search', appSearch);
      if (appStatusFilter !== 'all') params.append('status', appStatusFilter);
      const res = await fetch(`/api/admin/applications?${params.toString()}`, {
        headers: { Authorization: `Bearer ${authToken}` },
      });
      if (res.ok) {
        const data = await res.json();
        setApplications(data.applications || []);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const loadBlog = async (authToken: string) => {
    try {
      const res = await fetch('/api/admin/blog', {
        headers: { Authorization: `Bearer ${authToken}` },
      });
      if (res.ok) setBlogPosts(await res.json());
    } catch (e) {
      console.error(e);
    }
  };

  const loadAnnouncements = async (authToken: string) => {
    try {
      const res = await fetch('/api/admin/announcements', {
        headers: { Authorization: `Bearer ${authToken}` },
      });
      if (res.ok) setAnnouncements(await res.json());
    } catch (e) {
      console.error(e);
    }
  };

  const loadGallery = async (authToken: string) => {
    try {
      const res = await fetch('/api/admin/gallery', {
        headers: { Authorization: `Bearer ${authToken}` },
      });
      if (res.ok) setGalleryItems(await res.json());
    } catch (e) {
      console.error(e);
    }
  };

  const loadStaff = async (authToken: string) => {
    try {
      const res = await fetch('/api/admin/staff', {
        headers: { Authorization: `Bearer ${authToken}` },
      });
      if (res.ok) setStaffMembers(await res.json());
    } catch (e) {
      console.error(e);
    }
  };

  const loadProgrammes = async (authToken: string) => {
    try {
      const res = await fetch('/api/admin/programmes', {
        headers: { Authorization: `Bearer ${authToken}` },
      });
      if (res.ok) setProgrammes(await res.json());
    } catch (e) {
      console.error(e);
    }
  };

  const loadSchoolInfo = async (authToken: string) => {
    try {
      const res = await fetch('/api/admin/school-info', {
        headers: { Authorization: `Bearer ${authToken}` },
      });
      if (res.ok) setSchoolInfoData(await res.json());
    } catch (e) {
      console.error(e);
    }
  };

  const loadAdmissionSettings = async (authToken: string) => {
    try {
      const res = await fetch('/api/admin/settings', {
        headers: { Authorization: `Bearer ${authToken}` },
      });
      if (res.ok) {
        const data = await res.json();
        setAdmissionSettingsData(data.settings);
        setAllSessions(data.sessions || []);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const loadMedia = async (authToken: string) => {
    try {
      const res = await fetch('/api/admin/media', {
        headers: { Authorization: `Bearer ${authToken}` },
      });
      if (res.ok) setMediaItems(await res.json());
    } catch (e) {
      console.error(e);
    }
  };

  const loadUsers = async (authToken: string) => {
    try {
      const res = await fetch('/api/admin/users', {
        headers: { Authorization: `Bearer ${authToken}` },
      });
      if (res.ok) setAdminUsers(await res.json());
    } catch (e) {
      console.error(e);
    }
  };

  const loadAudit = async (authToken: string) => {
    try {
      const res = await fetch('/api/admin/audit-logs', {
        headers: { Authorization: `Bearer ${authToken}` },
      });
      if (res.ok) setAuditLogs(await res.json());
    } catch (e) {
      console.error(e);
    }
  };

  const loadEnquiries = async (authToken: string) => {
    try {
      const res = await fetch('/api/admin/enquiries', {
        headers: { Authorization: `Bearer ${authToken}` },
      });
      if (res.ok) setEnquiries(await res.json());
    } catch (e) {
      console.error(e);
    }
  };

  // Actions
  const handleUpdateAppStatus = async () => {
    if (!selectedApp || !newStatus) return;
    setIsUpdatingApp(true);
    try {
      const res = await fetch(`/api/admin/applications/${selectedApp.id}/status`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status: newStatus, adminNotes }),
      });
      if (res.ok) {
        showToast(`Application ${selectedApp.reference_number} updated to ${newStatus}.`);
        loadApplications(token!);
        setSelectedApp(null);
      }
    } catch (e) {
      showToast('Failed to update status.');
    } finally {
      setIsUpdatingApp(false);
    }
  };

  const handleArchiveApp = (id: string, refNum: string) => {
    setConfirmDialog({
      isOpen: true,
      title: 'Safely Archive Record?',
      message: `Are you sure you want to archive student application ${refNum}? Archiving protects student history while hiding it from active workflows.`,
      onConfirm: async () => {
        try {
          const res = await fetch(`/api/admin/applications/${id}/archive`, {
            method: 'POST',
            headers: { Authorization: `Bearer ${token}` },
          });
          if (res.ok) {
            showToast(`Application ${refNum} safely archived.`);
            loadApplications(token!);
            setSelectedApp(null);
          }
        } catch (e) {
          showToast('Failed to archive application.');
        }
      },
    });
  };

  // Blog Save
  const handleSavePost = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const isEdit = Boolean(editingPost);
      const url = isEdit ? `/api/admin/blog/${editingPost.id}` : '/api/admin/blog';
      const method = isEdit ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(postForm),
      });

      if (res.ok) {
        showToast(isEdit ? 'Blog post updated.' : 'Blog post published.');
        setIsCreatingPost(false);
        setEditingPost(null);
        loadBlog(token!);
      }
    } catch (e) {
      showToast('Error saving blog post.');
    }
  };

  const handleDeletePost = (id: string, title: string) => {
    setConfirmDialog({
      isOpen: true,
      title: 'Soft Delete Post?',
      message: `Are you sure you want to remove "${title}"? This item will be soft-deleted and can be recovered if needed.`,
      onConfirm: async () => {
        const res = await fetch(`/api/admin/blog/${id}`, {
          method: 'DELETE',
          headers: { Authorization: `Bearer ${token}` },
        });
        if (res.ok) {
          showToast('Blog post deleted.');
          loadBlog(token!);
        }
      },
    });
  };

  // Gallery Save
  const handleSaveGallery = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const isEdit = Boolean(editingGallery);
      const url = isEdit ? `/api/admin/gallery/${editingGallery.id}` : '/api/admin/gallery';
      const method = isEdit ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(galleryForm),
      });

      if (res.ok) {
        showToast(isEdit ? 'Gallery image updated.' : 'Image added to campus gallery.');
        setIsCreatingGallery(false);
        setEditingGallery(null);
        loadGallery(token!);
      }
    } catch (e) {
      showToast('Error saving gallery item.');
    }
  };

  const handleDeleteGallery = (id: string, title: string) => {
    setConfirmDialog({
      isOpen: true,
      title: 'Delete Gallery Image?',
      message: `Are you sure you want to delete "${title}" from the gallery?`,
      onConfirm: async () => {
        const res = await fetch(`/api/admin/gallery/${id}`, {
          method: 'DELETE',
          headers: { Authorization: `Bearer ${token}` },
        });
        if (res.ok) {
          showToast('Gallery image deleted.');
          loadGallery(token!);
        }
      },
    });
  };

  // Announcements Save
  const handleSaveAnnouncement = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const isEdit = Boolean(editingAnnouncement);
      const url = isEdit ? `/api/admin/announcements/${editingAnnouncement.id}` : '/api/admin/announcements';
      const method = isEdit ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(annForm),
      });

      if (res.ok) {
        showToast(isEdit ? 'Announcement updated.' : 'Announcement published.');
        setIsCreatingAnn(false);
        setEditingAnnouncement(null);
        loadAnnouncements(token!);
      }
    } catch (e) {
      showToast('Error saving announcement.');
    }
  };

  // Staff Save
  const handleSaveStaff = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const isEdit = Boolean(editingStaff);
      const url = isEdit ? `/api/admin/staff/${editingStaff.id}` : '/api/admin/staff';
      const method = isEdit ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(staffForm),
      });

      if (res.ok) {
        showToast(isEdit ? 'Staff profile updated.' : 'Staff member created.');
        setIsCreatingStaff(false);
        setEditingStaff(null);
        loadStaff(token!);
      }
    } catch (e) {
      showToast('Error saving staff profile.');
    }
  };

  // School Info Update
  const handleUpdateSchoolInfo = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/admin/school-info', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(schoolInfoData),
      });
      if (res.ok) {
        showToast('School profile updated successfully.');
      }
    } catch (e) {
      showToast('Failed to update school profile.');
    }
  };

  // Admission Settings Update
  const handleUpdateAdmissionSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/admin/settings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(admissionSettingsData),
      });
      if (res.ok) {
        showToast('Admission settings updated.');
      }
    } catch (e) {
      showToast('Failed to update settings.');
    }
  };

  // Media File Upload handler (converts file to Base64)
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 10 * 1024 * 1024) {
      alert('File size exceeds the 10MB limit.');
      return;
    }

    setIsUploading(true);
    const reader = new FileReader();
    reader.onload = async () => {
      try {
        const base64Data = reader.result as string;
        const res = await fetch('/api/admin/media/upload', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            base64Data,
            filename: file.name,
            category: uploadCategory,
            altText: uploadAlt || file.name,
          }),
        });

        if (res.ok) {
          showToast(`File "${file.name}" uploaded successfully.`);
          loadMedia(token!);
          setUploadAlt('');
        } else {
          const err = await res.json();
          alert(err.error || 'Upload failed.');
        }
      } catch (err) {
        alert('Network error during file upload.');
      } finally {
        setIsUploading(false);
      }
    };
    reader.readAsDataURL(file);
  };

  // Navigation sidebar item click
  const handleSidebarTabClick = (tab: TabType) => {
    setActiveTab(tab);
    setMobileSidebarOpen(false);
    setIsCreatingPost(false);
    setEditingPost(null);
    setIsCreatingAnn(false);
    setEditingAnnouncement(null);
    setIsCreatingGallery(false);
    setEditingGallery(null);
    setIsCreatingStaff(false);
    setEditingStaff(null);
    setSelectedApp(null);
  };

  // If not authenticated, show professional secure login screen
  if (!token) {
    return (
      <div className="min-h-screen bg-[#FAF7F2] flex items-center justify-center p-4">
        <div className="bg-white border border-[#E8DFD5] rounded-2xl w-full max-w-md p-6 sm:p-8 shadow-sm">
          <div className="text-center mb-6">
            <div className="w-16 h-16 mx-auto rounded-2xl overflow-hidden border-2 border-[#C88A1A] shadow-xs mb-3">
              <img
                src="/images/boy_and_girl_sealed.jpg"
                alt="Sealed Nectar Ambassadors"
                className="w-full h-full object-cover"
              />
            </div>
            <SchoolCrest size="sm" className="justify-center mb-2" />
            <span className="text-xs font-bold uppercase tracking-wider text-[#C88A1A] block">
              Administration Portal
            </span>
            <h1 className="font-display text-xl sm:text-2xl font-bold text-[#221F1F]">
              Sealed Nectar Academy CMS
            </h1>
            <p className="text-xs text-[#57534E] mt-1">
              Authorized school personnel and officers only
            </p>
          </div>

          {loginError && (
            <div className="mb-4 p-3 rounded-lg bg-red-50 border border-red-200 text-xs text-red-700 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{loginError}</span>
            </div>
          )}

          {showForgotPassword ? (
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-[#FAF7F2] border border-[#E8DFD5] text-xs text-[#57534E] leading-relaxed">
                <strong className="text-[#221F1F] block mb-1">Administrative Credential Recovery</strong>
                For security reasons, password resets must be verified in person by the school director or requested directly from the registered domain administration email:
                <div className="mt-2 font-mono text-[#6B1724]">sealednectar15@gmail.com</div>
              </div>
              <button
                type="button"
                onClick={() => setShowForgotPassword(false)}
                className="w-full py-2.5 rounded-lg border border-[#E8DFD5] text-xs font-semibold text-[#221F1F] hover:bg-[#FAF7F2] transition-colors"
              >
                Back to Sign In
              </button>
            </div>
          ) : (
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-[#221F1F] uppercase tracking-wider mb-1.5">
                  Admin Username or Email
                </label>
                <input
                  type="text"
                  required
                  value={usernameInput}
                  onChange={(e) => setUsernameInput(e.target.value)}
                  placeholder="Enter administrator username"
                  className="w-full px-3.5 py-2.5 rounded-lg border border-[#E8DFD5] text-xs sm:text-sm text-[#221F1F] focus:outline-none focus:border-[#6B1724]"
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block text-xs font-bold text-[#221F1F] uppercase tracking-wider">
                    Password
                  </label>
                  <button
                    type="button"
                    onClick={() => setShowForgotPassword(true)}
                    className="text-[11px] text-[#6B1724] hover:underline"
                  >
                    Forgot Password?
                  </button>
                </div>
                <input
                  type="password"
                  required
                  value={passwordInput}
                  onChange={(e) => setPasswordInput(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full px-3.5 py-2.5 rounded-lg border border-[#E8DFD5] text-xs sm:text-sm text-[#221F1F] focus:outline-none focus:border-[#6B1724]"
                />
              </div>

              <button
                type="submit"
                disabled={isLoggingIn}
                className="w-full flex items-center justify-center gap-2 py-3 rounded-lg bg-[#6B1724] text-white text-xs sm:text-sm font-semibold hover:bg-[#52111B] active:bg-[#3E0A12] transition-colors shadow-xs disabled:opacity-50"
              >
                <Lock className="w-4 h-4" />
                <span>{isLoggingIn ? 'Verifying Session...' : 'Sign In to Dashboard'}</span>
              </button>
            </form>
          )}

          <div className="mt-6 pt-4 border-t border-[#E8DFD5] text-center">
            <button
              onClick={() => onNavigate('/')}
              className="text-xs text-[#57534E] hover:text-[#6B1724] font-medium"
            >
              ← Return to School Public Website
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Sidebar navigation menu items
  const sidebarLinks = [
    { id: 'overview', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'admissions', label: 'Admissions & Applicants', icon: Users },
    { id: 'blog', label: 'Blog CMS', icon: BookOpen },
    { id: 'announcements', label: 'Announcements', icon: Bell },
    { id: 'gallery', label: 'Campus Gallery', icon: Image },
    { id: 'school_info', label: 'School Information', icon: Info },
    { id: 'programmes', label: 'Academic Programmes', icon: Layers },
    { id: 'staff', label: 'Staff Management', icon: UserCheck },
    { id: 'admission_settings', label: 'Admission Settings', icon: Settings },
    { id: 'media', label: 'Media Library', icon: FolderOpen },
    { id: 'enquiries', label: 'Contact Enquiries', icon: Mail, badge: summary.unreadEnquiries },
    { id: 'users', label: 'Admin Users', icon: Shield },
    { id: 'audit', label: 'Audit Trail', icon: History },
  ];

  return (
    <div className="min-h-screen bg-[#F7F4EF] flex flex-col">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-4 right-4 z-50 p-4 rounded-xl bg-[#221F1F] text-white text-xs font-semibold shadow-xl border border-[#D49A24] flex items-center gap-2 animate-in slide-in-from-bottom-2">
          <CheckCircle2 className="w-4 h-4 text-[#D49A24]" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Confirmation Dialog */}
      {confirmDialog.isOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl border border-[#E8DFD5] max-w-md w-full p-6 shadow-xl animate-in zoom-in-95">
            <h3 className="font-display text-lg font-bold text-[#221F1F] mb-2">{confirmDialog.title}</h3>
            <p className="text-xs sm:text-sm text-[#57534E] leading-relaxed mb-6">{confirmDialog.message}</p>
            <div className="flex items-center justify-end gap-3">
              <button
                onClick={() => setConfirmDialog({ ...confirmDialog, isOpen: false })}
                className="px-4 py-2 rounded-lg border border-[#E8DFD5] text-xs font-semibold text-[#57534E] hover:bg-[#FAF7F2]"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  confirmDialog.onConfirm();
                  setConfirmDialog({ ...confirmDialog, isOpen: false });
                }}
                className="px-4 py-2 rounded-lg bg-[#6B1724] text-white text-xs font-semibold hover:bg-[#52111B]"
              >
                Confirm Action
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Top Header Bar */}
      <header className="bg-white border-b border-[#E8DFD5] px-4 sm:px-6 py-3 sticky top-0 z-30 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
            className="lg:hidden p-2 rounded-lg text-[#221F1F] hover:bg-[#FAF7F2]"
          >
            <Menu className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-2">
            <SchoolCrest size="sm" />
            <div className="hidden sm:block">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#C88A1A] block leading-none">
                Admin CMS
              </span>
              <span className="font-display font-bold text-xs text-[#221F1F]">
                Sealed Nectar Ambassadors Academy
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden md:flex items-center gap-2 text-xs">
            <span className="px-2.5 py-1 rounded-md bg-[#FAF7F2] border border-[#E8DFD5] text-[#57534E] font-medium">
              Role: <strong className="text-[#6B1724] uppercase">{adminUser?.role}</strong>
            </span>
            <span className="text-[#57534E]">Signed in as: <strong>{adminUser?.fullName}</strong></span>
          </div>

          <button
            onClick={() => onNavigate('/')}
            className="hidden sm:inline-flex items-center gap-1 px-3 py-1.5 rounded-lg border border-[#E8DFD5] text-xs font-semibold text-[#221F1F] hover:bg-[#FAF7F2] transition-colors"
          >
            <Globe className="w-3.5 h-3.5 text-[#6B1724]" />
            <span>Public Site</span>
          </button>

          <button
            onClick={handleLogout}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-red-50 text-red-700 hover:bg-red-100 text-xs font-semibold transition-colors"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Logout</span>
          </button>
        </div>
      </header>

      {/* Main Workspace Layout */}
      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar */}
        <aside
          className={`fixed lg:static inset-y-0 left-0 z-40 w-64 bg-white border-r border-[#E8DFD5] flex flex-col transition-transform duration-200 ${
            mobileSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
          }`}
        >
          <div className="p-4 border-b border-[#E8DFD5] flex items-center justify-between lg:hidden">
            <span className="font-display text-sm font-bold text-[#221F1F]">Navigation</span>
            <button onClick={() => setMobileSidebarOpen(false)} className="p-1 text-[#57534E]">
              <X className="w-5 h-5" />
            </button>
          </div>

          <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
            {sidebarLinks.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleSidebarTabClick(item.id as TabType)}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-colors ${
                    isActive
                      ? 'bg-[#6B1724] text-white shadow-xs'
                      : 'text-[#57534E] hover:bg-[#FAF7F2] hover:text-[#221F1F]'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className={`w-4 h-4 ${isActive ? 'text-[#D49A24]' : 'text-[#8C827A]'}`} />
                    <span>{item.label}</span>
                  </div>
                  {item.badge ? (
                    <span className="px-1.5 py-0.5 rounded-full text-[10px] bg-red-600 text-white font-bold">
                      {item.badge}
                    </span>
                  ) : null}
                </button>
              );
            })}
          </nav>

          <div className="p-3 border-t border-[#E8DFD5] text-[11px] text-[#8C827A] text-center">
            Sealed Nectar CMS v2.6 · Makun, Sagamu
          </div>
        </aside>

        {/* Content Viewport */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
          {/* TAB 1: OVERVIEW */}
          {activeTab === 'overview' && (
            <div className="max-w-6xl mx-auto space-y-6">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#C88A1A] block mb-1">
                  Active Session {summary.activeSession}
                </span>
                <h2 className="font-display text-2xl sm:text-3xl font-bold text-[#221F1F]">
                  School Operations Overview
                </h2>
                <p className="text-xs sm:text-sm text-[#57534E] mt-1">
                  Real database metrics reflecting enrollment applications, website articles, and parent communication.
                </p>
              </div>

              {/* Metrics Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-white border border-[#E8DFD5] rounded-2xl p-4 sm:p-5 shadow-xs">
                  <span className="text-[11px] uppercase tracking-wider font-bold text-[#57534E] block mb-1">
                    Total Applications
                  </span>
                  <div className="font-display text-2xl sm:text-3xl font-bold text-[#6B1724]">
                    {summary.totalApplications}
                  </div>
                  <span className="text-[10px] text-[#8C827A]">All recorded sessions</span>
                </div>

                <div className="bg-white border border-[#E8DFD5] rounded-2xl p-4 sm:p-5 shadow-xs">
                  <span className="text-[11px] uppercase tracking-wider font-bold text-[#57534E] block mb-1">
                    Current Session
                  </span>
                  <div className="font-display text-2xl sm:text-3xl font-bold text-[#1B4332]">
                    {summary.applicationsThisSession}
                  </div>
                  <span className="text-[10px] text-[#8C827A]">{summary.activeSession} applicants</span>
                </div>

                <div className="bg-white border border-[#E8DFD5] rounded-2xl p-4 sm:p-5 shadow-xs">
                  <span className="text-[11px] uppercase tracking-wider font-bold text-[#57534E] block mb-1">
                    Pending Review
                  </span>
                  <div className="font-display text-2xl sm:text-3xl font-bold text-[#C88A1A]">
                    {summary.pendingApplications}
                  </div>
                  <span className="text-[10px] text-[#8C827A]">Awaiting board interview</span>
                </div>

                <div className="bg-white border border-[#E8DFD5] rounded-2xl p-4 sm:p-5 shadow-xs">
                  <span className="text-[11px] uppercase tracking-wider font-bold text-[#57534E] block mb-1">
                    Admitted / Enrolled
                  </span>
                  <div className="font-display text-2xl sm:text-3xl font-bold text-[#221F1F]">
                    {summary.acceptedApplications}
                  </div>
                  <span className="text-[10px] text-[#8C827A]">Confirmed students</span>
                </div>
              </div>

              {/* Secondary Metrics */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div
                  onClick={() => setActiveTab('blog')}
                  className="bg-white border border-[#E8DFD5] rounded-2xl p-5 shadow-xs hover:border-[#C88A1A] transition-all cursor-pointer"
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-bold text-[#221F1F]">Published Articles</span>
                    <BookOpen className="w-4 h-4 text-[#6B1724]" />
                  </div>
                  <div className="text-2xl font-bold text-[#221F1F] mb-1">{summary.publishedBlogPosts}</div>
                  <p className="text-xs text-[#57534E]">Live blog posts visible on the public website.</p>
                </div>

                <div
                  onClick={() => setActiveTab('gallery')}
                  className="bg-white border border-[#E8DFD5] rounded-2xl p-5 shadow-xs hover:border-[#C88A1A] transition-all cursor-pointer"
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-bold text-[#221F1F]">Campus Gallery</span>
                    <Image className="w-4 h-4 text-[#C88A1A]" />
                  </div>
                  <div className="text-2xl font-bold text-[#221F1F] mb-1">{summary.campusGalleryItems}</div>
                  <p className="text-xs text-[#57534E]">Authentic photographs showcased in public campus view.</p>
                </div>

                <div
                  onClick={() => setActiveTab('announcements')}
                  className="bg-white border border-[#E8DFD5] rounded-2xl p-5 shadow-xs hover:border-[#C88A1A] transition-all cursor-pointer"
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-bold text-[#221F1F]">Live Announcements</span>
                    <Bell className="w-4 h-4 text-[#1B4332]" />
                  </div>
                  <div className="text-2xl font-bold text-[#221F1F] mb-1">{summary.announcements}</div>
                  <p className="text-xs text-[#57534E]">Top notification banner broadcasts on homepage.</p>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="bg-white border border-[#E8DFD5] rounded-2xl p-6 shadow-xs">
                <h3 className="font-display text-base font-bold text-[#221F1F] mb-4">
                  Quick Administrative Actions
                </h3>
                <div className="flex flex-wrap gap-3">
                  <button
                    onClick={() => {
                      setActiveTab('blog');
                      setIsCreatingPost(true);
                    }}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#6B1724] text-white text-xs font-semibold hover:bg-[#52111B] transition-colors"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Create Blog Post</span>
                  </button>
                  <button
                    onClick={() => {
                      setActiveTab('announcements');
                      setIsCreatingAnn(true);
                    }}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#FAF7F2] border border-[#E8DFD5] text-[#221F1F] text-xs font-semibold hover:bg-[#F4EFEB] transition-colors"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Post Announcement</span>
                  </button>
                  <button
                    onClick={() => {
                      setActiveTab('gallery');
                      setIsCreatingGallery(true);
                    }}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#FAF7F2] border border-[#E8DFD5] text-[#221F1F] text-xs font-semibold hover:bg-[#F4EFEB] transition-colors"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Upload Campus Photo</span>
                  </button>
                  <button
                    onClick={() => setActiveTab('admissions')}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#FAF7F2] border border-[#E8DFD5] text-[#221F1F] text-xs font-semibold hover:bg-[#F4EFEB] transition-colors"
                  >
                    <Search className="w-3.5 h-3.5" />
                    <span>Review Applications</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: ADMISSIONS / STUDENTS */}
          {(activeTab === 'admissions' || activeTab === 'students') && (
            <div className="max-w-6xl mx-auto space-y-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <h2 className="font-display text-2xl font-bold text-[#221F1F]">
                    Student Enrollment & Applications
                  </h2>
                  <p className="text-xs text-[#57534E]">
                    Review bio-data, parent contacts, payment requests and assign status.
                  </p>
                </div>
              </div>

              {/* Filters */}
              <div className="bg-white border border-[#E8DFD5] rounded-xl p-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                <div className="flex-1 relative">
                  <Search className="w-4 h-4 text-[#8C827A] absolute left-3 top-3" />
                  <input
                    type="text"
                    placeholder="Search by student name, ref number, or guardian phone..."
                    value={appSearch}
                    onChange={(e) => setAppSearch(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 rounded-lg border border-[#E8DFD5] text-xs text-[#221F1F] focus:outline-none"
                  />
                </div>
                <select
                  value={appStatusFilter}
                  onChange={(e) => setAppStatusFilter(e.target.value)}
                  className="px-3 py-2 rounded-lg border border-[#E8DFD5] text-xs bg-white text-[#221F1F]"
                >
                  <option value="all">All Statuses</option>
                  <option value="Submitted">Submitted</option>
                  <option value="Under Review">Under Review</option>
                  <option value="Accepted">Accepted</option>
                  <option value="Enrolled">Enrolled</option>
                  <option value="Declined">Declined</option>
                </select>
                <button
                  onClick={() => loadApplications(token!)}
                  className="px-4 py-2 bg-[#6B1724] text-white rounded-lg text-xs font-semibold hover:bg-[#52111B]"
                >
                  Apply Filter
                </button>
              </div>

              {/* Table / Responsive Cards */}
              <div className="bg-white border border-[#E8DFD5] rounded-2xl overflow-hidden shadow-xs">
                {applications.length === 0 ? (
                  <div className="p-12 text-center text-xs text-[#57534E]">
                    0 Applications found for this filter.
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs">
                      <thead className="bg-[#FAF7F2] border-b border-[#E8DFD5] text-[#57534E] uppercase font-bold text-[10px] tracking-wider">
                        <tr>
                          <th className="p-3.5">Ref No.</th>
                          <th className="p-3.5">Student Name</th>
                          <th className="p-3.5">Class Applied</th>
                          <th className="p-3.5">Guardian & Phone</th>
                          <th className="p-3.5">Status</th>
                          <th className="p-3.5">Submission Date</th>
                          <th className="p-3.5 text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[#E8DFD5]">
                        {applications.map((app) => (
                          <tr key={app.id} className="hover:bg-[#FAF7F2] transition-colors">
                            <td className="p-3.5 font-mono font-bold text-[#6B1724]">{app.reference_number}</td>
                            <td className="p-3.5 font-semibold text-[#221F1F]">{app.student_full_name}</td>
                            <td className="p-3.5">{app.class_applied_for}</td>
                            <td className="p-3.5">
                              <div>{app.guardian_full_name}</div>
                              <div className="text-[11px] text-[#8C827A]">{app.guardian_phone}</div>
                            </td>
                            <td className="p-3.5">
                              <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-[#FAF7F2] border border-[#E8DFD5] text-[#6B1724]">
                                {app.status}
                              </span>
                            </td>
                            <td className="p-3.5 text-[#57534E]">{app.submission_date?.split('T')[0]}</td>
                            <td className="p-3.5 text-right space-x-2">
                              <button
                                onClick={() => {
                                  setSelectedApp(app);
                                  setNewStatus(app.status);
                                  setAdminNotes(app.admin_notes || '');
                                }}
                                className="px-2.5 py-1 bg-[#6B1724] text-white rounded text-[11px] font-semibold hover:bg-[#52111B]"
                              >
                                Review
                              </button>
                              <button
                                onClick={() => handleArchiveApp(app.id, app.reference_number)}
                                className="px-2 py-1 text-red-600 hover:bg-red-50 rounded text-[11px]"
                                title="Safely Archive"
                              >
                                <Archive className="w-3.5 h-3.5 inline" />
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Application Detail Modal */}
          {selectedApp && (
            <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
              <div className="bg-white rounded-2xl border border-[#E8DFD5] max-w-2xl w-full p-6 shadow-2xl max-h-[90vh] overflow-y-auto">
                <div className="flex items-center justify-between pb-4 border-b border-[#E8DFD5] mb-4">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#C88A1A] block">
                      Application Dossier
                    </span>
                    <h3 className="font-display text-lg font-bold text-[#221F1F]">
                      {selectedApp.student_full_name} ({selectedApp.reference_number})
                    </h3>
                  </div>
                  <button onClick={() => setSelectedApp(null)} className="p-1 text-[#8C827A]">
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="space-y-4 text-xs">
                  <div className="grid grid-cols-2 gap-3 p-3 bg-[#FAF7F2] rounded-xl border border-[#E8DFD5]">
                    <div><span className="text-[#8C827A] block">Class Applied:</span><strong>{selectedApp.class_applied_for}</strong></div>
                    <div><span className="text-[#8C827A] block">Date of Birth:</span><strong>{selectedApp.date_of_birth} ({selectedApp.gender})</strong></div>
                    <div><span className="text-[#8C827A] block">Nationality / State:</span><strong>{selectedApp.nationality}, {selectedApp.state_of_origin} ({selectedApp.lga})</strong></div>
                    <div><span className="text-[#8C827A] block">Home Address:</span><strong>{selectedApp.home_address}</strong></div>
                  </div>

                  <div className="p-3 bg-[#FAF7F2] rounded-xl border border-[#E8DFD5]">
                    <span className="text-[10px] font-bold uppercase text-[#6B1724] block mb-1">Guardian Information</span>
                    <div className="grid grid-cols-2 gap-2">
                      <div><span className="text-[#8C827A] block">Full Name:</span><strong>{selectedApp.guardian_full_name} ({selectedApp.guardian_relationship})</strong></div>
                      <div><span className="text-[#8C827A] block">Contact Phone:</span><strong>{selectedApp.guardian_phone}</strong></div>
                      <div><span className="text-[#8C827A] block">Email:</span><strong>{selectedApp.guardian_email || 'None provided'}</strong></div>
                      <div><span className="text-[#8C827A] block">Pay Later Option:</span><strong>{selectedApp.pay_later_requested ? 'Requested' : 'Standard'}</strong></div>
                    </div>
                  </div>

                  {/* Status update form */}
                  <div className="p-4 bg-white border-2 border-[#C88A1A] rounded-xl space-y-3">
                    <span className="text-xs font-bold text-[#221F1F] block">Update Applicant Status</span>
                    <select
                      value={newStatus}
                      onChange={(e) => setNewStatus(e.target.value)}
                      className="w-full p-2 rounded-lg border border-[#E8DFD5] text-xs font-semibold bg-[#FAF7F2]"
                    >
                      <option value="Submitted">Submitted</option>
                      <option value="Under Review">Under Review</option>
                      <option value="Shortlisted">Shortlisted</option>
                      <option value="Interview">Interview</option>
                      <option value="Accepted">Accepted</option>
                      <option value="Enrolled">Enrolled</option>
                      <option value="Declined">Declined</option>
                    </select>
                    <div>
                      <label className="block text-[11px] font-bold text-[#57534E] mb-1">Internal Notes</label>
                      <textarea
                        rows={2}
                        value={adminNotes}
                        onChange={(e) => setAdminNotes(e.target.value)}
                        placeholder="Notes for internal school admissions committee..."
                        className="w-full p-2 rounded-lg border border-[#E8DFD5] text-xs"
                      />
                    </div>
                    <div className="flex justify-end gap-2 pt-2">
                      <button
                        onClick={() => setSelectedApp(null)}
                        className="px-3 py-1.5 rounded-lg border border-[#E8DFD5] text-xs font-semibold text-[#57534E]"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={handleUpdateAppStatus}
                        disabled={isUpdatingApp}
                        className="px-4 py-1.5 rounded-lg bg-[#6B1724] text-white text-xs font-semibold hover:bg-[#52111B]"
                      >
                        {isUpdatingApp ? 'Saving...' : 'Save Status'}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: BLOG CMS */}
          {activeTab === 'blog' && (
            <div className="max-w-6xl mx-auto space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="font-display text-2xl font-bold text-[#221F1F]">School Blog & News CMS</h2>
                  <p className="text-xs text-[#57534E]">Manage publications, articles and curriculum features.</p>
                </div>
                {!isCreatingPost && !editingPost && (
                  <button
                    onClick={() => {
                      setEditingPost(null);
                      setPostForm({
                        title: '',
                        category: 'School News',
                        featuredImage: '/images/children_sealed.jpg',
                        excerpt: '',
                        content: '',
                        author: adminUser?.fullName || 'SNAA Faculty',
                        publicationDate: new Date().toISOString().split('T')[0],
                        status: 'published',
                      });
                      setIsCreatingPost(true);
                    }}
                    className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#6B1724] text-white text-xs font-semibold rounded-lg hover:bg-[#52111B]"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Create New Post</span>
                  </button>
                )}
              </div>

              {/* Editor Form */}
              {(isCreatingPost || editingPost) && (
                <div className="bg-white border border-[#E8DFD5] rounded-2xl p-6 shadow-sm">
                  <div className="flex items-center justify-between pb-4 border-b border-[#E8DFD5] mb-4">
                    <h3 className="font-display text-lg font-bold text-[#221F1F]">
                      {editingPost ? 'Edit Post' : 'New School Publication'}
                    </h3>
                    <button
                      onClick={() => {
                        setIsCreatingPost(false);
                        setEditingPost(null);
                      }}
                      className="p-1 text-[#8C827A]"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>

                  <form onSubmit={handleSavePost} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider mb-1">Title *</label>
                        <input
                          type="text"
                          required
                          value={postForm.title}
                          onChange={(e) => setPostForm({ ...postForm, title: e.target.value })}
                          className="w-full p-2.5 rounded-lg border border-[#E8DFD5] text-xs sm:text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider mb-1">Category *</label>
                        <select
                          value={postForm.category}
                          onChange={(e) => setPostForm({ ...postForm, category: e.target.value })}
                          className="w-full p-2.5 rounded-lg border border-[#E8DFD5] text-xs sm:text-sm bg-white"
                        >
                          <option value="School News">School News</option>
                          <option value="Academic Activities">Academic Activities</option>
                          <option value="Events">Events</option>
                          <option value="Student Achievements">Student Achievements</option>
                          <option value="Sports">Sports</option>
                          <option value="Education">Education</option>
                          <option value="Announcements">Announcements</option>
                          <option value="Parent Information">Parent Information</option>
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider mb-1">Featured Image URL *</label>
                        <input
                          type="text"
                          required
                          value={postForm.featuredImage}
                          onChange={(e) => setPostForm({ ...postForm, featuredImage: e.target.value })}
                          className="w-full p-2.5 rounded-lg border border-[#E8DFD5] text-xs"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider mb-1">Author *</label>
                        <input
                          type="text"
                          required
                          value={postForm.author}
                          onChange={(e) => setPostForm({ ...postForm, author: e.target.value })}
                          className="w-full p-2.5 rounded-lg border border-[#E8DFD5] text-xs"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider mb-1">Publication Date *</label>
                        <input
                          type="date"
                          required
                          value={postForm.publicationDate}
                          onChange={(e) => setPostForm({ ...postForm, publicationDate: e.target.value })}
                          className="w-full p-2.5 rounded-lg border border-[#E8DFD5] text-xs"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider mb-1">Short Excerpt *</label>
                      <textarea
                        rows={2}
                        required
                        value={postForm.excerpt}
                        onChange={(e) => setPostForm({ ...postForm, excerpt: e.target.value })}
                        className="w-full p-2.5 rounded-lg border border-[#E8DFD5] text-xs"
                      />
                    </div>

                    {/* Rich text HTML editor container */}
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider mb-1">Article Content (HTML Supported) *</label>
                      <div className="flex gap-1 mb-1 p-1 bg-[#FAF7F2] rounded-t-lg border border-[#E8DFD5] border-b-0 text-xs">
                        <button
                          type="button"
                          onClick={() => setPostForm({ ...postForm, content: postForm.content + '<h2>Section Heading</h2>\n' })}
                          className="px-2 py-1 bg-white border border-[#E8DFD5] rounded text-[11px]"
                        >
                          Heading
                        </button>
                        <button
                          type="button"
                          onClick={() => setPostForm({ ...postForm, content: postForm.content + '<p>Paragraph text here...</p>\n' })}
                          className="px-2 py-1 bg-white border border-[#E8DFD5] rounded text-[11px]"
                        >
                          Paragraph
                        </button>
                        <button
                          type="button"
                          onClick={() => setPostForm({ ...postForm, content: postForm.content + '<ul>\n  <li>Key point 1</li>\n  <li>Key point 2</li>\n</ul>\n' })}
                          className="px-2 py-1 bg-white border border-[#E8DFD5] rounded text-[11px]"
                        >
                          List
                        </button>
                        <button
                          type="button"
                          onClick={() => setPostForm({ ...postForm, content: postForm.content + '<strong>bold text</strong>' })}
                          className="px-2 py-1 bg-white border border-[#E8DFD5] rounded text-[11px]"
                        >
                          Bold
                        </button>
                      </div>
                      <textarea
                        rows={8}
                        required
                        value={postForm.content}
                        onChange={(e) => setPostForm({ ...postForm, content: e.target.value })}
                        className="w-full p-3 rounded-b-lg border border-[#E8DFD5] text-xs font-mono"
                      />
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-[#E8DFD5]">
                      <div className="flex items-center gap-2 text-xs">
                        <label className="font-semibold">Status:</label>
                        <select
                          value={postForm.status}
                          onChange={(e) => setPostForm({ ...postForm, status: e.target.value })}
                          className="p-1 rounded border border-[#E8DFD5]"
                        >
                          <option value="published">Published</option>
                          <option value="draft">Draft</option>
                        </select>
                      </div>
                      <div className="flex gap-2">
                        <button
                          type="button"
                          onClick={() => {
                            setIsCreatingPost(false);
                            setEditingPost(null);
                          }}
                          className="px-4 py-2 rounded-lg border border-[#E8DFD5] text-xs font-semibold"
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          className="px-5 py-2 bg-[#6B1724] text-white text-xs font-semibold rounded-lg hover:bg-[#52111B]"
                        >
                          Save & Publish Post
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              )}

              {/* Posts List */}
              <div className="bg-white border border-[#E8DFD5] rounded-2xl overflow-hidden shadow-xs">
                {blogPosts.length === 0 ? (
                  <div className="p-12 text-center text-xs text-[#57534E]">
                    No school updates have been published yet.
                  </div>
                ) : (
                  <div className="divide-y divide-[#E8DFD5]">
                    {blogPosts.map((post) => (
                      <div key={post.id} className="p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 hover:bg-[#FAF7F2] transition-colors">
                        <div className="flex items-center gap-4">
                          <div className="w-16 h-12 rounded-lg overflow-hidden bg-[#F4EFEB] shrink-0 border border-[#E8DFD5]">
                            <img src={post.featured_image} alt="" className="w-full h-full object-cover" />
                          </div>
                          <div>
                            <span className="text-[10px] font-bold uppercase tracking-wider text-[#6B1724] block">
                              {post.category} · {post.publication_date}
                            </span>
                            <h4 className="font-display font-bold text-sm text-[#221F1F] leading-snug">
                              {post.title}
                            </h4>
                            <span className="text-[11px] text-[#8C827A]">Views: {post.views_count || 0}</span>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 self-end sm:self-center">
                          <button
                            onClick={() => {
                              setEditingPost(post);
                              setPostForm({
                                title: post.title,
                                category: post.category,
                                featuredImage: post.featured_image,
                                excerpt: post.excerpt,
                                content: post.content,
                                author: post.author,
                                publicationDate: post.publication_date,
                                status: post.status,
                              });
                            }}
                            className="p-2 border border-[#E8DFD5] rounded-lg text-xs hover:bg-white text-[#221F1F]"
                          >
                            <Edit className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => handleDeletePost(post.id, post.title)}
                            className="p-2 border border-red-200 text-red-600 rounded-lg text-xs hover:bg-red-50"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* TAB 4: CAMPUS GALLERY */}
          {activeTab === 'gallery' && (
            <div className="max-w-6xl mx-auto space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="font-display text-2xl font-bold text-[#221F1F]">Campus Visual Gallery</h2>
                  <p className="text-xs text-[#57534E]">Curate verified campus photographs and categories.</p>
                </div>
                {!isCreatingGallery && !editingGallery && (
                  <button
                    onClick={() => {
                      setEditingGallery(null);
                      setGalleryForm({
                        title: '',
                        category: 'Classrooms',
                        src: '/images/sitting_children_sealed.jpg',
                        description: '',
                        tag: 'Classrooms',
                        sortOrder: 0,
                        isPublished: true,
                      });
                      setIsCreatingGallery(true);
                    }}
                    className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#6B1724] text-white text-xs font-semibold rounded-lg hover:bg-[#52111B]"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add Gallery Image</span>
                  </button>
                )}
              </div>

              {/* Gallery form */}
              {(isCreatingGallery || editingGallery) && (
                <div className="bg-white border border-[#E8DFD5] rounded-2xl p-6 shadow-sm">
                  <h3 className="font-display text-lg font-bold text-[#221F1F] mb-4 pb-2 border-b border-[#E8DFD5]">
                    {editingGallery ? 'Edit Gallery Photo' : 'Add Campus Photo'}
                  </h3>
                  <form onSubmit={handleSaveGallery} className="space-y-4 text-xs">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block font-bold mb-1">Title *</label>
                        <input
                          type="text"
                          required
                          value={galleryForm.title}
                          onChange={(e) => setGalleryForm({ ...galleryForm, title: e.target.value })}
                          className="w-full p-2.5 rounded-lg border border-[#E8DFD5]"
                        />
                      </div>
                      <div>
                        <label className="block font-bold mb-1">Category *</label>
                        <select
                          value={galleryForm.category}
                          onChange={(e) => setGalleryForm({ ...galleryForm, category: e.target.value })}
                          className="w-full p-2.5 rounded-lg border border-[#E8DFD5] bg-white"
                        >
                          <option value="Classrooms">Classrooms</option>
                          <option value="Library">Library</option>
                          <option value="Playground">Playground</option>
                          <option value="Sports">Sports</option>
                          <option value="School Events">School Events</option>
                          <option value="Students">Students</option>
                          <option value="School Environment">School Environment</option>
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block font-bold mb-1">Image URL / Path *</label>
                        <input
                          type="text"
                          required
                          value={galleryForm.src}
                          onChange={(e) => setGalleryForm({ ...galleryForm, src: e.target.value })}
                          className="w-full p-2.5 rounded-lg border border-[#E8DFD5]"
                        />
                      </div>
                      <div>
                        <label className="block font-bold mb-1">Tag / Kicker</label>
                        <input
                          type="text"
                          value={galleryForm.tag}
                          onChange={(e) => setGalleryForm({ ...galleryForm, tag: e.target.value })}
                          className="w-full p-2.5 rounded-lg border border-[#E8DFD5]"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block font-bold mb-1">Description</label>
                      <textarea
                        rows={2}
                        value={galleryForm.description}
                        onChange={(e) => setGalleryForm({ ...galleryForm, description: e.target.value })}
                        className="w-full p-2.5 rounded-lg border border-[#E8DFD5]"
                      />
                    </div>

                    <div className="flex justify-end gap-2 pt-2">
                      <button
                        type="button"
                        onClick={() => {
                          setIsCreatingGallery(false);
                          setEditingGallery(null);
                        }}
                        className="px-4 py-2 border rounded-lg"
                      >
                        Cancel
                      </button>
                      <button type="submit" className="px-5 py-2 bg-[#6B1724] text-white rounded-lg font-semibold">
                        Save Gallery Item
                      </button>
                    </div>
                  </form>
                </div>
              )}

              {/* Gallery Grid */}
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {galleryItems.map((item) => (
                  <div key={item.id} className="bg-white border border-[#E8DFD5] rounded-xl overflow-hidden shadow-xs flex flex-col justify-between">
                    <div>
                      <div className="aspect-square bg-[#FAF7F2] overflow-hidden">
                        <img src={item.src} alt="" className="w-full h-full object-cover" />
                      </div>
                      <div className="p-3">
                        <span className="text-[10px] font-bold uppercase text-[#C88A1A] block">{item.category}</span>
                        <h4 className="font-display font-bold text-xs text-[#221F1F] line-clamp-1">{item.title}</h4>
                      </div>
                    </div>
                    <div className="p-2 border-t border-[#E8DFD5] flex items-center justify-between text-xs">
                      <button
                        onClick={() => {
                          setEditingGallery(item);
                          setGalleryForm({
                            title: item.title,
                            category: item.category,
                            src: item.src,
                            description: item.description || '',
                            tag: item.tag || '',
                            sortOrder: item.sort_order || 0,
                            isPublished: Boolean(item.is_published),
                          });
                        }}
                        className="text-[#6B1724] font-semibold hover:underline"
                      >
                        Edit
                      </button>
                      <button onClick={() => handleDeleteGallery(item.id, item.title)} className="text-red-600">
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 5: ANNOUNCEMENTS */}
          {activeTab === 'announcements' && (
            <div className="max-w-5xl mx-auto space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="font-display text-2xl font-bold text-[#221F1F]">School Announcements CMS</h2>
                  <p className="text-xs text-[#57534E]">Manage banners and public announcements across the site.</p>
                </div>
                {!isCreatingAnn && !editingAnnouncement && (
                  <button
                    onClick={() => {
                      setEditingAnnouncement(null);
                      setAnnForm({
                        title: '',
                        message: '',
                        featuredImage: '/images/boy_and_girl_sealed.jpg',
                        publishDate: new Date().toISOString().split('T')[0],
                        expiryDate: '',
                        status: 'published',
                        displayOnHome: true,
                      });
                      setIsCreatingAnn(true);
                    }}
                    className="px-4 py-2 bg-[#6B1724] text-white text-xs font-semibold rounded-lg hover:bg-[#52111B]"
                  >
                    + New Notice
                  </button>
                )}
              </div>

              {/* Form */}
              {(isCreatingAnn || editingAnnouncement) && (
                <div className="bg-white border border-[#E8DFD5] rounded-2xl p-6 shadow-sm">
                  <form onSubmit={handleSaveAnnouncement} className="space-y-4 text-xs">
                    <div>
                      <label className="block font-bold mb-1">Title *</label>
                      <input
                        type="text"
                        required
                        value={annForm.title}
                        onChange={(e) => setAnnForm({ ...annForm, title: e.target.value })}
                        className="w-full p-2.5 rounded-lg border border-[#E8DFD5]"
                      />
                    </div>
                    <div>
                      <label className="block font-bold mb-1">Message *</label>
                      <textarea
                        rows={3}
                        required
                        value={annForm.message}
                        onChange={(e) => setAnnForm({ ...annForm, message: e.target.value })}
                        className="w-full p-2.5 rounded-lg border border-[#E8DFD5]"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block font-bold mb-1">Publish Date *</label>
                        <input
                          type="date"
                          required
                          value={annForm.publishDate}
                          onChange={(e) => setAnnForm({ ...annForm, publishDate: e.target.value })}
                          className="w-full p-2 rounded-lg border border-[#E8DFD5]"
                        />
                      </div>
                      <div>
                        <label className="block font-bold mb-1">Expiry Date (Optional)</label>
                        <input
                          type="date"
                          value={annForm.expiryDate}
                          onChange={(e) => setAnnForm({ ...annForm, expiryDate: e.target.value })}
                          className="w-full p-2 rounded-lg border border-[#E8DFD5]"
                        />
                      </div>
                    </div>
                    <div className="flex justify-end gap-2 pt-2">
                      <button
                        type="button"
                        onClick={() => {
                          setIsCreatingAnn(false);
                          setEditingAnnouncement(null);
                        }}
                        className="px-4 py-2 border rounded-lg"
                      >
                        Cancel
                      </button>
                      <button type="submit" className="px-5 py-2 bg-[#6B1724] text-white rounded-lg font-semibold">
                        Save Notice
                      </button>
                    </div>
                  </form>
                </div>
              )}

              {/* List */}
              <div className="space-y-3">
                {announcements.map((ann) => (
                  <div key={ann.id} className="bg-white border border-[#E8DFD5] rounded-xl p-4 flex items-center justify-between gap-4">
                    <div>
                      <span className="text-[10px] font-bold uppercase text-[#C88A1A] block">{ann.publish_date}</span>
                      <h4 className="font-display font-bold text-sm text-[#221F1F]">{ann.title}</h4>
                      <p className="text-xs text-[#57534E] mt-0.5">{ann.message}</p>
                    </div>
                    <button
                      onClick={() => {
                        setEditingAnnouncement(ann);
                        setAnnForm({
                          title: ann.title,
                          message: ann.message,
                          featuredImage: ann.featured_image || '',
                          publishDate: ann.publish_date,
                          expiryDate: ann.expiry_date || '',
                          status: ann.status,
                          displayOnHome: Boolean(ann.display_on_home),
                        });
                      }}
                      className="px-3 py-1.5 border border-[#E8DFD5] text-xs font-semibold rounded-lg hover:bg-[#FAF7F2]"
                    >
                      Edit
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 6: SCHOOL INFO CMS */}
          {activeTab === 'school_info' && schoolInfoData && (
            <div className="max-w-4xl mx-auto space-y-6">
              <div>
                <h2 className="font-display text-2xl font-bold text-[#221F1F]">School Information CMS</h2>
                <p className="text-xs text-[#57534E]">Update school core identity, mottos, address, phone and biography without developer code changes.</p>
              </div>

              <form onSubmit={handleUpdateSchoolInfo} className="bg-white border border-[#E8DFD5] rounded-2xl p-6 sm:p-8 space-y-4 text-xs shadow-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-bold mb-1">Official School Name</label>
                    <input
                      type="text"
                      value={schoolInfoData.name}
                      onChange={(e) => setSchoolInfoData({ ...schoolInfoData, name: e.target.value })}
                      className="w-full p-2.5 rounded-lg border border-[#E8DFD5]"
                    />
                  </div>
                  <div>
                    <label className="block font-bold mb-1">Registered Entity Name</label>
                    <input
                      type="text"
                      value={schoolInfoData.registered_name}
                      onChange={(e) => setSchoolInfoData({ ...schoolInfoData, registered_name: e.target.value })}
                      className="w-full p-2.5 rounded-lg border border-[#E8DFD5]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-bold mb-1">School Motto</label>
                    <input
                      type="text"
                      value={schoolInfoData.tagline}
                      onChange={(e) => setSchoolInfoData({ ...schoolInfoData, tagline: e.target.value })}
                      className="w-full p-2.5 rounded-lg border border-[#E8DFD5]"
                    />
                  </div>
                  <div>
                    <label className="block font-bold mb-1">College Motto</label>
                    <input
                      type="text"
                      value={schoolInfoData.college_motto}
                      onChange={(e) => setSchoolInfoData({ ...schoolInfoData, college_motto: e.target.value })}
                      className="w-full p-2.5 rounded-lg border border-[#E8DFD5]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block font-bold mb-1">Primary Phone</label>
                    <input
                      type="text"
                      value={schoolInfoData.primary_phone}
                      onChange={(e) => setSchoolInfoData({ ...schoolInfoData, primary_phone: e.target.value })}
                      className="w-full p-2.5 rounded-lg border border-[#E8DFD5]"
                    />
                  </div>
                  <div>
                    <label className="block font-bold mb-1">Secondary Phone</label>
                    <input
                      type="text"
                      value={schoolInfoData.secondary_phone}
                      onChange={(e) => setSchoolInfoData({ ...schoolInfoData, secondary_phone: e.target.value })}
                      className="w-full p-2.5 rounded-lg border border-[#E8DFD5]"
                    />
                  </div>
                  <div>
                    <label className="block font-bold mb-1">Official Email</label>
                    <input
                      type="email"
                      value={schoolInfoData.email}
                      onChange={(e) => setSchoolInfoData({ ...schoolInfoData, email: e.target.value })}
                      className="w-full p-2.5 rounded-lg border border-[#E8DFD5]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-bold mb-1">Physical Address</label>
                  <input
                    type="text"
                    value={schoolInfoData.full_address}
                    onChange={(e) => setSchoolInfoData({ ...schoolInfoData, full_address: e.target.value })}
                    className="w-full p-2.5 rounded-lg border border-[#E8DFD5]"
                  />
                </div>

                <div>
                  <label className="block font-bold mb-1">About Text</label>
                  <textarea
                    rows={3}
                    value={schoolInfoData.about_text || ''}
                    onChange={(e) => setSchoolInfoData({ ...schoolInfoData, about_text: e.target.value })}
                    className="w-full p-2.5 rounded-lg border border-[#E8DFD5]"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-bold mb-1">Mission Statement</label>
                    <textarea
                      rows={2}
                      value={schoolInfoData.mission_text || ''}
                      onChange={(e) => setSchoolInfoData({ ...schoolInfoData, mission_text: e.target.value })}
                      className="w-full p-2.5 rounded-lg border border-[#E8DFD5]"
                    />
                  </div>
                  <div>
                    <label className="block font-bold mb-1">Vision Statement</label>
                    <textarea
                      rows={2}
                      value={schoolInfoData.vision_text || ''}
                      onChange={(e) => setSchoolInfoData({ ...schoolInfoData, vision_text: e.target.value })}
                      className="w-full p-2.5 rounded-lg border border-[#E8DFD5]"
                    />
                  </div>
                </div>

                <div className="pt-4 border-t border-[#E8DFD5] flex justify-end">
                  <button type="submit" className="px-6 py-2.5 bg-[#6B1724] text-white font-semibold rounded-lg shadow-xs hover:bg-[#52111B]">
                    Save School Profile
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* TAB 7: ADMISSION SETTINGS */}
          {activeTab === 'admission_settings' && admissionSettingsData && (
            <div className="max-w-4xl mx-auto space-y-6">
              <div>
                <h2 className="font-display text-2xl font-bold text-[#221F1F]">Admission Settings CMS</h2>
                <p className="text-xs text-[#57534E]">Control active intake session, application deadline, pay later policies and instructions.</p>
              </div>

              <form onSubmit={handleUpdateAdmissionSettings} className="bg-white border border-[#E8DFD5] rounded-2xl p-6 sm:p-8 space-y-4 text-xs shadow-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-bold mb-1">Admission Portal Status</label>
                    <select
                      value={admissionSettingsData.isOpen ? 'open' : 'closed'}
                      onChange={(e) => setAdmissionSettingsData({ ...admissionSettingsData, isOpen: e.target.value === 'open' })}
                      className="w-full p-2.5 rounded-lg border border-[#E8DFD5] bg-white"
                    >
                      <option value="open">Open (Accepting Submissions)</option>
                      <option value="closed">Closed (Portal Locked)</option>
                    </select>
                  </div>
                  <div>
                    <label className="block font-bold mb-1">Application Deadline</label>
                    <input
                      type="text"
                      value={admissionSettingsData.application_deadline || ''}
                      onChange={(e) => setAdmissionSettingsData({ ...admissionSettingsData, applicationDeadline: e.target.value, application_deadline: e.target.value })}
                      className="w-full p-2.5 rounded-lg border border-[#E8DFD5]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-bold mb-1">Application Instructions</label>
                  <textarea
                    rows={2}
                    value={admissionSettingsData.admission_instructions || ''}
                    onChange={(e) => setAdmissionSettingsData({ ...admissionSettingsData, admissionInstructions: e.target.value, admission_instructions: e.target.value })}
                    className="w-full p-2.5 rounded-lg border border-[#E8DFD5]"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-bold mb-1">Scholarship / Merit Policy</label>
                    <textarea
                      rows={2}
                      value={admissionSettingsData.scholarship_info || ''}
                      onChange={(e) => setAdmissionSettingsData({ ...admissionSettingsData, scholarshipInfo: e.target.value, scholarship_info: e.target.value })}
                      className="w-full p-2.5 rounded-lg border border-[#E8DFD5]"
                    />
                  </div>
                  <div>
                    <label className="block font-bold mb-1">Pay Later Policy Information</label>
                    <textarea
                      rows={2}
                      value={admissionSettingsData.pay_later_info || ''}
                      onChange={(e) => setAdmissionSettingsData({ ...admissionSettingsData, payLaterInfo: e.target.value, pay_later_info: e.target.value })}
                      className="w-full p-2.5 rounded-lg border border-[#E8DFD5]"
                    />
                  </div>
                </div>

                <div className="pt-4 border-t border-[#E8DFD5] flex justify-end">
                  <button type="submit" className="px-6 py-2.5 bg-[#6B1724] text-white font-semibold rounded-lg shadow-xs hover:bg-[#52111B]">
                    Save Admission Settings
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* TAB 8: MEDIA LIBRARY */}
          {activeTab === 'media' && (
            <div className="max-w-6xl mx-auto space-y-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <h2 className="font-display text-2xl font-bold text-[#221F1F]">Central Media Library</h2>
                  <p className="text-xs text-[#57534E]">Upload verified campus photos, staff pictures and document assets.</p>
                </div>

                <div className="flex items-center gap-3">
                  <label className="inline-flex items-center gap-2 px-4 py-2 bg-[#6B1724] text-white text-xs font-semibold rounded-lg hover:bg-[#52111B] cursor-pointer shadow-xs">
                    <Upload className="w-4 h-4" />
                    <span>{isUploading ? 'Uploading...' : 'Upload File'}</span>
                    <input
                      type="file"
                      accept=".jpg,.jpeg,.png,.webp,.pdf,.mp4"
                      onChange={handleFileUpload}
                      disabled={isUploading}
                      className="hidden"
                    />
                  </label>
                </div>
              </div>

              {/* Upload settings mini-bar */}
              <div className="p-3 bg-white rounded-xl border border-[#E8DFD5] flex flex-wrap items-center gap-4 text-xs">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-[#57534E]">Upload Category:</span>
                  <select
                    value={uploadCategory}
                    onChange={(e) => setUploadCategory(e.target.value)}
                    className="p-1 rounded border border-[#E8DFD5] bg-[#FAF7F2]"
                  >
                    <option value="Campus">Campus</option>
                    <option value="Pupils">Pupils</option>
                    <option value="Staff">Staff</option>
                    <option value="Events">Events</option>
                    <option value="Academics">Academics</option>
                  </select>
                </div>
                <div className="flex items-center gap-2 flex-1">
                  <span className="font-bold text-[#57534E]">Alt Text:</span>
                  <input
                    type="text"
                    placeholder="Short description for accessibility"
                    value={uploadAlt}
                    onChange={(e) => setUploadAlt(e.target.value)}
                    className="flex-1 p-1 rounded border border-[#E8DFD5]"
                  />
                </div>
              </div>

              {/* Media Items Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {mediaItems.map((item) => (
                  <div key={item.id} className="bg-white border border-[#E8DFD5] rounded-xl overflow-hidden p-2 text-xs flex flex-col justify-between">
                    <div>
                      <div className="aspect-square bg-[#FAF7F2] rounded-lg overflow-hidden mb-2">
                        <img src={item.url} alt="" className="w-full h-full object-cover" />
                      </div>
                      <span className="text-[10px] font-bold text-[#C88A1A] block">{item.category}</span>
                      <p className="font-bold text-[#221F1F] truncate" title={item.original_name}>
                        {item.original_name}
                      </p>
                      <span className="text-[10px] text-[#8C827A]">{(item.size_bytes / 1024).toFixed(0)} KB</span>
                    </div>
                    <div className="pt-2 border-t border-[#E8DFD5] flex items-center justify-between mt-2">
                      <button
                        onClick={() => {
                          navigator.clipboard.writeText(item.url);
                          showToast('Image URL copied to clipboard.');
                        }}
                        className="text-[10px] font-semibold text-[#6B1724] hover:underline"
                      >
                        Copy URL
                      </button>
                      <button
                        onClick={() => {
                          setConfirmDialog({
                            isOpen: true,
                            title: 'Delete Media File?',
                            message: `Delete "${item.original_name}"?`,
                            onConfirm: async () => {
                              await fetch(`/api/admin/media/${item.id}`, {
                                method: 'DELETE',
                                headers: { Authorization: `Bearer ${token}` },
                              });
                              loadMedia(token!);
                            },
                          });
                        }}
                        className="text-red-600"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 9: CONTACT ENQUIRIES */}
          {activeTab === 'enquiries' && (
            <div className="max-w-5xl mx-auto space-y-6">
              <div>
                <h2 className="font-display text-2xl font-bold text-[#221F1F]">Contact Enquiries Desk</h2>
                <p className="text-xs text-[#57534E]">Direct messages sent by prospective families through the public contact form.</p>
              </div>

              <div className="space-y-3">
                {enquiries.length === 0 ? (
                  <div className="p-12 text-center text-xs text-[#57534E] bg-white rounded-2xl border border-[#E8DFD5]">
                    No parent inquiries have been received yet.
                  </div>
                ) : (
                  enquiries.map((enq) => (
                    <div key={enq.id} className="bg-white border border-[#E8DFD5] rounded-xl p-5 shadow-xs">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-display font-bold text-sm text-[#221F1F]">{enq.subject}</span>
                        <span className="text-[10px] text-[#8C827A]">{enq.created_at?.split('T')[0]}</span>
                      </div>
                      <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-[#57534E] mb-3 pb-2 border-b border-[#E8DFD5]">
                        <span>From: <strong>{enq.full_name}</strong></span>
                        <span>Email: <a href={`mailto:${enq.email}`} className="text-[#6B1724] underline">{enq.email}</a></span>
                        <span>Phone: <a href={`tel:${enq.phone}`} className="text-[#6B1724] underline">{enq.phone}</a></span>
                      </div>
                      <p className="text-xs text-[#221F1F] leading-relaxed whitespace-pre-wrap">{enq.message}</p>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}

          {/* TAB 10: AUDIT TRAIL */}
          {activeTab === 'audit' && (
            <div className="max-w-5xl mx-auto space-y-6">
              <div>
                <h2 className="font-display text-2xl font-bold text-[#221F1F]">Administrative Audit Trail</h2>
                <p className="text-xs text-[#57534E]">Immutable log of status changes, publishes, settings updates, and deletions.</p>
              </div>

              <div className="bg-white border border-[#E8DFD5] rounded-2xl overflow-hidden shadow-xs">
                {auditLogs.length === 0 ? (
                  <div className="p-12 text-center text-xs text-[#57534E]">No audit events recorded yet.</div>
                ) : (
                  <table className="w-full text-left text-xs">
                    <thead className="bg-[#FAF7F2] border-b border-[#E8DFD5] text-[#57534E] font-bold text-[10px] uppercase">
                      <tr>
                        <th className="p-3">Timestamp</th>
                        <th className="p-3">Admin</th>
                        <th className="p-3">Action</th>
                        <th className="p-3">Affected Record</th>
                        <th className="p-3">Details</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#E8DFD5]">
                      {auditLogs.map((log) => (
                        <tr key={log.id} className="hover:bg-[#FAF7F2]">
                          <td className="p-3 text-[11px] text-[#8C827A]">{log.created_at?.replace('T', ' ').slice(0, 19)}</td>
                          <td className="p-3 font-bold text-[#6B1724]">{log.admin_username}</td>
                          <td className="p-3 font-mono text-[10px] uppercase">{log.action}</td>
                          <td className="p-3 font-semibold">{log.affected_record}</td>
                          <td className="p-3 text-[#57534E]">{log.details}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
            </div>
          )}

          {/* TAB 11: ADMIN USERS */}
          {activeTab === 'users' && (
            <div className="max-w-4xl mx-auto space-y-6">
              <div>
                <h2 className="font-display text-2xl font-bold text-[#221F1F]">Authorized Staff & Administrators</h2>
                <p className="text-xs text-[#57534E]">Role-based access management for Super Admins, Admissions Officers, and Content Editors.</p>
              </div>

              <div className="bg-white border border-[#E8DFD5] rounded-2xl overflow-hidden shadow-xs">
                <table className="w-full text-left text-xs">
                  <thead className="bg-[#FAF7F2] border-b border-[#E8DFD5] font-bold text-[10px] uppercase text-[#57534E]">
                    <tr>
                      <th className="p-3.5">Full Name</th>
                      <th className="p-3.5">Username</th>
                      <th className="p-3.5">Assigned Role</th>
                      <th className="p-3.5">Created Date</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#E8DFD5]">
                    {adminUsers.map((u) => (
                      <tr key={u.id}>
                        <td className="p-3.5 font-bold text-[#221F1F]">{u.full_name}</td>
                        <td className="p-3.5 font-mono text-[#6B1724]">{u.username}</td>
                        <td className="p-3.5">
                          <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-[#FAF7F2] border border-[#E8DFD5] text-[#1B4332]">
                            {u.role}
                          </span>
                        </td>
                        <td className="p-3.5 text-[#57534E]">{u.created_at?.split('T')[0]}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 12: STAFF FACULTY CMS */}
          {activeTab === 'staff' && (
            <div className="max-w-5xl mx-auto space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="font-display text-2xl font-bold text-[#221F1F]">Staff & Faculty Profiles CMS</h2>
                  <p className="text-xs text-[#57534E]">Manage profiles for school leadership, classroom mentors and certified teachers.</p>
                </div>
                {!isCreatingStaff && !editingStaff && (
                  <button
                    onClick={() => {
                      setEditingStaff(null);
                      setStaffForm({
                        name: '',
                        position: '',
                        photograph: '/images/real_teacher_sealed.jpg',
                        biography: '',
                        qualifications: '',
                        subjects: '',
                        status: 'published',
                        sortOrder: 0,
                      });
                      setIsCreatingStaff(true);
                    }}
                    className="px-4 py-2 bg-[#6B1724] text-white text-xs font-semibold rounded-lg hover:bg-[#52111B]"
                  >
                    + Add Staff Profile
                  </button>
                )}
              </div>

              {(isCreatingStaff || editingStaff) && (
                <div className="bg-white border border-[#E8DFD5] rounded-2xl p-6 shadow-sm">
                  <form onSubmit={handleSaveStaff} className="space-y-4 text-xs">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block font-bold mb-1">Name *</label>
                        <input
                          type="text"
                          required
                          value={staffForm.name}
                          onChange={(e) => setStaffForm({ ...staffForm, name: e.target.value })}
                          className="w-full p-2.5 rounded-lg border border-[#E8DFD5]"
                        />
                      </div>
                      <div>
                        <label className="block font-bold mb-1">Position / Title *</label>
                        <input
                          type="text"
                          required
                          value={staffForm.position}
                          onChange={(e) => setStaffForm({ ...staffForm, position: e.target.value })}
                          className="w-full p-2.5 rounded-lg border border-[#E8DFD5]"
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block font-bold mb-1">Photograph URL</label>
                        <input
                          type="text"
                          value={staffForm.photograph}
                          onChange={(e) => setStaffForm({ ...staffForm, photograph: e.target.value })}
                          className="w-full p-2.5 rounded-lg border border-[#E8DFD5]"
                        />
                      </div>
                      <div>
                        <label className="block font-bold mb-1">Qualifications</label>
                        <input
                          type="text"
                          value={staffForm.qualifications}
                          onChange={(e) => setStaffForm({ ...staffForm, qualifications: e.target.value })}
                          className="w-full p-2.5 rounded-lg border border-[#E8DFD5]"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block font-bold mb-1">Biography / Specialization</label>
                      <textarea
                        rows={2}
                        value={staffForm.biography}
                        onChange={(e) => setStaffForm({ ...staffForm, biography: e.target.value })}
                        className="w-full p-2.5 rounded-lg border border-[#E8DFD5]"
                      />
                    </div>
                    <div className="flex justify-end gap-2 pt-2">
                      <button
                        type="button"
                        onClick={() => {
                          setIsCreatingStaff(false);
                          setEditingStaff(null);
                        }}
                        className="px-4 py-2 border rounded-lg"
                      >
                        Cancel
                      </button>
                      <button type="submit" className="px-5 py-2 bg-[#6B1724] text-white rounded-lg font-semibold">
                        Save Staff Profile
                      </button>
                    </div>
                  </form>
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {staffMembers.map((s) => (
                  <div key={s.id} className="bg-white border border-[#E8DFD5] rounded-xl p-4 flex gap-4 items-center">
                    <div className="w-16 h-16 rounded-xl overflow-hidden bg-[#FAF7F2] shrink-0 border border-[#E8DFD5]">
                      <img src={s.photograph} alt="" className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-display font-bold text-sm text-[#221F1F] truncate">{s.name}</h4>
                      <span className="text-[11px] font-semibold text-[#6B1724] block">{s.position}</span>
                      <p className="text-[11px] text-[#57534E] line-clamp-1">{s.qualifications}</p>
                    </div>
                    <button
                      onClick={() => {
                        setEditingStaff(s);
                        setStaffForm({
                          name: s.name,
                          position: s.position,
                          photograph: s.photograph || '',
                          biography: s.biography || '',
                          qualifications: s.qualifications || '',
                          subjects: s.subjects || '',
                          status: s.status,
                          sortOrder: s.sort_order || 0,
                        });
                      }}
                      className="p-1.5 border border-[#E8DFD5] rounded-lg text-xs"
                    >
                      <Edit className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 13: PROGRAMMES CMS */}
          {activeTab === 'programmes' && (
            <div className="max-w-5xl mx-auto space-y-6">
              <div>
                <h2 className="font-display text-2xl font-bold text-[#221F1F]">Academic Programmes CMS</h2>
                <p className="text-xs text-[#57534E]">Classes, age brackets, and focus descriptions.</p>
              </div>

              <div className="space-y-3">
                {programmes.map((p) => (
                  <div key={p.id} className="bg-white border border-[#E8DFD5] rounded-xl p-4 flex items-start justify-between gap-4">
                    <div>
                      <span className="text-[10px] font-bold uppercase text-[#C88A1A] block">{p.age_range}</span>
                      <h4 className="font-display font-bold text-sm text-[#221F1F]">{p.class_name}</h4>
                      <p className="text-xs text-[#57534E] mt-0.5">{p.description}</p>
                    </div>
                    <button
                      onClick={() => {
                        const newDesc = prompt('Update programme description:', p.description);
                        if (newDesc !== null) {
                          fetch(`/api/admin/programmes/${p.id}`, {
                            method: 'PUT',
                            headers: {
                              'Content-Type': 'application/json',
                              Authorization: `Bearer ${token}`,
                            },
                            body: JSON.stringify({ ...p, description: newDesc }),
                          }).then(() => {
                            showToast('Programme updated.');
                            loadProgrammes(token!);
                          });
                        }
                      }}
                      className="px-3 py-1.5 border border-[#E8DFD5] rounded-lg text-xs font-semibold hover:bg-[#FAF7F2]"
                    >
                      Edit
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};
