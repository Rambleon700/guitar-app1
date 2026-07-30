// modal pattern play — ensure modal has its own visual container
qs("#modal-pattern-play-btn")?.addEventListener("click", () => {
  if (!currentModalSong) return;
  const patternString = normalizePatternValue(currentModalSong.pattern);

  // prefer an existing modal visual; create one if missing
  let modalPatternVisual = qs("#modal-pattern-visual");
  if (!modalPatternVisual) {
    modalPatternVisual = document.createElement("div");
    modalPatternVisual.id = "modal-pattern-visual";
    modalPatternVisual.className = "pattern-visual";
    // append to modal body (safe fallback if structure changes)
    const modalBody = qs("#song-modal-body") || qs("#song-modal");
    modalBody.appendChild(modalPatternVisual);
  }

  try {
    buildPatternDots(patternString, modalPatternVisual);
    playPatternAnimation(modalPatternVisual);
  } catch (err) {
    console.warn("Pattern module missing or failed (modal)", err);
  }
});

