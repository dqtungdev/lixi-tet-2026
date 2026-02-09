const amounts = [5000, 10000, 20000, 50000, 100000, 200000, 500000];
const spinNumber = document.getElementById("spinNumber");
const popup = document.getElementById("popup");
const moneyImg = document.getElementById("moneyImg");
const resultText = document.getElementById("resultText");

document.getElementById("openBtn").onclick = () => {
    let count = 0;
    const spin = setInterval(() => {
        const v = amounts[Math.floor(Math.random() * amounts.length)];
        spinNumber.textContent = v.toLocaleString() + " đ";
        count++;
        if (count > 20) {
            clearInterval(spin);
            showResult(v);
        }
    }, 80);
};

function showResult(value) {
    popup.style.display = "flex";
    moneyImg.src = `./images/${value}.jpg`;
    resultText.textContent = `🎉 Bạn đã nhận được ${value.toLocaleString()} đ 🎉`;
    startFireworks();
}

document.getElementById("closeBtn").onclick = () => {
    popup.style.display = "none";
};

/* Pháo hoa – dùng canvas, chạy Safari */
const canvas = document.getElementById("fireworks");
const ctx = canvas.getContext("2d");

function resize() {
    canvas.width = innerWidth;
    canvas.height = innerHeight;
}
resize();
window.onresize = resize;

function startFireworks() {
    let particles = [];
    for (let i = 0; i < 120; i++) {
        particles.push({
            x: canvas.width / 2,
            y: canvas.height / 2,
            vx: (Math.random() - 0.5) * 6,
            vy: (Math.random() - 0.5) * 6,
            life: 60
        });
    }

    const ani = setInterval(() => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach(p => {
            p.x += p.vx;
            p.y += p.vy;
            p.life--;
            ctx.fillStyle = "gold";
            ctx.fillRect(p.x, p.y, 3, 3);
        });
        particles = particles.filter(p => p.life > 0);
        if (!particles.length) clearInterval(ani);
    }, 30);
}
