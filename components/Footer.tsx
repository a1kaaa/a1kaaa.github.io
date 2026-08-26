import { siteConfig } from '../site';
import type { UIStrings } from '../content';

export default function Footer({ t }: { t: UIStrings }) {
  return (
    <footer className="footer">
      <div className="shell footer-inner">
        <p>
          © {new Date().getFullYear()} {siteConfig.name}
        </p>
        <p>{t.footer.built}</p>
      </div>
    </footer>
  );
}
