function updateDebugPanel(data) {
  let panel = document.getElementById("focusvector-debug");

  if (!panel) {
    panel = document.createElement("div");

    panel.id = "focusvector-debug";

    document.body.appendChild(panel);
  }

  panel.innerHTML = `
  <strong>FocusVector Debug</strong><br><br>

  <strong>State:</strong> ${data.state}<br>
  <strong>Drift Score:</strong> ${data.driftScore}<br>
  <strong>Avg Speed:</strong> ${data.averageScrollSpeed.toFixed(2)}<br>
  <strong>Idle Events:</strong> ${data.idleEvents}<br>
  <strong>Backward Scrolls:</strong> ${data.backwardScrolls}<br><br>

  <strong>Signals</strong><br>
  Slow Scroll: ${data.signals.slowScrolling}<br>
  Frequent Idle: ${data.signals.frequentIdle}<br>
  Heavy Backtracking: ${data.signals.heavyBacktracking}<br>
  Low Progress: ${data.signals.lowProgress}<br>
  Recovery Pattern: ${data.signals.possibleRecoveryPattern}
`;
}

window.updateDebugPanel = updateDebugPanel;
