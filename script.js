const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const music = document.getElementById("bgMusic");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particles = [];
let petals = [];

function firework(x, y) {
  for (let i = 0; i < 80; i++) {
    particles.push({
      x, y,
      dx: (Math.random() - 0.5) * 8,
      dy: (Math.random() - 0.5) * 8,
      life: 60
    });
  }
}

function createPetal() {
  petals.push({
    x: Math.random() * canvas.width,
    y: -20,
    size: Math.random() * 6 + 4,
    speed: Math.random() * 1.5 + 0.5
  });
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  particles.forEach((p, i) => {
    p.x += p.dx;
    p.y += p.dy;
    p.life--;
    ctx.fillStyle = "rgba(255,100,150,0.8)";
    ctx.fillRect(p.x, p.y, 3, 3);
    if (p.life <= 0) particles.splice(i, 1);
  });

  petals.forEach((p, i) => {
    p.y += p.speed;
    ctx.fillStyle = "pink";
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
    ctx.fill();
    if (p.y > canvas.height) petals.splice(i, 1);
  });

  requestAnimationFrame(animate);
}
animate();

setInterval(createPetal, 300);

const yes = document.getElementById("yes");
const no = document.getElementById("no");
const msg = document.getElementById("msg");

const noLines = [
  "Try again 😌",
  "Don’t lie 😏",
  "You know the answer 👀",
  "Nice try 💀",
  "Still thinking?"
];

yes.onclick = () => {
  msg.innerHTML = "The night blooms with us 🌸🎆";
  firework(canvas.width / 2, canvas.height / 2);
  music.play();
};

no.onclick = () => {
  no.style.position = "absolute";
  no.style.left = Math.random() * (window.innerWidth - 120) + "px";
  no.style.top = Math.random() * (window.innerHeight - 120) + "px";
  msg.innerHTML = noLines[Math.floor(Math.random() * noLines.length)];
};
