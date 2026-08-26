import { siteConfig } from '../site';
import type { Lang, UIStrings } from '../content';

export default function Header({
  lang,
  onLangChange,
  t,
}: {
  lang: Lang;
  onLangChange: (lang: Lang) => void;
  t: UIStrings;
}) {
  return (
    <header className="header">
      <div className="shell header-inner">
        <a className="brand" href="#main">
          <span className="brand-mark">{siteConfig.initials}</span>
          <span className="brand-name">{siteConfig.name}</span>
        </a>

        <button
          className="lang-switch"
          type="button"
          onClick={() => onLangChange(lang === 'fr' ? 'en' : 'fr')}
        >
          {t.langSwitch}
        </button>
      </div>
    </header>
  );
}
