/* Progressive enhancement: all handbook links also work without JavaScript. */
(() => {
  const root = document.getElementById('catalog-browser');
  if (!root) return;
  const cards = [...root.querySelectorAll('[data-talk]')];
  const seriesButtons = [...root.querySelectorAll('[data-series-filter]')];
  const search = document.getElementById('catalog-search');
  const audience = document.getElementById('catalog-audience');
  const day = document.getElementById('catalog-day');
  const jump = document.getElementById('catalog-jump');
  const options = [...jump.options];
  const stage = root.querySelector('.catalog-stage');
  const before = document.getElementById('catalog-before');
  const after = document.getElementById('catalog-after');
  const storageKey = 'aie-handbook-catalog';
  let state, matches = [];

  function restore() {
    const params = new URL(location.href).searchParams;
    state = {
      series: params.get('series') || 'all',
      audience: params.get('audience') || 'all',
      day: params.get('day') || (location.hash === '#day2' ? 'day2' : 'all'),
      query: params.get('q') || '',
      talk: params.get('talk') || ''
    };
    if (!['series', 'audience', 'day', 'q', 'talk'].some(key => params.has(key)) && location.hash !== '#day2') {
      try {
        const saved = JSON.parse(sessionStorage.getItem(storageKey));
        if (saved && Object.values(saved).every(value => typeof value === 'string')) state = {...state, ...saved};
      } catch (_) {}
    }
    if (!seriesButtons.some(b => b.dataset.seriesFilter === state.series)) state.series = 'all';
    if (![...audience.options].some(o => o.value === state.audience)) state.audience = 'all';
    if (![...day.options].some(o => o.value === state.day)) state.day = 'all';
  }

  function remember() {
    try { sessionStorage.setItem(storageKey, JSON.stringify(state)); } catch (_) {}
    const url = new URL(location.href);
    for (const [key, value] of Object.entries({series: state.series, audience: state.audience, day: state.day, q: state.query, talk: state.talk})) {
      if (value && value !== 'all') url.searchParams.set(key, value);
      else url.searchParams.delete(key);
    }
    if (url.hash === '#day2') url.hash = '';
    // Some local-file browsers restrict history updates; navigation still works.
    try { history.replaceState(null, '', url); } catch (_) {}
  }

  function render(direction = 0) {
    const query = state.query.trim().toLocaleLowerCase();
    matches = cards.filter(c =>
      (state.series === 'all' || c.dataset.series === state.series) &&
      (state.audience === 'all' || c.dataset.audience.split(' ').includes(state.audience)) &&
      (state.day === 'all' || c.dataset.days.split(' ').includes(state.day)) &&
      c.textContent.toLocaleLowerCase().includes(query)
    );
    if (state.day === 'day2') matches.sort((a, b) => Number(a.dataset.day2Start) - Number(b.dataset.day2Start));
    const active = matches.find(c => c.dataset.talk === state.talk) || matches[0];
    state.talk = active?.dataset.talk || '';
    const index = matches.indexOf(active);
    cards.forEach(c => { c.hidden = c !== active; });
    search.value = state.query;
    audience.value = state.audience;
    day.value = state.day;
    seriesButtons.forEach(b => b.setAttribute('aria-pressed', b.dataset.seriesFilter === state.series));
    document.getElementById('catalog-description').textContent = seriesButtons.find(b => b.dataset.seriesFilter === state.series).dataset.description;
    document.getElementById('catalog-count').textContent = `${matches.length} / ${cards.length} 篇手册`;
    document.getElementById('catalog-position').textContent = active ? `${index + 1} / ${matches.length} · ${active.querySelector('.speaker-name').textContent}` : '0 / 0';
    document.getElementById('catalog-empty').hidden = !!active;
    stage.hidden = !active;
    root.querySelector('.catalog-jump').hidden = !active;
    root.querySelector('.catalog-controls').hidden = !active;
    root.querySelector('.catalog-help').hidden = !active;
    for (const [button, card, label] of [[before, matches[index - 1], '上一场'], [after, matches[index + 1], '下一场']]) {
      button.disabled = !card;
      const name = card?.querySelector('.speaker-name').textContent || '已到边界';
      button.querySelector('.neighbor-name').textContent = name;
      const portraits = [...(card?.querySelectorAll('.speaker-portrait img') || [])].map(image => {
        const copy = image.cloneNode();
        copy.alt = '';
        const frame = document.createElement('span');
        frame.className = 'neighbor-portrait';
        frame.append(copy);
        return frame;
      });
      button.querySelector('.neighbor-portraits').replaceChildren(...portraits);
      button.setAttribute('aria-label', `${label}：${name}`);
    }
    root.querySelectorAll('.catalog-controls [data-step]').forEach(b => {
      b.disabled = !matches[index + Number(b.dataset.step)];
    });
    jump.replaceChildren(...matches.map(c => options.find(o => o.value === c.dataset.talk).cloneNode(true)));
    jump.value = state.talk;
    if (direction && active && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
      active.getAnimations().forEach(a => a.cancel());
      active.animate([{transform: `translateX(${direction * 24}px) scale(.985)`, opacity: .6}, {transform: 'translateX(0) scale(1)', opacity: 1}], {duration: 300, easing: 'cubic-bezier(.22,1,.36,1)'});
    }
  }

  function move(step) {
    const index = matches.findIndex(c => c.dataset.talk === state.talk);
    if (!matches[index + step]) return;
    state.talk = matches[index + step].dataset.talk;
    render(step);
    remember();
  }

  root.addEventListener('click', event => {
    const button = event.target.closest('button');
    if (!button || button.disabled) return;
    if (button.dataset.step) return move(Number(button.dataset.step));
    if (button.dataset.seriesFilter) state.series = button.dataset.seriesFilter;
    else if (button.id === 'catalog-reset') state = {series: 'all', audience: 'all', day: 'all', query: '', talk: ''};
    else return;
    state.talk = '';
    render();
    remember();
  });
  search.addEventListener('input', () => { state.query = search.value; state.talk = ''; render(); remember(); });
  for (const [element, key] of [[audience, 'audience'], [day, 'day']]) {
    element.addEventListener('change', () => { state[key] = element.value; state.talk = ''; render(); remember(); });
  }
  jump.addEventListener('change', () => { state.talk = jump.value; render(); remember(); });
  root.addEventListener('keydown', event => {
    if (!event.target.closest('[data-step]') || event.altKey || event.ctrlKey || event.metaKey) return;
    if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
      event.preventDefault();
      move(event.key === 'ArrowLeft' ? -1 : 1);
    }
  });
  let swipe;
  stage.addEventListener('pointerdown', event => {
    if (event.button !== 0 || event.target.closest('a, button')) return;
    swipe = {x: event.clientX, y: event.clientY, id: event.pointerId};
    stage.setPointerCapture(event.pointerId);
  });
  stage.addEventListener('pointerup', event => {
    if (!swipe || event.pointerId !== swipe.id) return;
    const dx = event.clientX - swipe.x, dy = event.clientY - swipe.y;
    swipe = null;
    if (event.pointerType === 'mouse' && window.getSelection()?.toString()) return;
    if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy) * 1.3) move(dx < 0 ? 1 : -1);
  });
  stage.addEventListener('pointercancel', () => { swipe = null; });
  window.addEventListener('popstate', () => { restore(); render(); });
  window.addEventListener('pageshow', () => { restore(); render(); });
  restore();
  root.classList.add('is-interactive');
  root.querySelector('.catalog-tools').hidden = false;
  before.hidden = after.hidden = false;
  render();
})();
