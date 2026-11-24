/* =========================================================
   Scene3D – dựng bối cảnh 3D cho Kiểm Đếm Ca Đêm (Three.js r128)
   Toàn bộ mô hình được tạo bằng code (không cần file 3D ngoài):
   ngoại thất nhà B4, căn 304, căn 207, hành lang tầng 4, căn 405, cầu thang.
   API: Scene3D.init(), Scene3D.show(staging, isEnding), Scene3D.setStats(S)
   ========================================================= */
(function () {
  'use strict';
  const T = window.THREE;
  const API = { ok: false, init() {}, show() {}, setStats() {} };
  window.Scene3D = API;
  if (!T) { document.documentElement.classList.add('no3d'); return; }

  const FONT = "'Be Vietnam Pro', 'Noto Sans', Arial, sans-serif";
  const MONO = "'Roboto Mono', monospace";
  const reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  let renderer, scene, camera, clock, torch, torchTarget, ambient, redLight;
  let views = {}, cur = null, curName = '', fx = new Set(), dead = false;
  let pin = 6, sanity = 70, shake = 0, fxStart = 0, frameK = 0.17, dawnK = 0, tabMat = null, tabGroup = null, tabKey = '';
  const pointer = { x: 0, y: 0, tx: 0, ty: 0 };
  const figures = {};
  let labelLayer, fader;

  /* ---------------- tiện ích ---------------- */
  const M = (color, o = {}) => new T.MeshStandardMaterial(Object.assign({ color, roughness: 0.85, metalness: 0.05 }, o));
  const box = (w, h, d, mat) => new T.Mesh(new T.BoxGeometry(w, h, d), mat);
  const at = (o, x, y, z) => { o.position.set(x, y, z); return o; };
  function canvasTex(w, h, draw, repeat) {
    const c = document.createElement('canvas'); c.width = w; c.height = h;
    const g = c.getContext('2d'); draw(g, w, h);
    const tx = new T.CanvasTexture(c);
    tx.encoding = T.sRGBEncoding;
    tx.anisotropy = 4;
    if (repeat) { tx.wrapS = tx.wrapT = T.RepeatWrapping; tx.repeat.set(repeat[0], repeat[1]); }
    return tx;
  }
  function rnd(seed) { let s = seed; return () => (s = (s * 16807) % 2147483647) / 2147483647; }

  /* ---------------- vật liệu đặc trưng nhà tập thể ---------------- */
  // Tường vôi vàng loang ẩm
  const wallTex = () => canvasTex(512, 512, (g, w, h) => {
    g.fillStyle = '#c4a463'; g.fillRect(0, 0, w, h);
    const r = rnd(7);
    for (let i = 0; i < 900; i++) {
      g.fillStyle = `rgba(${90 + r() * 60},${70 + r() * 50},${30 + r() * 30},${r() * 0.08})`;
      g.beginPath(); g.arc(r() * w, r() * h, r() * 40, 0, 7); g.fill();
    }
    const grd = g.createLinearGradient(0, h * 0.7, 0, h);
    grd.addColorStop(0, 'rgba(60,50,30,0)'); grd.addColorStop(1, 'rgba(50,45,30,0.55)');
    g.fillStyle = grd; g.fillRect(0, 0, w, h);
    for (let i = 0; i < 8; i++) { g.fillStyle = 'rgba(235,225,200,0.5)'; g.fillRect(r() * w, r() * h, 20 + r() * 50, 8 + r() * 30); }
  }, [1, 1]);
  // Gạch hoa xi măng
  const tileTex = () => canvasTex(256, 256, (g, w) => {
    const s = w / 2;
    for (let i = 0; i < 2; i++) for (let j = 0; j < 2; j++) {
      const x = i * s, y = j * s;
      g.fillStyle = '#d9cdb4'; g.fillRect(x, y, s, s);
      g.fillStyle = '#8c2f26';
      g.beginPath(); g.moveTo(x + s / 2, y + 8); g.lineTo(x + s - 8, y + s / 2); g.lineTo(x + s / 2, y + s - 8); g.lineTo(x + 8, y + s / 2); g.fill();
      g.fillStyle = '#d9cdb4'; g.beginPath(); g.arc(x + s / 2, y + s / 2, s * 0.22, 0, 7); g.fill();
      g.fillStyle = '#3c5a4a'; g.beginPath(); g.arc(x + s / 2, y + s / 2, s * 0.1, 0, 7); g.fill();
      ['#3c5a4a'].forEach((c) => { g.fillStyle = c; [[x, y], [x + s, y], [x, y + s], [x + s, y + s]].forEach(([a, b]) => { g.beginPath(); g.arc(a, b, s * 0.16, 0, 7); g.fill(); }); });
      g.strokeStyle = 'rgba(40,30,20,0.5)'; g.lineWidth = 2; g.strokeRect(x, y, s, s);
    }
    g.fillStyle = 'rgba(30,25,15,0.18)'; g.fillRect(0, 0, w, w);
  }, [3, 3]);
  // Cửa gỗ sơn xanh + số căn + mã phấn
  function doorTex(num, chalk) {
    return canvasTex(256, 512, (g, w, h) => {
      g.fillStyle = '#41685a'; g.fillRect(0, 0, w, h);
      g.strokeStyle = '#2c4a3f'; g.lineWidth = 10;
      g.strokeRect(24, 30, w - 48, h * 0.38); g.strokeRect(24, h * 0.48, w - 48, h * 0.45);
      const r = rnd(num.length * 13);
      for (let i = 0; i < 40; i++) { g.fillStyle = `rgba(200,190,160,${r() * 0.25})`; g.fillRect(r() * w, r() * h, 4 + r() * 30, 2 + r() * 6); }
      g.fillStyle = '#d8d0b8'; g.fillRect(w / 2 - 46, 60, 92, 46);
      g.fillStyle = '#1c1c1c'; g.font = `700 34px ${FONT}`; g.textAlign = 'center'; g.fillText(num, w / 2, 96);
      if (chalk) { g.fillStyle = 'rgba(245,245,240,0.9)'; g.font = `600 30px ${FONT}`; g.fillText(chalk, w / 2, h * 0.62); }
      g.beginPath(); g.fillStyle = '#b89a4a'; g.arc(w - 40, h * 0.55, 10, 0, 7); g.fill();
    });
  }
  function textTex(lines, o = {}) {
    const w = o.w || 1024, h = o.h || 512;
    return canvasTex(w, h, (g) => {
      g.fillStyle = o.bg || '#0d1a2a'; g.fillRect(0, 0, w, h);
      if (o.border) { g.strokeStyle = o.border; g.lineWidth = 12; g.strokeRect(10, 10, w - 20, h - 20); }
      g.textAlign = 'center'; g.textBaseline = 'middle';
      lines.forEach((ln, i) => {
        g.fillStyle = ln.c || '#fff'; g.font = `${ln.wt || 700} ${ln.s || 60}px ${ln.mono ? MONO : FONT}`;
        g.fillText(ln.t, w / 2, (h / (lines.length + 1)) * (i + 1));
      });
    });
  }

  /* ---------------- nhân vật (phong cách búp bê gỗ) ---------------- */
  function figure(o) {
    const g = new T.Group();
    const skin = M(o.skin || 0xd2a37c), shirt = M(o.shirt), pants = M(o.pants || 0x2a2a2e), hair = M(o.hair || 0x1a1410);
    const legL = at(box(0.14, 0.82, 0.16, pants), -0.09, 0.41, 0);
    const legR = at(box(0.14, 0.82, 0.16, pants), 0.09, 0.41, 0);
    const torso = at(box(0.42, 0.62, 0.24, shirt), 0, 1.13, 0);
    const armL = at(box(0.1, 0.6, 0.12, shirt), -0.27, 1.1, 0);
    const armR = at(box(0.1, 0.6, 0.12, shirt), 0.27, 1.1, 0);
    const head = at(new T.Mesh(new T.SphereGeometry(0.14, 20, 16), skin), 0, 1.6, 0);
    const hairM = at(new T.Mesh(new T.SphereGeometry(0.15, 20, 12, 0, Math.PI * 2, 0, Math.PI * 0.55), hair), 0, 1.62, -0.01);
    g.add(legL, legR, torso, armL, armR, head);
    if (!o.helmet) g.add(hairM);
    const eyeM = M(0x111111, { roughness: 0.3 });
    head.add(at(new T.Mesh(new T.SphereGeometry(0.018, 8, 6), eyeM), -0.05, 0.02, 0.125), at(new T.Mesh(new T.SphereGeometry(0.018, 8, 6), eyeM), 0.05, 0.02, 0.125));
    head.add(at(box(0.05, 0.008, 0.01, M(0x6a3a2a)), 0, -0.06, 0.13));
    if (o.longHair) g.add(at(box(0.26, 0.34, 0.08, hair), 0, 1.45, -0.11));
    if (o.helmet) {
      g.add(at(new T.Mesh(new T.SphereGeometry(0.165, 20, 12, 0, Math.PI * 2, 0, Math.PI / 2), M(0xf2f2ee, { roughness: 0.4 })), 0, 1.64, 0));
      g.add(at(new T.Mesh(new T.CylinderGeometry(0.19, 0.19, 0.015, 24), M(0xf2f2ee)), 0, 1.64, 0.03));
    }
    if (o.cap) {
      g.add(at(new T.Mesh(new T.CylinderGeometry(0.15, 0.16, 0.1, 20), M(0x4b5a32)), 0, 1.74, 0));
      g.add(at(box(0.2, 0.02, 0.12, M(0x3d4a28)), 0, 1.7, 0.14));
    }
    if (o.vest) g.add(at(box(0.44, 0.4, 0.26, M(0xe5f03a, { emissive: 0x3a3c00 })), 0, 1.18, 0));
    let prop = null;
    if (o.phone) {
      prop = at(box(0.07, 0.13, 0.01, M(0x111111, { emissive: 0x88b8ff, emissiveIntensity: 1.6 })), 0.22, 1.32, 0.22);
      const pl = at(new T.PointLight(0x9fc3ff, 0.6, 2.2), 0.22, 1.35, 0.35);
      g.add(prop, pl);
      armR.rotation.x = -1.1; armR.position.set(0.25, 1.22, 0.14);
    }
    if (o.laptop) {
      prop = at(box(0.34, 0.02, 0.24, M(0x333438)), 0, 1.0, 0.25);
      const scr = at(box(0.34, 0.22, 0.01, M(0x111, { emissive: 0xbfd8ff, emissiveIntensity: 1.2 })), 0, 1.11, 0.14);
      scr.rotation.x = -0.25;
      g.add(prop, scr, at(new T.PointLight(0xbfd8ff, 0.5, 2), 0, 1.2, 0.4));
      armL.rotation.x = armR.rotation.x = -0.9; armL.position.z = armR.position.z = 0.15;
    }
    g.userData = { torso, head, armL, armR, phase: Math.random() * 6, name: o.name, headY: 1.95 };
    g.traverse((m) => { if (m.isMesh) { m.castShadow = true; } });
    return g;
  }

  function makeClock() {
    const g = new T.Group();
    const wood = M(0x5a3a22, { roughness: 0.6 });
    g.add(box(0.34, 0.7, 0.12, wood));
    const face = at(new T.Mesh(new T.CircleGeometry(0.12, 32), M(0xefe6cf, { emissive: 0x332a10 })), 0, 0.17, 0.065);
    g.add(face);
    const glass = at(box(0.24, 0.32, 0.01, M(0x223, { transparent: true, opacity: 0.35 })), 0, -0.15, 0.065);
    g.add(glass);
    const pend = new T.Group(); pend.position.set(0, 0.02, 0.07);
    pend.add(at(box(0.01, 0.26, 0.01, M(0xb8963a, { metalness: 0.8, roughness: 0.3 })), 0, -0.13, 0));
    pend.add(at(new T.Mesh(new T.CylinderGeometry(0.04, 0.04, 0.01, 20), M(0xd8b04a, { metalness: 0.9, roughness: 0.25 })), 0, -0.27, 0).rotateX(Math.PI / 2));
    g.add(pend);
    g.userData.pend = pend;
    return g;
  }

  /* ---------------- dựng phòng ---------------- */
  function room(o) {
    const g = new T.Group();
    const wallM = M(0xffffff, { map: wallTex() });
    const floorM = M(0xffffff, { map: tileTex(), roughness: 0.7 });
    floorM.map.repeat.set(o.w / 0.8, o.d / 0.8);
    const floor = new T.Mesh(new T.PlaneGeometry(o.w, o.d), floorM);
    floor.rotation.x = -Math.PI / 2; floor.receiveShadow = true; g.add(floor);
    const ceil = new T.Mesh(new T.PlaneGeometry(o.w, o.d), M(0x8d877a));
    ceil.rotation.x = Math.PI / 2; ceil.position.y = o.h; g.add(ceil);
    const walls = {};
    const mk = (name, w, x, z, ry) => {
      const m = new T.Mesh(new T.PlaneGeometry(w, o.h), wallM);
      m.position.set(x, o.h / 2, z); m.rotation.y = ry; m.receiveShadow = true; walls[name] = m; g.add(m);
    };
    if (!o.skip || !o.skip.includes('N')) mk('N', o.w, 0, -o.d / 2, 0);
    if (!o.skip || !o.skip.includes('S')) mk('S', o.w, 0, o.d / 2, Math.PI);
    if (!o.skip || !o.skip.includes('W')) mk('W', o.d, -o.w / 2, 0, Math.PI / 2);
    if (!o.skip || !o.skip.includes('E')) mk('E', o.d, o.w / 2, 0, -Math.PI / 2);
    // chân tường sơn xanh
    const skirtM = M(0x5d7a68);
    [[o.w, 0, -o.d / 2 + 0.01, 0], [o.d, -o.w / 2 + 0.01, 0, Math.PI / 2]].forEach(([w, x, z, ry]) => {
      const s = new T.Mesh(new T.PlaneGeometry(w, 0.9), skirtM); s.position.set(x, 0.45, z); s.rotation.y = ry; g.add(s);
    });
    // bóng đèn tròn tắt
    const bulb = at(new T.Mesh(new T.SphereGeometry(0.06, 12, 10), M(0xddddcc, { emissive: 0x111100 })), 0, o.h - 0.3, 0);
    g.add(bulb, at(box(0.01, 0.3, 0.01, M(0x222222)), 0, o.h - 0.15, 0));
    g.userData.walls = walls;
    return g;
  }

  function windowFrame(w, h) {
    const g = new T.Group();
    const frameM = M(0x3d4c44);
    const glass = new T.Mesh(new T.PlaneGeometry(w, h), M(0x1b2d44, { emissive: 0x16263c, emissiveIntensity: 1 }));
    g.add(glass);
    for (let i = -2; i <= 2; i++) g.add(at(box(0.02, h, 0.03, M(0x2a2a2a, { metalness: 0.6 })), (w / 5) * i, 0, 0.03));
    g.add(at(box(w + 0.1, 0.06, 0.06, frameM), 0, h / 2, 0), at(box(w + 0.1, 0.06, 0.06, frameM), 0, -h / 2, 0));
    return g;
  }

  function dust(n, spread, y) {
    const geo = new T.BufferGeometry();
    const p = new Float32Array(n * 3);
    for (let i = 0; i < n; i++) { p[i * 3] = (Math.random() - 0.5) * spread; p[i * 3 + 1] = Math.random() * y; p[i * 3 + 2] = (Math.random() - 0.5) * spread; }
    geo.setAttribute('position', new T.BufferAttribute(p, 3));
    const pts = new T.Points(geo, new T.PointsMaterial({ color: 0xfff1d0, size: 0.018, transparent: true, opacity: 0.55, depthWrite: false }));
    pts.userData.spin = true;
    return pts;
  }

  /* ---------------- CÁC KHÔNG GIAN ---------------- */
  const BUILD = {};

  BUILD.exterior = () => {
    const g = new T.Group();
    const ground = new T.Mesh(new T.PlaneGeometry(90, 90), M(0x22252a, { roughness: 1 }));
    ground.rotation.x = -Math.PI / 2; ground.receiveShadow = true; g.add(ground);
    // mặt tiền nhà B4: 5 tầng x 8 căn
    const facade = canvasTex(1024, 640, (c, w, h) => {
      c.fillStyle = '#b39a66'; c.fillRect(0, 0, w, h);
      const r = rnd(11);
      for (let i = 0; i < 500; i++) { c.fillStyle = `rgba(40,35,25,${r() * 0.12})`; c.fillRect(r() * w, r() * h, r() * 30, r() * 90); }
      const fh = h / 5, cw = w / 8;
      for (let f = 0; f < 5; f++) {
        c.fillStyle = 'rgba(70,60,40,0.6)'; c.fillRect(0, f * fh + fh - 8, w, 8);
        for (let k = 0; k < 8; k++) {
          const x = k * cw + cw * 0.22, y = f * fh + fh * 0.22, ww = cw * 0.56, hh = fh * 0.55;
          const lit = (f === 0 && k === 3) || (f === 4 && k === 1);
          c.fillStyle = lit ? '#e6b45a' : '#141a22'; c.fillRect(x, y, ww, hh);
          c.strokeStyle = '#2b2b2b'; c.lineWidth = 3;
          for (let b = 1; b < 5; b++) { c.beginPath(); c.moveTo(x + (ww / 5) * b, y); c.lineTo(x + (ww / 5) * b, y + hh); c.stroke(); }
          c.strokeRect(x, y, ww, hh);
        }
      }
      c.fillStyle = '#e9e1cc'; c.font = `700 46px ${FONT}`; c.fillText('B4', 20, 52);
    });
    const sideM = M(0xa58e5e, { map: wallTex() });
    const facM = M(0xffffff, { map: facade });
    const bld = new T.Mesh(new T.BoxGeometry(24, 15, 9), [sideM, sideM, M(0x4a4a48), sideM, facM, sideM]);
    bld.position.set(0, 7.5, -8); bld.castShadow = bld.receiveShadow = true; g.add(bld);
    // chuồng cọp sắt
    const rust = new T.LineBasicMaterial({ color: 0x5b3a26 });
    [[-7.5, 1], [4.5, 2], [-1.5, 3], [7.5, 4], [1.5, 4]].forEach(([x, f]) => {
      const cg = new T.EdgesGeometry(new T.BoxGeometry(2.2, 2.2, 1));
      const cage = new T.LineSegments(cg, rust); cage.position.set(x, f * 3 + 1.4, -3.0); g.add(cage);
      for (let i = -1; i <= 1; i += 0.25) { const bar = new T.Line(new T.BufferGeometry().setFromPoints([new T.Vector3(x + i, f * 3 + 0.3, -2.5), new T.Vector3(x + i, f * 3 + 2.5, -2.5)]), rust); g.add(bar); }
    });
    // loa phường ở đầu hồi
    const pole = at(new T.Mesh(new T.CylinderGeometry(0.06, 0.08, 4, 8), M(0x3a3a3a)), -12.4, 15.5, -4);
    const horn = at(new T.Mesh(new T.ConeGeometry(0.45, 0.9, 16, 1, true), M(0x8a8f8c, { side: T.DoubleSide, metalness: 0.5 })), -12.4, 17, -3.5);
    horn.rotation.x = Math.PI / 2 + 0.3; g.add(pole, horn);
    // chòi bảo vệ
    const booth = at(box(2.4, 2.6, 2.2, M(0x7d8a6e, { map: wallTex() })), 7, 1.3, 3.5);
    const bw = at(new T.Mesh(new T.PlaneGeometry(1.2, 0.8), M(0x000, { emissive: 0xffb860, emissiveIntensity: 1.3 })), 7, 1.6, 4.61);
    g.add(booth, bw, at(new T.PointLight(0xffb060, 1.2, 7, 1.5), 7, 1.8, 5.2));
    // ô tô của chị Trâm
    const car = new T.Group();
    car.add(at(box(1.8, 0.6, 4, M(0xdedede, { metalness: 0.5, roughness: 0.35 })), 0, 0.6, 0));
    car.add(at(box(1.6, 0.55, 2, M(0x1a2230, { metalness: 0.4, roughness: 0.2 })), 0, 1.15, -0.2));
    [[-0.9, -1.3], [0.9, -1.3], [-0.9, 1.3], [0.9, 1.3]].forEach(([x, z]) => car.add(at(new T.Mesh(new T.CylinderGeometry(0.33, 0.33, 0.25, 16), M(0x111)), x, 0.33, z).rotateZ(Math.PI / 2)));
    const hl = new T.SpotLight(0xfff4d8, 2.4, 26, 0.45, 0.6, 1.2); hl.position.set(0, 0.7, -2.1); hl.target.position.set(0, 0, -14);
    car.add(hl, hl.target);
    car.add(at(new T.Mesh(new T.PlaneGeometry(1.4, 0.18), M(0x000, { emissive: 0xfff4d8 })), 0, 0.7, -2.02).rotateY(Math.PI));
    car.position.set(-8, 0, 9); car.rotation.y = 0.35; g.add(car);
    // biển dự án + cẩu tháp
    const sign = textTex([
      { t: 'DỰ ÁN CẢI TẠO, XÂY DỰNG LẠI NHÀ B4', s: 58, c: '#ffffff' },
      { t: 'Tòa tái định cư 30 tầng', s: 50, wt: 600, c: '#ffd77a' },
      { t: 'Lễ khởi công: 7:00 sáng thứ Hai', s: 46, wt: 600, c: '#e6edf5' }
    ], { bg: '#0f3b6e', border: '#ffd77a', w: 1280, h: 512 });
    const board = at(new T.Mesh(new T.PlaneGeometry(6, 2.4), M(0xffffff, { map: sign, emissive: 0xffffff, emissiveMap: sign, emissiveIntensity: 0.35 })), 12, 3.4, 4);
    board.rotation.y = -0.55;
    g.add(board, at(box(0.12, 2.4, 0.12, M(0x444)), 10.2, 1.2, 5.1), at(box(0.12, 2.4, 0.12, M(0x444)), 13.4, 1.2, 2.9));
    const crane = new T.Group();
    const lat = new T.LineBasicMaterial({ color: 0xc9a227 });
    const mast = new T.LineSegments(new T.EdgesGeometry(new T.BoxGeometry(1, 32, 1, 1, 16, 1)), lat); mast.position.y = 16; crane.add(mast);
    const jib = new T.LineSegments(new T.EdgesGeometry(new T.BoxGeometry(22, 1, 1, 11, 1, 1)), lat); jib.position.set(6, 32, 0); crane.add(jib);
    const blink = at(new T.Mesh(new T.SphereGeometry(0.25, 10, 8), M(0x300, { emissive: 0xff2a1a })), 17, 32.8, 0);
    crane.add(blink); crane.position.set(-22, 0, -22); g.add(crane);
    // hàng rào tôn
    for (let i = 0; i < 8; i++) { g.add(at(box(0.05, 2, 2, M(0x2f5f8a, { metalness: 0.4 })), -16, 1, 12 - i * 2.05)); g.add(at(box(0.05, 2, 2, M(0x2f5f8a, { metalness: 0.4 })), 16, 1, 12 - i * 2.05)); }
    // sao
    const sg = new T.BufferGeometry(); const sp = [];
    for (let i = 0; i < 500; i++) { const a = Math.random() * 6.28, e = 0.15 + Math.random() * 1.2; sp.push(Math.cos(a) * 80, 10 + Math.sin(e) * 60, Math.sin(a) * 80 - 20); }
    sg.setAttribute('position', new T.Float32BufferAttribute(sp, 3));
    g.add(new T.Points(sg, new T.PointsMaterial({ color: 0xbcd0ff, size: 0.25 })));
    const moon = new T.DirectionalLight(0x9db4ff, 0.55); moon.position.set(-20, 30, 20); moon.castShadow = true; g.add(moon);
    const winLight = at(new T.PointLight(0xffb45a, 0.9, 6, 2), -1.9, 13.5, -2.8); g.add(winLight);
    // lễ khởi công: rạp đỏ, hàng ghế, máy xúc vàng
    const cere = new T.Group(); cere.visible = false;
    const tentM = M(0xc0262a, { roughness: 0.7 }), whiteM = M(0xf2f2ee);
    cere.add(at(box(8, 0.12, 5, tentM), 3, 3.2, 8.5));
    for (let i = 0; i < 4; i++) cere.add(at(box(0.12, 3.2, 0.12, whiteM), -0.9 + (i % 2) * 7.8, 1.6, 6.1 + Math.floor(i / 2) * 4.8));
    for (let r = 0; r < 3; r++) for (let c = 0; c < 6; c++) cere.add(at(box(0.45, 0.45, 0.45, M(r === 0 ? 0xd8d8d8 : 0x2f5f8a)), 0.4 + c * 1.0, 0.22, 7.6 + r * 0.9));
    const podium = at(box(1.4, 1.0, 0.7, M(0xc0262a)), 3, 0.5, 6.3); cere.add(podium);
    const banner = at(new T.Mesh(new T.PlaneGeometry(6, 1), M(0xffffff, { map: textTex([{ t: 'Lễ khởi công tòa tái định cư B4', s: 64, c: '#ffe08a' }], { bg: '#a01c1f', w: 1280, h: 220 }) })), 3, 2.75, 6.05);
    banner.rotation.y = Math.PI; cere.add(banner);
    const exc = new T.Group();
    const yel = M(0xe8b21c, { roughness: 0.5, metalness: 0.2 });
    exc.add(at(box(2.6, 0.6, 3.4, M(0x222222)), 0, 0.3, 0), at(box(2.4, 1.4, 2.4, yel), 0, 1.3, 0.2), at(box(1.0, 1.0, 1.0, M(0x1a2230, { metalness: 0.4 })), -0.6, 2.5, 0.6));
    const arm1 = at(box(0.35, 0.35, 3.2, yel), 0.5, 2.6, -1.8); arm1.rotation.x = -0.5; exc.add(arm1);
    const arm2 = at(box(0.3, 2.2, 0.3, yel), 0.5, 2.3, -3.3); arm2.rotation.x = 0.3; exc.add(arm2);
    exc.add(at(box(1.1, 0.6, 0.8, M(0x555555, { metalness: 0.6 })), 0.5, 1.2, -3.6));
    exc.position.set(-9, 0, -1.5); exc.rotation.y = 0.5; cere.add(exc);
    g.add(cere);
    const sun = new T.DirectionalLight(0xffc890, 0); sun.position.set(30, 6, 20); g.add(sun);
    return {
      group: g, fog: [0x0b1018, 0.022], amb: 0.35,
      cam: { pos: [0, 3.4, 23], look: [0, 6.2, -6], orbit: 0.08 },
      spots: { kha: [5.4, 0, 5.4, 2.4], tho: [-1.2, 0, 8.5, 0.3], phat: [2, 0, 7, -0.3], tram: [-7, 0, 7, 0.6] },
      update(t) {
        cere.visible = fx.has('ceremony');
        sun.intensity += ((fx.has('sunrise') ? 1.6 : fx.has('dawn') ? 0.4 : 0) - sun.intensity) * 0.02;
        blink.material.emissiveIntensity = (Math.sin(t * 3) > 0) ? 1.5 : 0.05; winLight.intensity = 0.7 + Math.sin(t * 13) * 0.15 + (Math.random() < 0.02 ? -0.6 : 0); }
    };
  };

  BUILD.room304 = () => {
    const W = 3.62, D = 4.2, H = 3;
    const r = room({ w: W, d: D, h: H, skip: ['E'] });
    const g = new T.Group(); g.add(r);
    // vách 304/305 có thể trượt
    const part = new T.Group();
    const pw = new T.Mesh(new T.BoxGeometry(0.11, H, D), M(0xffffff, { map: wallTex() }));
    part.add(pw); part.position.x = W / 2; g.add(part);
    // cửa ra hành lang + mã phấn
    const door = at(new T.Mesh(new T.PlaneGeometry(0.9, 2.1), M(0xffffff, { map: doorTex('304', 'KĐ-304 ✓') })), 0.4, 1.05, -D / 2 + 0.02);
    g.add(door);
    // cửa sổ phía nam (sau lưng người chơi) – ánh trăng
    const win = windowFrame(1.2, 1.3); win.position.set(0, 1.6, D / 2 - 0.02); win.rotation.y = Math.PI; g.add(win);
    const moon = new T.SpotLight(0x8fa8ff, 1.2, 9, 0.7, 0.8, 1); moon.position.set(0.3, 2.2, D / 2 + 0.6); moon.target.position.set(-0.6, 0, -1); g.add(moon, moon.target);
    // tủ âm tường (D trên bản vẽ) góc tây bắc
    const cup = new T.Group();
    cup.add(box(0.9, 2.2, 0.06, M(0x6b4a2c)));
    const cupDoor = at(box(0.44, 2.1, 0.03, M(0x7a5634)), -0.22, 0, 0.04); cup.add(cupDoor);
    cup.position.set(-W / 2 + 0.6, 1.1, -D / 2 + 0.05); g.add(cup);
    // tủ gỗ mọt + bóng ma của nó
    const wardrobe = at(box(1, 1.9, 0.55, M(0x5b3e26, { roughness: 0.75 })), -0.9, 0.95, 0.2);
    wardrobe.rotation.y = Math.PI / 2; g.add(wardrobe);
    const ghost = at(box(1, 1.9, 0.55, M(0x9fc3ff, { transparent: true, opacity: 0.18, emissive: 0x4a7ab8, emissiveIntensity: 0.6, depthWrite: false })), -1.45, 0.95, -0.4);
    ghost.rotation.y = Math.PI / 2; ghost.visible = false; g.add(ghost);
    // quạt trần ba cánh
    const fan = new T.Group(); fan.position.set(0, H - 0.35, 0);
    for (let i = 0; i < 3; i++) { const b = box(0.7, 0.01, 0.12, M(0x6d6a60)); b.position.x = 0.35; const p = new T.Group(); p.rotation.y = (i * Math.PI * 2) / 3; p.add(b); fan.add(p); }
    fan.add(at(new T.Mesh(new T.CylinderGeometry(0.08, 0.08, 0.1, 16), M(0x555)), 0, 0, 0));
    g.add(fan);
    // khung ảnh gia đình trên tường tây
    const photo = canvasTex(256, 200, (c, w, h) => {
      c.fillStyle = '#c9b993'; c.fillRect(0, 0, w, h);
      c.fillStyle = '#8a7a5a'; [[60, 120, 34], [120, 110, 40], [185, 125, 30]].forEach(([x, y, s]) => { c.beginPath(); c.arc(x, y - s, s * 0.55, 0, 7); c.fill(); c.fillRect(x - s * 0.7, y - s * 0.4, s * 1.4, s * 1.8); });
      c.strokeStyle = '#3b2a18'; c.lineWidth = 16; c.strokeRect(0, 0, w, h);
    });
    const ph = at(new T.Mesh(new T.PlaneGeometry(0.5, 0.4), M(0xffffff, { map: photo })), -W / 2 + 0.02, 1.8, -1.2); ph.rotation.y = Math.PI / 2; g.add(ph);
    const dst = dust(220, 3.4, H); g.add(dst);
    return {
      group: g, fog: [0x07080a, 0.11], amb: 0.12,
      cam: { pos: [0.55, 1.62, 1.75], look: [-0.25, 1.25, -1.6], orbit: 0.02 },
      spots: { tho: [0.15, 0, -1.15, 0.3], phat: [0.9, 0, -1.5, -0.4] },
      update(t, dt) {
        fan.rotation.y += dt * (fx.has('alarm') ? 2.2 : 0.4);
        ghost.visible = fx.has('ghost');
        if (ghost.visible) ghost.material.opacity = 0.12 + Math.sin(t * 2) * 0.06;
        const target = fx.has('slid') ? W / 2 - 0.22 : W / 2;
        if (fx.has('slide')) {
          const k = Math.min(1, (t - fxStart) / 9);
          part.position.x = W / 2 - 0.7 * k;
          if (k < 1) shake = Math.max(shake, 0.012);
        } else part.position.x += (target - part.position.x) * Math.min(1, dt * 3);
        cupDoor.rotation.y = fx.has('cupboard') ? -1.2 : 0;
        cupDoor.position.x = fx.has('cupboard') ? -0.4 : -0.22;
        if (fx.has('slid')) { wardrobe.position.set(-1.45, 0.95, -0.4); } else { wardrobe.position.set(-0.9, 0.95, 0.2); }
      }
    };
  };

  BUILD.room207 = () => {
    const W = 3.4, D = 4, H = 3;
    const r = room({ w: W, d: D, h: H });
    const g = new T.Group(); g.add(r);
    // Tường đông là "mặt chính": cửa sổ bên trái, 3 đinh
    const win = windowFrame(0.9, 1.3); win.position.set(W / 2 - 0.02, 1.7, -1.3); win.rotation.y = -Math.PI / 2; g.add(win);
    const moon = new T.SpotLight(0x8fa8ff, 1.4, 8, 0.6, 0.7, 1); moon.position.set(W / 2 + 1, 2.6, -1.3); moon.target.position.set(0, 0, 0); g.add(moon, moon.target);
    const nails = [];
    [-0.3, 0.05, 0.4].forEach((z) => { const n = at(new T.Mesh(new T.SphereGeometry(0.018, 8, 6), M(0x9a9a9a, { metalness: 0.9 })), W / 2 - 0.02, 2.05, z); nails.push(n); g.add(n); });
    // vạch đo chiều cao trẻ con
    const marks = canvasTex(256, 512, (c, w, h) => {
      c.clearRect(0, 0, w, h); c.strokeStyle = 'rgba(40,30,20,0.85)'; c.lineWidth = 4; c.fillStyle = 'rgba(40,30,20,0.85)'; c.font = `600 28px ${MONO}`;
      [[430, ''], [380, ''], [330, ''], [290, '1998']].forEach(([y, s]) => { c.beginPath(); c.moveTo(30, y); c.lineTo(140, y); c.stroke(); if (s) c.fillText(s, 150, y + 10); });
    });
    const mk = at(new T.Mesh(new T.PlaneGeometry(0.5, 1), M(0xffffff, { map: marks, transparent: true })), W / 2 - 0.025, 0.9, 1.1); mk.rotation.y = -Math.PI / 2; g.add(mk);
    // giường sắt
    const bed = new T.Group();
    bed.add(at(box(1.9, 0.1, 0.95, M(0x6a6f6a, { metalness: 0.6 })), 0, 0.45, 0));
    bed.add(at(box(1.85, 0.12, 0.9, M(0xcfc6ae)), 0, 0.56, 0));
    [[-0.92, -0.45], [0.92, -0.45], [-0.92, 0.45], [0.92, 0.45]].forEach(([x, z]) => bed.add(at(box(0.04, 0.9, 0.04, M(0x555)), x, 0.45, z)));
    bed.position.set(-0.6, 0, -1.4); g.add(bed);
    const clockObj = makeClock(); g.add(clockObj);
    const dst = dust(160, 3, H); g.add(dst);
    return {
      group: g, fog: [0x07080a, 0.1], amb: 0.12,
      cam: { pos: [-1.0, 1.6, 1.5], look: [W / 2, 1.5, -0.3], orbit: 0.02 },
      spots: { tho: [0.2, 0, 0.0, 1.4], phat: [0.6, 0, -1.4, 2.4] },
      update(t, dt) {
        const hung = fx.has('clockhung');
        if (hung) { clockObj.position.set(W / 2 - 0.08, 1.7, 0.05); clockObj.rotation.set(0, -Math.PI / 2, 0); }
        else { clockObj.position.set(-0.4, 0.66, -1.35); clockObj.rotation.set(-Math.PI / 2, 0, 0.4); }
        const sp = fx.has('clockfast') ? 9 : 2.2;
        clockObj.userData.pend.rotation.z = Math.sin(t * sp) * 0.35;
        if (fx.has('shake')) bed.position.x = -0.6 + Math.min(0.9, (t - fxStart) * 0.25);
        else bed.position.x += (-0.6 - bed.position.x) * Math.min(1, dt * 2);
      }
    };
  };

  BUILD.stair = () => {
    const g = new T.Group();
    const H = 3.2;
    const r = room({ w: 4, d: 3.6, h: H, skip: ['S'] }); g.add(r);
    // bậc thang lên và xuống
    const stepM = M(0x8d8a82, { roughness: 0.95 });
    for (let i = 0; i < 10; i++) g.add(at(box(1.3, 0.17 * (i + 1), 0.3, stepM), -1.2, 0.085 * (i + 1), 0.9 - i * 0.3));
    // lan can sắt
    const railM = M(0x2b2b2b, { metalness: 0.7, roughness: 0.4 });
    g.add(at(box(0.05, 0.05, 3, railM), 0, 0.95, -0.2));
    for (let i = 0; i < 12; i++) g.add(at(box(0.02, 0.95, 0.02, railM), 0, 0.47, -1.6 + i * 0.25));
    // cửa sổ cầu thang
    const win = windowFrame(1, 1.4); win.position.set(0, 2.1, -1.78); g.add(win);
    const moon = new T.SpotLight(0x8fa8ff, 1.5, 9, 0.7, 0.8, 1); moon.position.set(0, 3, -3); moon.target.position.set(0, 0, 1); g.add(moon, moon.target);
    // số tầng sơn trên tường
    const num = at(new T.Mesh(new T.PlaneGeometry(0.6, 0.6), M(0xffffff, { map: textTex([{ t: '4', s: 300, c: '#7a1e14' }], { bg: '#c4a463', w: 256, h: 256 }) })), -1.99, 2.2, 0.6);
    num.rotation.y = Math.PI / 2; g.add(num);
    const clockObj = makeClock(); clockObj.scale.setScalar(0.7);
    const dst = dust(160, 3.6, H); g.add(dst);
    return {
      group: g, fog: [0x06070a, 0.12], amb: 0.12,
      cam: { pos: [0.4, 1.7, 2.1], look: [-0.3, 1.4, -1.2], orbit: 0.02 },
      spots: { phat: [-0.75, 0, -0.9, 0.5], tho: [0.65, 0, -0.7, -0.4], tram: [0.0, 0, -1.45, 0.1] },
      update(t) {
        const ph = figures.phat;
        if (fx.has('clockhand') && ph && ph.visible) {
          if (clockObj.parent !== ph) ph.add(clockObj);
          clockObj.position.set(0.32, 0.95, 0.12); clockObj.userData.pend.rotation.z = Math.sin(t * 4) * 0.35;
        } else if (clockObj.parent) clockObj.parent.remove(clockObj);
      },
      leave() { if (clockObj.parent) clockObj.parent.remove(clockObj); }
    };
  };

  function corridorView(fl) {
    const g = new T.Group();
    const L = 16, Wd = 1.9, H = 3;
    const wallM = M(0xffffff, { map: wallTex() }); wallM.map.repeat.set(4, 1);
    const floor = new T.Mesh(new T.PlaneGeometry(Wd, L), M(0xffffff, { map: tileTex() })); floor.material.map.repeat.set(2.5, 20);
    floor.rotation.x = -Math.PI / 2; floor.position.z = -L / 2 + 2; g.add(floor);
    const ceil = new T.Mesh(new T.PlaneGeometry(Wd, L), M(0x7d786c)); ceil.rotation.x = Math.PI / 2; ceil.position.set(0, H, -L / 2 + 2); g.add(ceil);
    [-1, 1].forEach((s) => { const w = new T.Mesh(new T.PlaneGeometry(L, H), wallM); w.position.set(s * Wd / 2, H / 2, -L / 2 + 2); w.rotation.y = -s * Math.PI / 2; g.add(w); });
    const end = windowFrame(1.1, 1.4); end.position.set(0, 1.7, -L + 2); g.add(end);
    const moon = new T.SpotLight(0x8fa8ff, 2, 18, 0.5, 0.8, 1); moon.position.set(0, 2.4, -L + 1.5); moon.target.position.set(0, 0, 2); g.add(moon, moon.target);
    const doors = {};
    const p = String(fl);
    const nums = [[p + '01', p + '02'], [p + '03', p + '04'], [p + '05', p + '06'], [p + '07', p + '08']];
    nums.forEach(([a, b], i) => {
      const z = -1 - i * 3.3;
      const chalk = fl === 4 ? i < 2 : i < 1;
      const d1 = at(new T.Mesh(new T.PlaneGeometry(0.9, 2.1), M(0xffffff, { map: doorTex(a, chalk ? 'KĐ-' + a + ' ✓' : '') })), -Wd / 2 + 0.01, 1.05, z); d1.rotation.y = Math.PI / 2;
      const d2 = at(new T.Mesh(new T.PlaneGeometry(0.9, 2.1), M(0xffffff, { map: doorTex(b, chalk ? 'KĐ-' + b + ' ✓' : '') })), Wd / 2 - 0.01, 1.05, z); d2.rotation.y = -Math.PI / 2;
      doors[a] = d1; doors[b] = d2; g.add(d1, d2);
    });
    // cửa đặc biệt: 405 ở tầng 4, 502 ở tầng 5
    const sp = fl === 4 ? '405' : '502';
    const spSide = doors[sp].position.x < 0 ? -1 : 1;
    const zs = doors[sp].position.z;
    const slit = at(new T.Mesh(new T.PlaneGeometry(0.85, 0.035), M(0x000, { emissive: 0xffa060, emissiveIntensity: 2 })), spSide * (Wd / 2 - 0.015), 0.02, zs); slit.rotation.y = -spSide * Math.PI / 2;
    const slitLight = at(new T.PointLight(0xff9050, 0.9, 2.5, 2), spSide * (Wd / 2 - 0.3), 0.1, zs);
    g.add(slit, slitLight);
    // cửa 509 – chỉ xuất hiện khi hồ sơ khống được giữ nguyên
    let door509 = null, glow509 = null, cage = null;
    if (fl === 5) {
      const tex509 = doorTex('509', ''), tex509c = doorTex('509', 'KĐ-509 ✓');
      door509 = at(new T.Mesh(new T.PlaneGeometry(0.9, 2.1), M(0xffffff, { map: tex509, emissive: 0x330000, emissiveIntensity: 1, transparent: true })), Wd / 2 - 0.01, 1.05, -13.6);
      door509.userData.tex = [tex509, tex509c];
      door509.rotation.y = -Math.PI / 2; door509.visible = false;
      glow509 = at(new T.PointLight(0xff3020, 0, 3, 2), Wd / 2 - 0.4, 1.2, -13.6);
      g.add(door509, glow509);
      // chuồng cọp nhìn qua cửa sổ cuối hành lang
      cage = new T.LineSegments(new T.EdgesGeometry(new T.BoxGeometry(2.4, 2.2, 1.6, 6, 5, 4)), new T.LineBasicMaterial({ color: 0x7a4a2c }));
      cage.position.set(0.9, 1.6, -L + 0.6); cage.visible = false; g.add(cage);
    }
    const bulbs = []; for (let i = 0; i < 4; i++) { const b = at(new T.Mesh(new T.SphereGeometry(0.06, 10, 8), M(0xccc, { emissive: 0x220000 })), 0, H - 0.25, -1 - i * 3.3); bulbs.push(b); g.add(b); }
    const dst = dust(260, 1.8, H); dst.position.z = -4; g.add(dst);
    return {
      group: g, fog: [0x060506, fl === 5 ? 0.11 : 0.14], amb: 0.1,
      cam: { pos: [0.35, 1.6, 2.2], look: [-0.2, 1.2, -7.5], orbit: 0.01 },
      spots: fl === 4
        ? { phat: [0.45, 0, -0.9, -0.6], tho: [-0.35, 0, zs + 0.9, 0.8] }
        : { phat: [0.45, 0, -0.9, -0.6], tho: [-0.4, 0, -1.7, 0.6], tram: [0.35, 0, -2.7, -0.3], kha: [-0.35, 0, -3.6, 0.5] },
      update(t) {
        const red = fx.has('redlight');
        const sd = fl === 4 ? 'door405' : 'door502';
        slit.material.emissiveIntensity = fx.has(sd) || fx.has('dooropen') ? 1.6 + Math.sin(t * 9) * 0.6 : 0;
        slitLight.intensity = fx.has(sd) ? 0.9 + Math.sin(t * 9) * 0.4 : (fx.has('dooropen') ? 0.4 : 0);
        doors[sp].position.x = spSide * (Wd / 2 - 0.01) + (fx.has(sd) ? Math.sin(t * 23) * 0.004 : 0);
        doors[sp].rotation.y = -spSide * Math.PI / 2 + (fx.has('dooropen') ? -spSide * 0.9 : 0);
        bulbs.forEach((b, i) => { b.material.emissive.setHex(red && Math.sin(t * 5 + i) > 0.6 ? 0xff2a1a : 0x220000); });
        const wantZ = fx.has('longer') ? 3.2 : fx.has('long') ? 2.2 : 1;
        g.scale.z += (wantZ - g.scale.z) * Math.min(1, 0.02 + (reduceMotion ? 1 : 0));
        if (door509) {
          door509.visible = fx.has('door509');
          const tm = fx.has('chalk509') ? door509.userData.tex[1] : door509.userData.tex[0];
          if (door509.material.map !== tm) { door509.material.map = tm; door509.material.needsUpdate = true; }
          door509.material.opacity = fx.has('door509thin') ? 0.3 + Math.sin(t * 2) * 0.08 : 1;
          glow509.intensity = door509.visible ? 0.8 + Math.sin(t * 3) * 0.4 : 0;
          cage.visible = fx.has('cageview');
        }
      }
    };
  }
  BUILD.corridor = () => corridorView(4);
  BUILD.corridor5 = () => corridorView(5);

  /* Búp bê vải váy đỏ */
  function makeDoll() {
    const d = new T.Group();
    d.add(at(new T.Mesh(new T.ConeGeometry(0.11, 0.22, 14), M(0xa8342a)), 0, 0.11, 0));
    d.add(at(new T.Mesh(new T.SphereGeometry(0.065, 14, 10), M(0xe8d2b0)), 0, 0.27, 0));
    d.add(at(new T.Mesh(new T.SphereGeometry(0.07, 14, 8, 0, Math.PI * 2, 0, Math.PI * 0.6), M(0x3a2418)), 0, 0.29, -0.005));
    d.add(at(box(0.16, 0.03, 0.03, M(0xe8d2b0)), 0, 0.17, 0));
    return d;
  }

  BUILD.room502 = () => {
    const W = 3.6, D = 4, H = 3;
    const r = room({ w: W, d: D, h: H, skip: ['N'] });
    const g = new T.Group(); g.add(r);
    // tường bắc có ô cửa sổ mở toang ra chuồng cọp
    const nW = M(0xffffff, { map: wallTex() });
    const hx0 = -0.5, hx1 = 1.1, hy0 = 0.8, hy1 = 2.3, zN = -D / 2;
    const piece = (x0, x1, y0, y1) => { const m = new T.Mesh(new T.PlaneGeometry(x1 - x0, y1 - y0), nW); m.position.set((x0 + x1) / 2, (y0 + y1) / 2, zN); g.add(m); };
    piece(-W / 2, hx0, 0, H); piece(hx1, W / 2, 0, H); piece(hx0, hx1, hy1, H); piece(hx0, hx1, 0, hy0);
    const fm = M(0x3d4c44);
    g.add(at(box(1.7, 0.08, 0.12, fm), 0.3, hy1, zN), at(box(1.7, 0.08, 0.2, fm), 0.3, hy0, zN), at(box(0.08, 1.5, 0.12, fm), hx0, 1.55, zN), at(box(0.08, 1.5, 0.12, fm), hx1, 1.55, zN));
    const sash = at(box(0.78, 1.42, 0.03, M(0x3d4c44, { transparent: true, opacity: 0.9 })), hx1 + 0.38, 1.55, zN + 0.38); sash.rotation.y = -1.2; g.add(sash);
    const sky = at(new T.Mesh(new T.PlaneGeometry(14, 8), M(0x000, { emissive: 0x0d1830 })), 0, 2, -D / 2 - 5); g.add(sky);
    const moon = new T.SpotLight(0x9fb4ff, 2.2, 12, 0.6, 0.6, 1); moon.position.set(0.3, 3.5, -D / 2 - 3); moon.target.position.set(0.3, 0, 0); g.add(moon, moon.target);
    // chuồng cọp ma bên ngoài: khung sắt + lưới ô sàn (ô ngoài hồ sơ trong suốt)
    const cage = new T.Group(); cage.position.set(0.3, 0.75, -D / 2 - 1.55);
    const rust = new T.LineBasicMaterial({ color: 0xc08a5a, transparent: true });
    const frame = new T.LineSegments(new T.EdgesGeometry(new T.BoxGeometry(3.6, 2.2, 3.0, 9, 5, 6)), rust); frame.position.y = 1.1; cage.add(frame);
    const cellMats = [];
    for (let c = 0; c < 9; c++) for (let rr = 0; rr < 6; rr++) {
      const real = c <= 7 && !(c >= 3 && c <= 4 && rr >= 2 && rr <= 3);
      const m = M(real ? 0x4a3a2c : 0x6a8cff, { transparent: true, opacity: real ? 0.95 : 0.08, metalness: 0.4, emissive: real ? 0x000000 : 0x2040a0, emissiveIntensity: 0.4 });
      cellMats.push({ m, real });
      const cell = new T.Mesh(new T.PlaneGeometry(0.38, 0.48), m);
      cell.rotation.x = -Math.PI / 2; cell.position.set(-1.8 + 0.2 + c * 0.4, 0, 1.25 - rr * 0.5); cage.add(cell);
    }
    const doll = makeDoll(); doll.position.set(-1.8 + 0.2 + 7 * 0.4, 0, 1.25 - 5 * 0.5); cage.add(doll);
    g.add(cage);
    // đồ đạc trong phòng
    g.add(at(box(1.2, 0.75, 0.6, M(0x5b3e26)), -1.1, 0.375, 0.9));
    g.add(at(box(0.5, 1.7, 0.45, M(0x6b4a2c)), 1.45, 0.85, 0.6));
    const dst = dust(220, 3.4, H); g.add(dst);
    return {
      group: g, fog: [0x05070c, 0.07], amb: 0.14,
      cam: { pos: [0.6, 1.75, 1.7], look: [0.35, 1.2, -3.4], orbit: 0.02 },
      spots: { tram: [-1.15, 0, -1.2, 0.5], tho: [1.25, 0, -0.5, -0.6], phat: [-1.3, 0, 0.1, 0.7] },
      update(t, dt) {
        const fade = fx.has('cagefade');
        const k = fade ? Math.max(0, 1 - (t - fxStart) / 3) : 1;
        rust.opacity = k;
        cellMats.forEach(({ m, real }) => { m.opacity = (real ? 0.95 : 0.08 + Math.sin(t * 2) * 0.04) * k; });
        doll.visible = !fx.has('dollgone') && k > 0.05;
        cage.visible = k > 0.01;
        cage.rotation.z = fx.has('cage') && !reduceMotion ? Math.sin(t * 0.8) * 0.006 : 0;
      }
    };
  };

  BUILD.room509 = () => {
    const W = 3.2, D = 3.0, H = 2.8;
    const g = new T.Group();
    // sàn gạch hoa + trần
    const floor = new T.Mesh(new T.PlaneGeometry(W, D), M(0xffffff, { map: tileTex(), roughness: 0.7 })); floor.material.map.repeat.set(4, 4);
    floor.rotation.x = -Math.PI / 2; g.add(floor);
    const ceil = new T.Mesh(new T.PlaneGeometry(W, D), M(0x7a7266)); ceil.rotation.x = Math.PI / 2; ceil.position.y = H; g.add(ceil);
    // tường chắp vá: mỗi mảng một màu vôi khác nhau
    const tints = [0xc4a463, 0x8fb0a0, 0xd8a8a0, 0xb8b0d8, 0xe0d0a0, 0x9fc0d8];
    const wt = wallTex();
    let k = 0;
    [['N', W, 0, -D / 2, 0], ['W', D, -W / 2, 0, Math.PI / 2], ['E', D, W / 2, 0, -Math.PI / 2]].forEach(([n, len, x, z, ry]) => {
      for (let i = 0; i < 2; i++) {
        const m = new T.Mesh(new T.PlaneGeometry(len / 2, H), M(tints[k++ % tints.length], { map: wt }));
        const off = (i - 0.5) * len / 2;
        if (n === 'N') m.position.set(off, H / 2, z); else m.position.set(x, H / 2, off);
        m.rotation.y = ry; g.add(m);
      }
    });
    // mâm cơm năm bát
    const items = [];
    const table = new T.Group();
    table.add(at(new T.Mesh(new T.CylinderGeometry(0.5, 0.5, 0.04, 24), M(0x8a8f8c, { metalness: 0.6, roughness: 0.4 })), 0, 0.42, 0));
    table.add(at(new T.Mesh(new T.CylinderGeometry(0.3, 0.34, 0.38, 16), M(0x5a3a22)), 0, 0.2, 0));
    for (let i = 0; i < 5; i++) { const a = i / 5 * Math.PI * 2; table.add(at(new T.Mesh(new T.SphereGeometry(0.07, 12, 8, 0, Math.PI * 2, Math.PI / 2, Math.PI / 2), M(0xf0ead8, { side: T.DoubleSide })), Math.cos(a) * 0.32, 0.5, Math.sin(a) * 0.32)); }
    table.position.set(0, 0, -0.3); g.add(table);
    // ghế trống vắt áo xanh
    const chair = new T.Group();
    chair.add(at(box(0.4, 0.04, 0.4, M(0x5a3a22)), 0, 0.42, 0), at(box(0.4, 0.45, 0.04, M(0x5a3a22)), 0, 0.66, 0.18));
    chair.add(at(box(0.42, 0.35, 0.06, M(0x2f6fb0)), 0, 0.72, 0.2));
    chair.position.set(0.75, 0, 0.1); chair.rotation.y = -2.2; g.add(chair);
    // đồ của nhà khác: tủ gỗ 304, giường sắt 207, quạt trần
    const wardrobe = at(box(0.9, 1.8, 0.5, M(0x5b3e26)), -1.25, 0.9, -1.1); items.push(wardrobe);
    const bed = new T.Group(); bed.add(at(box(1.8, 0.1, 0.9, M(0x6a6f6a, { metalness: 0.6 })), 0, 0.42, 0), at(box(1.75, 0.12, 0.85, M(0xcfc6ae)), 0, 0.52, 0)); bed.position.set(0.9, 0, -1.0); bed.rotation.y = Math.PI / 2; items.push(bed);
    const lampTable = at(box(0.4, 0.6, 0.4, M(0x7a5634)), -1.3, 0.3, 0.6); items.push(lampTable);
    items.forEach((m) => { m.userData.home = m.position.clone(); g.add(m); });
    const lamp = at(new T.PointLight(0xffb860, 1.6, 5, 1.8), -0.2, 1.6, -0.3); g.add(lamp);
    const shade = at(new T.Mesh(new T.ConeGeometry(0.22, 0.2, 16, 1, true), M(0xffd38a, { emissive: 0xffa040, emissiveIntensity: 0.8, side: T.DoubleSide })), -0.2, 1.9, -0.3); g.add(shade);
    // điện thoại bỏ quên trên mâm
    const phone = at(box(0.08, 0.01, 0.15, M(0x111, { emissive: 0x88b8ff, emissiveIntensity: 1.6 })), 0.18, 0.46, -0.15); phone.visible = false; g.add(phone);
    const ghostM = new T.LineBasicMaterial({ color: 0x9fc3ff, transparent: true, opacity: 0.0 });
    items.forEach((m) => { const e = new T.LineSegments(new T.EdgesGeometry(m.geometry || new T.BoxGeometry(1.8, 0.2, 0.9)), ghostM); e.position.copy(m.position); e.rotation.copy(m.rotation); g.add(e); });
    const dst = dust(180, 3, H); g.add(dst);
    return {
      group: g, fog: [0x120a06, 0.09], amb: 0.22,
      cam: { pos: [0.25, 1.65, 2.5], look: [-0.1, 1.15, -0.8], orbit: 0.015 },
      spots: { tho: [-0.55, 0, -0.85, 0.5], tram: [1.3, 0, 0.6, -0.8] },
      update(t) {
        const el = t - fxStart;
        items.forEach((m, i) => {
          const h = m.userData.home;
          if (fx.has('assemble')) { const k2 = Math.min(1, Math.max(0, (el - i * 0.4) / 1.6)); m.position.set(h.x + (1 - k2) * (i % 2 ? 3 : -3), h.y + (1 - k2) * 1.5, h.z); }
          else if (fx.has('dissolve')) { const k2 = Math.min(1, Math.max(0, (el - i * 0.6) / 1.4)); m.position.set(h.x, h.y, h.z + k2 * 4); }
          else m.position.copy(h);
        });
        ghostM.opacity = fx.has('ghostlines') ? 0.6 + Math.sin(t * 3) * 0.2 : 0;
        phone.visible = fx.has('phoneleft');
        lamp.intensity = 1.5 + Math.sin(t * 7) * 0.05 + (Math.random() < 0.01 ? -0.8 : 0);
      }
    };
  };

  BUILD.room301 = () => {
    const W = 3.6, D = 4.2, H = 3;
    const r = room({ w: W, d: D, h: H });
    const g = new T.Group(); g.add(r);
    // bảng 40 chìa khóa trên tường bắc
    const board = canvasTex(1024, 640, (c, w, h) => {
      c.fillStyle = '#6b4a2c'; c.fillRect(0, 0, w, h);
      c.strokeStyle = '#3e2a18'; c.lineWidth = 14; c.strokeRect(0, 0, w, h);
      for (let f = 0; f < 5; f++) for (let k = 0; k < 8; k++) {
        const x = 70 + k * 120, y = 70 + f * 118;
        c.fillStyle = '#c9b58a'; c.beginPath(); c.arc(x, y, 6, 0, 7); c.fill();
        c.strokeStyle = '#d8c08a'; c.lineWidth = 5; c.beginPath(); c.arc(x, y + 28, 14, 0, 7); c.stroke();
        c.fillStyle = '#d8c08a'; c.fillRect(x - 3, y + 40, 6, 30);
        c.fillStyle = '#efe6cf'; c.fillRect(x + 14, y + 4, 44, 26);
        c.fillStyle = '#2a2016'; c.font = `600 20px ${MONO}`; c.fillText(String(f + 1) + '0' + (k + 1), x + 16, y + 24);
      }
    });
    const bd = at(new T.Mesh(new T.PlaneGeometry(1.8, 1.12), M(0xffffff, { map: board })), -0.4, 1.75, -D / 2 + 0.03); g.add(bd);
    // ghế gỗ của ông Kha
    const chair = new T.Group();
    chair.add(at(box(0.45, 0.05, 0.45, M(0x5a3a22)), 0, 0.45, 0), at(box(0.45, 0.5, 0.05, M(0x5a3a22)), 0, 0.72, -0.2));
    [[-0.2, -0.2], [0.2, -0.2], [-0.2, 0.2], [0.2, 0.2]].forEach(([x, z]) => chair.add(at(box(0.04, 0.45, 0.04, M(0x4a2e1a)), x, 0.225, z)));
    chair.position.set(0, 0, -0.5); g.add(chair);
    // vòng đồ đạc: tủ, rương, quạt bàn, xe đạp
    const ring = new T.Group(); ring.position.set(0, 0, -0.5);
    const mk = [
      () => box(0.5, 1.7, 0.45, M(0x4f3420)), () => box(0.7, 0.45, 0.45, M(0x6b4a2c)),
      () => { const f = new T.Group(); f.add(at(new T.Mesh(new T.CylinderGeometry(0.03, 0.08, 0.6, 8), M(0x2f5f8a)), 0, 0.3, 0), at(new T.Mesh(new T.CircleGeometry(0.2, 16), M(0x2f5f8a, { side: T.DoubleSide })), 0, 0.7, 0)); return f; },
      () => { const b = new T.Group(); const wm = M(0x222); [-0.45, 0.45].forEach((x) => b.add(at(new T.Mesh(new T.TorusGeometry(0.3, 0.025, 6, 20), wm), x, 0.32, 0))); b.add(at(box(0.9, 0.04, 0.04, M(0x1d3a2a)), 0, 0.55, 0)); return b; },
      () => box(0.6, 0.8, 0.45, M(0x3e5a4a)), () => box(0.4, 0.4, 0.4, M(0x8a2f22)), () => box(0.9, 0.5, 0.5, M(0x7a5634))
    ];
    mk.forEach((f, i) => { const m = f(); const a = (i / mk.length) * Math.PI * 2 + 0.3; m.userData.a = a; m.rotation.y = -a + Math.PI / 2; ring.add(m); });
    g.add(ring);
    // phiếu thứ 40 trên bàn
    const desk = at(box(0.9, 0.05, 0.5, M(0x5b3e26)), 1.25, 0.75, -1.4); g.add(desk);
    const paper = at(new T.Mesh(new T.PlaneGeometry(0.22, 0.3), M(0xf0ead8, { emissive: 0x222018 })), 1.2, 0.78, -1.4); paper.rotation.x = -Math.PI / 2; g.add(paper);
    const lamp = at(new T.PointLight(0xffc070, 0.9, 4, 2), 1.2, 1.3, -1.4); g.add(lamp);
    const dst = dust(200, 3.4, H); g.add(dst);
    return {
      group: g, fog: [0x07060a, 0.09], amb: 0.14,
      cam: { pos: [0.5, 1.65, 2.0], look: [-0.1, 1.15, -1.2], orbit: 0.02 },
      spots: { kha: [0, 0, -0.6, 0], tram: [1.4, 0, -1.0, -0.6], tho: [-1.45, 0, -0.9, 0.6] },
      update(t, dt) {
        let rad = 1.15;
        const k = Math.min(1, (t - fxStart) / 6);
        if (fx.has('ring')) rad = 1.15 - 0.4 * k;
        if (fx.has('ringclosed')) rad = 0.72;
        if (fx.has('ringopen')) rad = 0.75 + 0.9 * k;
        ring.children.forEach((m) => { m.position.x = Math.cos(m.userData.a) * rad; m.position.z = Math.sin(m.userData.a) * rad; });
      }
    };
  };

  BUILD.room405 = () => {
    const W = 3.6, D = 4, H = 3;
    const r = room({ w: W, d: D, h: H, skip: ['E'] });
    const g = new T.Group(); g.add(r);
    // vách V1 bị phá thủng
    const wallM = M(0xffffff, { map: wallTex() });
    const holeWall = new T.Group();
    holeWall.add(at(box(0.11, H, 1.3, wallM), 0, H / 2, -1.35), at(box(0.11, H, 1.3, wallM), 0, H / 2, 1.35), at(box(0.11, 1.2, 1.4, wallM), 0, H - 0.6, 0), at(box(0.11, 0.5, 1.4, wallM), 0, 0.25, 0));
    holeWall.position.x = W / 2; g.add(holeWall);
    const rubble = new T.Group(); const rr = rnd(3);
    for (let i = 0; i < 26; i++) { const b = box(0.12 + rr() * 0.1, 0.06, 0.08, M(i % 3 ? 0x9b4a32 : 0xc4a463)); b.position.set(W / 2 - 0.2 - rr() * 0.6, 0.03, (rr() - 0.5) * 1.4); b.rotation.y = rr() * 3; rubble.add(b); }
    g.add(rubble);
    const through = at(new T.PointLight(0xffd49a, 1.4, 4, 1.5), W / 2 + 0.6, 1.3, 0); g.add(through);
    // đồ đạc xếp thành vòng quanh Út Thơ
    const ring = new T.Group(); ring.position.set(-0.3, 0, -0.4);
    const items = [
      () => box(0.45, 0.9, 0.45, M(0x6b4a2c)), () => box(1.0, 0.75, 0.6, M(0x5b3e26)), () => box(0.4, 0.45, 0.4, M(0x8a2f22)),
      () => box(0.6, 1.6, 0.4, M(0x4f3420)), () => box(0.45, 0.9, 0.45, M(0x6b4a2c)), () => box(0.5, 0.5, 0.5, M(0x3e5a4a)),
      () => box(0.8, 0.4, 0.5, M(0x7a5634))
    ];
    items.forEach((f, i) => { const m = f(); const a = (i / items.length) * Math.PI * 2; m.position.set(Math.cos(a) * 1.05, m.geometry.parameters.height / 2, Math.sin(a) * 1.05); m.rotation.y = -a; m.userData.a = a; ring.add(m); });
    g.add(ring);
    const dst = dust(300, 3.4, H); g.add(dst);
    return {
      group: g, fog: [0x0a0706, 0.1], amb: 0.14,
      cam: { pos: [1.7, 1.75, 1.95], look: [-0.4, 1.45, -0.8], orbit: 0.02 },
      spots: { tho: [-0.3, 0, -0.4, 0.6] },
      update(t, dt) {
        const k = Math.min(1, (t - fxStart) / 5);
        ring.children.forEach((m) => { const rad = 1.05 + k * 0.9; m.position.x = Math.cos(m.userData.a) * rad; m.position.z = Math.sin(m.userData.a) * rad; });
        through.intensity = 1.2 + Math.sin(t * 3) * 0.2;
      }
    };
  };

  /* ---------------- vòng đời ---------------- */
  function init() {
    const canvas = document.getElementById('world');
    labelLayer = document.getElementById('labels');
    fader = document.getElementById('fader');
    try {
      renderer = new T.WebGLRenderer({ canvas, antialias: true, powerPreference: 'high-performance' });
    } catch (e) { document.documentElement.classList.add('no3d'); return; }
    if (!renderer.getContext()) { document.documentElement.classList.add('no3d'); return; }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));
    renderer.outputEncoding = T.sRGBEncoding;
    renderer.toneMapping = T.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    renderer.shadowMap.enabled = window.innerWidth > 700;
    scene = new T.Scene();
    scene.background = new T.Color(0x05070a);
    camera = new T.PerspectiveCamera(58, 1, 0.03, 220);
    scene.add(camera);
    ambient = new T.HemisphereLight(0x8899bb, 0x1a1410, 0.3); scene.add(ambient);
    torch = new T.SpotLight(0xffe4b8, 3.2, 20, 0.42, 0.5, 1.3);
    torch.position.set(0.18, -0.12, 0.05);
    torchTarget = new T.Object3D(); torchTarget.position.set(0, 0, -5);
    camera.add(torch, torchTarget); torch.target = torchTarget;
    redLight = new T.PointLight(0xff1a0a, 0, 14, 1.5); camera.add(redLight); redLight.position.set(0, 1, -1);
    // tablet trong tay người chơi (gắn vào camera, chữ đổi theo cảnh)
    tabMat = M(0x000, { emissive: 0xffffff, emissiveIntensity: 0.9 });
    const tabScreen = new T.Mesh(new T.PlaneGeometry(0.2, 0.125), tabMat);
    const tabFrame = at(box(0.215, 0.14, 0.008, M(0x111)), 0, 0, -0.006);
    tabGroup = new T.Group(); tabGroup.add(tabFrame, tabScreen, at(new T.PointLight(0x9fc3ff, 0.6, 2), 0, 0.05, 0.2));
    tabGroup.position.set(0.26, -0.07, -0.62); tabGroup.rotation.set(-0.2, -0.25, 0);
    tabGroup.visible = false; camera.add(tabGroup);
    // nhân vật
    figures.tho = figure({ name: 'Út Thơ', shirt: 0xe7c43c, pants: 0x2d3e5c, hair: 0x1a1410, longHair: true, phone: true });
    figures.phat = figure({ name: 'Anh Phát', shirt: 0x46533b, pants: 0x2a2a2e, helmet: true, vest: true });
    figures.tram = figure({ name: 'Chị Trâm', shirt: 0xf0efe9, pants: 0x1d1d22, longHair: true, laptop: true });
    figures.kha = figure({ name: 'Ông Kha', shirt: 0x55663a, pants: 0x4a5236, hair: 0xb8b2a6, cap: true });
    Object.values(figures).forEach((f) => { f.visible = false; scene.add(f); });
    Object.keys(figures).forEach((k) => {
      const el = document.createElement('div'); el.className = 'label3d'; el.textContent = figures[k].userData.name; el.hidden = true;
      labelLayer.appendChild(el); figures[k].userData.label = el;
    });
    clock = new T.Clock();
    window.addEventListener('resize', resize); resize();
    window.addEventListener('pointermove', (e) => { pointer.tx = (e.clientX / innerWidth) * 2 - 1; pointer.ty = -(e.clientY / innerHeight) * 2 + 1; });
    API.ok = true;
    document.documentElement.classList.add('has3d');
    loop();
  }

  function resize() {
    const w = window.innerWidth, h = window.innerHeight;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    // màn hình dọc: lùi góc nhìn để thấy đủ cảnh
    camera.fov = w < h ? 72 : 58;
    camera.updateProjectionMatrix();
  }

  function setView(name) {
    if (!BUILD[name]) return;
    if (cur && cur.leave) cur.leave();
    if (cur) scene.remove(cur.group);
    if (!views[name]) views[name] = BUILD[name]();
    cur = views[name]; curName = name;
    scene.add(cur.group);
    scene.fog = new T.FogExp2(cur.fog[0], cur.fog[1]);
    scene.background = new T.Color(cur.fog[0]);
    ambient.intensity = cur.amb;
    camera.position.set(...cur.cam.pos);
    camera.lookAt(...cur.cam.look);
  }

  function show(st, isEnding) {
    if (!API.ok) return;
    st = st || {};
    const name = st.view || curName || 'exterior';
    const change = name !== curName;
    const apply = () => {
      if (change) setView(name);
      fx = new Set(st.fx || []);
      dead = !!isEnding;
      tabGroup.visible = fx.has('tablet') && !dead;
      if (st.tablet && JSON.stringify(st.tablet) !== tabKey) {
        tabKey = JSON.stringify(st.tablet);
        if (tabMat.emissiveMap) tabMat.emissiveMap.dispose();
        const tx = textTex(st.tablet, { bg: '#08121e', w: 1024, h: 640 });
        tabMat.map = tx; tabMat.emissiveMap = tx; tabMat.needsUpdate = true;
      }
      fxStart = clock.getElapsedTime();
      if (fx.has('shake')) shake = 0.05;
      const cast = isEnding ? [] : (st.cast || []);
      Object.keys(figures).forEach((k) => {
        const f = figures[k]; const on = cast.includes(k) && cur.spots && cur.spots[k];
        f.visible = !!on;
        if (on) { const [x, y, z, ry] = cur.spots[k]; f.position.set(x, y, z); f.rotation.y = ry; }
      });
    };
    if (change && fader && !reduceMotion) {
      fader.classList.add('on');
      setTimeout(() => { apply(); fader.classList.remove('on'); }, 380);
    } else apply();
  }

  function setStats(S) { pin = S.PIN; sanity = S.TT; }

  const v3 = new T.Vector3();
  function loop() {
    requestAnimationFrame(loop);
    if (document.hidden) return;
    const dt = Math.min(clock.getDelta(), 0.05);
    const t = clock.getElapsedTime();
    pointer.x += (pointer.tx - pointer.x) * Math.min(1, dt * 4);
    pointer.y += (pointer.ty - pointer.y) * Math.min(1, dt * 4);
    if (cur) {
      // camera trôi nhẹ + nhìn theo con trỏ
      let c = cur.cam; const o = reduceMotion ? 0 : c.orbit;
      if (fx.has('menu') && curName === 'exterior') {
        const a = reduceMotion ? 0.35 : 0.35 + Math.sin(t * 0.05) * 0.25;
        const portrait = innerWidth < innerHeight;
        c = { pos: [Math.sin(a) * 27, 4.5, -6 + Math.cos(a) * 27], look: [portrait ? 0 : -7, portrait ? 1.5 : 6.5, -6], orbit: 0 };
      }
      // màn hình dọc: lùi camera dọc theo hướng nhìn để không mất nhân vật ở hai bên
      const pk = innerWidth < innerHeight ? 1.5 : 1;
      const px = c.look[0] + (c.pos[0] - c.look[0]) * pk, py = c.look[1] + (c.pos[1] - c.look[1]) * pk, pz = c.look[2] + (c.pos[2] - c.look[2]) * pk;
      camera.position.set(px + Math.sin(t * 0.15) * o * 6 + pointer.x * 0.08, py + Math.sin(t * 0.4) * 0.015, pz + Math.cos(t * 0.15) * o * 2);
      camera.lookAt(c.look[0] + pointer.x * 0.9, c.look[1] + pointer.y * 0.5, c.look[2]);
      // đẩy khung hình lên trên để chủ thể không bị khung lời kể che
      const W = innerWidth, H = innerHeight;
      const want = (document.body.classList.contains('view-only') || fx.has('menu')) ? 0 : (W < 760 ? 0.2 : 0.17);
      frameK += (want - frameK) * Math.min(1, dt * 3);
      camera.setViewOffset(W, H, 0, frameK * H, W, H);
      if (sanity < 40 && !reduceMotion) camera.rotation.z += Math.sin(t * 0.7) * 0.02;
      if (shake > 0.001 && !reduceMotion) { camera.position.x += (Math.random() - 0.5) * shake; camera.position.y += (Math.random() - 0.5) * shake; shake *= 0.92; }
      if (cur.update) cur.update(t, dt);
    }
    if (curName === 'exterior') {
      const want = fx.has('sunrise') ? 0.9 : fx.has('dawn') ? 0.55 : 0;
      dawnK += (want - dawnK) * Math.min(1, dt * 0.5);
      scene.background.setRGB(0.04 + dawnK * 0.25, 0.06 + dawnK * 0.22, 0.09 + dawnK * 0.3);
      if (scene.fog) scene.fog.color.copy(scene.background);
      ambient.intensity = cur.amb + dawnK * 0.5;
    }
    // đèn pin: hướng theo con trỏ, yếu dần theo pin
    torchTarget.position.set(pointer.x * 2.2, pointer.y * 1.4, -5);
    const flick = pin <= 2 ? (Math.random() < 0.06 ? 0.2 : 1) : 1;
    torch.intensity = (0.7 + pin * 0.28) * flick * (dead ? 0.25 : 1);
    torch.angle = 0.3 + pin * 0.025;
    const alarm = fx.has('alarm') || fx.has('redlight');
    redLight.intensity = dead ? 1.6 + Math.sin(t * 2) * 0.6 : (alarm ? (Math.sin(t * 4) > 0.3 ? 0.5 : 0) : 0);
    // nhân vật thở nhẹ
    Object.values(figures).forEach((f) => {
      if (!f.visible) { f.userData.label.hidden = true; return; }
      const u = f.userData;
      u.torso.position.y = 1.13 + Math.sin(t * 1.6 + u.phase) * 0.006;
      u.head.position.y = 1.6 + Math.sin(t * 1.6 + u.phase) * 0.008;
      u.head.rotation.y = Math.sin(t * 0.5 + u.phase) * 0.25;
      v3.set(0, u.headY, 0); f.localToWorld(v3); v3.project(camera);
      const lbl = u.label;
      if (v3.z < 1 && Math.abs(v3.x) < 1.05 && Math.abs(v3.y) < 1.05) {
        lbl.hidden = false;
        lbl.style.transform = `translate(-50%,-100%) translate(${(v3.x * 0.5 + 0.5) * innerWidth}px,${(-v3.y * 0.5 + 0.5) * innerHeight}px)`;
      } else lbl.hidden = true;
    });
    // bụi bay
    if (cur) cur.group.children.forEach((c) => { if (c.userData.spin) c.rotation.y += dt * 0.02; });
    renderer.render(scene, camera);
  }

  API.init = init;
  API.show = show;
  API.setStats = setStats;
})();
