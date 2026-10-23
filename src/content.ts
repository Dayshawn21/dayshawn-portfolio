export const profile = {
  name: 'Dayshawn Terry',
  title: 'Software engineer',
  email: 'Dayshawn21@gmail.com',
  github: 'https://github.com/Dayshawn21',
  linkedin: 'https://linkedin.com/in/dayshawn-terry',
  resume: '/Dayshawn_Terry_Resume.pdf',
  year: 2026,
  introduction:
    'I’m Dayshawn, a software engineer with 4+ years of experience turning complex workflows into clear, usable interfaces. I bring that frontend foundation to the full stack.',
};

export type PipelineIcon = 'calendar' | 'layers' | 'model' | 'check' | 'screen';

export interface PipelineStage {
  name: string;
  technology: string;
  icon: PipelineIcon;
  heading: string;
  description: string;
}

export interface Sport {
  name: string;
  label: string;
}

export interface Project {
  id: string;
  name: string;
  summary: string;
  status: string;
  role: string;
  technologies: string[];
  liveUrl: string;
  sourceUrl?: string;
  explanationUrl?: string;
  caseStudyIntroduction: string;
  sports: Sport[];
  screenshot?: { src: string; mobileSrc: string; alt: string; caption: string; width: number; height: number };
  pipeline: PipelineStage[];
  decisions: { area: string; description: string; lesson: string }[];
}

export const projects: Project[] = [
  {
    id: 'sportapp',
    name: 'SportApp',
    summary:
      'A sports analytics and research platform that brings schedules, statistics, market odds, and model evaluation into one place.',
    status: 'In active development',
    role: 'Independent full-stack development',
    technologies: ['React', 'TypeScript', 'Python', 'FastAPI', 'PostgreSQL'],
    liveUrl: 'https://sportapp-web-7v3r.onrender.com/#/',
    sourceUrl: 'https://github.com/Dayshawn21/TennisPredictor',
    explanationUrl: 'https://sportapp-web-7v3r.onrender.com/#/how-it-works',
    caseStudyIntroduction: 'I built SportApp’s frontend, backend, and data workflows. These are a few of the decisions behind the product.',
    sports: [
      { name: 'Tennis', label: 'Match probabilities' },
      { name: 'NFL', label: 'Props & game lines' },
      { name: 'NBA', label: 'Assist projections' },
    ],
    screenshot: {
      src: '/sportapp-how-it-works.png',
      mobileSrc: '/sportapp-how-it-works-mobile.png',
      alt: 'SportApp’s How it works page, describing what the app does and how its data flows.',
      caption: 'SportApp’s public How it works page, October 2026.',
      width: 720,
      height: 656,
    },
    pipeline: [
      {
        name: 'Collect',
        technology: 'GitHub Actions',
        icon: 'calendar',
        heading: 'Collect on a schedule.',
        description:
          'Scheduled jobs gather schedules, box scores, sportsbook odds, and prop lines for tennis, the NFL, and the NBA. The pipeline brings external data into a repeatable workflow.',
      },
      {
        name: 'Unify',
        technology: 'Python + PostgreSQL',
        icon: 'layers',
        heading: 'Give every source a shared language.',
        description:
          'Different providers name the same players, teams, and events differently. Those records are matched to shared identities so the application can compare related information consistently.',
      },
      {
        name: 'Model',
        technology: 'Python + XGBoost',
        icon: 'model',
        heading: 'Compare predictions with the market.',
        description:
          'Models produce win probabilities and stat projections. Sportsbook odds are adjusted to remove the bookmaker’s margin, creating a fair market probability for comparison.',
      },
      {
        name: 'Evaluate',
        technology: 'Out-of-sample checks',
        icon: 'check',
        heading: 'Let the evidence do the talking.',
        description:
          'Predictions are stored before events begin and graded against the results afterward. Out-of-sample and forward checks help keep outcomes from leaking into their own evaluation.',
      },
      {
        name: 'Explore',
        technology: 'FastAPI + React',
        icon: 'screen',
        heading: 'Make the system understandable.',
        description:
          'A typed API connects the backend to a React interface with TanStack Query caching. Visitors can explore upcoming events, match analysis, and each model’s track record.',
      },
    ],
    decisions: [
      {
        area: 'Query performance',
        description:
          'An N+1 query pattern was causing endpoint timeouts. I traced the repeated database work and replaced it with batched queries, addressing the timeout issue at the data-access layer.',
        lesson: 'A responsive interface starts with understanding what happens behind the API.',
      },
      {
        area: 'Data quality',
        description:
          'I built the FastAPI backend, PostgreSQL data model, and scheduled ingestion jobs alongside the React client. An admin console helps identify data-quality issues, while shared player and event identities make comparisons across providers possible.',
        lesson: 'Collecting data is only the beginning. Keeping it coherent is part of the product.',
      },
      {
        area: 'Model evaluation',
        description:
          'I built walk-forward validation tracking log-loss, Brier score, and AUC, with probability calibration. The app tests new signals on unseen events and turns picks off when the evidence does not support them.',
        lesson: 'An honest model track record is more useful than an impressive-looking prediction.',
      },
    ],
  },
];

export interface Experience {
  employer: string;
  role: string;
  period: string;
  introduction: string;
  work: {
    name: string;
    context: string;
    technologies: string;
    highlights: string[];
  }[];
}

export const experience: Experience[] = [
  {
    employer: 'Visualutions',
    role: 'Front-End Developer',
    period: 'October 2021 – October 2026',
    introduction:
      'Building enterprise web applications for complex analytics, compliance, and practice-management workflows.',
    work: [
      {
        name: 'Saber',
        context: 'Analytics & compliance',
        technologies: 'React / TypeScript',
        highlights: [
          'Primary author of an application spanning 30 modules, with 55+ reusable UI components and a shared validation framework.',
          'Integrated 230+ REST API endpoints, OIDC single sign-on, and permission-driven navigation.',
          'Delivered live progress updates with SignalR and Redux, plus streaming exports to reduce browser memory usage.',
        ],
      },
      {
        name: 'Dental practice platform',
        context: 'Patient, financial & reporting workflows',
        technologies: 'React / Power BI Embedded',
        highlights: [
          'Developed data-heavy reporting interfaces for a platform spanning 60+ report types, and independently built three federal report tables.',
          'Implemented coordination of benefits for four ranked payers, introducing the workflow behind a feature flag.',
        ],
      },
      {
        name: 'Beacon',
        context: 'Practice management',
        technologies: 'Blazor / C# / .NET',
        highlights: [
          'Led development of a practice-management module within a 15-contributor solution.',
          'Aligned menu visibility with route authorization, added access-behavior tests, and independently implemented a versioned EDI encoder.',
        ],
      },
    ],
  },
];

export const lineScore = {
  team: 'Visualutions',
  period: '2021–26',
  caption: 'Figures from my résumé.',
  figures: [
    { value: '30', label: 'Saber modules' },
    { value: '55+', label: 'Reusable components' },
    { value: '230+', label: 'API endpoints integrated' },
    { value: '60+', label: 'Platform report types' },
  ],
};

export const skillGroups = [
  {
    title: 'Interfaces & interaction',
    skills: ['React', 'TypeScript', 'JavaScript', 'Blazor', 'Redux Toolkit', 'HTML & SCSS', 'Accessibility'],
  },
  {
    title: 'Backend & data',
    skills: ['Python', 'FastAPI', 'C# / .NET', 'PostgreSQL', 'SQL Server', 'SQLAlchemy', 'REST APIs'],
  },
  {
    title: 'Testing & delivery',
    skills: ['Vitest', 'React Testing Library', 'Pytest', 'GitHub Actions', 'Azure DevOps', 'Git'],
  },
];
