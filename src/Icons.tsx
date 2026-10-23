import type { SVGProps } from 'react';
import type { PipelineIcon } from './content';

type IconName = PipelineIcon | 'arrow-up-right' | 'arrow-right' | 'arrow-down' | 'download' | 'mail' | 'code' | 'arrow-up';

export function Icon({ name, ...props }: SVGProps<SVGSVGElement> & { name: IconName }) {
  const paths: Record<IconName, React.ReactNode> = {
    'arrow-up-right': <><path d="M6 18 18 6M6 6h12v12" /></>,
    'arrow-right': <><path d="M4 12h15M13 5l7 7-7 7" /></>,
    'arrow-down': <><path d="M12 4v15M5 13l7 7 7-7" /></>,
    'arrow-up': <><path d="M12 20V5M5 11l7-7 7 7" /></>,
    download: <><path d="M12 3v12M7 10l5 5 5-5M4 16v4h16v-4" /></>,
    mail: <><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3 6 9 7 9-7" /></>,
    code: <><path d="m8 6-6 6 6 6m8-12 6 6-6 6m-3-14-2 16" /></>,
    calendar: <><rect x="3" y="5" width="18" height="16" rx="2" /><path d="M7 3v4m10-4v4M3 11h18m-14 5h3m4 0h3" /></>,
    layers: <><path d="m12 3 10 5-10 5L2 8l10-5Zm-9 9 9 5 9-5M3 16l9 5 9-5" /></>,
    model: <><path d="M3 19V5m0 14h18M6 14l4-5 4 3 5-7" /><circle cx="6" cy="14" r="1" /><circle cx="10" cy="9" r="1" /><circle cx="14" cy="12" r="1" /><circle cx="19" cy="5" r="1" /></>,
    check: <><path d="m7 12 3 3 7-7" /><path d="M20 5v8a8 8 0 0 1-16 0V5l8-3 8 3Z" /></>,
    screen: <><rect x="2" y="3" width="20" height="14" rx="2" /><path d="M8 21h8m-4-4v4M2 7h20" /></>,
  };
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.65" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" data-icon={name} {...props}>
      {paths[name]}
    </svg>
  );
}
