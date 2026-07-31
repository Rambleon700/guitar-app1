/* modules/fretboard-engine.js */
const NOTES = ["C","C#","D","D#","E","F","F#","G","G#","A","A#","B"];
const SCALES = {
  major: [0,2,4,5,7,9,11],
  minor: [0,2,3,5,7,8,10],
  "pentatonic-major": [0,2,4,7,9],
  "pentatonic-minor": [0,3,5,7,10]
};

export function renderFretboard(canvas, root = "E", scaleType = "major", overlay = "none", maxFret = 12) {
  if (!canvas || !canvas.getContext) return;
  const ctx = canvas.getContext("2d");
  const w = canvas.width;
  const h = canvas.height;
  ctx.clearRect(0,0,w,h);

  const padding = 20;
  const strings = 6;
  const stringGap = (h - padding*2) / (strings - 1);
  const fretCount = Math.max(6, Math.min(24, maxFret));
  const fretGap = (w - padding*2) / fretCount;

  ctx.fillStyle = getComputedStyle(document.documentElement).getPropertyValue('--card-bg') || "#fff";
  ctx.fillRect(0,0,w,h);

  ctx.strokeStyle = "#2b3942";
  ctx.lineWidth = 1;
  for (let f = 0; f <= fretCount; f++) {
    const x = padding + f * fretGap;
    ctx.beginPath();
    ctx.moveTo(x, padding);
    ctx.lineTo(x, h - padding);
    ctx.stroke();
  }

  for (let s = 0; s < strings; s++) {
    const y = padding + s * stringGap;
    ctx.beginPath();
    ctx.moveTo(padding, y);
    ctx.lineTo(w - padding, y);
    ctx.stroke();
  }

  const tuning = ["E","B","G","D","A","E"].reverse();
  const rootIndex = NOTES.indexOf(normalizeNote(root));
  const scale = SCALES[scaleType] || SCALES.major;

  for (let s = 0; s < strings; s++) {
    const openNote = NOTES.indexOf(normalizeNote(tuning[s]));
    for (let f = 0; f <= fretCount; f++) {
      const noteIndex = (openNote + f) % 12;
      const isInScale = scale.includes((noteIndex - rootIndex + 12) % 12);
      const x = padding + f * fretGap + fretGap * 0.5;
      const y = padding + s * stringGap;
      if (overlay === "none") {
        if (isInScale) {
          ctx.beginPath();
          ctx.fillStyle = getComputedStyle(document.documentElement).getPropertyValue('--accent') || "#4fd1c5";
          ctx.arc(x, y, 6, 0, Math.PI*2);
          ctx.fill();
        }
      } else {
        if (overlay === "triads") {
          if (isInScale && ((noteIndex - rootIndex + 12) % 12) % 3 === 0) {
            ctx.fillStyle = "#f6ad55";
            ctx.fillRect(x-6, y-6, 12, 12);
          }
        } else if (overlay === "arpeggios") {
          if (isInScale) {
            ctx.fillStyle = "#4fd1c5";
            ctx.beginPath();
            ctx.arc(x, y, 7, 0, Math.PI*2);
            ctx.fill();
          }
        } else if (overlay === "sweeps") {
          if (f % 4 === 0) {
            ctx.fillStyle = "#9f7aea";
            ctx.beginPath();
            ctx.arc(x, y, 5, 0, Math.PI*2);
            ctx.fill();
          }
        }
      }
    }
  }

  ctx.fillStyle = getComputedStyle(document.documentElement).getPropertyValue('--text-main') || "#000";
  ctx.font = "12px system-ui, Arial";
  ctx.fillText(`${root.toUpperCase()} ${scaleType}`, padding, 14);
}

function normalizeNote(n) {
  if (!n) return "C";
  return n.replace("♭","b").replace("♯","#").toUpperCase();
} 
