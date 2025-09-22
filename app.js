/* ==========================================================================
   app.js — Landing "Curso de Sueroterapia"
   --------------------------------------------------------------------------
   Secciones:
   1) Configuración (WhatsApp)
   2) Utilidades (selectores, helpers)
   3) Año en el footer
   4) Tema claro/oscuro
   5) Barra de progreso al hacer scroll
   6) CTA de WhatsApp
   7) Contador regresivo
   8) Inicialización global
   ========================================================================== */


/* ==========================
   1) CONFIGURACIÓN GENERAL
   ========================== */
/**
 * Número en formato internacional:
 *   - Colombia: anteponer 57 al número.
 *   - Ej: 3116023717 => "573116023717"
 */
const PHONE    = '573116023717';
const WA_BASE_MESSAGE = 'Quiero inscribirme al Curso de Sueroterapia.';


/* ==========================
   2) UTILIDADES
   ========================== */
const $  = (sel) => document.querySelector(sel);
const $$ = (sel) => document.querySelectorAll(sel);
const on = (el, ev, fn, opts = { passive: true }) => el && el.addEventListener(ev, fn, opts);
const pad = (n, size = 2) => String(n).padStart(size, '0');


/* ==========================
   3) AÑO EN EL FOOTER
   ========================== */
document.addEventListener('DOMContentLoaded', () => {
  const yearEl = $('#y');
  if (yearEl) yearEl.textContent = new Date().getFullYear();
});


/* ==========================
   4) TEMA CLARO/OSCURO
   ========================== */
function applyTheme(theme, { save = true } = {}) {
  const body = document.body;
  const btn  = $('.toggle-theme');

  if (theme === 'dark') {
    body.setAttribute('data-theme', 'dark');
    if (btn) btn.innerHTML = '<span>☀️</span>';
  } else {
    body.removeAttribute('data-theme');
    if (btn) btn.innerHTML = '<span>🌙</span>';
  }
  if (save) localStorage.setItem('theme', theme);
}

function toggleTheme() {
  const isDark = document.body.getAttribute('data-theme') === 'dark';
  applyTheme(isDark ? 'light' : 'dark');
}

function initTheme() {
  const stored = localStorage.getItem('theme');
  const prefersDark = window.matchMedia &&
                      window.matchMedia('(prefers-color-scheme: dark)').matches;
  applyTheme(stored || (prefersDark ? 'dark' : 'light'), { save: false });
}


/* ======================================
   5) BARRA DE PROGRESO (LECTURA/SCROLL)
   ====================================== */
function initScrollProgress() {
  const bar = $('#progress');
  if (!bar) return;

  const update = () => {
    const doc = document.documentElement;
    const max = doc.scrollHeight - doc.clientHeight;
    const pct = max > 0 ? (doc.scrollTop / max) * 100 : 0;
    bar.style.width = pct + '%';
  };

  update();
  on(document, 'scroll', () => requestAnimationFrame(update));
  on(window, 'resize', () => requestAnimationFrame(update));
}


/* ======================================
   6) CTA WHATSAPP
   ====================================== */
function buildWaLink({
  phone   = PHONE,
  message = WA_BASE_MESSAGE
} = {}) {
  const text = encodeURIComponent(message);
  return `https://wa.me/${encodeURIComponent(phone)}?text=${text}`;
}

function initWhatsAppCTA() {
  const cta = $('#cta-wa');
  if (!cta) return;

  cta.setAttribute('href', buildWaLink());

  on(cta, 'click', () => {
    // métricas opcionales
  });
}


/* ======================================
   7) CONTADOR REGRESIVO
   ====================================== */
let countdownTimerId = null;

function initCountdown({ targetDate = null, daysFromNow = 1 } = {}) {
  const wrap = $('#countdown');
  const dEl  = $('#d');
  const hEl  = $('#h');
  const mEl  = $('#m');
  const sEl  = $('#s');
  if (!wrap || !dEl || !hEl || !mEl || !sEl) return;

  const end = targetDate
    ? new Date(targetDate)
    : new Date(Date.now() + daysFromNow * 86400000);

  function render() {
    const diff = end.getTime() - Date.now();

    if (diff <= 0) {
      clearInterval(countdownTimerId);
      wrap.innerHTML =
        '<div class="unit"><span class="num">00</span><span class="label">Finalizado</span></div>';
      return;
    }

    const days  = Math.floor(diff / 86400000);
    const hours = Math.floor((diff % 86400000) / 3600000);
    const mins  = Math.floor((diff % 3600000) / 60000);
    const secs  = Math.floor((diff % 60000) / 1000);

    dEl.textContent = days > 99 ? String(days) : pad(days);
    hEl.textContent = pad(hours);
    mEl.textContent = pad(mins);
    sEl.textContent = pad(secs);
  }

  render();
  clearInterval(countdownTimerId);
  countdownTimerId = setInterval(render, 1000);
}


/* ======================================
   8) INICIALIZACIÓN GLOBAL
   ====================================== */
document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initScrollProgress();
  initWhatsAppCTA();
  initCountdown({ daysFromNow: 1 });
});


// Número final al que quieres llegar
  const totalInscritos = 100;

  // Velocidad de la animación (milisegundos entre cada incremento)
  const velocidad = 10000; 

  let contador = 0;
  const elemento = document.getElementById("contador");

  const intervalo = setInterval(() => {
    contador++;
    elemento.textContent = contador;
    if (contador >= totalInscritos) {
      clearInterval(intervalo);
    }
  }, velocidad);


/* ======================================
   9) EXPORTS OPCIONALES
   ====================================== */
window.toggleTheme   = toggleTheme;
window.applyTheme    = applyTheme;
window.buildWaLink   = buildWaLink;
window.initCountdown = initCountdown;