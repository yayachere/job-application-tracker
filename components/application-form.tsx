'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { ApplicationFormData } from '@/lib/types';
import { APPLICATION_STATUSES, PLATFORMS } from '@/lib/constants';

const formSchema = z.object({
  company: z.string().min(2, { message: 'Company name must be at least 2 characters.' }),
  role: z.string().min(2, { message: 'Job role must be at least 2 characters.' }),
  platform: z.string().min(1, { message: 'Please select a platform.' }),
  status: z.string().min(1, { message: 'Please select a status.' }),
  dateApplied: z.string().min(1, { message: 'Please select a date.' }),
  notes: z.string().optional(),
  salary: z.string().optional(),
  location: z.string().optional(),
  applicationLink: z.string().url('Please enter a valid URL').optional().or(z.literal('')),
  resumeVersion: z.string().optional(),
  followUpDate: z.string().optional(),
  needsFollowUp: z.boolean().optional(),
});

interface ApplicationFormProps {
  onSubmit: (data: ApplicationFormData) => void;
  onCancel?: () => void;
  defaultValues?: Partial<ApplicationFormData>;
}

export const ApplicationForm = ({
  onSubmit,
  onCancel,
  defaultValues,
}: ApplicationFormProps) => {
  const form = useForm<ApplicationFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      company: '',
      role: '',
      platform: '',
      status: 'applied',
      dateApplied: new Date().toISOString().split('T')[0],
      notes: '',
      salary: '',
      location: '',
      applicationLink: '',
      resumeVersion: '',
      followUpDate: '',
      needsFollowUp: false,
      ...defaultValues,
    },
  });

  return (
    <Card className="p-6 bg-white dark:bg-slate-900 dark:border-slate-700">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="company"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Company Name</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., Google" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="role"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Job Role</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., Senior Frontend Engineer" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="platform"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Platform</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a platform" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {PLATFORMS.map((platform) => (
                        <SelectItem key={platform} value={platform}>
                          {platform}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Status</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a status" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {APPLICATION_STATUSES.map((status) => (
                        <SelectItem key={status.value} value={status.value}>
                          {status.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="dateApplied"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Date Applied</FormLabel>
                  <FormControl>
                    <Input type="date" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="salary"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Salary Expectation (Optional)</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., $120,000 - $160,000" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="location"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Location (Optional)</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., San Francisco, CA" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="applicationLink"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Application Link (Optional)</FormLabel>
                  <FormControl>
                    <Input
                      type="url"
                      placeholder="e.g., https://job-board.com/job/12345"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="resumeVersion"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Resume Version (Optional)</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., v1, v2-tech, senior-v3" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="followUpDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Follow-up Date (Optional)</FormLabel>
                  <FormControl>
                    <Input type="date" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="notes"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Notes (Optional)</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Add any additional notes about this application..."
                    className="resize-none"
                    rows={4}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex gap-3 justify-end">
            {onCancel && (
              <Button type="button" variant="outline" onClick={onCancel}>
                Cancel
              </Button>
            )}
            <Button type="submit">Add Application</Button>
          </div>
        </form>
      </Form>
    </Card>
  );
};
