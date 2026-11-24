// Kiểm tra toàn bộ truyện: cảnh thiếu, cảnh không tới được, và mô phỏng mọi nhánh
// (gộp các trạng thái trùng nhau để không bùng nổ tổ hợp).
// Dùng: node tools/check.js js/story-act1.js js/story-act2.js js/story-act3.js
const fs = require('fs'), vm = require('vm');
const ctx = {}; ctx.window = ctx; vm.createContext(ctx);
process.argv.slice(2).forEach((f) => vm.runInContext(fs.readFileSync(f, 'utf8'), ctx));
const ST = ctx.STORY, sc = ST.scenes; let err = 0;
const LIM = { TT: [0, 100], TC: [0, 100], DN: [0, 100], PIN: [0, 6] };
const nextsOf = (s, S) => {
  const out = [];
  (s.choices || []).concat(s.answers || []).forEach((c) => {
    if (typeof c.next === 'function') out.push(...(S ? [c.next(S)] : [c.next({ TC: 100, flags: {} }), c.next({ TC: 0, flags: {} }), c.next({ TC: 100, flags: { ke_me: true, tra_bong: true } })]));
    else out.push(c.next);
  });
  if (s.timer) out.push(s.timer.next);
  if (s.nextScene) out.push(s.nextScene);
  return out;
};
// 1. tham chiếu
for (const [id, s] of Object.entries(sc)) {
  for (const n of nextsOf(s)) if (!sc[n]) { console.log('THIẾU CẢNH', id, '->', n); err++; }
  (s.gain && s.gain.rules || []).forEach((r) => { if (!ST.rules[r]) { console.log('LUẬT LẠ', r); err++; } });
}
const START = ST.start || 'intro';
const seen = new Set([...Object.values(ST.statEndings)]), q = [START];
while (q.length) { const i = q.pop(); if (seen.has(i)) continue; seen.add(i); nextsOf(sc[i]).forEach((n) => q.push(n)); }
for (const id in sc) if (!seen.has(id)) { console.log('KHÔNG TỚI ĐƯỢC', id); err++; }
for (const id in sc) if (sc[id].type === 'ending' && !ST.endingsList.some((e) => e.id === id)) { console.log('KẾT THÚC CHƯA LIỆT KÊ', id); err++; }
for (const id in (ST.staging || {})) if (!sc[id] && id !== 'menu') { console.log('DÀN DỰNG CHO CẢNH KHÔNG CÓ', id); err++; }
// 2. mô phỏng có gộp trạng thái
const clamp = (k, v) => Math.max(LIM[k][0], Math.min(LIM[k][1], v));
const key = (id, S) => id + '|' + S.TT + ',' + S.TC + ',' + S.DN + ',' + S.PIN + '|' + Object.keys(S.flags).filter((f) => S.flags[f]).sort().join('.') + '|' + (S.ends || []).join('.');
const visited = new Set(); const endCount = {}; const actEnds = {}; const finals = [];
const stack = [[START, { TT: 70, TC: 50, DN: 0, PIN: 6, flags: {}, ends: [] }]];
let states = 0;
while (stack.length) {
  const [id, S] = stack.pop(); const k = key(id, S);
  if (visited.has(k)) continue; visited.add(k); states++;
  const s = sc[id];
  if (s.type === 'ending') { endCount[id] = (endCount[id] || 0) + 1; continue; }
  if (s.type === 'actend') {
    const e = (s.endOf || ST.actEndingOf)(S); actEnds[e] = (actEnds[e] || 0) + 1;
    if (s.nextScene) { stack.push([s.nextScene, { ...S, flags: { ...S.flags }, ends: S.ends.concat(e) }]); continue; }
    finals.push(S); endCount[id] = (endCount[id] || 0) + 1; continue;
  }
  const opts = (s.choices || s.answers || []).concat(s.timer ? [{ next: s.timer.next }] : []);
  for (const c of opts) {
    const T = { ...S, flags: { ...S.flags }, ends: S.ends.slice() };
    if (c.flags) Object.assign(T.flags, c.flags);
    let n = typeof c.next === 'function' ? c.next(T) : c.next; const t = sc[n];
    if (t.effects) for (const kk in t.effects) T[kk] = clamp(kk, T[kk] + t.effects[kk]);
    if (t.flags) Object.assign(T.flags, t.flags);
    const f = T.DN >= 60 ? ST.statEndings.DN : T.TT <= 0 ? ST.statEndings.TT : T.PIN <= 0 ? ST.statEndings.PIN : null;
    if (f && t.type !== 'ending') n = f;
    stack.push([n, T]);
  }
}
const rng = (k) => finals.reduce((a, S) => [Math.min(a[0], S[k]), Math.max(a[1], S[k])], [999, -999]);
console.log('Trạng thái khác nhau đã duyệt:', states);
console.log('Kết thúc chạm tới (số trạng thái):', endCount);
console.log('Kết màn:', actEnds);
console.log('Chỉ số ở cuối màn cuối  TT', rng('TT'), 'TC', rng('TC'), 'DN', rng('DN'), 'PIN', rng('PIN'));
const allClues = new Set(); Object.values(sc).forEach((x) => (x.gain && x.gain.clues || []).forEach((c) => allClues.add(c)));
const listed = ST.endingsList.map((e) => e.id), reached = Object.keys(endCount).concat(Object.keys(actEnds));
console.log('Manh mối:', allClues.size, '· Luật:', Object.keys(ST.rules).length, '· Kết thúc liệt kê:', listed.length);
console.log('Kết thúc liệt kê nhưng chưa tới được:', listed.filter((e) => !reached.includes(e)));
console.log('Lỗi:', err);
