import { Application } from '@/lib/types';

export const exportToCSV = (applications: Application[], filename = 'job_applications.csv') => {
  // Define CSV headers
  const headers = [
    'Company',
    'Role',
    'Platform',
    'Status',
    'Date Applied',
    'Location',
    'Salary',
    'Resume Version',
    'Follow-up Date',
    'Application Link',
    'Notes',
  ];

  // Create CSV rows
  const rows = applications.map((app) => [
    escapeCSVField(app.company),
    escapeCSVField(app.role),
    escapeCSVField(app.platform),
    escapeCSVField(app.status),
    app.dateApplied,
    escapeCSVField(app.location || ''),
    escapeCSVField(app.salary || ''),
    escapeCSVField(app.resumeVersion || ''),
    app.followUpDate || '',
    escapeCSVField(app.applicationLink || ''),
    escapeCSVField(app.notes || ''),
  ]);

  // Combine headers and rows
  const csvContent = [
    headers.join(','),
    ...rows.map((row) => row.join(',')),
  ].join('\n');

  // Create blob and download
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);

  link.setAttribute('href', url);
  link.setAttribute('download', filename);
  link.style.visibility = 'hidden';

  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

// Helper function to escape CSV fields (handle commas, quotes, newlines)
const escapeCSVField = (field: string): string => {
  if (!field) return '""';
  
  // If field contains comma, newline, or double quote, wrap in quotes and escape quotes
  if (field.includes(',') || field.includes('\n') || field.includes('"')) {
    return `"${field.replace(/"/g, '""')}"`;
  }
  
  return field;
};
