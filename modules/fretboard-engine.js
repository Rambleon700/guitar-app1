qs("#modal-fb-render-btn")?.addEventListener("click", () => {
  if (!currentModalSong) return;
  const overlayType = qs("#modal-fb-overlay-select")?.value || "none";
  const modalCanvas = qs("#modal-fretboard-canvas");
  const root = (currentModalSong.chords && currentModalSong.chords[0]) ? currentModalSong.chords[0].replace(/[^A-G#b]/g,"") : "C";

  if (!modalCanvas) return;

  // Ensure canvas pixel ratio and layout are correct before rendering
  const renderNow = () => {
    const ratio = window.devicePixelRatio || 1;
    modalCanvas.width = Math.floor(modalCanvas.clientWidth * ratio);
    modalCanvas.height = Math.floor(modalCanvas.clientHeight * ratio);
    try {
      renderFretboard(modalCanvas, root, "pentatonic-minor", overlayType, 12);
    } catch (err) {
      console.warn("renderFretboard failed (modal)", err);
    }
  };

  // If modal is open and visible, render immediately; otherwise wait a tick
  if (songModal && songModal.classList.contains("open")) {
    // small timeout to allow CSS transitions/layout to finish
    setTimeout(renderNow, 60);
  } else {
    // fallback: render on next animation frame
    requestAnimationFrame(renderNow);
  }
});
