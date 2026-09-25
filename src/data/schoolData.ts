import {
  SchoolInfo,
  AcademicLevel,
  WhyChoosePillar,
  AcademicHighlight,
  CampusFacility,
  BlogPost
} from '../types';

// School asset images using real uploaded authentic photographs from Sealed Nectar Ambassadors Academy
export const SCHOOL_IMAGES = {
  // 10 Real Authentic School Photographs:
  heroStudents: '/images/boy_and_girl_sealed.jpg',
  childrenGroup: '/images/children_sealed.jpg',
  chineseTraining: '/images/chinese_training_student.jpg',
  academicExcellenceFrame: '/images/excellent_frame.jpg',
  marchingStudents: '/images/marching_children_sealed.jpg',
  missAward: '/images/miss_award.jpg',
  realTeacher: '/images/real_teacher_sealed.jpg',
  sittingStudents: '/images/sitting_children_sealed.jpg',
  staffFaculty: '/images/staff_of_sealed_nectar.jpg',
  teachersGroup: '/images/teachers_sealed.jpg',

  // Semantic mappings:
  classroomStudents: '/images/sitting_children_sealed.jpg',
  stemStudent: '/images/chinese_training_student.jpg',
  schoolBuilding: '/images/children_sealed.jpg',
  proprietress: '/images/miss_award.jpg',
  libraryClassroom: '/images/sitting_children_sealed.jpg',
  karateSports: '/images/marching_children_sealed.jpg',
};

export interface GalleryImageItem {
  id: string;
  title: string;
  category: 'All' | 'Pupils & Uniforms' | 'Faculty & Staff' | 'Academics & Languages' | 'Excellence & Parades';
  src: string;
  description: string;
  tag: string;
}

export const AUTHENTIC_SCHOOL_GALLERY: GalleryImageItem[] = [
  {
    id: 'boy-and-girl',
    title: 'Ambassadors in Official School Uniform',
    category: 'Pupils & Uniforms',
    src: '/images/boy_and_girl_sealed.jpg',
    description: 'Male and female pupils of Sealed Nectar Ambassadors Academy dressed smartly in the official school uniform and hijab.',
    tag: 'Official Uniform',
  },
  {
    id: 'children-group',
    title: 'Joyful Learning & School Community',
    category: 'Pupils & Uniforms',
    src: '/images/children_sealed.jpg',
    description: 'Pupils of Sealed Nectar Ambassadors Academy smiling together on campus, demonstrating camaraderie and friendship.',
    tag: 'Pupil Life',
  },
  {
    id: 'chinese-training',
    title: 'Mandarin Chinese Language Training Session',
    category: 'Academics & Languages',
    src: '/images/chinese_training_student.jpg',
    description: 'Student engaged in intensive Mandarin Chinese instruction, part of our unique global languages immersion curriculum.',
    tag: 'Global Languages',
  },
  {
    id: 'excellent-frame',
    title: 'Academic Excellence & Merit Recognition',
    category: 'Excellence & Parades',
    src: '/images/excellent_frame.jpg',
    description: 'Award of Educational Excellence honoring diligence, upright conduct, and exceptional scholastic milestones.',
    tag: 'Student Honors',
  },
  {
    id: 'marching-children',
    title: 'Annual Student Procession & Marching Parade',
    category: 'Excellence & Parades',
    src: '/images/marching_children_sealed.jpg',
    description: 'Disciplined pupils marching proudly in full ceremonial regalia, building teamwork, focus, and leadership.',
    tag: 'Parade & Discipline',
  },
  {
    id: 'miss-award',
    title: 'Proprietress Merit Award Ceremony',
    category: 'Excellence & Parades',
    src: '/images/miss_award.jpg',
    description: 'Founding Proprietress Mrs. Muritala F.A. alongside student award recipients during official school celebrations.',
    tag: 'Leadership & Awards',
  },
  {
    id: 'sitting-children',
    title: 'Attentive Classroom Engagement & Learning',
    category: 'Academics & Languages',
    src: '/images/sitting_children_sealed.jpg',
    description: 'Pupils sitting focused and attentive in class, following instructions and participating actively in morning lessons.',
    tag: 'Classroom Life',
  },
  {
    id: 'real-teacher',
    title: 'Dedicated Classroom Teacher & Mentor',
    category: 'Faculty & Staff',
    src: '/images/real_teacher_sealed.jpg',
    description: 'Our qualified and caring teaching staff actively mentoring students with patience and personalized academic guidance.',
    tag: 'Teaching Faculty',
  },
  {
    id: 'staff-of-sealed-nectar',
    title: 'Staff & Management Faculty of Sealed Nectar',
    category: 'Faculty & Staff',
    src: '/images/staff_of_sealed_nectar.jpg',
    description: 'The complete administrative, academic, and pastoral team dedicated to the holistic upbringing of every pupil.',
    tag: 'School Faculty',
  },
  {
    id: 'teachers-sealed',
    title: 'Certified Educators & Instructional Leaders',
    category: 'Faculty & Staff',
    src: '/images/teachers_sealed.jpg',
    description: 'Passionate classroom educators who uphold moral values and modern pedagogical techniques daily.',
    tag: 'Academic Staff',
  },
];

export const SCHOOL_INFO: SchoolInfo = {
  name: 'Sealed Nectar Ambassadors School & College',
  registeredName: 'Sealed Nectar Ambassadors Academy (SNAA)',
  shortName: 'SNAA',
  tagline: 'Morality and Knowledge',
  collegeMotto: 'Empowering Minds, Shaping the Future',
  establishedDate: '2015-01-05',
  establishedFormatted: 'Est. 5th January, 2015',
  location: {
    street: '4, Azeez Lamidi Street',
    landmark: 'Behind Loto Ewu-Oliwo',
    area: 'Makun',
    city: 'Sagamu',
    state: 'Ogun State',
    country: 'Nigeria',
    fullAddress: '4, Azeez Lamidi Street, Behind Loto Ewu-Oliwo, Makun, Sagamu, Ogun State, Nigeria.',
  },
  contact: {
    primaryPhone: '+234 901 753 0688',
    secondaryPhone: '+234 070 805 08894',
    email: 'sealednectar15@gmail.com',
  },
  leadership: {
    proprietress: {
      name: 'Mrs. Muritala F.A. (Nee Adeosun)',
      title: 'Proprietress / Owner',
      role: 'Founding Proprietress',
      bio: 'Mrs. Muritala F.A. (Nee Adeosun) is the proprietor of Sealed Nectar Ambassadors Academy. Her vision for the school is centred on providing children with a strong educational foundation while supporting their academic growth, character development and personal confidence.',
      quote: 'Every child has a unique potential, and it is our duty to help them discover and achieve it through knowledge, faith and dedication.',
      image: SCHOOL_IMAGES.proprietress,
    },
  },
};

export const HERO_TRUST_ITEMS = [
  { id: 'quality', label: 'Quality Education', description: 'Rigorous national curriculum tailored for intellectual excellence' },
  { id: 'moral', label: 'Moral Upbringing', description: 'Islamic values, discipline, respect and strong character' },
  { id: 'modern', label: 'Modern Facilities', description: 'Well-structured classrooms, ICT lab and safe playgrounds' },
  { id: 'supportive', label: 'Supportive Environment', description: 'Caring educators fostering confidence in every learner' },
  { id: 'future', label: 'Future Leaders', description: 'Preparing well-rounded children for tomorrow’s opportunities' },
];

export const WHY_CHOOSE_PILLARS: WhyChoosePillar[] = [
  {
    id: 1,
    title: 'Dual Curriculum Edge',
    tagline: 'Balanced Foundation',
    description: 'Quality academic training and Islamic moral upbringing to cultivate balanced, respectful, and academically outstanding individuals.',
    iconName: 'bookCheck',
  },
  {
    id: 2,
    title: 'Global Languages',
    tagline: 'International Exposure',
    description: 'Students are introduced to Mandarin Chinese and Arabic programmes alongside English to give them an early global advantage.',
    iconName: 'languages',
  },
  {
    id: 3,
    title: 'STEM & Innovation',
    tagline: 'Practical Tech Skills',
    description: 'Hands-on learning through Coding, Robotics, ICT and digital education, fostering logical thinking and modern problem-solving.',
    iconName: 'cpu',
  },
  {
    id: 4,
    title: 'Physical & Vocational Growth',
    tagline: 'Discipline & Self-Reliance',
    description: 'Active Karate Club, sports, leadership training, and practical creative skills that develop personal discipline and resilience.',
    iconName: 'activity',
  },
  {
    id: 5,
    title: 'Financial Flexibility',
    tagline: 'Supporting Families',
    description: 'A convenient Pay Later plan designed with empathy to help families manage temporary financial challenges without interrupting learning.',
    iconName: 'coins',
  },
];

export const ACADEMIC_LEVELS: AcademicLevel[] = [
  {
    id: 'creche',
    title: 'Crèche',
    ageRange: '0 - 2 years',
    description: 'Early childhood care, interaction and foundational development in a gentle, hygienic nursery setting.',
    focus: 'Sensory discovery, hygiene, responsive care, and emotional security.',
    iconName: 'baby',
  },
  {
    id: 'kindergarten',
    title: 'Kindergarten',
    ageRange: '3 - 5 years',
    description: 'Early learning, communication, social development and preparation for formal learning.',
    focus: 'Phonics readiness, social bonding, creative play, and motor coordination.',
    iconName: 'shapes',
  },
  {
    id: 'nursery',
    title: 'Nursery',
    ageRange: '3 - 5 years',
    description: 'Foundational literacy, numeracy, creativity and social development.',
    focus: 'Early reading, counting, writing formation, and self-confidence.',
    iconName: 'bookOpen',
  },
  {
    id: 'primary',
    title: 'Primary School',
    ageRange: 'Primary 1 to Primary 6',
    description: 'Strong foundations in core academic subjects, character development and practical learning.',
    focus: 'Core sciences, mathematics, English, Arabic, Chinese, and moral education.',
    iconName: 'pencilRuler',
  },
  {
    id: 'jss1',
    title: 'JSS 1',
    ageRange: 'Junior Secondary',
    description: 'Comprehensive junior secondary education preparing learners for academic excellence and pre-vocational discovery.',
    focus: 'Basic technology, introductory sciences, language tracks, and civic leadership.',
    iconName: 'graduationCap',
  },
  {
    id: 'jss2',
    title: 'JSS 2',
    ageRange: 'Junior Secondary',
    description: 'Advanced junior secondary coursework fostering analytical reasoning, digital competence and responsible citizenship.',
    focus: 'Applied sciences, algebraic thinking, ICT, Arabic and creative problem solving.',
    iconName: 'graduationCap',
  },
];

export const AVAILABLE_CLASSES = [
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
];

export const ACADEMIC_PILLARS: AcademicHighlight[] = [
  {
    id: 'global-mindset',
    title: 'Global Mindset',
    subtitle: 'Multilingual Advantage',
    description: 'Students are exposed to English alongside Mandarin Chinese and Arabic programmes to develop communication skills and cultural awareness.',
    iconName: 'globe',
  },
  {
    id: 'technology-innovation',
    title: 'Technology and Innovation',
    subtitle: 'Digital Readiness',
    description: 'Students receive exposure to ICT, Coding and Robotics in ways that encourage curiosity, problem solving and practical thinking.',
    iconName: 'laptop',
  },
  {
    id: 'vocational-development',
    title: 'Vocational Development',
    subtitle: 'Practical Mastery',
    description: 'Students develop practical and creative skills that can encourage self-reliance, innovation, crafts and independent problem solving.',
    iconName: 'wrench',
  },
  {
    id: 'physical-discipline',
    title: 'Physical Discipline',
    subtitle: 'Confidence & Focus',
    description: 'Students participate in physical activities including Karate and sports to nurture physical fitness, focus, discipline and teamwork.',
    iconName: 'award',
  },
];

export const ACADEMIC_HIGHLIGHTS = ACADEMIC_PILLARS;

export const CORE_LEARNING_AREAS = [
  { title: 'English and Communication', description: 'Grammar, reading comprehension, vocabulary and expressive speaking.' },
  { title: 'Mathematics', description: 'Numeracy, quantitative reasoning, arithmetic and problem-solving concepts.' },
  { title: 'Science', description: 'Inquiry-based foundational science, nature studies and practical observation.' },
  { title: 'ICT and Digital Learning', description: 'Computer literacy, digital tools, basic programming concepts and typing.' },
  { title: 'Creative Learning', description: 'Visual arts, crafts, constructive building and imaginative design.' },
  { title: 'Languages', description: 'English, conversational Arabic and introductory Mandarin Chinese.' },
  { title: 'Physical Education', description: 'Calisthenics, athletic games, structured sports and Karate training.' },
  { title: 'Moral Development', description: 'Islamic values, honesty, respect for elders, patience and good manners.' },
  { title: 'Leadership', description: 'Class responsibilities, collaborative teamwork, public speaking and initiative.' },
];

export const ACADEMIC_JOURNEY = [
  { step: '01', stage: 'Early Years', subtitle: 'Crèche & Kindergarten', description: 'Nurturing discovery, sensory development, social bonding and communication readiness.' },
  { step: '02', stage: 'Nursery', subtitle: 'Foundation Stages', description: 'Structured literacy, phonics, numbers, writing readiness and gentle classroom habits.' },
  { step: '03', stage: 'Primary School', subtitle: 'Primary 1 to Primary 6', description: 'Core academic subjects, global languages, STEM basics, moral education and vocational skills.' },
  { step: '04', stage: 'Junior Secondary', subtitle: 'JSS 1 & JSS 2', description: 'Analytical rigor, pre-vocational studies, computer science, and leadership character building.' },
];

export const ACADEMICS_FAQ = [
  {
    question: 'What age groups does the school accept?',
    answer: 'Sealed Nectar Ambassadors Academy accepts learners from early childhood (Crèche from infancy up to 2 years) through Kindergarten, Nursery, Primary School, and Junior Secondary (JSS 1 & JSS 2).',
  },
  {
    question: 'Which classes are available?',
    answer: 'The classes currently available are Crèche, Kindergarten, Nursery, Primary 1 through Primary 6, JSS 1, and JSS 2.',
  },
  {
    question: 'Does the school offer Arabic?',
    answer: 'Yes, students are introduced to Arabic alongside English to build language competence and support moral and Islamic cultural understanding.',
  },
  {
    question: 'Does the school offer Mandarin Chinese?',
    answer: 'Yes, students are introduced to Mandarin Chinese programmes alongside English and Arabic for early global language exposure.',
  },
  {
    question: 'Do students learn Coding and Robotics?',
    answer: 'Yes, learners are introduced to digital learning, Coding and Robotics in ways that encourage curiosity, problem solving and practical thinking.',
  },
  {
    question: 'Does the school provide physical activities?',
    answer: 'Yes, students participate in physical activities including Karate and sports to develop physical fitness, focus, discipline and teamwork.',
  },
  {
    question: 'Is there a scholarship opportunity?',
    answer: 'Scholarship opportunities may be available for highly performing students. Please contact the school for the latest information.',
  },
  {
    question: 'Does the school have a Pay Later plan?',
    answer: 'Yes, the school offers a convenient Pay Later plan designed to help families manage temporary financial challenges with structured installments.',
  },
];

export const CAMPUS_FACILITIES: CampusFacility[] = [
  {
    id: 'academic-facilities',
    category: 'Classroom & Learning Spaces',
    title: 'Focused Classroom Environments',
    description: 'Conducive, well-organized learning spaces where pupils engage attentively in morning studies and interactive exercises.',
    features: [
      'Attentive classroom atmosphere with dedicated desks',
      'Comfortable seating and structured learning materials',
      'Early childhood, primary and junior secondary stations',
    ],
    image: SCHOOL_IMAGES.sittingStudents,
  },
  {
    id: 'recreational-physical',
    category: 'Parade, Drill & Physical Discipline',
    title: 'Leadership & Marching Processions',
    description: 'Disciplined student processions and energetic physical training cultivating teamwork, orderliness and school pride.',
    features: [
      'Official student ceremonial marching drills and parades',
      'Physical fitness routines, sports and martial arts discipline',
      'Confidence building and team leadership development',
    ],
    image: SCHOOL_IMAGES.marchingStudents,
  },
  {
    id: 'safety-environment',
    category: 'Educators & Pastoral Care',
    title: 'Qualified & Compassionate Faculty',
    description: 'A certified, dedicated teaching and administrative team committed to nurturing both knowledge and upright moral character.',
    features: [
      'Experienced and empathetic teachers mentoring every pupil',
      'Close teacher-parent academic partnership and feedback',
      'Moral role models instilling Islamic values and discipline',
    ],
    image: SCHOOL_IMAGES.staffFaculty,
  },
];

export const BLOG_POSTS: BlogPost[] = [
  {
    id: 'post-1',
    title: 'Celebrating Our Amazing Students and Their Growth',
    slug: 'celebrating-our-amazing-students',
    category: 'School News',
    excerpt: 'A review of recent milestones in literacy, mathematics and exemplary conduct displayed across our basic classes.',
    content: 'At Sealed Nectar Ambassadors Academy, we celebrate every incremental step of growth our pupils take. This term has witnessed remarkable dedication in both academics and moral conduct. Our teachers have continued their personalized mentoring to ensure every learner progresses with clarity and joy.',
    date: '2025-04-12',
    formattedDate: 'April 12, 2025',
    readTime: '3 min read',
    image: SCHOOL_IMAGES.childrenGroup,
  },
  {
    id: 'post-2',
    title: 'Mandarin Chinese Language Training: Early Global Advantage',
    slug: 'mandarin-chinese-immersion-program',
    category: 'Education Tips',
    excerpt: 'How early introduction to Mandarin Chinese and Arabic equips our pupils with global language fluency and cultural confidence.',
    content: 'Language is a doorway to the global future. At Sealed Nectar Ambassadors Academy, students begin learning Mandarin Chinese alongside English and Arabic. Early multilingual exposure trains auditory discrimination, problem-solving, and international cultural appreciation.',
    date: '2025-04-05',
    formattedDate: 'April 5, 2025',
    readTime: '4 min read',
    image: SCHOOL_IMAGES.chineseTraining,
  },
  {
    id: 'post-3',
    title: 'Discipline in Motion: Annual Marching Parade and Honors Showcase',
    slug: 'annual-marching-parade-and-awards',
    category: 'School Events',
    excerpt: 'Pupils demonstrated athleticism, discipline, and exemplary teamwork during our ceremonial marching drills and honors presentation.',
    content: 'Discipline in the mind is mirrored by discipline in posture and team action. Our recent parade brought together students, teachers, and proud parents as learners demonstrated precision marching, sportsmanship, and received awards of academic excellence.',
    date: '2025-03-28',
    formattedDate: 'March 28, 2025',
    readTime: '3 min read',
    image: SCHOOL_IMAGES.marchingStudents,
  },
];

export const SCHOOL_VALUES = [
  { title: 'Knowledge', description: 'Pursuing truthful understanding and intellectual mastery in every subject.' },
  { title: 'Morality', description: 'Upholding Islamic ethical standards, upright conscience and sincere conduct.' },
  { title: 'Discipline', description: 'Developing self-control, punctuality, orderly habits and perseverance.' },
  { title: 'Respect', description: 'Treating elders, teachers, peers and the school environment with honor.' },
  { title: 'Integrity', description: 'Acting with honesty, trustworthiness and consistency at all times.' },
  { title: 'Responsibility', description: 'Taking ownership of one’s learning, duties, actions and belongings.' },
  { title: 'Confidence', description: 'Articulating ideas boldly, facing challenges calmly and believing in oneself.' },
  { title: 'Excellence', description: 'Striving continually to give the highest quality effort in all endeavors.' },
];

export const TOTAL_CHILD_AREAS = [
  { id: 'academic', title: 'Academic', description: 'Structured mastery of literacy, mathematics, sciences, languages and critical reasoning.' },
  { id: 'moral', title: 'Moral', description: 'Islamic values, honesty, modesty, good etiquette and respect instilled daily.' },
  { id: 'social', title: 'Social', description: 'Healthy peer cooperation, teamwork, empathy and polite interpersonal communication.' },
  { id: 'intellectual', title: 'Intellectual', description: 'Encouraging inquiry, curiosity, analytical thought and independent problem-solving.' },
  { id: 'physical', title: 'Physical', description: 'Sports, outdoor play, physical fitness and martial arts discipline through Karate.' },
  { id: 'creative', title: 'Creative', description: 'Art, crafts, inventive digital building, robotics design and practical expression.' },
  { id: 'leadership', title: 'Leadership', description: 'Mentoring pupils to take responsibility, speak with clarity and lead with humility.' },
];

export const PHILOSOPHY_POINTS = [
  'Think independently and constructively',
  'Learn with curiosity and consistency',
  'Communicate clearly and respectfully',
  'Create with imagination and practical skills',
  'Solve problems methodically',
  'Develop good character rooted in faith',
  'Work collaboratively with others',
  'Become responsible and accountable citizens',
  'Build genuine inner confidence',
  'Prepare effectively for the future',
];

export const WHY_PARENTS_TRUST = [
  { title: 'Safe Learning Environment', description: 'Secure gated premises situated away from high-speed vehicular traffic in peaceful Makun.' },
  { title: 'Individual Attention', description: 'Caring teachers who recognize and nurture the unique pace and strengths of each child.' },
  { title: 'Academic Development', description: 'Measurable teaching techniques producing sound foundational literacy, numeracy and sciences.' },
  { title: 'Moral Development', description: 'Islamic upbringing and high moral values that build respectful, disciplined boys and girls.' },
  { title: 'Technology Exposure', description: 'Early practical introduction to ICT, digital learning, computer literacy and robotics.' },
  { title: 'Practical Skills', description: 'Creative activities and vocational projects that foster self-reliance and initiative.' },
  { title: 'Physical Activities', description: 'Active sports, physical fitness routines and Karate Club training for mental and bodily discipline.' },
  { title: 'Communication with Parents', description: 'Transparent, supportive partnerships keeping families informed and engaged in student growth.' },
];
