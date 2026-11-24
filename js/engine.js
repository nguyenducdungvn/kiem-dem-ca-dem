/* =========================================================
   Engine truyện tương tác – Kiểm Đếm Ca Đêm
   Không phụ thuộc thư viện. Chạy được khi mở file trực tiếp
   hoặc qua GitHub Pages.
   ========================================================= */
(function () {
  'use strict';

  const START = { TT: 70, TC: 50, DN: 0, PIN: 6 };
  const LIMITS = { TT: [0, 100], TC: [0, 100], DN: [0, 100], PIN: [0, 6] };
  const LABEL = { TT: 'Tỉnh táo', TC: 'Tin cậy', DN: 'Độ neo', PIN: 'Pin' };
  const SAVE_KEY = 'kdcd_save_v3';
  const END_KEY = 'kdcd_endings_v1';
  const CH_KEY = 'kdcd_chapters_v1';
  const ACTS = [
    { n: 1, name: 'Màn 1 · Bàn giao', time: '22:30 – 02:30', scene: () => STORY.start },
    { n: 2, name: 'Màn 2 · Cơi nới', time: '02:35 – 04:00', scene: () => 'm2_mo' },
    { n: 3, name: 'Màn 3 · Căn 509', time: '04:00 – 04:40', scene: () => 'm3_mo' },
    { n: 4, name: 'Màn 4 · Chốt sổ', time: '05:00 – 07:30', scene: () => 'm4_mo' }
  ];
  const CFG = window.GAME_CONFIG || {};

  let S = null;
  let checkpoint = null;
  let typingTimer = null;
  let countdown = null;

  const $ = (sel) => document.querySelector(sel);
  const clone = (o) => JSON.parse(JSON.stringify(o));
  const esc = (t) => String(t).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const sfx = (n) => { if (window.SFX) SFX.play(n); };

  function newState() {
    return { ...START, flags: {}, rules: [], clues: [], scene: STORY.start || 'intro', time: '', path: [] };
  }

  /* ---------- Lưu trữ cục bộ ---------- */
  function store(key, val) { try { localStorage.setItem(key, JSON.stringify(val)); } catch (e) { /* bỏ qua */ } }
  function read(key) { try { const r = localStorage.getItem(key); return r ? JSON.parse(r) : null; } catch (e) { return null; } }
  function drop(key) { try { localStorage.removeItem(key); } catch (e) { /* bỏ qua */ } }
  const save = () => store(SAVE_KEY, { S, checkpoint });
  function unlockEnding(id) {
    const e = read(END_KEY) || {};
    if (!e[id]) { e[id] = Date.now(); store(END_KEY, e); return true; }
    return false;
  }

  /* ---------- Cài đặt: chế độ đọc truyện ---------- */
  const SET_KEY = 'kdcd_settings_v1';
  const settings = Object.assign({ story: false }, read(SET_KEY) || {});
  const storyMode = () => !!settings.story;

  /* ---------- Chỉ số ---------- */
  // Chế độ đọc truyện: chỉ số không thể làm người chơi thua (chỉ thua khi chọn sai rõ ràng)
  const clamp = (k, v) => {
    let lo = LIMITS[k][0], hi = LIMITS[k][1];
    if (storyMode()) { if (k === 'TT' || k === 'PIN') lo = 1; if (k === 'DN') hi = 59; }
    return Math.max(lo, Math.min(hi, v));
  };
  function applyEffects(eff) {
    if (!eff) return [];
    return Object.keys(eff).map((k) => { S[k] = clamp(k, S[k] + eff[k]); return { k, d: eff[k] }; });
  }
  function statFail() {
    if (storyMode()) return null;
    const E = STORY.statEndings;
    if (S.DN >= 60) return E.DN;
    if (S.TT <= 0) return E.TT;
    if (S.PIN <= 0) return E.PIN;
    return null;
  }
  function applyGain(gain) {
    if (!gain) return;
    (gain.rules || []).forEach((r) => { if (!S.rules.includes(r)) { S.rules.push(r); toast('Phiếu bàn giao: nhận luật ' + r, 'rule'); } });
    (gain.clues || []).forEach((c) => { if (!S.clues.includes(c)) { S.clues.push(c); toast(c.startsWith('(Hiếm)') ? 'Manh mối hiếm!' : 'Manh mối mới', 'clue'); } });
  }

  /* ---------- HUD ---------- */
  function renderHUD() {
    ['TT', 'TC', 'DN'].forEach((k) => {
      $('#bar-' + k).style.width = S[k] + '%';
      $('#val-' + k).textContent = S[k];
      $('#bar-' + k).parentElement.parentElement.classList.toggle('warn',
        (k === 'TT' && S.TT < 40) || (k === 'TC' && S.TC < 30) || (k === 'DN' && S.DN >= 30));
    });
    const pins = $('#pins'); pins.innerHTML = '';
    for (let i = 0; i < 6; i++) { const p = document.createElement('span'); p.className = 'pin' + (i < S.PIN ? ' on' : ''); pins.appendChild(p); }
    $('#clock').textContent = S.time || '--:--';
    $('#journal-count').textContent = S.rules.length + S.clues.length;
    if (window.Scene3D && Scene3D.ok) Scene3D.setStats(S);
    document.body.classList.toggle('low-sanity', S.TT < 40);
  }

  function renderJournal() {
    const rl = $('#journal-rules'); rl.innerHTML = '';
    if (!S.rules.length) rl.innerHTML = '<li class="muted">Chưa có.</li>';
    S.rules.slice().sort().forEach((id) => {
      const r = STORY.rules[id];
      const n = r.sources[0] === '?' ? 0 : r.sources.length;
      const conf = n >= 3 ? 'cao' : n === 2 ? 'vua' : 'thap';
      const li = document.createElement('li');
      li.innerHTML = `<b>${id}</b> ${esc(r.text)}<span class="src conf-${conf}">${n ? n + ' phiếu xác nhận (căn ' + r.sources.join(', ') + ')' : 'Không rõ nguồn'}${r.note ? ' · ' + esc(r.note) : ''}</span>`;
      rl.appendChild(li);
    });
    const cl = $('#journal-clues'); cl.innerHTML = '';
    if (!S.clues.length) cl.innerHTML = '<li class="muted">Chưa có.</li>';
    S.clues.forEach((c) => { const li = document.createElement('li'); li.textContent = c; if (c.startsWith('(Hiếm)')) li.className = 'rare'; cl.appendChild(li); });
  }

  /* ---------- Thông báo nổi ---------- */
  function toast(msg, kind) {
    const t = document.createElement('div');
    t.className = 'toast ' + (kind || ''); t.textContent = msg;
    const box = $('#toasts'); box.appendChild(t);
    while (box.children.length > 4) box.firstChild.remove();
    setTimeout(() => t.classList.add('out'), 2600);
    setTimeout(() => t.remove(), 3200);
  }
  function showDeltas(list) {
    list.forEach(({ k, d }) => {
      if (!d) return;
      const good = (k === 'DN') ? d < 0 : d > 0;
      toast(`${LABEL[k]} ${d > 0 ? '+' : ''}${d}`, good ? 'up' : 'down');
    });
  }

  /* ---------- Hiển thị cảnh ---------- */
  const sceneText = (sc) => (typeof sc.text === 'function' ? sc.text(S) : (sc.text || []));

  let typeToken = 0, activeSkip = null;
  function typeParagraphs(container, paras, done) {
    clearTimeout(typingTimer);
    if (activeSkip) container.removeEventListener('click', activeSkip);
    const token = ++typeToken;
    container.innerHTML = '';
    let i = 0, finished = false;
    const alive = () => token === typeToken;
    const finish = () => {
      if (finished || !alive()) return;
      finished = true; container.removeEventListener('click', skip); activeSkip = null; done();
    };
    function addP(txt, instant) {
      if (!alive()) return;
      const p = document.createElement('p'); p.textContent = txt; container.appendChild(p);
      if (instant) p.classList.add('in'); else requestAnimationFrame(() => p.classList.add('in'));
    }
    function skip() {
      if (!alive()) return;
      clearTimeout(typingTimer);
      container.querySelectorAll('p').forEach((p) => p.classList.add('in'));
      while (i < paras.length) addP(paras[i++], true);
      finish();
    }
    function step() {
      if (!alive()) return;
      if (i >= paras.length) { finish(); return; }
      addP(paras[i++]);
      typingTimer = setTimeout(step, reduceMotion ? 0 : 650);
    }
    activeSkip = skip;
    container.addEventListener('click', skip);
    step();
  }

  function go(id) {
    const sc = STORY.scenes[id];
    if (!sc) { console.error('Không tìm thấy cảnh', id); return; }
    stopTimer();
    S.scene = id; S.path.push(id);
    if (sc.time) S.time = sc.time;
    if (sc.act) {
      S.act = sc.act;
      const n = parseInt((sc.act.match(/Màn (\d+)/) || [])[1], 10);
      if (n) { const ch = read(CH_KEY) || {}; const snap = clone(S); snap.path = []; ch[n] = snap; store(CH_KEY, ch); }
    }
    $('#game-act').textContent = S.act || STORY.meta.act;
    if (sc.checkpoint) checkpoint = clone(S);
    applyGain(sc.gain);
    renderHUD();
    save();
    stage3D(id, sc);

    const stage = $('#stage');
    stage.className = 'stage' + (sc.danger ? ' danger' : '') + (sc.type ? ' t-' + sc.type : '');
    stage.scrollTop = 0;
    $('#scene-time').textContent = sc.time || '';
    $('#scene-title').textContent = sc.title || '';
    $('#puzzle').innerHTML = '';
    $('#choices').innerHTML = '';
    $('#timer').hidden = true;

    if (sc.type === 'ending') return renderEnding(id, sc);
    if (sc.type === 'actend') return renderActEnd(sc);

    typeParagraphs($('#text'), sceneText(sc), () => {
      if (S.scene !== id) return;
      if (sc.type === 'puzzle') renderPuzzle(sc); else renderChoices(sc.choices || []);
      if (sc.timer) startTimer(sc.timer);
    });
  }

  /* ---------- Đồng hồ đếm ngược ---------- */
  function startTimer(tm) {
    stopTimer();
    if (storyMode()) return;
    const owner = S.scene;
    const box = $('#timer'), bar = $('#timer-bar'), lbl = $('#timer-label');
    box.hidden = false;
    let left = tm.sec * 1000, last = performance.now(), warned = false;
    lbl.textContent = (tm.label || 'Còn') + ' · ' + tm.sec + ' giây';
    countdown = setInterval(() => {
      if (S.scene !== owner) { stopTimer(); return; }
      const now = performance.now(), dt = now - last; last = now;
      if (document.hidden || document.querySelector('dialog[open]') || document.body.classList.contains('view-only')) return;
      left -= dt;
      const pct = Math.max(0, left / (tm.sec * 1000));
      bar.style.width = (pct * 100) + '%';
      lbl.textContent = (tm.label || 'Còn') + ' · ' + Math.ceil(Math.max(0, left) / 1000) + ' giây';
      box.classList.toggle('urgent', pct < 0.3);
      if (pct < 0.3 && !warned) { warned = true; sfx('heart'); }
      if (left <= 0) { stopTimer(); sfx('sting'); proceedTo(tm.next); }
    }, 100);
  }
  function stopTimer() { if (countdown) clearInterval(countdown); countdown = null; const b = $('#timer'); if (b) { b.classList.remove('urgent'); b.hidden = true; } }

  /* ---------- Dàn dựng 3D + âm thanh ---------- */
  let lastView = 'exterior';
  const VIEW_NAMES = { room509: 'Căn 509 · tầng 5', exterior: 'Sân nhà B4', room304: 'Căn 304 · tầng 3', room207: 'Căn 207 · tầng 2', stair: 'Cầu thang', corridor: 'Hành lang tầng 4', room405: 'Căn 405 · tầng 4', corridor5: 'Hành lang tầng 5', room502: 'Căn 502 · tầng 5', room301: 'Căn 301 · tầng 3' };
  function stage3D(id, sc) {
    let st = (STORY.staging && STORY.staging[id]) || null;
    if (st && typeof st.tablet === 'function') st = Object.assign({}, st, { tablet: st.tablet(S) });
    if (st && typeof st.fx === 'function') st = Object.assign({}, st, { fx: st.fx(S) });
    if (st && st.sfx) st.sfx.forEach((n, i) => setTimeout(() => sfx(n), i * 350));
    if (window.SFX && SFX.setMood) {
      const fxs = (st && st.fx) || [];
      SFX.setMood(fxs.includes('sunrise') || fxs.includes('dawn') ? 'dawn' : /Màn 3/.test(S.act || '') ? 'tense' : 'night');
    }
    if (sc.type === 'ending') sfx('sting');
    if (!window.Scene3D || !Scene3D.ok) return;
    Scene3D.setStats(S);
    Scene3D.show(st || {}, sc.type === 'ending');
    if (st && st.view) lastView = st.view;
    $('#location').textContent = (sc.time ? sc.time + ' · ' : '') + (VIEW_NAMES[lastView] || '');
  }

  function renderChoices(choices) {
    const box = $('#choices'); box.innerHTML = '';
    choices.forEach((c) => {
      if (c.cond && !c.cond(S)) return;
      const b = document.createElement('button');
      b.className = 'choice';
      b.innerHTML = (c.key ? `<span class="key">${c.key}</span>` : '') + `<span class="ct">${esc(c.text)}</span>` + (c.hint ? `<span class="hint">${esc(c.hint)}</span>` : '');
      b.addEventListener('click', () => choose(c));
      box.appendChild(b);
    });
    const first = box.querySelector('button');
    if (first) first.focus({ preventScroll: true });
  }

  function choose(c) {
    stopTimer(); sfx('click');
    if (c.flags) Object.assign(S.flags, c.flags);
    showDeltas(applyEffects(c.effects));
    proceedTo(typeof c.next === 'function' ? c.next(S) : c.next);
  }

  function proceedTo(next) {
    const target = STORY.scenes[next];
    if (target && target.effects) showDeltas(applyEffects(target.effects));
    if (target && target.flags) Object.assign(S.flags, target.flags);
    const fail = statFail();
    if (fail && (!target || target.type !== 'ending')) { go(fail); return; }
    go(next);
  }

  /* ---------- Mini-game bản vẽ ---------- */
  function renderPuzzle(sc) {
    const box = $('#puzzle');
    box.innerHTML = `<div class="blueprint">${sc.svg}</div><div class="inspect" id="inspect" aria-live="polite">Chạm vào một ký hiệu để xem.</div>`;
    box.querySelectorAll('.hit').forEach((el) => {
      el.setAttribute('tabindex', '0'); el.setAttribute('role', 'button');
      const show = () => {
        box.querySelectorAll('.hit').forEach((h) => h.classList.remove('sel'));
        el.classList.add('sel'); sfx('click');
        $('#inspect').textContent = sc.inspect[el.dataset.id] || '';
      };
      el.addEventListener('click', show);
      el.addEventListener('keydown', (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); show(); } });
    });
    renderChoices(sc.answers.map((a) => ({ text: a.text, next: a.next })));
  }

  /* ---------- Kết thúc thất bại ---------- */
  function renderEnding(id, sc) {
    const isNew = unlockEnding(id);
    document.body.classList.add('dead');
    setTimeout(() => document.body.classList.remove('dead'), 1400);
    $('#scene-time').textContent = 'Kết thúc thất bại' + (isNew ? ' · mới mở khóa' : '');
    typeParagraphs($('#text'), sc.text, () => {
      const total = STORY.endingsList.length, got = Object.keys(read(END_KEY) || {}).length;
      const note = document.createElement('p'); note.className = 'collect';
      note.innerHTML = `${window.EndingIcon ? EndingIcon(id) : ''}<span>Bộ sưu tập kết thúc: ${got}/${total}</span>`;
      $('#text').appendChild(note); note.classList.add('in');
      const box = $('#choices');
      box.append(
        btn('Thử lại từ nút gần nhất', () => { if (checkpoint) { S = clone(checkpoint); S.path.pop(); go(S.scene); } else restart(); }),
        btn('Chia sẻ kết thúc này', () => shareEnding(sc.title)),
        btn('Về màn hình chính', openMenu, 'ghost')
      );
      box.querySelector('button').focus({ preventScroll: true });
    });
  }

  function shareEnding(title) {
    const got = Object.keys(read(END_KEY) || {}).length;
    const url = CFG.gameUrl || location.href;
    const text = `Mình vừa mở kết thúc “${title}” trong Kiểm Đếm Ca Đêm · Nhà B4 (${got}/${STORY.endingsList.length} kết thúc). Bạn sẽ đứng ở đâu lúc 5 giờ sáng?`;
    if (navigator.share) { navigator.share({ title: 'Kiểm Đếm Ca Đêm', text, url }).catch(() => {}); return; }
    try { navigator.clipboard.writeText(text + ' ' + url).then(() => toast('Đã chép lời mời, dán vào nơi bạn muốn chia sẻ', 'up'), () => toast(url, 'clue')); } catch (e) { toast(url, 'clue'); }
  }

  function btn(text, fn, cls) {
    const b = document.createElement('button');
    b.className = 'choice' + (cls ? ' ' + cls : '');
    b.innerHTML = `<span class="ct">${esc(text)}</span>`;
    b.addEventListener('click', () => { sfx('click'); fn(); });
    return b;
  }

  /* ---------- Hết màn: tổng kết, cảm ơn, mời cà phê ---------- */
  function renderActEnd(sc) {
    const endId = (sc.endOf || STORY.actEndingOf)(S);
    const isNew = unlockEnding(endId);
    const endInfo = STORY.endingsList.find((e) => e.id === endId);
    const allClues = new Set(); Object.values(STORY.scenes).forEach((x) => (x.gain && x.gain.clues || []).forEach((c) => allClues.add(c)));
    const got = Object.keys(read(END_KEY) || {}).length;
    $('#scene-time').textContent = sc.time || S.time || '';
    $('#text').innerHTML = `
      <div class="summary">
        <p class="endname">${window.EndingIcon ? EndingIcon(endId) : ''}<span>${esc(endInfo.title)}${isNew ? ' <span class="new">mới</span>' : ''}</span></p>
        <table>
          <tr><th>Tỉnh táo</th><td>${S.TT}/100</td></tr>
          <tr><th>Tin cậy</th><td>${S.TC}/100</td></tr>
          <tr><th>Độ neo</th><td>${S.DN}/100</td></tr>
          <tr><th>Pin</th><td>${S.PIN}/6 nấc</td></tr>
          <tr><th>Luật đã thu</th><td>${S.rules.length}/${Object.keys(STORY.rules).length}</td></tr>
          <tr><th>Manh mối</th><td>${S.clues.length}/${allClues.size}</td></tr>
          <tr><th>Bộ sưu tập kết thúc</th><td>${got}/${STORY.endingsList.length}</td></tr>
        </table>
        <p class="teaser"><b>${sc.nextScene ? 'Tiếp theo' : 'Sắp ra mắt'}, ${esc(sc.next)}:</b> ${esc(sc.teaser || '')}</p>
        <div class="thanks">
          <h3>Cảm ơn bạn đã đọc đến đây</h3>
          <p>Mỗi lựa chọn của bạn đêm nay sẽ theo bạn sang các màn sau. ${sc.nextScene ? '' : 'Màn tiếp theo đang được viết. '} Còn ${allClues.size - S.clues.length} manh mối và ${STORY.endingsList.length - got} kết thúc bạn chưa thấy, chơi lại để tìm nhé.</p>
          <p>Nếu thấy hay, bạn có thể mời mình một ly cà phê để mình có thêm động lực viết tiếp.</p>
          ${(CFG.coffee && CFG.coffee.qr) ? `<button class="qr-thumb" id="qr-thumb" aria-label="Mở mã QR mời cà phê"><img src="${esc(CFG.coffee.qr)}" alt="Mã QR mời cà phê"><span>Quét mã để mời cà phê${CFG.author ? ' · ' + esc(CFG.author) : ''}</span></button>` : ''}
        </div>
      </div>`;
    if (sc.final) {
      $('#scene-title').textContent = 'Cảm ơn bạn đã đi cùng nhà B4 đến cuối';
      const teaser = $('#text .teaser');
      if (teaser) teaser.innerHTML = `<b>Hết · Kiểm Đếm Ca Đêm.</b> ${esc(sc.teaser || '')} Mùa 2 có ra mắt hay không là nhờ bạn: hãy để lại một dòng góp ý.`;
      const th = $('#text .thanks h3'); if (th) th.textContent = 'Lời cảm ơn';
      const tp = $('#text .thanks p'); if (tp) tp.textContent = `Bạn đã đi hết một đêm cùng Thục Anh, Út Thơ, anh Phát, chị Trâm và ông Kha. Còn ${allClues.size - S.clues.length} manh mối và ${STORY.endingsList.length - got} kết thúc bạn chưa thấy: dùng Chọn màn để thử lại từ bất kỳ màn nào.`;
      $('#choices').append(
        btn('✍️ Góp ý, nhận xét cho tác giả', () => openDialog('dlg-feedback')),
        btn('🔔 Đăng ký nhận câu chuyện tiếp theo', () => openDialog('dlg-subscribe')),
        btn('☕ Mời mình cà phê', () => openDialog('dlg-coffee')),
        btn('Chia sẻ kết thúc của bạn', () => shareEnding(endInfo.title)),
        btn('Chọn màn để thử nhánh khác', () => openDialog('dlg-chapters')),
        btn('Về màn hình chính', openMenu, 'ghost')
      );
      $('#choices').firstChild.classList.add('primary');
      $('#choices').firstChild.focus({ preventScroll: true });
      const qt2 = $('#qr-thumb'); if (qt2) qt2.addEventListener('click', () => openDialog('dlg-coffee'));
      return;
    }
    const qt = $('#qr-thumb'); if (qt) qt.addEventListener('click', () => openDialog('dlg-coffee'));
    const box = $('#choices');
    if (sc.nextScene) {
      const nb = btn('Sang ' + sc.next + ' ▶', () => { checkpoint = clone(S); go(sc.nextScene); });
      nb.classList.add('primary'); box.append(nb);
    }
    box.append(btn('☕ Mời mình cà phê', () => openDialog('dlg-coffee')), btn('Chia sẻ kết thúc này', () => shareEnding(endInfo.title)), btn('Chơi lại từ đầu để tìm nhánh khác', restart), btn('Về màn hình chính', openMenu, 'ghost'));
    box.querySelector('button').focus({ preventScroll: true });
  }

  /* ---------- Màn hình chính và các hộp thông tin ---------- */
  function openMenu() {
    stopTimer();
    document.body.classList.add('in-menu');
    const saved = read(SAVE_KEY);
    const ssc = saved && saved.S && STORY.scenes[saved.S.scene];
    const canContinue = ssc && ssc.type !== 'ending' && !(ssc.type === 'actend' && !ssc.nextScene) && saved.S.scene !== (STORY.start || 'intro');
    $('#btn-continue').hidden = !canContinue;
    const got = Object.keys(read(END_KEY) || {}).length;
    $('#endings-count').textContent = `${got}/${STORY.endingsList.length}`;
    const fc = $('#facts-endings'); if (fc) fc.textContent = STORY.endingsList.length + ' kết thúc để sưu tầm';
    if (window.Scene3D && Scene3D.ok) Scene3D.show(STORY.staging.menu, false);
    $('#location').textContent = '';
  }
  function closeMenu() { document.body.classList.remove('in-menu'); }

  function openDialog(id) {
    if (id === 'dlg-endings') renderEndings();
    if (id === 'dlg-coffee') renderCoffee();
    if (id === 'dlg-chapters') renderChapters();
    if (id === 'dlg-feedback') renderFeedback();
    if (id === 'dlg-subscribe') renderSubscribe();
    $('#' + id).showModal();
  }

  /* ---------- Chọn màn ---------- */
  function renderChapters() {
    const ch = read(CH_KEY) || {};
    const ul = $('#chapters-list'); ul.innerHTML = '';
    ACTS.forEach((a) => {
      const li = document.createElement('li');
      const open = !!ch[a.n];
      li.className = open ? '' : 'locked';
      li.innerHTML = `<div><b>${esc(a.name)}</b><small>${esc(a.time)}${open ? '' : ' · chưa mở'}</small></div>`;
      if (open) {
        const b = document.createElement('button'); b.textContent = 'Chơi từ đây';
        b.addEventListener('click', () => { $('#dlg-chapters').close(); playChapter(a.n); });
        li.appendChild(b);
      }
      ul.appendChild(li);
    });
  }
  function playChapter(n) {
    const ch = read(CH_KEY) || {};
    if (!ch[n]) return;
    S = clone(ch[n]); checkpoint = clone(S); S.path = [];
    closeMenu();
    go(S.scene || ACTS[n - 1].scene());
  }

  /* ---------- Góp ý ---------- */
  let fbStars = 0;
  function feedbackBody() {
    const got = read(END_KEY) || {};
    const names = STORY.endingsList.filter((e) => got[e.id]).map((e) => e.title);
    return [
      `Điểm: ${fbStars ? '★'.repeat(fbStars) + '☆'.repeat(5 - fbStars) + ' (' + fbStars + '/5)' : 'chưa chấm'}`,
      `Nhân vật nhớ nhất: ${$('#fb-char').value || '-'}`,
      `Đoạn nhớ nhất: ${$('#fb-moment').value.trim() || '-'}`,
      '',
      'Góp ý / ý tưởng:',
      $('#fb-text').value.trim() || '-',
      '',
      `Muốn nhận câu chuyện tiếp theo: ${$('#fb-sub').checked ? 'Có' : 'Không'}`,
      '',
      '---',
      `Phiên bản: v${STORY.meta.version} · Đang ở: ${(S && S.act) || '-'} · Kết thúc đã mở: ${names.length}/${STORY.endingsList.length}`,
      names.length ? 'Đã mở: ' + names.join('; ') : ''
    ].join('\n');
  }
  function updateFeedbackLinks() {
    const body = feedbackBody();
    const title = '[Góp ý] ' + (fbStars ? fbStars + '★ ' : '') + ($('#fb-moment').value.trim().slice(0, 50) || 'Kiểm Đếm Ca Đêm');
    const gh = $('#fb-gh');
    if (gh) gh.href = `${CFG.repoUrl}/issues/new?labels=gop-y&title=${encodeURIComponent(title)}&body=${encodeURIComponent(body)}`;
    const em = $('#fb-email');
    if (em) em.href = `mailto:${CFG.feedback.email}?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(body)}`;
  }
  function renderFeedback() {
    const st = $('#fb-stars'); st.innerHTML = '';
    for (let i = 1; i <= 5; i++) {
      const b = document.createElement('button');
      b.type = 'button'; b.textContent = '★'; b.setAttribute('role', 'radio'); b.setAttribute('aria-label', i + ' sao');
      b.setAttribute('aria-checked', String(i === fbStars)); b.className = i <= fbStars ? 'on' : '';
      b.addEventListener('click', () => { fbStars = i; renderFeedback(); });
      st.appendChild(b);
    }
    const fb = CFG.feedback || {};
    const act = $('#fb-actions'); act.innerHTML = '';
    if (fb.github && CFG.repoUrl) act.insertAdjacentHTML('beforeend', '<a id="fb-gh" target="_blank" rel="noopener">Gửi qua GitHub</a>');
    if (fb.email) act.insertAdjacentHTML('beforeend', '<a id="fb-email">Gửi email</a>');
    if (fb.formUrl) act.insertAdjacentHTML('beforeend', `<a href="${esc(fb.formUrl)}" target="_blank" rel="noopener">Mở biểu mẫu góp ý</a>`);
    const cp = document.createElement('button'); cp.type = 'button'; cp.className = 'ghostbtn'; cp.textContent = 'Chép nội dung';
    cp.addEventListener('click', () => {
      try { navigator.clipboard.writeText(feedbackBody()).then(() => toast('Đã chép góp ý. Bạn có thể dán vào tin nhắn gửi tác giả.', 'up'), () => toast('Không chép được, bạn chép tay giúp mình nhé', 'down')); } catch (e) { toast('Không chép được, bạn chép tay giúp mình nhé', 'down'); }
    });
    act.appendChild(cp);
    ['#fb-char', '#fb-moment', '#fb-text', '#fb-sub'].forEach((q) => { const el = $(q); el.oninput = updateFeedbackLinks; el.onchange = updateFeedbackLinks; });
    updateFeedbackLinks();
  }

  /* ---------- Đăng ký nhận truyện mới ---------- */
  function renderSubscribe() {
    const sub = CFG.subscribe || {};
    const items = [];
    if (sub.issueUrl) items.push(`<li><b>Theo dõi trên GitHub</b><p>Mở trang đăng ký, bấm <i>Subscribe</i> ở cột bên phải. Mỗi khi có màn mới, bạn sẽ nhận thông báo qua email của tài khoản GitHub.</p><a href="${esc(sub.issueUrl)}" target="_blank" rel="noopener">Mở trang đăng ký</a></li>`);
    if (CFG.repoUrl) items.push(`<li><b>Theo dõi kho truyện</b><p>Bấm <i>Watch → Custom → Releases</i> để nhận thông báo mỗi khi phát hành phiên bản mới, hoặc bấm <i>Star</i> để lưu lại.</p><a href="${esc(CFG.repoUrl)}" target="_blank" rel="noopener">Mở kho GitHub</a></li>`);
    (sub.links || []).filter((l) => l && l.url).forEach((l) => items.push(`<li><b>${esc(l.label)}</b><p></p><a href="${esc(l.url)}" target="_blank" rel="noopener">Mở</a></li>`));
    items.push('<li><b>Gửi góp ý kèm lời nhắn “muốn nhận truyện mới”</b><p>Tác giả đọc mọi góp ý và trả lời ngay trong đó khi có màn mới.</p><button type="button" id="sub-fb">Viết góp ý</button></li>');
    items.push(`<li><b>Rủ thêm một người bạn</b><p>Câu chuyện sống được nhờ người đọc.</p><button type="button" id="sub-share">Chép đường dẫn game</button></li>`);
    $('#sub-list').innerHTML = items.join('');
    $('#sub-fb').addEventListener('click', () => { $('#dlg-subscribe').close(); $('#fb-sub').checked = true; openDialog('dlg-feedback'); });
    $('#sub-share').addEventListener('click', () => {
      const url = CFG.gameUrl || location.href;
      try { navigator.clipboard.writeText(url).then(() => toast('Đã chép đường dẫn game', 'up'), () => toast(url, 'clue')); } catch (e) { toast(url, 'clue'); }
    });
  }

  function renderEndings() {
    const got = read(END_KEY) || {};
    $('#endings-grid').innerHTML = STORY.endingsList.map((e) => `
      <li class="${got[e.id] ? 'got' : 'locked'} ${e.kind}">
        ${got[e.id] && window.EndingIcon ? EndingIcon(e.id) : '<svg class="eicon" viewBox="0 0 64 64" aria-hidden="true"><text x="32" y="42" text-anchor="middle" font-size="30" fill="currentColor">?</text></svg>'}
        <b>${got[e.id] ? esc(e.title) : '???'}</b>
        <span>${e.act === 4 && e.kind === 'act' ? 'Kết cuối' : e.kind === 'act' ? 'Kết màn' : 'Kết thúc thất bại'} · Màn ${e.act || 1}</span>
        <small>${esc(e.hint)}</small>
      </li>`).join('');
  }

  function renderCoffee() {
    const c = CFG.coffee || {};
    const links = (c.links || []).filter((l) => l && l.url);
    const bank = c.bank || {};
    let html = `<p>${esc(c.message || 'Cảm ơn bạn đã ủng hộ!')}</p>`;
    if (c.qr) html += `<img class="qr" src="${esc(c.qr)}" alt="Mã QR mời cà phê">`;
    if (bank.number) html += `<div class="bank"><div><span>Ngân hàng</span><b>${esc(bank.name || '')}</b></div><div><span>Số tài khoản</span><b>${esc(bank.number)}</b> <button class="tool" id="copy-bank">Chép</button></div><div><span>Chủ tài khoản</span><b>${esc(bank.owner || '')}</b></div>${bank.note ? `<div><span>Nội dung</span><b>${esc(bank.note)}</b></div>` : ''}</div>`;
    if (links.length) html += `<p class="links">${links.map((l) => `<a href="${esc(l.url)}" target="_blank" rel="noopener">${esc(l.label)}</a>`).join('')}</p>`;
    if (!c.qr && !bank.number && !links.length) html += '<p class="muted">Tác giả đang cập nhật thông tin mời cà phê. Cảm ơn tấm lòng của bạn!</p>';
    $('#coffee-body').innerHTML = html;
    const cb = $('#copy-bank');
    if (cb) cb.addEventListener('click', () => {
      try { navigator.clipboard.writeText(bank.number).then(() => toast('Đã chép số tài khoản', 'up'), () => toast('Không chép được, bạn chép tay giúp mình nhé', 'down')); } catch (e) { toast('Không chép được, bạn chép tay giúp mình nhé', 'down'); }
    });
  }

  function restart() {
    drop(SAVE_KEY);
    S = newState(); checkpoint = null;
    const ch = read(CH_KEY) || {}; ch[1] = clone(S); store(CH_KEY, ch);
    closeMenu();
    go(S.scene);
  }
  function continueGame() {
    const saved = read(SAVE_KEY);
    if (!saved || !saved.S) return restart();
    S = saved.S; checkpoint = saved.checkpoint;
    S.path.pop();
    closeMenu();
    go(S.scene);
  }

  /* ---------- Khởi động ---------- */
  function init() {
    if (window.Scene3D) Scene3D.init();
    const v = STORY.meta.version;
    $('#game-act').textContent = STORY.meta.act;
    document.querySelectorAll('.version').forEach((el) => { el.textContent = 'v' + v; });
    if (CFG.author) document.querySelectorAll('.author').forEach((el) => { el.textContent = CFG.author; });
    else document.querySelectorAll('.author-line').forEach((el) => { el.hidden = true; });

    const unlockAudio = () => { if (window.SFX) SFX.unlock(); };
    document.addEventListener('pointerdown', unlockAudio, { once: true });
    $('#btn-start').addEventListener('click', () => { unlockAudio(); sfx('click'); restart(); });
    $('#btn-continue').addEventListener('click', () => { unlockAudio(); sfx('click'); continueGame(); });
    document.querySelectorAll('[data-open]').forEach((b) => b.addEventListener('click', () => { sfx('click'); openDialog(b.dataset.open); }));
    document.querySelectorAll('dialog .close').forEach((b) => b.addEventListener('click', () => b.closest('dialog').close()));
    $('#btn-journal').addEventListener('click', () => { renderJournal(); $('#journal').showModal(); });
    $('#btn-menu').addEventListener('click', openMenu);
    $('#btn-hide').addEventListener('click', () => {
      const on = document.body.classList.toggle('view-only');
      $('#btn-hide').setAttribute('aria-pressed', on ? 'true' : 'false');
      $('#btn-hide').textContent = on ? 'Hiện chữ' : 'Xem cảnh';
    });
    const audioBtn = $('#btn-audio');
    const syncAudio = () => { const m = window.SFX && SFX.isMuted(); audioBtn.textContent = m ? '♪ Tắt' : '♪ Bật'; audioBtn.setAttribute('aria-pressed', m ? 'false' : 'true'); };
    audioBtn.addEventListener('click', () => { unlockAudio(); if (window.SFX) SFX.setMuted(!SFX.isMuted()); syncAudio(); });
    syncAudio();

    // Chế độ đọc truyện
    const smBtn = $('#btn-story');
    const syncStory = () => {
      smBtn.setAttribute('aria-pressed', storyMode() ? 'true' : 'false');
      smBtn.querySelector('b').textContent = storyMode() ? 'Bật' : 'Tắt';
      document.body.classList.toggle('story-mode', storyMode());
      $('#game-act').dataset.mode = storyMode() ? ' · Chế độ đọc' : '';
    };
    smBtn.addEventListener('click', () => { settings.story = !settings.story; store(SET_KEY, settings); syncStory(); sfx('click'); });
    syncStory();

    // Phím tắt: 1–4 hoặc A–D chọn, J sổ tay, H ẩn chữ, M âm thanh, Space/Enter hiện hết chữ
    document.addEventListener('keydown', (e) => {
      if (e.ctrlKey || e.metaKey || e.altKey) return;
      const tag = (e.target.tagName || '').toLowerCase();
      if (tag === 'input' || tag === 'textarea' || tag === 'select') return;
      if (document.querySelector('dialog[open]') || document.body.classList.contains('in-menu')) return;
      const k = e.key.toLowerCase();
      const idx = '1234'.indexOf(k) >= 0 ? '1234'.indexOf(k) : 'abcd'.indexOf(k);
      if (idx >= 0) { const b = document.querySelectorAll('#choices button')[idx]; if (b) { e.preventDefault(); b.click(); } return; }
      if (k === 'j') { e.preventDefault(); $('#btn-journal').click(); }
      else if (k === 'h') { e.preventDefault(); $('#btn-hide').click(); }
      else if (k === 'm') { e.preventDefault(); audioBtn.click(); }
      else if ((k === ' ' || k === 'enter') && tag !== 'button') { e.preventDefault(); $('#text').click(); }
    });
    const share = $('#btn-share');
    if (share) share.addEventListener('click', () => {
      const url = CFG.gameUrl || location.href;
      try { navigator.clipboard.writeText(url).then(() => toast('Đã chép đường dẫn game', 'up'), () => toast(url, 'clue')); } catch (e) { toast(url, 'clue'); }
    });

    // Chờ font tiếng Việt rồi mới dựng cảnh (chữ trên biển hiệu 3D dùng font này)
    const fontsReady = (document.fonts && document.fonts.load)
      ? Promise.all(['700 40px "Be Vietnam Pro"', '600 40px "Be Vietnam Pro"', '400 18px "Noto Serif"', '400 18px "Roboto Mono"'].map((f) => document.fonts.load(f)))
      : Promise.resolve();
    Promise.race([fontsReady, new Promise((r) => setTimeout(r, 2500))]).then(openMenu, openMenu);
  }

  window.KDCD = { getState: () => S, go, restart, openMenu };
  document.addEventListener('DOMContentLoaded', init);
})();
