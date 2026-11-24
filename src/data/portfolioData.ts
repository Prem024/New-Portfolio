import { Project, SkillCategory, Experience, ApproachStep } from '../types';

export const PERSONAL_INFO = {
  name: 'Prem Nanda',
  initials: 'PN',
  title: 'AI-Enhanced MERN Stack Developer',
  headline: 'Building digital experiences with clean code and intelligent development.',
  location: 'Ahmedabad, Gujarat, India',
  portfolioUrl: 'https://premnanda.vercel.app/',
  email: 'premnanda532@gmail.com',
  github: 'https://github.com/Prem024',
  linkedin: 'https://www.linkedin.com/in/prem-nanda/',
  contactApi: 'https://premnanda-api.vercel.app/contact',
  resumeUrl: '/Prem_Nanda_Resume.pdf',
  availability: 'Available for freelance opportunities',
  status: 'Currently working as a developer',
  summary: `I am a MERN Stack Developer specializing in building scalable web applications, responsive interfaces, REST APIs, backend systems, and database-driven applications. I use modern AI development tools to improve development speed, code quality, and productivity. My focus is on building practical, user-friendly applications with clean architecture and reliable backend systems.`,
  aboutText: `I'm a developer who enjoys turning complex problems into practical digital solutions. I enjoy working across the MERN stack, exploring modern development technologies, and building applications that solve real-world problems.

I believe good software is not just about writing code. It's about creating reliable systems, solving problems efficiently, and delivering meaningful user experiences.`,
  education: [
    {
      degree: 'Bachelor of Computer Applications (BCA)',
      institution: 'Vidhyasagar Infotech',
      location: 'Ahmedabad, Gujarat',
    },
    {
      degree: 'MERN Stack Development Course',
      institution: 'Professional Certification',
      location: 'Ahmedabad, Gujarat',
    },
  ],
};

export const PROJECTS: Project[] = [
  {
    id: 'trk-finance',
    number: '01',
    name: 'TRK Finance',
    category: 'Finance Management & Loan CRM',
    organization: 'Azentra Technologies',
    tagline: 'End-to-end loan lifecycle, dynamic EMI scheduling & financial ledger engine',
    shortDescription:
      'A production-grade loan management platform engineering the complete lending lifecycle, from customer loan creation and dynamic EMI amortization to payment recovery, renewals, and investor settlements.',
    detailedDescription:
      'Developed at Azentra Technologies, TRK Finance is an enterprise-scale loan management system designed to eliminate financial discrepancies and automate complex credit operations. It features high-precision financial calculation engines for loan origination, interest schedules, fee structures, and transactional ledgers. Background daemons powered by Node-Cron, Puppeteer, and Nodemailer handle automated payment reminder emails, loan redemption notices, and dynamic PDF/CSV financial audit reports.',
    keyFeatures: [
      'Complete loan lifecycle workflows: creation, EMI schedules, renewals, extensions, top-ups & redemptions',
      'Financial calculation engines for interest rates, penalty fees, and payment reconciliation',
      'Automated PDF/CSV reporting and financial audit exports using Puppeteer',
      'Scheduled payment reminder emails and background job orchestration via Node-Cron',
      'Role-based administrative dashboards with dynamic multi-parameter filtering for loan officers',
      'Redis caching layer ensuring sub-second response times on hot financial summary queries',
    ],
    techStack: [
      'React.js',
      'TypeScript',
      'Node.js',
      'Express.js',
      'PostgreSQL',
      'Sequelize',
      'Redis',
      'Puppeteer',
      'Node-Cron',
      'Nodemailer',
    ],
    architectureHighlights: [
      'ACID-compliant transactions in PostgreSQL ensuring zero balance discrepancy across ledgers',
      'Redis cache layer for hot loan portfolio metrics and frequent recovery lookups',
      'Headless Puppeteer PDF generation service for monthly loan statements',
      'Role-Based Access Control (RBAC) securing loan approval limits and financial disclosures',
    ],
    isEnterprise: true,
    previewType: 'finance',
  },
  {
    id: 'lead-management-system',
    number: '02',
    name: 'Lead Management System',
    category: 'Enterprise Document & Workflow Automation',
    organization: 'Azentra Technologies',
    tagline: 'Automated lead pipeline, Google Drive cloud integration & document underwriting',
    shortDescription:
      'A full-stack customer onboarding and document verification platform automating file collection, cloud storage organization, approval workflows, and scheduled reminder emails.',
    detailedDescription:
      'Engineered at Azentra Technologies to replace manual loan paperwork underwriting with an automated, secure digital verification system. Administrators create leads and issue secure, time-sensitive onboarding links. Applicants upload identity and financial documents directly into dedicated, programmatically created Google Drive folders. Background cron jobs track missing documentation and trigger alternate-day reminder notifications, while an administrative control panel manages document approvals, rejections, and audit trails.',
    keyFeatures: [
      'Lead onboarding with 24-hour expiring temporary password setup links',
      'Google Drive API integration automatically provisioning dedicated customer folders',
      'Multi-file upload pipeline with MIME-type validation and real-time status shifts',
      'Automated alternate-day reminder emails via Node-Cron for applicants with pending documents',
      'Admin verification portal with approval, rejection with comments, and re-upload workflows',
      'Detailed audit email logs with one-click resend capabilities and user activity logs',
    ],
    techStack: [
      'React.js',
      'TypeScript',
      'Node.js',
      'Express.js',
      'MySQL / PostgreSQL',
      'Sequelize',
      'Redux Toolkit',
      'Socket.io',
      'Google Drive API',
      'Node-Cron',
      'Nodemailer',
    ],
    architectureHighlights: [
      'Streaming multipart file upload directly to Google Drive API without overloading server RAM',
      'Node-Cron background worker executing scheduled reminder sweeps and admin alerts',
      'Audit log trail recording timestamps, reviewers, and rejection rationales',
      'JWT authentication with RBAC separating Customer, Loan Officer, and Admin permissions',
    ],
    isEnterprise: true,
    previewType: 'loan-lead',
  },
  {
    id: 'grocery-stock-management',
    number: '03',
    name: 'Grocery Stock Management System',
    category: 'Full-Stack Inventory & Stock Automation',
    tagline: 'Automated stock adjustments, real-time analytics & supplier management',
    shortDescription:
      'A full-stack MERN inventory management application designed to automate stock quantity adjustments during transactions, provide real-time inventory analytics, and trigger low-stock alerts.',
    detailedDescription:
      'Built using the MERN stack (MongoDB, Express.js, React.js, Node.js) with Tailwind CSS, this platform empowers warehouse and store managers to monitor live stock levels, log stock-in and stock-out transactions, and prevent inventory depletion. Developed RESTful APIs to automatically compute remaining quantities upon transaction completion, alongside a responsive dashboard powered by Redux Toolkit for real-time inventory tracking, low-stock threshold alerts, and full CRUD operations across products, categories, and suppliers.',
    keyFeatures: [
      'Automated stock adjustments upon stock-in and stock-out transaction confirmation',
      'Real-time inventory tracking dashboard with interactive metrics powered by Redux Toolkit',
      'Automated low-stock warning triggers alerting administrators before stock depletion',
      'Secure admin-only authentication and authorization using JSON Web Tokens (JWT)',
      'Full CRUD management for product catalogs, custom categories, and supplier records',
      'Responsive, mobile-friendly interface styled with Tailwind CSS',
    ],
    techStack: [
      'React.js',
      'Node.js',
      'Express.js',
      'MongoDB',
      'Mongoose',
      'Redux Toolkit',
      'Tailwind CSS',
      'JWT',
    ],
    architectureHighlights: [
      'Atomic document updates in MongoDB ensuring accurate inventory counts during concurrent transactions',
      'Centralized global inventory state with Redux Toolkit preventing redundant network roundtrips',
      'Protected Express router middleware validating JWT tokens on all administrative mutations',
      'Compound indexing on product SKUs, supplier IDs, and category names',
    ],
    previewType: 'grocery-stock',
    githubUrl: 'https://github.com/Prem024/Grocery-Project',
  },
  {
    id: 'techtales',
    number: '04',
    name: 'TechTales',
    category: 'Full-Stack Content & Publishing Platform',
    tagline: 'Personalized author dashboard, dynamic slugs & engaging reader community',
    shortDescription:
      'A modern full-stack blogging platform built with React (Vite), Node.js, Express, and MongoDB, featuring secure JWT/bcrypt authentication, personalized author dashboards, and dynamic URL slug generation.',
    detailedDescription:
      'TechTales is a high-performance content publishing platform engineered for developer storytelling and community engagement. It provides authors with a personalized dashboard for creating, editing, and publishing technical articles with full CRUD functionality. Designed with SEO-friendly dynamic slug generation, an interactive nested commenting system, global state management via Redux Toolkit, and a responsive mobile-first UI crafted with Tailwind CSS.',
    keyFeatures: [
      'Secure user authentication with encrypted password storage using bcrypt and JWT',
      'Personalized author dashboard with complete article authoring and publishing CRUD',
      'SEO-optimized dynamic URL slug generation based on article titles',
      'Interactive reader commenting system fostering community discussion',
      'Global state management with Redux Toolkit for seamless client-side navigation',
      'Mobile-first responsive design built with Tailwind CSS and Vite build tooling',
    ],
    techStack: [
      'React.js',
      'Vite',
      'Node.js',
      'Express.js',
      'MongoDB',
      'Mongoose',
      'Redux Toolkit',
      'Tailwind CSS',
      'JWT',
      'bcrypt',
    ],
    architectureHighlights: [
      'Clean separation of client and RESTful API services with modular Express controllers',
      'MongoDB schema design with populated references for author profiles and nested comments',
      'Optimized asset bundling and lightning-fast HMR powered by Vite',
      'Input sanitization and security middleware guarding against malicious content injection',
    ],
    previewType: 'techtales',
    githubUrl: 'https://github.com/Prem024/TechTales',
    demoUrl: 'https://tech-tales-five.vercel.app/',
  }
];

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    category: 'Frontend Development',
    description: 'Responsive, accessible, and high-performance client applications.',
    skills: [
      { name: 'React.js', highlight: true },
      { name: 'JavaScript ES6+', highlight: true },
      { name: 'HTML5' },
      { name: 'CSS3' },
      { name: 'Redux Toolkit' },
      { name: 'Tailwind CSS', highlight: true },
      { name: 'Bootstrap 5' },
      { name: 'Responsive Design' },
      { name: 'Single Page Applications' },
    ],
  },
  {
    category: 'Backend Development',
    description: 'Robust REST APIs, business logic, authentication, and secure architectures.',
    skills: [
      { name: 'Node.js', highlight: true },
      { name: 'Express.js', highlight: true },
      { name: 'REST APIs', highlight: true },
      { name: 'Middleware Architecture' },
      { name: 'Authentication & Authorization', highlight: true },
      { name: 'bcrypt' },
      { name: 'Redis', highlight: true },
      { name: 'Rate Limiting' },
      { name: 'Nginx' },
    ],
  },
  {
    category: 'Database Systems',
    description: 'Relational and document storage with data modeling and query optimization.',
    skills: [
      { name: 'PostgreSQL', highlight: true },
      { name: 'MongoDB', highlight: true },
      { name: 'Sequelize ORM', highlight: true },
    ],
  },
  {
    category: 'Development Tools & AI',
    description: 'Modern development workflow and AI-assisted engineering tools.',
    skills: [
      { name: 'VS Code' },
      { name: 'Git & GitHub', highlight: true },
      { name: 'Postman', highlight: true },
      { name: 'Chrome DevTools' },
      { name: 'npm' },
      { name: 'Cursor', highlight: true },
      { name: 'Antigravity', highlight: true },
      { name: 'ChatGPT' },
      { name: 'Claude' },
    ],
  },
  {
    category: 'Deployment & DevOps',
    description: 'Cloud hosting, reverse proxying, and production environments.',
    skills: [
      { name: 'Vercel', highlight: true },
      { name: 'Render', highlight: true },
      { name: 'Nginx' },
    ],
  },
];

export const EXPERIENCES: Experience[] = [
  {
    role: 'Backend Software Engineer / MERN Stack Developer',
    company: 'Azentra Technologies',
    employmentType: 'Full-time',
    location: 'Ahmedabad, Gujarat, India',
    period: 'Present',
    summary:
      'Core developer focused on building and scaling backend systems, secure RESTful APIs, and full-stack web applications for enterprise CRM and financial workflow products.',
    responsibilities: [
      'Developing and maintaining full-stack web applications with high availability and reliability.',
      'Building robust RESTful APIs using Node.js and Express.js with clean modular architecture.',
      'Designing relational schemas and managing complex data migrations with PostgreSQL and Sequelize ORM.',
      'Implementing strict authentication and authorization systems utilizing JWT, bcrypt, and role-based permissions.',
      'Developing CRM and finance management modules including lead capture, customer tracking, and approval queues.',
      'Managing loan workflows, dynamic EMI schedules, and payment recovery logic with precision.',
      'Integrating third-party services and automated processes such as cloud storage and scheduled background tasks.',
      'Collaborating closely with frontend developers and cross-functional teams to ship production-ready features.',
    ],
    technologies: [
      'Node.js',
      'Express.js',
      'PostgreSQL',
      'Sequelize',
      'React.js',
      'Redis',
      'REST APIs',
    ],
  },
];

export const APPROACH_STEPS: ApproachStep[] = [
  {
    number: '01',
    title: 'Understand',
    tagline: 'Requirements & Business Logic',
    description:
      'Deep dive into the core problem, user needs, domain constraints, and operational business logic before writing a single line of code.',
    deliverables: [
      'Requirements analysis',
      'Domain logic mapping',
      'Edge case identification',
    ],
  },
  {
    number: '02',
    title: 'Design',
    tagline: 'Architecture & Schema Planning',
    description:
      'Plan the technical blueprint: database schema, relational integrity, REST API contracts, security vectors, and intuitive user flows.',
    deliverables: [
      'ERD & database schema',
      'API contract design',
      'Component hierarchy',
    ],
  },
  {
    number: '03',
    title: 'Develop',
    tagline: 'Clean Code & Intelligent Engineering',
    description:
      'Build scalable frontend interfaces and reliable backend systems using modern MERN practices and AI-assisted development tools.',
    deliverables: [
      'Modular RESTful services',
      'Accessible UI components',
      'Optimized query layers',
    ],
  },
  {
    number: '04',
    title: 'Deliver',
    tagline: 'Optimization, Deployment & Scale',
    description:
      'Test rigorously, optimize response latency, deploy to resilient cloud infrastructure, and maintain continuous improvements.',
    deliverables: [
      'Security & validation checks',
      'Cloud CI/CD deployment',
      'Monitoring & iteration',
    ],
  },
];

export const NAV_LINKS = [
  { label: 'Home', href: '#home' },
  { label: 'Work', href: '#work' },
  { label: 'Skills', href: '#skills' },
  { label: 'Experience', href: '#experience' },
  { label: 'About', href: '#about' },
  { label: 'Contact', href: '#contact' },
];
