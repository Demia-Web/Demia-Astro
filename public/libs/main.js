import gsap from "gsap";

import Lenis from "lenis";

import SplitType from "split-type";

gsap.registerPlugin(ScrollTrigger);

// Lenis

const lenis = new Lenis({
  autoRaf: true,
  duration: 1.2,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t))
});

function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}
requestAnimationFrame(raf);

lenis.on("scroll", (e) => {
  // console.log(e);
});

var isLenisRunning = true;

export function toggleLenis() {
  if (lenis) {
    if (isLenisRunning) {
      lenis.stop();
      isLenisRunning = false;
      console.log("Lenis stopped");
    } else {
      lenis.start();
      isLenisRunning = true;
      console.log("Lenis started");
    }
  } else {
  }
}

export function stopLenis() {
  lenis.stop();
}

export function startLenis() {
  lenis.start();
}

document.addEventListener("astro:page-load", () => {
  lenis.start();
});

// Header

document.addEventListener("astro:page-load", () => {
  var icons = document.getElementsByClassName("click-menu");
  var icon1 = document.getElementById("a");
  var icon2 = document.getElementById("b");
  var nav = document.getElementById("nav");
  var textMenu = document.getElementById("textmenu");
  var boxheader = document.getElementById("box-header");
  var header = document.getElementById("header");
  var logo = document.getElementById("logo");
  var body = document.body;
  var html = document.documentElement;

  Array.prototype.forEach.call(icons, function (icon) {
    icon.addEventListener("click", function () {
      // Toggle delle classi del menu
      icon1.classList.toggle("a");
      icon2.classList.toggle("b");
      nav.classList.toggle("hidden");
      toggleLenis();
      if (textMenu.textContent === "menu") {
        textMenu.textContent = "chiudi";
      } else {
        textMenu.textContent = "menu";
      }

      logo.classList.toggle("opacity-0");
      boxheader.classList.toggle("backdrop-blur-lg");
      boxheader.classList.toggle("mix-blend-difference");

      setTimeout(function () {
        header.classList.toggle("bg-[#ffffff40]");
      }, 100);
    });
  });
});

// Accordion
document.querySelectorAll(".accordion").forEach((item) => {
  item.addEventListener("click", function (e) {
    e.preventDefault();

    const content = this.nextElementSibling;
    const isOpen = content.classList.contains("open");
    const icon = this.querySelector("img");

    if (isOpen) {
      // Chiude l'accordion
      content.classList.remove("open");
      content.classList.remove("show");
      icon.src = "img/assets/icon-plus.svg";
      resetItems(content.querySelectorAll("li"));
    } else {
      content.classList.add("open");
      setTimeout(() => {
        animateItems(content.querySelectorAll("li"));
      }, 200);
      icon.src = "img/assets/icon-minus.svg";
    }
  });
});

//Animate accordion menu
function animateItems(items) {
  items.forEach((item, index) => {
    setTimeout(() => {
      item.style.opacity = "1";
      item.style.transform = "translateY(0)";
    }, index * 200);
  });
}

//Reset accordion menu
function resetItems(items) {
  items.forEach((item) => {
    item.style.opacity = "0";
    item.style.transform = "translateY(20px)";
  });
}

// Footer
const marqueeInner = document.querySelector(".marquee-inner");

marqueeInner.innerHTML += marqueeInner.innerHTML;

gsap.to(".marquee-inner", {
  xPercent: -50,
  ease: "none",
  repeat: -1,
  duration: 20
});

document.addEventListener("astro:page-load", () => {
  const overlay = document.getElementById("overlayportfolio");

  if (overlay) {
    setTimeout(() => overlay.classList.add("fade-out"), 100);
  }

  const links = document.querySelectorAll(".portfolio-link");
  links.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      if (overlay) {
        overlay.classList.remove("fade-out");
      }

      setTimeout(() => {
        window.location.href = link.href;
      }, 500);
    });
  });
});

document.addEventListener("astro:page-load", () => {
  const cursor = document.querySelector(".custom-cursor-general");

  // Funzione per aggiornare la posizione del cursore
  const updateCursor = (e) => {
    gsap.to(cursor, {
      x: e.clientX,
      y: e.clientY,
      duration: 0.1,
      ease: "power2.out"
    });
  };

  // Event listener per il movimento del mouse
  document.addEventListener("mousemove", updateCursor);

  // Event listeners per l'ingrandimento del cursore sui link
  const hoverTargets = document.querySelectorAll(".hover-target");
  hoverTargets.forEach((target) => {
    target.addEventListener("mouseenter", () => {
      gsap.to(cursor, { scale: 5, duration: 0.2 });
    });
    target.addEventListener("mouseleave", () => {
      gsap.to(cursor, { scale: 1, duration: 0.2 });
    });
  });
});
