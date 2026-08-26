import type { ReactNode } from 'react';

/**
 * A section of the page. The label sits in the left gutter on wide screens and
 * doubles as the section heading, so the structural marker carries real
 * information rather than decorating the layout.
 */
export default function Section({
  id,
  label,
  children,
}: {
  id: string;
  label: string;
  children: ReactNode;
}) {
  return (
    <section className="section" id={id}>
      <h2 className="section-label">{label}</h2>
      <div className="section-body">{children}</div>
    </section>
  );
}
