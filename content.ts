export type Lang = 'fr' | 'en';

/** A value that exists in both languages. */
export type Bilingual = Record<Lang, string>;

export interface Project {
  name: string;
  url: string;
  tech: string;
  year: string;
  desc: Bilingual;
}

export interface SkillGroup {
  title: Bilingual;
  items: string[];
  /** Optional aside, e.g. something being learned rather than practised. */
  note?: Bilingual;
}

export interface PathEntry {
  period: string;
  place: string;
  title: Bilingual;
  detail: Bilingual;
}

/**
 * Hand-picked, newest first. Kept in the source rather than pulled from the
 * GitHub API so the list stays a selection instead of a dump of every repo.
 */
export const projects: Project[] = [
  {
    name: 'mini-shell',
    url: 'https://github.com/a1kaaa/Mini-shell',
    tech: 'C',
    year: '2025',
    desc: {
      fr: 'Un shell POSIX réduit à l’essentiel : lecture de la ligne, fork/exec, redirections et enchaînement de commandes.',
      en: 'A POSIX shell cut back to essentials: line parsing, fork/exec, redirections and command chaining.',
    },
  },
  {
    name: 'FTP_Projet',
    url: 'https://github.com/a1kaaa/FTP_Projet',
    tech: 'C',
    year: '2025',
    desc: {
      fr: 'Client et serveur FTP écrits pour le cours de systèmes et réseaux : sockets, gestion des sessions, transfert de fichiers.',
      en: 'FTP client and server written for the systems and networks course: sockets, session handling, file transfer.',
    },
  },
  {
    name: 'LibraryManagement',
    url: 'https://github.com/a1kaaa/LibraryManagement',
    tech: 'Java · Spring Boot',
    year: '2025',
    desc: {
      fr: 'Une API de gestion de bibliothèque : livres, adhérents et emprunts, avec une couche de persistance relationnelle.',
      en: 'A library management API: books, members and loans, backed by a relational persistence layer.',
    },
  },
  {
    name: 'LALR(1)-parsing',
    url: 'https://github.com/a1kaaa/LALR-1-Parsing-of-Two-Specific-Grammars-and-a-Proof-of-Determinism',
    tech: 'Théorie des langages',
    year: '2024',
    desc: {
      fr: 'Analyse LALR(1) de deux grammaires, tables de transition construites à la main et preuve de déterminisme.',
      en: 'LALR(1) analysis of two grammars, transition tables built by hand, and a proof of determinism.',
    },
  },
  {
    name: 'huffman',
    url: 'https://github.com/a1kaaa/Huffman-Encoder-Decoder-Algorithms',
    tech: 'Algorithmique',
    year: '2024',
    desc: {
      fr: 'Compression et décompression par codage de Huffman : construction de l’arbre, table de codes, encodage binaire.',
      en: 'Huffman coding, both ways: tree construction, code table, binary encoding.',
    },
  },
  {
    name: 'todo-discord-bot',
    url: 'https://github.com/a1kaaa/TODO-Discord-Bot',
    tech: 'Python',
    year: '2024',
    desc: {
      fr: 'Un bot qui relit un salon Discord chaque soir et relance le groupe tant que personne n’a confirmé sa tâche.',
      en: 'A bot that reads a Discord channel every evening and keeps pinging the group until someone confirms the task.',
    },
  },
];

export const skillGroups: SkillGroup[] = [
  {
    title: { fr: 'Langages', en: 'Languages' },
    items: ['C', 'Java', 'Python', 'OCaml', 'Bash', 'SQL', 'TypeScript', 'ARM'],
    note: { fr: 'En cours d’apprentissage : Julia', en: 'Currently learning: Julia' },
  },
  {
    title: { fr: 'Systèmes & réseaux', en: 'Systems & networks' },
    items: ['Linux', 'Windows', 'Sockets', 'Ligne de commande', 'Git'],
  },
  {
    title: { fr: 'Web & données', en: 'Web & data' },
    items: ['Spring Boot', 'React', 'HTML', 'CSS', 'Bases relationnelles'],
  },
  {
    title: { fr: 'Écrit & outillage', en: 'Writing & tooling' },
    items: ['LaTeX', 'Markdown', 'Documentation', 'ServiceNow', 'KFinder'],
  },
];

export const path: PathEntry[] = [
  {
    period: '2026 —',
    place: 'HELPLINE · Marcq-en-Barœul',
    title: { fr: 'Technicien support N1', en: 'N1 IT helpdesk technician' },
    detail: {
      fr: 'Traitement des tickets du groupe ADEO sous ServiceNow. Diagnostic, reformulation du besoin et suivi jusqu’à la résolution.',
      en: 'Handling ADEO Group tickets in ServiceNow. Diagnosis, restating the user’s problem, and follow-up through to resolution.',
    },
  },
  {
    period: '2022 — 2026',
    place: 'Université Grenoble Alpes',
    title: { fr: 'Licence informatique', en: 'BSc in Computer Science' },
    detail: {
      fr: 'Algorithmique, programmation, bases de données, systèmes, réseaux, architecture logicielle et matérielle.',
      en: 'Algorithms, programming, databases, systems, networks, software and hardware architecture.',
    },
  },
  {
    period: '2024 — 2026',
    place: 'Intermarché · Buffalo Grill',
    title: { fr: 'Emplois étudiants', en: 'Student jobs' },
    detail: {
      fr: 'Caisse, gestion des stocks et service. Trois ans à financer mes études en apprenant à tenir un poste face au public.',
      en: 'Checkout, stock management and table service. Three years funding my studies while learning to hold a customer-facing job.',
    },
  },
  {
    period: '2020 —',
    place: 'E-sport',
    title: { fr: 'Coaching et guides techniques', en: 'Coaching and technical guides' },
    detail: {
      fr: 'Coaching d’équipes Valorant et rédaction de trois guides en LaTeX sur l’entraînement à la visée.',
      en: 'Coaching Valorant teams and writing three LaTeX guides on aim training.',
    },
  },
];

export interface UIStrings {
  htmlLang: string;
  cv: string;
  hero: {
    role: string;
    pitch: string;
    contact: string;
    github: string;
  };
  meta: Array<{ label: string; value: string }>;
  work: { title: string; all: string };
  skills: { title: string };
  path: { title: string };
  contact: {
    title: string;
    lead: string;
    name: string;
    namePlaceholder: string;
    email: string;
    emailPlaceholder: string;
    message: string;
    messagePlaceholder: string;
    send: string;
    sending: string;
    success: string;
    error: string;
    direct: string;
  };
  footer: { built: string };
  langSwitch: string;
}

export const ui: Record<Lang, UIStrings> = {
  fr: {
    htmlLang: 'fr',
    cv: 'CV',
    hero: {
      role: 'Développeur junior',
      pitch:
        'Diplômé d’une licence d’informatique, je travaille aujourd’hui au support IT et je cherche un poste de développeur. J’écris surtout du C, du Java et du Python, je suis à l’aise sous Linux, et la sécurité est la direction vers laquelle je continue d’apprendre.',
      contact: 'Me contacter',
      github: 'GitHub',
    },
    meta: [
      { label: 'Recherche', value: 'Poste de développeur' },
      { label: 'Statut', value: 'En poste, ouvert aux opportunités' },
      { label: 'Base', value: 'Lille · ouvert au télétravail' },
      { label: 'Langues', value: 'FR natif · EN C1 · ES B1' },
    ],
    work: { title: 'Projets', all: 'Tous les dépôts' },
    skills: { title: 'Compétences' },
    path: { title: 'Parcours' },
    contact: {
      title: 'Contact',
      lead: 'Un poste à me proposer, une question sur un projet, ou simplement l’envie d’échanger : écrivez-moi.',
      name: 'Nom',
      namePlaceholder: 'Votre nom',
      email: 'Email',
      emailPlaceholder: 'vous@entreprise.fr',
      message: 'Message',
      messagePlaceholder: 'Le poste, l’équipe, ce que vous cherchez.',
      send: 'Envoyer',
      sending: 'Envoi…',
      success: 'Message envoyé. Je réponds sous quelques jours.',
      error: 'L’envoi a échoué. Écrivez-moi directement par email.',
      direct: 'Ou directement :',
    },
    footer: { built: 'Construit en React et TypeScript. Code du site sur GitHub.' },
    langSwitch: 'Read in English',
  },
  en: {
    htmlLang: 'en',
    cv: 'CV',
    hero: {
      role: 'Junior developer',
      pitch:
        'Computer science graduate, currently working on an IT helpdesk and looking for a developer role. I mostly write C, Java and Python, I am comfortable on Linux, and security is the direction I keep learning towards.',
      contact: 'Get in touch',
      github: 'GitHub',
    },
    meta: [
      { label: 'Looking for', value: 'A developer role' },
      { label: 'Status', value: 'Employed, open to offers' },
      { label: 'Based in', value: 'Lille, France · open to remote' },
      { label: 'Languages', value: 'FR native · EN C1 · ES B1' },
    ],
    work: { title: 'Work', all: 'All repositories' },
    skills: { title: 'Skills' },
    path: { title: 'Path' },
    contact: {
      title: 'Contact',
      lead: 'A role to offer, a question about a project, or just a conversation: write to me.',
      name: 'Name',
      namePlaceholder: 'Your name',
      email: 'Email',
      emailPlaceholder: 'you@company.com',
      message: 'Message',
      messagePlaceholder: 'The role, the team, what you are looking for.',
      send: 'Send',
      sending: 'Sending…',
      success: 'Message sent. I reply within a few days.',
      error: 'Sending failed. Email me directly instead.',
      direct: 'Or directly:',
    },
    footer: { built: 'Built with React and TypeScript. Source on GitHub.' },
    langSwitch: 'Lire en français',
  },
};
