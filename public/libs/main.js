import gsap from "gsap";

import Lenis from "lenis";

gsap.registerPlugin();

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

function toggleLenis() {
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

      // Blocca o sblocca lo scroll del sito
      if (body.classList.contains("no-scroll")) {
        html.classList.remove("no-scroll");
        body.classList.remove("no-scroll");
        body.style.marginRight = "";
      } else {
        var scrollbarWidth = getScrollbarWidth();
        html.classList.add("no-scroll");
        body.classList.add("no-scroll");
        body.style.marginRight = scrollbarWidth + "px";
      }
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
