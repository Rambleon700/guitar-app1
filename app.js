/* ---------------------------------------------------------
   DATA
--------------------------------------------------------- */

const songs = [
  {
    title: "Wonderwall",
    artist: "Oasis",
    difficulty: "Easy",
    chords: ["Em7", "G", "Dsus4", "A7"],
    pattern: "D D U U D U",
    tips: "Keep your wrist loose and let the upstrokes breathe.",
    progress: 3
  },
  {
    title: "Knockin' on Heaven's Door",
    artist: "Bob Dylan",
    difficulty: "Easy",
    chords: ["G", "D", "Am", "C"],
    pattern: "D D U U D U",
    tips: "Let the chords ring out naturally.",
    progress: 2
  }
];

const chords = {
  // Open major
  "C": { frets: [-1, 3, 2, 0, 1, 0], fingers: [0, 3, 2, 0, 1, 0], baseFret: 1, root: "C" },
  "D": { frets: [-1, -1, 0, 2, 3, 2], fingers: [0, 0, 0, 1, 3, 2], baseFret: 1, root: "D" },
  "E": { frets: [0, 2, 2, 1, 0, 0], fingers: [0, 2, 3, 1, 0, 0], baseFret: 1, root: "E" },
  "G": { frets: [3, 2, 0, 0, 0, 3], fingers: [2, 1, 0, 0, 0, 3], baseFret: 1, root: "G" },
  "A": { frets: [-1, 0, 2, 2, 2, 0], fingers: [0, 0, 1, 2, 3, 0], baseFret: 1, root: "A" },

  // Open minor
  "Am": { frets: [-1, 0, 2, 2, 1, 0], fingers: [0, 0, 2, 3, 1, 0], baseFret: 1, root: "A" },
  "Dm": { frets: [-1, -1, 0, 2, 3, 1], fingers: [0, 0, 0, 2, 3, 1], baseFret: 1, root: "D" },
  "Em": { frets: [0, 2, 2, 0, 0, 0], fingers: [0, 2, 3, 0, 0, 0], baseFret: 1, root: "E" },

  // 7th
  "A7": { frets: [-1, 0, 2, 0, 2, 0], fingers: [0, 0, 2, 0, 3, 0], baseFret: 1, root: "A" },
  "B7": { frets: [-1, 2, 1, 2, 0, 2], fingers: [0, 2, 1, 3, 0, 4], baseFret: 1, root: "B" },
  "C7": { frets: [-1, 3, 2, 3, 1, 0], fingers: [0, 3, 2, 4, 1, 0], baseFret: 1, root: "C" },
  "D7": { frets: [-1, -1, 0, 2, 1, 2], fingers: [0, 0, 0, 2, 1, 3], baseFret: 1, root: "D" },
  "E7": { frets: [0, 2, 0, 1, 0, 0], fingers: [0, 2, 0, 1, 0, 0], baseFret: 1, root: "E" },
  "G7": { frets: [3, 2, 0, 0, 0, 1], fingers: [3, 2, 0, 0, 0, 1], baseFret: 1, root: "G" },

  // Sus / add
  "Dsus4": { frets: [-1, -1, 0, 2, 3, 3], fingers: [0, 0, 0, 1, 3, 4], baseFret: 1, root: "D" },
  "Asus2": { frets: [-1, 0, 2, 2, 0, 0], fingers: [0, 0, 1, 2, 0, 0], baseFret: 1, root: "A" },
  "Asus4": { frets: [-1, 0, 2, 2, 3, 0], fingers: [0, 0, 1, 2, 3, 0], baseFret: 1, root: "A" },

  // Extensions
  "Em7": { frets: [0, 2, 2, 0, 3, 3], fingers: [0, 2, 3, 0, 4, 1], baseFret: 1, root: "E" },
  "Cadd9": { frets: [-1, 3, 2, 0, 3, 0], fingers: [0, 3, 2, 0, 4, 0], baseFret: 1, root: "C" },
  "Gadd9": { frets: [3, 2, 0, 0, 3, 3], fingers: [2, 1, 0, 0, 3, 4], baseFret: 1, root: "G" }
};

const patterns = [
  {
    name: "Basic Pop",
    desc: "The most common acoustic pop pattern.",
    visual: ["D", "D", "U", "U", "D", "U"],
    songs: ["Wonderwall", "Knockin' on Heaven's Door"]
  }
];

/* ---------------------------------------------------------
   NAVIGATION
--------------------------------------------------------- */

const navButtons = document.querySelectorAll(".nav-btn");
const sections = document.querySelectorAll(".section");

navButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    const target = btn.dataset.target;
    if (!target) return;
    navButtons.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    sections.forEach(sec => {
      sec.classList.toggle("active", sec.id === target);
    });
  });
});

/* ---------------------------------------------------------
   SONGS
--------------------------------------------------------- */

const songsGrid = document.getElementById("songs-grid");

function renderSongs() {
  songsGrid.innerHTML = "";
  songs.forEach(song => {
    const card = document.createElement("div");
    card.className = "song-card";
    card.innerHTML = `
      <div class="difficulty">${song.difficulty}</div>
      <h3>${song.title}</h3>
      <div class="artist">${song.artist}</div>
      <div class="chords-preview">
        ${song.chords.map(c => `<span class="chord-tag">${c}</span>`).join("")}
      </div>
      <div class="meta">${song.pattern}</div>
    `;
    card.addEventListener("click", () => openSongModal(song));
    songsGrid.appendChild(card);
  });
}
renderSongs();

/* ---------------------------------------------------------
   MODAL
--------------------------------------------------------- */

const modal = document.getElementById("song-modal");
const modalClose = document.getElementById("modal-close");

function openSongModal(song) {
  document.getElementById("modal-title").textContent = song.title;
  document.getElementById("modal-artist").textContent = song.artist;
  document.getElementById("modal-chords").innerHTML =
    song.chords.map(c => `<span class="chord-tag">${c}</span>`).join("");
  document.getElementById("modal-pattern").textContent = song.pattern;
  document.getElementById("modal-tips").textContent = song.tips;
  document.getElementById("modal-progress").innerHTML =
    [...Array(5)].map((_, i) =>
      `<div class="progress-dot ${i < song.progress ? "filled" : ""}"></div>`
    ).join("");
  modal.classList.add("open");
}

modalClose.addEventListener("click", () => {
  modal.classList.remove("open");
  stopPickingAnimation();
});

/* ---------------------------------------------------------
   NOTE / INTERVAL HELPERS
--------------------------------------------------------- */

const noteNames = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];

function getNote(openStringNote, fret) {
  if (fret < 0) return null;
  const index = (openStringNote + fret) % 12;
  return noteNames[index];
}

function getInterval(root, note) {
  const rootIndex = noteNames.indexOf(root);
  const noteIndex = noteNames.indexOf(note);
  const diff = (noteIndex - rootIndex + 12) % 12;
  const intervals = {
    0: "Root",
    2: "Major 2nd",
    3: "Minor 3rd",
    4: "Major 3rd",
    5: "Perfect 4th",
    7: "Perfect 5th",
    9: "Major 6th",
    10: "Minor 7th",
    11: "Major 7th"
  };
  return intervals[diff] || "";
}

function intervalLabel(diff) {
  const map = {
    0: "R",
    3: "♭3",
    4: "3",
    6: "♭5",
    7: "5",
    10: "♭7",
    11: "7"
  };
  return map[diff] || "";
}

/* ---------------------------------------------------------
   CHORD DIAGRAMS
--------------------------------------------------------- */

const chordsGrid = document.getElementById("chords-grid");

function renderChordDiagram(chord) {
  const { frets, fingers, baseFret, root } = chord;
  const tuning = [4, 9, 2, 7, 11, 4]; // E A D G B E

  let html = `<div class="chord-diagram">`;
  html += `<div class="nut">${baseFret === 1 ? "" : baseFret}</div>`;
  html += `<div class="diagram-grid">`;

  for (let string = 0; string < 6; string++) {
    const fret = frets[string];
    const finger = fingers[string] || "";
    const openNote = tuning[string];

    let note = null;
    let interval = "";
    let tip = "";

    if (fret === 0) {
      note = getNote(openNote, 0);
      interval = getInterval(root, note);
      tip = `String ${6-string} • Open • Note: ${note} • ${interval}`;
      html += `<div class="open-string tooltip" data-tip="${tip}">○</div>`;
    } else if (fret === -1) {
      tip = `String ${6-string} • Muted`;
      html += `<div class="mute-string tooltip" data-tip="${tip}">×</div>`;
    } else {
      note = getNote(openNote, fret);
      interval = getInterval(root, note);
      tip = `String ${6-string} • Fret ${fret} • Finger ${finger} • Note: ${note} • ${interval}`;
      html += `<div class="finger-dot tooltip" data-tip="${tip}" style="grid-row:${fret};">${finger}</div>`;
    }
  }

  html += `</div></div>`;
  return html;
}

function renderChords() {
  chordsGrid.innerHTML = "";
  Object.keys(chords).forEach(name => {
    const data = chords[name];
    const card = document.createElement("div");
    card.className = "chord-card";
    card.innerHTML = `
      <h3>${name}</h3>
      ${renderChordDiagram(data)}
      <div class="fingers">Fingers: ${data.fingers.join(", ")}</div>
    `;
    chordsGrid.appendChild(card);
  });
}
renderChords();

/* ---------------------------------------------------------
   PATTERNS
--------------------------------------------------------- */

const patternsList = document.getElementById("patterns-list");

function renderPatterns() {
  patternsList.innerHTML = "";
  patterns.forEach(p => {
    const card = document.createElement("div");
    card.className = "pattern-card";
    card.innerHTML = `
      <h3>${p.name}</h3>
      <div class="desc">${p.desc}</div>
      <div class="pattern-visual">
        ${p.visual
          .map(v => `<div class="strum-box ${v === "D" ? "down" : "up"}">${v}</div>`)
          .join("")}
      </div>
      <div class="pattern-songs">Songs: ${p.songs.join(", ")}</div>
    `;
    patternsList.appendChild(card);
  });
}
renderPatterns();

/* ---------------------------------------------------------
   PRACTICE MODE
--------------------------------------------------------- */

const beatLights = document.getElementById("beat-lights");
const strumArrow = document.getElementById("strum-arrow");
const currentChord = document.getElementById("current-chord");
const patternText = document.getElementById("pattern-text");
const tempoSlider = document.getElementById("tempo-slider");
const tempoValue = document.getElementById("tempo-value");
const startBtn = document.getElementById("start-btn");
const stopBtn = document.getElementById("stop-btn");

let practiceInterval = null;
let beatIndex = 0;

function setupBeatLights() {
  beatLights.innerHTML = "";
  for (let i = 1; i <= 4; i++) {
    const b = document.createElement("div");
    b.className = "beat";
    b.textContent = i;
    beatLights.appendChild(b);
  }
}
setupBeatLights();

tempoSlider.addEventListener("input", () => {
  tempoValue.textContent = tempoSlider.value;
});

function startPractice() {
  const bpm = tempoSlider.value;
  const interval = 60000 / bpm;
  const beats = beatLights.children;

  startBtn.disabled = true;
  stopBtn.disabled = false;

  practiceInterval = setInterval(() => {
    [...beats].forEach(b => b.classList.remove("active"));
    beats[beatIndex].classList.add("active");

    strumArrow.classList.add("flash");
    setTimeout(() => strumArrow.classList.remove("flash"), 100);

    currentChord.textContent = ["G", "Em7", "Dsus4"][beatIndex % 3];
    patternText.textContent = "D D U U D U";

    beatIndex = (beatIndex + 1) % 4;
  }, interval);
}

function stopPractice() {
  clearInterval(practiceInterval);
  practiceInterval = null;
  startBtn.disabled = false;
  stopBtn.disabled = true;
  [...beatLights.children].forEach(b => b.classList.remove("active"));
}

startBtn.addEventListener("click", startPractice);
stopBtn.addEventListener("click", stopPractice);

/* ---------------------------------------------------------
   SCALES / TRIADS / ARPEGGIOS / CAGED
--------------------------------------------------------- */

const scales = {
  major: [0, 2, 4, 5, 7, 9, 11],
  minor: [0, 2, 3, 5, 7, 8, 10],
  pentMajor: [0, 2, 4, 7, 9],
  pentMinor: [0, 3, 5, 7, 10]
};

const triads = {
  major: [0, 4, 7],
  minor: [0, 3, 7],
  dim:   [0, 3, 6],
  aug:   [0, 4, 8]
};

const arpeggios = {
  major: [0, 4, 7],
  minor: [0, 3, 7],
  dom7:  [0, 4, 7, 10],
  maj7:  [0, 4, 7, 11],
  min7:  [0, 3, 7, 10]
};

const cagedPositions = {
  C:  { start: 0,  end: 4 },
  A:  { start: 2,  end: 6 },
  G:  { start: 5,  end: 9 },
  E:  { start: 7,  end: 11 },
  D:  { start: 10, end: 14 }
};

const sweepPaths = {
  major: ["R", "3", "5", "R"],
  minor: ["R", "♭3", "5", "R"],
  dom7:  ["R", "3", "5", "♭7", "R"],
  maj7:  ["R", "3", "5", "7", "R"],
  min7:  ["R", "♭3", "5", "♭7", "R"]
};

/* ---------------------------------------------------------
   FRETBOARD RENDERERS
--------------------------------------------------------- */

function renderScaleFretboard(root, scaleName) {
  const tuning = [4, 9, 2, 7, 11, 4];
  const intervals = scales[scaleName];
  const rootIndex = noteNames.indexOf(root);

  let html = `<div class="scale-fretboard"><div class="diagram-grid">`;

  for (let string = 0; string < 6; string++) {
    for (let fret = 0; fret <= 12; fret++) {
      const note = getNote(tuning[string], fret);
      const interval = getInterval(root, note);
      const diff = (noteNames.indexOf(note) - rootIndex + 12) % 12;
      const inScale = intervals.includes(diff);
      const isRoot = diff === 0;
      const tip = `String ${6-string} • Fret ${fret} • Note: ${note} • ${interval}`;
      html += `
        <div class="scale-dot tooltip"
             data-tip="${tip}"
             style="
               background:${isRoot ? 'var(--accent)' : inScale ? 'var(--green)' : 'var(--surface-2)'};
               opacity:${inScale ? 1 : 0.25};
             ">
          ${isRoot ? 'R' : ''}
        </div>`;
    }
  }

  html += `</div></div>`;
  return html;
}

function renderFullFretboard(root, scaleName, maxFret = 21) {
  const tuning = [4, 9, 2, 7, 11, 4];
  const intervals = scales[scaleName];
  const rootIndex = noteNames.indexOf(root);

  let html = `<div class="full-fretboard"><div class="diagram-grid">`;

  for (let string = 0; string < 6; string++) {
    for (let fret = 0; fret <= maxFret; fret++) {
      const note = getNote(tuning[string], fret);
      const interval = getInterval(root, note);
      const diff = (noteNames.indexOf(note) - rootIndex + 12) % 12;
      const inScale = intervals.includes(diff);
      const isRoot = diff === 0;
      const tip = `String ${6-string} • Fret ${fret} • Note: ${note} • ${interval}`;
      html += `
        <div class="scale-dot tooltip"
             data-tip="${tip}"
             style="
               background:${isRoot ? 'var(--accent)' : inScale ? 'var(--green)' : 'var(--surface-2)'};
               opacity:${inScale ? 1 : 0.15};
             ">
          ${isRoot ? 'R' : ''}
        </div>`;
    }
  }

  html += `</div></div>`;
  return html;
}

function renderTriadFretboard(root, triadType, positionName, maxFret = 21) {
  const tuning = [4, 9, 2, 7, 11, 4];
  const triadIntervals = triads[triadType];
  const rootIndex = noteNames.indexOf(root);
  const pos = cagedPositions[positionName];

  let html = `<div class="full-fretboard"><div class="diagram-grid">`;

  for (let string = 0; string < 6; string++) {
    for (let fret = 0; fret <= maxFret; fret++) {
      const note = getNote(tuning[string], fret);
      const interval = getInterval(root, note);
      const diff = (noteNames.indexOf(note) - rootIndex + 12) % 12;
      const inTriad = triadIntervals.includes(diff);
      const isRoot = diff === 0;
      const inPosition = fret >= pos.start && fret <= pos.end;
      const tip = `String ${6-string} • Fret ${fret} • Note: ${note} • ${interval}`;
      html += `
        <div class="scale-dot tooltip"
             data-tip="${tip}"
             style="
               background:${isRoot ? 'var(--accent)' :
                           inTriad ? 'var(--green)' :
                           'var(--surface-2)'};
               opacity:${inPosition ? 1 : 0.15};
               border:${inTriad ? '2px solid var(--accent)' : 'none'};
             ">
          ${isRoot ? 'R' : inTriad ? interval.replace("Major ", "").replace("Minor ", "") : ""}
        </div>`;
    }
  }

  html += `</div></div>`;
  return html;
}

function renderArpeggioFretboard(root, arpType, positionName, maxFret = 21) {
  const tuning = [4, 9, 2, 7, 11, 4];
  const arpIntervals = arpeggios[arpType];
  const rootIndex = noteNames.indexOf(root);
  const pos = cagedPositions[positionName];

  let html = `<div class="full-fretboard"><div class="diagram-grid">`;

  for (let string = 0; string < 6; string++) {
    for (let fret = 0; fret <= maxFret; fret++) {
      const note = getNote(tuning[string], fret);
      const interval = getInterval(root, note);
      const diff = (noteNames.indexOf(note) - rootIndex + 12) % 12;
      const inArp = arpIntervals.includes(diff);
      const isRoot = diff === 0;
      const inPosition = fret >= pos.start && fret <= pos.end;
      const tip = `String ${6-string} • Fret ${fret} • Note: ${note} • ${interval}`;
      html += `
        <div class="scale-dot tooltip"
             data-tip="${tip}"
             style="
               background:${isRoot ? 'var(--accent)' :
                           inArp ? 'var(--blue)' :
                           'var(--surface-2)'};
               opacity:${inPosition ? 1 : 0.15};
               border:${inArp ? '2px solid var(--accent)' : 'none'};
             ">
          ${isRoot ? 'R' : inArp ? interval.replace("Major ", "").replace("Minor ", "") : ""}
        </div>`;
    }
  }

  html += `</div></div>`;
  return html;
}

function renderSweepFretboard(root, arpType, positionName, maxFret = 21) {
  const tuning = [4, 9, 2, 7, 11, 4];
  const arpIntervals = arpeggios[arpType];
  const sweepSequence = sweepPaths[arpType];
  const rootIndex = noteNames.indexOf(root);
  const pos = cagedPositions[positionName];

  let html = `<div class="full-fretboard"><div class="diagram-grid">`;
  let sweepIndex = 0;

  for (let string = 0; string < 6; string++) {
    for (let fret = 0; fret <= maxFret; fret++) {
      const note = getNote(tuning[string], fret);
      const interval = getInterval(root, note);
      const diff = (noteNames.indexOf(note) - rootIndex + 12) % 12;
      const label = intervalLabel(diff);
      const inArp = arpIntervals.includes(diff);
      const inPosition = fret >= pos.start && fret <= pos.end;
      const isNextSweepNote = inArp && label === sweepSequence[sweepIndex];
      const tip = `String ${6-string} • Fret ${fret} • Note: ${note} • ${interval}`;

      html += `
        <div class="scale-dot tooltip"
             data-tip="${tip}"
             style="
               background:${label === "R" ? 'var(--accent)' :
                           inArp ? 'var(--blue)' :
                           'var(--surface-2)'};
               opacity:${inPosition ? 1 : 0.15};
               border:${isNextSweepNote ? '2px solid var(--accent)' : 'none'};
             ">
          ${isNextSweepNote ? sweepIndex + 1 : label}
        </div>`;

      if (isNextSweepNote) {
        sweepIndex++;
        if (sweepIndex >= sweepSequence.length) sweepIndex = 0;
      }
    }
  }

  html += `</div></div>`;
  return html;
}

/* ---------------------------------------------------------
   PICKING ARROWS + ANIMATION
--------------------------------------------------------- */

let pickingInterval = null;

function renderPickingArrows(arpType) {
  const seq = sweepPaths[arpType];
  return seq
    .map((label, i) => {
      const direction = i < seq.length - 1 ? "↓" : "↑";
      return `<span class="pick-arrow" data-step="${i}">${direction}</span>`;
    })
    .join(" ");
}

function startPickingAnimation(arpType, bpm = 120) {
  const arrows = document.querySelectorAll("#picking-arrows .pick-arrow");
  if (!arrows.length) return;
  let index = 0;
  const interval = 60000 / bpm;

  pickingInterval = setInterval(() => {
    arrows.forEach(a => a.classList.remove("flash"));
    arrows[index].classList.add("flash");
    index = (index + 1) % arrows.length;
  }, interval);
}

function stopPickingAnimation() {
  clearInterval(pickingInterval);
  pickingInterval = null;
  document.querySelectorAll("#picking-arrows .pick-arrow")
    .forEach(a => a.classList.remove("flash"));
}

/* ---------------------------------------------------------
   MODAL SCALE / TRIAD / ARP / SWEEP HANDLERS
--------------------------------------------------------- */

document.querySelectorAll(".modal-scales button").forEach(btn => {
  btn.addEventListener("click", () => {
    const scale = btn.dataset.scale;
    const root = document.getElementById("modal-title").textContent.split(" ")[0];
    document.getElementById("modal-scale-fretboard").innerHTML =
      renderScaleFretboard(root, scale);
  });
});

document.querySelectorAll(".modal-triads button").forEach(btn => {
  btn.addEventListener("click", () => {
    const triad = btn.dataset.triad;
    const pos = btn.dataset.pos;
    const root = document.getElementById("modal-title").textContent.split(" ")[0];
    document.getElementById("modal-triad-fretboard").innerHTML =
      renderTriadFretboard(root, triad, pos, 21);
  });
});

document.querySelectorAll(".modal-arpeggios button").forEach(btn => {
  btn.addEventListener("click", () => {
    const arp = btn.dataset.arp;
    const pos = btn.dataset.pos;
    const root = document.getElementById("modal-title").textContent.split(" ")[0];
    document.getElementById("modal-arpeggio-fretboard").innerHTML =
      renderArpeggioFretboard(root, arp, pos, 21);
  });
});

document.querySelectorAll(".modal-sweeps button").forEach(btn => {
  btn.addEventListener("click", () => {
    const arp = btn.dataset.arp;
    const pos = btn.dataset.pos;
    const root = document.getElementById("modal-title").textContent.split(" ")[0];

    document.getElementById("modal-sweep-fretboard").innerHTML =
      renderSweepFretboard(root, arp, pos, 21);

    document.getElementById("picking-arrows").innerHTML =
      renderPickingArrows(arp);

    stopPickingAnimation();
    startPickingAnimation(arp, 120);
  });
});

/* ---------------------------------------------------------
   FRETBOARD SECTION CONTROLS
--------------------------------------------------------- */

const fbRoot = document.getElementById("fb-root");
const fbScale = document.getElementById("fb-scale");
const fbArp = document.getElementById("fb-arp");
const fbPos = document.getElementById("fb-pos");
const fbMaxFret = document.getElementById("fb-maxfret");
const fbOutput = document.getElementById("fb-output");
const fbRenderBtn = document.getElementById("fb-render");

noteNames.forEach(n => {
  const opt = document.createElement("option");
  opt.value = n;
  opt.textContent = n;
  fbRoot.appendChild(opt);
});
fbRoot.value = "G";

fbRenderBtn.addEventListener("click", () => {
  const root = fbRoot.value;
  const scale = fbScale.value;
  const arp = fbArp.value;
  const pos = fbPos.value;
  const maxFret = parseInt(fbMaxFret.value, 10) || 21;

  let html = renderFullFretboard(root, scale, maxFret);

  if (arp !== "none") {
    html += renderArpeggioFretboard(root, arp, pos, maxFret);
    html += renderSweepFretboard(root, arp, pos, maxFret);
  }

  fbOutput.innerHTML = html;
});
