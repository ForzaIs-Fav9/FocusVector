const blockedDomains = [
  "twitter.com",
  "x.com",
  "youtube.com",
  "reddit.com",
  "instagram.com",
  "linkedin.com"
];

const currentDomain = window.location.hostname;

if (blockedDomains.some(domain => currentDomain.includes(domain))) {
  console.log("FocusVector disabled on this site");
  throw new Error("Blocked domain");
}

let telemetry = {
  scrollEvents: 0,
  totalScrollDistance: 0,
  totalScrollSpeed: 0,
  idleEvents: 0
};

let lastScrollY = window.scrollY;
let lastTimestamp = Date.now();

let idleTimer = null;
let isIdle = false;

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

  telemetry.scrollEvents++;
  telemetry.totalScrollDistance += Math.abs(deltaY);
  telemetry.totalScrollSpeed += scrollSpeed;

  lastScrollY = currentScrollY;
  lastTimestamp = currentTimestamp;

  isIdle = false;

  clearTimeout(idleTimer);

  idleTimer = setTimeout(() => {
    triggerIdleState();
  }, 5000);
});

setInterval(() => {
  const averageScrollSpeed =
    telemetry.scrollEvents > 0
      ? telemetry.totalScrollSpeed / telemetry.scrollEvents
      : 0;

  console.log({
    windowDuration: "30s",
    scrollEvents: telemetry.scrollEvents,
    totalScrollDistance: telemetry.totalScrollDistance,
    averageScrollSpeed,
    idleEvents: telemetry.idleEvents
  });

  telemetry = {
    scrollEvents: 0,
    totalScrollDistance: 0,
    totalScrollSpeed: 0,
    idleEvents: 0
  };
}, 30000);
