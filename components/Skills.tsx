import { skillGroups, type Lang, type UIStrings } from '../content';
import Section from './Section';

export default function Skills({ lang, t }: { lang: Lang; t: UIStrings }) {
  return (
    <Section id="skills" label={t.skills.title}>
      <dl className="skills">
        {skillGroups.map((group) => (
          <div className="skills-group" key={group.title.en}>
            <dt>{group.title[lang]}</dt>
            <dd>
              {group.items.join(' · ')}
              {group.note && <span className="skills-note">{group.note[lang]}</span>}
            </dd>
          </div>
        ))}
      </dl>
    </Section>
  );
}
