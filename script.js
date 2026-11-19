// =========================
// 인공지능 수학 연수 — 홈페이지 동작
// 이 파일은 고치지 않아도 됩니다.
// 홈페이지 이름, 자료 목록, 일정은 site-config.js에서 관리합니다.
// =========================

/* ---------- site-config.js 문구 적용 ---------- */

function applySiteConfig() {
  if (typeof SITE === "undefined") return;
  document.querySelectorAll("[data-site]").forEach(el => {
    const value = SITE[el.dataset.site];
    if (value) el.textContent = value;
  });
  document.title = SITE.name;
  const search = document.querySelector("#searchInput");
  if (search && SITE.searchPlaceholder) search.placeholder = SITE.searchPlaceholder;
}

const TINTS = ["#d9f24f", "#bfe0ff", "#ffd0c4", "#cfe9d8", "#e0d6ff", "#ffe9a8"];

const els = {
  grid: document.querySelector("#toolsGrid"),
  search: document.querySelector("#searchInput"),
  reset: document.querySelector("#resetBtn"),
  groups: document.querySelector("#subjectGroups"),
  count: document.querySelector("#toolCount"),
  filteredCount: document.querySelector("#filteredCount"),
  dayGrid: document.querySelector("#dayGrid"),
  infoList: document.querySelector("#infoList"),
  empty: document.querySelector("#emptyMessage"),
  modal: document.querySelector("#qrModal"),
  qrTitle: document.querySelector("#qrTitle"),
  qrCode: document.querySelector("#qrCode"),
  qrUrl: document.querySelector("#qrUrl"),
  copyBtn: document.querySelector("#copyUrlBtn")
};

let selectedSubject = "전체";
let currentQrUrl = "";

/* ---------- 과목 필터 ---------- */

function initializeSubjects() {
  const rows = [
    { label: "전체", items: ["전체"] },
    ...SUBJECT_GROUPS
  ];

  for (const row of rows) {
    const rowEl = document.createElement("div");
    rowEl.className = "subject-row";

    const label = document.createElement("span");
    label.className = "row-label";
    label.textContent = row.label;

    const chips = document.createElement("div");
    chips.className = "row-chips";
    for (const subject of row.items) chips.appendChild(createSubjectChip(subject));

    rowEl.append(label, chips);
    els.groups.appendChild(rowEl);
  }
}

function createSubjectChip(subject) {
  const button = document.createElement("button");
  button.type = "button";
  button.className = "subject-chip";
  button.dataset.subject = subject;
  button.innerHTML = `${escapeHtml(subject)}<span class="chip-count">0</span>`;
  button.addEventListener("click", () => setSubject(subject));
  return button;
}

function setSubject(subject) {
  selectedSubject = subject;
  renderTools();
}

/* ---------- 링크 종류 ---------- */

function isExternal(url) {
  return /^https?:\/\//i.test(url || "");
}

function hasLink(tool) {
  return Boolean(tool.url && tool.url.trim());
}

function matchesQuery(tool, query) {
  return [tool.title, tool.subject, tool.type || "", tool.description, ...(tool.tags || [])]
    .join(" ")
    .toLowerCase()
    .includes(query);
}

function updateChips(query) {
  const byQuery = TOOLS.filter(tool => matchesQuery(tool, query));

  document.querySelectorAll(".subject-chip").forEach(chip => {
    const subject = chip.dataset.subject;
    const count = subject === "전체"
      ? byQuery.length
      : byQuery.filter(tool => tool.subject === subject).length;

    chip.querySelector(".chip-count").textContent = count;
    chip.classList.toggle("has-items", count > 0);
    chip.classList.toggle("active", subject === selectedSubject);
  });
}
/* ---------- 썸네일 자동 매칭 ---------- */

function toolFolderName(tool) {
  return tool.url
    .replace(/^\.?\//, "")
    .replace(/\/+$/, "")
    .split("/")
    .filter(Boolean)
    .pop();
}

function setupAutoThumbnail(card, tool) {
  const img = card.querySelector(".card-thumb");
  const placeholder = card.querySelector(".media-placeholder");

  img.addEventListener("load", () => {
    img.style.display = "block";
    placeholder.style.display = "none";
  });

  // 직접 지정한 썸네일
  if (tool.thumb) {
    img.addEventListener("error", () => (img.style.display = "none"));
    img.src = tool.thumb;
    return;
  }

  // 저장소 안의 앱만 thumbnails/폴더이름.png 를 자동으로 찾음
  if (!hasLink(tool) || isExternal(tool.url)) return;

  const folder = toolFolderName(tool);
  const extensions = ["jpg", "png", "jpeg", "webp"];
  let index = 0;

  function tryNext() {
    if (index >= extensions.length) {
      img.style.display = "none";
      placeholder.style.display = "";
      return;
    }

    img.src = `./thumbnails/${folder}.${extensions[index++]}`;
  }

  img.addEventListener("error", tryNext);

  tryNext();
}

/* ---------- 카드 ---------- */

function renderTools() {
  const query = els.search.value.trim().toLowerCase();
  const tools = TOOLS.filter(tool =>
    (selectedSubject === "전체" || tool.subject === selectedSubject) &&
    matchesQuery(tool, query)
  );

  updateChips(query);

  els.grid.innerHTML = "";
  els.filteredCount.textContent = tools.length;
  els.empty.hidden = tools.length > 0;

  tools.forEach((tool, index) => {
    const card = document.createElement("article");
    card.className = "tool-card";
    card.style.setProperty("--card-tint", TINTS[index % TINTS.length]);

    card.innerHTML = `
      <div class="card-media">
  <img
    class="card-thumb"
    alt="${escapeHtml(tool.title)} 썸네일"
    style="position:absolute; inset:0; width:100%; height:100%;
           object-fit:cover; display:none; z-index:0;"
  >

  <span class="card-num" style="z-index:2">
    ${String(index + 1).padStart(2, "0")}
  </span>

  ${tool.type ? `<span class="card-type" style="z-index:2">${escapeHtml(tool.type)}</span>` : ""}

  <div class="media-placeholder"
       style="position:relative; z-index:1;
              display:grid; place-items:center; gap:10px;">
    <span class="media-symbol" aria-hidden="true">${escapeHtml(tool.symbol || "↗")}</span>
  </div>
</div>
      <div class="card-body">
        <span class="subject-label">${escapeHtml(tool.subject)}</span>
        <h3>${escapeHtml(tool.title)}</h3>
        <p>${escapeHtml(tool.description)}</p>
        <div class="card-actions">
          ${hasLink(tool)
            ? `<a class="open-tool" href="${escapeHtml(tool.url)}"${isExternal(tool.url) ? ' target="_blank" rel="noopener"' : ""}>자료 열기 ↗</a>`
            : `<span class="open-tool is-pending" aria-disabled="true">링크 준비 중</span>`}
          ${hasLink(tool) ? `<button class="qr-tool" type="button" aria-label="${escapeHtml(tool.title)} QR 열기">
            <span class="qr-glyph" aria-hidden="true">
              <i class="on"></i><i class="on"></i><i></i>
              <i class="on"></i><i></i><i class="on"></i>
              <i></i><i class="on"></i><i class="on"></i>
            </span>
          </button>` : ""}
        </div>
      </div>
    `;
    if (!hasLink(tool)) card.classList.add("is-pending");
    setupAutoThumbnail(card, tool);
    card.querySelector(".qr-tool")?.addEventListener("click", () => {
      openQr(tool.title, new URL(tool.url, window.location.href).href);
    });

    els.grid.appendChild(card);
  });
}

/* ---------- 연수 일정 ---------- */

function todayString() {
  const now = new Date();
  const pad = n => String(n).padStart(2, "0");
  return `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}`;
}

function renderInfo() {
  if (!els.infoList || typeof INFO === "undefined") return;
  els.infoList.innerHTML = INFO.map(item => `
    <div><dt>${escapeHtml(item.label)}</dt><dd>${escapeHtml(item.value)}</dd></div>
  `).join("");
}

function renderSchedule() {
  if (!els.dayGrid || typeof SCHEDULE === "undefined") return;
  const today = todayString();

  els.dayGrid.innerHTML = "";
  SCHEDULE.forEach(day => {
    const isToday = day.date === today;
    const col = document.createElement("article");
    col.className = "day-card" + (isToday ? " is-today" : "");
    col.innerHTML = `
      <header class="day-head">
        <b>${escapeHtml(day.day)}</b>
        <span>${escapeHtml(day.label || day.date)}</span>
        ${isToday ? '<em class="today-badge">TODAY</em>' : ""}
      </header>
      <ol class="session-list">
        ${(day.sessions || []).map(session => `
          <li>
            <time>${escapeHtml(session.time || "")}</time>
            <div>
              <strong>${escapeHtml(session.title || "")}</strong>
              ${session.speaker ? `<small>${escapeHtml(session.speaker)}</small>` : ""}
            </div>
          </li>
        `).join("")}
      </ol>
      ${day.subject ? `<button class="day-link" type="button">이날 자료 보기 ↗</button>` : ""}
    `;
    col.querySelector(".day-link")?.addEventListener("click", () => {
      els.search.value = "";
      setSubject(day.subject);
      document.querySelector("#tools").scrollIntoView({ behavior: "smooth" });
    });
    els.dayGrid.appendChild(col);
  });
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

/* ---------- QR ---------- */

function openQr(title, url) {
  currentQrUrl = url;
  els.qrTitle.textContent = title;
  els.qrUrl.textContent = url;
  els.qrCode.innerHTML = "";

  if (window.QRCode) {
    new QRCode(els.qrCode, { text: url, width: 190, height: 190, correctLevel: QRCode.CorrectLevel.M });
  } else {
    els.qrCode.textContent = "QR 라이브러리를 불러오지 못했습니다.";
  }

  els.modal.hidden = false;
  document.body.style.overflow = "hidden";
}

function closeQr() {
  els.modal.hidden = true;
  document.body.style.overflow = "";
}

async function copyQrUrl() {
  if (!currentQrUrl) return;

  try {
    await navigator.clipboard.writeText(currentQrUrl);
    const oldText = els.copyBtn.textContent;
    els.copyBtn.textContent = "복사됨";
    setTimeout(() => (els.copyBtn.textContent = oldText), 1200);
  } catch {
    window.prompt("주소를 복사하세요.", currentQrUrl);
  }
}

/* ---------- 이벤트 ---------- */

els.search.addEventListener("input", renderTools);

els.reset.addEventListener("click", () => {
  els.search.value = "";
  setSubject("전체");
});

document.querySelector("#siteQrBtn").addEventListener("click", () => {
  openQr(document.title, window.location.href.split("#")[0]);
});

document.querySelectorAll("[data-close-modal]").forEach(element => {
  element.addEventListener("click", closeQr);
});

els.copyBtn.addEventListener("click", copyQrUrl);

document.addEventListener("keydown", event => {
  if (event.key === "Escape" && !els.modal.hidden) closeQr();
});

applySiteConfig();
initializeSubjects();
els.count.textContent = TOOLS.length;
renderTools();
renderInfo();
renderSchedule();
