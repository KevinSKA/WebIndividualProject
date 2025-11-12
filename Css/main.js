// ========= helpers =========
function toMin(hhmm) {
  const [h, m] = hhmm.split(":").map(Number);
  return h * 60 + m;
}
function pad(n) { return String(n).padStart(2, "0"); }
function toHHMM(mins) {
  const h = Math.floor(mins / 60), m = mins % 60;
  return `${pad(h)}:${pad(m)}`;
}
function hexToRgba(hex, a = 0.32) {
  const h = hex.replace("#", "");
  const r = parseInt(h.slice(0, 2), 16);
  const g = parseInt(h.slice(2, 4), 16);
  const b = parseInt(h.slice(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${a})`;
}
function slugify(name) {
  return name
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

const days  = ["Mon", "Tue", "Wed", "Thu", "Fri"];
const table = document.getElementById("sch");
const tbody = table.querySelector("tbody");

// view window + row step
const start = "08:00";
const end   = "20:00";
const step  = 5; // minutes per row

// ========= build grid =========
function buildRows() {
  const startMin = toMin(start), endMin = toMin(end);
  for (let t = startMin; t < endMin; t += step) {
    const tr = document.createElement("tr");

    // time label every 30 min
    const th = document.createElement("th");
    th.className = "time-col";
    th.textContent = (t - startMin) % 30 === 0 ? toHHMM(t) : "";
    tr.appendChild(th);

    for (const _ of days) {
      const td = document.createElement("td");
      td.dataset.min = t;
      tr.appendChild(td);
    }
    tbody.appendChild(tr);
  }
}
buildRows();

// ========= classes (with colors + syllabus) =========
// Palette mapping (approx to your image):
//  - Network Arch & Protocols .......... #F7D774 (soft yellow)
//  - Network Arch & Protocols Lab ...... #89C8CD (aqua/teal)
//  - Numerical Analysis ................ #D9F0C1 (light green)
//  - Non Linear Electronics ............ #C199D9 (lavender)
//  - Non Linear Electronics Lab ........ #F2B785 (soft orange)
//  - Contemporary Cinema (Cinema) ...... #C8DB7D (lime green)
//  - Web Programming (GIN 446) ......... #E58B88 (warm red/salmon)

const classes = [
  // Contemporary Cinema
  {
    title: "Contemporary Cinema",
    day: "Mon",
    start: "14:00",
    end: "15:15",
    room: "D014",
    instructor: "Dr. Cynthia Zeinoun",
    desc: "The course studies several film authors and their contributions to world cinema.",
    color: "#C8DB7D",
    syllabus: `Syllabus/${slugify("Contemporary Cinema")}.pdf`,
  },
  {
    title: "Contemporary Cinema",
    day: "Fri",
    start: "14:00",
    end: "15:15",
    room: "D014",
    instructor: "Dr. Cynthia Zeinoun",
    desc: "The course studies several film authors and their contributions to world cinema.",
    color: "#C8DB7D",
    syllabus: `Syllabus/${slugify("Contemporary Cinema")}.pdf`,
  },

  // Web Programming
  {
    title: "Web Programming",
    day: "Mon",
    start: "15:30",
    end: "16:45",
    room: "H107",
    instructor: "Ing. Pascal Damien",
    desc: "",
    color: "#E58B88",
    syllabus: `Syllabus/${slugify("Web Programming")}.pdf`,
  },
  {
    title: "Web Programming",
    day: "Fri",
    start: "15:30",
    end: "16:45",
    room: "H107",
    instructor: "Ing. Pascal Damien",
    desc: "",
    color: "#E58B88",
    syllabus: `Syllabus/${slugify("Web Programming")}.pdf`,
  },

  // Network Arch & Protocols
  {
    title: "Network Arch & Protocols",
    day: "Tue",
    start: "8:00",
    end: "9:15",
    room: "H106",
    instructor: "Dr. Zeina Awada",
    desc: "",
    color: "#F7D774",
  },
  {
    title: "Network Arch & Protocols",
    day: "Thu",
    start: "8:00",
    end: "9:15",
    room: "H106",
    instructor: "Dr. Zeina Awada",
    desc: "",
    color: "#F7D774",
  },

  // Numerical Analysis
  {
    title: "Numerical Analysis",
    day: "Tue",
    start: "11:00",
    end: "12:15",
    room: "H302",
    instructor: "Mrs. Stephanie Chahine",
    desc: "",
    color: "#D9F0C1",
    syllabus: `Syllabus/${slugify("Numerical Analysis")}.pdf`,
  },
  {
    title: "Numerical Analysis",
    day: "Thu",
    start: "11:00",
    end: "12:15",
    room: "H302",
    instructor: "Mrs. Stephanie Chahine",
    desc: "",
    color: "#D9F0C1",
    syllabus: `Syllabus/${slugify("Numerical Analysis")}.pdf`,
  },

  // Non Linear Electronics
  {
    title: "Non Linear Electronics",
    day: "Tue",
    start: "12:30",
    end: "13:45",
    room: "H107",
    instructor: "Dr Joseph Elias Assad",
    desc: "",
    color: "#C199D9",
  },
  {
    title: "Non Linear Electronics",
    day: "Thu",
    start: "12:30",
    end: "13:45",
    room: "H107",
    instructor: "Dr Joseph Elias Assad",
    desc: "",
    color: "#C199D9",
  },

  // Network Arch & Protocols Lab
  {
    title: "Network Arch & Protocols Lab",
    day: "Wed",
    start: "9:00",
    end: "10:40",
    room: "Hs103",
    instructor: "Dr. Diala Abi Haidar",
    desc: "",
    color: "#89C8CD",
    syllabus: `Syllabus/${slugify("Network Arch and Protocols Lab")}.docx`,
  },

  // Non Linear Electronics Lab
  {
    title: "Non Linear Electronics Lab",
    day: "Fri",
    start: "17:30",
    end: "19:10",
    room: "Hs126",
    instructor: "Mr. Roy Samia",
    desc: "",
    color: "#F2B785",
    syllabus: `Syllabus/${slugify("Non Linear Electronics Lab")}.pdf`,
  },
];

// ========= render events =========
function renderClasses() {
  const root = getComputedStyle(document.documentElement);
  const rowH =
    parseFloat(root.getPropertyValue("--sch-row-h")) ||
    parseFloat(root.getPropertyValue("--sch-row-h".replace("--", "--sch-"))) ||
    10;
  const pxPerMin = rowH / step;

  for (const c of classes) {
    const startMin = toMin(c.start);
    const endMin   = toMin(c.end);
    const durMin   = Math.max(0, endMin + 5 - startMin);
    if (durMin === 0) continue;

    const rowMin   = Math.floor(startMin / step) * step;
    const dayIdx   = days.indexOf(c.day);
    if (dayIdx < 0) continue;

    const candidates = tbody.querySelectorAll(`td[data-min="${rowMin}"]`);
    const cell = candidates[dayIdx];
    if (!cell) continue;

    const ev = document.createElement("div");
    ev.className = "event";
    ev.style.top = `${(startMin - rowMin) * pxPerMin}px`;
    ev.style.height = `${durMin * pxPerMin}px`;

    if (c.color) {
      ev.style.background = hexToRgba(c.color, 0.32);       // transparent fill
      ev.style.border = `1px solid ${hexToRgba(c.color, .55)}`; // stronger border
    }

    const timeTxt = `${c.start.toUpperCase()}–${c.end.toUpperCase()}`;
    ev.innerHTML = `
      <div class="ev-wrap" style="width:100%;">
        <strong class="ev-title" style="display:block;">${c.title}</strong>
        ${c.instructor ? `<div class="ev-line">${c.instructor}</div>` : ""}
        <div class="ev-line">${timeTxt}</div>
        ${c.room ? `<div class="ev-line">${c.room}</div>` : ""}
      </div>
    `;

    ev.addEventListener("click", () => openModal(c));
    cell.appendChild(ev);
  }
}
renderClasses();

// ========= modal =========
const modal       = document.getElementById("modal");
const mTitle      = document.getElementById("mTitle");
const mInstructor = document.getElementById("mInstructor");
const mRoom       = document.getElementById("mRoom");
const mDesc       = document.getElementById("mDesc");
const mTime       = document.getElementById("mTime");
const mClose      = document.getElementById("mClose");
const mSyllabus   = document.getElementById("mSyllabus");

// insert separators (once)
let separatorsInitialized = false;
function ensureModalSeparators() {
  if (separatorsInitialized) return;
  const hr1 = document.createElement("hr"); hr1.className = "sep";
  const hr2 = document.createElement("hr"); hr2.className = "sep";
  const hr3 = document.createElement("hr"); hr3.className = "sep";
  mTitle.insertAdjacentElement("afterend", hr1);
  mTime.insertAdjacentElement("afterend", hr2);
  mInstructor.insertAdjacentElement("afterend", hr3);
  separatorsInitialized = true;
}

function openModal(c) {
  ensureModalSeparators();

  mTitle.textContent      = c.title || "Subject";
  mInstructor.textContent = c.instructor ? `Instructor: ${c.instructor}` : "";
  mRoom.textContent       = c.room ? `Room: ${c.room}` : "";
  mDesc.textContent       = c.desc || "";
  mTime.textContent       = c.start && c.end ? `Time: ${c.start} – ${c.end}` : "";

  // syllabus button
  if (mSyllabus) {
    if (c.syllabus) {
      mSyllabus.style.display = "inline-block";
      mSyllabus.href = c.syllabus;
    } else {
      mSyllabus.style.display = "none";
      mSyllabus.removeAttribute("href");
    }
  }

  modal.classList.add("open");
}
function closeModal() { modal.classList.remove("open"); }
mClose.addEventListener("click", closeModal);
modal.addEventListener("click", (e) => { if (e.target === modal) closeModal(); });
document.addEventListener("keydown", (e) => { if (e.key === "Escape") closeModal(); });
