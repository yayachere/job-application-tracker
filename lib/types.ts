export type ApplicationStatus = 'applied' | 'interviewing' | 'rejected' | 'offer' | 'accepted';

export interface Application {
  id: string;
  company: string;
  role: string;
  platform: string;
  status: ApplicationStatus;
  dateApplied: string;
  notes?: string;
  salary?: string;
  location?: string;
  applicationLink?: string;
  resumeVersion?: string;
  followUpDate?: string;
  needsFollowUp?: boolean;
}

export type ApplicationFormData = Omit<Application, 'id'>;
