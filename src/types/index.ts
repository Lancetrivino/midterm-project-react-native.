export interface Job {
  id: string;
  title: string;
  company: string;
  location?: string;
  salary?: string;
  description?: string;
  requirements?: string[];
  type?: string;
  postedDate?: string;
  companyLogo?: string;
  tags?: string[];
  applicationLink?: string;
  [key: string]: any;
}

export interface Application {
  jobId: string;
  name: string;
  email: string;
  contactNumber: string;
  whyHireYou: string;
  appliedDate: Date;
}

export interface ValidationResult {
  isValid: boolean;
  errors: {
    name?: string;
    email?: string;
    contactNumber?: string;
    whyHireYou?: string;
  };
}

export type RootStackParamList = {
  JobFinder: undefined;
  SavedJobs: undefined;
};