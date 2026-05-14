function showFocusOverlay(message) {
  const existingOverlay = document.getElementById("focusvector-overlay");

  if (existingOverlay) {
    return;
  }

  const overlay = document.createElement("div");

  overlay.id = "focusvector-overlay";

  overlay.innerHTML = `
    <div id="focusvector-overlay-content">
      <p>${message}</p>
      <button id="focusvector-dismiss">Dismiss</button>
    </div>
  `;

  document.body.appendChild(overlay);

  const dismissButton = document.getElementById("focusvector-dismiss");

  dismissButton.addEventListener("click", () => {
    overlay.remove();
  });
}

window.showFocusOverlay = showFocusOverlay;
