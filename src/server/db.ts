import { DatabaseSync } from 'node:sqlite';
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';

// Ensure data directory exists with Vercel serverless /tmp fallback support
let DATA_DIR = path.resolve(process.cwd(), 'data');
try {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
} catch (_) {
  // If running in a read-only environment (e.g. Vercel serverless lambda)
  DATA_DIR = '/tmp';
}

const DB_PATH = path.join(DATA_DIR, 'snaa_school.db');
export const db = new DatabaseSync(DB_PATH);

// Pragmas for performance and data integrity
db.exec('PRAGMA journal_mode = WAL;');
db.exec('PRAGMA foreign_keys = ON;');

// Initialize tables
db.exec(`
  CREATE TABLE IF NOT EXISTS academic_sessions (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL UNIQUE,
    is_active INTEGER NOT NULL DEFAULT 0,
    created_at TEXT NOT NULL
  );

  CREATE TABLE IF NOT EXISTS admission_settings (
    id TEXT PRIMARY KEY,
    is_open INTEGER NOT NULL DEFAULT 1,
    active_session_id TEXT NOT NULL,
    application_deadline TEXT,
    available_classes TEXT NOT NULL,
    required_documents TEXT NOT NULL,
    admission_instructions TEXT,
    scholarship_info TEXT,
    pay_later_info TEXT,
    contact_phone TEXT,
    contact_email TEXT,
    updated_at TEXT NOT NULL
  );

  CREATE TABLE IF NOT EXISTS admin_users (
    id TEXT PRIMARY KEY,
    username TEXT NOT NULL UNIQUE,
    password_hash TEXT NOT NULL,
    salt TEXT NOT NULL,
    role TEXT NOT NULL DEFAULT 'super_admin',
    full_name TEXT NOT NULL,
    created_at TEXT NOT NULL
  );

  CREATE TABLE IF NOT EXISTS applications (
    id TEXT PRIMARY KEY,
    reference_number TEXT NOT NULL UNIQUE,
    sequence_number INTEGER NOT NULL,
    session_id TEXT NOT NULL,
    session_name TEXT NOT NULL,
    first_name TEXT NOT NULL,
    middle_name TEXT,
    last_name TEXT NOT NULL,
    student_full_name TEXT NOT NULL,
    date_of_birth TEXT NOT NULL,
    gender TEXT NOT NULL,
    nationality TEXT NOT NULL,
    state_of_origin TEXT NOT NULL,
    lga TEXT NOT NULL,
    home_address TEXT NOT NULL,
    class_applied_for TEXT NOT NULL,
    previous_school TEXT,
    previous_class TEXT,
    guardian_full_name TEXT NOT NULL,
    guardian_relationship TEXT NOT NULL,
    guardian_phone TEXT NOT NULL,
    guardian_alt_phone TEXT,
    guardian_email TEXT,
    guardian_address TEXT,
    has_previous_experience TEXT,
    reason_for_leaving TEXT,
    additional_notes TEXT,
    documents_json TEXT,
    pay_later_requested INTEGER NOT NULL DEFAULT 0,
    status TEXT NOT NULL DEFAULT 'Submitted',
    admin_notes TEXT,
    is_archived INTEGER NOT NULL DEFAULT 0,
    submission_date TEXT NOT NULL,
    last_updated_date TEXT NOT NULL
  );

  CREATE TABLE IF NOT EXISTS school_info_cms (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    registered_name TEXT NOT NULL,
    short_name TEXT NOT NULL,
    tagline TEXT NOT NULL,
    college_motto TEXT NOT NULL,
    established_date TEXT NOT NULL,
    established_formatted TEXT NOT NULL,
    street TEXT NOT NULL,
    landmark TEXT NOT NULL,
    area TEXT NOT NULL,
    city TEXT NOT NULL,
    state TEXT NOT NULL,
    country TEXT NOT NULL,
    full_address TEXT NOT NULL,
    primary_phone TEXT NOT NULL,
    secondary_phone TEXT NOT NULL,
    email TEXT NOT NULL,
    about_text TEXT,
    mission_text TEXT,
    vision_text TEXT,
    core_values_json TEXT,
    proprietress_name TEXT,
    proprietress_title TEXT,
    proprietress_role TEXT,
    proprietress_bio TEXT,
    proprietress_quote TEXT,
    proprietress_image TEXT,
    facebook_url TEXT,
    instagram_url TEXT,
    whatsapp_number TEXT,
    updated_at TEXT NOT NULL
  );

  CREATE TABLE IF NOT EXISTS blog_posts_cms (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    category TEXT NOT NULL,
    featured_image TEXT NOT NULL,
    excerpt TEXT NOT NULL,
    content TEXT NOT NULL,
    author TEXT NOT NULL,
    publication_date TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'published',
    views_count INTEGER NOT NULL DEFAULT 0,
    is_deleted INTEGER NOT NULL DEFAULT 0,
    created_at TEXT NOT NULL,
    updated_at TEXT NOT NULL
  );

  CREATE TABLE IF NOT EXISTS gallery_items_cms (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    category TEXT NOT NULL,
    src TEXT NOT NULL,
    description TEXT,
    tag TEXT,
    sort_order INTEGER NOT NULL DEFAULT 0,
    is_published INTEGER NOT NULL DEFAULT 1,
    created_at TEXT NOT NULL,
    updated_at TEXT NOT NULL
  );

  CREATE TABLE IF NOT EXISTS announcements_cms (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    message TEXT NOT NULL,
    featured_image TEXT,
    publish_date TEXT NOT NULL,
    expiry_date TEXT,
    status TEXT NOT NULL DEFAULT 'published',
    display_on_home INTEGER NOT NULL DEFAULT 1,
    created_at TEXT NOT NULL,
    updated_at TEXT NOT NULL
  );

  CREATE TABLE IF NOT EXISTS staff_members_cms (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    position TEXT NOT NULL,
    photograph TEXT,
    biography TEXT,
    qualifications TEXT,
    subjects TEXT,
    status TEXT NOT NULL DEFAULT 'published',
    sort_order INTEGER NOT NULL DEFAULT 0,
    created_at TEXT NOT NULL,
    updated_at TEXT NOT NULL
  );

  CREATE TABLE IF NOT EXISTS academic_programmes_cms (
    id TEXT PRIMARY KEY,
    class_name TEXT NOT NULL,
    age_range TEXT,
    description TEXT,
    focus_areas TEXT,
    sort_order INTEGER NOT NULL DEFAULT 0,
    is_active INTEGER NOT NULL DEFAULT 1,
    updated_at TEXT NOT NULL
  );

  CREATE TABLE IF NOT EXISTS media_library_cms (
    id TEXT PRIMARY KEY,
    filename TEXT NOT NULL,
    original_name TEXT NOT NULL,
    url TEXT NOT NULL,
    mime_type TEXT NOT NULL,
    size_bytes INTEGER NOT NULL,
    category TEXT NOT NULL DEFAULT 'Campus',
    alt_text TEXT,
    uploaded_by TEXT NOT NULL,
    created_at TEXT NOT NULL
  );

  CREATE TABLE IF NOT EXISTS contact_enquiries_cms (
    id TEXT PRIMARY KEY,
    full_name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT NOT NULL,
    subject TEXT NOT NULL,
    message TEXT NOT NULL,
    is_read INTEGER NOT NULL DEFAULT 0,
    created_at TEXT NOT NULL
  );

  CREATE TABLE IF NOT EXISTS audit_logs_cms (
    id TEXT PRIMARY KEY,
    admin_username TEXT NOT NULL,
    action TEXT NOT NULL,
    affected_record TEXT NOT NULL,
    details TEXT,
    created_at TEXT NOT NULL
  );

  CREATE TABLE IF NOT EXISTS newsletter_subscribers_cms (
    id TEXT PRIMARY KEY,
    email TEXT NOT NULL UNIQUE,
    is_active INTEGER NOT NULL DEFAULT 1,
    created_at TEXT NOT NULL
  );

  CREATE INDEX IF NOT EXISTS idx_applications_ref ON applications(reference_number);
  CREATE INDEX IF NOT EXISTS idx_applications_session ON applications(session_id);
  CREATE INDEX IF NOT EXISTS idx_applications_status ON applications(status);
  CREATE INDEX IF NOT EXISTS idx_applications_class ON applications(class_applied_for);
  CREATE INDEX IF NOT EXISTS idx_blog_slug ON blog_posts_cms(slug);
  CREATE INDEX IF NOT EXISTS idx_blog_status ON blog_posts_cms(status);
  CREATE INDEX IF NOT EXISTS idx_gallery_pub ON gallery_items_cms(is_published);
  CREATE INDEX IF NOT EXISTS idx_announcements_status ON announcements_cms(status);
`);

// Safe column migrations
try {
  db.exec('ALTER TABLE applications ADD COLUMN is_archived INTEGER NOT NULL DEFAULT 0;');
} catch (_) {
  // Already exists
}

// Password hashing helper
export function hashPassword(password: string, salt: string): string {
  return crypto.scryptSync(password, salt, 64).toString('hex');
}

export function logAuditAction(adminUsername: string, action: string, affectedRecord: string, details?: string) {
  try {
    const id = `audit_${crypto.randomUUID()}`;
    db.prepare(`
      INSERT INTO audit_logs_cms (id, admin_username, action, affected_record, details, created_at)
      VALUES (?, ?, ?, ?, ?, ?)
    `).run(id, adminUsername, action, affectedRecord, details || '', new Date().toISOString());
  } catch (e) {
    console.error('Audit log error:', e);
  }
}

// Seed default academic session if empty
const existingSession = db.prepare('SELECT id FROM academic_sessions LIMIT 1').get();
if (!existingSession) {
  const defaultSessionId = 'session-2026-2027';
  db.prepare(`
    INSERT INTO academic_sessions (id, name, is_active, created_at)
    VALUES (?, ?, 1, ?)
  `).run(defaultSessionId, '2026/2027', new Date().toISOString());

  const defaultClasses = JSON.stringify([
    'Crèche',
    'Kindergarten',
    'Nursery',
    'Primary 1',
    'Primary 2',
    'Primary 3',
    'Primary 4',
    'Primary 5',
    'Primary 6',
    'JSS 1',
    'JSS 2',
  ]);

  const defaultDocs = JSON.stringify([
    { id: 'birth_cert', name: 'Birth Certificate', required: true },
    { id: 'passport_photo', name: 'Recent Passport Photograph', required: true },
    { id: 'previous_result', name: 'Previous School Result / Report Card', required: false },
    { id: 'medical_report', name: 'Immunization / Medical Record', required: false },
  ]);

  db.prepare(`
    INSERT INTO admission_settings (
      id, is_open, active_session_id, application_deadline, available_classes,
      required_documents, admission_instructions, scholarship_info, pay_later_info,
      contact_phone, contact_email, updated_at
    ) VALUES (?, 1, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `).run(
    'default',
    defaultSessionId,
    '31 August 2026',
    defaultClasses,
    defaultDocs,
    'Please complete all steps with verified information. Our admissions board will schedule an introductory student assessment.',
    'Merit-based scholarships may be available for top performers during placement evaluations.',
    'Initial registration with flexible fee installment plan is available for families upon request.',
    '+234 901 753 0688',
    'sealednectar15@gmail.com',
    new Date().toISOString()
  );
}

// Seed default administrator if not present
const existingAdmin = db.prepare('SELECT id FROM admin_users LIMIT 1').get();
if (!existingAdmin) {
  const salt = crypto.randomBytes(16).toString('hex');
  const passwordHash = hashPassword('SNAA_Makun2026!Adm', salt);
  db.prepare(`
    INSERT INTO admin_users (id, username, password_hash, salt, role, full_name, created_at)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `).run(
    'admin-1',
    'snaa_admin',
    passwordHash,
    salt,
    'super_admin',
    'SNAA Admissions Administrator',
    new Date().toISOString()
  );

  // Also add sample role-based users
  const salt2 = crypto.randomBytes(16).toString('hex');
  db.prepare(`
    INSERT INTO admin_users (id, username, password_hash, salt, role, full_name, created_at)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `).run(
    'admin-admissions',
    'admissions_officer',
    hashPassword('Admissions2026!SNAA', salt2),
    salt2,
    'admissions_officer',
    'Hajia Aminat (Admissions Officer)',
    new Date().toISOString()
  );

  const salt3 = crypto.randomBytes(16).toString('hex');
  db.prepare(`
    INSERT INTO admin_users (id, username, password_hash, salt, role, full_name, created_at)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `).run(
    'admin-editor',
    'content_editor',
    hashPassword('Content2026!SNAA', salt3),
    salt3,
    'content_editor',
    'Ustaz Bilal (Media & Content Editor)',
    new Date().toISOString()
  );
}

// Seed School Info CMS if not present
const existingSchoolInfo = db.prepare('SELECT id FROM school_info_cms LIMIT 1').get();
if (!existingSchoolInfo) {
  db.prepare(`
    INSERT INTO school_info_cms (
      id, name, registered_name, short_name, tagline, college_motto,
      established_date, established_formatted, street, landmark, area, city,
      state, country, full_address, primary_phone, secondary_phone, email,
      about_text, mission_text, vision_text, core_values_json,
      proprietress_name, proprietress_title, proprietress_role,
      proprietress_bio, proprietress_quote, proprietress_image,
      facebook_url, instagram_url, whatsapp_number, updated_at
    ) VALUES (
      ?, ?, ?, ?, ?, ?,
      ?, ?, ?, ?, ?, ?,
      ?, ?, ?, ?, ?, ?,
      ?, ?, ?, ?,
      ?, ?, ?,
      ?, ?, ?,
      ?, ?, ?, ?
    )
  `).run(
    'default',
    'Sealed Nectar Ambassadors School & College',
    'Sealed Nectar Ambassadors Academy (SNAA)',
    'SNAA',
    'Morality and Knowledge',
    'Empowering Minds, Shaping the Future',
    '2015-01-05',
    'Est. 5th January, 2015',
    '4, Azeez Lamidi Street',
    'Behind Loto Ewu-Oliwo',
    'Makun',
    'Sagamu',
    'Ogun State',
    'Nigeria',
    '4, Azeez Lamidi Street, Behind Loto Ewu-Oliwo, Makun, Sagamu, Ogun State, Nigeria.',
    '+234 901 753 0688',
    '+234 070 805 08894',
    'sealednectar15@gmail.com',
    'An upright Islamic private institution dedicated to providing quality basic and junior secondary education, strong moral values, global languages, and hands-on digital skills.',
    'To provide high quality foundational education integrated with sound Islamic morals, nurturing children into academically excellent, confident, and responsible ambassadors.',
    'To be an exemplary Islamic academic institution fostering intellectual brilliance, technological adaptability, and unwavering moral integrity in the next generation.',
    JSON.stringify([
      { title: 'Knowledge', description: 'Pursuing truthful understanding and intellectual mastery in every subject.' },
      { title: 'Morality', description: 'Upholding Islamic ethical standards, upright conscience and sincere conduct.' },
      { title: 'Discipline', description: 'Developing self-control, punctuality, orderly habits and perseverance.' },
      { title: 'Respect', description: 'Treating elders, teachers, peers and the school environment with honor.' },
      { title: 'Integrity', description: 'Acting with honesty, trustworthiness and consistency at all times.' },
      { title: 'Responsibility', description: 'Taking ownership of one’s learning, duties, actions and belongings.' },
      { title: 'Confidence', description: 'Articulating ideas boldly, facing challenges calmly and believing in oneself.' },
      { title: 'Excellence', description: 'Striving continually to give the highest quality effort in all endeavors.' },
    ]),
    'Mrs. Muritala F.A. (Nee Adeosun)',
    'Proprietress / Owner',
    'Founding Proprietress',
    'Mrs. Muritala F.A. (Nee Adeosun) is the proprietor of Sealed Nectar Ambassadors Academy. Her vision for the school is centred on providing children with a strong educational foundation while supporting their academic growth, character development and personal confidence.',
    'Every child has a unique potential, and it is our duty to help them discover and achieve it through knowledge, faith and dedication.',
    '/images/miss_award.jpg',
    'https://facebook.com',
    'https://instagram.com',
    '+2349017530688',
    new Date().toISOString()
  );
}

// Seed Blog Posts CMS if empty
const existingBlog = db.prepare('SELECT id FROM blog_posts_cms LIMIT 1').get();
if (!existingBlog) {
  const initialPosts = [
    {
      id: 'post-1',
      title: 'Celebrating Our Amazing Students and Their Growth',
      slug: 'celebrating-our-amazing-students',
      category: 'School News',
      featured_image: '/images/children_sealed.jpg',
      excerpt: 'A review of recent milestones in literacy, mathematics and exemplary conduct displayed across our basic classes.',
      content: '<h2>A Term of Remarkable Progress</h2><p>At Sealed Nectar Ambassadors Academy, we celebrate every incremental step of growth our pupils take. This term has witnessed remarkable dedication in both academics and moral conduct. Our teachers have continued their personalized mentoring to ensure every learner progresses with clarity and joy.</p><h3>Academic & Moral Highlights</h3><p>Pupils across primary and junior secondary divisions participated in structured evaluations with notable performance in mathematics, reading fluency, and Arabic recitation. We thank our parents for their continued partnership.</p>',
      author: 'Principal & Proprietress',
      publication_date: '2025-04-12',
      status: 'published',
    },
    {
      id: 'post-2',
      title: 'Mandarin Chinese Language Training: Early Global Advantage',
      slug: 'mandarin-chinese-immersion-program',
      category: 'Education Tips',
      featured_image: '/images/chinese_training_student.jpg',
      excerpt: 'How early introduction to Mandarin Chinese and Arabic equips our pupils with global language fluency and cultural confidence.',
      content: '<h2>Opening Global Doors Early</h2><p>Language is a doorway to the global future. At Sealed Nectar Ambassadors Academy, students begin learning Mandarin Chinese alongside English and Arabic. Early multilingual exposure trains auditory discrimination, problem-solving, and international cultural appreciation.</p><h3>Why Early Language Immersion Works</h3><p>Studies show children acquire tonal languages like Mandarin naturally before adolescence. Our dedicated classes integrate pronunciation drills, character recognition, and interactive conversational songs.</p>',
      author: 'Department of Languages',
      publication_date: '2025-04-05',
      status: 'published',
    },
    {
      id: 'post-3',
      title: 'Discipline in Motion: Annual Marching Parade and Honors Showcase',
      slug: 'annual-marching-parade-and-awards',
      category: 'School Events',
      featured_image: '/images/marching_children_sealed.jpg',
      excerpt: 'Pupils demonstrated athleticism, discipline, and exemplary teamwork during our ceremonial marching drills and honors presentation.',
      content: '<h2>Precision, Poise & Character</h2><p>Discipline in the mind is mirrored by discipline in posture and team action. Our recent parade brought together students, teachers, and proud parents as learners demonstrated precision marching, sportsmanship, and received awards of academic excellence.</p><h3>Excellence in Martial Arts & Drills</h3><p>The academy karate club also presented defensive kata demonstrations, illustrating patience, respect, and athletic control.</p>',
      author: 'Physical Education & Clubs',
      publication_date: '2025-03-28',
      status: 'published',
    },
  ];

  const now = new Date().toISOString();
  for (const post of initialPosts) {
    db.prepare(`
      INSERT INTO blog_posts_cms (
        id, title, slug, category, featured_image, excerpt, content,
        author, publication_date, status, views_count, is_deleted, created_at, updated_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 0, 0, ?, ?)
    `).run(
      post.id, post.title, post.slug, post.category, post.featured_image,
      post.excerpt, post.content, post.author, post.publication_date,
      post.status, now, now
    );
  }
}

// Seed Gallery Items CMS if empty
const existingGallery = db.prepare('SELECT id FROM gallery_items_cms LIMIT 1').get();
if (!existingGallery) {
  const galleryItems = [
    {
      id: 'boy-and-girl',
      title: 'Ambassadors in Official School Uniform',
      category: 'Students',
      src: '/images/boy_and_girl_sealed.jpg',
      description: 'Male and female pupils of Sealed Nectar Ambassadors Academy dressed smartly in the official school uniform and hijab.',
      tag: 'Official Uniform',
      sort_order: 1,
    },
    {
      id: 'children-group',
      title: 'Joyful Learning & School Community',
      category: 'Students',
      src: '/images/children_sealed.jpg',
      description: 'Pupils of Sealed Nectar Ambassadors Academy smiling together on campus, demonstrating camaraderie and friendship.',
      tag: 'Pupil Life',
      sort_order: 2,
    },
    {
      id: 'chinese-training',
      title: 'Mandarin Chinese Language Training Session',
      category: 'Classrooms',
      src: '/images/chinese_training_student.jpg',
      description: 'Student engaged in intensive Mandarin Chinese instruction, part of our unique global languages immersion curriculum.',
      tag: 'Global Languages',
      sort_order: 3,
    },
    {
      id: 'excellent-frame',
      title: 'Academic Excellence & Merit Recognition',
      category: 'School Events',
      src: '/images/excellent_frame.jpg',
      description: 'Award of Educational Excellence honoring diligence, upright conduct, and exceptional scholastic milestones.',
      tag: 'Student Honors',
      sort_order: 4,
    },
    {
      id: 'marching-children',
      title: 'Annual Student Procession & Marching Parade',
      category: 'Sports',
      src: '/images/marching_children_sealed.jpg',
      description: 'Disciplined pupils marching proudly in full ceremonial regalia, building teamwork, focus, and leadership.',
      tag: 'Parade & Discipline',
      sort_order: 5,
    },
    {
      id: 'miss-award',
      title: 'Proprietress Merit Award Ceremony',
      category: 'School Events',
      src: '/images/miss_award.jpg',
      description: 'Founding Proprietress Mrs. Muritala F.A. alongside student award recipients during official school celebrations.',
      tag: 'Leadership & Awards',
      sort_order: 6,
    },
    {
      id: 'sitting-children',
      title: 'Attentive Classroom Engagement & Learning',
      category: 'Classrooms',
      src: '/images/sitting_children_sealed.jpg',
      description: 'Pupils sitting focused and attentive in class, following instructions and participating actively in morning lessons.',
      tag: 'Classroom Life',
      sort_order: 7,
    },
    {
      id: 'real-teacher',
      title: 'Dedicated Classroom Teacher & Mentor',
      category: 'Classrooms',
      src: '/images/real_teacher_sealed.jpg',
      description: 'Our qualified and caring teaching staff actively mentoring students with patience and personalized academic guidance.',
      tag: 'Teaching Faculty',
      sort_order: 8,
    },
    {
      id: 'staff-of-sealed-nectar',
      title: 'Staff & Management Faculty of Sealed Nectar',
      category: 'School Environment',
      src: '/images/staff_of_sealed_nectar.jpg',
      description: 'The complete administrative, academic, and pastoral team dedicated to the holistic upbringing of every pupil.',
      tag: 'School Faculty',
      sort_order: 9,
    },
    {
      id: 'teachers-sealed',
      title: 'Certified Educators & Instructional Leaders',
      category: 'School Environment',
      src: '/images/teachers_sealed.jpg',
      description: 'Passionate classroom educators who uphold moral values and modern pedagogical techniques daily.',
      tag: 'Academic Staff',
      sort_order: 10,
    },
  ];

  const now = new Date().toISOString();
  for (const item of galleryItems) {
    db.prepare(`
      INSERT INTO gallery_items_cms (
        id, title, category, src, description, tag, sort_order, is_published, created_at, updated_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, 1, ?, ?)
    `).run(
      item.id, item.title, item.category, item.src, item.description, item.tag, item.sort_order, now, now
    );
  }
}

// Seed Announcements if empty
const existingAnnouncements = db.prepare('SELECT id FROM announcements_cms LIMIT 1').get();
if (!existingAnnouncements) {
  const now = new Date().toISOString();
  db.prepare(`
    INSERT INTO announcements_cms (
      id, title, message, featured_image, publish_date, expiry_date, status, display_on_home, created_at, updated_at
    ) VALUES (?, ?, ?, ?, ?, ?, ?, 1, ?, ?)
  `).run(
    'announcement-1',
    'Admissions for 2026/2027 Academic Session Now Open',
    'Applications are ongoing for Crèche, Kindergarten, Nursery, Primary 1–6 and Junior Secondary (JSS 1 & 2). Inquiries & entrance assessments can be scheduled online.',
    '/images/boy_and_girl_sealed.jpg',
    new Date().toISOString().split('T')[0],
    '2026-09-30',
    'published',
    now,
    now
  );
}

// Seed Staff if empty
const existingStaff = db.prepare('SELECT id FROM staff_members_cms LIMIT 1').get();
if (!existingStaff) {
  const staff = [
    {
      id: 'staff-1',
      name: 'Mrs. Muritala F.A. (Nee Adeosun)',
      position: 'Proprietress & Educational Director',
      photograph: '/images/miss_award.jpg',
      biography: 'Founding visionary of Sealed Nectar Ambassadors Academy, passionately guiding instructional quality, Islamic character, and holistic child development.',
      qualifications: 'B.Ed, Certified Educational Administrator',
      subjects: 'Educational Leadership, Moral Studies',
      sort_order: 1,
    },
    {
      id: 'staff-2',
      name: 'Head of Academic Instruction',
      position: 'Academic Head & Coordinator',
      photograph: '/images/real_teacher_sealed.jpg',
      biography: 'Leads our primary curriculum, lesson planning, and student academic assessment systems with patient mentorship.',
      qualifications: 'NCE, B.Sc. (Ed) Mathematics',
      subjects: 'Mathematics, Science, Quantitative Reasoning',
      sort_order: 2,
    },
    {
      id: 'staff-3',
      name: 'Languages & Cultural Studies Faculty',
      position: 'Lead Language Instructor',
      photograph: '/images/teachers_sealed.jpg',
      biography: 'Coordinating our Mandarin Chinese immersion, Arabic recitation, and English phonetics across all classes.',
      qualifications: 'B.A. Linguistics & Language Education',
      subjects: 'English, Mandarin Chinese, Arabic',
      sort_order: 3,
    },
  ];

  const now = new Date().toISOString();
  for (const s of staff) {
    db.prepare(`
      INSERT INTO staff_members_cms (
        id, name, position, photograph, biography, qualifications, subjects, status, sort_order, created_at, updated_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, 'published', ?, ?, ?)
    `).run(s.id, s.name, s.position, s.photograph, s.biography, s.qualifications, s.subjects, s.sort_order, now, now);
  }
}

// Seed Academic Programmes CMS if empty
const existingProgrammes = db.prepare('SELECT id FROM academic_programmes_cms LIMIT 1').get();
if (!existingProgrammes) {
  const programmes = [
    { id: 'prog-creche', className: 'Crèche', ageRange: '0 - 2 years', description: 'Gentle, hygienic early nursery care supporting sensory discovery and responsive emotional bonding.', focusAreas: 'Sensory discovery, hygiene, responsive care, emotional security', sortOrder: 1 },
    { id: 'prog-kindergarten', className: 'Kindergarten', ageRange: '3 - 4 years', description: 'Early communication, phonics readiness, social play, and fine motor coordination.', focusAreas: 'Phonics readiness, social bonding, creative play, motor coordination', sortOrder: 2 },
    { id: 'prog-nursery', className: 'Nursery', ageRange: '4 - 5 years', description: 'Foundational literacy, numeracy, creative writing formation, and self-confidence.', focusAreas: 'Early reading, counting, writing formation, self-confidence', sortOrder: 3 },
    { id: 'prog-primary', className: 'Primary School (Grades 1–6)', ageRange: 'Primary 1 to 6', description: 'Strong foundations in sciences, mathematics, English, Arabic, Chinese, and moral education.', focusAreas: 'Core sciences, mathematics, English, Arabic, Chinese, moral education', sortOrder: 4 },
    { id: 'prog-jss1', className: 'Junior Secondary School 1 (JSS 1)', ageRange: 'Junior Secondary', description: 'Introductory sciences, basic technology, language immersion tracks, and civic leadership.', focusAreas: 'Basic technology, introductory sciences, language tracks, civic leadership', sortOrder: 5 },
    { id: 'prog-jss2', className: 'Junior Secondary School 2 (JSS 2)', ageRange: 'Junior Secondary', description: 'Advanced coursework in analytical reasoning, digital competence, coding and pre-vocational skills.', focusAreas: 'Pre-vocational skills, ICT coding, analytical problem solving, Islamic etiquette', sortOrder: 6 },
  ];

  const now = new Date().toISOString();
  for (const p of programmes) {
    db.prepare(`
      INSERT INTO academic_programmes_cms (
        id, class_name, age_range, description, focus_areas, sort_order, is_active, updated_at
      ) VALUES (?, ?, ?, ?, ?, ?, 1, ?)
    `).run(p.id, p.className, p.ageRange, p.description, p.focusAreas, p.sortOrder, now);
  }
}

// Seed initial media library items if empty
const existingMedia = db.prepare('SELECT id FROM media_library_cms LIMIT 1').get();
if (!existingMedia) {
  const initialMedia = [
    { filename: 'boy_and_girl_sealed.jpg', originalName: 'boy and girl sealed.jpg', url: '/images/boy_and_girl_sealed.jpg', mimeType: 'image/jpeg', sizeBytes: 364697, category: 'Pupils', altText: 'Pupils in official school uniform' },
    { filename: 'children_sealed.jpg', originalName: 'children sealed.jpg', url: '/images/children_sealed.jpg', mimeType: 'image/jpeg', sizeBytes: 519691, category: 'Campus', altText: 'Smiling school pupils on campus' },
    { filename: 'chinese_training_student.jpg', originalName: 'chinese training student.jpg', url: '/images/chinese_training_student.jpg', mimeType: 'image/jpeg', sizeBytes: 100488, category: 'Academics', altText: 'Mandarin Chinese training student' },
    { filename: 'excellent_frame.jpg', originalName: 'execellent frame.jpg', url: '/images/excellent_frame.jpg', mimeType: 'image/jpeg', sizeBytes: 117062, category: 'Awards', altText: 'Academic Excellence Award Frame' },
    { filename: 'marching_children_sealed.jpg', originalName: 'matching children sealed.jpg', url: '/images/marching_children_sealed.jpg', mimeType: 'image/jpeg', sizeBytes: 482614, category: 'Sports', altText: 'Students in ceremonial marching parade' },
    { filename: 'miss_award.jpg', originalName: 'miss Award.jpg', url: '/images/miss_award.jpg', mimeType: 'image/jpeg', sizeBytes: 91948, category: 'Leadership', altText: 'Proprietress Mrs. Muritala F.A.' },
    { filename: 'real_teacher_sealed.jpg', originalName: 'real teacher sealed.jpg', url: '/images/real_teacher_sealed.jpg', mimeType: 'image/jpeg', sizeBytes: 422622, category: 'Staff', altText: 'Classroom teacher with student' },
    { filename: 'sitting_children_sealed.jpg', originalName: 'sitting children sealed.jpg', url: '/images/sitting_children_sealed.jpg', mimeType: 'image/jpeg', sizeBytes: 495561, category: 'Academics', altText: 'Pupils learning in classroom' },
    { filename: 'staff_of_sealed_nectar.jpg', originalName: 'staffs of the sealed nectar.jpg', url: '/images/staff_of_sealed_nectar.jpg', mimeType: 'image/jpeg', sizeBytes: 78551, category: 'Staff', altText: 'Sealed Nectar faculty and staff group' },
    { filename: 'teachers_sealed.jpg', originalName: 'teachers sealed.jpg', url: '/images/teachers_sealed.jpg', mimeType: 'image/jpeg', sizeBytes: 422622, category: 'Staff', altText: 'School teachers and instructors' },
  ];

  const now = new Date().toISOString();
  for (const m of initialMedia) {
    db.prepare(`
      INSERT INTO media_library_cms (
        id, filename, original_name, url, mime_type, size_bytes, category, alt_text, uploaded_by, created_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, 'System Admin', ?)
    `).run(`media_${crypto.randomUUID()}`, m.filename, m.originalName, m.url, m.mimeType, m.sizeBytes, m.category, m.altText, now);
  }
}

// -------------------------------------------------------------
// Core Database APIs
// -------------------------------------------------------------

export function getActiveSession(): { id: string; name: string } {
  const row = db.prepare('SELECT id, name FROM academic_sessions WHERE is_active = 1 LIMIT 1').get() as { id: string; name: string } | undefined;
  if (row) return row;
  return { id: 'session-2026-2027', name: '2026/2027' };
}

export function getAdmissionSettings() {
  const row = db.prepare("SELECT * FROM admission_settings WHERE id = 'default'").get() as any;
  const session = getActiveSession();
  return {
    ...row,
    isOpen: row ? Boolean(row.is_open) : true,
    activeSession: session,
    availableClasses: row && row.available_classes ? JSON.parse(row.available_classes) : [],
    requiredDocuments: row && row.required_documents ? JSON.parse(row.required_documents) : [],
  };
}

export function getPublicAdmissionStats() {
  const session = getActiveSession();
  const countRow = db.prepare('SELECT COUNT(*) as count FROM applications WHERE session_id = ? AND is_archived = 0').get(session.id) as { count: number };
  const settings = getAdmissionSettings();
  return {
    applicationsReceived: countRow ? countRow.count : 0,
    activeSession: session.name,
    isOpen: settings.isOpen,
    deadline: settings.application_deadline,
  };
}

export interface CreateApplicationInput {
  firstName: string;
  middleName?: string;
  lastName: string;
  dateOfBirth: string;
  gender: string;
  nationality: string;
  stateOfOrigin: string;
  lga: string;
  homeAddress: string;
  classAppliedFor: string;
  previousSchool?: string;
  previousClass?: string;
  guardianFullName: string;
  guardianRelationship: string;
  guardianPhone: string;
  guardianAltPhone?: string;
  guardianEmail?: string;
  guardianAddress?: string;
  hasPreviousExperience?: string;
  reasonForLeaving?: string;
  additionalNotes?: string;
  documents?: Array<{ name: string; url?: string; fileType?: string }>;
  payLaterRequested?: boolean;
}

export function createApplication(input: CreateApplicationInput) {
  const session = getActiveSession();
  const sessionYear = session.name.split('/')[0] || new Date().getFullYear().toString();
  const studentFullName = `${input.firstName.trim()} ${input.middleName ? input.middleName.trim() + ' ' : ''}${input.lastName.trim()}`;

  // Duplicate prevention check
  const duplicate = db.prepare(`
    SELECT reference_number, student_full_name FROM applications
    WHERE session_id = ? AND LOWER(student_full_name) = LOWER(?) AND date_of_birth = ? AND guardian_phone = ? AND is_archived = 0
  `).get(session.id, studentFullName, input.dateOfBirth, input.guardianPhone.trim()) as any;

  if (duplicate) {
    const error: any = new Error(`An application has already been registered for ${studentFullName} (Ref: ${duplicate.reference_number}).`);
    error.code = 'DUPLICATE_APPLICATION';
    error.existingReference = duplicate.reference_number;
    throw error;
  }

  db.exec('BEGIN IMMEDIATE TRANSACTION;');
  try {
    const maxRow = db.prepare(`
      SELECT MAX(sequence_number) as max_seq FROM applications WHERE session_id = ?
    `).get(session.id) as { max_seq: number | null };

    const nextSeq = (maxRow && maxRow.max_seq !== null ? maxRow.max_seq : 0) + 1;
    const paddedSeq = String(nextSeq).padStart(6, '0');
    const referenceNumber = `SNAA-${sessionYear}-${paddedSeq}`;
    const id = `app_${crypto.randomUUID()}`;
    const now = new Date().toISOString();

    db.prepare(`
      INSERT INTO applications (
        id, reference_number, sequence_number, session_id, session_name,
        first_name, middle_name, last_name, student_full_name, date_of_birth,
        gender, nationality, state_of_origin, lga, home_address, class_applied_for,
        previous_school, previous_class, guardian_full_name, guardian_relationship,
        guardian_phone, guardian_alt_phone, guardian_email, guardian_address,
        has_previous_experience, reason_for_leaving, additional_notes, documents_json,
        pay_later_requested, status, admin_notes, is_archived, submission_date, last_updated_date
      ) VALUES (
        ?, ?, ?, ?, ?,
        ?, ?, ?, ?, ?,
        ?, ?, ?, ?, ?, ?,
        ?, ?, ?, ?,
        ?, ?, ?, ?,
        ?, ?, ?, ?,
        ?, 'Submitted', '', 0, ?, ?
      )
    `).run(
      id,
      referenceNumber,
      nextSeq,
      session.id,
      session.name,
      input.firstName.trim(),
      input.middleName ? input.middleName.trim() : null,
      input.lastName.trim(),
      studentFullName,
      input.dateOfBirth,
      input.gender,
      input.nationality.trim(),
      input.stateOfOrigin.trim(),
      input.lga.trim(),
      input.homeAddress.trim(),
      input.classAppliedFor,
      input.previousSchool ? input.previousSchool.trim() : null,
      input.previousClass ? input.previousClass.trim() : null,
      input.guardianFullName.trim(),
      input.guardianRelationship.trim(),
      input.guardianPhone.trim(),
      input.guardianAltPhone ? input.guardianAltPhone.trim() : null,
      input.guardianEmail ? input.guardianEmail.trim() : null,
      input.guardianAddress ? input.guardianAddress.trim() : null,
      input.hasPreviousExperience || null,
      input.reasonForLeaving || null,
      input.additionalNotes || null,
      JSON.stringify(input.documents || []),
      input.payLaterRequested ? 1 : 0,
      now,
      now
    );

    db.exec('COMMIT;');

    return {
      id,
      referenceNumber,
      studentFullName,
      classAppliedFor: input.classAppliedFor,
      submissionDate: now,
      status: 'Submitted',
      sessionName: session.name,
    };
  } catch (err) {
    db.exec('ROLLBACK;');
    throw err;
  }
}

export function lookupApplicationStatus(referenceNumber: string, verificationInput: string) {
  const cleanRef = referenceNumber.trim().toUpperCase();
  const cleanVerify = verificationInput.trim().toLowerCase();

  const row = db.prepare(`
    SELECT reference_number, student_full_name, class_applied_for, session_name,
           status, submission_date, last_updated_date, guardian_phone, guardian_email
    FROM applications
    WHERE UPPER(reference_number) = ? AND is_archived = 0
  `).get(cleanRef) as any;

  if (!row) {
    return null;
  }

  const phoneClean = row.guardian_phone.replace(/\D/g, '');
  const verifyClean = cleanVerify.replace(/\D/g, '');
  const isPhoneMatch = verifyClean.length >= 7 && phoneClean.includes(verifyClean);
  const isEmailMatch = row.guardian_email && row.guardian_email.toLowerCase() === cleanVerify;

  if (!isPhoneMatch && !isEmailMatch) {
    return { error: 'Verification failed. The contact phone or email does not match this application record.' };
  }

  return {
    referenceNumber: row.reference_number,
    studentName: row.student_full_name,
    classAppliedFor: row.class_applied_for,
    sessionName: row.session_name,
    status: row.status,
    submissionDate: row.submission_date,
    lastUpdatedDate: row.last_updated_date,
  };
}

export function getAdminApplications(filters: {
  search?: string;
  status?: string;
  classApplied?: string;
  sessionId?: string;
  includeArchived?: boolean;
}) {
  let query = 'SELECT * FROM applications WHERE 1=1';
  const params: any[] = [];

  if (!filters.includeArchived) {
    query += ' AND is_archived = 0';
  }

  if (filters.sessionId) {
    query += ' AND session_id = ?';
    params.push(filters.sessionId);
  }

  if (filters.status && filters.status !== 'all') {
    query += ' AND status = ?';
    params.push(filters.status);
  }

  if (filters.classApplied && filters.classApplied !== 'all') {
    query += ' AND class_applied_for = ?';
    params.push(filters.classApplied);
  }

  if (filters.search && filters.search.trim()) {
    const term = `%${filters.search.trim()}%`;
    query += ' AND (reference_number LIKE ? OR student_full_name LIKE ? OR guardian_phone LIKE ? OR guardian_email LIKE ?)';
    params.push(term, term, term, term);
  }

  query += ' ORDER BY sequence_number DESC';

  const rows = db.prepare(query).all(...params) as any[];
  const activeSession = getActiveSession();

  const statsRows = db.prepare(`
    SELECT status, COUNT(*) as count FROM applications
    WHERE session_id = ? AND is_archived = 0 GROUP BY status
  `).all(activeSession.id) as { status: string; count: number }[];

  const stats: Record<string, number> = {
    total: 0,
    submitted: 0,
    underReview: 0,
    shortlisted: 0,
    interview: 0,
    accepted: 0,
    declined: 0,
    enrolled: 0,
  };

  statsRows.forEach((r) => {
    stats.total += r.count;
    if (r.status === 'Submitted') stats.submitted = r.count;
    if (r.status === 'Under Review') stats.underReview = r.count;
    if (r.status === 'Shortlisted') stats.shortlisted = r.count;
    if (r.status === 'Interview') stats.interview = r.count;
    if (r.status === 'Accepted') stats.accepted = r.count;
    if (r.status === 'Declined') stats.declined = r.count;
    if (r.status === 'Enrolled') stats.enrolled = r.count;
  });

  return {
    applications: rows.map((r) => ({
      ...r,
      documents: r.documents_json ? JSON.parse(r.documents_json) : [],
    })),
    stats,
    activeSession,
  };
}

export function updateApplicationStatus(id: string, newStatus: string, adminNotes?: string, adminUsername = 'admin') {
  const now = new Date().toISOString();
  db.prepare(`
    UPDATE applications
    SET status = ?, admin_notes = ?, last_updated_date = ?
    WHERE id = ?
  `).run(newStatus, adminNotes || '', now, id);

  const updated = db.prepare('SELECT * FROM applications WHERE id = ?').get(id) as any;
  if (updated) {
    logAuditAction(adminUsername, 'APPLICATION_STATUS_UPDATE', updated.reference_number, `Status set to ${newStatus}`);
  }
  return updated;
}

export function archiveApplication(id: string, adminUsername = 'admin') {
  const now = new Date().toISOString();
  db.prepare('UPDATE applications SET is_archived = 1, last_updated_date = ? WHERE id = ?').run(now, id);
  const row = db.prepare('SELECT reference_number FROM applications WHERE id = ?').get(id) as any;
  if (row) {
    logAuditAction(adminUsername, 'APPLICATION_ARCHIVE', row.reference_number, 'Application archived');
  }
  return true;
}

export function verifyAdminLogin(username: string, passwordAttempt: string) {
  const user = db.prepare('SELECT * FROM admin_users WHERE username = ?').get(username.trim()) as any;
  if (!user) return null;

  const hash = hashPassword(passwordAttempt, user.salt);
  if (crypto.timingSafeEqual(Buffer.from(hash), Buffer.from(user.password_hash))) {
    return {
      id: user.id,
      username: user.username,
      role: user.role,
      fullName: user.full_name,
    };
  }
  return null;
}

export function getAllSessions() {
  return db.prepare('SELECT * FROM academic_sessions ORDER BY created_at DESC').all();
}

export function setActiveSession(sessionId: string, adminUsername = 'admin') {
  db.exec('BEGIN IMMEDIATE TRANSACTION;');
  try {
    db.prepare('UPDATE academic_sessions SET is_active = 0').run();
    db.prepare('UPDATE academic_sessions SET is_active = 1 WHERE id = ?').run(sessionId);
    db.prepare("UPDATE admission_settings SET active_session_id = ? WHERE id = 'default'").run(sessionId);
    db.exec('COMMIT;');
    logAuditAction(adminUsername, 'SESSION_ACTIVATED', sessionId, 'Active session updated');
    return true;
  } catch (err) {
    db.exec('ROLLBACK;');
    throw err;
  }
}

export function updateSettings(settings: {
  isOpen: boolean;
  applicationDeadline?: string;
  availableClasses?: string[];
  scholarshipInfo?: string;
  payLaterInfo?: string;
  contactPhone?: string;
  contactEmail?: string;
  admissionInstructions?: string;
}, adminUsername = 'admin') {
  db.prepare(`
    UPDATE admission_settings
    SET is_open = ?, application_deadline = ?, available_classes = ?,
        scholarship_info = ?, pay_later_info = ?, contact_phone = ?,
        contact_email = ?, admission_instructions = ?, updated_at = ?
    WHERE id = 'default'
  `).run(
    settings.isOpen ? 1 : 0,
    settings.applicationDeadline || '',
    JSON.stringify(settings.availableClasses || []),
    settings.scholarshipInfo || '',
    settings.payLaterInfo || '',
    settings.contactPhone || '',
    settings.contactEmail || '',
    settings.admissionInstructions || '',
    new Date().toISOString()
  );
  logAuditAction(adminUsername, 'ADMISSION_SETTINGS_UPDATE', 'default', 'Admission settings modified');
  return getAdmissionSettings();
}

// -------------------------------------------------------------
// School Information CMS
// -------------------------------------------------------------

export function getSchoolInfo() {
  const row = db.prepare("SELECT * FROM school_info_cms WHERE id = 'default'").get() as any;
  if (!row) return null;
  return {
    ...row,
    coreValues: row.core_values_json ? JSON.parse(row.core_values_json) : [],
  };
}

export function updateSchoolInfo(data: any, adminUsername = 'admin') {
  db.prepare(`
    UPDATE school_info_cms
    SET name = ?, registered_name = ?, short_name = ?, tagline = ?, college_motto = ?,
        established_formatted = ?, street = ?, landmark = ?, area = ?, city = ?,
        state = ?, full_address = ?, primary_phone = ?, secondary_phone = ?, email = ?,
        about_text = ?, mission_text = ?, vision_text = ?,
        proprietress_name = ?, proprietress_title = ?, proprietress_role = ?,
        proprietress_bio = ?, proprietress_quote = ?, proprietress_image = ?,
        facebook_url = ?, instagram_url = ?, whatsapp_number = ?, updated_at = ?
    WHERE id = 'default'
  `).run(
    data.name, data.registeredName || data.registered_name, data.shortName || data.short_name,
    data.tagline, data.collegeMotto || data.college_motto,
    data.establishedFormatted || data.established_formatted,
    data.street, data.landmark, data.area, data.city, data.state,
    data.fullAddress || data.full_address,
    data.primaryPhone || data.primary_phone,
    data.secondaryPhone || data.secondary_phone,
    data.email,
    data.aboutText || data.about_text,
    data.missionText || data.mission_text,
    data.visionText || data.vision_text,
    data.proprietressName || data.proprietress_name,
    data.proprietressTitle || data.proprietress_title,
    data.proprietressRole || data.proprietress_role,
    data.proprietressBio || data.proprietress_bio,
    data.proprietressQuote || data.proprietress_quote,
    data.proprietressImage || data.proprietress_image,
    data.facebookUrl || data.facebook_url || '',
    data.instagramUrl || data.instagram_url || '',
    data.whatsappNumber || data.whatsapp_number || '',
    new Date().toISOString()
  );

  logAuditAction(adminUsername, 'SCHOOL_INFO_UPDATE', 'default', 'School core profile updated');
  return getSchoolInfo();
}

// -------------------------------------------------------------
// Blog CMS
// -------------------------------------------------------------

export function getPublicBlogPosts(filters?: { category?: string; search?: string; page?: number; limit?: number }) {
  let whereClause = "WHERE status = 'published' AND is_deleted = 0";
  const params: any[] = [];

  if (filters?.category && filters.category !== 'All') {
    whereClause += ' AND category = ?';
    params.push(filters.category);
  }

  if (filters?.search && filters.search.trim()) {
    whereClause += ' AND (title LIKE ? OR excerpt LIKE ? OR content LIKE ?)';
    const term = `%${filters.search.trim()}%`;
    params.push(term, term, term);
  }

  const countRow = db.prepare(`SELECT COUNT(*) as total FROM blog_posts_cms ${whereClause}`).get(...params) as { total: number };

  const limit = filters?.limit || 12;
  const page = filters?.page || 1;
  const offset = (page - 1) * limit;

  const selectQuery = `SELECT * FROM blog_posts_cms ${whereClause} ORDER BY publication_date DESC, created_at DESC LIMIT ? OFFSET ?`;
  const posts = db.prepare(selectQuery).all(...params, limit, offset) as any[];

  return {
    posts,
    total: countRow ? countRow.total : 0,
    page,
    totalPages: countRow ? Math.ceil(countRow.total / limit) : 0,
  };
}

export function getBlogPostBySlug(slug: string) {
  const post = db.prepare('SELECT * FROM blog_posts_cms WHERE slug = ? AND is_deleted = 0').get(slug) as any;
  if (post && post.status === 'published') {
    // Increment view counter
    db.prepare('UPDATE blog_posts_cms SET views_count = views_count + 1 WHERE id = ?').run(post.id);
  }
  return post;
}

export function getAllAdminBlogPosts() {
  return db.prepare('SELECT * FROM blog_posts_cms WHERE is_deleted = 0 ORDER BY created_at DESC').all();
}

export function createBlogPost(data: any, adminUsername = 'admin') {
  const id = `post_${crypto.randomUUID()}`;
  let baseSlug = (data.slug || data.title)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '');
  if (!baseSlug) baseSlug = `post-${Date.now()}`;

  // Check unique slug
  let slug = baseSlug;
  let counter = 1;
  while (db.prepare('SELECT id FROM blog_posts_cms WHERE slug = ?').get(slug)) {
    slug = `${baseSlug}-${counter++}`;
  }

  const now = new Date().toISOString();
  db.prepare(`
    INSERT INTO blog_posts_cms (
      id, title, slug, category, featured_image, excerpt, content,
      author, publication_date, status, views_count, is_deleted, created_at, updated_at
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 0, 0, ?, ?)
  `).run(
    id, data.title, slug, data.category || 'School News',
    data.featuredImage || data.featured_image || '/images/children_sealed.jpg',
    data.excerpt, data.content, data.author || 'School Administration',
    data.publicationDate || data.publication_date || now.split('T')[0],
    data.status || 'published', now, now
  );

  logAuditAction(adminUsername, 'BLOG_POST_CREATE', slug, `Created blog post "${data.title}"`);
  return db.prepare('SELECT * FROM blog_posts_cms WHERE id = ?').get(id);
}

export function updateBlogPost(id: string, data: any, adminUsername = 'admin') {
  const now = new Date().toISOString();
  db.prepare(`
    UPDATE blog_posts_cms
    SET title = ?, category = ?, featured_image = ?, excerpt = ?,
        content = ?, author = ?, publication_date = ?, status = ?, updated_at = ?
    WHERE id = ?
  `).run(
    data.title, data.category,
    data.featuredImage || data.featured_image,
    data.excerpt, data.content, data.author,
    data.publicationDate || data.publication_date,
    data.status, now, id
  );

  const post = db.prepare('SELECT * FROM blog_posts_cms WHERE id = ?').get(id) as any;
  if (post) {
    logAuditAction(adminUsername, 'BLOG_POST_UPDATE', post.slug, `Updated post "${data.title}"`);
  }
  return post;
}

export function deleteBlogPost(id: string, adminUsername = 'admin') {
  const post = db.prepare('SELECT * FROM blog_posts_cms WHERE id = ?').get(id) as any;
  if (post) {
    db.prepare('UPDATE blog_posts_cms SET is_deleted = 1, updated_at = ? WHERE id = ?').run(new Date().toISOString(), id);
    logAuditAction(adminUsername, 'BLOG_POST_DELETE', post.slug, `Soft deleted post "${post.title}"`);
  }
  return true;
}

// -------------------------------------------------------------
// Campus Gallery CMS
// -------------------------------------------------------------

export function getPublicGalleryItems(category?: string) {
  let query = 'SELECT * FROM gallery_items_cms WHERE is_published = 1';
  const params: any[] = [];
  if (category && category !== 'All') {
    query += ' AND category = ?';
    params.push(category);
  }
  query += ' ORDER BY sort_order ASC, created_at DESC';
  return db.prepare(query).all(...params);
}

export function getAllAdminGalleryItems() {
  return db.prepare('SELECT * FROM gallery_items_cms ORDER BY sort_order ASC, created_at DESC').all();
}

export function createGalleryItem(data: any, adminUsername = 'admin') {
  const id = `gal_${crypto.randomUUID()}`;
  const now = new Date().toISOString();
  db.prepare(`
    INSERT INTO gallery_items_cms (
      id, title, category, src, description, tag, sort_order, is_published, created_at, updated_at
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `).run(
    id, data.title, data.category || 'Classrooms',
    data.src, data.description || '', data.tag || data.category,
    data.sortOrder || data.sort_order || 0,
    data.isPublished !== false ? 1 : 0,
    now, now
  );
  logAuditAction(adminUsername, 'GALLERY_ITEM_CREATE', id, `Added image "${data.title}"`);
  return db.prepare('SELECT * FROM gallery_items_cms WHERE id = ?').get(id);
}

export function updateGalleryItem(id: string, data: any, adminUsername = 'admin') {
  const now = new Date().toISOString();
  db.prepare(`
    UPDATE gallery_items_cms
    SET title = ?, category = ?, src = ?, description = ?, tag = ?,
        sort_order = ?, is_published = ?, updated_at = ?
    WHERE id = ?
  `).run(
    data.title, data.category, data.src, data.description || '',
    data.tag || '', data.sortOrder ?? data.sort_order ?? 0,
    data.isPublished ? 1 : 0, now, id
  );
  logAuditAction(adminUsername, 'GALLERY_ITEM_UPDATE', id, `Updated image "${data.title}"`);
  return db.prepare('SELECT * FROM gallery_items_cms WHERE id = ?').get(id);
}

export function deleteGalleryItem(id: string, adminUsername = 'admin') {
  const item = db.prepare('SELECT * FROM gallery_items_cms WHERE id = ?').get(id) as any;
  if (item) {
    db.prepare('DELETE FROM gallery_items_cms WHERE id = ?').run(id);
    logAuditAction(adminUsername, 'GALLERY_ITEM_DELETE', id, `Deleted gallery image "${item.title}"`);
  }
  return true;
}

// -------------------------------------------------------------
// Announcements CMS
// -------------------------------------------------------------

export function getActiveAnnouncements() {
  const today = new Date().toISOString().split('T')[0];
  return db.prepare(`
    SELECT * FROM announcements_cms
    WHERE status = 'published' AND (expiry_date IS NULL OR expiry_date = '' OR expiry_date >= ?)
    ORDER BY publish_date DESC, created_at DESC
  `).all(today);
}

export function getAllAdminAnnouncements() {
  return db.prepare('SELECT * FROM announcements_cms ORDER BY created_at DESC').all();
}

export function createAnnouncement(data: any, adminUsername = 'admin') {
  const id = `ann_${crypto.randomUUID()}`;
  const now = new Date().toISOString();
  db.prepare(`
    INSERT INTO announcements_cms (
      id, title, message, featured_image, publish_date, expiry_date, status, display_on_home, created_at, updated_at
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `).run(
    id, data.title, data.message, data.featuredImage || data.featured_image || null,
    data.publishDate || data.publish_date || now.split('T')[0],
    data.expiryDate || data.expiry_date || null,
    data.status || 'published',
    data.displayOnHome ? 1 : 0,
    now, now
  );
  logAuditAction(adminUsername, 'ANNOUNCEMENT_CREATE', id, `Created announcement "${data.title}"`);
  return db.prepare('SELECT * FROM announcements_cms WHERE id = ?').get(id);
}

export function updateAnnouncement(id: string, data: any, adminUsername = 'admin') {
  const now = new Date().toISOString();
  db.prepare(`
    UPDATE announcements_cms
    SET title = ?, message = ?, featured_image = ?, publish_date = ?,
        expiry_date = ?, status = ?, display_on_home = ?, updated_at = ?
    WHERE id = ?
  `).run(
    data.title, data.message, data.featuredImage || data.featured_image,
    data.publishDate || data.publish_date,
    data.expiryDate || data.expiry_date || null,
    data.status, data.displayOnHome ? 1 : 0, now, id
  );
  logAuditAction(adminUsername, 'ANNOUNCEMENT_UPDATE', id, `Updated announcement "${data.title}"`);
  return db.prepare('SELECT * FROM announcements_cms WHERE id = ?').get(id);
}

export function deleteAnnouncement(id: string, adminUsername = 'admin') {
  const ann = db.prepare('SELECT * FROM announcements_cms WHERE id = ?').get(id) as any;
  if (ann) {
    db.prepare('DELETE FROM announcements_cms WHERE id = ?').run(id);
    logAuditAction(adminUsername, 'ANNOUNCEMENT_DELETE', id, `Deleted announcement "${ann.title}"`);
  }
  return true;
}

// -------------------------------------------------------------
// Staff CMS
// -------------------------------------------------------------

export function getPublicStaff() {
  return db.prepare("SELECT * FROM staff_members_cms WHERE status = 'published' ORDER BY sort_order ASC, created_at ASC").all();
}

export function getAllAdminStaff() {
  return db.prepare('SELECT * FROM staff_members_cms ORDER BY sort_order ASC, created_at ASC').all();
}

export function createStaffMember(data: any, adminUsername = 'admin') {
  const id = `staff_${crypto.randomUUID()}`;
  const now = new Date().toISOString();
  db.prepare(`
    INSERT INTO staff_members_cms (
      id, name, position, photograph, biography, qualifications, subjects, status, sort_order, created_at, updated_at
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `).run(
    id, data.name, data.position, data.photograph || '', data.biography || '',
    data.qualifications || '', data.subjects || '',
    data.status || 'published', data.sortOrder || data.sort_order || 0,
    now, now
  );
  logAuditAction(adminUsername, 'STAFF_CREATE', id, `Added staff "${data.name}"`);
  return db.prepare('SELECT * FROM staff_members_cms WHERE id = ?').get(id);
}

export function updateStaffMember(id: string, data: any, adminUsername = 'admin') {
  const now = new Date().toISOString();
  db.prepare(`
    UPDATE staff_members_cms
    SET name = ?, position = ?, photograph = ?, biography = ?,
        qualifications = ?, subjects = ?, status = ?, sort_order = ?, updated_at = ?
    WHERE id = ?
  `).run(
    data.name, data.position, data.photograph || '', data.biography || '',
    data.qualifications || '', data.subjects || '',
    data.status, data.sortOrder ?? data.sort_order ?? 0, now, id
  );
  logAuditAction(adminUsername, 'STAFF_UPDATE', id, `Updated staff member "${data.name}"`);
  return db.prepare('SELECT * FROM staff_members_cms WHERE id = ?').get(id);
}

export function deleteStaffMember(id: string, adminUsername = 'admin') {
  const s = db.prepare('SELECT * FROM staff_members_cms WHERE id = ?').get(id) as any;
  if (s) {
    db.prepare('DELETE FROM staff_members_cms WHERE id = ?').run(id);
    logAuditAction(adminUsername, 'STAFF_DELETE', id, `Deleted staff member "${s.name}"`);
  }
  return true;
}

// -------------------------------------------------------------
// Academic Programmes CMS
// -------------------------------------------------------------

export function getPublicProgrammes() {
  return db.prepare('SELECT * FROM academic_programmes_cms WHERE is_active = 1 ORDER BY sort_order ASC').all();
}

export function getAllAdminProgrammes() {
  return db.prepare('SELECT * FROM academic_programmes_cms ORDER BY sort_order ASC').all();
}

export function updateProgramme(id: string, data: any, adminUsername = 'admin') {
  const now = new Date().toISOString();
  db.prepare(`
    UPDATE academic_programmes_cms
    SET class_name = ?, age_range = ?, description = ?, focus_areas = ?,
        sort_order = ?, is_active = ?, updated_at = ?
    WHERE id = ?
  `).run(
    data.className || data.class_name,
    data.ageRange || data.age_range,
    data.description,
    data.focusAreas || data.focus_areas,
    data.sortOrder ?? data.sort_order ?? 0,
    data.isActive ? 1 : 0,
    now, id
  );
  logAuditAction(adminUsername, 'PROGRAMME_UPDATE', id, `Updated programme ${data.className || data.class_name}`);
  return db.prepare('SELECT * FROM academic_programmes_cms WHERE id = ?').get(id);
}

// -------------------------------------------------------------
// Media Library CMS
// -------------------------------------------------------------

export function getMediaLibraryItems(category?: string) {
  let query = 'SELECT * FROM media_library_cms';
  const params: any[] = [];
  if (category && category !== 'All') {
    query += ' WHERE category = ?';
    params.push(category);
  }
  query += ' ORDER BY created_at DESC';
  return db.prepare(query).all(...params);
}

export function addMediaLibraryItem(item: any, adminUsername = 'admin') {
  const id = `media_${crypto.randomUUID()}`;
  const now = new Date().toISOString();
  db.prepare(`
    INSERT INTO media_library_cms (
      id, filename, original_name, url, mime_type, size_bytes, category, alt_text, uploaded_by, created_at
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `).run(
    id, item.filename, item.originalName, item.url, item.mimeType,
    item.sizeBytes, item.category || 'Campus', item.altText || '',
    adminUsername, now
  );
  logAuditAction(adminUsername, 'MEDIA_UPLOAD', id, `Uploaded file "${item.originalName}"`);
  return db.prepare('SELECT * FROM media_library_cms WHERE id = ?').get(id);
}

export function deleteMediaLibraryItem(id: string, adminUsername = 'admin') {
  const item = db.prepare('SELECT * FROM media_library_cms WHERE id = ?').get(id) as any;
  if (item) {
    db.prepare('DELETE FROM media_library_cms WHERE id = ?').run(id);
    logAuditAction(adminUsername, 'MEDIA_DELETE', id, `Deleted media item "${item.original_name}"`);
  }
  return true;
}

// -------------------------------------------------------------
// Contact Enquiries CMS
// -------------------------------------------------------------

export function createContactEnquiry(data: {
  fullName: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}) {
  const id = `enq_${crypto.randomUUID()}`;
  const now = new Date().toISOString();
  db.prepare(`
    INSERT INTO contact_enquiries_cms (
      id, full_name, email, phone, subject, message, is_read, created_at
    ) VALUES (?, ?, ?, ?, ?, ?, 0, ?)
  `).run(id, data.fullName.trim(), data.email.trim(), data.phone.trim(), data.subject.trim(), data.message.trim(), now);
  return { id, success: true };
}

export function getAdminContactEnquiries() {
  return db.prepare('SELECT * FROM contact_enquiries_cms ORDER BY created_at DESC').all();
}

export function markContactEnquiryRead(id: string) {
  db.prepare('UPDATE contact_enquiries_cms SET is_read = 1 WHERE id = ?').run(id);
  return true;
}

export function deleteContactEnquiry(id: string, adminUsername = 'admin') {
  db.prepare('DELETE FROM contact_enquiries_cms WHERE id = ?').run(id);
  logAuditAction(adminUsername, 'ENQUIRY_DELETE', id, 'Deleted contact enquiry');
  return true;
}

// -------------------------------------------------------------
// Admin Users & Audit Logs
// -------------------------------------------------------------

export function getAllAdminUsers() {
  return db.prepare('SELECT id, username, role, full_name, created_at FROM admin_users ORDER BY created_at ASC').all();
}

export function createAdminUser(data: { username: string; password: string; role: string; fullName: string }, creatorUsername = 'admin') {
  const id = `user_${crypto.randomUUID()}`;
  const salt = crypto.randomBytes(16).toString('hex');
  const passwordHash = hashPassword(data.password, salt);
  const now = new Date().toISOString();

  db.prepare(`
    INSERT INTO admin_users (id, username, password_hash, salt, role, full_name, created_at)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `).run(id, data.username.trim().toLowerCase(), passwordHash, salt, data.role || 'admissions_officer', data.fullName.trim(), now);

  logAuditAction(creatorUsername, 'ADMIN_USER_CREATE', data.username, `Created user with role ${data.role}`);
  return { id, username: data.username, role: data.role, fullName: data.fullName, createdAt: now };
}

export function getAuditLogs(limit = 100) {
  return db.prepare('SELECT * FROM audit_logs_cms ORDER BY created_at DESC LIMIT ?').all(limit);
}

// -------------------------------------------------------------
// Newsletter Subscriptions
// -------------------------------------------------------------

export function subscribeNewsletter(email: string) {
  const cleanEmail = email.trim().toLowerCase();
  const existing = db.prepare('SELECT id FROM newsletter_subscribers_cms WHERE email = ?').get(cleanEmail);
  if (existing) {
    return { success: true, message: 'You are already subscribed to school updates.' };
  }
  const id = `sub_${crypto.randomUUID()}`;
  db.prepare('INSERT INTO newsletter_subscribers_cms (id, email, is_active, created_at) VALUES (?, ?, 1, ?)').run(id, cleanEmail, new Date().toISOString());
  return { success: true, message: 'Thank you for subscribing to school newsletters and announcements.' };
}

// -------------------------------------------------------------
// Overall Dashboard Real Counts Summary
// -------------------------------------------------------------

export function getDashboardSummary() {
  const activeSession = getActiveSession();

  const totalAppsRow = db.prepare('SELECT COUNT(*) as c FROM applications WHERE is_archived = 0').get() as { c: number };
  const sessionAppsRow = db.prepare('SELECT COUNT(*) as c FROM applications WHERE session_id = ? AND is_archived = 0').get(activeSession.id) as { c: number };
  const pendingAppsRow = db.prepare("SELECT COUNT(*) as c FROM applications WHERE status IN ('Submitted', 'Under Review') AND is_archived = 0").get() as { c: number };
  const acceptedAppsRow = db.prepare("SELECT COUNT(*) as c FROM applications WHERE status IN ('Accepted', 'Enrolled') AND is_archived = 0").get() as { c: number };
  const blogPostsRow = db.prepare("SELECT COUNT(*) as c FROM blog_posts_cms WHERE is_deleted = 0 AND status = 'published'").get() as { c: number };
  const galleryRow = db.prepare('SELECT COUNT(*) as c FROM gallery_items_cms WHERE is_published = 1').get() as { c: number };
  const announcementsRow = db.prepare("SELECT COUNT(*) as c FROM announcements_cms WHERE status = 'published'").get() as { c: number };
  const enquiriesRow = db.prepare('SELECT COUNT(*) as c FROM contact_enquiries_cms WHERE is_read = 0').get() as { c: number };

  return {
    totalApplications: totalAppsRow.c,
    applicationsThisSession: sessionAppsRow.c,
    pendingApplications: pendingAppsRow.c,
    acceptedApplications: acceptedAppsRow.c,
    publishedBlogPosts: blogPostsRow.c,
    campusGalleryItems: galleryRow.c,
    announcements: announcementsRow.c,
    unreadEnquiries: enquiriesRow.c,
    activeSession: activeSession.name,
  };
}
