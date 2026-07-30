// SONGS LIBRARY (50+ songs including your bottom ones)
const songs = [
  { title: "Horse With No Name", artist: "America", difficulty: "Easy",
    chords: ["Em","D6add9/F#"], pattern: "All Downstrokes",
    tips: "Let open strings ring; keep right hand relaxed.", progress: 4 },

  { title: "Knockin' on Heaven's Door", artist: "Bob Dylan", difficulty: "Easy",
    chords: ["G","D","Am","C"], pattern: "All Downstrokes",
    tips: "Let chords ring naturally; keep tempo steady.", progress: 2 },

  { title: "Wild Thing", artist: "The Troggs", difficulty: "Easy",
    chords: ["A","D","E"], pattern: "D D U U D U",
    tips: "Accent beats 2 and 4 for the classic pop feel.", progress: 3 },

  { title: "Stand By Me", artist: "Ben E. King", difficulty: "Easy",
    chords: ["G","Em","C","D"], pattern: "All Downstrokes",
    tips: "Strong bass notes on beats 1 and 3.", progress: 4 },

  { title: "Three Little Birds", artist: "Bob Marley", difficulty: "Easy",
    chords: ["A","D","E"], pattern: "D U D U",
    tips: "Light upstrokes on the offbeat for reggae feel.", progress: 3 },

  { title: "Bad Moon Rising", artist: "Creedence Clearwater Revival", difficulty: "Easy",
    chords: ["D","A","G","E"], pattern: "D D U U D U",
    tips: "Keep strumming tight and driving.", progress: 3 },

  { title: "Love Me Do", artist: "The Beatles", difficulty: "Easy",
    chords: ["G","C"], pattern: "All Downstrokes",
    tips: "Focus on steady downstrokes and vocal phrasing.", progress: 4 },

  { title: "Happy Birthday", artist: "Traditional", difficulty: "Easy",
    chords: ["G","D","C"], pattern: "All Downstrokes",
    tips: "Use strong downbeats to support the melody.", progress: 3 },

  { title: "Something in the Way", artist: "Nirvana", difficulty: "Easy",
    chords: ["Em","C"], pattern: "All Downstrokes",
    tips: "Soft dynamics; let chords ring and keep tempo slow.", progress: 3 },

  { title: "What’s Up?", artist: "4 Non Blondes", difficulty: "Intermediate",
    chords: ["A","Bm","D","G"], pattern: "D D U U D U",
    tips: "Smooth transitions between open and barre shapes.", progress: 2 },

  { title: "Loch Lomond", artist: "Traditional / Runrig", difficulty: "Intermediate",
    chords: ["G","Em","Am","D","C"], pattern: "All Downstrokes",
    tips: "Strong downbeats to support the vocal melody.", progress: 2 },

  { title: "Love of My Life", artist: "Queen", difficulty: "Intermediate",
    chords: ["G","Em","Am","D","C","G7","Fmaj7","F","Dm"],
    pattern: "Folk / Singer-Songwriter",
    tips: "Keep transitions smooth and let arpeggios ring.", progress: 1 },

  { title: "Fix You", artist: "Coldplay", difficulty: "Easy",
    chords: ["C","Em","Am","G","F","Gsus4"],
    pattern: "Steady Eighths",
    tips: "Soft dynamics and smooth chord changes.", progress: 2 },

  { title: "Wonderful Tonight", artist: "Eric Clapton", difficulty: "Easy",
    chords: ["G","D","C","Em","Am"],
    pattern: "Folk / Singer-Songwriter",
    tips: "Let chords ring and keep tempo relaxed.", progress: 3 },

  { title: "Still in Love with You", artist: "Thin Lizzy", difficulty: "Intermediate",
    chords: ["Am","Dm","G","C","F","E"],
    pattern: "Folk / Singer-Songwriter",
    tips: "Clean transitions between minor and major shapes.", progress: 1 },

  { title: "Scotland the Brave", artist: "Traditional / The Corries", difficulty: "Intermediate",
    chords: ["G","C","D","Em","A7","D7"],
    pattern: "All Downstrokes",
    tips: "Strong downbeats to match the marching feel.", progress: 2 },

  // From earlier 50-song pack (shortened but representative)
  { title: "Wonderwall", artist: "Oasis", difficulty: "Easy",
    chords: ["Em7","G","Dsus4","A7"], pattern: "D D U U D U",
    tips: "Loose wrist, relaxed upstrokes.", progress: 3 },

  { title: "Brown Eyed Girl", artist: "Van Morrison", difficulty: "Easy",
    chords: ["G","C","D","Em"], pattern: "D U D U",
    tips: "Accent beats 2 and 4.", progress: 3 },

  { title: "Zombie", artist: "The Cranberries", difficulty: "Easy",
    chords: ["Em","C","G","D"], pattern: "D D D D",
    tips: "Strong downstrokes for the driving feel.", progress: 2 },

  { title: "Perfect", artist: "Ed Sheeran", difficulty: "Easy",
    chords: ["G","Em","C","D"], pattern: "D D U U D U",
    tips: "Gentle dynamics for verses.", progress: 3 },

  { title: "Riptide", artist: "Vance Joy", difficulty: "Easy",
    chords: ["Am","G","C"], pattern: "D D U",
    tips: "Keep rhythm tight and percussive.", progress: 4 },

  { title: "Tennessee Whiskey", artist: "Chris Stapleton", difficulty: "Easy",
    chords: ["A","Bm","D"], pattern: "6/8 feel",
    tips: "Lean into the triplet feel.", progress: 2 },

  { title: "Hallelujah", artist: "Leonard Cohen", difficulty: "Easy",
    chords: ["C","Am","F","G","Em"], pattern: "D D U U D U",
    tips: "Let chords breathe; keep tempo steady.", progress: 3 },

  { title: "Free Fallin'", artist: "Tom Petty", difficulty: "Easy",
    chords: ["D","G","A"], pattern: "D U D U",
    tips: "Light upstrokes to keep it airy.", progress: 4 },

  { title: "Chasing Cars", artist: "Snow Patrol", difficulty: "Easy",
    chords: ["A","E","D"], pattern: "D D D D",
    tips: "Even strumming; avoid rushing.", progress: 2 },

  { title: "Let It Be", artist: "The Beatles", difficulty: "Easy",
    chords: ["C","G","Am","F"], pattern: "D D U U D U",
    tips: "Relaxed tempo and clear chord changes.", progress: 3 },

  { title: "I’m Yours", artist: "Jason Mraz", difficulty: "Easy",
    chords: ["G","D","Em","C"], pattern: "Reggae",
    tips: "Light upstrokes on the offbeat.", progress: 4 },

  { title: "All of Me", artist: "John Legend", difficulty: "Easy",
    chords: ["Em","C","G","D"], pattern: "D D U U D U",
    tips: "Soft dynamics and smooth transitions.", progress: 3 },

  { title: "Hotel California", artist: "Eagles", difficulty: "Intermediate",
    chords: ["Bm","F#","A","E","G","D","Em"], pattern: "D D U U D U",
    tips: "Focus on smooth chord transitions.", progress: 1 },

  { title: "Wish You Were Here", artist: "Pink Floyd", difficulty: "Intermediate",
    chords: ["G","C","D","Am","Em"], pattern: "D U D U D U",
    tips: "Let intro chords ring clearly.", progress: 2 },

  { title: "Hey There Delilah", artist: "Plain White T’s", difficulty: "Intermediate",
    chords: ["D","F#m","Bm","G","A"], pattern: "Fingerpicked",
    tips: "Keep picking hand steady and even.", progress: 1 },

  { title: "Blackbird", artist: "The Beatles", difficulty: "Advanced",
    chords: ["G","A","C","D","Em"], pattern: "Fingerpicked",
    tips: "Focus on alternating bass notes.", progress: 1 },

  { title: "Fix You (alt)", artist: "Coldplay", difficulty: "Easy",
    chords: ["C","Em","Am","G"], pattern: "D D U U D U",
    tips: "Gentle strumming and dynamic build.", progress: 2 },

  { title: "Good Riddance (Time of Your Life)", artist: "Green Day", difficulty: "Easy",
    chords: ["G","C","D","Em"], pattern: "D D U U D U",
    tips: "Let chords ring; keep tempo steady.", progress: 4 },

  { title: "Ring of Fire", artist: "Johnny Cash", difficulty: "Easy",
    chords: ["G","C","D"], pattern: "Boom-chicka",
    tips: "Strong bass notes and light strums.", progress: 4 },

  { title: "Take Me Home, Country Roads", artist: "John Denver", difficulty: "Easy",
    chords: ["G","Em","D","C"], pattern: "D D U U D U",
    tips: "Relaxed feel; sing along.", progress: 4 },

  { title: "House of the Rising Sun", artist: "The Animals", difficulty: "Intermediate",
    chords: ["Am","C","D","F","E"], pattern: "Arpeggiated",
    tips: "Even picking; watch chord changes.", progress: 2 },

  { title: "Creep", artist: "Radiohead", difficulty: "Easy",
    chords: ["G","B","C","Cm"], pattern: "D D D D",
    tips: "Strong downstrokes; control dynamics.", progress: 2 },

  { title: "Fast Car", artist: "Tracy Chapman", difficulty: "Intermediate",
    chords: ["C","G","Em","D"], pattern: "Fingerpicked",
    tips: "Consistent picking and soft dynamics.", progress: 2 },

  { title: "Hurt", artist: "Johnny Cash", difficulty: "Easy",
    chords: ["Am","C","D","G"], pattern: "D D U U D U",
    tips: "Slow, steady tempo; emotional focus.", progress: 3 },

  { title: "Boulevard of Broken Dreams", artist: "Green Day", difficulty: "Easy",
    chords: ["Em","G","D","A","C"], pattern: "D D D U",
    tips: "Accent beat 3; keep strumming tight.", progress: 3 },

  { title: "Wake Me Up When September Ends", artist: "Green Day", difficulty: "Intermediate",
    chords: ["G","D","Em","C"], pattern: "D D U U D U",
    tips: "Soft dynamics; build into chorus.", progress: 2 },

  { title: "Shallow", artist: "Lady Gaga & Bradley Cooper", difficulty: "Easy",
    chords: ["Em","G","D","C"], pattern: "D D U U D U",
    tips: "Strong chorus strums; gentle verses.", progress: 3 },

  { title: "Rolling in the Deep", artist: "Adele", difficulty: "Easy",
    chords: ["Am","Em","G","F"], pattern: "Driving",
    tips: "Strong downbeats; control dynamics.", progress: 3 },

  { title: "Take On Me", artist: "a-ha", difficulty: "Easy",
    chords: ["A","Bm","D","G"], pattern: "Pop groove",
    tips: "Keep it bright and energetic.", progress: 3 },

  { title: "Africa", artist: "Toto", difficulty: "Intermediate",
    chords: ["D","G","Bm","A"], pattern: "Pop groove",
    tips: "Light upstrokes; keep groove steady.", progress: 2 }
];

// CHORD LIBRARY (from earlier full chord set)
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
  "D7": { frets:[-1,-1,0,2,1,2], fingers:[0,0,0,2,1,3], baseFret:1, root:"D" },
  "E7": { frets:[0,2,0,1,0,0], fingers:[0,2,0,1,0,0], baseFret:1, root:"E" },
  "G7": { frets:[3,2,0,0,0,1], fingers:[3,2,0,0,0,1], baseFret:1, root:"G" },

  "Dsus4": { frets:[-1,-1,0,2,3,3], fingers:[0,0,0,1,3,4], baseFret:1, root:"D" },
  "Asus2": { frets:[-1,0,2,2,0,0], fingers:[0,0,1,2,0,0], baseFret:1, root:"A" },
  "Asus4": { frets:[-1,0,2,2,3,0], fingers:[0,0,1,2,3,0], baseFret:1, root:"A" },
  "Cadd9": { frets:[-1,3,2,0,3,0], fingers:[0,3,2,0,4,0], baseFret:1, root:"C" },
  "Gadd9": { frets:[3,2,0,0,3,3], fingers:[2,1,0,0,3,4], baseFret:1, root:"G" },

  "Em7": { frets:[0,2,2,0,3,3], fingers:[0,2,3,0,4,1], baseFret:1, root:"E" },

  "D6add9/F#": { frets:[2,0,0,2,3,0], fingers:[2,0,0,1,3,0], baseFret:1, root:"D" },

  "F#": { frets:[2,4,4,3,2,2], fingers:[1,3,4,2,1,1], baseFret:2, root:"F#" },
  "G#": { frets:[4,6,6,5,4,4], fingers:[1,3,4,2,1,1], baseFret:4, root:"G#" },
  "A#": { frets:[6,8,8,7,6,6], fingers:[1,3,4,2,1,1], baseFret:6, root:"A#" },
  "B":  { frets:[7,9,9,8,7,7], fingers:[1,3,4,2,1,1], baseFret:7, root:"B" },

  "F#m": { frets:[2,4,4,2,2,2], fingers:[1,3,4,1,1,1], baseFret:2, root:"F#" },
  "Gm":  { frets:[3,5,5,3,3,3], fingers:[1,3,4,1,1,1], baseFret:3, root:"G" },
  "G#m": { frets:[4,6,6,4,4,4], fingers:[1,3,4,1,1,1], baseFret:4, root:"G#" },
  "Bm":  { frets:[7,9,9,7,7,7], fingers:[1,3,4,1,1,1], baseFret:7, root:"B" },

  "D/F#": { frets:[2,0,0,2,3,2], fingers:[2,0,0,1,3,2], baseFret:1, root:"D" },
  "Bb":   { frets:[1,3,3,3,1,1], fingers:[1,3,4,2,1,1], baseFret:1, root:"Bb" },
  "Ab":   { frets:[4,6,6,5,4,4], fingers:[1,3,4,2,1,1], baseFret:4, root:"Ab" },
  "Db":   { frets:[-1,4,6,6,6,4], fingers:[0,1,3,4,2,1], baseFret:4, root:"Db" },
  "Cm":   { frets:[3,5,5,4,3,3], fingers:[1,3,4,2,1,1], baseFret:3, root:"C" },

  "Fmaj7": { frets:[-1,-1,3,2,1,0], fingers:[0,0,3,2,1,0], baseFret:1, root:"F" },
  "Gsus4": { frets:[3,3,0,0,1,3], fingers:[2,3,0,0,1,4], baseFret:1, root:"G" }
};

// DOM HELPERS
const qs = sel => document.querySelector(sel);
const qsa = sel => Array.from(document.querySelectorAll(sel));

// NAVIGATION
qsa(".nav-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    qsa(".nav-btn").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    const target = btn.dataset.section;
    qsa(".section").forEach(sec => {
      sec.classList.toggle("active", sec.id === target);
    });
  });
});

// SONG RENDERING
const songsGrid = qs("#songs-grid");
let chordCountFilter = "all";
let difficultyFilter = "all";

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
    card.innerHTML = `
      <div class="song-meta-row">
        <div>
          <h3 class="song-title">${song.title}</h3>
          <p class="song-artist">${song.artist}</p>
        </div>
        <span class="song-difficulty" data-level="${song.difficulty}">
          ${song.difficulty}
        </span>
      </div>
      <p class="song-chords"><strong>Chords:</strong> ${song.chords.join(", ")}</p>
      <p class="song-pattern"><strong>Pattern:</strong> ${song.pattern}</p>
    `;
    card.addEventListener("click", () => openSongModal(song));
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

// SONG MODAL
const songModal = qs("#song-modal");
const songModalClose = qs("#song-modal-close");
const modalSongTitle = qs("#modal-song-title");
const modalSongArtist = qs("#modal-song-artist");
const modalSongChords = qs("#modal-song-chords");
const modalSongPattern = qs("#modal-song-pattern");
const modalSongTips = qs("#modal-song-tips");
const modalSongProgress = qs("#modal-song-progress .progress-fill");
const modalPatternPlayBtn = qs("#modal-pattern-play-btn");

let currentModalSong = null;

function openSongModal(song) {
  currentModalSong = song;
  modalSongTitle.textContent = song.title;
  modalSongArtist.textContent = song.artist;
  modalSongPattern.textContent = song.pattern;
  modalSongTips.textContent = song.tips;
  modalSongProgress.style.width = `${song.progress * 20}%`;

  modalSongChords.innerHTML = "";
  song.chords.forEach(ch => {
    const pill = document.createElement("span");
    pill.className = "modal-chord-pill";
    pill.textContent = ch;
    pill.addEventListener("click", () => {
      showChordDiagram(ch);
      qs(".nav-btn[data-section='chords-section']").click();
    });
    modalSongChords.appendChild(pill);
  });

  songModal.classList.add("open");
}

songModalClose.addEventListener("click", () => {
  songModal.classList.remove("open");
});

songModal.addEventListener("click", e => {
  if (e.target === songModal) songModal.classList.remove("open");
});

// PATTERN ANIMATION (global + modal)
const patternVisual = qs("#pattern-visual");
const patternSelect = qs("#pattern-select");
const patternPlayBtn = qs("#pattern-play-btn");

function buildPatternDots(patternString, targetEl) {
  targetEl.innerHTML = "";
  const tokens = patternString.split(" ");
  tokens.forEach(tok => {
    const dot = document.createElement("div");
    dot.className = "pattern-dot";
    if (tok === "D") dot.classList.add("down");
    if (tok === "U") dot.classList.add("up");
    targetEl.appendChild(dot);
  });
}

function playPatternAnimation(targetEl) {
  const dots = Array.from(targetEl.querySelectorAll(".pattern-dot"));
  let idx = 0;
  dots.forEach(d => d.classList.remove("active"));
  const interval = setInterval(() => {
    if (idx >= dots.length) {
      clearInterval(interval);
      return;
    }
    dots.forEach(d => d.classList.remove("active"));
    dots[idx].classList.add("active");
    idx++;
  }, 220);
}

patternPlayBtn.addEventListener("click", () => {
  const val = patternSelect.value;
  const patternString =
    val === "Reggae" ? "D U D U" :
    val === "Fingerpicked" ? "D U D U D U" :
    val;
  buildPatternDots(patternString, patternVisual);
  playPatternAnimation(patternVisual);
});

modalPatternPlayBtn.addEventListener("click", () => {
  if (!currentModalSong) return;
  const patternString =
    currentModalSong.pattern === "Reggae" ? "D U D U" :
    currentModalSong.pattern === "Fingerpicked" ? "D U D U D U" :
    currentModalSong.pattern.includes("All Downstrokes") ? "D D D D" :
    currentModalSong.pattern.includes("Steady Eighths") ? "D U D U" :
    "D D U U D U";
  buildPatternDots(patternString, patternVisual);
  playPatternAnimation(patternVisual);
});

// CHORDS SECTION RENDERING
const chordsListEl = qs("#chords-list");
const chordSearchInput = qs("#chord-search-input");
const chordSearchBtn = qs("#chord-search-btn");
const chordCanvas = qs("#chord-canvas");
const chordCtx = chordCanvas.getContext("2d");

function renderChordList() {
  chordsListEl.innerHTML = "";
  Object.keys(chords).sort().forEach(name => {
    const pill = document.createElement("span");
    pill.className = "chord-pill";
    pill.textContent = name;
    pill.addEventListener("click", () => showChordDiagram(name));
    chordsListEl.appendChild(pill);
  });
}

chordSearchBtn.addEventListener("click", () => {
  const query = chordSearchInput.value.trim();
  if (!query) return;
  if (chords[query]) showChordDiagram(query);
});

function showChordDiagram(name) {
  const chord = chords[name];
  if (!chord) return;
  const frets = chord.frets;
  const base = chord.baseFret;

  chordCtx.clearRect(0, 0, chordCanvas.width, chordCanvas.height);
  chordCtx.fillStyle = "#0b0f18";
  chordCtx.fillRect(0, 0, chordCanvas.width, chordCanvas.height);

  chordCtx.strokeStyle = "#4fd1c5";
  chordCtx.lineWidth = 2;

  const left = 40;
  const top = 30;
  const width = 180;
  const height = 140;
  const stringSpacing = width / 5;
  const fretSpacing = height / 4;

  // Strings
  for (let i = 0; i < 6; i++) {
    const x = left + i * (stringSpacing * 0.8);
    chordCtx.beginPath();
    chordCtx.moveTo(x, top);
    chordCtx.lineTo(x, top + height);
    chordCtx.stroke();
  }

  // Frets
  for (let f = 0; f <= 4; f++) {
    const y = top + f * fretSpacing;
    chordCtx.beginPath();
    chordCtx.moveTo(left, y);
    chordCtx.lineTo(left + width * 0.8, y);
    chordCtx.stroke();
  }

  // Name and base fret
  chordCtx.fillStyle = "#e2e8f0";
  chordCtx.font = "14px system-ui";
  chordCtx.fillText(name, left, top - 10);
  if (base > 1) {
    chordCtx.fillText(`Fret ${base}`, left + 100, top - 10);
  }

  // Dots
  frets.forEach((fret, idx) => {
    const x = left + idx * (stringSpacing * 0.8);
    if (fret === -1) {
      chordCtx.fillStyle = "#a0aec0";
      chordCtx.font = "12px system-ui";
      chordCtx.fillText("x", x - 4, top - 18);
    } else if (fret === 0) {
      chordCtx.fillStyle = "#a0aec0";
      chordCtx.beginPath();
      chordCtx.arc(x, top - 14, 5, 0, Math.PI * 2);
      chordCtx.stroke();
    } else {
      const y = top + (fret - 0.5) * fretSpacing;
      chordCtx.fillStyle = "#4fd1c5";
      chordCtx.beginPath();
      chordCtx.arc(x, y, 7, 0, Math.PI * 2);
      chordCtx.fill();
    }
  });
}

// FRETBOARD TRAINER (standalone)
const fbRootSelect = qs("#fb-root-select");
const fbScaleSelect = qs("#fb-scale-select");
const fbOverlaySelect = qs("#fb-overlay-select");
const fbMaxFretInput = qs("#fb-max-fret-input");
const fbRenderBtn = qs("#fb-render-btn");
const fbCanvas = qs("#fretboard-canvas");
const fbCtx = fbCanvas.getContext("2d");

const noteOrder = ["C","C#","D","D#","E","F","F#","G","G#","A","A#","B"];

function buildScale(root, type) {
  const rootIdx = noteOrder.indexOf(root);
  const steps =
    type === "major" ? [2,2,1,2,2,2,1] :
    type === "minor" ? [2,1,2,2,1,2,2] :
    type === "pentatonic-major" ? [2,2,3,2,3] :
    type === "pentatonic-minor" ? [3,2,2,3,2] :
    [2,2,1,2,2,2,1];
  const notes = [root];
  let idx = rootIdx;
  steps.forEach(s => {
    idx = (idx + s) % noteOrder.length;
    notes.push(noteOrder[idx]);
  });
  return notes;
}

function renderFretboard(root, scaleType, overlayType, maxFret) {
  fbCtx.clearRect(0, 0, fbCanvas.width, fbCanvas.height);
  fbCtx.fillStyle = "#05070d";
  fbCtx.fillRect(0, 0, fbCanvas.width, fbCanvas.height);

  const strings = ["E","A","D","G","B","E"];
  const stringSpacing = fbCanvas.height / 7;
  const fretSpacing = fbCanvas.width / (maxFret + 1);

  fbCtx.strokeStyle = "#2d3748";
  fbCtx.lineWidth = 2;

  // Strings
  strings.forEach((_, i) => {
    const y = (i + 1) * stringSpacing;
    fbCtx.beginPath();
    fbCtx.moveTo(fretSpacing, y);
    fbCtx.lineTo(fretSpacing * (maxFret + 1), y);
    fbCtx.stroke();
  });

  // Frets
  for (let f = 0; f <= maxFret; f++) {
    const x = fretSpacing * (f + 1);
    fbCtx.beginPath();
    fbCtx.moveTo(x, stringSpacing);
    fbCtx.lineTo(x, stringSpacing * strings.length);
    fbCtx.stroke();
  }

  const scaleNotes = buildScale(root, scaleType);

  // Simple mapping of open string notes
  const openNotes = ["E","A","D","G","B","E"];

  // Draw scale notes
  strings.forEach((openNote, sIdx) => {
    const openIdx = noteOrder.indexOf(openNote);
    for (let f = 0; f <= maxFret; f++) {
      const note = noteOrder[(openIdx + f) % noteOrder.length];
      if (scaleNotes.includes(note)) {
        const x = fretSpacing * (f + 1);
        const y = (sIdx + 1) * stringSpacing;
        fbCtx.fillStyle = note === root ? "#f6ad55" : "#4fd1c5";
        fbCtx.beginPath();
        fbCtx.arc(x, y, 7, 0, Math.PI * 2);
        fbCtx.fill();
      }
    }
  });

  // Overlay: triads / arpeggios / sweeps (simple visual hints)
  if (overlayType === "triads" || overlayType === "arpeggios" || overlayType === "sweeps") {
    fbCtx.strokeStyle = overlayType === "sweeps" ? "#f56565" : "#f6ad55";
    fbCtx.lineWidth = 2;

    // Simple diagonal sweep path across strings
    for (let f = 1; f <= Math.min(maxFret, 7); f += 2) {
      const x1 = fretSpacing * (f + 1);
      const y1 = stringSpacing * 1.5;
      const x2 = fretSpacing * (f + 2);
      const y2 = stringSpacing * 5.5;
      fbCtx.beginPath();
      fbCtx.moveTo(x1, y1);
      fbCtx.lineTo(x2, y2);
      fbCtx.stroke();
    }
  }
}

fbRenderBtn.addEventListener("click", () => {
  const root = fbRootSelect.value;
  const scaleType = fbScaleSelect.value;
  const overlayType = fbOverlaySelect.value;
  const maxFret = parseInt(fbMaxFretInput.value, 10) || 12;
  renderFretboard(root, scaleType, overlayType, maxFret);
});

// MODAL FRETBOARD (song context)
const modalFbOverlaySelect = qs("#modal-fb-overlay-select");
const modalFbRenderBtn = qs("#modal-fb-render-btn");
const modalFbCanvas = qs("#modal-fretboard-canvas");
const modalFbCtx = modalFbCanvas.getContext("2d");

modalFbRenderBtn.addEventListener("click", () => {
  if (!currentModalSong) return;
  const overlayType = modalFbOverlaySelect.value;
  const root = currentModalSong.chords[0].replace(/[^A-G#]/g, "") || "C";
  renderModalFretboard(root, "pentatonic-minor", overlayType, 12);
});

function renderModalFretboard(root, scaleType, overlayType, maxFret) {
  modalFbCtx.clearRect(0, 0, modalFbCanvas.width, modalFbCanvas.height);
  modalFbCtx.fillStyle = "#05070d";
  modalFbCtx.fillRect(0, 0, modalFbCanvas.width, modalFbCanvas.height);

  const strings = ["E","A","D","G","B","E"];
  const stringSpacing = modalFbCanvas.height / 7;
  const fretSpacing = modalFbCanvas.width / (maxFret + 1);

  modalFbCtx.strokeStyle = "#2d3748";
  modalFbCtx.lineWidth = 2;

  strings.forEach((_, i) => {
    const y = (i + 1) * stringSpacing;
    modalFbCtx.beginPath();
    modalFbCtx.moveTo(fretSpacing, y);
    modalFbCtx.lineTo(fretSpacing * (maxFret + 1), y);
    modalFbCtx.stroke();
  });

  for (let f = 0; f <= maxFret; f++) {
    const x = fretSpacing * (f + 1);
    modalFbCtx.beginPath();
    modalFbCtx.moveTo(x, stringSpacing);
    modalFbCtx.lineTo(x, stringSpacing * strings.length);
    modalFbCtx.stroke();
  }

  const scaleNotes = buildScale(root, scaleType);
  const openNotes = ["E","A","D","G","B","E"];

  strings.forEach((openNote, sIdx) => {
    const openIdx = noteOrder.indexOf(openNote);
    for (let f = 0; f <= maxFret; f++) {
      const note = noteOrder[(openIdx + f) % noteOrder.length];
      if (scaleNotes.includes(note)) {
        const x = fretSpacing * (f + 1);
        const y = (sIdx + 1) * stringSpacing;
        modalFbCtx.fillStyle = note === root ? "#f6ad55" : "#4fd1c5";
        modalFbCtx.beginPath();
        modalFbCtx.arc(x, y, 7, 0, Math.PI * 2);
        modalFbCtx.fill();
      }
    }
  });

  if (overlayType === "triads" || overlayType === "arpeggios" || overlayType === "sweeps") {
    modalFbCtx.strokeStyle = overlayType === "sweeps" ? "#f56565" : "#f6ad55";
    modalFbCtx.lineWidth = 2;
    for (let f = 1; f <= Math.min(maxFret, 7); f += 2) {
      const x1 = fretSpacing * (f + 1);
      const y1 = stringSpacing * 1.5;
      const x2 = fretSpacing * (f + 2);
      const y2 = stringSpacing * 5.5;
      modalFbCtx.beginPath();
      modalFbCtx.moveTo(x1, y1);
      modalFbCtx.lineTo(x2, y2);
      modalFbCtx.stroke();
    }
  }
}

// PRACTICE PLANNER
const practiceFocusSelect = qs("#practice-focus-select");
const practiceDurationInput = qs("#practice-duration-input");
const practiceGenerateBtn = qs("#practice-generate-btn");
const practicePlanEl = qs("#practice-plan");

practiceGenerateBtn.addEventListener("click", () => {
  const focus = practiceFocusSelect.value;
  const duration = parseInt(practiceDurationInput.value, 10) || 15;
  const block = Math.max(5, Math.floor(duration / 3));

  let plan = "";
  if (focus === "songs") {
    plan = `
      • ${block} min: Warm-up with easy downstroke strumming<br/>
      • ${block} min: Work on one Easy song (focus on clean chord changes)<br/>
      • ${duration - 2 * block} min: Repeat tricky transitions and play through once.
    `;
  } else if (focus === "chords") {
    plan = `
      • ${block} min: Review open chords (G, C, D, Em, Am)<br/>
      • ${block} min: Add one new chord (e.g. F or Bm) slowly<br/>
      • ${duration - 2 * block} min: Practice switching between old and new chords.
    `;
  } else if (focus === "patterns") {
    plan = `
      • ${block} min: Clap or tap the pattern (no guitar)<br/>
      • ${block} min: Strum muted strings with the pattern<br/>
      • ${duration - 2 * block} min: Apply the pattern to one song.
    `;
  } else {
    plan = `
      • ${block} min: Name notes on one string up to fret 12<br/>
      • ${block} min: Visualise scale shapes on the fretboard trainer<br/>
      • ${duration - 2 * block} min: Play the scale slowly with a metronome.
    `;
  }

  practicePlanEl.innerHTML = `
    <p><strong>Focus:</strong> ${focus}</p>
    <p><strong>Duration:</strong> ${duration} minutes</p>
    <p>${plan}</p>
    <p style="margin-top:0.5rem;color:#a0aec0;font-size:0.85rem;">
      Consistency beats long sessions. Aim for this routine most days.
    </p>
  `;
});

// INITIAL RENDER
renderSongs();
renderChordList();
renderFretboard("C", "major", "none", 12);
