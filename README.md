# Portfolio — Quentin Angeretti

Page unique, bilingue FR/EN, sans dépendance au-delà de React.
En ligne : <https://a1kaaa.github.io>

## Commandes

```bash
npm install
npm run dev      # serveur de développement
npm run check    # typage seul
npm run build    # typage + bundle dans dist/
npm run preview  # sert dist/ localement
```

## Structure

| Fichier | Rôle |
| --- | --- |
| `content.ts` | Tout le contenu éditorial, en français et en anglais. **C'est le seul fichier à modifier pour mettre le site à jour.** |
| `site.ts` | Liens et coordonnées : email, GitHub, LinkedIn, CV, identifiant Formspree. |
| `App.tsx` | Choix de la langue (mémorisé dans `localStorage`) et assemblage des sections. |
| `components/` | Une section par fichier : `Header`, `Hero`, `Work`, `Skills`, `Path`, `Contact`, `Footer`. `Section.tsx` fournit la mise en page commune. |
| `styles/globals.css` | Feuille de style unique. Les couleurs sont des variables sous `:root`, avec un bloc `prefers-color-scheme: dark`. |
| `public/` | Le CV au format PDF. |

## Mettre à jour

- **Ajouter un projet** : une entrée dans le tableau `projects` de `content.ts`, avec une description `fr` et `en`. TypeScript refuse la compilation s'il en manque une.
- **Changer un texte d'interface** : `ui.fr` et `ui.en` dans `content.ts`. Les deux objets partagent l'interface `UIStrings`, donc toute clé oubliée est signalée à la compilation.
- **Remplacer le CV** : écraser `public/Quentin_Angeretti_CV.pdf`.

## Déploiement

Chaque push sur `main` déclenche `.github/workflows/deploy.yml`, qui construit le site et le publie sur GitHub Pages.
