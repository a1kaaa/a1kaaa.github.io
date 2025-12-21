(() => {
  const root = document.documentElement;
  const username = (root.dataset.githubUsername || "").trim();

  const year = document.getElementById("year");
  if (year) year.textContent = String(new Date().getFullYear());

  // Scroll reveal
  const revealEls = Array.from(document.querySelectorAll(".reveal"));
  const prefersReduced = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (!prefersReduced && "IntersectionObserver" in window) {
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.12 }
    );

    for (const el of revealEls) io.observe(el);
  } else {
    for (const el of revealEls) el.classList.add("is-visible");
  }

  const statusPill = document.getElementById("ghStatus");
  const projectsGrid = document.getElementById("projectsGrid");

  const statRepos = document.getElementById("statRepos");
  const statStars = document.getElementById("statStars");
  const statUpdated = document.getElementById("statUpdated");

  const setStatus = (text) => {
    if (!statusPill) return;
    statusPill.textContent = text;
  };

  const formatDate = (iso) => {
    if (!iso) return "—";
    const d = new Date(iso);
    if (Number.isNaN(d.getTime())) return "—";
    return new Intl.DateTimeFormat("fr-FR", { dateStyle: "medium" }).format(d);
  };

  const safeText = (value, fallback = "") => {
    if (typeof value === "string" && value.trim()) return value.trim();
    return fallback;
  };

  const createProjectCard = (repo) => {
    const card = document.createElement("a");
    card.className = "card";
    card.href = repo.html_url;
    card.target = "_blank";
    card.rel = "noreferrer";

    const titleRow = document.createElement("div");
    titleRow.className = "card__title";

    const title = document.createElement("h3");
    title.textContent = safeText(repo.name, "Projet");

    const badge = document.createElement("span");
    badge.className = "badge";
    badge.textContent = safeText(repo.language, "Repo");

    titleRow.append(title, badge);

    const desc = document.createElement("p");
    desc.textContent = safeText(repo.description, "Pas de description.");

    const meta = document.createElement("div");
    meta.className = "card__meta";

    const stars = document.createElement("span");
    stars.className = "meta";
    stars.textContent = `★ ${repo.stargazers_count ?? 0}`;

    const updated = document.createElement("span");
    updated.className = "meta";
    updated.textContent = `MAJ ${formatDate(repo.pushed_at)}`;

    meta.append(stars, updated);

    card.append(titleRow, desc, meta);
    return card;
  };

  const renderProjects = (repos) => {
    if (!projectsGrid) return;
    projectsGrid.innerHTML = "";

    if (!repos.length) {
      const empty = document.createElement("div");
      empty.className = "card";
      empty.setAttribute("role", "status");
      empty.innerHTML = "<div class=\"card__title\"><h3>Aucun projet trouvé</h3><span class=\"badge\">GitHub</span></div><p>Vérifie ton username ou ajoute des repos publics.</p>";
      projectsGrid.append(empty);
      return;
    }

    for (const repo of repos) projectsGrid.append(createProjectCard(repo));
  };

  const renderFallback = () => {
    setStatus("Mode démo (pas de GitHub)");

    const demo = [
      {
        name: "Projet Démo",
        description: "Remplace ce repo par tes vrais projets (API GitHub).",
        language: "JavaScript",
        stargazers_count: 0,
        pushed_at: new Date().toISOString(),
        html_url: "https://github.com/",
      },
      {
        name: "Landing Page",
        description: "Une page responsive avec animations (exemple).",
        language: "HTML/CSS",
        stargazers_count: 0,
        pushed_at: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7).toISOString(),
        html_url: "https://github.com/",
      },
      {
        name: "API & CRUD",
        description: "Une app CRUD connectée à une API (exemple).",
        language: "Node",
        stargazers_count: 0,
        pushed_at: new Date(Date.now() - 1000 * 60 * 60 * 24 * 18).toISOString(),
        html_url: "https://github.com/",
      },
    ];

    renderProjects(demo);
    if (statRepos) statRepos.textContent = "—";
    if (statStars) statStars.textContent = "—";
    if (statUpdated) statUpdated.textContent = "—";
  };

  const fetchJson = async (url) => {
    const res = await fetch(url, {
      headers: {
        Accept: "application/vnd.github+json",
      },
    });

    if (!res.ok) {
      const txt = await res.text().catch(() => "");
      throw new Error(`HTTP ${res.status} ${res.statusText}${txt ? ` — ${txt}` : ""}`);
    }

    return res.json();
  };

  const loadGithub = async () => {
    if (!username || username === "ton-username-github") {
      renderFallback();
      return;
    }

    setStatus("Chargement GitHub…");

    try {
      const [user, repos] = await Promise.all([
        fetchJson(`https://api.github.com/users/${encodeURIComponent(username)}`),
        fetchJson(`https://api.github.com/users/${encodeURIComponent(username)}/repos?per_page=100&sort=pushed`),
      ]);

      const filtered = (Array.isArray(repos) ? repos : [])
        .filter((r) => r && !r.fork && !r.archived)
        .slice(0, 9);

      renderProjects(filtered);
      setStatus(`GitHub: ${username}`);

      if (statRepos) statRepos.textContent = String(user.public_repos ?? "—");

      const totalStars = filtered.reduce((acc, r) => acc + (Number(r.stargazers_count) || 0), 0);
      if (statStars) statStars.textContent = String(totalStars);

      const latest = filtered[0]?.pushed_at;
      if (statUpdated) statUpdated.textContent = formatDate(latest);
    } catch (err) {
      console.error(err);
      setStatus("Erreur GitHub (mode démo)");
      renderFallback();
    }
  };

  void loadGithub();
})();
