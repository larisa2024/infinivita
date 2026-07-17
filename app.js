/* InfiniVita V3 — interactions communes (prototype : rien n'est envoyé) */

/* Date dynamique du hero : « il y a 10 ans jour pour jour » */
(function () {
  const el = document.getElementById('date-souvenir');
  if (!el) return;
  const d = new Date();
  d.setFullYear(d.getFullYear() - 10);
  el.textContent = d.toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' });
})();

/* Liste d'attente : bascule sur le formulaire Tally dès que l'URL est renseignée
   dans data-tally-url (index.html). Tant qu'elle est vide, le bouton email reste. */
(function () {
  const slot = document.getElementById('tally-slot');
  if (!slot) return;
  let url = slot.dataset.tallyUrl;
  if (!url) return;
  /* Accepte le lien de partage tally.so/r/XXXX et le convertit en version intégrable */
  url = url.replace('tally.so/r/', 'tally.so/embed/');
  if (url.indexOf('?') === -1) url += '?hideTitle=1&transparentBackground=1&alignLeft=1';
  const fallback = document.getElementById('waitlist-fallback');
  if (fallback) fallback.style.display = 'none';
  const iframe = document.createElement('iframe');
  iframe.src = url;
  iframe.title = "Liste d'attente InfiniVita";
  iframe.style.cssText = 'width:100%;min-height:660px;border:1px solid var(--line);border-radius:4px;background:#fff;';
  slot.appendChild(iframe);
})();

/* Liens de contact : adresse assemblée au chargement pour rester illisible
   par les robots collecteurs de spam (adresse pro temporaire — à remplacer
   par le lien TakeToki pour les rendez-vous, et par contact@<domaine> ensuite). */
(function () {
  const u = 'larisa.kr', d = 'interargus.com';
  document.querySelectorAll('a[data-mail-subject]').forEach(a => {
    a.href = 'mailto:' + u + '@' + d + '?subject=' + encodeURIComponent(a.dataset.mailSubject);
  });
})();

/* Apparition douce au défilement (respecte prefers-reduced-motion via le CSS) */
(function () {
  const els = document.querySelectorAll('.reveal');
  if (!els.length || !('IntersectionObserver' in window)) {
    els.forEach(el => el.classList.add('seen'));
    return;
  }
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('seen'); obs.unobserve(e.target); }
    });
  }, { threshold: 0.15 });
  els.forEach(el => obs.observe(el));
})();

/* Sélection d'un emoji (météo, humeur) */
function pick(btn) {
  btn.parentElement.querySelectorAll('button').forEach(b => b.classList.remove('sel'));
  btn.classList.add('sel');
}

/* Message de confirmation éphémère */
function okMsg(id) {
  const el = document.getElementById(id);
  if (!el) return;
  el.style.display = 'block';
  setTimeout(() => { el.style.display = 'none'; }, 4000);
}

/* Espace de démonstration (session uniquement) */
function openSpace(idPrenom) {
  const prenomInput = document.getElementById(idPrenom || 'esp-prenom');
  const prenom = prenomInput ? prenomInput.value.trim() : '';
  document.getElementById('welcome-msg').textContent = prenom ? 'Bienvenue, ' + prenom : 'Bienvenue';
  document.getElementById('login-panels').style.display = 'none';
  document.getElementById('space-open').style.display = 'block';
}
function closeSpace() {
  document.getElementById('login-panels').style.display = 'block';
  document.getElementById('space-open').style.display = 'none';
}

/* FAQ : construction (numérotation continue) + accordéon */
function buildFAQ(data) {
  const root = document.getElementById('faq-root');
  if (!root) return;
  let n = 0;
  data.forEach(sec => {
    const h = document.createElement('h3');
    h.className = 'faq-section';
    h.textContent = sec.section;
    root.appendChild(h);
    sec.items.forEach(([q, a]) => {
      n++;
      const item = document.createElement('div');
      item.className = 'faq-item';
      const btn = document.createElement('button');
      btn.className = 'faq-q';
      const label = document.createElement('span');
      const num = document.createElement('span');
      num.className = 'qnum';
      num.textContent = n + '.';
      label.appendChild(num);
      label.appendChild(document.createTextNode(q));
      const chev = document.createElement('span');
      chev.className = 'chev';
      chev.textContent = '▼';
      btn.appendChild(label);
      btn.appendChild(chev);
      const rep = document.createElement('div');
      rep.className = 'faq-a';
      const p = document.createElement('p');
      p.textContent = a;
      rep.appendChild(p);
      item.appendChild(btn);
      item.appendChild(rep);
      root.appendChild(item);
      btn.addEventListener('click', () => {
        const dejaOuvert = item.classList.contains('open');
        document.querySelectorAll('.faq-item.open').forEach(autre => {
          autre.classList.remove('open');
          autre.querySelector('.faq-a').style.maxHeight = null;
        });
        if (!dejaOuvert) {
          item.classList.add('open');
          rep.style.maxHeight = rep.scrollHeight + 'px';
        }
      });
    });
  });
}
