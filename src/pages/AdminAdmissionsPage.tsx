import React, { useState, useEffect } from 'react';
import {
  Lock,
  User,
  LogOut,
  Search,
  Filter,
  FileSpreadsheet,
  Printer,
  Eye,
  CheckCircle2,
  Clock,
  AlertCircle,
  Sliders,
  Calendar,
  X,
  Save,
  FileText,
  Phone,
  Mail,
  MapPin,
  RefreshCw
} from 'lucide-react';
import { SchoolCrest } from '../components/common/SchoolCrest';
import { AVAILABLE_CLASSES } from '../data/schoolData';

interface AdminAdmissionsPageProps {
  onNavigate: (path: string) => void;
}

export const AdminAdmissionsPage: React.FC<AdminAdmissionsPageProps> = ({ onNavigate }) => {
  const [token, setToken] = useState<string | null>(() => sessionStorage.getItem('snaa_admin_token'));
  const [adminUser, setAdminUser] = useState<any>(null);

  // Login form state
  const [usernameInput, setUsernameInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [loginError, setLoginError] = useState<string | null>(null);
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  // Applications & Dashboard state
  const [applications, setApplications] = useState<any[]>([]);
  const [stats, setStats] = useState<any>({
    total: 0,
    submitted: 0,
    underReview: 0,
    accepted: 0,
    enrolled: 0,
  });
  const [activeSession, setActiveSession] = useState<any>(null);
  const [allSessions, setAllSessions] = useState<any[]>([]);
  const [settings, setSettings] = useState<any>(null);

  // Filters
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [classFilter, setClassFilter] = useState('all');
  const [selectedSessionId, setSelectedSessionId] = useState<string>('');

  // Selected application for detail modal
  const [selectedApp, setSelectedApp] = useState<any | null>(null);
  const [newStatus, setNewStatus] = useState<string>('');
  const [adminNotes, setAdminNotes] = useState<string>('');
  const [isSavingStatus, setIsSavingStatus] = useState(false);

  // Settings modal
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [settingsForm, setSettingsForm] = useState({
    isOpen: true,
    applicationDeadline: '31 August 2026',
    scholarshipInfo: '',
    payLaterInfo: '',
  });

  const [isLoadingData, setIsLoadingData] = useState(false);

  // Check authentication
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
          loadDashboardData(token);
        })
        .catch(() => {
          handleLogout();
        });
    }
  }, [token]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!usernameInput || !passwordInput) return;

    setIsLoggingIn(true);
    setLoginError(null);

    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: usernameInput.trim(),
          password: passwordInput,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Authentication failed. Please verify credentials.');
      }

      sessionStorage.setItem('snaa_admin_token', data.token);
      setToken(data.token);
      setAdminUser(data.user);
      loadDashboardData(data.token);
    } catch (err: any) {
      setLoginError(err.message);
    } finally {
      setIsLoggingIn(false);
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem('snaa_admin_token');
    setToken(null);
    setAdminUser(null);
    setApplications([]);
  };

  const loadDashboardData = async (authToken: string) => {
    setIsLoadingData(true);
    try {
      const queryParams = new URLSearchParams();
      if (searchTerm) queryParams.set('search', searchTerm);
      if (statusFilter !== 'all') queryParams.set('status', statusFilter);
      if (classFilter !== 'all') queryParams.set('classApplied', classFilter);
      if (selectedSessionId) queryParams.set('sessionId', selectedSessionId);

      const [appsRes, settingsRes] = await Promise.all([
        fetch(`/api/admin/applications?${queryParams.toString()}`, {
          headers: { Authorization: `Bearer ${authToken}` },
        }),
        fetch('/api/admin/settings', {
          headers: { Authorization: `Bearer ${authToken}` },
        }),
      ]);

      if (appsRes.ok) {
        const data = await appsRes.json();
        setApplications(data.applications || []);
        setStats(data.stats || {});
        setActiveSession(data.activeSession);
      }

      if (settingsRes.ok) {
        const sData = await settingsRes.json();
        setSettings(sData.settings);
        setAllSessions(sData.sessions || []);
        if (sData.settings) {
          setSettingsForm({
            isOpen: sData.settings.isOpen,
            applicationDeadline: sData.settings.application_deadline || '',
            scholarshipInfo: sData.settings.scholarship_info || '',
            payLaterInfo: sData.settings.pay_later_info || '',
          });
        }
      }
    } catch (err) {
      console.error('Failed to load admin applications', err);
    } finally {
      setIsLoadingData(false);
    }
  };

  // Re-fetch on filter change
  useEffect(() => {
    if (token) {
      loadDashboardData(token);
    }
  }, [searchTerm, statusFilter, classFilter, selectedSessionId]);

  const handleOpenAppDetail = (app: any) => {
    setSelectedApp(app);
    setNewStatus(app.status);
    setAdminNotes(app.admin_notes || '');
  };

  const handleSaveStatus = async () => {
    if (!selectedApp || !token) return;
    setIsSavingStatus(true);
    try {
      const res = await fetch(`/api/admin/applications/${selectedApp.id}/status`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          status: newStatus,
          adminNotes: adminNotes,
        }),
      });

      if (res.ok) {
        setSelectedApp(null);
        loadDashboardData(token);
      }
    } catch (err) {
      console.error('Failed to update status', err);
    } finally {
      setIsSavingStatus(false);
    }
  };

  const handleSaveSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) return;
    try {
      const res = await fetch('/api/admin/settings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(settingsForm),
      });
      if (res.ok) {
        setIsSettingsOpen(false);
        loadDashboardData(token);
      }
    } catch (err) {
      console.error('Failed to save settings', err);
    }
  };

  const exportCSV = () => {
    if (applications.length === 0) return;
    const headers = [
      'Reference Number',
      'Student Name',
      'Gender',
      'DOB',
      'Class Applied',
      'Guardian Name',
      'Guardian Phone',
      'Guardian Email',
      'Address',
      'Pay Later Requested',
      'Status',
      'Submission Date',
    ];

    const rows = applications.map((a) => [
      a.reference_number,
      `"${a.student_full_name}"`,
      a.gender,
      a.date_of_birth,
      `"${a.class_applied_for}"`,
      `"${a.guardian_full_name}"`,
      `"${a.guardian_phone}"`,
      `"${a.guardian_email || ''}"`,
      `"${a.home_address.replace(/"/g, '""')}"`,
      a.pay_later_requested ? 'Yes' : 'No',
      a.status,
      a.submission_date,
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `SNAA_Applications_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // If not authenticated, render Login Screen
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
              Administrative Control
            </span>
            <h1 className="font-display text-2xl font-bold text-[#221F1F]">
              Admissions Portal Login
            </h1>
            <p className="text-xs text-[#57534E] mt-1">
              Authorized personnel only. All access is logged and verified.
            </p>
          </div>

          {loginError && (
            <div className="mb-4 p-3 rounded-lg bg-red-50 border border-red-200 text-xs text-red-800 flex items-start gap-2">
              <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
              <span>{loginError}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-[#221F1F] uppercase tracking-wider mb-1">
                Admin Username
              </label>
              <div className="relative">
                <input
                  type="text"
                  required
                  placeholder="Username"
                  value={usernameInput}
                  onChange={(e) => setUsernameInput(e.target.value)}
                  className="w-full pl-9 pr-3.5 py-2.5 rounded-lg border border-[#E8DFD5] text-sm text-[#221F1F] focus:outline-none focus:border-[#6B1724]"
                />
                <User className="w-4 h-4 text-[#57534E] absolute left-3 top-3" />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-[#221F1F] uppercase tracking-wider mb-1">
                Password
              </label>
              <div className="relative">
                <input
                  type="password"
                  required
                  placeholder="••••••••••••"
                  value={passwordInput}
                  onChange={(e) => setPasswordInput(e.target.value)}
                  className="w-full pl-9 pr-3.5 py-2.5 rounded-lg border border-[#E8DFD5] text-sm text-[#221F1F] focus:outline-none focus:border-[#6B1724]"
                />
                <Lock className="w-4 h-4 text-[#57534E] absolute left-3 top-3" />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoggingIn}
              className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-lg bg-[#6B1724] text-white text-sm font-semibold hover:bg-[#52111B] transition-colors shadow-xs"
            >
              {isLoggingIn ? (
                <>
                  <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Verifying Credentials...</span>
                </>
              ) : (
                <span>Access Admin Dashboard</span>
              )}
            </button>
          </form>

          <div className="mt-6 pt-4 border-t border-[#E8DFD5] text-center">
            <button
              onClick={() => onNavigate('/')}
              className="text-xs text-[#57534E] hover:text-[#6B1724] font-medium"
            >
              ← Return to School Homepage
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Authenticated Admin Dashboard
  return (
    <div className="min-h-screen bg-[#FAF7F2] pb-16">
      {/* Admin Top Navigation */}
      <header className="bg-[#4F101A] text-white border-b-2 border-[#D49A24] px-4 sm:px-8 py-3.5">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <SchoolCrest size="sm" lightMode={true} />
            <span className="text-xs sm:text-sm font-bold uppercase tracking-wider text-[#D49A24] hidden sm:inline">
              Admissions Administration
            </span>
          </div>

          <div className="flex items-center gap-4 text-xs">
            <span className="text-white/80 hidden md:inline">
              Logged in as: <strong className="text-white">{adminUser?.username || 'Admin'}</strong>
            </span>

            <button
              onClick={() => setIsSettingsOpen(true)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
            >
              <Sliders className="w-3.5 h-3.5 text-[#D49A24]" />
              <span>Settings</span>
            </button>

            <button
              onClick={handleLogout}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-red-950/80 hover:bg-red-900 transition-colors text-white"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Admin Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        {/* Header Title & Academic Session Selection */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="font-display text-2xl sm:text-3xl font-bold text-[#221F1F]">
              Student Admission Applications
            </h1>
            <p className="text-xs text-[#57534E] mt-0.5">
              Persistent school database records for Makun, Sagamu campus.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-lg border border-[#E8DFD5] text-xs">
              <Calendar className="w-4 h-4 text-[#6B1724]" />
              <span className="font-semibold text-[#57534E]">Active Session:</span>
              <strong className="text-[#6B1724]">{activeSession?.name || '2026/2027'}</strong>
            </div>

            <button
              onClick={() => loadDashboardData(token)}
              disabled={isLoadingData}
              className="p-2 rounded-lg bg-white border border-[#E8DFD5] hover:bg-[#F4EFEB] transition-colors text-[#57534E]"
              title="Refresh Records"
            >
              <RefreshCw className={`w-4 h-4 ${isLoadingData ? 'animate-spin' : ''}`} />
            </button>

            <button
              onClick={exportCSV}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-[#1B4332] text-white text-xs font-semibold hover:bg-[#133024] transition-colors shadow-xs"
            >
              <FileSpreadsheet className="w-3.5 h-3.5" />
              <span>Export CSV</span>
            </button>
          </div>
        </div>

        {/* Database-Driven Statistic Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 sm:gap-4 mb-8">
          <div className="bg-white border border-[#E8DFD5] rounded-xl p-4 shadow-xs">
            <span className="text-[11px] font-bold text-[#57534E] uppercase tracking-wider block">
              Total Applications
            </span>
            <span className="text-2xl font-bold font-mono text-[#221F1F] tabular-nums mt-1 block">
              {stats.total || 0}
            </span>
          </div>

          <div className="bg-white border border-[#E8DFD5] rounded-xl p-4 shadow-xs">
            <span className="text-[11px] font-bold text-[#6B1724] uppercase tracking-wider block">
              Submitted (New)
            </span>
            <span className="text-2xl font-bold font-mono text-[#6B1724] tabular-nums mt-1 block">
              {stats.submitted || 0}
            </span>
          </div>

          <div className="bg-white border border-[#E8DFD5] rounded-xl p-4 shadow-xs">
            <span className="text-[11px] font-bold text-blue-700 uppercase tracking-wider block">
              Under Review
            </span>
            <span className="text-2xl font-bold font-mono text-blue-700 tabular-nums mt-1 block">
              {stats.underReview || 0}
            </span>
          </div>

          <div className="bg-white border border-[#E8DFD5] rounded-xl p-4 shadow-xs">
            <span className="text-[11px] font-bold text-[#C88A1A] uppercase tracking-wider block">
              Accepted
            </span>
            <span className="text-2xl font-bold font-mono text-[#C88A1A] tabular-nums mt-1 block">
              {stats.accepted || 0}
            </span>
          </div>

          <div className="bg-white border border-[#E8DFD5] rounded-xl p-4 shadow-xs col-span-2 sm:col-span-1">
            <span className="text-[11px] font-bold text-[#1B4332] uppercase tracking-wider block">
              Enrolled
            </span>
            <span className="text-2xl font-bold font-mono text-[#1B4332] tabular-nums mt-1 block">
              {stats.enrolled || 0}
            </span>
          </div>
        </div>

        {/* Filter Controls Bar */}
        <div className="bg-white border border-[#E8DFD5] rounded-xl p-4 mb-6 shadow-xs flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between">
          <div className="relative flex-1">
            <input
              type="text"
              placeholder="Search by student name, ref number, or guardian phone..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2 rounded-lg border border-[#E8DFD5] text-xs text-[#221F1F] focus:outline-none focus:border-[#6B1724]"
            />
            <Search className="w-4 h-4 text-[#57534E] absolute left-3 top-2.5" />
          </div>

          <div className="flex flex-wrap items-center gap-3 text-xs">
            <div className="flex items-center gap-1.5">
              <Filter className="w-3.5 h-3.5 text-[#57534E]" />
              <span className="text-[#57534E]">Status:</span>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-2.5 py-1.5 rounded-lg border border-[#E8DFD5] bg-white text-xs text-[#221F1F] focus:outline-none"
              >
                <option value="all">All Statuses</option>
                <option value="Submitted">Submitted</option>
                <option value="Under Review">Under Review</option>
                <option value="Shortlisted">Shortlisted</option>
                <option value="Interview">Interview</option>
                <option value="Accepted">Accepted</option>
                <option value="Declined">Declined</option>
                <option value="Enrolled">Enrolled</option>
              </select>
            </div>

            <div className="flex items-center gap-1.5">
              <span className="text-[#57534E]">Class:</span>
              <select
                value={classFilter}
                onChange={(e) => setClassFilter(e.target.value)}
                className="px-2.5 py-1.5 rounded-lg border border-[#E8DFD5] bg-white text-xs text-[#221F1F] focus:outline-none"
              >
                <option value="all">All Classes</option>
                {AVAILABLE_CLASSES.map((cls) => (
                  <option key={cls} value={cls}>
                    {cls}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Applications Data Table */}
        <div className="bg-white border border-[#E8DFD5] rounded-xl shadow-xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#FAF7F2] border-b border-[#E8DFD5] text-[#57534E] font-bold uppercase tracking-wider text-[11px]">
                <tr>
                  <th className="py-3.5 px-4">Ref Number</th>
                  <th className="py-3.5 px-4">Student Name</th>
                  <th className="py-3.5 px-4">Class</th>
                  <th className="py-3.5 px-4">Guardian Contact</th>
                  <th className="py-3.5 px-4">Pay Later?</th>
                  <th className="py-3.5 px-4">Date</th>
                  <th className="py-3.5 px-4">Status</th>
                  <th className="py-3.5 px-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E8DFD5]">
                {applications.length > 0 ? (
                  applications.map((app) => (
                    <tr key={app.id} className="hover:bg-[#FAF7F2]/60 transition-colors">
                      <td className="py-3 px-4 font-mono font-bold text-[#6B1724]">
                        {app.reference_number}
                      </td>
                      <td className="py-3 px-4 font-semibold text-[#221F1F]">
                        {app.student_full_name}
                      </td>
                      <td className="py-3 px-4 text-[#57534E]">
                        {app.class_applied_for}
                      </td>
                      <td className="py-3 px-4 text-[#57534E]">
                        <span className="block text-[#221F1F]">{app.guardian_full_name}</span>
                        <span className="font-mono text-[11px] text-[#57534E]">{app.guardian_phone}</span>
                      </td>
                      <td className="py-3 px-4">
                        {app.pay_later_requested ? (
                          <span className="text-[10px] font-bold uppercase bg-amber-100 text-amber-900 px-2 py-0.5 rounded-sm">
                            Requested
                          </span>
                        ) : (
                          <span className="text-[10px] text-[#57534E]">Standard</span>
                        )}
                      </td>
                      <td className="py-3 px-4 text-[#57534E] whitespace-nowrap">
                        {new Date(app.submission_date).toLocaleDateString('en-GB')}
                      </td>
                      <td className="py-3 px-4">
                        <span
                          className={`inline-block px-2.5 py-0.5 rounded-md text-[11px] font-semibold ${
                            app.status === 'Accepted' || app.status === 'Enrolled'
                              ? 'bg-emerald-100 text-emerald-800'
                              : app.status === 'Under Review'
                              ? 'bg-blue-100 text-blue-800'
                              : app.status === 'Declined'
                              ? 'bg-red-100 text-red-800'
                              : 'bg-[#FAF7F2] text-[#6B1724] border border-[#6B1724]/30'
                          }`}
                        >
                          {app.status}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-right">
                        <button
                          onClick={() => handleOpenAppDetail(app)}
                          className="inline-flex items-center gap-1 px-3 py-1.5 rounded-md bg-[#FAF7F2] border border-[#E8DFD5] text-xs font-semibold text-[#6B1724] hover:bg-[#6B1724] hover:text-white transition-colors"
                        >
                          <Eye className="w-3.5 h-3.5" />
                          <span>Review</span>
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={8} className="py-12 text-center text-[#57534E]">
                      {isLoadingData ? 'Loading applications from database...' : 'No applications match your filter criteria.'}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>

      {/* Detail & Status Modal */}
      {selectedApp && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs overflow-y-auto">
          <div className="bg-white border border-[#E8DFD5] rounded-2xl w-full max-w-2xl overflow-hidden shadow-2xl my-8">
            <div className="bg-[#6B1724] text-white p-5 flex items-center justify-between">
              <div>
                <span className="text-xs uppercase tracking-wider text-[#D49A24] font-bold block">
                  Application Review
                </span>
                <h3 className="font-mono text-lg font-bold">
                  {selectedApp.reference_number}
                </h3>
              </div>
              <button
                onClick={() => setSelectedApp(null)}
                className="p-1 rounded-lg text-white/80 hover:text-white hover:bg-white/10"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 max-h-[70vh] overflow-y-auto space-y-5 text-xs sm:text-sm">
              <div className="grid grid-cols-2 gap-4 p-4 rounded-xl bg-[#FAF7F2] border border-[#E8DFD5]">
                <div>
                  <span className="text-[#57534E] text-xs block">Student Full Name:</span>
                  <strong className="text-[#221F1F] font-display text-base">
                    {selectedApp.student_full_name}
                  </strong>
                </div>
                <div>
                  <span className="text-[#57534E] text-xs block">Class Applying For:</span>
                  <strong className="text-[#6B1724]">
                    {selectedApp.class_applied_for}
                  </strong>
                </div>
                <div>
                  <span className="text-[#57534E] text-xs block">Date of Birth & Gender:</span>
                  <span>{selectedApp.date_of_birth} ({selectedApp.gender})</span>
                </div>
                <div>
                  <span className="text-[#57534E] text-xs block">Origin & LGA:</span>
                  <span>{selectedApp.state_of_origin}, {selectedApp.lga}</span>
                </div>
              </div>

              <div>
                <strong className="text-xs uppercase tracking-wider text-[#6B1724] block mb-2">
                  Parent / Guardian Details
                </strong>
                <div className="p-4 rounded-xl bg-white border border-[#E8DFD5] space-y-1.5 text-xs">
                  <div className="flex justify-between">
                    <span className="text-[#57534E]">Name:</span>
                    <span className="font-semibold text-[#221F1F]">{selectedApp.guardian_full_name} ({selectedApp.guardian_relationship})</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#57534E]">Phone:</span>
                    <span className="font-mono font-medium">{selectedApp.guardian_phone}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#57534E]">Email:</span>
                    <span>{selectedApp.guardian_email || 'None'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#57534E]">Home Address:</span>
                    <span className="truncate max-w-[280px]">{selectedApp.home_address}</span>
                  </div>
                </div>
              </div>

              {selectedApp.additional_notes && (
                <div>
                  <strong className="text-xs uppercase tracking-wider text-[#6B1724] block mb-1">
                    Special Notes
                  </strong>
                  <p className="p-3 rounded-lg bg-[#FAF7F2] border border-[#E8DFD5] text-xs text-[#57534E]">
                    {selectedApp.additional_notes}
                  </p>
                </div>
              )}

              {/* Status Update Controls */}
              <div className="pt-2 border-t border-[#E8DFD5] space-y-3">
                <strong className="text-xs uppercase tracking-wider text-[#221F1F] block">
                  Update Application Status & Internal Notes
                </strong>

                <div>
                  <label className="block text-xs font-semibold text-[#57534E] mb-1">
                    Status
                  </label>
                  <select
                    value={newStatus}
                    onChange={(e) => setNewStatus(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-[#E8DFD5] text-xs font-semibold focus:outline-none focus:border-[#6B1724]"
                  >
                    <option value="Submitted">Submitted (Initial Log)</option>
                    <option value="Under Review">Under Review</option>
                    <option value="Shortlisted">Shortlisted</option>
                    <option value="Interview">Interview / Assessment</option>
                    <option value="Accepted">Accepted (Offer Given)</option>
                    <option value="Declined">Declined</option>
                    <option value="Enrolled">Enrolled (Cleared)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#57534E] mb-1">
                    Internal Administrative Notes
                  </label>
                  <textarea
                    rows={2}
                    placeholder="Assessment score, clearance notes, special remarks..."
                    value={adminNotes}
                    onChange={(e) => setAdminNotes(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-[#E8DFD5] text-xs focus:outline-none focus:border-[#6B1724]"
                  />
                </div>
              </div>
            </div>

            <div className="bg-[#FAF7F2] px-6 py-4 border-t border-[#E8DFD5] flex items-center justify-between">
              <button
                onClick={() => window.print()}
                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg border border-[#E8DFD5] bg-white text-xs font-semibold hover:bg-[#FAF7F2]"
              >
                <Printer className="w-3.5 h-3.5 text-[#C88A1A]" />
                <span>Print Application</span>
              </button>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => setSelectedApp(null)}
                  className="px-4 py-2 rounded-lg text-xs font-semibold text-[#57534E] hover:text-[#221F1F]"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveStatus}
                  disabled={isSavingStatus}
                  className="inline-flex items-center gap-1.5 px-5 py-2 rounded-lg bg-[#6B1724] text-white text-xs font-semibold hover:bg-[#52111B] transition-colors"
                >
                  <Save className="w-3.5 h-3.5" />
                  <span>{isSavingStatus ? 'Saving...' : 'Save Status'}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Settings Modal */}
      {isSettingsOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs overflow-y-auto">
          <div className="bg-white border border-[#E8DFD5] rounded-2xl w-full max-w-lg overflow-hidden shadow-2xl my-8">
            <div className="bg-[#4F101A] text-white p-5 flex items-center justify-between">
              <div>
                <h3 className="font-display text-base font-bold">
                  Admission Portal Settings
                </h3>
                <span className="text-xs text-white/70">
                  Configure admission deadlines & status
                </span>
              </div>
              <button
                onClick={() => setIsSettingsOpen(false)}
                className="p-1 rounded-lg text-white/80 hover:text-white hover:bg-white/10"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveSettings} className="p-6 space-y-4 text-xs">
              <div className="flex items-center justify-between p-3 rounded-xl bg-[#FAF7F2] border border-[#E8DFD5]">
                <div>
                  <span className="font-bold text-[#221F1F] block">Admission Status</span>
                  <span className="text-[11px] text-[#57534E]">Allow prospective parents to submit applications online</span>
                </div>
                <input
                  type="checkbox"
                  checked={settingsForm.isOpen}
                  onChange={(e) => setSettingsForm({ ...settingsForm, isOpen: e.target.checked })}
                  className="w-5 h-5 text-[#6B1724] rounded-sm focus:ring-[#6B1724]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#221F1F] uppercase tracking-wider mb-1">
                  Application Deadline Text
                </label>
                <input
                  type="text"
                  value={settingsForm.applicationDeadline}
                  onChange={(e) => setSettingsForm({ ...settingsForm, applicationDeadline: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg border border-[#E8DFD5] text-xs focus:outline-none focus:border-[#6B1724]"
                />
              </div>

              <div className="pt-3 border-t border-[#E8DFD5] flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsSettingsOpen(false)}
                  className="px-4 py-2 rounded-lg border border-[#E8DFD5] text-xs font-semibold text-[#57534E]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-lg bg-[#6B1724] text-white text-xs font-semibold hover:bg-[#52111B]"
                >
                  Save Settings
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
