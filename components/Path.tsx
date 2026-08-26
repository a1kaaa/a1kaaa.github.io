import { path, type Lang, type UIStrings } from '../content';
import Section from './Section';

export default function Path({ lang, t }: { lang: Lang; t: UIStrings }) {
  return (
    <Section id="path" label={t.path.title}>
      <ol className="path">
        {path.map((entry) => (
          <li className="path-entry" key={entry.place}>
            <p className="path-period">{entry.period}</p>
            <div>
              <h3 className="path-title">{entry.title[lang]}</h3>
              <p className="path-place">{entry.place}</p>
              <p className="path-detail">{entry.detail[lang]}</p>
            </div>
          </li>
        ))}
      </ol>
    </Section>
  );
}
