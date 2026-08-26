import { useState, type FormEvent } from 'react';
import { siteConfig } from '../site';
import type { UIStrings } from '../content';
import Section from './Section';

const EMPTY = { name: '', email: '', message: '' };
type Status = 'idle' | 'sending' | 'success' | 'error';

export default function Contact({ t }: { t: UIStrings }) {
  const [form, setForm] = useState(EMPTY);
  const [status, setStatus] = useState<Status>('idle');

  function update(field: keyof typeof EMPTY, value: string) {
    setForm((current) => ({ ...current, [field]: value }));
  }

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    setStatus('sending');

    try {
      const response = await fetch(`https://formspree.io/f/${siteConfig.formspreeId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          message: form.message,
          _subject: `Portfolio — ${form.name}`,
        }),
      });

      if (!response.ok) throw new Error(`Formspree: ${response.status}`);
      setForm(EMPTY);
      setStatus('success');
    } catch {
      setStatus('error');
    }
  }

  return (
    <Section id="contact" label={t.contact.title}>
      <p className="contact-lead">{t.contact.lead}</p>

      <form className="form" onSubmit={handleSubmit}>
        <label className="field">
          <span>{t.contact.name}</span>
          <input
            required
            type="text"
            autoComplete="name"
            placeholder={t.contact.namePlaceholder}
            value={form.name}
            onChange={(event) => update('name', event.target.value)}
          />
        </label>

        <label className="field">
          <span>{t.contact.email}</span>
          <input
            required
            type="email"
            autoComplete="email"
            placeholder={t.contact.emailPlaceholder}
            value={form.email}
            onChange={(event) => update('email', event.target.value)}
          />
        </label>

        <label className="field">
          <span>{t.contact.message}</span>
          <textarea
            required
            rows={5}
            placeholder={t.contact.messagePlaceholder}
            value={form.message}
            onChange={(event) => update('message', event.target.value)}
          />
        </label>

        <button className="button" type="submit" disabled={status === 'sending'}>
          {status === 'sending' ? t.contact.sending : t.contact.send}
        </button>

        <p className="form-status" role="status">
          {status === 'success' && t.contact.success}
          {status === 'error' && t.contact.error}
        </p>
      </form>

      <p className="contact-direct">
        <span>{t.contact.direct}</span>{' '}
        <a className="link" href={`mailto:${siteConfig.email}`}>
          {siteConfig.email}
        </a>{' '}
        <a className="link" href={siteConfig.linkedInUrl} target="_blank" rel="noreferrer">
          LinkedIn <span aria-hidden="true">↗</span>
        </a>
      </p>
    </Section>
  );
}
