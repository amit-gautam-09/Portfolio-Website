/* ============================================================
   Amit Gautam ,  Portfolio JavaScript
   Handles: scroll animations, navbar, mobile menu, theme toggle,
            timeline accordion, scroll-to-top, active nav links
   ============================================================ */

'use strict';

// ============================================================
// THEME TOGGLE
// ============================================================
const THEME_KEY = 'ag-portfolio-theme';
const html      = document.documentElement;

// Theme toggle was removed from HTML
// Ensure a default theme is set if needed
(function initTheme() {
  html.setAttribute('data-theme', 'dark');
})();

// ============================================================
// NAVBAR: SCROLL BEHAVIOR
// ============================================================
const navbar = document.getElementById('navbar');

function handleNavbarScroll() {
  if (window.scrollY > 40) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
}

window.addEventListener('scroll', handleNavbarScroll, { passive: true });
handleNavbarScroll(); // run once on load

// ============================================================
// ACTIVE NAV LINK (Intersection Observer on sections)
// ============================================================
const navLinks = document.querySelectorAll('.nav-links a');
const sections = document.querySelectorAll('section[id]');

const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach((link) => {
          link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
        });
      }
    });
  },
  {
    rootMargin: '-40% 0px -55% 0px',
    threshold: 0,
  }
);

sections.forEach((section) => sectionObserver.observe(section));

// ============================================================
// MOBILE MENU
// ============================================================
const hamburger   = document.getElementById('hamburger');
const mobileMenu  = document.getElementById('mobile-menu');

function openMobileMenu() {
  hamburger.classList.add('open');
  mobileMenu.classList.add('open');
  hamburger.setAttribute('aria-expanded', 'true');
  document.body.style.overflow = 'hidden';
}

function closeMobileMenu() {
  hamburger.classList.remove('open');
  mobileMenu.classList.remove('open');
  hamburger.setAttribute('aria-expanded', 'false');
  document.body.style.overflow = '';
}

function toggleMobileMenu() {
  if (mobileMenu.classList.contains('open')) {
    closeMobileMenu();
  } else {
    openMobileMenu();
  }
}

hamburger.addEventListener('click', toggleMobileMenu);

// Close on Escape key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && mobileMenu.classList.contains('open')) {
    closeMobileMenu();
  }
});

// ============================================================
// SCROLL ANIMATIONS (Intersection Observer ,  fade-up)
// ============================================================
const fadeUpEls = document.querySelectorAll('.fade-up');

const fadeObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        fadeObserver.unobserve(entry.target); // animate once
      }
    });
  },
  {
    rootMargin: '0px 0px -60px 0px',
    threshold: 0.08,
  }
);

fadeUpEls.forEach((el) => fadeObserver.observe(el));

// ============================================================
// TIMELINE ACCORDION
// ============================================================

/**
 * Toggle an experience timeline entry open/closed.
 * @param {HTMLElement} header - The clicked timeline-header element
 */
function toggleTimeline(header) {
  const entry    = header.closest('.timeline-entry');
  const isOpen   = entry.classList.contains('open');
  const expanded = !isOpen;

  // Close all entries first
  document.querySelectorAll('.timeline-entry.open').forEach((openEntry) => {
    openEntry.classList.remove('open');
    openEntry.querySelector('.timeline-header').setAttribute('aria-expanded', 'false');
  });

  // Open the clicked one if it was closed
  if (!isOpen) {
    entry.classList.add('open');
    header.setAttribute('aria-expanded', 'true');
  }
}

/**
 * Keyboard accessibility for timeline headers (Enter / Space).
 * @param {KeyboardEvent} event
 * @param {HTMLElement} header
 */
function handleKeyPress(event, header) {
  if (event.key === 'Enter' || event.key === ' ') {
    event.preventDefault();
    toggleTimeline(header);
  }
}

// Auto-open the first timeline entry on load
window.addEventListener('DOMContentLoaded', () => {
  const firstEntry = document.querySelector('.timeline-entry');
  if (firstEntry) {
    const firstHeader = firstEntry.querySelector('.timeline-header');
    firstEntry.classList.add('open');
    firstHeader.setAttribute('aria-expanded', 'true');
  }
});

// ============================================================
// SCROLL TO TOP
// ============================================================
const scrollTopBtn = document.getElementById('scroll-top');

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

window.addEventListener('scroll', () => {
  if (window.scrollY > 400) {
    scrollTopBtn.classList.add('visible');
  } else {
    scrollTopBtn.classList.remove('visible');
  }
}, { passive: true });

// ============================================================
// SMOOTH ANCHOR SCROLLING (with navbar offset)
// ============================================================
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener('click', (e) => {
    const href = anchor.getAttribute('href');
    if (href === '#') return;
    const target = document.querySelector(href);
    if (!target) return;

    e.preventDefault();
    const navHeight = navbar.offsetHeight;
    const top       = target.getBoundingClientRect().top + window.scrollY - navHeight - 12;

    window.scrollTo({ top, behavior: 'smooth' });
  });
});

// ============================================================
// CONTACT EMAIL COPY (optional UX touch)
// ============================================================
// Adds a subtle tooltip when clicking the email button
const emailBtn = document.getElementById('contact-email-btn');
if (emailBtn) {
  emailBtn.addEventListener('click', () => {
    // The mailto link handles the email ,  this is just a fallback log
    console.log('Opening email client for: work.amit.gautam@gmail.com');
  });
}

// ============================================================
// PREVENT FOUC (Flash of Unstyled Content) for theme
// ============================================================
// (Handled inline via the initTheme IIFE above, called before body paint)

// ============================================================
// ANIMATE STAT NUMBERS (count-up on scroll into view)
// ============================================================
function animateCountUp(el) {
  const raw    = el.textContent.trim();
  // Extract numeric portion (handles "500+", "₹2.5 Cr", "5,000+", "4")
  const prefix = raw.match(/^[₹]/) ? raw[0] : '';
  const suffix = raw.match(/[+%a-zA-Z\s]+/) ? raw.match(/[+%a-zA-Z\s]+$/)?.[0] || '' : '';
  const num    = parseFloat(raw.replace(/[^0-9.]/g, ''));

  if (isNaN(num)) return;

  const duration = 1400;
  const start    = performance.now();

  function step(now) {
    const elapsed  = now - start;
    const progress = Math.min(elapsed / duration, 1);
    const eased    = 1 - Math.pow(1 - progress, 3); // ease-out-cubic
    const current  = eased * num;

    // Format the number
    let display;
    if (num >= 1000) {
      display = Math.floor(current).toLocaleString('en-IN');
    } else if (num < 10 && String(num).includes('.')) {
      display = current.toFixed(1);
    } else {
      display = Math.floor(current);
    }

    el.textContent = prefix + display + suffix;

    if (progress < 1) {
      requestAnimationFrame(step);
    } else {
      el.textContent = raw; // restore exact original text
    }
  }

  requestAnimationFrame(step);
}

// Observe stat numbers and trigger count-up when visible
const statNumbers = document.querySelectorAll('.stat-number');
const statObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        animateCountUp(entry.target);
        statObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.5 }
);

statNumbers.forEach((el) => statObserver.observe(el));
