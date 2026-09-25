export interface SchoolInfo {
  name: string;
  registeredName: string;
  shortName: string;
  tagline: string;
  collegeMotto: string;
  establishedDate: string;
  establishedFormatted: string;
  location: {
    street: string;
    landmark: string;
    area: string;
    city: string;
    state: string;
    country: string;
    fullAddress: string;
  };
  contact: {
    primaryPhone: string;
    secondaryPhone: string;
    email: string;
  };
  leadership: {
    proprietress: {
      name: string;
      title: string;
      role: string;
      bio: string;
      quote: string;
      image: string;
    };
  };
}

export interface AcademicLevel {
  id: string;
  title: string;
  levelType: 'Early Years' | 'Basic Education' | 'Junior Secondary' | 'Senior Secondary';
  ageRange: string;
  description: string;
  focus: string;
  iconName: 'baby' | 'shapes' | 'bookOpen' | 'pencilRuler' | 'graduationCap';
}

export interface WhyChoosePillar {
  id: number;
  title: string;
  tagline: string;
  description: string;
  iconName: 'bookCheck' | 'languages' | 'cpu' | 'activity' | 'coins' | 'heartHandshake' | 'sparkles';
}

export interface AcademicHighlight {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  iconName: 'globe' | 'laptop' | 'wrench' | 'award';
}

export interface CampusFacility {
  id: string;
  category: string;
  title: string;
  description: string;
  features: string[];
  image: string;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  category:
    | 'Islamic Education'
    | 'Academic Life'
    | 'School News'
    | 'Student Development'
    | 'Parenting and Education'
    | 'Arabic Learning'
    | 'Technology and Innovation'
    | 'Sports'
    | 'School Events'
    | 'Character and Values'
    | 'Announcements';
  excerpt: string;
  content: string;
  date: string;
  formattedDate: string;
  readTime: string;
  image: string;
}

export interface AdmissionApplication {
  applicationNumber: string;
  submittedAt: string;
  student: {
    fullName: string;
    dateOfBirth: string;
    gender: 'male' | 'female';
    levelApplyingFor: string;
    previousSchool?: string;
  };
  guardian: {
    fullName: string;
    relationship: string;
    phone: string;
    email: string;
    residentialAddress: string;
    occupation?: string;
  };
  financialPlan: 'standard' | 'pay_later';
  status: 'Received' | 'Under Review' | 'Assessment Scheduled' | 'Admitted';
}
