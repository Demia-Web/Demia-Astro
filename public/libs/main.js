import gsap from "gsap";

import Lenis from "lenis";

document.addEventListener("astro:page-load", () => {
  const accordions = document.querySelectorAll(".accordion-item");

  const triggerOffset = -200; // Offset del trigger point di 200 px sopra l'accordion generale
  const animationDuration = 0.5; // Durata dell'animazione in secondi

  // Imposta l'osservatore di intersezione per animare gli accordion all'entrata nel viewport
  const observerOptions = {
    root: null,
    rootMargin: `${triggerOffset}px 0px 0px 0px`,
    threshold: 0
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const accordion = entry.target;
        const index = Array.from(accordions).indexOf(accordion);
        gsap.to(accordion, {
          opacity: 1,
          y: 0,
          duration: animationDuration,
          ease: "power4.out",
          delay: index * 0.1 // Ritardo a cascata
        });
        observer.unobserve(accordion); // Interrompi l'osservazione dopo l'animazione iniziale
      }
    });
  }, observerOptions);

  // Imposta gli accordion per essere inizialmente invisibili e fuori posizione
  accordions.forEach((accordion) => {
    if (accordion.classList.contains("accordion-item-header")) {
      return;
    }

    gsap.set(accordion, {
      opacity: 0,
      y: 50
    });

    observer.observe(accordion);
  });

  // Aggiunge l'evento di click per aprire/chiudere gli accordion
  accordions.forEach((accordion) => {
    const header = accordion.querySelector(".accordion-header");
    const content = accordion.querySelector(".accordion-content");
    const symbol = accordion.querySelector(".symbol");

    accordion.addEventListener("click", () => {
      const isOpen = content.classList.contains("open");

      if (isOpen) {
        gsap.to(content, {
          maxHeight: 0,
          duration: animationDuration,
          ease: "power4.inOut"
        });
        symbol.textContent = "+";
        content.classList.remove("open");
      } else {
        const fullHeight = content.scrollHeight + "px";
        gsap.fromTo(
          content,
          {
            maxHeight: 0
          },
          {
            maxHeight: fullHeight,
            duration: animationDuration,
            ease: "power4.inOut",
            onComplete: () => {
              content.style.maxHeight = "auto"; // Ensure it stays open
            }
          }
        );
        symbol.textContent = "-";
        content.classList.add("open");
      }
    });
  });
});

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

// Listen for the scroll event and log the event data
lenis.on("scroll", (e) => {
  console.log(e);
});

var isLenisRunning = true; // Variabile di stato per tenere traccia di Lenis

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

document.addEventListener("astro:page-load", () => {
  var icons = document.getElementsByClassName("click-menu");
  var icon1 = document.getElementById("a");
  var icon2 = document.getElementById("b");
  var body = document.getElementById("body");
  var html = document.getElementById("html");
  var menu = document.getElementById("menuMobile");
  var slide = document.getElementById("slideBLu");

  Array.prototype.forEach.call(icons, function (icon) {
    icon.addEventListener("click", function () {
      console.log("Icon clicked");
      icon1.classList.toggle("a");
      icon2.classList.toggle("b");
      menu.classList.toggle("show");
      body.classList.toggle("block");
      html.classList.toggle("overflow-hidden");
      slide.classList.toggle("slide");
      toggleLenis();
    });
  });
});

// HEADER
document.addEventListener("astro:page-load", () => {
  let lastScrollTop = 0;
  const navbar = document.getElementById("navbar");
  const navbarHeight = navbar.offsetHeight;

  // Funzione per controllare se l'utente è su un dispositivo desktop
  function isDesktop() {
    return window.innerWidth > 1024; // Definisci il breakpoint per mobile/desktop (qui 1024px)
  }

  // Evento scroll per mostrare o nascondere la navbar
  window.addEventListener("scroll", () => {
    // if (isDesktop()) {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    // Se si scorre verso il basso, nascondi l'header
    if (scrollTop > lastScrollTop && scrollTop > navbarHeight) {
      navbar.classList.remove("nav-down");
      navbar.classList.add("nav-up");
    }
    // Se si scorre verso l'alto, mostra l'header
    else if (scrollTop < lastScrollTop) {
      navbar.classList.remove("nav-up");
      navbar.classList.add("nav-down");
    }

    lastScrollTop = scrollTop;
    // }
  });
});

document.addEventListener("astro:page-load", () => {
  const marqueeContent = document.querySelector(".marquee-content");

  // Duplicate content for a seamless loop
  const marqueeClone = marqueeContent.cloneNode(true);
  marqueeContent.parentElement.appendChild(marqueeClone);

  gsap.to(".marquee-content", {
    xPercent: -100,
    ease: "none",
    duration: 20,
    repeat: -1
  });
});
