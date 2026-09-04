/* =========================================
   TEACHERS' DAY WEBSITE
   INTERACTIVE JAVASCRIPT
========================================= */


/* ---------- INTRO ---------- */

const introScreen = document.getElementById("introScreen");
const mainContent = document.getElementById("mainContent");
const enterBtn = document.getElementById("enterBtn");

enterBtn.addEventListener("click", () => {

    introScreen.classList.add("hide");

    setTimeout(() => {
        introScreen.style.display = "none";
        mainContent.classList.remove("hidden");

        startParticles();
        playMusic();

    }, 900);

});
/* ---------- MUSIC LINK ---------- */

const musicBtn =
    document.getElementById("musicBtn");

const musicMenu =
    document.getElementById("musicMenu");

const songLink =
    document.getElementById("songLink");

const openSong =
    document.getElementById("openSong");


musicBtn.addEventListener("click", () => {

    musicMenu.classList.toggle("show");

});


openSong.addEventListener("click", () => {

    const link =
        songLink.value.trim();

    if (!link) {

        alert("Please paste a song link 🎵");

        return;

    }

    try {

        const url = new URL(link);

        if (
            url.protocol !== "https:" &&
            url.protocol !== "http:"
        ) {
            throw new Error();
        }

        window.open(
            url.href,
            "_blank",
            "noopener,noreferrer"
        );

    } catch {

        alert("Please enter a valid song link 🔗");

    }

});


/* ---------- COUNTDOWN ---------- */

/*
   Change this date if you want a different countdown.
*/

const celebrationDate =
    new Date("September 5, 2026 00:00:00").getTime();

function updateCountdown() {

    const now = new Date().getTime();

    let difference = celebrationDate - now;

    if (difference < 0) {

        difference = 0;

    }

    const days =
        Math.floor(difference / (1000 * 60 * 60 * 24));

    const hours =
        Math.floor(
            (difference % (1000 * 60 * 60 * 24))
            / (1000 * 60 * 60)
        );

    const minutes =
        Math.floor(
            (difference % (1000 * 60 * 60))
            / (1000 * 60)
        );

    const seconds =
        Math.floor(
            (difference % (1000 * 60))
            / 1000
        );

    document.getElementById("days").textContent =
        String(days).padStart(2, "0");

    document.getElementById("hours").textContent =
        String(hours).padStart(2, "0");

    document.getElementById("minutes").textContent =
        String(minutes).padStart(2, "0");

    document.getElementById("seconds").textContent =
        String(seconds).padStart(2, "0");

}

updateCountdown();

setInterval(updateCountdown, 1000);


/* ---------- SURPRISE ---------- */

const surpriseBtn =
    document.getElementById("surpriseBtn");

const heroSurprise =
    document.getElementById("heroSurprise");

const surpriseModal =
    document.getElementById("surpriseModal");

const closeModal =
    document.getElementById("closeModal");


function openSurprise() {

    surpriseModal.classList.add("show");

    createConfetti(130);

    playMusic();

}

surpriseBtn.addEventListener("click", openSurprise);

heroSurprise.addEventListener("click", openSurprise);


closeModal.addEventListener("click", () => {

    surpriseModal.classList.remove("show");

});


surpriseModal.addEventListener("click", (event) => {

    if (event.target === surpriseModal) {

        surpriseModal.classList.remove("show");

    }

});


/* ---------- CONFETTI ---------- */

function createConfetti(amount = 80) {

    for (let i = 0; i < amount; i++) {

        const piece =
            document.createElement("div");

        piece.className = "confetti";

        piece.style.left =
            Math.random() * 100 + "vw";

        piece.style.animationDelay =
            Math.random() * 1.5 + "s";

        piece.style.transform =
            `rotate(${Math.random() * 360}deg)`;

        piece.style.opacity =
            Math.random() * .8 + .2;

        piece.style.width =
            Math.random() * 8 + 5 + "px";

        piece.style.height =
            Math.random() * 12 + 7 + "px";

        document.body.appendChild(piece);

        setTimeout(() => {

            piece.remove();

        }, 5000);

    }

}


/* ---------- APPRECIATION WALL ---------- */

const addMessage =
    document.getElementById("addMessage");

const studentName =
    document.getElementById("studentName");

const studentMessage =
    document.getElementById("studentMessage");

const messageWall =
    document.getElementById("messageWall");


addMessage.addEventListener("click", () => {

    const name =
        studentName.value.trim();

    const message =
        studentMessage.value.trim();

    if (!name || !message) {

        alert("Please enter your name and message ❤️");

        return;

    }

    const note =
        document.createElement("div");

    note.className = "wall-note";

    note.innerHTML = `
        <div>💌</div>
        <p>“${escapeHTML(message)}”</p>
        <span>— ${escapeHTML(name)}</span>
    `;

    messageWall.prepend(note);

    studentName.value = "";
    studentMessage.value = "";

    createConfetti(40);

});


function escapeHTML(text) {

    const div =
        document.createElement("div");

    div.textContent = text;

    return div.innerHTML;

}


/* ---------- FINAL CELEBRATION ---------- */

const celebrateBtn =
    document.getElementById("celebrateBtn");

celebrateBtn.addEventListener("click", () => {

    createConfetti(250);

    playMusic();

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

});


/* ---------- PARTICLES ---------- */

const canvas =
    document.getElementById("particles");

const ctx =
    canvas.getContext("2d");

let particles = [];

function resizeCanvas() {

    canvas.width =
        window.innerWidth;

    canvas.height =
        window.innerHeight;

}

window.addEventListener(
    "resize",
    resizeCanvas
);

resizeCanvas();


function createParticle() {

    return {

        x: Math.random() * canvas.width,

        y: Math.random() * canvas.height,

        size: Math.random() * 1.8 + .5,

        speed:
            Math.random() * .35 + .08,

        opacity:
            Math.random() * .6 + .1

    };

}


for (let i = 0; i < 110; i++) {

    particles.push(
        createParticle()
    );

}


function drawParticles() {

    ctx.clearRect(
        0,
        0,
        canvas.width,
        canvas.height
    );

    particles.forEach(p => {

        ctx.beginPath();

        ctx.arc(
            p.x,
            p.y,
            p.size,
            0,
            Math.PI * 2
        );

        ctx.fillStyle =
            `rgba(232,201,130,${p.opacity})`;

        ctx.fill();

        p.y -= p.speed;

        if (p.y < -10) {

            p.y =
                canvas.height + 10;

            p.x =
                Math.random() * canvas.width;

        }

    });

    requestAnimationFrame(
        drawParticles
    );

}

function startParticles() {

    drawParticles();

}


/* ---------- MOUSE GLOW ---------- */

let mouseX = 0;
let mouseY = 0;

window.addEventListener(
    "mousemove",
    event => {

        mouseX = event.clientX;
        mouseY = event.clientY;

        document.documentElement.style.setProperty(
            "--mouse-x",
            mouseX + "px"
        );

        document.documentElement.style.setProperty(
            "--mouse-y",
            mouseY + "px"
        );

    }
);


/* ---------- EASTER EGG ---------- */

let clickCount = 0;

document.querySelector(".logo")
    .addEventListener("click", () => {

        clickCount++;

        if (clickCount === 5) {

            createConfetti(180);

            alert(
                "🌟 Teachers make the world brighter. Happy Teachers' Day! ❤️"
            );

            clickCount = 0;

        }

    });
