import SplitType from "split-type";

// MARQUEE
document.addEventListener("astro:page-load", () => {
  // Selezioniamo il contenitore del testo
  const marqueeTeam = document.querySelector(".marquee-info");

  // Duplicazione del contenuto per l'effetto infinito
  marqueeTeam.innerHTML += marqueeTeam.innerHTML;

  // Animazione GSAP
  gsap.to(".marquee-info", {
    xPercent: -50, // Sposta di metà del contenuto duplicato
    ease: "none", // Mantiene un movimento fluido e costante
    repeat: -1, // Ripete all'infinito
    duration: 20 // Durata, puoi regolare in base alla velocità desiderata
  });
});

document.addEventListener("astro:page-load", () => {
  const img = document.getElementById("webImage");
  const section = document.getElementById("webSection");
  const texts = document.querySelectorAll("#textContainer p");

  // Initialize GSAP and ScrollTrigger
  gsap.registerPlugin(ScrollTrigger);

  // Timeline for sequential text animation
  const textTimeline = gsap.timeline({
    paused: true
  });

  // Add fade-in animations for each text one by one
  texts.forEach((text, index) => {
    textTimeline.to(text, { opacity: 1, duration: 0.5, ease: "power2.inOut" }, index * 0.3);
  });

  // Main image zoom animation
  gsap.fromTo(
    img,
    { width: "500px", height: "500px", scale: 1 },
    {
      width: "100vw",
      height: "100%",
      duration: 2,
      ease: "power3.inOut",
      scrollTrigger: {
        markers: true,
        trigger: section,
        scrub: true,
        pin: true,
        pinSpacing: true, // Mantiene lo spazio durante il pin
        anticipatePin: 0, // Anticipa l'effetto pin
        start: "top top",
        end: "bottom",
        onEnter: () => textTimeline.play(), // Play text animation once zoom completes
        onLeaveBack: () => textTimeline.reverse() // Reverse text animation on scroll back
      }
    }
  );
});

// ANIAMZIONE PARAGRAFO
document.addEventListener("astro:page-load", () => {
  // Suddividi manualmente il testo in linee
  const textElement = document.getElementById("text-emote");
  const text = textElement.innerHTML;
  const lines = text.split("<br>");

  // Sostituisci il contenuto con gli span per le linee
  textElement.innerHTML = lines.map((line) => `<span class="line">${line}</span>`).join("");

  // Seleziona le linee suddivise
  const lineElements = document.querySelectorAll("#text-emote .line");

  // Animazione GSAP
  gsap.fromTo(
    lineElements,
    {
      y: 50,
      opacity: 0
    },
    {
      y: 0,
      opacity: 1,
      duration: 0.9,
      stagger: 0.1,
      ease: "power4.inOut",
      scrollTrigger: {
        trigger: "#text-emote",
        start: "top 80%",
        end: "bottom center",
        scrub: true,
        toggleActions: "play reverse play reverse"
      }
    }
  );
});

// BUTTON
document.addEventListener("astro:page-load", () => {
  document.querySelectorAll(".big-button").forEach(function (button) {
    button.addEventListener("mouseenter", function (e) {
      const parentOffset = this.getBoundingClientRect();
      const relX = e.pageX - parentOffset.left - window.scrollX;
      const relY = e.pageY - parentOffset.top - window.scrollY;

      const span = this.querySelector("span");
      if (span) {
        span.style.top = relY + "px";
        span.style.left = relX + "px";
      }
    });

    button.addEventListener("mouseout", function (e) {
      const parentOffset = this.getBoundingClientRect();
      const relX = e.pageX - parentOffset.left - window.scrollX;
      const relY = e.pageY - parentOffset.top - window.scrollY;

      const span = this.querySelector("span");
      if (span) {
        span.style.top = relY + "px";
        span.style.left = relX + "px";
      }
    });
  });
});

// BUTTON_SMALL
document.addEventListener("astro:page-load", () => {
  document.querySelectorAll(".big-button-small").forEach(function (button) {
    button.addEventListener("mouseenter", function (e) {
      const parentOffset = this.getBoundingClientRect();
      const relX = e.pageX - parentOffset.left - window.scrollX;
      const relY = e.pageY - parentOffset.top - window.scrollY;

      const span = this.querySelector("span");
      if (span) {
        span.style.top = relY + "px";
        span.style.left = relX + "px";
      }
    });

    button.addEventListener("mouseout", function (e) {
      const parentOffset = this.getBoundingClientRect();
      const relX = e.pageX - parentOffset.left - window.scrollX;
      const relY = e.pageY - parentOffset.top - window.scrollY;

      const span = this.querySelector("span");
      if (span) {
        span.style.top = relY + "px";
        span.style.left = relX + "px";
      }
    });
  });
});

document.addEventListener("astro:page-load", () => {
  // Suddividi manualmente il testo in linee
  const textElement = document.getElementById("text-emote2");
  const text = textElement.innerHTML;
  const lines = text.split("<br>");

  // Sostituisci il contenuto con gli span per le linee
  textElement.innerHTML = lines.map((line) => `<span class="line">${line}</span>`).join("");

  // Seleziona le linee suddivise
  const lineElements = document.querySelectorAll("#text-emote2 .line");

  // Animazione GSAP
  gsap.fromTo(
    lineElements,
    {
      y: 50,
      opacity: 0
    },
    {
      y: 0,
      opacity: 1,
      duration: 0.9,
      stagger: 0.1,
      ease: "power4.inOut",
      scrollTrigger: {
        trigger: "#text-emote2",
        start: "top 50%",
        end: "bottom center",
        scrub: true,
        toggleActions: "play reverse play reverse"
      }
    }
  );
});

document.addEventListener("astro:page-load", () => {
  const splitText = new SplitType(".reveal-text", { types: "chars" });

  splitText.chars.forEach((char) => {
    const wrapper = document.createElement("div");
    wrapper.style.overflow = "hidden";
    wrapper.style.display = "inline-block";
    char.parentNode.insertBefore(wrapper, char);
    wrapper.appendChild(char);
  });

  gsap.fromTo(
    splitText.chars,
    { translateY: "100%" },
    {
      translateY: "0%",
      duration: 0.35,
      ease: "power4.out",
      stagger: 0.01,
      scrollTrigger: {
        trigger: ".reveal-text",
        start: "top 50%",
        toggleActions: "play reverse play reverse"
      }
    }
  );
});

// ACCORDION
document.addEventListener("astro:page-load", () => {
  function initializeAccordionAnimations() {
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
          header.classList.remove("open");
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
                content.style.maxHeight = "auto"; // Mantiene l'apertura
              }
            }
          );
          symbol.textContent = "-";
          content.classList.add("open");
          header.classList.add("open");
        }
      });
    });
  }

  function initializeAccordionSmallAnimation() {
    const accordions = document.querySelectorAll(".accordion-item-small");
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
      gsap.set(accordion, {
        opacity: 0,
        y: 50
      });
      observer.observe(accordion);
    });

    // Aggiunge l'evento di click per aprire/chiudere gli accordion
    accordions.forEach((accordion) => {
      const header = accordion.querySelector(".accordion-header-small");
      const content = accordion.querySelector(".accordion-content-small");
      const symbol = accordion.querySelector(".symbol-small");

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
          header.classList.remove("open");
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
                content.style.maxHeight = "auto"; // Mantiene l'apertura
              }
            }
          );
          symbol.textContent = "-";
          content.classList.add("open");
          header.classList.add("open");
        }
      });
    });
  }

  initializeAccordionAnimations();
  initializeAccordionSmallAnimation();
});

document.addEventListener("astro:page-load", () => {
  gsap.to(".title-faq-1", {
    y: "-90",
    ease: "power1.out",
    scrollTrigger: {
      trigger: "#bg-web-faq",
      start: "top 140px",
      end: "bottom top",
      scrub: true
    }
  });

  gsap.to(".title-faq-2", {
    y: "90",
    ease: "power1.out",
    scrollTrigger: {
      trigger: "#bg-web-faq",
      start: "top 140px",
      end: "bottom top",
      scrub: true
    }
  });

  gsap.fromTo(
    "#bg-web-faq",
    { backgroundSize: "110%" },
    {
      backgroundSize: "135%",
      ease: "power1.out",
      scrollTrigger: {
        trigger: "#bg-web-faq",
        start: "top 300px",
        end: "bottom top",
        scrub: true
      }
    }
  );
});

// SWIPER
import Swiper from "swiper";
import "swiper/css";
import "swiper/css/navigation";
document.addEventListener("astro:page-load", () => {
  const swiper = new Swiper(".swiper-task", {
    loop: false,
    draggable: true,
    breakpoints: {
      0: {
        spaceBetween: 0,
        slidesPerView: 1.1
      },
      600: {
        spaceBetween: 20,
        slidesPerView: 3
      },
      1024: {
        spaceBetween: 20,
        slidesPerView: 3
      }
    }
  });
});
