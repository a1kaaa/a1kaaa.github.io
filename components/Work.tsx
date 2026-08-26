import { projects, type Lang, type UIStrings } from '../content';
import { siteConfig } from '../site';
import Section from './Section';

export default function Work({ lang, t }: { lang: Lang; t: UIStrings }) {
  return (
    <Section id="work" label={t.work.title}>
      <ol className="work-list">
        {projects.map((project) => (
          <li key={project.name}>
            <a className="work-row" href={project.url} target="_blank" rel="noreferrer">
              <span className="work-name">{project.name}</span>
              <span className="work-leader" aria-hidden="true" />
              <span className="work-tech">
                {project.tech} · {project.year} <span aria-hidden="true">↗</span>
              </span>
            </a>
            <p className="work-desc">{project.desc[lang]}</p>
          </li>
        ))}
      </ol>

      <a className="link" href={siteConfig.githubUrl} target="_blank" rel="noreferrer">
        {t.work.all} <span aria-hidden="true">↗</span>
      </a>
    </Section>
  );
}
