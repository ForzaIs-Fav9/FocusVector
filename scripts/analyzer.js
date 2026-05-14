function analyzeTelemetry(telemetry) {
  let driftScore = 0;

  if (telemetry.averageScrollSpeed < 0.3) {
    driftScore += 1;
  }

  if (telemetry.idleEvents >= 2) {
    driftScore += 1;
  }

  if (telemetry.backwardScrolls >= 5) {
    driftScore += 1;
  }

  let state = "focused";

  if (driftScore >= 3) {
    state = "possible_drift";
  } else if (driftScore === 2) {
    state = "fragmented";
  }

  return {
    state,
    driftScore
  };
}

window.analyzeTelemetry = analyzeTelemetry;
