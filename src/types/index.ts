export interface Project {
  id: string;
  number: string;
  name: string;
  category: string;
  tagline?: string;
  organization?: string;
  shortDescription: string;
  detailedDescription: string;
  keyFeatures?: string[];
  techStack: string[];
  isConcept?: boolean;
  conceptNote?: string;
  isEnterprise?: boolean;
  githubUrl?: string;
  demoUrl?: string;
  architectureHighlights?: string[];
  previewType: 'finance' | 'loan-lead' | 'grocery-stock' | 'techtales' | 'estate-ai';
}

export interface SkillCategory {
  category: string;
  description: string;
  skills: {
    name: string;
    level?: string;
    highlight?: boolean;
  }[];
}

export interface Experience {
  role: string;
  company: string;
  employmentType: 'Full-time' | 'Internship' | 'Contract';
  location: string;
  period: string;
  summary: string;
  responsibilities: string[];
  technologies: string[];
}

export interface ApproachStep {
  number: string;
  title: string;
  tagline: string;
  description: string;
  deliverables: string[];
}

export interface SocialLink {
  platform: string;
  label: string;
  url: string;
  icon: string;
}

export interface ContactMessage {
  id: number;
  name: string;
  email: string;
  subject: string;
  message: string;
  is_read: boolean;
  created_at: string;
}

export interface AdminUser {
  email: string;
}
