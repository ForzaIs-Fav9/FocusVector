let lastScrollY = window.scrollY;
let lastTimestamp = Date.now();

let idleTimer = null;
let isIdle = false;

function triggerIdleState() {
  if (!isIdle) {
    isIdle = true;

    console.log({
      state: "idle",
      timestamp: Date.now()
    });
  }
}

window.addEventListener("scroll", () => {
  const currentScrollY = window.scrollY;
  const currentTimestamp = Date.now();

  const deltaY = currentScrollY - lastScrollY;
  const deltaTime = currentTimestamp - lastTimestamp;

  const scrollSpeed = Math.abs(deltaY / deltaTime);

  console.log({
    state: "scrolling",
    scrollY: currentScrollY,
    deltaY,
    deltaTime,
    scrollSpeed
  });

  lastScrollY = currentScrollY;
  lastTimestamp = currentTimestamp;

  isIdle = false;

  clearTimeout(idleTimer);

  idleTimer = setTimeout(() => {
    triggerIdleState();
  }, 5000);
});
