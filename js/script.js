/* =========================================================
   EDIT THIS PART ONLY: all your names, dates, photos and words
   ========================================================= */
const CONFIG = {
  partnerA: "Aravind",
  partnerB: "Kaathu",

  // The day your story began. Format: YYYY-MM-DDTHH:MM:SS
  startDate: "2025-10-12T21:35:00",

  heroLine: "Every day with you is my favourite chapter.",

  // Photos: put the files in the /photos folder with exactly these names.
  // Names are case-sensitive on Vercel: use lowercase ".jpg" (not ".JPG").
  cover: "photos/cover.jpg",
  photos: [
    { src: "photos/photo1.jpg",        ratio: 1.3 },
    { src: "photos/photo2.jpg",   ratio: 0.8 },
    { src: "photos/photo3.jpg",      ratio: 1.0 },
    { src: "photos/photo4.jpg",             ratio: 1.4 },
    { src: "photos/photo5.jpg",     ratio: 1.2 },
    { src: "photos/photo6.jpg",   ratio: 0.9 },
    { src: "photos/photo7.jpg",  ratio: 1.1 },
    { src: "photos/photo8.jpg", ratio: 1.3 },
    { src: "photos/photo9.jpg",   ratio: 0.85 },
    { src: "photos/photo8.jpg", ratio: 1.3 },
  ],

  // Our song (optional). Put an mp3 at music/song.mp3. If the file is missing, the music button hides itself.
  song: "music/song.mp3",

  story: [
    { date: "11 May  2025", title: "The first message",      text: "chunkeyy jishnu aarnu viliche pinne ip note ." },
    { date: "19 December 2025",     title: "Our first date",       text: "I was nervous, you were radiant, and the evening ended far too soon." },
    { date: "25 May 2026",      title: "Nmde etom best day",       text: "Ath oru vere level experience arn orikalum marakan patatha times  ." },
    { date: "July 1 2026",             title: "Nmde first college day",        text: "nammal etom wait cheythe moment arn aa divsm nadanath." },
    { date: "October 8 2026",             title: "Meet with sudhamma",  text: "Ente ponno ann adicha tension njan ithuvare maranitila ini engnelum ellarum ayit korechude company avnm." },
    { date: "December 28 2026",            title: "Our next date",   text: "Ath nmlk max enjoy cheynm meetup um birthday party ellam koode colour akkanm." }
  ],

  reasons: [
    "The way you laugh with your whole face.",
    "You make ordinary days feel like celebrations.",
    "You are kind when nobody is watching.",
    "Your hand fits mine like it was made to.",
    "You believe in me even when I forget to.",
    "Your terrible jokes. I love them anyway.",
    "You make every place feel like home.",
    "The way you say my name.",
    "You are my calm and my adventure at once.",
    "Because of how safe I feel beside you.",
    "You make me want to be better, gently.",
    "Simply because you are you."
  ],

  letterGreeting: "My dearest,",
  letter:
`Another year has gone by, and somehow I fall for you a little more every single day.

Thank you for the quiet mornings, the loud laughter, and the way you hold my hand through everything. You have turned ordinary moments into memories I will keep forever.

I do not need a perfect life. I only need one with you in it. Wherever we go and whatever comes, you are the person I want beside me.

Happy anniversary, my love. Here is to every year we have yet to share.`,
  letterSign: "Forever yours,\nAruMon",

  finaleTitle: "See you at the next one",
  finaleMessage: "I love you. Always.",
  footer: "Made with love, for Kaathu."
};

/* =========================================================
   Everything below makes the site work. You do not need to edit it.
   ========================================================= */
(() => {
  "use strict";

  const $ = (id) => document.getElementById(id);
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const finePointer = window.matchMedia("(pointer: fine)").matches;
  const start = new Date(CONFIG.startDate);
  const HEART_PATH = "M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z";
  const clamp = (n, a, b) => Math.min(b, Math.max(a, n));
  const pad = (n) => String(n).padStart(2, "0");
  const shuffle = (arr) => { for (let i = arr.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [arr[i], arr[j]] = [arr[j], arr[i]]; } return arr; };
  const ordinal = (n) => { const s = ["th", "st", "nd", "rd"], v = n % 100; return n + (s[(v - 20) % 10] || s[v] || s[0]); };

  /* ---------- Fill in text from CONFIG ---------- */
  const A = CONFIG.partnerA, B = CONFIG.partnerB;
  document.title = `${A} & ${B} | Happy Anniversary`;
  $("brand").textContent = `${A[0]} & ${B[0]}`;
  $("heroLine").textContent = CONFIG.heroLine;
  $("envTo").textContent = `For ${B}`;
  $("envCardText").textContent = "Happy Anniversary";
  $("letterGreeting").textContent = CONFIG.letterGreeting;
  $("letterSign").textContent = CONFIG.letterSign;
  $("finaleTitle").textContent = CONFIG.finaleTitle;
  $("footerText").textContent = CONFIG.footer;

  /* Names, split into letters for the entrance */
  (function buildNames() {
    const host = $("names");
    host.setAttribute("aria-label", `${A} and ${B}`);
    let i = 0;
    `${A} & ${B}`.split(" ").forEach((w) => {
      const word = document.createElement("span");
      word.className = "word";
      word.setAttribute("aria-hidden", "true");
      [...w].forEach((c) => {
        const s = document.createElement("span");
        s.className = "ch" + (c === "&" ? " amp" : "");
        s.style.setProperty("--i", i++);
        s.textContent = c;
        word.appendChild(s);
      });
      host.appendChild(word);
      i++;
    });
  })();

  /* ---------- Canvas: petals, trail, bursts ---------- */
  const cv = $("fx"), ctx = cv.getContext("2d");
  let W = 0, H = 0, DPR = 1;
  const parts = [];
  const COLORS = ["#e0708f", "#f6e1e2", "#e8c992", "#ff9ab8", "#b83b66"];

  function resize() {
    DPR = Math.min(window.devicePixelRatio || 1, 2);
    W = window.innerWidth; H = window.innerHeight;
    cv.width = W * DPR; cv.height = H * DPR;
    ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
  }
  window.addEventListener("resize", resize);
  resize();

  function drawHeart(c, s) {
    c.beginPath();
    c.moveTo(0, s * 0.35);
    c.bezierCurveTo(-s * 1.1, -s * 0.3, -s * 0.55, -s * 1.0, 0, -s * 0.45);
    c.bezierCurveTo(s * 0.55, -s * 1.0, s * 1.1, -s * 0.3, 0, s * 0.35);
    c.closePath();
  }
  function drawPetal(c, s) {
    c.beginPath();
    c.moveTo(0, -s);
    c.quadraticCurveTo(s * 0.9, -s * 0.2, 0, s);
    c.quadraticCurveTo(-s * 0.9, -s * 0.2, 0, -s);
    c.closePath();
  }

  function newPetal(initial) {
    return {
      type: "petal",
      x: Math.random() * W,
      y: initial ? Math.random() * H : -20,
      s: 6 + Math.random() * 7,
      vy: 0.35 + Math.random() * 0.7,
      sway: Math.random() * Math.PI * 2,
      swaySpeed: 0.008 + Math.random() * 0.012,
      r: Math.random() * Math.PI * 2,
      vr: (Math.random() - 0.5) * 0.03,
      color: COLORS[Math.floor(Math.random() * 3)],
      a: 0.25 + Math.random() * 0.3
    };
  }

  if (!reduceMotion) {
    const count = W < 600 ? 12 : 24;
    for (let i = 0; i < count; i++) parts.push(newPetal(true));
  }

  function burst(x, y, n = 16, power = 1) {
    for (let i = 0; i < n; i++) {
      const ang = Math.random() * Math.PI * 2;
      const sp = (1.5 + Math.random() * 4.5) * power;
      parts.push({
        type: "heart", x, y,
        vx: Math.cos(ang) * sp, vy: Math.sin(ang) * sp - 1.5 * power,
        s: 5 + Math.random() * 8, r: (Math.random() - 0.5) * 0.8,
        life: 0, max: 70 + Math.random() * 50,
        color: COLORS[Math.floor(Math.random() * COLORS.length)]
      });
    }
  }
  function trail(x, y) {
    parts.push({
      type: "heart", x, y, vx: (Math.random() - 0.5) * 0.6, vy: -0.5 - Math.random() * 0.6,
      s: 4 + Math.random() * 4, r: (Math.random() - 0.5) * 0.4,
      life: 0, max: 45, grav: -0.002, color: COLORS[Math.floor(Math.random() * COLORS.length)]
    });
  }

  let running = true;
  function loop() {
    if (!running) return;
    ctx.clearRect(0, 0, W, H);
    for (let i = parts.length - 1; i >= 0; i--) {
      const p = parts[i];
      ctx.save();
      if (p.type === "petal") {
        p.sway += p.swaySpeed; p.x += Math.sin(p.sway) * 0.6; p.y += p.vy; p.r += p.vr;
        ctx.globalAlpha = p.a; ctx.translate(p.x, p.y); ctx.rotate(p.r);
        ctx.fillStyle = p.color; drawPetal(ctx, p.s); ctx.fill();
        ctx.restore();
        if (p.y > H + 20) parts[i] = newPetal(false);
        continue;
      }
      p.life++; p.x += p.vx; p.y += p.vy; p.vy += p.grav === undefined ? 0.07 : p.grav; p.vx *= 0.99;
      const k = 1 - p.life / p.max;
      ctx.globalAlpha = Math.max(0, k);
      ctx.translate(p.x, p.y); ctx.rotate(p.r * p.life * 0.05);
      ctx.fillStyle = p.color; ctx.shadowColor = p.color; ctx.shadowBlur = 8;
      drawHeart(ctx, p.s * (0.6 + 0.4 * k)); ctx.fill();
      ctx.restore();
      if (p.life >= p.max) parts.splice(i, 1);
    }
    requestAnimationFrame(loop);
  }
  document.addEventListener("visibilitychange", () => {
    running = !document.hidden;
    if (running) requestAnimationFrame(loop);
  });
  requestAnimationFrame(loop);

  /* Cursor heart trail (desktop only) */
  if (finePointer && !reduceMotion) {
    let last = 0;
    window.addEventListener("pointermove", (e) => {
      if (e.pointerType !== "mouse" || document.body.classList.contains("locked")) return;
      const now = performance.now();
      if (now - last > 70) { last = now; trail(e.clientX, e.clientY); }
    });
  }
  /* Little burst wherever you tap */
  document.addEventListener("click", (e) => {
    if (document.body.classList.contains("locked") || $("lb").contains(e.target)) return;
    burst(e.clientX, e.clientY, 6, 0.6);
  });

  /* ---------- Music ---------- */
  const musicBtn = $("music");
  const audio = new Audio();
  audio.loop = true; audio.volume = 0.6; audio.preload = "metadata";
  audio.src = CONFIG.song;
  audio.addEventListener("loadedmetadata", () => { musicBtn.hidden = false; });
  audio.addEventListener("error", () => { musicBtn.hidden = true; });
  function setMusic(on) {
    if (on) {
      audio.play().then(() => {
        musicBtn.setAttribute("aria-pressed", "true");
        musicBtn.setAttribute("aria-label", "Pause our song");
      }).catch(() => {});
    } else {
      audio.pause();
      musicBtn.setAttribute("aria-pressed", "false");
      musicBtn.setAttribute("aria-label", "Play our song");
    }
  }
  musicBtn.addEventListener("click", () => setMusic(audio.paused));

  /* ---------- Intro envelope ---------- */
  const seal = $("seal"), envelope = $("envelope"), intro = $("intro");
  let opened = false;
  function openEnvelope() {
    if (opened) return;
    opened = true;
    const r = seal.getBoundingClientRect();
    envelope.classList.add("open");
    burst(r.left + r.width / 2, r.top + r.height / 2, 22, 1.1);
    setMusic(true);
    const t = reduceMotion ? 300 : 2400;
    setTimeout(() => {
      intro.classList.add("done");
      document.body.classList.remove("locked");
      document.body.classList.add("revealed");
      if (!reduceMotion) setTimeout(() => burst(W / 2, H * 0.4, 28, 1.3), 600);
    }, t);
    setTimeout(() => { intro.hidden = true; }, t + 1500);
  }
  seal.addEventListener("click", openEnvelope);
  seal.focus({ preventScroll: true });

  /* ---------- Time together (live) ---------- */
  function elapsed(from, to) {
    let months = (to.getFullYear() - from.getFullYear()) * 12 + (to.getMonth() - from.getMonth());
    let anchor = new Date(from); anchor.setMonth(from.getMonth() + months);
    if (anchor > to) { months--; anchor = new Date(from); anchor.setMonth(from.getMonth() + months); }
    const rem = Math.max(0, to - anchor);
    return {
      years: Math.floor(months / 12), months: months % 12,
      days: Math.floor(rem / 864e5), hours: Math.floor(rem / 36e5) % 24,
      minutes: Math.floor(rem / 6e4) % 60, seconds: Math.floor(rem / 1e3) % 60
    };
  }

  function buildCounter(host, units) {
    const refs = {};
    host.innerHTML = "";
    units.forEach(([key, label]) => {
      const u = document.createElement("div"); u.className = "unit";
      const b = document.createElement("b"); b.textContent = "0";
      const s = document.createElement("span"); s.textContent = label;
      u.append(b, s); host.appendChild(u); refs[key] = { b, s, label };
    });
    return refs;
  }
  const plural = (n, word) => (n === 1 ? word : word + "s");

  const togetherRefs = buildCounter($("counter"), [
    ["years", "years"], ["months", "months"], ["days", "days"],
    ["hours", "hours"], ["minutes", "minutes"], ["seconds", "seconds"]
  ]);
  function updateTogether() {
    const e = elapsed(start, new Date());
    Object.keys(togetherRefs).forEach((k) => {
      const v = e[k], ref = togetherRefs[k];
      const txt = ["hours", "minutes", "seconds"].includes(k) ? pad(v) : String(v);
      if (ref.b.textContent !== txt) ref.b.textContent = txt;
      const word = k.slice(0, -1);
      ref.s.textContent = plural(v, word);
    });
  }

  /* ---------- Next anniversary countdown ---------- */
  const cdRefs = buildCounter($("countdown"), [["days", "days"], ["hours", "hours"], ["minutes", "minutes"], ["seconds", "seconds"]]);
  function nextAnniversary() {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    let target = new Date(now.getFullYear(), start.getMonth(), start.getDate());
    if (target < today) target = new Date(now.getFullYear() + 1, start.getMonth(), start.getDate());
    return { target, today, n: target.getFullYear() - start.getFullYear() };
  }
  function updateCountdown() {
    const now = new Date();
    const { target, today, n } = nextAnniversary();
    const isToday = target.getTime() === today.getTime();
    if (isToday) {
      $("finaleTitle").textContent = "Today is our day";
      $("finaleSub").textContent = `Happy ${ordinal(n)} anniversary, ${B}.`;
      Object.values(cdRefs).forEach((r) => (r.b.textContent = "00"));
      return;
    }
    $("finaleSub").textContent = `Counting down to our ${ordinal(n)} anniversary.`;
    const ms = Math.max(0, target - now);
    const v = {
      days: Math.floor(ms / 864e5), hours: Math.floor(ms / 36e5) % 24,
      minutes: Math.floor(ms / 6e4) % 60, seconds: Math.floor(ms / 1e3) % 60
    };
    Object.keys(cdRefs).forEach((k) => {
      const txt = k === "days" ? String(v[k]) : pad(v[k]);
      if (cdRefs[k].b.textContent !== txt) cdRefs[k].b.textContent = txt;
      cdRefs[k].s.textContent = plural(v[k], k.slice(0, -1));
    });
  }
  updateTogether(); updateCountdown();
  setInterval(() => { updateTogether(); updateCountdown(); }, 1000);

  /* ---------- Hero photo (with graceful fallback) + tilt ---------- */
  const cover = $("coverImg");
  cover.addEventListener("error", () => { cover.hidden = true; $("coverPh").hidden = false; });
  cover.src = CONFIG.cover;

  const heroPhoto = $("heroPhoto");
  if (finePointer && !reduceMotion) {
    heroPhoto.addEventListener("pointermove", (e) => {
      const r = heroPhoto.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width - 0.5, py = (e.clientY - r.top) / r.height - 0.5;
      heroPhoto.style.setProperty("--ry", (px * 14).toFixed(2) + "deg");
      heroPhoto.style.setProperty("--rx", (-py * 12).toFixed(2) + "deg");
    });
    heroPhoto.addEventListener("pointerleave", () => {
      heroPhoto.style.setProperty("--ry", "0deg"); heroPhoto.style.setProperty("--rx", "0deg");
    });
  }

  /* ---------- Timeline ---------- */
  const tl = $("timeline");
  CONFIG.story.forEach((s) => {
    const li = document.createElement("li");
    li.className = "tl-item";
    li.innerHTML = '<div class="tl-body"><p class="tl-date"></p><h3 class="tl-title"></h3><p class="tl-text"></p></div>';
    li.querySelector(".tl-date").textContent = s.date;
    li.querySelector(".tl-title").textContent = s.title;
    li.querySelector(".tl-text").textContent = s.text;
    tl.appendChild(li);
  });
  const tlItems = [...tl.children];
  function onScroll() {
    $("nav").classList.toggle("solid", window.scrollY > 40);
    const vh = window.innerHeight, r = tl.getBoundingClientRect();
    tl.style.setProperty("--p", clamp((vh * 0.6 - r.top) / r.height, 0, 1).toFixed(4));
    tlItems.forEach((it) => it.classList.toggle("in", it.getBoundingClientRect().top < vh * 0.66));
  }
  let ticking = false;
  window.addEventListener("scroll", () => {
    if (!ticking) { ticking = true; requestAnimationFrame(() => { onScroll(); ticking = false; }); }
  }, { passive: true });
  window.addEventListener("resize", onScroll);
  onScroll();

  /* ---------- Gallery + lightbox ---------- */
  const GRADS = [
    "linear-gradient(150deg,#7a2a5a,#2a1230)", "linear-gradient(150deg,#b83b66,#4a1a3c)",
    "linear-gradient(150deg,#6b3a6e,#241034)", "linear-gradient(150deg,#a8506b,#3a1830)",
    "linear-gradient(150deg,#5d1d47,#1d0f24)", "linear-gradient(150deg,#c26a78,#4a1a3c)"
  ];
  const svgHeart = `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="${HEART_PATH}"/></svg>`;
  function makePlaceholder(p, i, withRatio) {
    const d = document.createElement("div");
    d.className = "ph";
    d.style.setProperty("--g", GRADS[i % GRADS.length]);
    if (withRatio) d.style.aspectRatio = `1 / ${p.ratio || 1.2}`;
    d.innerHTML = svgHeart + `<span>Add ${p.src}</span>`;
    return d;
  }

  const gallery = $("gallery");
  const failed = new Set();
  CONFIG.photos.forEach((p, i) => {
    const cap = p.caption || "";
    const btn = document.createElement("button");
    btn.type = "button"; btn.className = "shot";
    if (cap) btn.dataset.cap = cap;
    btn.setAttribute("aria-label", cap ? `Open photo: ${cap}` : `Open photo ${i + 1}`);
    const img = new Image();
    img.alt = cap || `Photo ${i + 1}`; img.loading = "lazy"; img.decoding = "async";
    img.addEventListener("error", () => { failed.add(i); img.replaceWith(makePlaceholder(p, i, true)); });
    img.src = p.src;
    btn.appendChild(img);
    btn.addEventListener("click", () => openLightbox(i));
    gallery.appendChild(btn);
  });

  const lb = $("lb"), lbImg = $("lbImg"), lbPh = $("lbPh"), lbCap = $("lbCap");
  let lbIndex = 0, lastFocus = null;
  function showPhoto(i) {
    const n = CONFIG.photos.length;
    lbIndex = (i + n) % n;
    const p = CONFIG.photos[lbIndex];
    lbCap.textContent = p.caption;
    lbPh.hidden = true; lbImg.hidden = false;
    lbImg.onerror = () => {
      lbImg.hidden = true; lbPh.hidden = false;
      lbPh.style.setProperty("--g", GRADS[lbIndex % GRADS.length]);
      lbPh.innerHTML = svgHeart + `<span>Add ${p.src}</span>`;
    };
    lbImg.alt = p.caption;
    lbImg.src = p.src;
    lbImg.style.animation = "none"; void lbImg.offsetWidth; lbImg.style.animation = "";
  }
  function openLightbox(i) {
    lastFocus = document.activeElement;
    lb.hidden = false; document.body.style.overflow = "hidden";
    showPhoto(i); $("lbClose").focus();
  }
  function closeLightbox() {
    lb.hidden = true; document.body.style.overflow = "";
    if (lastFocus) lastFocus.focus({ preventScroll: true });
  }
  $("lbClose").addEventListener("click", closeLightbox);
  $("lbPrev").addEventListener("click", () => showPhoto(lbIndex - 1));
  $("lbNext").addEventListener("click", () => showPhoto(lbIndex + 1));
  lb.addEventListener("click", (e) => { if (e.target === lb || e.target.classList.contains("lb-fig")) closeLightbox(); });
  document.addEventListener("keydown", (e) => {
    if (lb.hidden) return;
    if (e.key === "Escape") closeLightbox();
    if (e.key === "ArrowLeft") showPhoto(lbIndex - 1);
    if (e.key === "ArrowRight") showPhoto(lbIndex + 1);
  });
  let touchX = null;
  lb.addEventListener("touchstart", (e) => { touchX = e.touches[0].clientX; }, { passive: true });
  lb.addEventListener("touchend", (e) => {
    if (touchX === null) return;
    const dx = e.changedTouches[0].clientX - touchX;
    if (Math.abs(dx) > 50) showPhoto(lbIndex + (dx < 0 ? 1 : -1));
    touchX = null;
  });

  /* ---------- Jar of notes ---------- */
  (function fillJar() {
    const g = $("jarPapers");
    const cols = ["#fbf0e4", "#f6c9d3", "#e8c992", "#e0708f", "#f6e1e2"];
    let html = "";
    for (let i = 0; i < 26; i++) {
      const x = 30 + Math.random() * 170, y = 150 + Math.random() * 130;
      const rot = Math.round(Math.random() * 120 - 60);
      html += `<rect x="${x.toFixed(0)}" y="${y.toFixed(0)}" width="${(26 + Math.random() * 16).toFixed(0)}" height="${(14 + Math.random() * 8).toFixed(0)}" rx="2" fill="${cols[i % cols.length]}" opacity=".92" transform="rotate(${rot} ${x.toFixed(0)} ${y.toFixed(0)})"/>`;
    }
    g.innerHTML = html;
  })();

  const jar = $("jar"), note = $("note"), noteText = $("noteText"), noteCount = $("noteCount");
  let deck = [], readCount = 0;
  noteText.textContent = `${CONFIG.reasons.length === 12 ? "Twelve" : CONFIG.reasons.length} little notes are waiting for you.`;
  function drawNote() {
    if (!deck.length) { deck = shuffle([...CONFIG.reasons.keys()]); readCount = 0; }
    const idx = deck.pop(); readCount++;
    jar.classList.remove("shake"); void jar.offsetWidth; jar.classList.add("shake");
    note.classList.remove("show");
    setTimeout(() => {
      noteText.textContent = CONFIG.reasons[idx];
      noteCount.textContent = `Note ${readCount} of ${CONFIG.reasons.length}`;
      void note.offsetWidth; note.classList.add("show");
    }, 280);
    const r = jar.getBoundingClientRect();
    burst(r.left + r.width / 2, r.top + 40, 10, 0.8);
  }
  jar.addEventListener("click", drawNote);
  $("drawBtn").addEventListener("click", drawNote);

  /* ---------- Love letter (typewriter) ---------- */
  const paper = $("paper"), typedEl = $("letterTyped"), restEl = $("letterRest"), signEl = $("letterSign");
  const openLetterBtn = $("openLetter");
  let typeTimer = null, typingDone = false;
  function finishLetter() {
    clearTimeout(typeTimer); typingDone = true;
    typedEl.textContent = CONFIG.letter; restEl.textContent = "";
    signEl.classList.add("show");
  }
  function typeLetter() {
    const txt = CONFIG.letter; let i = 0;
    (function step() {
      i++;
      typedEl.textContent = txt.slice(0, i); restEl.textContent = txt.slice(i);
      if (i >= txt.length) { finishLetter(); return; }
      const ch = txt[i - 1];
      typeTimer = setTimeout(step, 24 + (/[.!?]/.test(ch) ? 260 : /[,;]/.test(ch) ? 120 : 0));
    })();
  }
  restEl.textContent = CONFIG.letter;
  openLetterBtn.addEventListener("click", () => {
    openLetterBtn.disabled = true;
    paper.classList.add("open");
    paper.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "center" });
    setTimeout(() => (reduceMotion ? finishLetter() : typeLetter()), 900);
  });
  $("paperSheet").addEventListener("click", () => { if (paper.classList.contains("open") && !typingDone) finishLetter(); });

  /* ---------- Finale ---------- */
  const foreverBtn = $("foreverBtn"), finaleMsg = $("finaleMsg");
  foreverBtn.addEventListener("click", () => {
    finaleMsg.textContent = CONFIG.finaleMessage;
    finaleMsg.classList.add("loved");
    let n = 0;
    const id = setInterval(() => {
      burst(W * (0.15 + Math.random() * 0.7), H * (0.2 + Math.random() * 0.5), 26, 1.2);
      if (++n >= (reduceMotion ? 2 : 8)) clearInterval(id);
    }, 260);
  });
})();
