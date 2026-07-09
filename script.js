/* =====================================================
   DOM ELEMENTS
===================================================== */

const loadingScreen = document.getElementById("loading-screen");
const openButton = document.getElementById("open-letter");
const envelope = document.getElementById("envelope");
const music = document.getElementById("ifasya_rasa_ini");

const typingText = document.getElementById("typingText");

const daysEl = document.getElementById("days");
const hoursEl = document.getElementById("hours");
const minutesEl = document.getElementById("minutes");
const secondsEl = document.getElementById("seconds");

/* =====================================================
   LOADING SCREEN
===================================================== */

window.addEventListener("load", () => {

    setTimeout(() => {

        loadingScreen.style.opacity = "0";
        loadingScreen.style.visibility = "hidden";

    }, 2500);

});

/* =====================================================
   MUSIC
===================================================== */

function startMusic(){

    if(!music) return;

    music.volume = 0;

    music.play().catch(()=>{});

    let volume = 0;

    const fade = setInterval(()=>{

        volume += 0.05;

        if(volume >= 1){

            volume = 1;
            clearInterval(fade);

        }

        music.volume = volume;

    },200);

}

/* =====================================================
   OPEN LETTER
===================================================== */

if(openButton){

    openButton.addEventListener("click",()=>{

        startMusic();

        if(envelope){

            envelope.classList.add("open");

        }

        setTimeout(()=>{

            document
            .getElementById("letter-section")
            ?.scrollIntoView({

                behavior:"smooth"

            });

        },1000);

    });

}

/* =====================================================
   TYPING EFFECT
===================================================== */

const message = `

Happy Birthday Intan ❤️

Selamat ulang tahun.

Semoga setiap langkahmu selalu dipenuhi
kebahagiaan, kesehatan, dan keberanian
untuk mengejar semua impianmu.

Terima kasih 
karena pernah menjadi bagian
dari perjalanan hidupku.

Semoga hari ini menjadi awal dari
banyak cerita indah yang menunggumu.

Teruslah tersenyum,
karena senyummu selalu mampu
membuat dunia terasa lebih hangat.

- Iqbal

`;

let index = 0;

function typeWriter(){

    if(!typingText) return;

    if(index < message.length){

        typingText.textContent += message.charAt(index);

        index++;

        setTimeout(typeWriter,40);

    }

}

setTimeout(typeWriter,3500);

/* =====================================================
   COUNTDOWN
===================================================== */

const birthday = new Date("August 22, 2026 00:00:00");

function updateCountdown(){

    const now = new Date();

    const distance = birthday - now;

    if(distance <= 0){

        daysEl.textContent = "00";
        hoursEl.textContent = "00";
        minutesEl.textContent = "00";
        secondsEl.textContent = "00";

        return;
    }

    const days = Math.floor(distance / (1000*60*60*24));

    const hours = Math.floor(
        (distance % (1000*60*60*24))
        /(1000*60*60)
    );

    const minutes = Math.floor(
        (distance % (1000*60*60))
        /(1000*60)
    );

    const seconds = Math.floor(
        (distance % (1000*60))
        /1000
    );

    daysEl.textContent = String(days).padStart(2,"0");
    hoursEl.textContent = String(hours).padStart(2,"0");
    minutesEl.textContent = String(minutes).padStart(2,"0");
    secondsEl.textContent = String(seconds).padStart(2,"0");

}

updateCountdown();

setInterval(updateCountdown,1000);

/* =====================================================
   GALLERY SLIDESHOW
===================================================== */

const slides = document.querySelectorAll(".gallery__item");
const dots = document.querySelectorAll(".gallery__dots .dot");

let currentSlide = 0;

function showSlide(index){

    slides.forEach((slide,i)=>{

        slide.classList.toggle("active", i===index);

    });

    dots.forEach((dot,i)=>{

        dot.classList.toggle("active", i===index);

    });

}

function nextSlide(){

    currentSlide++;

    if(currentSlide>=slides.length){

        currentSlide=0;

    }

    showSlide(currentSlide);

}

if(slides.length){

    showSlide(0);

    setInterval(nextSlide,5000);

}

dots.forEach((dot,index)=>{

    dot.addEventListener("click",()=>{

        currentSlide=index;

        showSlide(currentSlide);

    });

});

/* =====================================================
   SAKURA
===================================================== */

const sakuraContainer =
document.getElementById("sakura-container");

function createSakura(){

    if(!sakuraContainer) return;

    const petal=document.createElement("div");

    petal.className="sakura";

    petal.innerHTML="🌸";

    petal.style.left=Math.random()*100+"vw";

    petal.style.fontSize=
    (14+Math.random()*18)+"px";

    petal.style.animationDuration=
    (8+Math.random()*8)+"s";

    petal.style.opacity=
    .5+Math.random()*.5;

    sakuraContainer.appendChild(petal);

    setTimeout(()=>{

        petal.remove();

    },17000);

}

setInterval(createSakura,500);

/* =====================================================
   STAR CANVAS
===================================================== */

const starCanvas=document.getElementById("stars");
const starCtx=starCanvas.getContext("2d");

let stars=[];

function resizeStars(){

    starCanvas.width=window.innerWidth;
    starCanvas.height=window.innerHeight;

}

window.addEventListener("resize",resizeStars);

resizeStars();

for(let i=0;i<180;i++){

    stars.push({

        x:Math.random()*starCanvas.width,

        y:Math.random()*starCanvas.height,

        r:Math.random()*2,

        a:Math.random(),

        s:.003+Math.random()*.01

    });

}

function drawStars(){

    starCtx.clearRect(
        0,
        0,
        starCanvas.width,
        starCanvas.height
    );

    stars.forEach(star=>{

        star.a+=star.s;

        const alpha=
        .5+Math.sin(star.a)*.5;

        starCtx.beginPath();

        starCtx.fillStyle=
        `rgba(255,255,255,${alpha})`;

        starCtx.arc(

            star.x,
            star.y,
            star.r,
            0,
            Math.PI*2

        );

        starCtx.fill();

    });

}

/* =====================================================
   SHOOTING STAR
===================================================== */

let shootingStars=[];

function createShootingStar(){

    shootingStars.push({

        x:Math.random()*starCanvas.width,

        y:Math.random()*250,

        vx:10+Math.random()*4,

        vy:4+Math.random()*2,

        life:80

    });

}

setInterval(createShootingStar,4000);

function drawShootingStars(){

    shootingStars.forEach((s,index)=>{

        starCtx.beginPath();

        starCtx.strokeStyle="white";

        starCtx.lineWidth=2;

        starCtx.moveTo(s.x,s.y);

        starCtx.lineTo(

            s.x-60,

            s.y-25

        );

        starCtx.stroke();

        s.x+=s.vx;
        s.y+=s.vy;
        s.life--;

        if(s.life<=0){

            shootingStars.splice(index,1);

        }

    });

}

/* =====================================================
   STAR LOOP
===================================================== */

function starLoop(){

    drawStars();

    drawShootingStars();

    requestAnimationFrame(starLoop);

}

starLoop();

/* =====================================================
   FIREWORKS
===================================================== */

const fireworkCanvas = document.getElementById("fireworkCanvas");
const fireCtx = fireworkCanvas.getContext("2d");

function resizeFireworks() {
    fireworkCanvas.width = window.innerWidth;
    fireworkCanvas.height = window.innerHeight;
}

window.addEventListener("resize", resizeFireworks);
resizeFireworks();

let fireworks = [];
let particles = [];

class Firework {

    constructor() {

        this.x = Math.random() * fireworkCanvas.width;
        this.y = fireworkCanvas.height;

        this.targetY =
            100 + Math.random() * (fireworkCanvas.height / 2);

        this.speed = 6 + Math.random() * 2;

        this.color = `hsl(${Math.random()*360},100%,70%)`;

    }

    update() {

        this.y -= this.speed;

        if (this.y <= this.targetY) {

            explode(this.x, this.y, this.color);

            return true;

        }

        return false;

    }

    draw() {

        fireCtx.beginPath();
        fireCtx.arc(this.x, this.y, 3, 0, Math.PI * 2);
        fireCtx.fillStyle = this.color;
        fireCtx.fill();

    }

}

class Particle {

    constructor(x, y, color) {

        this.x = x;
        this.y = y;

        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 6 + 2;

        this.vx = Math.cos(angle) * speed;
        this.vy = Math.sin(angle) * speed;

        this.life = 80;

        this.color = color;

    }

    update() {

        this.x += this.vx;
        this.y += this.vy;

        this.vy += 0.05;

        this.life--;

    }

    draw() {

        fireCtx.globalAlpha = this.life / 80;

        fireCtx.beginPath();

        fireCtx.arc(this.x, this.y, 2, 0, Math.PI * 2);

        fireCtx.fillStyle = this.color;

        fireCtx.fill();

        fireCtx.globalAlpha = 1;

    }

}

function explode(x, y, color) {

    for (let i = 0; i < 80; i++) {

        particles.push(new Particle(x, y, color));

    }

}

setInterval(() => {

    fireworks.push(new Firework());

}, 900);

function fireworkLoop() {

    fireCtx.clearRect(
        0,
        0,
        fireworkCanvas.width,
        fireworkCanvas.height
    );

    fireworks = fireworks.filter(f => {

        f.draw();

        return !f.update();

    });

    particles = particles.filter(p => {

        p.update();

        p.draw();

        return p.life > 0;

    });

    requestAnimationFrame(fireworkLoop);

}

fireworkLoop();

/* =====================================================
   FLOATING HEARTS
===================================================== */

const floatingContainer =
document.getElementById("floatingHeartContainer");

function createHeart() {

    if (!floatingContainer) return;

    const heart = document.createElement("div");

    heart.className = "floating-heart";

    heart.innerHTML = "❤";

    heart.style.left = Math.random() * 100 + "vw";

    heart.style.fontSize =
        (12 + Math.random() * 22) + "px";

    heart.style.animationDuration =
        (5 + Math.random() * 5) + "s";

    floatingContainer.appendChild(heart);

    setTimeout(() => {

        heart.remove();

    }, 10000);

}

setInterval(createHeart, 350);

/* =====================================================
   SCROLL FADE
===================================================== */

const fadeItems =
document.querySelectorAll(".fade-in");

function revealFade() {

    const trigger = window.innerHeight * 0.9;

    fadeItems.forEach(item => {

        const top =
            item.getBoundingClientRect().top;

        if (top < trigger) {

            item.classList.add("show");

        }

    });

}

window.addEventListener("scroll", revealFade);

revealFade();

/* =====================================================
   SHOW HEART SECTION
===================================================== */

const heartButton =
document.getElementById("showHearts");

if (heartButton) {

    heartButton.addEventListener("click", () => {

        document
            .getElementById("heartSection")
            ?.scrollIntoView({

                behavior: "smooth"

            });

    });

}
/* =====================================================
   HEART FORMATION
===================================================== */

const heartCanvas = document.getElementById("heartFormationCanvas");
const heartCtx = heartCanvas.getContext("2d");

function resizeHeartCanvas() {
    heartCanvas.width = window.innerWidth;
    heartCanvas.height = window.innerHeight;
}

window.addEventListener("resize", resizeHeartCanvas);
resizeHeartCanvas();

let heartParticles = [];
let heartTargets = [];

function createHeartText() {

    heartCtx.clearRect(0, 0, heartCanvas.width, heartCanvas.height);

    heartCtx.fillStyle = "#fff";
    heartCtx.textAlign = "center";

    heartCtx.font = "bold 70px Poppins";
    heartCtx.fillText(
        "Happy Birthday",
        heartCanvas.width / 2,
        heartCanvas.height / 2 - 20
    );

    heartCtx.font = "bold 60px Great Vibes";
    heartCtx.fillText(
        "Intan ❤️",
        heartCanvas.width / 2,
        heartCanvas.height / 2 + 60
    );

    const img = heartCtx.getImageData(
        0,
        0,
        heartCanvas.width,
        heartCanvas.height
    );

    heartTargets = [];

    for (let y = 0; y < img.height; y += 6) {

        for (let x = 0; x < img.width; x += 6) {

            const index = (y * img.width + x) * 4;

            if (img.data[index + 3] > 150) {

                heartTargets.push({
                    x,
                    y
                });

            }

        }

    }

    heartCtx.clearRect(
        0,
        0,
        heartCanvas.width,
        heartCanvas.height
    );

}

class HeartParticle {

    constructor(target) {

        this.x = Math.random() * heartCanvas.width;
        this.y = heartCanvas.height + Math.random() * 200;

        this.tx = target.x;
        this.ty = target.y;

        this.size = 2 + Math.random() * 2;

    }

    update() {

        this.x += (this.tx - this.x) * 0.05;
        this.y += (this.ty - this.y) * 0.05;

    }

    draw() {

        heartCtx.beginPath();

        heartCtx.fillStyle = "#ff7eb3";

        heartCtx.arc(
            this.x,
            this.y,
            this.size,
            0,
            Math.PI * 2
        );

        heartCtx.fill();

    }

}

function initHeartFormation() {

    createHeartText();

    heartParticles = [];

    heartTargets.forEach(target => {

        heartParticles.push(
            new HeartParticle(target)
        );

    });

}

function animateHeartFormation() {

    heartCtx.clearRect(
        0,
        0,
        heartCanvas.width,
        heartCanvas.height
    );

    heartParticles.forEach(p => {

        p.update();
        p.draw();

    });

    requestAnimationFrame(
        animateHeartFormation
    );

}

/* =====================================================
   MUSIC BUTTON
===================================================== */

const musicButton =
document.getElementById("musicButton");

if (musicButton && music) {

    musicButton.addEventListener("click", () => {

        if (music.paused) {

            music.play();
            musicButton.textContent = "🔊";

        } else {

            music.pause();
            musicButton.textContent = "🎵";

        }

    });

}

/* =====================================================
   AUTO START HEART
===================================================== */

setTimeout(() => {

    initHeartFormation();

    animateHeartFormation();

}, 3000);

/* =====================================================
   FINAL ANIMATION
===================================================== */

window.addEventListener("load", () => {

    revealFade?.();

});

/* =====================================================
   SMOOTH SECTION TRANSITION
===================================================== */

document.querySelectorAll("button").forEach(btn => {

    btn.addEventListener("click", () => {

        document.body.classList.add("glow");

        setTimeout(() => {

            document.body.classList.remove("glow");

        }, 600);

    });

});

/* =====================================================
   END
===================================================== */

console.log(
    "%c🎉 Happy Birthday Intan ❤️",
    "font-size:22px;color:#ff7eb3;font-weight:bold;"
);
