// app.js - full ready-to-paste file (ES Module)
// Imports (core modules + new fingerboard module)
import { renderChordDiagram } from "./modules/chord-diagram.js";
import { renderFretboard } from "./modules/fretboard-engine.js";
import { buildPatternDots, playPatternAnimation } from "./modules/pattern-engine.js";
import { generatePracticePlan } from "./modules/practice-engine.js";
import { renderFingerboard } from "./modules/fingerboard-engine.js";

/* ---------- Full song library (expanded) ---------- */
const songs = [
  { title: "Horse With No Name", artist: "America", difficulty: "Easy", chords: ["Em","D6add9/F#"], pattern: "D D D D", tips: "Let open strings ring; keep right hand relaxed.", progress: 4 },
  { title: "Knockin' on Heaven's Door", artist: "Bob Dylan", difficulty: "Easy", chords: ["G","D","Am","C"], pattern: "D D U U D U", tips: "Let chords ring naturally; keep tempo steady.", progress: 2 },
  { title: "Wonderwall", artist: "Oasis", difficulty: "Easy", chords: ["Em7","G","Dsus4","A7"], pattern: "D D U U D U", tips: "Loose wrist, relaxed upstrokes.", progress: 3 },
  { title: "Hotel California", artist: "Eagles", difficulty: "Intermediate", chords: ["Bm","F#","A","E","G","D","Em"], pattern: "D D U U D U", tips: "Focus on smooth chord transitions.", progress: 1 },
  { title: "Blackbird", artist: "The Beatles", difficulty: "Advanced", chords: ["G","A","C","D","Em"], pattern: "Fingerpicked", tips: "Focus on alternating bass notes.", progress: 1 },

  { title: "Loch Lomond", artist: "Traditional", difficulty: "Easy", chords: ["G","D","Em","C"], pattern: "D D U U D U", tips: "Keep the rhythm steady and sing the melody over the chords.", progress: 0 },
  { title: "Fix You", artist: "Coldplay", difficulty: "Easy", chords: ["C","Em","Am","G","F"], pattern: "D D U U D U", tips: "Start gently and build dynamics; use open strings where possible.", progress: 0 },
  { title: "Wonderful Tonight", artist: "Eric Clapton", difficulty: "Easy", chords: ["G","D","C","Em"], pattern: "D D U U D U", tips: "Slow, relaxed strumming; focus on timing and feel.", progress: 0 },

  { title: "Brown Eyed Girl", artist: "Van Morrison", difficulty: "Easy", chords: ["G","C","D","Em"], pattern: "D D U U D U", tips: "Keep the groove light and bouncy.", progress: 0 },
  { title: "Stand By Me", artist: "Ben E. King", difficulty: "Easy", chords: ["G","Em","C","D"], pattern: "D D U U D U", tips: "Simple steady strum; emphasize the bass.", progress: 0 },
  { title: "Tears In Heaven", artist: "Eric Clapton", difficulty: "Intermediate", chords: ["A","E","F#m","D"], pattern: "Fingerpicked", tips: "Work slowly on the fingerpicking pattern.", progress: 0 },
  { title: "Sweet Home Alabama", artist: "Lynyrd Skynyrd", difficulty: "Intermediate", chords: ["D","C","G"], pattern: "D D U U D U", tips: "Palm mute slightly for the groove.", progress: 0 },
  { title: "Let It Be", artist: "The Beatles", difficulty: "Easy", chords: ["C","G","Am","F"], pattern: "D D U U D U", tips: "Keep chord changes smooth and sing the melody.", progress: 0 },
  { title: "Hallelujah", artist: "Leonard Cohen", difficulty: "Intermediate", chords: ["C","Am","F","G","Em"], pattern: "Fingerpicked", tips: "Slow, expressive playing; focus on tone.", progress: 0 },
  { title: "Wonder", artist: "Shawn Mendes", difficulty: "Intermediate", chords: ["C","G","Am","F"], pattern: "D D U U D U", tips: "Use dynamics to build the chorus.", progress: 0 },

  { title: "Yellow", artist: "Coldplay", difficulty: "Easy", chords: ["C","G","Am","F"], pattern: "D D U U D U", tips: "Simple strum with steady tempo.", progress: 0 },
  { title: "Riptide", artist: "Vance Joy", difficulty: "Easy", chords: ["Am","G","C"], pattern: "D D U U D U", tips: "Upbeat rhythm; keep the right hand loose.", progress: 0 },
  { title: "Creep", artist: "Radiohead", difficulty: "Easy", chords: ["G","B","C","Cm"], pattern: "D D U U D U", tips: "Powerful dynamics on the chorus.", progress: 0 },
  { title: "Redemption Song", artist: "Bob Marley", difficulty: "Intermediate", chords: ["G","Em","C","D"], pattern: "Fingerpicked", tips: "Work on steady thumb bass.", progress: 0 },
  { title: "No Woman No Cry", artist: "Bob Marley", difficulty: "Easy", chords: ["C","G","Am","F"], pattern: "D D U U D U", tips: "Keep the groove relaxed.", progress: 0 }
];

/* ---------- Chord library (sample) ---------- */
const chords = {
  "C":  { frets:[-1,3,2,0,1,0], fingers:[0,3,2,0,1,0] },
  "D":  { frets:[-1,-1,0,2,3,2], fingers:[0,0,0,1,3,2] },
  "E":  { frets:[0,2,2,1,0,0], fingers:[0,2,3,1,0,0] },
  "G":  { frets:[3,2,0,0,0,3], fingers:[2,1,0,0,0,3] },
  "Em": { frets:[0,2,2,0,0,0], fingers:[0,2,3,0,0,0] },
  "A7": { frets:[-1,0,2,0,2,0], fingers:[0,0,2,0,3,0] },
  "Dsus4": { frets:[-1,-1,0,2,3,3], fingers:[0,0,0,1,3,4] },
  "Em7": { frets:[0,2,2,0,3,3], fingers:[0,2,3,0,4,1] },
  "D6add9/F#": { frets:[2,0,0,2,3,0], fingers:[2,0,0,1,3,0] },
  "Bm": { frets:[-1,2,4,4,3,2], fingers:[0,1,3,4,2,1] },
  "F": { frets:[1,3,3,2,1,1], fingers:[1,3,4,2,1,1] },
  "Am": { frets:[-1,0,2,2,1,0], fingers:[0,0,2,3,1,0] }
};

/* ---------- Helpers & state ---------- */
const qs = s => document.querySelector(s);
const qsa = s => Array.from(document.querySelectorAll(s));

let chordCountFilter = "all";
let difficultyFilter = "all";
let currentModalSong = null;

/* ---------- Navigation ---------- */
qsa(".nav-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    qsa(".nav-btn").forEach(b => { b.classList.remove("active"); b.setAttribute("aria-pressed","false"); });
    btn.classList.add("active"); btn.setAttribute("aria-pressed","true");
    const target = btn.dataset.section;
    qsa(".section").forEach(sec => sec.classList.toggle("active", sec.id === target));
    const section = qs(`#${target}`);
    if (section) {
      const focusable = section.querySelector("button, input, select, a");
      if (focusable) focusable.focus();
    }
  });
});

/* ---------- Songs rendering & filters ---------- */
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

    const passesDifficulty = difficultyFilter === "all" || song.difficulty === difficultyFilter;
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
        <span class="song-difficulty">${song.difficulty}</span>
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

/* ---------- Song modal ---------- */
const songModal = qs("#song-modal");
const songModalClose = qs("#song-modal-close");
const modalSongTitle = qs("#modal-song-title");
const modalSongArtist = qs("#modal-song-artist");
const modalSongChords = qs("#modal-song-chords");
const modalSongPattern = qs("#modal-song-pattern");
const modalSongTips = qs("#modal-song-tips");

function openSongModal(song) {
  currentModalSong = song;
  modalSongTitle.textContent = song.title;
  modalSongArtist.textContent = song.artist;
  modalSongPattern.textContent = song.pattern || "";
  modalSongTips && (modalSongTips.textContent = song.tips || "");
  const progressFill = qs("#modal-song-progress .progress-fill");
  if (progressFill) progressFill.style.width = `${Math.min(100, (song.progress || 0) * 20)}%`;

  modalSongChords.innerHTML = "";
  (song.chords || []).forEach(ch => {
    const pill = document.createElement("button");
    pill.className = "modal-chord-pill";
    pill.textContent = ch;
    pill.addEventListener("click", () => {
      const canvas = qs("#chord-canvas");
      if (canvas) {
        try { renderChordDiagram(canvas, ch, chords[ch] || null); }
        catch (err) { console.warn("renderChordDiagram failed", err); }
      }
      const chordsNav = qsa(".nav-btn").find?.(b => b.dataset.section === "chords-section");
      if (chordsNav) chordsNav.click();
    });
    modalSongChords.appendChild(pill);
  });

  songModal.classList.add("open");
  songModal.setAttribute("aria-hidden","false");

  // ensure modal canvas is sized and render a default view using fingerboard renderer
  const modalCanvas = qs("#modal-fretboard-canvas");
  const modalRoot = (song.chords && song.chords[0]) ? song.chords[0].replace(/[^A-G#b]/g,"") : "C";
  if (modalCanvas) {
    setTimeout(() => {
      const ratio = window.devicePixelRatio || 1;
      modalCanvas.width = Math.floor(modalCanvas.clientWidth * ratio);
      modalCanvas.height = Math.floor(modalCanvas.clientHeight * ratio);
      try {
        renderFingerboard(modalCanvas, modalRoot, "pentatonic-minor", "none", 12, {
          showLabels: true,
          boxes: true,
          textColor: getComputedStyle(document.documentElement).getPropertyValue('--text-main')
        });
      } catch (err) { console.warn("renderFingerboard failed (modal init)", err); }
    }, 60);
  }
}

songModalClose.addEventListener("click", closeSongModal);
songModal.addEventListener("click", (e) => { if (e.target === songModal) closeSongModal(); });
function closeSongModal() {
  songModal.classList.remove("open");
  songModal.setAttribute("aria-hidden","true");
  currentModalSong = null;
}

/* ---------- Pattern controls ---------- */
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
  try { buildPatternDots(patternString, patternVisual); playPatternAnimation(patternVisual); }
  catch (err) { console.warn("Pattern module missing or failed", err); }
});

// modal pattern play — create modal-specific visual if needed
qs("#modal-pattern-play-btn")?.addEventListener("click", () => {
  if (!currentModalSong) return;
  const patternString = normalizePatternValue(currentModalSong.pattern);

  let modalPatternVisual = qs("#modal-pattern-visual");
  if (!modalPatternVisual) {
    modalPatternVisual = document.createElement("div");
    modalPatternVisual.id = "modal-pattern-visual";
    modalPatternVisual.className = "pattern-visual";
    const patternColumn = qs("#modal-pattern-play-btn")?.parentElement;
    const modalBody = qs("#song-modal-body") || qs("#song-modal");
    if (patternColumn) patternColumn.appendChild(modalPatternVisual);
    else modalBody.appendChild(modalPatternVisual);
  }

  try {
    buildPatternDots(patternString, modalPatternVisual);
    playPatternAnimation(modalPatternVisual);
  } catch (err) {
    console.warn("Pattern module missing or failed (modal)", err);
  }
});

/* ---------- Chords section ---------- */
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
  try { renderChordDiagram(canvas, name, chords[name] || null); }
  catch (err) { console.warn("renderChordDiagram failed", err); }
}

chordSearchBtn.addEventListener("click", () => {
  const q = chordSearchInput.value.trim();
  if (!q) return;
  if (chords[q]) showChordDiagram(q);
});

/* ---------- Fretboard trainer ---------- */
const fbRootSelect = qs("#fb-root-select");
const fbScaleSelect = qs("#fb-scale-select");
const fbOverlaySelect = qs("#fb-overlay-select");
const fbMaxFretInput = qs("#fb-max-fret-input");
const fbRenderBtn = qs("#fb-render-btn");
const fbCanvas = qs("#fretboard-canvas");

function sizeCanvasForDPR(canvas) {
  if (!canvas) return;
  const ratio = window.devicePixelRatio || 1;
  if (canvas.clientWidth && canvas.clientHeight) {
    canvas.width = Math.floor(canvas.clientWidth * ratio);
    canvas.height = Math.floor(canvas.clientHeight * ratio);
  }
}

fbRenderBtn.addEventListener("click", () => {
  const root = fbRootSelect.value;
  const scaleType = fbScaleSelect.value;
  const overlayType = fbOverlaySelect.value;
  const maxFret = parseInt(fbMaxFretInput.value, 10) || 12;

  try {
    sizeCanvasForDPR(fbCanvas);
    renderFingerboard(fbCanvas, root, scaleType, overlayType, maxFret, {
      showLabels: false,
      boxes: false,
      textColor: getComputedStyle(document.documentElement).getPropertyValue('--text-main')
    });
  } catch (err) {
    console.warn("renderFingerboard (main) failed", err);
  }
});

qs("#modal-fb-render-btn")?.addEventListener("click", () => {
  if (!currentModalSong) return;
  const overlayType = qs("#modal-fb-overlay-select")?.value || "none";
  const modalCanvas = qs("#modal-fretboard-canvas");
  const root = (currentModalSong.chords[0] || "C").replace(/[^A-G#b]/g,"");
  if (!modalCanvas) return;

  const renderNow = () => {
    const ratio = window.devicePixelRatio || 1;
    modalCanvas.width = Math.floor(modalCanvas.clientWidth * ratio);
    modalCanvas.height = Math.floor(modalCanvas.clientHeight * ratio);

    const opts = {
      showLabels: true,
      boxes: qs("#modal-fb-boxes")?.checked || true,
      chord: null,
      textColor: getComputedStyle(document.documentElement).getPropertyValue('--text-main')
    };

    // optional: if modal chord-tones toggle exists and is checked, set opts.chord
    if (qs("#modal-fb-chordtones")?.checked) {
      // default to major triad offsets; adapt if you have chord->offset mapping
      opts.chord = [0,4,7];
    }

    try {
      renderFingerboard(modalCanvas, root, "pentatonic-minor", overlayType, 12, opts);
    } catch (err) {
      console.warn("renderFingerboard failed (modal)", err);
    }
  };

  if (songModal && songModal.classList.contains("open")) {
    setTimeout(renderNow, 60);
  } else {
    requestAnimationFrame(renderNow);
  }
});

/* ---------- Practice planner ---------- */
const practiceFocusSelect = qs("#practice-focus-select");
const practiceDurationInput = qs("#practice-duration-input");
const practiceGenerateBtn = qs("#practice-generate-btn");
const practicePlanEl = qs("#practice-plan");

practiceGenerateBtn.addEventListener("click", () => {
  const focus = practiceFocusSelect.value;
  const duration = parseInt(practiceDurationInput.value, 10) || 15;
  try {
    practicePlanEl.innerHTML = generatePracticePlan(focus, duration);
  } catch (err) {
    console.warn("practice-engine missing or failed", err);
    practicePlanEl.innerHTML = `<div class="song-card"><div class="song-meta-row"><div><h4 style="margin:0">Practice</h4><p class="muted" style="margin:4px 0 0">Practice module unavailable.</p></div><div style="font-weight:600">${duration}m</div></div></div>`;
  }
});

/* ---------- Init ---------- */
function init() {
  renderSongs();
  renderChordList();
  try { buildPatternDots(normalizePatternValue(patternSelect.value), patternVisual); } catch (err) {}

  // size main fretboard canvas then render using fingerboard renderer
  sizeCanvasForDPR(fbCanvas);
  try {
    renderFingerboard(fbCanvas, fbRootSelect.value, fbScaleSelect.value, "none", parseInt(fbMaxFretInput.value,10) || 12, {
      showLabels: false,
      boxes: false,
      textColor: getComputedStyle(document.documentElement).getPropertyValue('--text-main')
    });
  } catch (err) { console.warn("renderFingerboard (init) failed", err); }

  // keyboard shortcut: focus first filter with "/"
  window.addEventListener("keydown", (e) => {
    if (e.key === "/" && !["INPUT","TEXTAREA","SELECT"].includes(document.activeElement.tagName)) {
      e.preventDefault();
      const firstFilter = qs(".filter-btn");
      if (firstFilter) firstFilter.focus();
    }
  });
}

document.addEventListener("DOMContentLoaded", init);

/* ---------- Exports ---------- */
export { songs, chords, renderSongs, showChordDiagram, openSongModal, closeSongModal };
