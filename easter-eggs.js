/* MC7026 — small hidden extras, loaded on every page. None of this touches
   the wallet/collection logic in wallet.js; it's purely decorative. */

(function () {
  console.log(`
╔═══════════════════╗
║        [*]         ║
║       /|\\          ║
║      / | \\         ║
║     /  |  \\        ║
║                    ║
║     DUDE #151      ║
║      "GOLD"        ║
║   1ST TO 128-BIT   ║
╚═══════════════════╝
`);
})();

/* ---------- click the header logo 5 times: spin + a rain of MoonCats ---------- */
(function () {
  const brandLink = document.querySelector(".brand");
  const brandLogo = document.querySelector(".brand-logo");
  if (!brandLink || !brandLogo) return;

  function spawnMoonCatRain() {
    brandLogo.classList.remove("mc-spin");
    void brandLogo.offsetWidth; // restart the animation if triggered again quickly
    brandLogo.classList.add("mc-spin");

    const RAIN_COUNT = 18;
    for (let i = 0; i < RAIN_COUNT; i++) {
      const drop = document.createElement("img");
      drop.src = "src/others/logo.png";
      drop.alt = "";
      drop.className = "mooncat-rain-drop";
      const size = 22 + Math.random() * 22;
      drop.style.width = size + "px";
      drop.style.height = size + "px";
      drop.style.left = Math.random() * 100 + "vw";
      document.body.appendChild(drop);

      const rotate = (Math.random() < 0.5 ? -1 : 1) * (360 + Math.random() * 360);
      const anim = drop.animate([
        { transform: "translateY(-10vh) rotate(0deg)", opacity: 1 },
        { transform: `translateY(110vh) rotate(${rotate}deg)`, opacity: 1 }
      ], {
        duration: 1800 + Math.random() * 1200,
        delay: Math.random() * 500,
        easing: "cubic-bezier(.4,0,.6,1)",
        fill: "forwards",
      });
      anim.onfinish = () => drop.remove();
    }
  }

  let count = 0;
  let resetTimer = null;
  brandLink.addEventListener("click", (e) => {
    e.preventDefault();
    count++;
    clearTimeout(resetTimer);
    if (count >= 5) {
      count = 0;
      spawnMoonCatRain();
      return;
    }
    // give a short window for more clicks before treating this as a real nav click
    resetTimer = setTimeout(() => {
      count = 0;
      window.location.href = brandLink.href;
    }, 400);
  });
})();

/* ---------- click the phoenix emoji in About: a burst of flames ---------- */
(function () {
  const trigger = document.querySelector(".phoenix-trigger");
  if (!trigger) return;

  trigger.addEventListener("click", () => {
    const rect = trigger.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;

    const FLAME_COUNT = 10;
    for (let i = 0; i < FLAME_COUNT; i++) {
      const flame = document.createElement("div");
      flame.className = "phoenix-flame";
      flame.textContent = "🔥";
      flame.style.left = cx + "px";
      flame.style.top = cy + "px";
      document.body.appendChild(flame);

      const angle = Math.random() * Math.PI * 2;
      const dist = 60 + Math.random() * 90;
      const dx = Math.cos(angle) * dist;
      const dy = Math.sin(angle) * dist - 40; // bias upward, like rising flames

      const anim = flame.animate([
        { transform: "translate(-50%, -50%) translate(0, 0) scale(0.6)", opacity: 1 },
        { transform: `translate(-50%, -50%) translate(${dx}px, ${dy}px) scale(1.6)`, opacity: 0 }
      ], { duration: 700 + Math.random() * 300, easing: "cubic-bezier(.2,.8,.2,1)", fill: "forwards" });
      anim.onfinish = () => flame.remove();
    }
  });
})();
