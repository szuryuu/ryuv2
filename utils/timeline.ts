export interface TimelineRole {
  title: string;
  date: string;
  description: string;
}

export interface TimelineEvent {
  id: string;
  title: string;
  roles: TimelineRole[];
}

export const timelineEvents: TimelineEvent[] = [
  {
    id: 'reviewer',
    title: 'External Code Reviewer',
    roles: [
      {
        title: 'Front End Code Reviewer',
        date: 'Sep 2025 - Present',
        description: 'Mentored developers through rigorous code reviews, enforcing scalable architecture and secure coding standards.',
      },
    ],
  },
  {
    id: 'intern',
    title: 'Botika',
    roles: [
      {
        title: 'Full Stack Developer Intern',
        date: 'Jul 2025 - Aug 2025',
        description: 'Engineered backend services and optimized database queries to reduce system latency, ensuring the application foundation was ready for scalable deployment.',
      },
      {
        title: 'DevOps Engineer Intern',
        date: 'Sep 2025 - Apr 2026',
        description: 'Transitioned to DevOps. Managed CI/CD pipelines, automated server provisioning, and implemented infrastructure monitoring.',
      },
    ],
  },
  {
    id: 'mtcna',
    title: 'MikroTik',
    roles: [
      {
        title: 'MTCNA Certification',
        date: 'May 2025',
        description: 'Achieved certification in network routing, firewall configurations, and secure system administration.',
      },
    ],
  },
  {
    id: 'dbs',
    title: 'DBS Foundation Coding Camp',
    roles: [
      {
        title: 'Full Stack Web Developer',
        date: 'Jan 2025 - Apr 2025',
        description: 'Developed end-to-end applications with a strong emphasis on backend architecture, system performance optimization, and secure API integrations.',
      },
    ],
  },
];
