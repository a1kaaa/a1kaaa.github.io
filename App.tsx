import { useEffect, useState } from 'react';
import { ui, type Lang } from './content';
import Header from './components/Header';
import Hero from './components/Hero';
import Work from './components/Work';
import Skills from './components/Skills';
import Path from './components/Path';
import Contact from './components/Contact';
import Footer from './components/Footer';

const STORAGE_KEY = 'qa-lang';

function initialLang(): Lang {
  try {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    if (saved === 'fr' || saved === 'en') return saved;
  } catch {
    // Private browsing or blocked storage: fall through to the browser locale.
  }
  return navigator.language.toLowerCase().startsWith('fr') ? 'fr' : 'en';
}

export default function App() {
  const [lang, setLang] = useState<Lang>(initialLang);
  const t = ui[lang];

  useEffect(() => {
    document.documentElement.lang = t.htmlLang;
    try {
      window.localStorage.setItem(STORAGE_KEY, lang);
    } catch {
      // Nothing to do: the choice simply won't survive a reload.
    }
  }, [lang, t.htmlLang]);

  return (
    <>
      <a className="skip-link" href="#main">
        {lang === 'fr' ? 'Aller au contenu' : 'Skip to content'}
      </a>
      <Header lang={lang} onLangChange={setLang} t={t} />
      <main id="main">
        <Hero t={t} />
        <Work lang={lang} t={t} />
        <Skills lang={lang} t={t} />
        <Path lang={lang} t={t} />
        <Contact t={t} />
      </main>
      <Footer t={t} />
    </>
  );
}
