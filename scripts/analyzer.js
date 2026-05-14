function analyzeTelemetry(telemetry) {
  let driftScore = 0;

  let state = "focused";

  const slowScrolling =
    telemetry.baselineScrollSpeed !== null &&
    telemetry.averageScrollSpeed < 
      telemetry.baselineScrollSpeed* 0.6;

  const frequentIdle =
    telemetry.idleEvents >= 1;

  const heavyBacktracking =
    telemetry.backwardScrolls >= 5;

  const lowProgress =
    telemetry.maxProgress < 0.15;

  if (slowScrolling) {
    driftScore += 1;
  }

  if (frequentIdle) {
    driftScore += 1;
  }

  if (heavyBacktracking) {
    driftScore += 1;
  }

  if (lowProgress) {
    driftScore += 1;
  }

  const possibleRecoveryPattern =
    frequentIdle &&
    heavyBacktracking &&
    slowScrolling;

  if (possibleRecoveryPattern) {
    state = "drift_recovery";
  } else if (driftScore >= 3) {
    state = "possible_drift";
  } else if (driftScore === 2) {
    state = "fragmented";
  }

  return {
    state,
    driftScore,
    signals: {
      slowScrolling,
      frequentIdle,
      heavyBacktracking,
      lowProgress,
      possibleRecoveryPattern
    }
  };
}

window.analyzeTelemetry = analyzeTelemetry;
