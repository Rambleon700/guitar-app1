// app.js (ES Module entry point)
// Imports (modules located in /modules/)
import { renderChordDiagram } from "./modules/chord-diagram.js";
import { renderFretboard } from "./modules/fretboard-engine.js";
import { buildPatternDots, playPatternAnimation } from "./modules/pattern-engine.js";
import { generatePracticePlan } from "./modules/practice-engine.js";

/* ===========================
   Data: Songs + Chord Library
   =========================== */

const songs = [
  { title: "Horse With No Name", artist: "America", difficulty: "Easy",
    chords: ["Em","D6add9/F#"], pattern: "D D D D",
    tips: "Let open strings ring; keep right hand relaxed.", progress: 4 },

  { title: "Knockin' on Heaven's Door", artist: "Bob Dylan", difficulty: "Easy",
    chords: ["G","D","Am","C"], pattern: "D D U U D U",
    tips: "Let chords ring naturally; keep tempo steady.", progress: 2 },

  { title: "Wonderwall", artist: "Oasis", difficulty: "Easy",
    chords: ["Em7","G","Dsus4","A7"], pattern: "D D U U D U",
    tips: "Loose wrist, relaxed upstrokes.", progress: 3 },

  { title: "Hotel California", artist: "Eagles", difficulty: "Intermediate",
    chords: ["Bm","F#","A","E","G","D","Em"], pattern: "D D U U D U",
    tips: "Focus on smooth chord transitions.", progress: 1 },

  { title: "Blackbird", artist: "The Beatles", difficulty: "Advanced",
    chords: ["G","A","C","D","Em"], pattern: "Fingerpicked",
    tips: "Focus on alternating bass notes.", progress: 1 },

  // ... (add more songs as needed; this bundle includes 50+ in the full ZIP)
];

const chords = {
  "C":  { frets:[-1,3,2,0,1,0], fingers:[0,3,2,0,1,0], baseFret:1, root:"C" },
  "D":  { frets:[-1,-1,0,2,3,2], fingers:[0,0,0,1,3,2], baseFret:1, root:"D" },
  "E":  { frets:[0,2,2,1,0,0], fingers:[0,2,3,1,0,0], baseFret:1, root:"E" },
  "G":  { frets:[3,2,0,0,0,3], fingers:[2,1,0,0,0,3], baseFret:1, root:"G" },
  "A":  { frets:[-1,0,2,2,2,0], fingers:[0,0,1,2,3,0], baseFret:1, root:"A" },
  "F":  { frets:[1,3,3,2,1,1], fingers:[1,3,4,2,1,1], baseFret:1, root:"F" },

  "Am": { frets:[-1,0,2,2,1,0], fingers:[0,0,2,3,1,0], baseFret:1, root:"A" },
  "Dm": { frets:[-1,-1,0,2,3,1], fingers:[0,0,0,2,3,1], baseFret:1, root:"D" },
  "Em": { frets:[0,2,2,0,0,0], fingers:[0,2,3,0,0,0], baseFret:1, root:"E" },

  "A7": { frets:[-1,0,2,0,2,0], fingers:[0,0,2,0,3,0], baseFret:1, root:"A" },
  "B7": { frets:[-1,2,1,2,0,2], fingers:[0,2,1,3,0,4], baseFret:1, root:"B" },
  "C7": { frets:[-1,3,2,3,1,0], fingers:[0,3,2,4,1,0], baseFret:1, root:"C" },
  "Dsus4": { frets:[-1,-1,0,2,3,3], fingers:[0,0,0,1,3,4], baseFret:1, root:"D" },
  "Em7": { frets:[0,2,2,0,3,3], fingers:[0,2,3,0,4,1], baseFret:1, root:"E" },
  "D6add9/F#": { frets:[2,0,0,2,3,0], fingers:[2,0,0,1,3,0], baseFret:1, root:"D" },
  // ... (extend chord library in modules or data file)
};

/* ===========================
   DOM Helpers & State
   =========================== */
const qs = s => document.querySelector(s);
const qsa = s => Array.from(document.querySelectorAll(s));

let chordCountFilter = "all";
let difficultyFilter = "all";
let currentModalSong = null;

/* ===========================
   Navigation
   =========================== */
qsa(".nav-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    qsa(".nav-btn").forEach(b => {
      b.classList.remove("active");
      b.setAttribute("aria-pressed", "false");
    });
    btn.classList.add("active");
    btn.setAttribute("aria-pressed", "true");
    const target = btn.dataset.section;
    qsa(".section").forEach(sec => sec.classList.toggle("active", sec.id === target));
    // focus first interactive element in section for accessibility
    const section = qs(`#${target}`);
    if (section) {
      const focusable = section.querySelector("button, input, select, a");
      if (focusable) focusable.focus();
    }
  });
});

/* ===========================
   Songs Rendering & Filters
   =========================== */
const songsGrid = qs("#songs-grid");

function renderSongs() {
  songsGrid.innerHTML = "";
  songs.forEach(song => {
    const chordCount = song.chords.length;
    const passesChordCount =
      chordCountFilter === "all" ||
      (chordCountFilter === "2" && chordCount === 2) ||
      (chordCountFilter === "3" && chordCount === 3) ||
      (chordCountFilter === "4plus" && chordCount >= 4);

    const passesDifficulty =
      difficultyFilter === "all" || song.difficulty === difficultyFilter;

    if (!passesChordCount || !passesDifficulty) return;

    const card = document.createElement("div");
    card.className = "song-card";
    card.tabIndex = 0;
    card.innerHTML = `
      <div class="song-meta-row">
        <div>
          <h3 class="song-title">${song.title}</h3>
          <p class="song-artist">${song.artist}</p>
        </div>
        <span class="song-difficulty" data-level="${song.difficulty}">${song.difficulty}</span>
      </div>
      <p class="song-chords"><strong>Chords:</strong> ${song.chords.join(", ")}</p>
      <p class="song-pattern"><strong>Pattern:</strong> ${song.pattern}</p>
    `;
    card.addEventListener("click", () => openSongModal(song));
    card.addEventListener("keydown", (e) => { if (e.key === "Enter") openSongModal(song); });
    songsGrid.appendChild(card);
  });
}

qsa(".chord-count-filter").forEach(btn => {
  btn.addEventListener("click", () => {
    qsa(".chord-count-filter").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    chordCountFilter = btn.dataset.filter;
    renderSongs();
  });
});

qsa(".difficulty-filter").forEach(btn => {
  btn.addEventListener("click", () => {
    qsa(".difficulty-filter").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    difficultyFilter = btn.dataset.filter;
    renderSongs();
  });
});

/* ===========================
   Song Modal
   =========================== */
const songModal = qs("#song-modal");
const songModalClose = qs("#song-modal-close");
const modalSongTitle = qs("#modal-song-title");
const modalSongArtist = qs("#modal-song-artist");
const modalSongChords = qs("#modal-song-chords");
const modalSongPattern = qs("#modal-song-pattern");
const modalSongTips = qs("#modal-song-tips");
const modalSongProgress = qs("#modal-song-progress .progress-fill");
const modalPatternPlayBtn = qs("#modal-pattern-play-btn");

function openSongModal(song) {
  currentModalSong = song;
  modalSongTitle.textContent = song.title;
  modalSongArtist.textContent = song.artist;
  modalSongPattern.textContent = song.pattern;
  modalSongTips.textContent = song.tips;
  modalSongProgress.style.width = `${Math.min(100, song.progress * 20)}%`;

  modalSongChords.innerHTML = "";
  song.chords.forEach(ch => {
    const pill = document.createElement("button");
    pill.className = "modal-chord-pill";
    pill.textContent = ch;
    pill.addEventListener("click", () => {
      const canvas = qs("#chord-canvas");
      if (canvas) renderChordDiagram(canvas, ch, chords[ch] || null);
      // also switch to chords section for deeper view
      const chordsNav = qsa(".nav-btn").find?.(b => b.dataset.section === "chords-section");
      if (chordsNav) chordsNav.click();
    });
    modalSongChords.appendChild(pill);
  });

  // set aria and show
  songModal.classList.add("open");
  songModal.setAttribute("aria-hidden", "false");
  // render modal fretboard default (root from first chord)
  const modalRoot = (song.chords[0] || "C").replace(/[^A-G#b]/g, "");
  const modalCanvas = qs("#modal-fretboard-canvas");
  if (modalCanvas) renderFretboard(modalCanvas, modalRoot, "pentatonic-minor", "none", 12);
}

songModalClose.addEventListener("click", closeSongModal);
songModal.addEventListener("click", (e) => { if (e.target === songModal) closeSongModal(); });
function closeSongModal() {
  songModal.classList.remove("open");
  songModal.setAttribute("aria-hidden", "true");
  currentModalSong = null;
}

/* ===========================
   Pattern Controls (global + modal)
   =========================== */
const patternVisual = qs("#pattern-visual");
const patternSelect = qs("#pattern-select");
const patternPlayBtn = qs("#pattern-play-btn");

function normalizePatternValue(val) {
  if (!val) return "D D U U D U";
  if (val === "Reggae") return "D U D U";
  if (val === "Fingerpicked") return "D U D U D U";
  return val;
}

patternPlayBtn.addEventListener("click", () => {
  const patternString = normalizePatternValue(patternSelect.value);
  buildPatternDots(patternString, patternVisual);
  playPatternAnimation(patternVisual);
});

modalPatternPlayBtn.addEventListener("click", () => {
  if (!currentModalSong) return;
  const patternString = normalizePatternValue(currentModalSong.pattern);
  const modalPatternVisual = patternVisual; // reuse the same visual area
  buildPatternDots(patternString, modalPatternVisual);
  playPatternAnimation(modalPatternVisual);
});

/* ===========================
   Chords Section
   =========================== */
const chordsListEl = qs("#chords-list");
const chordSearchInput = qs("#chord-search-input");
const chordSearchBtn = qs("#chord-search-btn");
const chordCanvas = qs("#chord-canvas");

function renderChordList() {
  chordsListEl.innerHTML = "";
  Object.keys(chords).sort().forEach(name => {
    const pill = document.createElement("button");
    pill.className = "chord-pill";
    pill.textContent = name;
    pill.addEventListener("click", () => showChordDiagram(name));
    chordsListEl.appendChild(pill);
  });
}

function showChordDiagram(name) {
  const canvas = chordCanvas;
  if (!canvas) return;
  renderChordDiagram(canvas, name, chords[name] || null);
}

chordSearchBtn.addEventListener("click", () => {
  const q = chordSearchInput.value.trim();
  if (!q) return;
  if (chords[q]) showChordDiagram(q);
});

/* ===========================
   Fretboard Trainer (standalone + modal)
   =========================== */
const fbRootSelect = qs("#fb-root-select");
const fbScaleSelect = qs("#fb-scale-select");
const fbOverlaySelect = qs("#fb-overlay-select");
const fbMaxFretInput = qs("#fb-max-fret-input");
const fbRenderBtn = qs("#fb-render-btn");
const fbCanvas = qs("#fretboard-canvas");

fbRenderBtn.addEventListener("click", () => {
  const root = fbRootSelect.value;
  const scaleType = fbScaleSelect.value;
  const overlayType = fbOverlaySelect.value;
  const maxFret = parseInt(fbMaxFretInput.value, 10) || 12;
  renderFretboard(fbCanvas, root, scaleType, overlayType, maxFret);
});

// Modal fretboard render
const modalFbOverlaySelect = qs("#modal-fb-overlay-select");
const modalFbRenderBtn = qs("#modal-fb-render-btn");
const modalFbCanvas = qs("#modal-fretboard-canvas");

modalFbRenderBtn.addEventListener("click", () => {
  if (!currentModalSong) return;
  const overlayType = modalFbOverlaySelect.value;
  const root = (currentModalSong.chords[0] || "C").replace(/[^A-G#b]/g, "");
  renderFretboard(modalFbCanvas, root, "pentatonic-minor", overlayType, 12);
});

/* ===========================
   Practice Planner
   =========================== */
const practiceFocusSelect = qs("#practice-focus-select");
const practiceDurationInput = qs("#practice-duration-input");
const practiceGenerateBtn = qs("#practice-generate-btn");
const practicePlanEl = qs("#practice-plan");

practiceGenerateBtn.addEventListener("click", () => {
  const focus = practiceFocusSelect.value;
  const duration = parseInt(practiceDurationInput.value, 10) || 15;
  practicePlanEl.innerHTML = generatePracticePlan(focus, duration);
});

/* ===========================
   Initial Render + Accessibility
   =========================== */
function init() {
  renderSongs();
  renderChordList();
  // initial pattern visual
  buildPatternDots(normalizePatternValue(patternSelect.value), patternVisual);
  // initial fretboard render
  renderFretboard(fbCanvas, fbRootSelect.value, fbScaleSelect.value, "none", parseInt(fbMaxFretInput.value, 10) || 12);

  // keyboard shortcut: "/" focuses song search (if present)
  window.addEventListener("keydown", (e) => {
    if (e.key === "/" && document.activeElement.tagName !== "INPUT" && document.activeElement.tagName !== "TEXTAREA") {
      e.preventDefault();
      const firstFilter = qs(".filter-btn");
      if (firstFilter) firstFilter.focus();
    }
  });
}

document.addEventListener("DOMContentLoaded", init);

/* ===========================
   Exports (if other modules want to use)
   =========================== */
export {
  songs,
  chords,
  renderSongs,
  showChordDiagram,
  openSongModal,
  closeSongModal
};
