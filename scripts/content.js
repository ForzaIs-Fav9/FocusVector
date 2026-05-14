console.log("Overlay function:", window.showFocusOverlay);
const blockedDomains = [
  "twitter.com",
  "x.com",
  "youtube.com",
  "reddit.com",
  "instagram.com",
  "web.whatsapp.com",
  "linkedin.com"
];

const currentDomain = window.location.hostname;

if (blockedDomains.some(domain => currentDomain.includes(domain))) {
  console.log("FocusVector disabled on this site");
  throw new Error("Blocked domain");
}

let lastOverlayTimestamp = 0;

const OVERLAY_COOLDOWN = 120000;
let baselineScrollSpeed = null;
let telemetry = {
  scrollEvents: 0,
  totalScrollDistance: 0,
  totalScrollSpeed: 0,
  idleEvents: 0,
  maxProgress: 0,
  backwardScrolls: 0
};

let lastScrollY = window.scrollY;
let lastTimestamp = Date.now();
let isBacktracking = false;
let backtrackingTimeout = null;
let isScrolling = false;
let scrollingTimeout = null;
let idleTimer = null;
let isIdle = false;

function getReadingProgress() {
  const scrollTop = window.scrollY;
  const documentHeight =
    document.documentElement.scrollHeight - window.innerHeight;

  if (documentHeight <= 0) {
    return 0;
  }

  return scrollTop / documentHeight;
}

function triggerIdleState() {
  if (!isIdle) {
    isIdle = true;

    telemetry.idleEvents++;

    console.log("User became idle");
  }
}

window.addEventListener("scroll", () => {
  const currentScrollY = window.scrollY;
  const currentTimestamp = Date.now();

  const deltaY = currentScrollY - lastScrollY;
  const deltaTime = currentTimestamp - lastTimestamp;

  const scrollSpeed = Math.abs(deltaY / deltaTime);

  if (!isScrolling) {
  telemetry.scrollEvents++;

  isScrolling = true;
}

clearTimeout(scrollingTimeout);

scrollingTimeout = setTimeout(() => {
  isScrolling = false;
}, 800);
  
  telemetry.totalScrollDistance += Math.abs(deltaY);
  telemetry.totalScrollSpeed += scrollSpeed;

  const progress = getReadingProgress();

  if (progress > telemetry.maxProgress) {
    telemetry.maxProgress = progress;
  }

  if (deltaY < 0) {
    if (!isBacktracking) {
       telemetry.backwardScrolls++;

      isBacktracking = true;
    }

    clearTimeout(backtrackingTimeout);

    backtrackingTimeout = setTimeout(() => {
       isBacktracking = false;
    }, 1000);
}

  lastScrollY = currentScrollY;
  lastTimestamp = currentTimestamp;

  isIdle = false;

  clearTimeout(idleTimer);

  idleTimer = setTimeout(() => {
    triggerIdleState();
  }, 5000);
});

function updateBaseline(currentSpeed) {
  if (baselineScrollSpeed === null) {
    baselineScrollSpeed = currentSpeed;
    return;
  }

  baselineScrollSpeed =
    baselineScrollSpeed * 0.9 +
    currentSpeed * 0.1;
}

setInterval(() => {
  const averageScrollSpeed =
    telemetry.scrollEvents > 0
      ? telemetry.totalScrollSpeed / telemetry.scrollEvents
      : 0;
  updateBaseline(averageScrollSpeed);
  const telemetrySnapshot = {
  windowDuration: "30s",
  scrollEvents: telemetry.scrollEvents,
  totalScrollDistance: telemetry.totalScrollDistance,
  averageScrollSpeed,
  baselineScrollSpeed,
  idleEvents: telemetry.idleEvents,
  maxProgress: telemetry.maxProgress,
  backwardScrolls: telemetry.backwardScrolls
};

const analysis = window.analyzeTelemetry(telemetrySnapshot);

console.log({
  telemetry: telemetrySnapshot,
  analysis
});
window.updateDebugPanel({
  state: analysis.state,
  driftScore: analysis.driftScore,
  averageScrollSpeed,
  baselineScrollSpeed,
  idleEvents: telemetry.idleEvents,
  backwardScrolls: telemetry.backwardScrolls,
  signals: analysis.signals
});
  
const now = Date.now();

if (
  analysis.state === "possible_drift" &&
  now - lastOverlayTimestamp > OVERLAY_COOLDOWN
) {
  console.log("Attempting overlay trigger");

  window.showFocusOverlay(
    "Looks like you may have lost the thread."
  );

  lastOverlayTimestamp = now;
}
  telemetry = {
    scrollEvents: 0,
    totalScrollDistance: 0,
    totalScrollSpeed: 0,
    idleEvents: 0,
    maxProgress: 0,
    backwardScrolls: 0
  };
}, 30000);
