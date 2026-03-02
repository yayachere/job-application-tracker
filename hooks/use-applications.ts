'use client';

import { useState, useEffect, useCallback } from 'react';
import { Application, ApplicationFormData } from '@/lib/types';
import { loadApplications, saveApplications } from '@/lib/storage';

export const useApplications = () => {
  const [applications, setApplications] = useState<Application[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load applications from localStorage on mount
  useEffect(() => {
    const loaded = loadApplications();
    setApplications(loaded);
    setIsLoaded(true);
  }, []);

  // Save to localStorage whenever applications change
  useEffect(() => {
    if (isLoaded) {
      saveApplications(applications);
    }
  }, [applications, isLoaded]);

  const addApplication = useCallback(
    (data: ApplicationFormData) => {
      const newApplication: Application = {
        ...data,
        id: Date.now().toString(),
      };
      setApplications((prev) => [newApplication, ...prev]);
      return newApplication;
    },
    []
  );

  const updateApplication = useCallback(
    (id: string, data: Partial<ApplicationFormData>) => {
      setApplications((prev) =>
        prev.map((app) => (app.id === id ? { ...app, ...data } : app))
      );
    },
    []
  );

  const deleteApplication = useCallback((id: string) => {
    setApplications((prev) => prev.filter((app) => app.id !== id));
  }, []);

  const getApplicationsByStatus = useCallback(
    (status: string) => {
      return applications.filter((app) => app.status === status);
    },
    [applications]
  );

  return {
    applications,
    isLoaded,
    addApplication,
    updateApplication,
    deleteApplication,
    getApplicationsByStatus,
  };
};
