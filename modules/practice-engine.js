/* modules/practice-engine.js */
export function generatePracticePlan(focus = "songs", duration = 15) {
  const blocks = [];
  if (focus === "songs") {
    blocks.push({title: "Warm-up", mins: Math.max(3, Math.round(duration * 0.15)), desc: "Finger stretching and chromatic runs."});
    blocks.push({title: "Song Work", mins: Math.max(6, Math.round(duration * 0.6)), desc: "Work on song sections and transitions."});
    blocks.push({title: "Cool-down", mins: Math.max(2, duration - (Math.max(3, Math.round(duration * 0.15)) + Math.max(6, Math.round(duration * 0.6)))), desc: "Slow playthrough and reflection."});
  } else if (focus === "chords") {
    blocks.push({title: "Warm-up", mins: 3, desc: "Open chord changes slowly."});
    blocks.push({title: "Chord Drills", mins: Math.max(8, duration - 6), desc: "Change between target chords with metronome."});
    blocks.push({title: "Application", mins: Math.max(2, duration - 11), desc: "Apply chords to a simple progression."});
  } else if (focus === "patterns") {
    blocks.push({title: "Warm-up", mins: 3, desc: "Right-hand loose strumming."});
    blocks.push({title: "Pattern Practice", mins: Math.max(8, duration - 6), desc: "Practice selected strumming patterns with metronome."});
    blocks.push({title: "Song Application", mins: Math.max(2, duration - 11), desc: "Apply patterns to a song."});
  } else {
    blocks.push({title: "Mixed Practice", mins: duration, desc: "Balanced routine."});
  }

  const container = document.createElement("div");
  container.className = "practice-plan-inner";
  blocks.forEach(b => {
    const card = document.createElement("div");
    card.className = "song-card";
    card.innerHTML = `<div class="song-meta-row"><div><h4 style="margin:0">${b.title}</h4><p class="muted" style="margin:4px 0 0">${b.desc}</p></div><div style="font-weight:600">${b.mins}m</div></div>`;
    container.appendChild(card);
  });
  return container.outerHTML;
}
