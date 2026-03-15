'use client';

import { useEffect, useState, useCallback } from 'react';
import { createClient } from '@/lib/supabase/client';
import { Application, ApplicationStatus, ApplicationFormData } from '@/lib/types';

export const useApplicationsDB = () => {
  const [applications, setApplications] = useState<Application[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);
  const supabase = createClient();

  // Get current user
  useEffect(() => {
    const getUser = async () => {
      const {
        data: { user },
        error,
      } = await supabase.auth.getUser();
      if (error) {
        console.error('Error getting user:', error.message);
        setUserId(null);
        return;
      }
      setUserId(user?.id || null);
    };
    getUser();
  }, [supabase]);

  // Fetch applications from database
  useEffect(() => {
    if (!userId) return;

    const fetchApplications = async () => {
      const { data, error } = await supabase
        .from('applications')
        .select('*')
        .eq('user_id', userId)
        .order('date_applied', { ascending: false });

      if (error) {
        console.error('Error fetching applications:', error.message, error);
        setIsLoaded(true);
        return;
      }

      // Convert database records to Application type
      const apps = (data || []).map((app: any) => ({
        id: app.id,
        company: app.company,
        role: app.role,
        platform: app.platform,
        status: app.status as ApplicationStatus,
        dateApplied: app.date_applied,
        notes: app.notes,
        salary: app.salary,
        location: app.location,
        applicationLink: app.application_link,
        resumeVersion: app.resume_version,
        followUpDate: app.follow_up_date,
        needsFollowUp: app.needs_follow_up,
      }));

      setApplications(apps);
      setIsLoaded(true);
    };

    fetchApplications();
  }, [userId, supabase]);

  const addApplication = useCallback(
    async (data: ApplicationFormData) => {
      if (!userId) return;

      const { error } = await supabase.from('applications').insert([
        {
          user_id: userId,
          company: data.company,
          role: data.role,
          platform: data.platform,
          status: data.status,
          date_applied: data.dateApplied,
          notes: data.notes,
          salary: data.salary,
          location: data.location,
          application_link: data.applicationLink,
          resume_version: data.resumeVersion,
          follow_up_date: data.followUpDate,
          needs_follow_up: data.needsFollowUp,
        },
      ]);

      if (error) {
        console.error('Error adding application:', error.message, error);
        return;
      }

      // Refresh applications
      const { data: refreshed } = await supabase
        .from('applications')
        .select('*')
        .eq('user_id', userId)
        .order('date_applied', { ascending: false });

      const apps = (refreshed || []).map((app: any) => ({
        id: app.id,
        company: app.company,
        role: app.role,
        platform: app.platform,
        status: app.status as ApplicationStatus,
        dateApplied: app.date_applied,
        notes: app.notes,
        salary: app.salary,
        location: app.location,
        applicationLink: app.application_link,
        resumeVersion: app.resume_version,
        followUpDate: app.follow_up_date,
        needsFollowUp: app.needs_follow_up,
      }));

      setApplications(apps);
    },
    [userId, supabase]
  );

  const updateApplication = useCallback(
    async (id: string, updates: Partial<ApplicationFormData>) => {
      if (!userId) return;

      const updateData: any = {};
      if (updates.status) updateData.status = updates.status;
      if (updates.notes !== undefined) updateData.notes = updates.notes;
      if (updates.salary !== undefined) updateData.salary = updates.salary;
      if (updates.location !== undefined) updateData.location = updates.location;
      if (updates.applicationLink !== undefined) updateData.application_link = updates.applicationLink;
      if (updates.resumeVersion !== undefined) updateData.resume_version = updates.resumeVersion;
      if (updates.followUpDate !== undefined) updateData.follow_up_date = updates.followUpDate;
      if (updates.needsFollowUp !== undefined) updateData.needs_follow_up = updates.needsFollowUp;

      const { error } = await supabase
        .from('applications')
        .update(updateData)
        .eq('id', id)
        .eq('user_id', userId);

      if (error) {
        console.error('Error updating application:', error.message, error);
        return;
      }

      // Update local state
      setApplications((prev) =>
        prev.map((app) =>
          app.id === id
            ? { ...app, ...updates }
            : app
        )
      );
    },
    [userId, supabase]
  );

  const deleteApplication = useCallback(
    async (id: string) => {
      if (!userId) return;

      const { error } = await supabase
        .from('applications')
        .delete()
        .eq('id', id)
        .eq('user_id', userId);

      if (error) {
        console.error('Error deleting application:', error.message, error);
        return;
      }

      setApplications((prev) => prev.filter((app) => app.id !== id));
    },
    [userId, supabase]
  );

  return {
    applications,
    isLoaded,
    addApplication,
    updateApplication,
    deleteApplication,
  };
};
