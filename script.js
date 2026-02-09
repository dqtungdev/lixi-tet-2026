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
    clearInterval(fireworksInterval);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
};

/* Pháo hoa – dùng canvas, chạy Safari */
const canvas = document.getElementById("fireworks");
const ctx = canvas.getContext("2d");
let fireworksInterval;

function resize() {
    canvas.width = innerWidth;
    canvas.height = innerHeight;
}
resize();
window.onresize = resize;

function startFireworks() {
    let particles = [];
    
    function createExplosion() {
        const x = Math.random() * (canvas.width * 0.8) + (canvas.width * 0.1); // Tránh sát mép
        const y = Math.random() * (canvas.height * 0.5) + 50; // Nổ ở nửa trên
        const hue = Math.floor(Math.random() * 360);
        const particleCount = 150; // Tăng số lượng hạt để vụ nổ dày hơn

        for (let i = 0; i < particleCount; i++) {
            const angle = Math.random() * Math.PI * 2; // Góc ngẫu nhiên vòng tròn
            const speed = Math.random() * 15 + 5; // Tăng tốc độ để nổ to hơn (bán kính rộng)
            particles.push({
                x: x, y: y,
                vx: Math.cos(angle) * speed,
                vy: Math.sin(angle) * speed,
                life: 1, // Độ trong suốt (alpha)
                decay: Math.random() * 0.01 + 0.005, // Giảm tốc độ mờ để pháo hoa sáng lâu hơn
                color: `hsl(${hue}, 100%, 60%)`,
                gravity: 0.1
            });
        }
    }

    createExplosion();
    if (fireworksInterval) clearInterval(fireworksInterval);

    fireworksInterval = setInterval(() => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        // Tăng tỉ lệ xuất hiện pháo hoa (0.05 = 5% mỗi khung hình)
        if (Math.random() < 0.05) createExplosion();

        particles.forEach(p => {
            p.vx *= 0.95; // Ma sát không khí (làm chậm dần theo chiều ngang)
            p.vy *= 0.95; // Ma sát chiều dọc
            p.vy += p.gravity; // Trọng lực kéo xuống
            p.x += p.vx;
            p.y += p.vy;
            p.life -= p.decay;
            
            ctx.beginPath();
            ctx.arc(p.x, p.y, 4, 0, Math.PI * 2); // Tăng kích thước hạt lên 4
            ctx.fillStyle = p.color;
            ctx.globalAlpha = p.life; // Áp dụng độ mờ
            ctx.fill();
            ctx.globalAlpha = 1; // Reset alpha
        });
        particles = particles.filter(p => p.life > 0);
    }, 20); // Tăng tốc độ khung hình lên một chút cho mượt
}
