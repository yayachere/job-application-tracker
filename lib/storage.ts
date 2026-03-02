import { Application } from './types';
import { STORAGE_KEY } from './constants';

export const loadApplications = (): Application[] => {
  if (typeof window === 'undefined') return [];
  
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error('Failed to load applications from localStorage:', error);
    return [];
  }
};

export const saveApplications = (applications: Application[]): void => {
  if (typeof window === 'undefined') return;
  
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(applications));
  } catch (error) {
    console.error('Failed to save applications to localStorage:', error);
  }
};
