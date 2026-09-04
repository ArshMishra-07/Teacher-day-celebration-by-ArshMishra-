/* =========================================
   TEACHERS' DAY WEBSITE
   FINAL WORKING JAVASCRIPT
========================================= */


/* ================================
   INTRO SCREEN
================================ */

const introScreen = document.getElementById("introScreen");
const mainContent = document.getElementById("mainContent");
const enterBtn = document.getElementById("enterBtn");

if (enterBtn) {

    enterBtn.addEventListener("click", function () {

        if (introScreen) {
            introScreen.classList.add("hide");
        }

        setTimeout(function () {

            if (introScreen) {
                introScreen.style.display = "none";
            }

            if (mainContent) {
                mainContent.classList.remove("hidden");
            }

            startParticles();

        }, 900);

    });

}


/* ================================
   MUSIC MENU
================================ */

const musicBtn =
    document.getElementById("musicBtn");

const musicMenu =
    document.getElementById("musicMenu");

const openSong =
    document.getElementById("openSong");

const songLink =
    document.getElementById("songLink");


/* Open / close music menu */

if (musicBtn && musicMenu) {

    musicBtn.addEventListener("click", function (event) {

        event.stopPropagation();

        musicMenu.classList.toggle("show");

    });

}


/* Open selected song */

if (openSong && songLink) {

    openSong.addEventListener("click", function () {

        const link = songLink.value.trim();

        if (link === "") {

            alert(
                "🎵 Please paste your Spotify or YouTube song link."
            );

            return;

        }


        if (
            !link.startsWith("https://") &&
            !link.startsWith("http://")
        ) {

            alert(
                "❌ Please enter a valid song link."
            );

            return;

        }


        window.open(
            link,
            "_blank",
            "noopener,noreferrer"
        );

    });

}


/* Close music menu when clicking outside */

document.addEventListener("click", function (event) {

    if (
        musicMenu &&
        musicBtn &&
        !musicMenu.contains(event.target) &&
        !musicBtn.contains(event.target)
    ) {

        musicMenu.classList.remove("show");

    }

});


/* ================================
   COUNTDOWN
================================ */

const celebrationDate =
    new Date("September 5, 2026 00:00:00").getTime();


function updateCountdown() {

    const now =
        new Date().getTime();

    let difference =
        celebrationDate - now;


    if (difference < 0) {
        difference = 0;
    }


    const days =
        Math.floor(
            difference /
            (1000 * 60 * 60 * 24)
        );


    const hours =
        Math.floor(
            (difference %
                (1000 * 60 * 60 * 24)) /
            (1000 * 60 * 60)
        );


    const minutes =
        Math.floor(
            (difference %
                (1000 * 60 * 60)) /
            (1000 * 60)
        );


    const seconds =
        Math.floor(
            (difference %
                (1000 * 60)) /
            1000
        );


    const daysElement =
        document.getElementById("days");

    const hoursElement =
        document.getElementById("hours");

    const minutesElement =
        document.getElementById("minutes");

    const secondsElement =
        document.getElementById("seconds");


    if (daysElement) {

        daysElement.textContent =
            String(days).padStart(2, "0");

    }


    if (hoursElement) {

        hoursElement.textContent =
            String(hours).padStart(2, "0");

    }


    if (minutesElement) {

        minutesElement.textContent =
            String(minutes).padStart(2, "0");

    }


    if (secondsElement) {

        secondsElement.textContent =
            String(seconds).padStart(2, "0");

    }

}


updateCountdown();

setInterval(
    updateCountdown,
    1000
);


/* ================================
   SURPRISE MODAL
================================ */

const surpriseBtn =
    document.getElementById("surpriseBtn");

const heroSurprise =
    document.getElementById("heroSurprise");

const surpriseModal =
    document.getElementById("surpriseModal");

const closeModal =
    document.getElementById("closeModal");


function openSurprise() {

    if (surpriseModal) {

        surpriseModal.classList.add("show");

    }

    createConfetti(130);

}


/* Main surprise button */

if (surpriseBtn) {

    surpriseBtn.addEventListener(
        "click",
        openSurprise
    );

}


/* Hero surprise button */

if (heroSurprise) {

    heroSurprise.addEventListener(
        "click",
        openSurprise
    );

}


/* Close button */

if (closeModal) {

    closeModal.addEventListener(
        "click",
        function () {

            if (surpriseModal) {

                surpriseModal.classList.remove("show");

            }

        }
    );

}


/* Click outside modal */

if (surpriseModal) {

    surpriseModal.addEventListener(
        "click",
        function (event) {

            if (
                event.target ===
                surpriseModal
            ) {

                surpriseModal.classList.remove(
                    "show"
                );

            }

        }
    );

}


/* ================================
   CONFETTI
================================ */

function createConfetti(amount) {

    amount = amount || 80;


    for (
        let i = 0;
        i < amount;
        i++
    ) {

        const piece =
            document.createElement("div");


        piece.className =
            "confetti";


        piece.style.left =
            Math.random() * 100 + "vw";


        piece.style.animationDelay =
            Math.random() * 1.5 + "s";


        piece.style.transform =
            "rotate(" +
            Math.random() * 360 +
            "deg)";


        piece.style.opacity =
            Math.random() * .8 + .2;


        piece.style.width =
            Math.random() * 8 + 5 + "px";


        piece.style.height =
            Math.random() * 12 + 7 + "px";


        document.body.appendChild(piece);


        setTimeout(
            function () {

                piece.remove();

            },
            5000
        );

    }

}


/* ================================
   APPRECIATION WALL
================================ */

const addMessage =
    document.getElementById("addMessage");

const studentName =
    document.getElementById("studentName");

const studentMessage =
    document.getElementById("studentMessage");

const messageWall =
    document.getElementById("messageWall");


if (
    addMessage &&
    studentName &&
    studentMessage &&
    messageWall
) {

    addMessage.addEventListener(
        "click",
        function () {

            const name =
                studentName.value.trim();

            const message =
                studentMessage.value.trim();


            if (
                name === "" ||
                message === ""
            ) {

                alert(
                    "❤️ Please enter your name and message."
                );

                return;

            }


            const note =
                document.createElement("div");


            note.className =
                "wall-note";


            note.innerHTML = `
                <div>💌</div>

                <p>
                    “${escapeHTML(message)}”
                </p>

                <span>
                    — ${escapeHTML(name)}
                </span>
            `;


            messageWall.prepend(note);


            studentName.value = "";

            studentMessage.value = "";


            createConfetti(40);

        }
    );

}


/* Protect the appreciation wall */

function escapeHTML(text) {

    const div =
        document.createElement("div");

    div.textContent =
        text;

    return div.innerHTML;

}


/* ================================
   FINAL CELEBRATION
================================ */

const celebrateBtn =
    document.getElementById("celebrateBtn");


if (celebrateBtn) {

    celebrateBtn.addEventListener(
        "click",
        function () {

            createConfetti(250);

            setTimeout(
                function () {

                    alert(
                        "🎓❤️ HAPPY TEACHERS' DAY! ❤️🎓\n\nThank you to every teacher who makes a difference!"
                    );

                },
                500
            );

        }
    );

}


/* ================================
   PARTICLE BACKGROUND
================================ */

const canvas =
    document.getElementById("particles");

let ctx = null;

let particles = [];


if (canvas) {

    ctx =
        canvas.getContext("2d");

}


function resizeCanvas() {

    if (!canvas) {
        return;
    }


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

        x:
            Math.random() *
            canvas.width,

        y:
            Math.random() *
            canvas.height,

        size:
            Math.random() * 1.8 + .5,

        speed:
            Math.random() * .35 + .08,

        opacity:
            Math.random() * .6 + .1

    };

}


/* Create particles */

for (
    let i = 0;
    i < 110;
    i++
) {

    particles.push(
        createParticle()
    );

}


/* Draw particles */

function drawParticles() {

    if (!canvas || !ctx) {
        return;
    }


    ctx.clearRect(
        0,
        0,
        canvas.width,
        canvas.height
    );


    particles.forEach(
        function (p) {

            ctx.beginPath();


            ctx.arc(
                p.x,
                p.y,
                p.size,
                0,
                Math.PI * 2
            );


            ctx.fillStyle =
                "rgba(232,201,130," +
                p.opacity +
                ")";


            ctx.fill();


            p.y -= p.speed;


            if (p.y < -10) {

                p.y =
                    canvas.height + 10;

                p.x =
                    Math.random() *
                    canvas.width;

            }

        }
    );


    requestAnimationFrame(
        drawParticles
    );

}


/* Start particles */

function startParticles() {

    if (
        canvas &&
        ctx
    ) {

        drawParticles();

    }

}


/* ================================
   MOUSE GLOW
================================ */

window.addEventListener(
    "mousemove",
    function (event) {

        document.documentElement.style.setProperty(
            "--mouse-x",
            event.clientX + "px"
        );


        document.documentElement.style.setProperty(
            "--mouse-y",
            event.clientY + "px"
        );

    }
);


/* ================================
   LOGO EASTER EGG
================================ */

const logo =
    document.querySelector(".logo");

let clickCount = 0;


if (logo) {

    logo.addEventListener(
        "click",
        function () {

            clickCount++;


            if (clickCount >= 5) {

                createConfetti(180);


                alert(
                    "🌟 Teachers make the world brighter! 🌟\n\nHappy Teachers' Day ❤️"
                );


                clickCount = 0;

            }

        }
    );

}


/* ================================
   ESCAPE KEY
================================ */

document.addEventListener(
    "keydown",
    function (event) {

        if (
            event.key === "Escape" &&
            surpriseModal
        ) {

            surpriseModal.classList.remove(
                "show"
            );

        }

    }
);


/* ================================
   PAGE READY
================================ */

console.log(
    "🎓 Teachers' Day website loaded successfully!"
);
