/* modules/fingerboard-engine.js
   High‑quality fingerboard renderer with multiple overlays:
   - none, scale, triads, arpeggios, sweeps, chord-tones, intervals, boxes
   API: renderFingerboard(canvas, { root, scaleType, overlay, maxFret, tuning, showLabels })
*/
const NOTES = ["C","C#","D","D#","E","F","F#","G","G#","A","A#","B"];
const SCALES = {
  major: [0,2,4,5,7,9,11],
  minor: [0,2,3,5,7,8,10],
  "pentatonic-major": [0,2,4,7,9],
  "pentatonic-minor": [0,3,5,7,10],
  dorian: [0,2,3,5,7,9,10],
  mixolydian: [0,2,4,5,7,9,10]
};

function normalizeNote(n) {
  if (!n) return "C";
  return n.replace("♭","b").replace("♯","#").toUpperCase();
}

function noteIndex(name) {
  const n = normalizeNote(name);
  return NOTES.indexOf(n) >= 0 ? NOTES.indexOf(n) : 0;
}

function drawRoundedRect(ctx,x,y,w,h,r){
  ctx.beginPath();
  ctx.moveTo(x+r,y);
  ctx.arcTo(x+w,y,x+w,y+h,r);
  ctx.arcTo(x+w,y+h,x,y+h,r);
  ctx.arcTo(x,y+h,x,y,r);
  ctx.arcTo(x,y,x+w,y,r);
  ctx.closePath();
  ctx.fill();
}

export function renderFingerboard(canvas, root="E", scaleType="major", overlay="none", maxFret=12, opts={}) {
  if (!canvas || !canvas.getContext) return;
  const ctx = canvas.getContext("2d");
  const ratio = window.devicePixelRatio || 1;
  // ensure canvas pixel size matches CSS size
  if (canvas.clientWidth && canvas.clientHeight) {
    canvas.width = Math.floor(canvas.clientWidth * ratio);
    canvas.height = Math.floor(canvas.clientHeight * ratio);
  }
  ctx.save();
  ctx.scale(ratio, ratio);

  // layout
  const W = canvas.clientWidth || 900;
  const H = canvas.clientHeight || 220;
  const padding = 18;
  const strings = (opts.tuning || ["E","B","G","D","A","E"]).length;
  const tuning = (opts.tuning || ["E","B","G","D","A","E"]).slice().reverse();
  const fretCount = Math.max(6, Math.min(24, maxFret));
  const fretGap = (W - padding*2) / fretCount;
  const stringGap = (H - padding*2) / (strings - 1);

  // background
  ctx.clearRect(0,0,W,H);
  ctx.fillStyle = opts.bg || "rgba(255,255,255,0.02)";
  ctx.fillRect(0,0,W,H);

  // draw frets
  ctx.strokeStyle = opts.fretColor || "rgba(255,255,255,0.06)";
  ctx.lineWidth = 1;
  for (let f=0; f<=fretCount; f++){
    const x = padding + f * fretGap;
    ctx.beginPath();
    ctx.moveTo(x, padding);
    ctx.lineTo(x, H - padding);
    ctx.stroke();
  }

  // draw strings
  ctx.strokeStyle = opts.stringColor || "rgba(255,255,255,0.12)";
  for (let s=0; s<strings; s++){
    const y = padding + s * stringGap;
    ctx.beginPath();
    ctx.moveTo(padding, y);
    ctx.lineTo(W - padding, y);
    ctx.stroke();
  }

  // compute scale notes
  const rootIdx = noteIndex(root);
  const scale = SCALES[scaleType] || SCALES.major;

  // helper: is note in scale relative to root
  const inScale = (noteIdx) => scale.includes((noteIdx - rootIdx + 12) % 12);

  // overlay rendering
  for (let s=0; s<strings; s++){
    const openIdx = noteIndex(tuning[s]);
    for (let f=0; f<=fretCount; f++){
      const noteIdx = (openIdx + f) % 12;
      const x = padding + f * fretGap + fretGap * 0.5;
      const y = padding + s * stringGap;

      // base dot for scale notes when overlay none or scale
      if (overlay === "none" || overlay === "scale") {
        if (inScale(noteIdx)) {
          ctx.fillStyle = opts.scaleColor || "#4fd1c5";
          ctx.beginPath();
          ctx.arc(x, y, 6, 0, Math.PI*2);
          ctx.fill();
        }
      }

      // triads overlay: mark triad chord tones (root, 3rd, 5th)
      if (overlay === "triads") {
        const degree = (noteIdx - rootIdx + 12) % 12;
        // triad degrees for major/minor: 0,4,7 or 0,3,7
        const triadDegrees = (scaleType === "minor") ? [0,3,7] : [0,4,7];
        if (triadDegrees.includes(degree)) {
          ctx.fillStyle = degree === 0 ? "#f6ad55" : "#4fd1c5";
          drawRoundedRect(ctx, x-6, y-6, 12, 12, 3);
        }
      }

      // arpeggios overlay: highlight all scale notes with ring
      if (overlay === "arpeggios") {
        if (inScale(noteIdx)) {
          ctx.fillStyle = "#4fd1c5";
          ctx.beginPath();
          ctx.arc(x, y, 7, 0, Math.PI*2);
          ctx.fill();
        }
      }

      // sweeps overlay: mark every nth fret to show sweep path
      if (overlay === "sweeps") {
        if (f % 4 === 0) {
          ctx.fillStyle = "#9f7aea";
          ctx.beginPath();
          ctx.arc(x, y, 5, 0, Math.PI*2);
          ctx.fill();
        }
      }

      // chord-tones overlay: if opts.chord provided as array of semitone offsets
      if (overlay === "chord-tones" && Array.isArray(opts.chord)) {
        const chordDegrees = opts.chord.map(d => ((d % 12) + 12) % 12);
        const deg = (noteIdx - rootIdx + 12) % 12;
        if (chordDegrees.includes(deg)) {
          ctx.fillStyle = "#f87171";
          ctx.beginPath();
          ctx.arc(x, y, 7, 0, Math.PI*2);
          ctx.fill();
        }
      }

      // intervals overlay: label interval number
      if (overlay === "intervals") {
        const deg = (noteIdx - rootIdx + 12) % 12;
        if (inScale(noteIdx)) {
          ctx.fillStyle = "#021018";
          ctx.font = "10px system-ui, Arial";
          ctx.fillText(String(deg), x-4, y+4);
        }
      }

      // boxes overlay: draw common pentatonic/scale boxes if opts.boxes true
      if (overlay === "boxes" && opts.boxes) {
        // simple visual: mark root positions across neck
        if (noteIdx === rootIdx) {
          ctx.strokeStyle = "#f6ad55";
          ctx.lineWidth = 1.5;
          ctx.beginPath();
          ctx.arc(x, y, 9, 0, Math.PI*2);
          ctx.stroke();
        }
      }

      // show labels optionally
      if (opts.showLabels && f <= 3) {
        ctx.fillStyle = "#9fb0bf";
        ctx.font = "11px system-ui, Arial";
        const label = NOTES[noteIdx];
        ctx.fillText(label, x - 8, y - 10);
      }
    }
  }

  // draw header text
  ctx.fillStyle = opts.textColor || getComputedStyle(document.documentElement).getPropertyValue('--text-main') || "#e6eef6";
  ctx.font = "12px system-ui, Arial";
  ctx.fillText(`${normalizeNote(root)} ${scaleType} • overlay: ${overlay}`, padding, 14);

  ctx.restore();
}
