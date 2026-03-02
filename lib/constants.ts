export const APPLICATION_STATUSES = [
  { value: 'applied', label: 'Applied', color: 'bg-blue-100 text-blue-800' },
  { value: 'interviewing', label: 'Interviewing', color: 'bg-purple-100 text-purple-800' },
  { value: 'rejected', label: 'Rejected', color: 'bg-red-100 text-red-800' },
  { value: 'offer', label: 'Offer', color: 'bg-green-100 text-green-800' },
  { value: 'accepted', label: 'Accepted', color: 'bg-emerald-100 text-emerald-800' },
] as const;

export const PLATFORMS = [
  'LinkedIn',
  'Indeed',
  'Glassdoor',
  'Company Website',
  'Referral',
  'Other',
];

export const STORAGE_KEY = 'job-applications';
