
"use strict";

(() => {
  'use strict';

  // ═══════════════════════════════════════════════════════════════════════════
  // CONFIGURATION
  // ═══════════════════════════════════════════════════════════════════════════

  const root = document.documentElement;
  const username = (root.dataset.githubUsername || '').trim();
  const prefersReduced = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

  // ═══════════════════════════════════════════════════════════════════════════
  // SCROLL REVEAL WITH STAGGER
  // ═══════════════════════════════════════════════════════════════════════════

  const revealElements = document.querySelectorAll('.reveal');

  if (!prefersReduced && 'IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, index) => {
          if (entry.isIntersecting) {
            // Add staggered delay
            setTimeout(() => {
              entry.target.classList.add('is-visible');
            }, index * 100);
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    revealElements.forEach(el => revealObserver.observe(el));
  } else {
    revealElements.forEach(el => el.classList.add('is-visible'));
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // ANIMATED COUNTER
  // ═══════════════════════════════════════════════════════════════════════════

  const animateCounter = (element, target, duration = 2000) => {
    if (prefersReduced) {
      element.textContent = target;
      return;
    }

    const start = 0;
    const startTime = performance.now();

    const updateCounter = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Easing function (ease-out-expo)
      const easeOutExpo = 1 - Math.pow(2, -10 * progress);
      const current = Math.floor(start + (target - start) * easeOutExpo);

      element.textContent = current;

      if (progress < 1) {
        requestAnimationFrame(updateCounter);
      } else {
        element.textContent = target;
      }
    };

    requestAnimationFrame(updateCounter);
  };

  // ═══════════════════════════════════════════════════════════════════════════
  // PARALLAX EFFECT ON SHAPES
  // ═══════════════════════════════════════════════════════════════════════════

  const shapes = document.querySelectorAll('.shape');

  if (!prefersReduced && shapes.length > 0) {
    let ticking = false;

    window.addEventListener('scroll', () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const scrollY = window.scrollY;

          shapes.forEach((shape, index) => {
            const speed = (index + 1) * 0.05;
            const yPos = scrollY * speed;
            shape.style.transform = `translateY(${yPos}px)`;
          });

          ticking = false;
        });
        ticking = true;
      }
    });
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // MAGNETIC BUTTONS
  // ═══════════════════════════════════════════════════════════════════════════

  const magneticButtons = document.querySelectorAll('.btn--primary, .btn--neon');

  if (!prefersReduced) {
    magneticButtons.forEach(btn => {
      btn.addEventListener('mousemove', (e) => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;

        btn.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
      });

      btn.addEventListener('mouseleave', () => {
        btn.style.transform = 'translate(0, 0)';
      });
    });
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // HEADER SCROLL EFFECT
  // ═══════════════════════════════════════════════════════════════════════════

  const header = document.querySelector('.header');

  if (header) {
    let lastScrollY = 0;

    window.addEventListener('scroll', () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > 100) {
        header.style.background = 'rgba(5, 5, 8, 0.98)';
        header.style.borderBottomColor = 'rgba(255, 0, 170, 0.3)';
      } else {
        header.style.background = 'rgba(5, 5, 8, 0.9)';
        header.style.borderBottomColor = 'rgba(255, 255, 255, 0.1)';
      }

      // Hide/show on scroll direction
      if (!prefersReduced) {
        if (currentScrollY > lastScrollY && currentScrollY > 200) {
          header.style.transform = 'translateY(-100%)';
        } else {
          header.style.transform = 'translateY(0)';
        }
      }

      lastScrollY = currentScrollY;
    });
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // YEAR IN FOOTER
  // ═══════════════════════════════════════════════════════════════════════════

  const yearElement = document.getElementById('year');
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // GITHUB INTEGRATION
  // ═══════════════════════════════════════════════════════════════════════════

  const statusPill = document.getElementById('ghStatus');
  const projectsGrid = document.getElementById('projectsGrid');
  const statRepos = document.getElementById('statRepos');
  const statStars = document.getElementById('statStars');
  const statUpdated = document.getElementById('statUpdated');

  const setStatus = (text) => {
    if (!statusPill) return;
    const pillText = statusPill.querySelector('.pill__text');
    if (pillText) {
      pillText.textContent = text;
    } else {
      statusPill.textContent = text;
    }
  };

  const formatDate = (iso) => {
    if (!iso) return '—';
    const d = new Date(iso);
    if (Number.isNaN(d.getTime())) return '—';
    return new Intl.DateTimeFormat('fr-FR', { dateStyle: 'medium' }).format(d);
  };

  const safeText = (value, fallback = '') => {
    if (typeof value === 'string' && value.trim()) return value.trim();
    return fallback;
  };

  const createProjectCard = (repo, index) => {
    const card = document.createElement('a');
    card.className = 'card';
    card.href = repo.html_url;
    card.target = '_blank';
    card.rel = 'noreferrer';

    // Add stagger animation delay
    if (!prefersReduced) {
      card.style.opacity = '0';
      card.style.transform = 'translateY(30px)';
      setTimeout(() => {
        card.style.transition = 'all 0.5s cubic-bezier(0.2, 0.8, 0.2, 1)';
        card.style.opacity = '1';
        card.style.transform = 'translateY(0)';
      }, index * 100);
    }

    const titleRow = document.createElement('div');
    titleRow.className = 'card__title';

    const title = document.createElement('h3');
    title.textContent = safeText(repo.name, 'Projet');

    const badge = document.createElement('span');
    badge.className = 'badge';
    badge.textContent = safeText(repo.language, 'Repo');

    titleRow.append(title, badge);

    const desc = document.createElement('p');
    desc.textContent = safeText(repo.description, 'Pas de description.');

    const meta = document.createElement('div');
    meta.className = 'card__meta';

    const stars = document.createElement('span');
    stars.className = 'meta';
    stars.innerHTML = `<span style="color: #ffd700;">★</span> ${repo.stargazers_count ?? 0}`;

    const updated = document.createElement('span');
    updated.className = 'meta';
    updated.textContent = `${formatDate(repo.pushed_at)}`;

    meta.append(stars, updated);

    card.append(titleRow, desc, meta);

    // Add mouse tracking for glow effect
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);
    });

    return card;
  };

  const renderProjects = (repos) => {
    if (!projectsGrid) return;
    projectsGrid.innerHTML = '';

    if (!repos.length) {
      const empty = document.createElement('div');
      empty.className = 'card';
      empty.setAttribute('role', 'status');
      empty.innerHTML = `
        <div class="card__title">
          <h3>Aucun projet trouvé</h3>
          <span class="badge">GitHub</span>
        </div>
        <p>Vérifie ton username ou ajoute des repos publics.</p>
      `;
      projectsGrid.append(empty);
      return;
    }

    repos.forEach((repo, index) => {
      projectsGrid.append(createProjectCard(repo, index));
    });
  };

  const renderFallback = () => {
    setStatus('Mode démo');

    const demo = [
      {
        name: 'Projet Démo',
        description: 'Remplace ce repo par tes vrais projets (API GitHub).',
        language: 'JavaScript',
        stargazers_count: 0,
        pushed_at: new Date().toISOString(),
        html_url: 'https://github.com/',
      },
      {
        name: 'Landing Page',
        description: 'Une page responsive avec animations (exemple).',
        language: 'HTML/CSS',
        stargazers_count: 0,
        pushed_at: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7).toISOString(),
        html_url: 'https://github.com/',
      },
      {
        name: 'API & CRUD',
        description: 'Une app CRUD connectée à une API (exemple).',
        language: 'Node',
        stargazers_count: 0,
        pushed_at: new Date(Date.now() - 1000 * 60 * 60 * 24 * 18).toISOString(),
        html_url: 'https://github.com/',
      },
    ];

    renderProjects(demo);
    if (statRepos) statRepos.textContent = '—';
    if (statStars) statStars.textContent = '—';
    if (statUpdated) statUpdated.textContent = '—';
  };

  const fetchJson = async (url) => {
    const res = await fetch(url, {
      headers: {
        Accept: 'application/vnd.github+json',
      },
    });

    if (!res.ok) {
      const txt = await res.text().catch(() => '');
      throw new Error(`HTTP ${res.status} ${res.statusText}${txt ? ` — ${txt}` : ''}`);
    }

    return res.json();
  };

  const loadGithub = async () => {
    if (!username || username === 'ton-username-github') {
      renderFallback();
      return;
    }

    setStatus('Chargement...');

    try {
      const [user, repos] = await Promise.all([
        fetchJson(`https://api.github.com/users/${encodeURIComponent(username)}`),
        fetchJson(`https://api.github.com/users/${encodeURIComponent(username)}/repos?per_page=100&sort=pushed`),
      ]);

      const filtered = (Array.isArray(repos) ? repos : [])
        .filter((r) => r && !r.fork && !r.archived)
        .slice(0, 9);

      renderProjects(filtered);
      setStatus(`${username}`);

      // Animated counters
      if (statRepos) {
        const repoCount = user.public_repos ?? 0;
        animateCounter(statRepos, repoCount);
      }

      const totalStars = filtered.reduce((acc, r) => acc + (Number(r.stargazers_count) || 0), 0);
      if (statStars) {
        animateCounter(statStars, totalStars);
      }

      const latest = filtered[0]?.pushed_at;
      if (statUpdated) statUpdated.textContent = formatDate(latest);

    } catch (err) {
      console.error(err);
      setStatus('Erreur GitHub');
      renderFallback();
    }
  };

  // ═══════════════════════════════════════════════════════════════════════════
  // GLITCH EFFECT ON TITLE HOVER
  // ═══════════════════════════════════════════════════════════════════════════

  const heroTitle = document.querySelector('.hero__title');

  if (heroTitle && !prefersReduced) {
    heroTitle.addEventListener('mouseenter', () => {
      heroTitle.classList.add('glitching');

      // Random glitch effect
      let glitchCount = 0;
      const maxGlitches = 5;

      const glitchInterval = setInterval(() => {
        if (glitchCount >= maxGlitches) {
          clearInterval(glitchInterval);
          heroTitle.classList.remove('glitching');
          return;
        }

        const lines = heroTitle.querySelectorAll('.title__line');
        lines.forEach(line => {
          const randomX = (Math.random() - 0.5) * 10;
          const randomY = (Math.random() - 0.5) * 5;
          line.style.transform = `translate(${randomX}px, ${randomY}px)`;

          setTimeout(() => {
            line.style.transform = 'translate(0, 0)';
          }, 50);
        });

        glitchCount++;
      }, 100);
    });
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // SMOOTH SCROLL FOR ANCHOR LINKS
  // ═══════════════════════════════════════════════════════════════════════════

  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const href = anchor.getAttribute('href');
      if (href === '#' || href === '#top') {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: prefersReduced ? 'auto' : 'smooth' });
        return;
      }

      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        const headerHeight = header?.offsetHeight || 0;
        const targetPosition = target.getBoundingClientRect().top + window.scrollY - headerHeight - 20;

        window.scrollTo({
          top: targetPosition,
          behavior: prefersReduced ? 'auto' : 'smooth'
        });
      }
    });
  });

  // ═══════════════════════════════════════════════════════════════════════════
  // TILT EFFECT ON CARDS
  // ═══════════════════════════════════════════════════════════════════════════

  const tiltCards = document.querySelectorAll('.about__card, .stat');

  if (!prefersReduced) {
    tiltCards.forEach(card => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = (y - centerY) / 20;
        const rotateY = (centerX - x) / 20;

        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;
      });

      card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
      });
    });
  }

  const typeWriter = (element, text, speed = 50) => {
    if (prefersReduced) {
      element.innerHTML = text;
      return;
    }

    let i = 0;
    element.innerHTML = '';

    const type = () => {
      if (i < text.length) {
        if (text.charAt(i) === '<') {
          const tagEnd = text.indexOf('>', i);
          if (tagEnd !== -1) {
            element.innerHTML += text.substring(i, tagEnd + 1);
            i = tagEnd + 1;
          }
        } else {
          element.innerHTML += text.charAt(i);
          i++;
        }
        setTimeout(type, speed);
      }
    };

    type();
  };

  // ═══════════════════════════════════════════════════════════════════════════
  // RANDOM GLITCHES
  // ═══════════════════════════════════════════════════════════════════════════

  if (!prefersReduced) {
    const glitchElements = document.querySelectorAll('.glitch-text');

    const triggerRandomGlitch = () => {
      const randomElement = glitchElements[Math.floor(Math.random() * glitchElements.length)];
      if (randomElement) {
        randomElement.classList.add('auto-glitch');
        setTimeout(() => {
          randomElement.classList.remove('auto-glitch');
        }, 300);
      }

      // Schedule next glitch (random interval between 5-15 seconds)
      setTimeout(triggerRandomGlitch, 5000 + Math.random() * 10000);
    };

    // Start random glitches after 3 seconds
    setTimeout(triggerRandomGlitch, 3000);
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // INIT
  // ═══════════════════════════════════════════════════════════════════════════

  void loadGithub();

  // Add loaded class to body for potential animations
  document.body.classList.add('loaded');

  console.log('%c HYPERPOP PORTFOLIO ', 'background: linear-gradient(135deg, #540863, #C2E2FA); color: white; padding: 10px 20px; font-size: 16px; font-weight: bold; border-radius: 4px;');
  console.log('%c Made with passion ', 'color: #C2E2FA; font-size: 12px;');

})();
