// ─── Burger menu ───────────────────────────────────────────────
const burger = document.querySelector('.burger');
const menu = document.querySelector('.linksmom');

burger.addEventListener('click', () => {
    menu.classList.toggle('open');
});

// Закрытие меню при клике вне него
document.addEventListener('click', (e) => {
    if (!menu.contains(e.target) && !burger.contains(e.target)) {
        menu.classList.remove('open');
    }
});

// Закрытие меню при клике на пункт
menu.querySelectorAll('.links, .links1').forEach(link => {
    link.addEventListener('click', () => {
        menu.classList.remove('open');
    });
});


// ─── Плавный переход по ссылке .hd ─────────────────────────────
const hdLink = document.querySelector('.hd');
if (hdLink) {
    hdLink.addEventListener('click', function () {
        this.style.opacity = '0';
        setTimeout(() => {
            window.location.href = 'index.html';
        }, 300);
    });
}


// ─── Слайдер проектов ───────────────────────────────────────────
const projects = [
    {
        image: "./img/project1.jpg",
        title: "Проект 1",
        size: "120 м²",
    },
    {
        image: "./img/project2.jpg",
        title: "Проект 2",
        size: "85 м²",
    },
    {
        image: "./img/project3.jpg",
        title: "Проект 3",
        size: "200 м²",
    }
];

let currentIndex = 0;

const sliderImage = document.getElementById("slider-image");
const projectTitle = document.getElementById("project-title");
const projectSize = document.getElementById("project-size");

function updateSlide() {
    sliderImage.style.opacity = "0";
    setTimeout(() => {
        sliderImage.src = projects[currentIndex].image;
        if (projectTitle) projectTitle.textContent = projects[currentIndex].title;
        if (projectSize)  projectSize.textContent  = projects[currentIndex].size;
        sliderImage.style.opacity = "1";
    }, 250);
}

document.querySelector(".next").addEventListener("click", () => {
    currentIndex = (currentIndex + 1) % projects.length;
    updateSlide();
});

document.querySelector(".prev").addEventListener("click", () => {
    currentIndex = (currentIndex - 1 + projects.length) % projects.length;
    updateSlide();
});


// ─── Свайп на телефоне ──────────────────────────────────────────
let touchStartX = 0;

sliderImage.addEventListener("touchstart", (e) => {
    touchStartX = e.changedTouches[0].clientX;
}, { passive: true });

sliderImage.addEventListener("touchend", (e) => {
    const diff = touchStartX - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 40) {
        currentIndex = diff > 0
            ? (currentIndex + 1) % projects.length
            : (currentIndex - 1 + projects.length) % projects.length;
        updateSlide();
    }
});

let lastScroll = 0;
const header = document.querySelector('header');

window.addEventListener('scroll', () => {
    const current = window.scrollY;
    if (current > lastScroll && current > 80) {
        header.style.transform = 'translateY(-100%)';
    } else {
        header.style.transform = 'translateY(0)';
    }
    lastScroll = current;
});

const observer = new IntersectionObserver((entries) => {
    entries.forEach(el => {
        if (el.isIntersecting) {
            el.target.classList.add('visible');
        } else {
            el.target.classList.remove('visible');
        }
    });
}, { threshold: 0.15 });

document.querySelectorAll(
    '.feature-item, .service-card, .fake-footer, .project-card, .form-section, .footer-container'
).forEach(el => observer.observe(el));

const rev =
document.querySelector(".rev");

let position = 0;
let speed = 1.2;

let isPaused = false;

function animateReviews() {

    if (!isPaused) {

        position -= speed;

        const halfWidth =
            rev.scrollWidth / 2;

        if (
            Math.abs(position)
            >= halfWidth
        ) {
            position = 0;
        }

        rev.style.transform =
            `translateX(${position}px)`;
    }

    requestAnimationFrame(
        animateReviews
    );
}

animateReviews();

rev.addEventListener(
    "mouseenter",
    () => {
        isPaused = true;
    }
);

rev.addEventListener(
    "mouseleave",
    () => {
        isPaused = false;
    }
);