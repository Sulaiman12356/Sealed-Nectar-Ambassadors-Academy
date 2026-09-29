import {
  SchoolInfo,
  AcademicLevel,
  WhyChoosePillar,
  AcademicHighlight,
  CampusFacility,
  BlogPost
} from '../types';

// School asset images using authentic photographs from Sealed Nectar Ambassadors School
export const SCHOOL_IMAGES = {
  schoolLogo: '/Real Logo sealed.jpeg',
  schoolBanner: '/sealednectarbillboard.png',
  heroStudents: '/images/boy_and_girl_sealed.jpg',
  childrenGroup: '/images/children.jpeg',
  chineseTraining: '/images/chinese_sealed.jpeg',
  chineseClassroom2: '/images/chinese_sealed_2.jpeg',
  chineseCalligraphy: '/images/chinese_sealed_3.jpeg',
  chinesePledge: '/images/pledge_chinese.jpeg',
  computerLab: '/images/computer_training.jpeg',
  cultureDye: '/images/culture_dye.jpeg',
  enrollmentBanner: '/images/enrollment.jpeg',
  graduants: '/images/graduant_sealed.jpeg',
  karateCert: '/images/karate_cert.jpeg',
  academicCertificate: '/images/certificate.jpeg',
  assembly: '/images/assemble.jpeg',
  proprietress: '/images/proprietress_new.jpeg',
  studentPortrait: '/images/student_sealed.jpeg',
  welcomeBack: '/images/welcome_back.jpeg',
  academicExcellenceFrame: '/images/certificate.jpeg',
  marchingStudents: '/images/marching_children_sealed.jpg',
  missAward: '/images/miss_award.jpg',
  realTeacher: '/images/real_teacher_sealed.jpg',
  sittingStudents: '/images/children.jpeg',
  staffFaculty: '/images/staff_of_sealed_nectar.jpg',
  teachersGroup: '/images/teachers_sealed.jpg',

  // Purpose-driven mappings:
  classroomStudents: '/images/children.jpeg',
  stemStudent: '/images/computer_training.jpeg',
  schoolBuilding: '/sealed nectar school.png',
  libraryClassroom: '/images/chinese_sealed_3.jpeg',
  karateSports: '/images/karate_cert.jpeg',
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
    id: 'morning-assembly',
    title: 'Daily Morning Assembly & Formation',
    category: 'Excellence & Parades',
    src: '/images/assemble.jpeg',
    description: 'Disciplined pupils assembled on campus in orderly lines for morning devotion, anthems, and moral guidance.',
    tag: 'Campus Discipline',
  },
  {
    id: 'computer-lab',
    title: 'Computer Science & ICT Workstation Suite',
    category: 'Academics & Languages',
    src: '/images/computer_training.jpeg',
    description: 'Hands-on digital learning where students master basic computer operations, typing fluency, and tech exploration.',
    tag: 'STEM & ICT',
  },
  {
    id: 'chinese-training',
    title: 'Mandarin Chinese Language Immersion Session',
    category: 'Academics & Languages',
    src: '/images/chinese_sealed.jpeg',
    description: 'Pupils actively learning Mandarin Chinese vocabulary and pronunciation as part of our global multilingual curriculum.',
    tag: 'Global Languages',
  },
  {
    id: 'boy-and-girl',
    title: 'Ambassadors in Official School Uniform',
    category: 'Pupils & Uniforms',
    src: '/images/boy_and_girl_sealed.jpg',
    description: 'Male and female pupils of Sealed Nectar Ambassadors School dressed smartly in the official school uniform and modest hijab.',
    tag: 'Official Uniform',
  },
  {
    id: 'karate-honors',
    title: 'Karate Martial Arts Certificate & Sports Honors',
    category: 'Excellence & Parades',
    src: '/images/karate_cert.jpeg',
    description: 'Students earning official martial arts certificates, demonstrating athletic control, physical resilience, and discipline.',
    tag: 'Karate & Sports',
  },
  {
    id: 'cultural-crafts',
    title: 'Cultural Day & Tie-and-Dye Textile Craftsmanship',
    category: 'Academics & Languages',
    src: '/images/culture_dye.jpeg',
    description: 'Students proudly showcasing traditional Adire tie-and-dye crafts created during vocational and creative art lessons.',
    tag: 'Vocational Arts',
  },
  {
    id: 'graduating-class',
    title: 'Graduating Ambassadors Convocation Ceremony',
    category: 'Excellence & Parades',
    src: '/images/graduant_sealed.jpeg',
    description: 'Celebration of graduating pupils clad in academic gowns and caps, moving on to higher levels with excellence.',
    tag: 'Graduation',
  },
  {
    id: 'academic-merit',
    title: 'Scholastic Excellence & Certificate Presentation',
    category: 'Excellence & Parades',
    src: '/images/certificate.jpeg',
    description: 'Recognition of high-performing learners receiving awards of merit for exemplary academic performance and character.',
    tag: 'Merit Awards',
  },
  {
    id: 'chinese-presentation',
    title: 'Multilingual Student Pledge & Oratorical Presentation',
    category: 'Academics & Languages',
    src: '/images/pledge_chinese.jpeg',
    description: 'Students delivering school pledges and presentations in Mandarin Chinese with poise and confidence.',
    tag: 'Multilingual Oratory',
  },
  {
    id: 'student-ambassador',
    title: 'Exemplary Pupil in Modest School Uniform',
    category: 'Pupils & Uniforms',
    src: '/images/student_sealed.jpeg',
    description: 'A confident ambassador demonstrating the neatness, modesty, and pride of our student body.',
    tag: 'Student Pride',
  },
  {
    id: 'welcome-back',
    title: 'Joyful Term Resumption & Community Welcome',
    category: 'Pupils & Uniforms',
    src: '/images/welcome_back.jpeg',
    description: 'Staff and pupils gathering warmly at the start of the new academic term with enthusiasm for learning.',
    tag: 'Term Resumption',
  },
  {
    id: 'pupils-learning',
    title: 'Collaborative Learning & Classroom Camaraderie',
    category: 'Pupils & Uniforms',
    src: '/images/children.jpeg',
    description: 'Pupils engaged in collaborative discussions, hands-on tasks, and peer learning in their classroom.',
    tag: 'Classroom Life',
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
  name: 'SEALED NECTAR AMBASSADORS SCHOOL',
  registeredName: 'Sealed Nectar Ambassadors School',
  shortName: 'SNAS',
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
      bio: 'Under the leadership of Mrs. Muritala F.A. (Nee Adeosun), Sealed Nectar Ambassadors School continues to pursue an educational vision centred on knowledge, character development and the total development of every child.',
      quote: 'At Sealed Nectar Ambassadors School, we believe that education should develop both the mind and the character. Our learners receive a balanced education that combines Western academic learning with Islamic education, moral values and practical skills.',
      image: SCHOOL_IMAGES.proprietress,
    },
  },
};

export const HERO_TRUST_ITEMS = [
  { id: 'islamic-western', label: 'Islamic & Western Balance', description: 'Sound Islamic learning combined with rigorous Western academic education' },
  { id: 'character', label: 'Character & Morality', description: 'Good manners, discipline, respect and sincere God consciousness' },
  { id: 'languages', label: 'Global Languages', description: 'English, Arabic, and conversational Mandarin Chinese' },
  { id: 'modern-skills', label: 'STEM & Practical Skills', description: 'ICT, Coding, Robotics, Karate and vocational creative arts' },
  { id: 'secondary', label: 'Early Years to SS 3', description: 'Structured growth from Crèche through Senior Secondary School' },
];

export const WHY_CHOOSE_PILLARS: WhyChoosePillar[] = [
  {
    id: 1,
    title: 'Islamic and Western Education',
    tagline: 'Dual Foundation',
    description: 'Academic learning combined with Islamic education and moral development.',
    iconName: 'bookCheck',
  },
  {
    id: 2,
    title: 'Character Development',
    tagline: 'Moral Discipline',
    description: 'We place importance on good manners, discipline, respect and responsibility.',
    iconName: 'heartHandshake',
  },
  {
    id: 3,
    title: 'Modern Learning',
    tagline: 'STEM Readiness',
    description: 'Students are introduced to ICT, Coding, Robotics and other practical learning experiences.',
    iconName: 'cpu',
  },
  {
    id: 4,
    title: 'Language Development',
    tagline: 'Multilingual Edge',
    description: 'Students are exposed to English, Arabic and Mandarin Chinese programmes.',
    iconName: 'languages',
  },
  {
    id: 5,
    title: 'Physical Development',
    tagline: 'Discipline & Fitness',
    description: 'Students participate in activities including Karate and sports.',
    iconName: 'activity',
  },
  {
    id: 6,
    title: 'Practical Skills',
    tagline: 'Vocational Mastery',
    description: 'Creative and vocational activities help learners develop useful practical abilities.',
    iconName: 'sparkles',
  },
];

export const ACADEMIC_LEVELS: AcademicLevel[] = [
  {
    id: 'creche',
    title: 'Crèche',
    levelType: 'Early Years',
    ageRange: '0 - 2 years',
    description: 'Early childhood care, interaction, gentle stimulation and sensory development in a hygienic, loving nursery setting.',
    focus: 'Sensory discovery, hygiene, responsive care, emotional security, and gentle habit formation.',
    iconName: 'baby',
  },
  {
    id: 'kindergarten',
    title: 'Kindergarten',
    levelType: 'Early Years',
    ageRange: '3 - 4 years',
    description: 'Early communication, social interaction, foundational motor skills and readiness for formal classroom routines.',
    focus: 'Phonics readiness, social play, creative expression, fine motor coordination, and introductory Islamic manners.',
    iconName: 'shapes',
  },
  {
    id: 'nursery',
    title: 'Nursery',
    levelType: 'Basic Education',
    ageRange: '4 - 5 years',
    description: 'Foundational literacy, numeracy, creative expression, Arabic letter recognition and social confidence.',
    focus: 'Early reading, number concepts, letter formation, curiosity, and polite classroom conduct.',
    iconName: 'bookOpen',
  },
  {
    id: 'primary',
    title: 'Primary School (Primary 1 - 6)',
    levelType: 'Basic Education',
    ageRange: 'Primary 1 to Primary 6',
    description: 'Strong foundations in core academic disciplines, moral development, Arabic recitation, and practical digital learning.',
    focus: 'Mathematics, English grammar, basic science, ICT, Arabic, Mandarin Chinese, and moral education.',
    iconName: 'pencilRuler',
  },
  {
    id: 'junior-secondary',
    title: 'Junior Secondary School (JSS 1 - 3)',
    levelType: 'Junior Secondary',
    ageRange: 'JSS 1 to JSS 3',
    description: 'Comprehensive secondary learning building academic depth, pre-vocational discovery, STEM problem solving and leadership.',
    focus: 'Basic science, technology, introductory business, languages, computing, and civic responsibility.',
    iconName: 'graduationCap',
  },
  {
    id: 'senior-secondary',
    title: 'Senior Secondary School (SS 1 - 3)',
    levelType: 'Senior Secondary',
    ageRange: 'SS 1 to SS 3',
    description: 'Advanced secondary education preparing learners for higher education, career clarity, independent thinking and leadership.',
    focus: 'Rigorous subject depth, analytical thinking, technology, career guidance, and Islamic ethical values.',
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
  'JSS 3',
  'SS 1',
  'SS 2',
  'SS 3',
];

export const ISLAMIC_PROGRAMME_AREAS = [
  {
    id: 'quranic-studies',
    title: "Qur'anic Studies",
    description: "Structured learning focused on proper recitation, correct pronunciation (Tajweed), and respectful appreciation of the Holy Qur'an.",
    kicker: 'Foundational Recitation',
  },
  {
    id: 'arabic-language',
    title: 'Arabic Language',
    description: 'Building linguistic literacy, vocabulary, reading comprehension, and conversational expression in modern Arabic.',
    kicker: 'Linguistic Literacy',
  },
  {
    id: 'islamic-studies',
    title: 'Islamic Studies',
    description: 'Understanding core tenets of faith, acts of worship (Ibadah), prophetic history (Seerah), and the universal message of peace.',
    kicker: 'Faith & Knowledge',
  },
  {
    id: 'islamic-morals',
    title: 'Islamic Morals and Manners',
    description: 'Emphasizing modesty, upright conscience, truthfulness, kindness to peers, and respectful manners (Adab) in daily life.',
    kicker: 'Character & Conduct',
  },
  {
    id: 'daily-supplications',
    title: 'Daily Supplications & Good Conduct',
    description: 'Fostering mindfulness through daily remembrances, supplications (Dua), cleanliness, and practical acts of community service.',
    kicker: 'Daily Remembrance',
  },
];

export const ISLAMIC_MORAL_VALUES = [
  { title: 'Honesty', description: 'Speaking the truth with sincerity and living with open trustworthiness in all dealings.' },
  { title: 'Respect', description: 'Treating parents, teachers, elders, peers and the school environment with genuine dignity.' },
  { title: 'Discipline', description: 'Cultivating punctuality, orderly habits, emotional self-control and perseverance.' },
  { title: 'Kindness', description: 'Showing gentle empathy, warm consideration and compassion to classmates and community.' },
  { title: 'Responsibility', description: 'Taking personal ownership of one’s learning, duties, words and belongings.' },
  { title: 'Cleanliness', description: 'Maintaining physical purity, tidy surroundings, and clean personal presentation as part of faith.' },
  { title: 'Patience', description: 'Facing challenges with calm determination, steadfast resilience and good cheer.' },
  { title: 'Respect for Parents', description: 'Honoring and appreciating the sacrifice, wisdom and counsel of parents at home.' },
  { title: 'Respect for Teachers', description: 'Valuing mentors and educators as trusted guides on the path of knowledge.' },
  { title: 'Helping Others', description: 'Lending a supportive hand to younger students, peers in need, and the broader community.' },
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
  { title: 'English and Communication', description: 'Grammar, reading comprehension, vocabulary, phonics and expressive public speaking.' },
  { title: 'Mathematics', description: 'Numeracy, quantitative reasoning, arithmetic, algebra and analytical problem-solving concepts.' },
  { title: 'Science & Technology', description: 'Inquiry-based foundational science, nature studies, basic technology and experimental discovery.' },
  { title: 'ICT and Digital Learning', description: 'Computer literacy, digital tools, basic programming concepts, robotics and typing.' },
  { title: 'Islamic Education & Morals', description: 'Islamic studies, good manners, Qur’anic reading, Tajweed and prophetic history.' },
  { title: 'Global Languages', description: 'English, conversational Arabic and introductory Mandarin Chinese language tracks.' },
  { title: 'Creative & Vocational Arts', description: 'Visual arts, crafts, constructive building, vocational design and independent creation.' },
  { title: 'Physical Education & Karate', description: 'Calisthenics, athletic games, structured sports and martial arts discipline.' },
  { title: 'Civic & Leadership Studies', description: 'Class responsibilities, collaborative teamwork, civic ethics and community awareness.' },
];

export const ACADEMIC_JOURNEY = [
  { step: '01', stage: 'Early Years', subtitle: 'Crèche & Kindergarten', description: 'Nurturing discovery, sensory development, social bonding and communication readiness.' },
  { step: '02', stage: 'Basic Education', subtitle: 'Nursery & Primary 1 - 6', description: 'Core academic subjects, Islamic studies, Arabic, Mandarin Chinese, STEM basics and moral education.' },
  { step: '03', stage: 'Junior Secondary', subtitle: 'JSS 1, JSS 2 & JSS 3', description: 'Pre-vocational discovery, analytical rigor, basic technology, computer science, and leadership character building.' },
  { step: '04', stage: 'Senior Secondary', subtitle: 'SS 1, SS 2 & SS 3', description: 'Advanced subject depth, independent inquiry, career awareness, higher-education readiness and responsible adulthood.' },
];

export const ACADEMICS_FAQ = [
  {
    question: 'What educational levels does the school operate?',
    answer: 'Sealed Nectar Ambassadors School provides a complete educational pathway from Early Years (Crèche and Kindergarten) through Basic Education (Nursery and Primary 1–6), Junior Secondary School (JSS 1–3), and Senior Secondary School (SS 1–3).',
  },
  {
    question: 'How does the school combine Islamic and Western education?',
    answer: 'At Sealed Nectar Ambassadors School, Western academic education provides our learners with academic knowledge, critical thinking and practical skills, while Islamic education instils moral values, faith, good manners and responsibility. The two areas work together to develop the whole child.',
  },
  {
    question: 'Which classes are currently available for admission?',
    answer: 'Admissions are open across Crèche, Kindergarten, Nursery, Primary 1 through Primary 6, Junior Secondary (JSS 1, JSS 2, JSS 3), and Senior Secondary (SS 1, SS 2, SS 3).',
  },
  {
    question: 'Does the school teach Arabic?',
    answer: 'Yes, students are introduced to Arabic to build linguistic literacy and support moral and Islamic cultural understanding.',
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
    question: 'Is there a Pay Later plan?',
    answer: 'Yes, the school offers a convenient Pay Later plan designed to help families manage temporary financial challenges with structured installments.',
  },
];

export const CAMPUS_FACILITIES: CampusFacility[] = [
  {
    id: 'academic-facilities',
    category: 'Classroom & Learning Spaces',
    title: 'Well-Ventilated, Modern Classrooms',
    description: 'Clean, well-lit, and age-appropriate study environments fitted with educational charts, writing boards, and organized seating.',
    features: ['Age-appropriate ergonomic furniture', 'Natural lighting & ventilation', 'Interactive pedagogical aids'],
    image: '/images/children.jpeg',
  },
  {
    id: 'computer-digital-center',
    category: 'STEM & Digital Innovation',
    title: 'Computer Science & ICT Suite',
    description: 'Dedicated workstations equipped for computer training, introductory coding, digital typing, and educational software exploration.',
    features: ['Dedicated computer terminals', 'Hands-on digital literacy instruction', 'Coding & robotics foundation'],
    image: '/images/computer_training.jpeg',
  },
  {
    id: 'sports-field',
    category: 'Physical Education & Athletics',
    title: 'Sports Field & Karate Arena',
    description: 'Dedicated grounds for student calisthenics, athletic games, martial arts katas, and ceremonial student parades.',
    features: ['Secured grounds', 'Karate & sports sessions', 'Marching parade drills'],
    image: '/images/karate_cert.jpeg',
  },
];

export const BLOG_POSTS: BlogPost[] = [
  {
    id: 'post-1',
    title: 'Nurturing Knowledge and Good Character in the Growing Child',
    slug: 'nurturing-knowledge-and-character',
    category: 'Islamic Education',
    excerpt: 'At Sealed Nectar Ambassadors School, we believe education should develop both the mind and character through balanced Islamic and academic learning.',
    content: '<p>At Sealed Nectar Ambassadors School, we believe that education should develop both the mind and the character. Our learners receive a balanced education that combines Western academic learning with Islamic education, moral values and practical skills.</p><p>Western education gives our learners the academic knowledge, critical thinking and practical skills needed to participate confidently in the modern world. Islamic education helps them develop faith, moral values, discipline, good manners and a strong sense of responsibility.</p>',
    date: '2026-03-10',
    formattedDate: '10 March 2026',
    readTime: '4 min read',
    image: '/images/welcome_back.jpeg',
  },
  {
    id: 'post-2',
    title: 'Why Global Languages Matter: Arabic and Mandarin Chinese at SNAS',
    slug: 'why-global-languages-matter',
    category: 'Arabic Learning',
    excerpt: 'Discover how introducing learners early to Arabic and Mandarin Chinese builds communication confidence and mental agility.',
    content: '<p>Language opens doors to cultural empathy and global career pathways. At Sealed Nectar Ambassadors School, our pupils learn English, Arabic and conversational Mandarin Chinese side by side.</p>',
    date: '2026-02-18',
    formattedDate: '18 February 2026',
    readTime: '3 min read',
    image: '/images/chinese_sealed.jpeg',
  },
  {
    id: 'post-3',
    title: 'Building Focus and Self-Discipline Through Karate and Sports',
    slug: 'building-focus-through-karate',
    category: 'Sports',
    excerpt: 'Physical exercise and martial arts training instil self-control, resilience, and personal responsibility in young learners.',
    content: '<p>Physical development goes hand in hand with intellectual and moral growth. Our students participate in structured sports and Karate drills that teach respect, endurance and humility.</p>',
    date: '2026-01-25',
    formattedDate: '25 January 2026',
    readTime: '3 min read',
    image: '/images/karate_cert.jpeg',
  },
  {
    id: 'post-4',
    title: 'Digital Literacy & Hands-On Computer Training for Elementary Pupils',
    slug: 'digital-literacy-and-computer-skills',
    category: 'Technology and Innovation',
    excerpt: 'How our dedicated computer workstation lab introduces young learners to digital fluency and technological confidence.',
    content: '<p>In the 21st century, digital competence is an indispensable literacy. At Sealed Nectar Ambassadors School, our ICT curriculum guides pupils through keyboarding, mouse precision, safe internet usage, and computer fundamentals.</p>',
    date: '2026-01-12',
    formattedDate: '12 January 2026',
    readTime: '4 min read',
    image: '/images/computer_training.jpeg',
  },
  {
    id: 'post-5',
    title: 'Celebrating Cultural Heritage and Hands-On Vocational Crafts',
    slug: 'celebrating-cultural-heritage-and-crafts',
    category: 'Student Development',
    excerpt: 'Exploring student creativity and cultural appreciation through traditional textile dyeing and practical crafts.',
    content: '<p>Vocational skills nurture independence, artistic pride, and appreciation for rich cultural traditions. Our pupils learn traditional fabric tie-and-dye techniques with enthusiastic teamwork.</p>',
    date: '2025-12-05',
    formattedDate: '5 December 2025',
    readTime: '3 min read',
    image: '/images/culture_dye.jpeg',
  },
  {
    id: 'post-6',
    title: 'Honoring Academic Milestones: From Early Years to Graduation',
    slug: 'honoring-academic-milestones-and-graduation',
    category: 'School News',
    excerpt: 'Recognizing student perseverance, academic milestones, and successful promotion into advanced education.',
    content: '<p>Graduation at Sealed Nectar Ambassadors School marks a milestone of growth, discipline, and scholarly achievement. We celebrate our graduating ambassadors with prayers and pride as they advance.</p>',
    date: '2025-11-20',
    formattedDate: '20 November 2025',
    readTime: '4 min read',
    image: '/images/graduant_sealed.jpeg',
  },
];

export const SCHOOL_VALUES = ISLAMIC_MORAL_VALUES;
export const TOTAL_CHILD_AREAS = CORE_LEARNING_AREAS;

export const PHILOSOPHY_POINTS = [
  {
    title: 'Two Foundations. One Complete Education.',
    description: 'Western education gives our learners the academic knowledge, critical thinking and practical skills needed to participate confidently in the modern world. Islamic education helps them develop faith, moral values, discipline, good manners and a strong sense of responsibility.',
  },
  {
    title: 'Morality and Knowledge in Harmony',
    description: 'We believe knowledge without good character is incomplete. Every classroom lesson reinforces honesty, modesty, respect and accountability.',
  },
  {
    title: 'Preparing for a Changing World',
    description: 'Through ICT, Coding, Robotics, global languages and vocational crafts, we equip students with practical competencies for the 21st century.',
  },
];

export const WHY_PARENTS_TRUST = [
  'Balanced Muslim educational institution combining academic excellence and Islamic moral upbringing',
  'Comprehensive pathway from Crèche and Nursery through Junior and Senior Secondary School (SS 3)',
  'Instruction in three valuable languages: English, Arabic and Mandarin Chinese',
  'Practical technology education covering ICT, Coding and introductory Robotics',
  'Healthy physical development through active sports and Karate martial arts club',
  'Safe, gated campus in quiet Makun, Sagamu with respectful and dedicated educators',
  'Supportive Pay Later tuition plan to assist families with flexible installment arrangements',
];
