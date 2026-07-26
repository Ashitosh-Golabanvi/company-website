export type ProjectType =
  | 'Business Website'
  | 'Web Application'
  | 'Backend/API'
  | 'AI Solution'
  | 'Automation'
  | 'Other';

export interface ContactInquiry {
  name: string;
  company?: string;
  email: string;
  phone?: string;
  projectType: ProjectType;
  budget?: string;
  timeline?: string;
  message: string;
}
