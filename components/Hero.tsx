import { siteConfig } from '../site';
import type { UIStrings } from '../content';

export default function Hero({ t }: { t: UIStrings }) {
  return (
    <section className="hero">
      <div className="shell hero-inner">
        <p className="hero-role">{t.hero.role}</p>
        <h1 className="hero-name">{siteConfig.name}</h1>
        <p className="hero-pitch">{t.hero.pitch}</p>

        <dl className="meta">
          {t.meta.map((item) => (
            <div className="meta-item" key={item.label}>
              <dt>{item.label}</dt>
              <dd>{item.value}</dd>
            </div>
          ))}
        </dl>

        <div className="hero-actions">
          <a className="button" href="#contact">
            {t.hero.contact}
          </a>
          <a className="link" href={siteConfig.githubUrl} target="_blank" rel="noreferrer">
            {t.hero.github} <span aria-hidden="true">↗</span>
          </a>
          <a className="link" href={siteConfig.cvUrl} target="_blank" rel="noreferrer">
            {t.cv} <span aria-hidden="true">↗</span>
          </a>
        </div>
      </div>
    </section>
  );
}
