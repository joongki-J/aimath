/* ---------- 히어로 모션: 추세선과 경사하강법 → 인공신경망, 16초 루프 ----------
   0~8초  : 점이 찍히고 틀린 기울기의 추세선이 손실함수 L(a) 위 경사하강법(a ← a − r·L′(a))으로
            최적의 추세선에 맞춰진다.
   8~16초 : 인공신경망의 노드·연결선이 그려지고 신호가 두 번 흘러 출력 '1', '8'이 켜진다.
   흑연 + 오렌지(강조) + 연두(결과)만 쓰고, 컷·페이드 대신 선을 그었다 거둬들인다.
   마지막 프레임 = 첫 프레임(빈 화면). */
(() => {
  const canvas = document.querySelector("#reelCanvas");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  const layer = document.createElement("canvas");
  const lg = layer.getContext("2d");

  const W = 500, H = 588, LOOP = 16;
  const MONO = '"IBM Plex Mono", ui-monospace, monospace';
  const COL = { main: "#15171a", accent: "#ff5a30", muted: "#6b6f74", lime: "#c4e021" };
  let K = 1, PH = 0, TOOTH = null;
  const col = c => COL[c] || c;

  /* ---------- 이징 ---------- */
  const clamp = (x, a = 0, b = 1) => Math.min(b, Math.max(a, x));
  const lerp = (a, b, u) => a + (b - a) * u;
  // 임계 감쇠 스프링: 목표를 넘지 않는다. 박자보다 0.05초 먼저 출발해 박자에 닿는다.
  const S = (t, beat, w = 22) => { const x = t - beat + 0.05; return x <= 0 ? 0 : 1 - (1 + w * x) * Math.exp(-w * x); };
  const span = (t, a, b) => clamp((t - a) / (b - a));
  const hash = n => { const s = Math.sin(n * 12.9898) * 43758.5453; return s - Math.floor(s); };

  /* ---------- 도형 ---------- */
  const circlePts = (cx, cy, r, n = 28) => Array.from({ length: n }, (_, i) => { const a = -Math.PI / 2 + i / n * Math.PI * 2; return [cx + r * Math.cos(a), cy + r * Math.sin(a)]; });
  const path = (pts, o = {}) => ({ k: "path", pts, closed: false, c: "main", w: 3, alpha: 1, prog: 1, ...o });
  const shape = (pts, o = {}) => path(pts, { closed: true, ...o });
  const hatch = (pts, o = {}) => ({ k: "hatch", pts, c: "accent", gap: 7, ang: -Math.PI / 4, prog: 1, w: 1.4, ...o });
  const dot = (x, y, r, o = {}) => ({ k: "dot", x, y, r, c: "accent", ...o });
  const text = (str, x, y, o = {}) => ({ k: "text", str, x, y, size: 17, weight: 500, track: 0.08, c: "muted", align: "left", alpha: 1, ...o });

  /* ---------- 1장면 (0~8초): 추세선과 경사하강법 ---------- */
  const AX = [78, 132, 184, 236, 290, 342, 396], AY = [298, 270, 276, 228, 216, 172, 162];
  const xbar = AX.reduce((a, b) => a + b) / AX.length, ybar = AY.reduce((a, b) => a + b) / AY.length;
  const DX = AX.map(x => x - xbar), DY = AY.map(y => y - ybar);
  // 점들로 실제 계산한 최소제곱 기울기와 손실함수(평균제곱오차)
  const MSTAR = DX.reduce((s, d, i) => s + d * DY[i], 0) / DX.reduce((s, d) => s + d * d, 0);
  const M0 = MSTAR + 0.78;
  const Lf = m => DX.reduce((s, d, i) => s + (DY[i] - m * d) ** 2, 0) / DX.length;
  const dLf = m => DX.reduce((s, d, i) => s - 2 * d * (DY[i] - m * d), 0) / DX.length;
  const MR = 0.95, LMIN = Lf(MSTAR), LMAX = Lf(MSTAR + MR);
  const lx = m => 90 + (m - (MSTAR - MR)) / (2 * MR) * 320;
  const ly = L => 526 - (L - LMIN) / (LMAX - LMIN) * 128;
  const STEPS = Array.from({ length: 8 }, (_, k) => MSTAR + (M0 - MSTAR) * Math.pow(0.42, k));
  const STEP0 = 3.0, STEP_GAP = 0.55;

  function regression(t, ops) {
    const out = 1 - S(t, 7.2, 9);
    ops.push(path([[48, 66], [48, 340], [450, 340]], { c: "muted", w: 1.6, prog: Math.min(S(t, 0.1, 10), out) }));
    const axisText = Math.min(S(t, 0.3), out);
    ops.push(text("x", 444, 362, { size: 14, alpha: axisText }), text("y", 30, 74, { size: 14, alpha: axisText }));
    AX.forEach((x, i) => { const r = 6.5 * S(t, 0.3 + i * 0.1, 18) * out; if (r > 0.2) ops.push(dot(x, AY[i], r, { c: "main" })); });

    let m = M0;
    for (let k = 0; k < STEPS.length - 1; k++) m += (STEPS[k + 1] - STEPS[k]) * S(t, STEP0 + STEP_GAP * k, 14);
    const lineY = x => ybar + m * (x - xbar);

    const best = Math.min(S(t, 6.6, 10), out);
    if (best > 0.01) ops.push(path([[50, ybar + MSTAR * (50 - xbar)], [440, ybar + MSTAR * (440 - xbar)]], { c: "lime", w: 11, alpha: 0.9, prog: best }));
    ops.push(path([[50, lineY(50)], [440, lineY(440)]], { w: 3, prog: Math.min(S(t, 1.2, 10), out) }));
    const res = Math.min(S(t, 1.8, 12), out) * (1 - 0.6 * S(t, 6.6, 10));
    if (res > 0.01) AX.forEach((x, i) => ops.push(path([[x, AY[i]], [x, lineY(x)]], { c: "accent", w: 2, prog: res })));

    const curve = Array.from({ length: 60 }, (_, i) => { const mm = MSTAR - MR + 2 * MR * i / 59; return [lx(mm), ly(Lf(mm))]; });
    ops.push(path([[80, 538], [420, 538]], { c: "muted", w: 1.4, prog: Math.min(S(t, 1.6, 10), out) }));
    ops.push(path(curve, { w: 2.6, prog: Math.min(S(t, 1.8, 8), out) }));
    ops.push(text("L(a)", 64, 396, { size: 15, c: "main", alpha: Math.min(S(t, 2.1), out) }));

    const ball = Math.min(S(t, 2.5, 16), out);
    if (ball > 0.01) {
      const bx = lx(m), by = ly(Lf(m));
      const g = dLf(m) * (-128 / (LMAX - LMIN)) / (320 / (2 * MR));
      const len = 46 / Math.hypot(1, g), tan = Math.min(span(t, 2.6, 2.9), 1 - span(t, 6.4, 6.7), out);
      if (tan > 0.01) ops.push(path([[bx - len, by - g * len], [bx + len, by + g * len]], { c: "accent", w: 2, dash: true, prog: tan }));
      STEPS.forEach((_, k) => { if (k > 0 && t > STEP0 + STEP_GAP * (k - 1) + 0.3) ops.push(dot(lx(STEPS[k - 1]), ly(Lf(STEPS[k - 1])), 3 * out, { c: "muted" })); });
      ops.push(dot(bx, by, 9 * ball));
    }
    const kNow = STEPS.reduce((n, _, k) => (k < STEPS.length - 1 && t > STEP0 + STEP_GAP * k ? k + 1 : n), 0);
    ops.push(text(`k = ${kNow}`, 420, 396, { size: 14, align: "right", alpha: Math.min(S(t, 2.7), out) }));
    ops.push(text("a ← a − r·L′(a)", 250, 570, { size: 17, c: "main", align: "center", weight: 600, alpha: Math.min(S(t, 2.4), out) }));
  }

  /* ---------- 2장면 (8~16초): 인공신경망 ---------- */
  const LAY = [3, 4, 4, 2], LX = [82, 192, 308, 420], GAP = 74, CYB = 262;
  const NODES = LAY.map((n, l) => Array.from({ length: n }, (_, i) => [LX[l], CYB + (i - (n - 1) / 2) * GAP]));
  const EDGES = [];
  for (let l = 0; l < 3; l++) NODES[l].forEach((a, i) => NODES[l + 1].forEach((b, j) => EDGES.push({ l, a, b, i, j, id: EDGES.length })));
  const WAVES = [2.6, 4.6], WIN = [0, 1];   // 첫 신호는 '1', 둘째 신호는 '8'

  // 신호가 한 번 지나갈 때마다 가중치(연결선 굵기)가 바뀐다
  function weightAt(e, t) {
    let ep = 0; WAVES.forEach(ws => { if (t > ws + 2.0) ep++; });
    const prev = 0.7 + 3.2 * hash(e.id * 7.31 + Math.max(0, ep - 1) * 3.7), cur = 0.7 + 3.2 * hash(e.id * 7.31 + ep * 3.7);
    return ep === 0 ? cur : lerp(prev, cur, S(t, WAVES[ep - 1] + 2.0, 10));
  }

  function network(t, ops) {
    const out = 1 - S(t, 6.7, 9);
    EDGES.forEach(e => {
      const p = Math.min(span(t, 0.8 + 0.45 * e.l + 0.02 * e.i, 1.4 + 0.45 * e.l + 0.02 * e.i), 1 - S(t, 6.6 + 0.15 * (2 - e.l), 9));
      if (p > 0.01) ops.push(path([e.a, e.b], { w: weightAt(e, t), alpha: 0.42, prog: p }));
    });

    const active = new Map();
    const raise = (key, v) => active.set(key, Math.max(active.get(key) || 0, v));
    WAVES.forEach((ws, wi) => {
      for (let l = 0; l < 3; l++) {
        const u = span(t, ws + 0.5 * l, ws + 0.5 * (l + 1));
        if (u > 0 && u < 1) EDGES.filter(e => e.l === l).forEach(e => {
          if (l < 2 && hash(e.j * 5.1 + wi * 2.3 + l) < 0.25) return;
          ops.push(dot(lerp(e.a[0], e.b[0], u), lerp(e.a[1], e.b[1], u), 3.4));
        });
        NODES[l + 1].forEach((n, j) => {
          const on = l === 2 ? j === WIN[wi] : hash(j * 5.1 + wi * 2.3 + l + 1) >= 0.3;
          if (on) raise((l + 1) + "-" + j, S(t, ws + 0.5 * (l + 1), 16) * (1 - S(t, ws + 2.05, 10)));
        });
      }
      const v0 = S(t, ws, 16) * (1 - S(t, ws + 2.05, 10));
      NODES[0].forEach((n, j) => raise("0-" + j, v0));
    });

    let idx = 0;
    NODES.forEach((layerNodes, l) => layerNodes.forEach((n, j) => {
      const r = 17, appear = Math.min(S(t, 0.1 + 0.05 * idx++, 16), out);
      const v = active.get(l + "-" + j) || 0;
      if (v > 0.01) ops.push(hatch(circlePts(n[0], n[1], r - 1), { c: l === 3 ? "lime" : "accent", prog: v * out, gap: 5, w: l === 3 ? 2.2 : 1.4 }));
      if (appear > 0.01) ops.push(shape(circlePts(n[0], n[1], r), { w: 2.6, prog: appear }));
    }));

    const ta = Math.min(S(t, 1.0), out);
    ["x₁", "x₂", "x₃"].forEach((s, i) => ops.push(text(s, LX[0] - 36, NODES[0][i][1] + 6, { size: 16, align: "right", c: "main", alpha: ta })));
    ["1", "8"].forEach((s, j) => {
      let lit = 0; WAVES.forEach((ws, wi) => { if (WIN[wi] === j) lit = Math.max(lit, S(t, ws + 1.5, 16) * (1 - S(t, ws + 2.05, 10))); });
      ops.push(text(s, LX[3] + 30, NODES[3][j][1] + 8, { size: 22, weight: 600, c: lit > 0.5 ? "accent" : "main", alpha: ta }));
    });
    ops.push(text("입력", LX[0], 96, { size: 13, align: "center", alpha: ta }),
      text("은닉층", (LX[1] + LX[2]) / 2, 96, { size: 13, align: "center", alpha: ta }),
      text("출력", LX[3], 96, { size: 13, align: "center", alpha: ta }));
    ops.push(text("y = f(Σ wᵢxᵢ + b)", 250, 552, { size: 17, c: "main", weight: 600, align: "center", alpha: Math.min(S(t, 1.6), out) }));
  }

  function build(t) {
    const ops = [];
    if (t < 8.2) regression(t, ops);
    if (t > 7.8) network(t - 8, ops);
    return ops;
  }

  /* ---------- 연필 렌더러 ---------- */
  function resample(pts, closed, step) {
    const src = closed ? pts.concat([pts[0]]) : pts, out = [];
    let s = 0;
    for (let i = 0; i < src.length - 1; i++) {
      const [x0, y0] = src[i], [x1, y1] = src[i + 1], len = Math.hypot(x1 - x0, y1 - y0);
      if (len < 1e-6) continue;
      const nx = -(y1 - y0) / len, ny = (x1 - x0) / len, n = Math.max(1, Math.ceil(len / step));
      for (let j = 0; j < n; j++) { const u = j / n; out.push([x0 + (x1 - x0) * u, y0 + (y1 - y0) * u, nx, ny, s + len * u]); }
      s += len;
    }
    if (out.length) { const l = src[src.length - 1], p = out[out.length - 1]; out.push([l[0], l[1], p[2], p[3], s]); }
    return out;
  }

  // 연필: 다시 샘플링해 느린 사인파로 흔들고, 초당 8번 위상을 바꾼다. 두 번 긋는다.
  // prog(0~1)만큼만 앞에서부터 그어서 '그리기'와 '거둬들이기'를 표현한다.
  function pencil(g, op, seed) {
    let rs = resample(op.pts, op.closed, 6);
    if (rs.length < 2 || op.prog <= 0.01) return;
    if (op.prog < 1) { const lim = rs[rs.length - 1][4] * op.prog; rs = rs.filter(p => p[4] <= lim); if (rs.length < 2) return; }
    g.strokeStyle = col(op.c); g.lineCap = "round"; g.lineJoin = "round";
    if (op.dash) g.setLineDash([7, 7]);
    for (const [lw, al, amp, sd] of [[op.w, 0.9, 1.1, 0], [op.w * 0.5, 0.4, 2.4, 7.7]]) {
      g.globalAlpha = al * op.alpha; g.lineWidth = lw; g.beginPath();
      rs.forEach(([x, y, nx, ny, s], i) => {
        const o = amp * (Math.sin(s * 0.021 + PH * 1.7 + seed + sd) + 0.5 * Math.sin(s * 0.063 + PH * 2.9 + seed * 2.3 + sd));
        i ? g.lineTo(x + nx * o, y + ny * o) : g.moveTo(x + nx * o, y + ny * o);
      });
      g.stroke();
    }
    g.setLineDash([]); g.globalAlpha = 1;
  }

  // 빗금: 한 줄씩 그어진다(prog). 줄마다 조금씩 비틀린다.
  function hatchLines(g, op) {
    let x0 = Infinity, y0 = Infinity, x1 = -Infinity, y1 = -Infinity;
    for (const [x, y] of op.pts) { x0 = Math.min(x0, x); y0 = Math.min(y0, y); x1 = Math.max(x1, x); y1 = Math.max(y1, y); }
    const d = [Math.cos(op.ang), Math.sin(op.ang)], n = [-d[1], d[0]];
    const proj = [[x0, y0], [x1, y0], [x1, y1], [x0, y1]].map(([x, y]) => x * n[0] + y * n[1]);
    const lo = Math.min(...proj), hi = Math.max(...proj), L = Math.hypot(x1 - x0, y1 - y0) + 4;
    const mx = (x0 + x1) / 2, my = (y0 + y1) / 2, mo = mx * n[0] + my * n[1];
    const start = Math.ceil(lo / op.gap) * op.gap, count = Math.floor((hi - start) / op.gap) + 1, lim = Math.floor(count * op.prog);
    g.save(); g.beginPath(); op.pts.forEach(([x, y], i) => (i ? g.lineTo(x, y) : g.moveTo(x, y))); g.closePath(); g.clip();
    g.strokeStyle = col(op.c); g.lineWidth = op.w; g.globalAlpha = 0.8; g.beginPath();
    for (let i = 0; i < lim; i++) {
      const o = start + i * op.gap + (hash(i * 3.1 + PH) - 0.5) * 1.4;
      const cx = mx + n[0] * (o - mo), cy = my + n[1] * (o - mo), tw = (hash(i + PH * 5.3) - 0.5) * 0.03;
      g.moveTo(cx - d[0] * L - n[0] * L * tw, cy - d[1] * L - n[1] * L * tw);
      g.lineTo(cx + d[0] * L + n[0] * L * tw, cy + d[1] * L + n[1] * L * tw);
    }
    g.stroke(); g.restore();
  }

  function drawText(g, op) {
    if (!op.str || op.alpha <= 0.01) return;
    g.save(); g.globalAlpha = clamp(op.alpha);
    g.font = `${op.weight} ${op.size}px ${MONO}`;
    if ("letterSpacing" in g) g.letterSpacing = `${op.track * op.size}px`;
    g.textAlign = op.align; g.textBaseline = "alphabetic";
    g.fillStyle = col(op.c); g.fillText(op.str, op.x, op.y);
    g.restore();
  }

  function render(t) {
    PH = Math.floor(t * 8);
    const ops = build(t);
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    lg.setTransform(1, 0, 0, 1, 0, 0); lg.clearRect(0, 0, layer.width, layer.height); lg.setTransform(K, 0, 0, K, 0, 0);
    ops.forEach((o, i) => {
      if (o.k === "path") pencil(lg, o, i * 0.37);
      else if (o.k === "hatch") { if (o.prog > 0.01) hatchLines(lg, o); }
      else if (o.k === "dot") { lg.fillStyle = col(o.c); lg.beginPath(); lg.arc(o.x, o.y, o.r, 0, Math.PI * 2); lg.fill(); }
      else if (o.k === "text") drawText(lg, o);
    });
    // 종이 결: 선에서 군데군데 흑연이 빠진다
    lg.setTransform(1, 0, 0, 1, 0, 0);
    lg.globalCompositeOperation = "destination-out"; lg.fillStyle = TOOTH; lg.fillRect(0, 0, layer.width, layer.height);
    lg.globalCompositeOperation = "source-over";
    ctx.drawImage(layer, 0, 0);   // 캔버스는 투명: 히어로 격자 위에 바로 그어진다(CSS에서 multiply)
  }

  /* ---------- 종이 결 준비 ---------- */
  function prepare() {
    const tooth = document.createElement("canvas");
    tooth.width = tooth.height = 128;
    const tg = tooth.getContext("2d"), ti = tg.createImageData(128, 128);
    for (let i = 0; i < ti.data.length; i += 4) ti.data[i + 3] = Math.random() < 0.2 ? 60 + Math.random() * 140 : 0;
    tg.putImageData(ti, 0, 0);
    TOOTH = lg.createPattern(tooth, "repeat");
  }

  function resize() {
    const css = canvas.clientWidth || 400, dpr = Math.min(window.devicePixelRatio || 1, 2);
    const cw = Math.round(css * dpr);
    if (cw === canvas.width) return;
    canvas.width = cw; canvas.height = Math.round(cw * H / W);
    layer.width = canvas.width; layer.height = canvas.height;
    K = cw / W;
    prepare();
  }

  /* ---------- 재생 ---------- */
  let start = performance.now(), visible = true, seekT = null;
  resize();
  new ResizeObserver(resize).observe(canvas);
  if ("IntersectionObserver" in window) {
    new IntersectionObserver(([e]) => { visible = e.isIntersecting; }).observe(canvas);
  }
  function frame(now) {
    if (visible && seekT === null) render(((now - start) / 1000) % LOOP);
    requestAnimationFrame(frame);
  }
  // 학교에서 관리하는 PC는 '애니메이션 효과'가 꺼져 있는 경우가 많아서,
  // 움직임 줄이기 설정과 관계없이 항상 재생한다.
  requestAnimationFrame(frame);

  // 확인용: heroReel.seek(8.2)로 특정 시각을 멈춰 볼 수 있다. seek(null)이면 다시 재생.
  window.heroReel = {
    seek(t) { seekT = t; if (t !== null) { resize(); render(((t % LOOP) + LOOP) % LOOP); } else start = performance.now(); }
  };
})();
