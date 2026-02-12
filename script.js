// Elements
const bgm = document.getElementById("bgm"); // optional music
const screen1 = document.getElementById("screen1");
const screen2 = document.getElementById("screen2");
const rose = document.getElementById("rose");
const envelope = document.getElementById("envelope");
const letter = document.getElementById("letter");
const lover = document.getElementById("lover");
const titleEl = document.getElementById("title");
const contentEl = document.getElementById("content");

let startedAudio = false;
document.addEventListener("click", function once() {
  if (!startedAudio) {
    startedAudio = true;
    if (bgm && typeof bgm.play === "function") {
      try {
        bgm.play();
      } catch (e) {}
    }
    document.removeEventListener("click", once);
  }
});

// When user clicks rose: switch to envelope scene and run effects
rose.addEventListener("click", () => {
  // show screen2
  screen1.classList.add("hidden");
  screen2.classList.remove("hidden");

  // ensure envelope visible (CSS centers it)
  envelope.style.opacity = "1";
  envelope.style.transform = "translate(-50%,-50%) scale(1)";

  // shortly after, slide letter up to overlay envelope
  setTimeout(() => {
    letter.classList.add("show");
    // slightly fade envelope so letter stands out
    envelope.style.opacity = "0.72";

    // heart explosion (moderate)
    startHeartExplosion(1400, 20);

    // start typing effect after small delay
    setTimeout(() => startTyping(), 700);
  }, 420);
});

/* ===========================
   Improved heart explosion
   - totalDuration ~ 3000ms
   - totalCount ~ 36 (spread)
   - bigger, more visible, slight color variety
   =========================== */
function startHeartExplosion(totalDuration = 3000, totalCount = 36) {
  // spawn hearts spread across totalDuration
  for (let i = 0; i < totalCount; i++) {
    const delay = Math.random() * totalDuration;
    setTimeout(spawnHeart, delay);
  }
}

function spawnHeart() {
  const heart = document.createElement("div");
  heart.className = "boom-heart";
  heart.textContent = "💖"; // cute default; you can switch to '❤️' if you prefer

  // small random class for extra drop-shadow/variation
  if (Math.random() > 0.6) heart.classList.add("v2");

  document.body.appendChild(heart);

  // put heart at envelope center (more accurate)
  const rect = envelope.getBoundingClientRect();
  const cx = rect.left + rect.width / 2;
  const cy = rect.top + rect.height / 2 - 10;

  // position absolutely (account for page scroll)
  heart.style.left = `${cx}px`;
  heart.style.top = `${cy}px`;

  // random direction & distance
  const angle = Math.random() * Math.PI * 2;
  // distance skewed to be visible but not go offscreen
  const distance = 120 + Math.random() * 240;
  const dx = Math.cos(angle) * distance;
  const dy = Math.sin(angle) * distance * (Math.random() > 0.5 ? -1 : 1); // allow upward bias sometimes

  // random scale & rotation
  const endScale = 0.35 + Math.random() * 0.9; // end smaller or moderate
  const rotateDeg = (Math.random() * 360) | 0;
  const duration = 1200 + Math.random() * 1600; // 1.2s - 2.8s

  // animate: travel + rotate + fade
  heart.animate(
    [
      { transform: "translate(0,0) scale(1) rotate(0deg)", opacity: 1 },
      {
        transform: `translate(${dx}px, ${dy}px) scale(${endScale}) rotate(${rotateDeg}deg)`,
        opacity: 0,
      },
    ],
    {
      duration: duration,
      easing: "cubic-bezier(.22, .9, .3, 1)",
    },
  );

  // cleanup
  setTimeout(() => {
    heart.remove();
  }, duration + 40);
}

/* Typewriter */
const TITLE = "Gửi em yêu dấu của anh… 💌";
const CONTENT =
  "Đây là Valentine đầu tiên của chúng ta, mà anh phải xa em nên anh chỉ có cách này để có thể bày tỏ hết một phần nhỏ tình yêu mà anh dành cho em.\nAnh nhớ em nhiều lắm, anh cảm thấy hạnh phúc vì em đã đồng hành cùng với anh, anh cũng chẳng có gì nhiều nên là anh xin gửi lời chúc đến người con gái của anh luôn hạnh phúc và sẽ cùng anh bước tiếp trên con đường tương lai.\n Thương em nhiều ❤️ ";

function startTyping() {
  typeWriter(titleEl, TITLE, 36, () => {
    setTimeout(() => typeWriter(contentEl, CONTENT, 24, afterAll), 360);
  });
}

function typeWriter(el, text, speed, cb) {
  el.textContent = "";
  let k = 0;
  (function step() {
    if (k < text.length) {
      el.textContent += text[k++];
      setTimeout(step, speed);
    } else if (cb) cb();
  })();
}

/* After all effects: make lover blink (attract) and clickable to your link */
function afterAll() {
  // add blinking class (infinite) so she sees and can click
  lover.classList.add("lover-blink");

  // set clickable (once)
  lover.style.cursor = "pointer";
  lover.addEventListener(
    "click",
    () => {
      // TODO: replace with your uploaded link
      window.location.href =
        "https://tomdev88galaxy.netlify.app/?c=eyJ0ZXh0IjoiIiwibWVzc2FnZSI6IiIsImluc3RydWN0aW9ucyI6IkNo4bqhbSBuaOG6uSB2w6BvIG3Ds24gcXXDoCB5w6p1IHRoxrDGoW5nIG7DoHkgbmjDqSDinaTvuI8iLCJtdXNpYyI6Imh0dHBzOi8vY2RuLnNob3BpZnkuY29tL3MvZmlsZXMvMS8wNzU3Lzk3MDAvNDU3Mi9maWxlcy9Ob2lOYXlDb0FuaC1Tb25UdW5nTVRQLTQ3NzIwNDEubXAzP3Y9MTc0ODk1NjU2NyIsIm5hbWUiOiJUcuG6p24gTmd1eeG7hW4gQuG6o28gTmfhu41jLFxuQW5oIHnDqnUgZW0gbOG6r20hLFxuQ-G7pWMgY8awbmcgY-G7p2EgYW5oLCIsImltYWdlIjoiaHR0cHM6Ly9jZG4uc2hvcGlmeS5jb20vcy9maWxlcy8xLzA3NTcvOTcwMC80NTcyL2ZpbGVzL3o3NTI4NjM4NzAwOTA3X2IxOTE1MjJkY2U0MjNjYTRmYmY2MGE1NTJlYTI4OTcwLmpwZz92PTE3NzA4OTY0MjMsaHR0cHM6Ly9jZG4uc2hvcGlmeS5jb20vcy9maWxlcy8xLzA3NTcvOTcwMC80NTcyL2ZpbGVzL3o3NTI4NjM4NjkzMTAyXzMwZjFhMzVhMDBiM2NmMWM0MzlkNzRjNzM0NTM2YjI0LmpwZz92PTE3NzA4OTY2MDQsaHR0cHM6Ly9jZG4uc2hvcGlmeS5jb20vcy9maWxlcy8xLzA3NTcvOTcwMC80NTcyL2ZpbGVzL3o3NTI4NjM4Njg4NTE5Xzc1MmFiNWQ3ZjUyNzIxOGI0M2YwZThlODI5MDBiMDA5LmpwZz92PTE3NzA4OTY2MTUsaHR0cHM6Ly9jZG4uc2hvcGlmeS5jb20vcy9maWxlcy8xLzA3NTcvOTcwMC80NTcyL2ZpbGVzL3o3NTI4NjM4Njg2NzkzX2IzYWZhYzIxMTc2ZDVjODNmMjRkOWY5YzI3ZjhlMjhmLmpwZz92PTE3NzA4OTY2MjMsaHR0cHM6Ly9jZG4uc2hvcGlmeS5jb20vcy9maWxlcy8xLzA3NTcvOTcwMC80NTcyL2ZpbGVzL3o3NTI4NjM4Njc1ODY5XzU3M2E2YmNmYTU5YjI3YzhlODk0YmJiY2IwYjI4ZTVhLmpwZz92PTE3NzA4OTY2MzEifQ==";
    },
    { once: true },
  );
}
// giả sử animation xuất hiện kéo 900ms → bật blink sau 1.0s
setTimeout(() => {
  document.getElementById("rose").classList.add("blink-rose");
}, 1000);

// tắt khi click
document.getElementById("rose").addEventListener("click", () => {
  document.getElementById("rose").classList.remove("blink-rose");
});
