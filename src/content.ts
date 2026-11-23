export const profile = {
  name: 'Dayshawn Terry',
  title: 'Software engineer',
  email: 'Dayshawn21@gmail.com',
  github: 'https://github.com/Dayshawn21',
  linkedin: 'https://linkedin.com/in/dayshawn-terry',
  resume: '/Dayshawn_Terry_Resume.pdf',
  location: 'Houston, TX or remote',
  year: 2026,
  introduction:
    'I’m Dayshawn, a software engineer with 5 years of frontend experience turning complex workflows into clear, usable interfaces. I bring that foundation to the full stack.',
};

export type PipelineIcon = 'calendar' | 'layers' | 'model' | 'check' | 'screen';

export interface PipelineStage {
  name: string;
  technology: string;
  icon: PipelineIcon;
  heading: string;
  description: string;
}

export interface Project {
  id: string;
  name: string;
  tagline: string;
  boardTag: string;
  summary: string;
  role: string;
  technologies: string[];
  liveUrl: string;
  sourceUrl?: string;
  explanationUrl?: string;
  liveNote?: string;
  thumbnail?: { src: string; smallSrc: string; width: number; height: number };
  caseStudyIntroduction: string;
  screenshot?: { src: string; mobileSrc: string; alt: string; caption?: string; width: number; height: number; mobileWidth: number; mobileHeight: number };
  pipeline: PipelineStage[];
  decisions: { area: string; description: string; lesson: string }[];
}

export const projects: Project[] = [
  {
    id: 'lineform',
    name: 'Lineform',
    tagline: 'Tennis, NFL, NBA & NHL research platform',
    boardTag: 'Full stack',
    summary:
      'A sports analytics and research platform that brings schedules, statistics, market odds, and model evaluation into one place.',
    role: 'Independent full-stack development',
    technologies: ['React', 'TypeScript', 'Python', 'FastAPI', 'PostgreSQL', 'Claude API'],
    liveUrl: 'https://sportapp-web-7v3r.onrender.com/#/',
    sourceUrl: 'https://github.com/Dayshawn21/Sports-Baseline',
    explanationUrl: 'https://sportapp-web-7v3r.onrender.com/#/how-it-works',
    thumbnail: { src: '/thumb-lineform.jpg', smallSrc: '/thumb-lineform-640.jpg', width: 920, height: 414 },
    liveNote: 'The live app can take a moment to load. If it’s unavailable, everything on this page still explains how it works.',
    caseStudyIntroduction: 'I built Lineform’s frontend, backend, and data workflows. These are a few of the decisions behind the product.',
    screenshot: {
      src: '/lineform-how-it-works.png',
      mobileSrc: '/lineform-how-it-works-mobile.jpg',
      alt: 'Lineform’s top bar above the How data flows list from its How it works page: scheduled jobs collect data, providers’ names are matched, models produce probabilities, predictions are graded after events, and the web app shows each model’s track record.',
      caption: 'How data flows, from Lineform’s public How it works page, November 2026.',
      width: 760,
      height: 342,
      mobileWidth: 645,
      mobileHeight: 708,
    },
    pipeline: [
      {
        name: 'Collect',
        technology: 'GitHub Actions',
        icon: 'calendar',
        heading: 'Collect on a schedule.',
        description:
          'Seventeen scheduled GitHub Actions jobs gather schedules, box scores, sportsbook odds, and prop lines from 8+ providers for tennis, the NFL, the NBA, and the NHL.',
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
          'An N+1 query pattern was causing endpoint timeouts. I replaced it with batched queries, and moved heavy report builds into scheduled jobs so the API stays within a 512 MB host.',
        lesson: 'A responsive interface starts with understanding what happens behind the API.',
      },
      {
        area: 'Data quality',
        description:
          'I built the FastAPI backend and a 50-migration PostgreSQL schema alongside the React client. Shared player and event identities make providers comparable, and about 5,600 automated tests run in CI.',
        lesson: 'Collecting data is only the beginning. Keeping it coherent is part of the product.',
      },
      {
        area: 'Model evaluation',
        description:
          'I validated every model on held-out seasons, including 12,068 tennis matches, under evaluation rules written before the data was read. The app withholds predictions when the evidence does not support them.',
        lesson: 'An honest model track record is more useful than an impressive-looking prediction.',
      },
      {
        area: 'AI assistant',
        description:
          'Ask Lineform answers questions about the app’s data in plain English. I wrote its Claude tool loop by hand, and a 30-question evaluation checks that every number in an answer comes from the app’s own data.',
        lesson: 'An assistant is only as trustworthy as the data it is allowed to quote.',
      },
    ],
  },
  {
    id: 'front-desk-board',
    name: 'Front Desk Board',
    tagline: 'Dental front desk scheduling demo',
    boardTag: 'Frontend',
    summary:
      'A scheduling board for the front desk of a fictional dental office: chairs as columns, patients moving from check-in to checkout, and double-bookings flagged.',
    role: 'Independent project · invented data only',
    technologies: ['React', 'TypeScript', 'TanStack Query', 'Tailwind', 'Claude API', 'Vitest', 'Playwright'],
    liveUrl: 'https://front-desk-board.vercel.app/',
    sourceUrl: 'https://github.com/Dayshawn21/front-desk-board',
    explanationUrl: 'https://github.com/Dayshawn21/front-desk-board/blob/main/docs/TOUR.md',
    thumbnail: { src: '/thumb-front-desk-board.jpg', smallSrc: '/thumb-front-desk-board-640.jpg', width: 920, height: 486 },
    caseStudyIntroduction: 'Every patient, practice, and provider is invented. These are a few of the decisions behind the app.',
    screenshot: {
      src: '/front-desk-board.jpg',
      mobileSrc: '/front-desk-board-mobile.jpg',
      alt: 'Front Desk Board’s schedule in dark mode: chairs as columns, colour-coded visit statuses, a now line at 9:40 AM, and a red banner flagging a double-booking in Chair 2.',
      width: 1200,
      height: 750,
      mobileWidth: 760,
      mobileHeight: 700,
    },
    pipeline: [],
    decisions: [
      {
        area: 'Server state',
        description:
          'Nearly all of the state is server data, so it lives in the TanStack Query cache with per-practice keys. Mutations refetch, every status change and move can be undone, and the mock API returns a 409 when someone else just took the slot.',
        lesson: 'Most frontend state is server state. Treat it that way and the UI stays simpler.',
      },
      {
        area: 'Business rules',
        description:
          'The status workflow, role permissions, overlap detection, and open-slot finder are pure functions with no React in them, built test-first. Times are the practice’s wall-clock strings, not Date objects, so results never shift with the viewer’s timezone.',
        lesson: 'Rules that live outside the components are easier to test and harder to break.',
      },
      {
        area: 'AI booking assist',
        description:
          'Claude turns a typed request into form fields through a server route that keeps the API key off the browser. Picking a time stays deterministic code, a person always books, and an eval measures how accurate the assist is.',
        lesson: 'Let the model fill in the form. Let code and people make the decisions.',
      },
      {
        area: 'Accessibility',
        description:
          'I hand-built the dialog, tabs, and toast instead of using a UI library: dialogs trap and return focus, tabs follow the ARIA pattern, and changes are announced. axe runs on every screen, in both themes, in CI.',
        lesson: 'Accessibility holds up when it is tested, not only intended.',
      },
    ],
  },
];

export interface SideProject {
  id: string;
  name: string;
  tagline: string;
  boardTag: string;
  summary: string;
  technologies: string[];
  highlights: string[];
  liveUrl: string;
  sourceUrl: string;
  screenshot?: { src: string; alt: string; width: number; height: number };
  architecture?: { label: string; steps: string[] }[];
}

export const moreProjects: SideProject[] = [];

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
      'Built enterprise React and TypeScript applications for healthcare analytics, compliance, and practice-management workflows.',
    work: [
      {
        name: 'Saber',
        context: 'Healthcare analytics & compliance',
        technologies: 'React / TypeScript',
        highlights: [
          'Sole front-end developer, alongside one backend developer, on a 30-module application serving 400+ users across 50 tenants. I owned the front-end architecture, conventions, code-quality standards, and end-to-end and integration tests.',
          'Built 55+ reusable UI components and an 18-rule validation framework shared by all 30 modules, and integrated 230+ REST API endpoints behind OIDC single sign-on.',
          'Implemented permission-driven navigation for 50+ access controls, live progress updates with SignalR and Redux, and streaming exports so 100K+ row reports download without overloading browser memory.',
        ],
      },
      {
        name: 'Dental practice platform',
        context: 'Used by 100+ dental offices',
        technologies: 'React / Redux Toolkit',
        highlights: [
          'One of four original front-end developers, joining before launch and gathering requirements directly from customers.',
          'Built report pages with shared filter, table, and CSV export components, plus role-based admin pages for users, locations, providers, fee schedules, and insurance plans.',
          'Built the UI for three federal UDS clinical measures tables and four-payer coordination of benefits, behind a feature flag.',
        ],
      },
      {
        name: 'Beacon',
        context: 'Practice management',
        technologies: 'Blazor / C# / .NET',
        highlights: [
          'Developed a practice-management module within a 15-contributor solution.',
          'Aligned menu visibility with route authorization, added access-behavior tests, and independently implemented a versioned EDI encoder.',
        ],
      },
    ],
  },
];

export const lineScore = {
  team: 'Visualutions',
  period: '2021–26',
  role: 'Front-end developer',
  caption: 'Figures from my résumé.',
  figures: [
    { value: '30', label: 'Saber modules' },
    { value: '55+', label: 'Reusable components' },
    { value: '230+', label: 'API endpoints integrated' },
    { value: '400+', label: 'Saber users' },
  ],
};

export const skillGroups = [
  {
    title: 'Interfaces & interaction',
    skills: ['React', 'TypeScript', 'JavaScript', 'Next.js', 'Redux Toolkit', 'TanStack Query', 'React Router', 'Blazor', 'Fluent UI', 'HTML & SCSS', 'Chart.js', 'Power BI Embedded'],
  },
  {
    title: 'Backend & data',
    skills: ['Python', 'FastAPI', 'C# / .NET', 'PostgreSQL', 'SQL Server', 'SQLAlchemy', 'Alembic', 'REST APIs', 'SignalR & SSE', 'OAuth 2.0 / OIDC'],
  },
  {
    title: 'Cloud & AI',
    skills: ['Claude API: tool use, streaming, evals', 'Claude Code', 'AWS Lambda', 'API Gateway', 'DynamoDB', 'S3 & CloudFront', 'IAM', 'CloudWatch'],
  },
  {
    title: 'Testing & delivery',
    skills: ['Playwright', 'Vitest', 'React Testing Library', 'Pytest', 'GitHub Actions', 'Azure DevOps', 'Vite', 'Git'],
  },
];
