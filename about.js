// Téléphone horizontal : « À l'origine du projet » passe sous le diaporama, Thierry Beghin rejoint la colonne de droite
(function () {
  const orig = document.querySelector('.orig');
  const thierry = document.querySelector('.thierry');
  const txt = document.getElementById('txt');
  const rest1 = document.querySelector('.col1 .rest');
  const rest2 = document.querySelector('.col2 .rest');
  const mq = window.matchMedia('(orientation: landscape) and (max-height: 500px)');
  function place() {
    if (mq.matches) { rest1.replaceChildren(orig); rest2.prepend(thierry); }
    else { rest1.replaceChildren(thierry); txt.append(orig); }
  }
  mq.addEventListener('change', place);
  place();
})();

// Boutons « Voir plus » / « Voir moins »
(function () {
  const main = document.querySelector('main');
  const info = main.querySelector('.info');
  const more = info.querySelector('.more');
  const less = main.querySelector('.more.less');
  function toggle(open) {
    main.classList.toggle('open', open);
    info.classList.toggle('open', open);
    more.setAttribute('aria-expanded', open);
    if (!open) {
      document.getElementById('txt').scrollTop = 0;
      info.scrollIntoView({ block: 'nearest' });
    }
  }
  more.addEventListener('click', () => toggle(true));
  less.addEventListener('click', () => toggle(false));
})();
