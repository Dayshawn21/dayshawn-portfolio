import { useRef, useState } from 'react';
import { experience, lineScore, moreProjects, profile, projects, skillGroups, type Project, type SideProject } from './content';
import { Icon } from './Icons';
import { useActiveSection } from './useActiveSection';

const navigationItems = [
  { id: 'work', label: 'Work' },
  { id: 'experience', label: 'Experience' },
  { id: 'about', label: 'About' },
] as const;
const trackedSections = [...navigationItems.map(item => item.id), 'contact'];

function ExternalLink({ href, children, className = '' }: { href: string; children: React.ReactNode; className?: string }) {
  return <a href={href} className={className} target="_blank" rel="noopener noreferrer">{children}<span className="sr-only"> (opens in a new tab)</span></a>;
}

function Pipeline({ project }: { project: Project }) {
  const [selected, setSelected] = useState(0);
  const [hasInteracted, setHasInteracted] = useState(false);
  const stage = project.pipeline[selected];
  if (!stage) return null;
  const detailId = `${project.id}-pipeline-detail`;

  return (
    <div className="pipeline-surface">
      <div className="pipeline-heading">
        <h3>How the data moves</h3>
        <p>Choose a stage</p>
      </div>
      <ol className="pipeline" aria-label={`${project.name} data pipeline`}>
        {project.pipeline.map((item, index) => (
          <li key={item.name}>
            <button
              type="button"
              className="pipeline-stage"
              aria-pressed={selected === index}
              aria-controls={detailId}
              onClick={() => {
                if (index !== selected) {
                  setHasInteracted(true);
                  setSelected(index);
                }
              }}
            >
              <span className="stage-top"><Icon name={item.icon} /><span className="stage-number">{index + 1}</span></span>
              <span className="stage-name">{item.name}</span>
              <span className="stage-technology">{item.technology}</span>
            </button>
            {index < project.pipeline.length - 1 && <Icon
              key={`${index}-${selected}`}
              name="arrow-right"
              className={`pipeline-connector${index < selected ? ' is-reached' : ''}${hasInteracted && selected === index + 1 ? ' is-flowing' : ''}`}
            />}
          </li>
        ))}
      </ol>
      <div className="pipeline-detail" id={detailId} aria-live="polite" aria-atomic="true">
        <span className="pipeline-index" aria-hidden="true">{selected + 1}<span>/{project.pipeline.length}</span></span>
        <div className="pipeline-detail-body">
          {project.pipeline.map((item, index) => (
            <div key={item.name} className={`pipeline-explanation${hasInteracted ? ' has-transition' : ''}`} aria-hidden={selected !== index}>
              <h4>{item.heading}</h4><p>{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

const countWords = ['No', 'One', 'Two', 'Three', 'Four', 'Five', 'Six'];

// Long detail collapses on phones only; on wider screens the toggle is hidden and the detail always shows.
function DetailToggle({ open, controls, onToggle, label }: { open: boolean; controls: string; onToggle: () => void; label: string }) {
  return (
    <button type="button" className="detail-toggle" aria-expanded={open} aria-controls={controls} onClick={onToggle}>
      {open ? 'Hide details' : label}<Icon name="arrow-down" />
    </button>
  );
}

function Decision({ decision, id }: { decision: Project['decisions'][number]; id: string }) {
  const [open, setOpen] = useState(false);
  return (
    <article className={`decision plate${open ? ' is-open' : ''}`}>
      <h4>{decision.area}</h4>
      <p className="decision-description" id={id}>{decision.description}</p>
      <p className="decision-lesson"><span>Lesson</span>{decision.lesson}</p>
      <DetailToggle open={open} controls={id} onToggle={() => setOpen(!open)} label="How I did it" />
    </article>
  );
}

function SideProjectCard({ project }: { project: SideProject }) {
  const [open, setOpen] = useState(false);
  const detailId = `${project.id}-details`;
  return (
    <article className={`side-project plate${open ? ' is-open' : ''}`} id={project.id} aria-labelledby={`${project.id}-title`}>
      <h3 id={`${project.id}-title`}>{project.name}</h3>
      <p className="side-project-summary">{project.summary}</p>
      <DetailToggle open={open} controls={detailId} onToggle={() => setOpen(!open)} label="Key details" />
      <ul className="side-project-highlights" id={detailId}>{project.highlights.map(highlight => <li key={highlight}>{highlight}</li>)}</ul>
      <ul className="technology-list" aria-label={`${project.name} technologies`}>
        {project.technologies.map(technology => <li key={technology}>{technology}</li>)}
      </ul>
      <div className="side-project-links">
        <ExternalLink href={project.liveUrl} className="text-link">Open live app<Icon name="arrow-up-right" /></ExternalLink>
        <ExternalLink href={project.sourceUrl} className="text-link"><Icon name="code" />View source</ExternalLink>
      </div>
      {project.screenshot && (
        <img className="side-project-media side-project-screen" src={project.screenshot.src} alt={project.screenshot.alt} width={project.screenshot.width} height={project.screenshot.height} loading="lazy" decoding="async" />
      )}
      {project.architecture && (
        <div className="side-project-media side-project-architecture">
          <p className="architecture-heading">How requests flow</p>
          <dl>
            {project.architecture.map(row => (
              <div className="architecture-row" key={row.label}>
                <dt>{row.label}</dt>
                <dd><ol aria-label={`${row.label} path`}>{row.steps.map(step => <li key={step}>{step}</li>)}</ol></dd>
              </div>
            ))}
          </dl>
        </div>
      )}
    </article>
  );
}

function ProjectFeature({ project, primary }: { project: Project; primary: boolean }) {
  return (
    <article className="project" id={project.id} aria-labelledby={`${project.id}-title`}>
      <div className="project-heading">
        <div className="project-overview">
          <h2 className="board-title" id={`${project.id}-title`}>{project.name}</h2>
          <p className="project-status">{project.role}</p>
          <p className="project-summary">{project.summary}</p>
          <ul className="technology-list" aria-label={`${project.name} technologies`}>
            {project.technologies.map(technology => <li key={technology}>{technology}</li>)}
          </ul>
          <div className="project-links">
            <ExternalLink href={project.liveUrl} className="button button-primary">Open live app<Icon name="arrow-up-right" /></ExternalLink>
            {project.sourceUrl && <ExternalLink href={project.sourceUrl} className="text-link"><Icon name="code" />View source</ExternalLink>}
          </div>
          <p className="project-note">The live app can take a moment to load. If it’s unavailable, everything on this page still explains how it works.</p>
          {project.decisions.length > 0 && <a className="text-link project-case-link" href={primary ? '#case-study' : `#${project.id}-case-study`}>Read the case study<Icon name="arrow-down" /></a>}
        </div>
        {project.screenshot && (
          <figure className="project-screen">
            <picture>
              <source media="(max-width: 560px)" srcSet={project.screenshot.mobileSrc} width={project.screenshot.mobileWidth} height={project.screenshot.mobileHeight} />
              <img src={project.screenshot.src} alt={project.screenshot.alt} width={project.screenshot.width} height={project.screenshot.height} loading="lazy" decoding="async" />
            </picture>
            <figcaption>{project.screenshot.caption}</figcaption>
          </figure>
        )}
      </div>
      {project.pipeline.length > 0 && <Pipeline project={project} />}
      {project.decisions.length > 0 && (
        <section className="case-study" id={primary ? 'case-study' : `${project.id}-case-study`} aria-labelledby={`${project.id}-case-title`}>
          <div className="section-intro">
            <h3 id={`${project.id}-case-title`}>{countWords[project.decisions.length] ?? project.decisions.length} decisions behind {project.name}</h3>
            <p>{project.caseStudyIntroduction}</p>
          </div>
          <div className="decisions">
            {project.decisions.map((decision, index) => <Decision key={decision.area} decision={decision} id={`${project.id}-decision-${index + 1}`} />)}
          </div>
          {project.explanationUrl && <ExternalLink href={project.explanationUrl} className="text-link">See how {project.name} works<Icon name="arrow-up-right" /></ExternalLink>}
        </section>
      )}
    </article>
  );
}

export default function App() {
  const headerRef = useRef<HTMLElement>(null);
  const activeSection = useActiveSection(trackedSections, headerRef);
  const boardProjects = [...projects, ...moreProjects];
  return (
    <>
      <div id="top" aria-hidden="true" />
      <a href="#main" className="skip-link">Skip to content</a>
      <header className="site-header" ref={headerRef}>
        <div className="container header-inner">
          <a className="brand" href="#top" aria-label="Dayshawn Terry, back to top"><span className="brand-mark" aria-hidden="true">DT</span><span>{profile.name}</span></a>
          <nav aria-label="Primary navigation">{navigationItems.map(item => <a key={item.id} href={`#${item.id}`} aria-current={activeSection === item.id ? 'location' : undefined}>{item.label}</a>)}</nav>
          <a className="header-contact" href="#contact" aria-current={activeSection === 'contact' ? 'location' : undefined}>Contact<Icon name="arrow-down" /></a>
        </div>
      </header>
      <main id="main" tabIndex={-1}>
        <section className="intro container" aria-labelledby="intro-title">
          <div className="intro-board">
            <div className="intro-main">
              <h1 id="intro-title"><span className="tile">Dayshawn</span> <span className="tile">Terry</span></h1>
              <p className="intro-role">Software engineer · Frontend experience · Full-stack projects</p>
              <p className="intro-copy">{profile.introduction}</p>
              <div className="intro-actions"><a className="button button-primary" href="#work">View projects<Icon name="arrow-down" /></a><a className="text-link resume-link" href={profile.resume} download><Icon name="download" />Download résumé</a></div>
              <p className="availability"><span className="lamp" aria-hidden="true" />Open to frontend &amp; full-stack roles · {profile.location}</p>
            </div>
            <section className="now-posting" aria-labelledby="now-posting-title">
              <h2 className="now-posting-title" id="now-posting-title">On the board</h2>
              <ul className="board-slots">
                {boardProjects.map(project => (
                  <li key={project.id}>
                    <a className="board-slot" href={`#${project.id}`}>
                      <span className="slot-text"><span className="slot-name">{project.name}</span><span className="slot-tagline">{project.tagline}</span></span>
                      <span className="slot-tag">{project.boardTag}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </section>
          </div>
          <div className="line-score-frame">
            <table className="line-score">
              <caption>{lineScore.caption} <a className="line-score-link" href="#experience">See my experience<Icon name="arrow-down" /></a></caption>
              <thead><tr><td /><th scope="col">Years</th>{lineScore.figures.map(figure => <th scope="col" key={figure.label}>{figure.label}</th>)}</tr></thead>
              <tbody><tr><th scope="row">{lineScore.team}<span className="line-score-role">{lineScore.role}</span></th><td className="line-score-period" data-label="Years">{lineScore.period}</td>{lineScore.figures.map(figure => <td key={figure.label} data-label={figure.label}>{figure.value}</td>)}</tr></tbody>
            </table>
          </div>
        </section>

        <section className="work container" id="work" aria-label="Independent projects">
          {projects.map((project, index) => <ProjectFeature key={project.id} project={project} primary={index === 0} />)}
          {moreProjects.length > 0 && (
            <section className="more-projects" aria-labelledby="more-projects-title">
              <h2 className="board-title" id="more-projects-title">More projects</h2>
              <div className="more-projects-grid">
                {moreProjects.map(project => <SideProjectCard key={project.id} project={project} />)}
              </div>
            </section>
          )}
        </section>

        <section className="experience container" id="experience" aria-labelledby="experience-title">
          <div className="section-intro experience-intro"><h2 className="board-title" id="experience-title">Experience</h2><p>Enterprise software taught me to think beyond the screen: permissions, performance, edge cases, and the people doing the work.</p></div>
          {experience.map(job => (
            <div className="job" key={`${job.employer}-${job.period}`}>
              <div className="job-summary"><h3>{job.employer}</h3><p className="job-role">{job.role}</p><p className="job-period">{job.period}</p><p className="job-description">{job.introduction}</p><a className="text-link" href={profile.resume} download>Full experience<Icon name="download" /></a></div>
              <table className="box-score">
                <caption className="sr-only">Products I worked on at {job.employer}</caption>
                <thead><tr><th scope="col">Product</th><th scope="col">Area</th><th scope="col">Stack</th></tr></thead>
                {job.work.map(work => (
                  <tbody key={work.name}>
                    <tr className="box-score-row"><th scope="row">{work.name}</th><td>{work.context}</td><td>{work.technologies}</td></tr>
                    <tr className="box-score-detail"><td colSpan={3}><ul>{work.highlights.map(highlight => <li key={highlight}>{highlight}</li>)}</ul></td></tr>
                  </tbody>
                ))}
              </table>
            </div>
          ))}
        </section>

        <section className="about" id="about" aria-labelledby="about-title">
          <div className="container">
            <div className="about-intro"><h2 className="board-title" id="about-title">About</h2><div><p>I’m drawn to the work between complicated systems and the people using them. At Visualutions, that meant reusable interfaces, data-heavy dashboards, and business workflows that needed to work reliably.</p><p>In my own projects, I take that care through the full stack. Lineform runs from scheduled data jobs and database queries to a React interface and a Claude-powered assistant. Sports Analyst Agent puts LLM tool use on live data, and my photography demo runs a serverless booking flow on AWS.</p><p className="education">B.A., Computer Investigation and Criminal Justice<br /><span>St. Ambrose University</span></p></div></div>
            <div className="skills">{skillGroups.map(group => <section className="skill-group" key={group.title} aria-labelledby={`skills-${group.title.split(' ')[0].toLowerCase()}`}><h3 id={`skills-${group.title.split(' ')[0].toLowerCase()}`}>{group.title}</h3><ul>{group.skills.map(skill => <li key={skill}>{skill}</li>)}</ul></section>)}</div>
          </div>
        </section>

        <section className="contact" id="contact" aria-labelledby="contact-title">
          <div className="container contact-inner"><div><h2 id="contact-title">Hiring for frontend or full&#8209;stack?</h2><a className="contact-email" href={`mailto:${profile.email}`}>{profile.email}<Icon name="arrow-up-right" /></a></div><div className="contact-aside"><p>I’d be glad to hear about your team and what you’re building.</p><div className="contact-links"><ExternalLink href={profile.linkedin}>LinkedIn<Icon name="arrow-up-right" /></ExternalLink><ExternalLink href={profile.github}>GitHub<Icon name="arrow-up-right" /></ExternalLink><a href={profile.resume} download>Résumé<Icon name="download" /></a></div></div></div>
        </section>
      </main>
      <footer className="container site-footer"><p>© {profile.year} {profile.name}</p><a href="#top">Back to top<Icon name="arrow-up" /></a></footer>
    </>
  );
}
