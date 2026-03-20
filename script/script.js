/* ════════════════════════════════════════════════════
   Computer Panel Sahiwal — script.js
   Sections:
     1.  Page Loader
     2.  Lucide Icons
     3.  Scroll Reveal
     4.  Typewriter
     5.  Parallax Hero
     6.  Confetti
     7.  Stock Toggle
     8.  Spec Comparison Data & Renderer
     9.  Nav Light/Dark on Scroll
    10.  FAQ Accordion
    11.  Back to Top & Sticky Bar
    12.  Dark Mode Toggle
    13.  Cookie Banner
    14.  Social Proof Popup
════════════════════════════════════════════════════ */

/* ════════════════════════════════
   1. PAGE LOADER
════════════════════════════════ */
(function () {
  const lbar   = document.getElementById('lbar');
  const lpct   = document.getElementById('lpct');
  const loader = document.getElementById('page-loader');
  let pct = 0;

  const interval = setInterval(() => {
    pct += Math.random() * 18 + 5;
    if (pct >= 100) {
      pct = 100;
      clearInterval(interval);
      setTimeout(() => loader.classList.add('hide'), 200);
    }
    lbar.style.width    = pct + '%';
    lpct.textContent    = Math.floor(pct) + '%';
  }, 80);
})();

/* ════════════════════════════════
   2. LUCIDE ICONS
════════════════════════════════ */
lucide.createIcons();

/* ════════════════════════════════
   3. SCROLL REVEAL
════════════════════════════════ */
const srObserver = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('on');
      srObserver.unobserve(e.target);
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.sr').forEach(el => srObserver.observe(el));

/* ════════════════════════════════
   4. TYPEWRITER
════════════════════════════════ */
(function () {
  const twEl    = document.getElementById('typewriter-text');
  if (!twEl) return;

  const words   = ['Provider', 'Partner', 'Solution', 'Expert', 'Store'];
  let idx       = 0;
  let charCount = 0;
  let deleting  = false;

  function typeLoop() {
    const word = words[idx];
    if (!deleting) {
      twEl.textContent = word.slice(0, ++charCount);
      if (charCount === word.length) {
        deleting = true;
        setTimeout(typeLoop, 2000);
        return;
      }
    } else {
      twEl.textContent = word.slice(0, --charCount);
      if (charCount === 0) {
        deleting = false;
        idx = (idx + 1) % words.length;
      }
    }
    setTimeout(typeLoop, deleting ? 55 : 95);
  }

  setTimeout(typeLoop, 1400);
})();

/* ════════════════════════════════
   5. PARALLAX HERO
════════════════════════════════ */
if (window.innerWidth > 768) {
  const parallaxBg   = document.getElementById('parallax-bg');
  const parallaxH1   = document.getElementById('parallax-h1');
  const parallaxText = document.getElementById('parallax-text');

  window.addEventListener('scroll', () => {
    const s = window.scrollY;
    if (parallaxBg)   parallaxBg.style.transform   = `translateY(${s * 0.4}px)`;
    if (parallaxH1)   parallaxH1.style.transform   = `translateY(${s * 0.18}px)`;
    if (parallaxText) parallaxText.style.transform = `translateY(${s * 0.12}px)`;
  }, { passive: true });
}

/* ════════════════════════════════
   6. CONFETTI
════════════════════════════════ */
function fireConfetti(e) {
  const colors = ['#0071e3', '#34d399', '#fbbf24', '#f87171', '#a78bfa', '#60a5fa', '#fff'];
  const cx = e ? e.clientX : window.innerWidth / 2;
  const cy = e ? e.clientY : window.innerHeight / 2;

  for (let i = 0; i < 55; i++) {
    const p    = document.createElement('div');
    const size = Math.random() * 8 + 5;
    p.className = 'cp';
    p.style.cssText = [
      `left:${cx + (Math.random() - 0.5) * 120}px`,
      `top:${cy}px`,
      `width:${size}px`,
      `height:${size}px`,
      `background:${colors[Math.floor(Math.random() * colors.length)]}`,
      `border-radius:${Math.random() > 0.5 ? '50%' : '2px'}`,
      `animation-duration:${Math.random() * 1.2 + 0.8}s`,
      `animation-delay:${Math.random() * 0.3}s`,
      `animation-name:confettiFall`
    ].join(';');
    document.body.appendChild(p);
    setTimeout(() => p.remove(), 2200);
  }
}

/* ════════════════════════════════
   7. STOCK TOGGLE
════════════════════════════════ */
function toggleStock(id) {
  const el    = document.getElementById(id);
  if (!el) return;
  const isIn  = el.classList.contains('in');

  el.classList.toggle('in',  !isIn);
  el.classList.toggle('out',  isIn);
  el.innerHTML = `<span class="sdot ${isIn ? 'out' : 'in'}"></span>${isIn ? 'Out of Stock' : 'In Stock'}`;
}

/* ════════════════════════════════
   8. SPEC COMPARISON
════════════════════════════════ */
const products = {
  elitebook: {
    brand: 'HP', name: 'EliteBook 840 G5/G6', price: 'PKR 55,000 – 70,000',
    specs: [
      { l: 'Processor',   v: 'Core i5 8th Gen',  tier: 'good' },
      { l: 'RAM',         v: '8GB DDR4',          tier: ''     },
      { l: 'Storage',     v: '256GB SSD',         tier: ''     },
      { l: 'Display',     v: '14" FHD IPS',       tier: 'good' },
      { l: 'Battery',     v: 'Single 56Wh',       tier: ''     },
      { l: 'Build',       v: 'Military-grade',    tier: 'best' },
      { l: 'Weight',      v: '~1.48 kg',          tier: ''     },
      { l: 'Best For',    v: 'Executives',        tier: ''     }
    ]
  },
  latitude: {
    brand: 'Dell', name: 'Latitude 5400/7490', price: 'PKR 50,000 – 65,000',
    specs: [
      { l: 'Processor',   v: 'Core i5 8th Gen',  tier: 'good' },
      { l: 'RAM',         v: '16GB DDR4',         tier: 'best' },
      { l: 'Storage',     v: 'NVMe SSD',          tier: 'best' },
      { l: 'Display',     v: '14" FHD',           tier: ''     },
      { l: 'Battery',     v: 'Single 68Wh',       tier: 'good' },
      { l: 'Build',       v: 'Corporate Grade',   tier: ''     },
      { l: 'Weight',      v: '~1.56 kg',          tier: ''     },
      { l: 'Best For',    v: 'IT Depts/Offices',  tier: ''     }
    ]
  },
  thinkpad: {
    brand: 'Lenovo', name: 'ThinkPad T480', price: 'Ask on WhatsApp',
    specs: [
      { l: 'Processor',   v: 'Core i5 8th Gen',  tier: 'good' },
      { l: 'RAM',         v: '8–16GB DDR4',       tier: 'good' },
      { l: 'Storage',     v: '256GB SSD',         tier: ''     },
      { l: 'Display',     v: '14" FHD IPS',       tier: 'good' },
      { l: 'Battery',     v: 'Dual Battery',      tier: 'best' },
      { l: 'Build',       v: 'ThinkPad Iconic',   tier: 'best' },
      { l: 'Weight',      v: '~1.58 kg',          tier: ''     },
      { l: 'Best For',    v: 'Freelancers/Dev',   tier: ''     }
    ]
  },
  optiplex: {
    brand: 'Dell', name: 'OptiPlex 7050/5050', price: 'Bulk Pricing Available',
    specs: [
      { l: 'Processor',    v: 'Core i5 6/7th Gen',       tier: ''     },
      { l: 'RAM',          v: '8GB DDR4',                 tier: ''     },
      { l: 'Storage',      v: '256GB SSD/HDD',            tier: ''     },
      { l: 'Form Factor',  v: 'Micro / SFF',              tier: 'best' },
      { l: 'Power Use',    v: 'Low (65W)',                tier: 'best' },
      { l: 'Build',        v: 'Institutional Grade',      tier: 'good' },
      { l: 'Ideal For',    v: 'Schools / Banks',          tier: 'best' },
      { l: 'Type',         v: 'Desktop PC',               tier: ''     }
    ]
  },
  prodesk: {
    brand: 'HP', name: 'ProDesk 600 G3', price: 'Ask on WhatsApp',
    specs: [
      { l: 'Processor',    v: 'Core i5 7th Gen',          tier: ''     },
      { l: 'RAM',          v: '8GB DDR4',                 tier: ''     },
      { l: 'Storage',      v: '256GB SSD',                tier: ''     },
      { l: 'Form Factor',  v: 'Tower / SFF',              tier: 'good' },
      { l: 'Power Use',    v: 'Medium (90W)',             tier: ''     },
      { l: 'Build',        v: 'Corporate Standard',       tier: 'good' },
      { l: 'Ideal For',    v: 'Office Workstations',      tier: 'best' },
      { l: 'Type',         v: 'Desktop PC',               tier: ''     }
    ]
  }
};

function renderCmp() {
  const leftKey  = document.getElementById('spc-left').value;
  const rightKey = document.getElementById('spc-right').value;
  const grid     = document.getElementById('spc-grid');

  // Ensure two card containers exist
  while (grid.children.length < 2) {
    const card = document.createElement('div');
    card.className = 'spc-card';
    grid.appendChild(card);
  }

  [leftKey, rightKey].forEach((key, i) => {
    const p    = products[key];
    const card = grid.children[i];
    card.innerHTML = `
      <div class="spc-card-head">
        <div class="spc-brand">${p.brand}</div>
        <div class="spc-name">${p.name}</div>
        <div class="spc-price">${p.price}</div>
      </div>
      <div class="spc-rows">
        ${p.specs.map(s => `
          <div class="spc-row">
            <span class="spc-lbl">${s.l}</span>
            <span class="spc-val ${s.tier}">${s.v}</span>
          </div>
        `).join('')}
      </div>
      <div class="spc-foot">
        <a href="https://wa.me/924044467725?text=Inquiry: ${encodeURIComponent(p.name)}" class="btn-link" style="font-size:14px;">
          Inquire
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
        </a>
      </div>
    `;
  });
}

renderCmp();

/* ════════════════════════════════
   9. NAV — LIGHT ON SCROLL
════════════════════════════════ */
const nav = document.getElementById('nav');
const lightSections = '.faq-sec,.testi-sec,.cmp-sec,.spc-sec,#laptops,#monitors,#reviews,#contact';

window.addEventListener('scroll', () => {
  let light = false;
  document.querySelectorAll(lightSections).forEach(el => {
    const r = el.getBoundingClientRect();
    if (r.top <= 52 && r.bottom >= 52) light = true;
  });
  nav.classList.toggle('light', light);
}, { passive: true });

/* ════════════════════════════════
   10. FAQ ACCORDION
════════════════════════════════ */
function toggleFaq(btn) {
  const item   = btn.closest('.faq-item');
  const isOpen = item.classList.contains('open');

  // Close all open items
  document.querySelectorAll('.faq-item.open').forEach(i => i.classList.remove('open'));

  // Open clicked item if it wasn't already open
  if (!isOpen) item.classList.add('open');

  // Re-render lucide icons inside the toggled icon
  lucide.createIcons();
}

/* ════════════════════════════════
   11. BACK TO TOP & STICKY BAR
════════════════════════════════ */
const bttBtn    = document.getElementById('btt');
const stickyBar = document.getElementById('sticky-bar');

window.addEventListener('scroll', () => {
  if (bttBtn)    bttBtn.classList.toggle('show', window.scrollY > 600);
  if (stickyBar) stickyBar.style.display = window.scrollY > 300 ? 'flex' : 'none';
}, { passive: true });

/* ════════════════════════════════
   12. DARK MODE
════════════════════════════════ */
const moonIcon = document.getElementById('dm-moon');
const sunIcon  = document.getElementById('dm-sun');
let dark       = localStorage.getItem('cc-dark') === '1';

function applyDark(d) {
  document.body.classList.toggle('dark-mode', d);
  if (moonIcon) moonIcon.style.display = d ? 'none' : 'block';
  if (sunIcon)  sunIcon.style.display  = d ? 'block' : 'none';
}

function toggleDark() {
  dark = !dark;
  localStorage.setItem('cc-dark', dark ? '1' : '0');
  applyDark(dark);
}

applyDark(dark);

/* ════════════════════════════════
   13. COOKIE BANNER
════════════════════════════════ */
const cookieBanner = document.getElementById('cookie-banner');

if (!localStorage.getItem('cc-cookie')) {
  setTimeout(() => {
    if (cookieBanner) cookieBanner.classList.add('show');
  }, 2500);
}

function hideCookie() {
  if (cookieBanner) cookieBanner.classList.remove('show');
  localStorage.setItem('cc-cookie', '1');
}

/* ════════════════════════════════
   14. SOCIAL PROOF POPUP
════════════════════════════════ */
// const spEvents = [
//   {
//     name:   'Ahmad Raza',
//     action: 'just inquired about HP EliteBook 840',
//     time:   '2 minutes ago · Sahiwal',
//     init:   'A',
//     bg:     '#0071e3'
//   },
//   {
//     name:   'Zain ul Abideen',
//     action: 'purchased ThinkPad T480',
//     time:   '5 minutes ago · Sahiwal',
//     init:   'Z',
//     bg:     '#7c3aed'
//   },
//   {
//     name:   'Muhammad Usman',
//     action: 'requested a bulk quote — 20 units',
//     time:   '8 minutes ago · Sahiwal',
//     init:   'M',
//     bg:     '#16a34a'
//   },
//   {
//     name:   'Sara Khalid',
//     action: 'inquired about Dell OptiPlex',
//     time:   '12 minutes ago · Sahiwal',
//     init:   'S',
//     bg:     '#dc2626'
//   },
//   {
//     name:   'Bilal Hassan',
//     action: 'just ordered Dell Latitude 5400',
//     time:   '15 minutes ago · Sahiwal',
//     init:   'B',
//     bg:     '#0891b2'
//   },
//   {
//     name:   'Fatima Malik',
//     action: 'inquired about HP ProDesk',
//     time:   '18 minutes ago · Sahiwal',
//     init:   'F',
//     bg:     '#d97706'
//   }
// ];

let spIndex = 0;
const spPopup = document.getElementById('sp-popup');

function showSocialProof() {
  if (!spPopup) return;
  const ev = spEvents[spIndex % spEvents.length];
  spIndex++;

  document.getElementById('sp-name').textContent   = ev.name;
  document.getElementById('sp-action').textContent = ev.action;
  document.getElementById('sp-time').textContent   = ev.time;
  document.getElementById('sp-avatar').textContent = ev.init;
  document.getElementById('sp-avatar').style.background = ev.bg;

  spPopup.classList.add('show');
  setTimeout(() => spPopup.classList.remove('show'), 4000);
}

setTimeout(() => {
  showSocialProof();
  setInterval(showSocialProof, 9000);
}, 5000);

/* ════════════════════════════════
   15. MOBILE MENU
════════════════════════════════ */
function toggleMobileMenu() {
  const menu    = document.getElementById('mob-menu');
  const overlay = document.getElementById('mob-overlay');
  const burger  = document.getElementById('hamburger');
  const isOpen  = menu.classList.contains('open');

  if (isOpen) {
    closeMobileMenu();
  } else {
    menu.classList.add('open');
    overlay.classList.add('open');
    burger.classList.add('open');
    document.body.style.overflow = 'hidden';
    lucide.createIcons();
  }
}

function closeMobileMenu() {
  const menu    = document.getElementById('mob-menu');
  const overlay = document.getElementById('mob-overlay');
  const burger  = document.getElementById('hamburger');
  menu.classList.remove('open');
  overlay.classList.remove('open');
  burger.classList.remove('open');
  document.body.style.overflow = '';
}

/* ════════════════════════════════
   16. PRODUCT FILTER TABS
════════════════════════════════ */
function filterProducts(cat, btn) {
  // Update tab active state
  document.querySelectorAll('.ftab').forEach(t => t.classList.remove('ftab--active'));
  btn.classList.add('ftab--active');

  // Filter cards
  document.querySelectorAll('#product-grid .pcard').forEach(card => {
    if (cat === 'all' || card.dataset.cat === cat) {
      card.classList.remove('hidden-card');
      // Re-trigger scroll reveal
      setTimeout(() => {
        card.classList.add('on');
      }, 20);
    } else {
      card.classList.add('hidden-card');
    }
  });
}

/* ════════════════════════════════
   17. QUICK INQUIRY DRAWER
════════════════════════════════ */
function openInquiry(productName, specsStr, waText) {
  const drawer  = document.getElementById('inq-drawer');
  const overlay = document.getElementById('inq-overlay');

  // Set content
  document.getElementById('inq-product-name').textContent = productName;

  // Build spec tags
  const specsContainer = document.getElementById('inq-specs');
  specsContainer.innerHTML = '';
  if (specsStr) {
    specsStr.split('·').forEach(s => {
      const tag = document.createElement('span');
      tag.className = 'inq-spec-tag';
      tag.textContent = s.trim();
      specsContainer.appendChild(tag);
    });
  }

  // Set WhatsApp link
  const waUrl = `https://wa.me/924044467725?text=Inquiry: ${encodeURIComponent(waText || productName)}`;
  document.getElementById('inq-wa-btn').href = waUrl;

  // Open
  drawer.classList.add('open');
  overlay.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeInquiry() {
  document.getElementById('inq-drawer').classList.remove('open');
  document.getElementById('inq-overlay').classList.remove('open');
  document.body.style.overflow = '';
}

// Close on Escape key
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    closeInquiry();
    closeMobileMenu();
  }
});


/* ════════════════════════════════════════════════════
   18. APPLE-STYLE PRODUCT SHELF
   – CSS scroll-snap drives the actual scrolling
   – JS adds: arrow buttons, progress bar, drag support
════════════════════════════════════════════════════ */
(function () {
  const scroll   = document.getElementById('shelfScroll');
  const progress = document.getElementById('shelfProgress');
  const btnPrev  = document.getElementById('shelfPrev');
  const btnNext  = document.getElementById('shelfNext');
  if (!scroll) return;

  const cards = Array.from(scroll.querySelectorAll('.shelf-card'));
  const TOTAL = cards.length;
  const GAP   = 18; // must match CSS gap

  // ── Update progress bar & arrow states ──────────
  function updateUI() {
    const maxScroll = scroll.scrollWidth - scroll.clientWidth;
    const pct       = maxScroll > 0 ? scroll.scrollLeft / maxScroll : 0;
    // Progress bar: maps 0→1 to 1/TOTAL→1
    const barW      = (1 / TOTAL) + pct * (1 - 1 / TOTAL);
    if (progress) progress.style.width = (barW * 100).toFixed(2) + '%';

    if (btnPrev) btnPrev.disabled = scroll.scrollLeft <= 2;
    if (btnNext) btnNext.disabled = scroll.scrollLeft >= maxScroll - 2;
  }

  // ── Arrow button scroll ──────────────────────────
  function scrollByCard(dir) {
    // Find card width + gap
    const cardW = cards[0] ? cards[0].offsetWidth + GAP : 320;
    scroll.scrollBy({ left: dir * cardW, behavior: 'smooth' });
  }

  if (btnPrev) btnPrev.addEventListener('click', () => scrollByCard(-1));
  if (btnNext) btnNext.addEventListener('click', () => scrollByCard(1));

  // ── Sync on native scroll ────────────────────────
  scroll.addEventListener('scroll', updateUI, { passive: true });

  // ── Mouse drag (desktop) ─────────────────────────
  let isDown = false;
  let startX = 0;
  let startScroll = 0;

  scroll.addEventListener('mousedown', e => {
    if (e.target.closest('a, button')) return;
    isDown = true;
    startX = e.clientX;
    startScroll = scroll.scrollLeft;
    scroll.style.scrollSnapType = 'none'; // disable snap while dragging
  });
  window.addEventListener('mousemove', e => {
    if (!isDown) return;
    e.preventDefault();
    scroll.scrollLeft = startScroll - (e.clientX - startX);
  });
  window.addEventListener('mouseup', () => {
    if (!isDown) return;
    isDown = false;
    scroll.style.scrollSnapType = '';   // re-enable snap
    // Snap to nearest card
    const cardW = cards[0] ? cards[0].offsetWidth + GAP : 320;
    const nearest = Math.round(scroll.scrollLeft / cardW);
    scroll.scrollTo({ left: nearest * cardW, behavior: 'smooth' });
  });

  // ── Init ─────────────────────────────────────────
  window.addEventListener('load',   updateUI);
  window.addEventListener('resize', updateUI);
  updateUI();
})();