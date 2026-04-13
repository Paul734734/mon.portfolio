/**
 * PORTFOLIO — ETOUKE PAUL JOVANI
 * main.js — v3.0 Supabase Edition
 *
 * Changement vs v2.0 :
 *  - Section 9 (Contact Form) utilise Supabase JS au lieu de contact.php
 *  - contact.php n'est plus nécessaire
 */

'use strict';

/* ============================================================
   1. PARTICLES BACKGROUND
   ============================================================ */
(function initParticles() {
  const canvas = document.getElementById('particles');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let w, h, dots = [];

  function resize() {
    w = canvas.width  = window.innerWidth;
    h = canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  const COUNT = Math.min(60, Math.floor(window.innerWidth / 20));
  const COLOR = '56, 189, 248';

  function randomDot() {
    return {
      x: Math.random() * w,
      y: Math.random() * h,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      r: Math.random() * 1.5 + 0.5,
      alpha: Math.random() * 0.4 + 0.1
    };
  }

  for (let i = 0; i < COUNT; i++) dots.push(randomDot());

  function drawDots() {
    ctx.clearRect(0, 0, w, h);
    dots.forEach(d => {
      d.x += d.vx; d.y += d.vy;
      if (d.x < 0) d.x = w; if (d.x > w) d.x = 0;
      if (d.y < 0) d.y = h; if (d.y > h) d.y = 0;

      ctx.beginPath();
      ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${COLOR}, ${d.alpha})`;
      ctx.fill();
    });

    for (let i = 0; i < dots.length; i++) {
      for (let j = i + 1; j < dots.length; j++) {
        const dx = dots[i].x - dots[j].x;
        const dy = dots[i].y - dots[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 140) {
          ctx.beginPath();
          ctx.moveTo(dots[i].x, dots[i].y);
          ctx.lineTo(dots[j].x, dots[j].y);
          ctx.strokeStyle = `rgba(${COLOR}, ${0.08 * (1 - dist / 140)})`;
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      }
    }
    requestAnimationFrame(drawDots);
  }
  drawDots();
})();


/* ============================================================
   2. HEADER SCROLL BEHAVIOR
   ============================================================ */
(function initHeader() {
  const header = document.getElementById('header');
  if (!header) return;

  window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 30);
  }, { passive: true });
})();


/* ============================================================
   3. NAVIGATION — Active link + mobile toggle
   ============================================================ */
(function initNavigation() {
  const navToggle = document.getElementById('navToggle');
  const navList   = document.getElementById('navList');
  const navLinks  = document.querySelectorAll('.nav-link[href^="#"]');
  const sections  = document.querySelectorAll('section[id]');

  if (navToggle && navList) {
    navToggle.addEventListener('click', () => {
      const isOpen = navList.classList.toggle('open');
      navToggle.classList.toggle('open', isOpen);
      navToggle.setAttribute('aria-expanded', isOpen);
    });

    navList.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navList.classList.remove('open');
        navToggle.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });

    document.addEventListener('click', (e) => {
      if (!navList.contains(e.target) && !navToggle.contains(e.target)) {
        navList.classList.remove('open');
        navToggle.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
        });
      }
    });
  }, { threshold: 0.3, rootMargin: '-60px 0px -60px 0px' });

  sections.forEach(s => observer.observe(s));
})();


/* ============================================================
   4. TYPED TEXT ANIMATION
   ============================================================ */
(function initTypedText() {
  const el = document.getElementById('typedText');
  if (!el) return;

  const phrases = [
    'Aspiring Cybersecurity Engineer',
    'Community Manager Freelance',
    'DevSecOps Enthusiast',
    'Python & Web Developer'
  ];
  let phraseIndex = 0, charIndex = 0, isDeleting = false, pause = false;

  function type() {
    if (pause) return;
    const current = phrases[phraseIndex];

    if (!isDeleting) {
      charIndex++;
      el.textContent = current.slice(0, charIndex);
      if (charIndex === current.length) {
        pause = true;
        setTimeout(() => { isDeleting = true; pause = false; type(); }, 2000);
        return;
      }
    } else {
      charIndex--;
      el.textContent = current.slice(0, charIndex);
      if (charIndex === 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
      }
    }
    setTimeout(type, isDeleting ? 45 : 70);
  }
  setTimeout(type, 800);
})();


/* ============================================================
   5. SCROLL ANIMATIONS (IntersectionObserver)
   ============================================================ */
(function initScrollAnimations() {
  const animatedEls = document.querySelectorAll('[data-animate]');
  if (!animatedEls.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const delay = entry.target.dataset.delay || 0;
        setTimeout(() => entry.target.classList.add('visible'), parseInt(delay));
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  animatedEls.forEach(el => observer.observe(el));
})();


/* ============================================================
   6. ANIMATED COUNTERS
   ============================================================ */
(function initCounters() {
  const counters = document.querySelectorAll('.stat-num[data-count]');
  if (!counters.length) return;

  function animateCounter(el, target) {
    const duration = 1600;
    const startTime = performance.now();
    function step(now) {
      const progress = Math.min((now - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.round(eased * target);
      if (progress < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target, parseInt(entry.target.dataset.count));
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(c => observer.observe(c));
})();


/* ============================================================
   7. SKILL BAR ANIMATIONS
   ============================================================ */
(function initSkillBars() {
  const fills = document.querySelectorAll('.skill-bar-fill');
  if (!fills.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const fill = entry.target;
        if (fill.dataset.color) {
          fill.style.background = `linear-gradient(90deg, ${fill.dataset.color}cc, ${fill.dataset.color})`;
        }
        setTimeout(() => { fill.style.width = `${fill.dataset.width}%`; }, 200);
        observer.unobserve(fill);
      }
    });
  }, { threshold: 0.3 });

  fills.forEach(f => observer.observe(f));
})();


/* ============================================================
   8. PROJECT FILTER
   ============================================================ */
(function initProjectFilter() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const cards      = document.querySelectorAll('.card-project[data-category]');
  if (!filterBtns.length) return;

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.dataset.filter;

      cards.forEach(card => {
        const show = filter === 'all' || card.dataset.category === filter;
        card.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
        if (show) {
          card.style.opacity = '1';
          card.style.transform = 'scale(1)';
          card.classList.remove('hidden');
        } else {
          card.style.opacity = '0';
          card.style.transform = 'scale(0.95)';
          setTimeout(() => card.classList.add('hidden'), 300);
        }
      });
    });
  });
})();


/* ============================================================
   9. CONTACT FORM - Validation + EmailJS
   â  contact.php et Supabase ne sont plus utilisés ici.
       Les messages sont envoyés directement par EmailJS.
   ============================================================ */

// Rate limiting anti-spam
function checkRateLimit() {
  const key = 'contact_attempts';
  const now = Date.now();
  let data = [];
  try { data = JSON.parse(localStorage.getItem(key) || '[]'); } catch(e) { data = []; }
  const recent = data.filter(t => now - t < 3600000);
  if (recent.length >= 3) return false;
  recent.push(now);
  try { localStorage.setItem(key, JSON.stringify(recent)); } catch(e) {}
  return true;
}

(function initContactForm() {
  const form      = document.getElementById('contactForm');
  const statusEl  = document.getElementById('formStatus');
  const btnText   = document.getElementById('btnText');
  const btnLoader = document.getElementById('btnLoader');
  const submitBtn = document.getElementById('submitBtn');
  if (!form) return;

  function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
  }

  function setError(field, msg) {
    const errorEl = form.querySelector(`[data-error-for="${field}"]`);
    const input   = form.querySelector(`#${field}`);
    if (errorEl) errorEl.textContent = msg;
    if (input)   input.setAttribute('aria-invalid', !!msg);
  }

  function clearErrors() {
    form.querySelectorAll('.error').forEach(el => el.textContent = '');
    form.querySelectorAll('[aria-invalid]').forEach(el => el.removeAttribute('aria-invalid'));
  }

  function validate() {
    clearErrors();
    let valid = true;
    const name    = form.querySelector('#name').value.trim();
    const email   = form.querySelector('#email').value.trim();
    const message = form.querySelector('#message').value.trim();

    if (!name || name.length < 2) {
      setError('name', 'Veuillez entrer votre nom (min. 2 caract\u00e8res).'); valid = false;
    }
    if (!email || !isValidEmail(email)) {
      setError('email', 'Adresse email invalide.'); valid = false;
    }
    if (!message || message.length < 10) {
      setError('message', 'Le message doit contenir au moins 10 caract\u00e8res.'); valid = false;
    }
    return valid;
  }

  ['name', 'email', 'message'].forEach(id => {
    const input = form.querySelector(`#${id}`);
    if (input) input.addEventListener('blur', () => {
      if (input.value.trim().length > 0) validate();
    });
  });

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    // Rate limiting anti-spam
    if (!checkRateLimit()) {
      statusEl.textContent = '\u26a0\ufe0f Trop de tentatives. RÃ©essayez dans 1 heure ou Ã©crivez Ã  pauljovani15@gmail.com';
      statusEl.classList.add('error-msg');
      return;
    }
    
    if (!validate()) return;

    submitBtn.disabled = true;
    if (btnText)   btnText.style.display   = 'none';
    if (btnLoader) btnLoader.style.display = 'inline';
    statusEl.textContent = '';
    statusEl.className   = 'form-status';

    const templateParams = {
      from_name:  form.querySelector('#name').value.trim(),
      from_email: form.querySelector('#email').value.trim(),
      subject:    form.querySelector('#subject')?.value || 'autre',
      message:    form.querySelector('#message').value.trim(),
      to_email:   'pauljovani15@gmail.com'
    };

    try {
      // 1ï¸â£ Envoi email via EmailJS
      await emailjs.send('service_dloo29d', 'template_b2c85vd', templateParams);

      // 2ï¸â£ Archivage dans Supabase
      const { error } = await supabaseClient
        .from('messages')
        .insert([{
          name:    templateParams.from_name,
          email:   templateParams.from_email,
          subject: templateParams.subject,
          message: templateParams.message
        }]);

      if (error) {
        // L'email est parti mais Supabase a Ã©chouÃ© â pas grave
        console.warn('\u26a0\ufe0f Email envoy\u00e9 mais archivage Supabase \u00e9chou\u00e9:', error.message);
      } else {
        console.log('\u2705 Email envoy\u00e9 + archiv\u00e9 dans Supabase');
      }

      statusEl.textContent = '\u2705 Message envoy\u00e9 avec succ\u00e8s\u00a0! Je vous r\u00e9pondrai bient\u00f4t.';
      statusEl.classList.add('success');
      form.reset();
      clearErrors();

    } catch (err) {
      console.error('Erreur envoi:', err);
      statusEl.textContent = '\u274c Erreur d\'envoi. Contactez-moi directement\u00a0: pauljovani15@gmail.com';
      statusEl.classList.add('error-msg');
    } finally {
      submitBtn.disabled = false;
      if (btnText)   btnText.style.display   = 'inline';
      if (btnLoader) btnLoader.style.display = 'none';
    }
  });
})();


/* ============================================================
   10. FOOTER YEAR
   ============================================================ */
(function initYear() {
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();
})();


/* ============================================================
   11. SMOOTH SCROLL + HEADER OFFSET
   ============================================================ */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    const top = target.getBoundingClientRect().top + window.scrollY - 80;
    window.scrollTo({ top, behavior: 'smooth' });
  });
});
