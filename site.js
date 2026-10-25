// Menu hamburger
const burger = document.querySelector('.burger');
const menu = document.getElementById('menu');
burger.addEventListener('click', () => {
  const open = menu.classList.toggle('open');
  burger.setAttribute('aria-expanded', open);
});
menu.addEventListener('click', e => {
  if (e.target.tagName === 'A') { menu.classList.remove('open'); burger.setAttribute('aria-expanded', 'false'); }
});

// Diaporama : fondu croisé (2 s d'affichage, 2 s de transition).
// L'image suivante est décodée AVANT que le fondu commence.
(function () {
  const slides = [...document.querySelectorAll('.slide')];
  if (!slides.length) return;
  const credit = document.querySelector('.credit');
  const setCredit = el => { if (credit) credit.textContent = el.dataset.credit || ''; };
  setCredit(slides[0]);
  if (slides.length < 2) return;
  const FADE = 2000, SHOW = 2000;
  const decoded = img => (img.decode ? img.decode().catch(() => {}) : Promise.resolve());
  let i = 0;

  function fade(prev, cur) {
    setCredit(cur);
    const done = () => {
      cur.style.opacity = 1; cur.style.zIndex = 1;
      prev.style.opacity = 0; prev.style.zIndex = 0;
    };
    if (!cur.animate) { done(); return Promise.resolve(); }
    // L'image entrante monte de 0 à 1 par-dessus l'image sortante qui reste opaque dessous.
    cur.style.zIndex = 2;
    cur.style.willChange = 'opacity';
    const anim = cur.animate([{ opacity: 0 }, { opacity: 1 }], { duration: FADE, easing: 'ease-in-out', fill: 'forwards' });
    return anim.finished.catch(() => {}).then(() => {
      done(); anim.cancel(); cur.style.willChange = '';
    });
  }

  async function loop() {
    await Promise.all(slides.map(decoded));
    for (;;) {
      await new Promise(r => setTimeout(r, SHOW));
      const prev = slides[i];
      i = (i + 1) % slides.length;
      await fade(prev, slides[i]);
    }
  }
  loop();
})();

// Adresse mail assemblée à l'affichage (absente du code source)
document.querySelectorAll('.mail').forEach(el => {
  const addr = el.dataset.u + '@' + el.dataset.d;
  const a = document.createElement('a');
  a.href = 'mailto:' + addr; a.textContent = addr;
  el.replaceWith(a);
});
