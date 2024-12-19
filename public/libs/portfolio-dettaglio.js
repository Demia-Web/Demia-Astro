import SplitType from "split-type";
import Swiper from "swiper";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

document.addEventListener("astro:page-load", () => {
  const overlay = document.getElementById("overlayportfolio");

  // Nascondi l'overlay con un fade out all'avvio
  setTimeout(() => overlay.classList.add("fade-out"), 100);

  // Applica il fade-in quando l'utente clicca su un link di lavoro
  const links = document.querySelectorAll(".portfolio-link");
  links.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault(); // Previene il caricamento immediato della pagina
      overlay.classList.remove("fade-out"); // Attiva l'overlay

      // Attendi che l'overlay sia completamente visibile, poi carica la pagina
      setTimeout(() => {
        window.location.href = link.href;
      }, 500); // 500ms coincide con la durata della transizione CSS
    });
  });

  const splitTitle = new SplitType(".reveal-title", { types: "lines" });

  gsap.set(splitTitle.lines, { opacity: 0 });
  // Avvolgiamo ogni linea in un contenitore con overflow hidden
  splitTitle.lines.forEach((line) => {
    const wrapper = document.createElement("div");
    wrapper.style.overflow = "hidden"; // Nasconde la linea finché non emerge
    wrapper.style.display = "block"; // Mantiene la linea come block-level element
    line.parentNode.insertBefore(wrapper, line); // Inserisce il wrapper nel DOM
    wrapper.appendChild(line); // Inserisce la linea all'interno del wrapper
  });

  // Timeout di 2 secondi (2000 millisecondi) prima di avviare l'animazione
  setTimeout(() => {
    // Creiamo l'animazione per le linee che emergono dal basso
    gsap.fromTo(
      splitTitle.lines,
      {
        translateY: "100%",
        opacity: 0
      }, // Inizio: le linee partono fuori dalla vista

      {
        translateY: "0%", // Le linee si muovono verso la posizione originale
        opacity: 1, // Le linee si rileggono alla vista
        duration: 0.5, // Durata dell'animazione per ogni linea
        ease: "power4.out", // Movimento fluido
        stagger: 0.1, // Ritardo tra l'animazione di ogni linea per creare l'effetto "onda"
        scrollTrigger: {
          trigger: "#box-header", // Trigger per l'intero testo
          start: "top 500px" // Inizia quando il testo entra nella viewport
        }
      }
    );
  }, 500); // Ritardo di 2 secondi

  const lineAnim = document.querySelectorAll(".line-anim");
  gsap.set(lineAnim, { opacity: 0 });
  setTimeout(() => {
    gsap.fromTo(
      lineAnim,
      { translateY: "100%", opacity: 0 },
      {
        translateY: "0%",
        opacity: 1,
        duration: 0.3,
        ease: "power4.out",
        scrollTrigger: {
          trigger: "#box-header",
          start: "top 500px"
        }
      }
    );
  }, 560);

  const splitText = new SplitType(".reveal-text", { types: "lines" });

  gsap.set(splitText.lines, { opacity: 0 });

  splitText.lines.forEach((line) => {
    const wrapper = document.createElement("div");
    wrapper.style.overflow = "hidden";
    wrapper.style.display = "block";
    line.parentNode.insertBefore(wrapper, line);
    wrapper.appendChild(line);
  });

  setTimeout(() => {
    gsap.fromTo(
      splitText.lines,
      { translateY: "100%", opacity: 0 },
      {
        translateY: "0%",
        opacity: 1,
        duration: 0.5,
        ease: "power4.out",
        stagger: 0.1,
        scrollTrigger: {
          trigger: "#box-header",
          start: "top 500px"
        }
      }
    );
  }, 700);

  const reveelTag1 = document.querySelectorAll(".tag-hero-1");
  const reveelTag2 = document.querySelectorAll(".tag-hero-2");

  gsap.set(reveelTag1, { opacity: 0 });
  gsap.set(reveelTag2, { opacity: 0 });

  setTimeout(() => {
    gsap.fromTo(
      reveelTag1,
      {
        translateY: "100%",
        opacity: 0
      },

      {
        translateY: "0%",
        opacity: 1,
        duration: 0.5,
        ease: "power4.out",
        stagger: 0.1,
        scrollTrigger: {
          trigger: "#box-header",
          start: "top 500px"
        }
      }
    );
  }, 900);

  setTimeout(() => {
    gsap.fromTo(
      reveelTag2,
      {
        translateY: "100%",
        opacity: 0
      },
      {
        translateY: "0%",
        opacity: 1,
        duration: 0.5,
        ease: "power4.out",
        stagger: 0.1,
        scrollTrigger: {
          trigger: "#box-header",
          start: "top 500px"
        }
      }
    );
  }, 900);

  const videoAnim = document.querySelectorAll(".video-anim");

  gsap.set(videoAnim, { opacity: 0 });

  setTimeout(() => {
    gsap.fromTo(
      videoAnim,
      {
        translateY: "100%",
        opacity: 0
      },

      {
        translateY: "0%",
        opacity: 1,
        duration: 0.5,
        ease: "power4.out",
        stagger: 0.1,
        scrollTrigger: {
          trigger: "#box-header",
          start: "top 500px"
        }
      }
    );
  }, 1000);

  const textElements = document.querySelectorAll(".reveal-text-slide p");

  gsap.fromTo(
    textElements,
    { x: "-100%", opacity: 0 },
    {
      x: "0%",
      opacity: 1,
      duration: 0.8,
      ease: "power4.out",
      stagger: 0.2,
      scrollTrigger: {
        trigger: ".reveal-text-slide",
        start: "-=40% 80%"
      }
    }
  );

  const splitText2 = new SplitType(".reveal-text-2", { types: "lines" });
  const buttonAnim = document.querySelector(".button-anim");

  // Imposta il testo inizialmente invisibile
  gsap.set(splitText2.lines, { opacity: 0 });
  gsap.set(buttonAnim, { opacity: 0 });

  // Avvolgiamo ogni linea in un contenitore con overflow hidden
  splitText2.lines.forEach((line) => {
    const wrapper = document.createElement("div");
    wrapper.style.overflow = "hidden"; // Nasconde la linea finché non emerge
    wrapper.style.display = "block"; // Mantiene la linea come block-level element
    line.parentNode.insertBefore(wrapper, line); // Inserisce il wrapper nel DOM
    wrapper.appendChild(line); // Inserisce la linea all'interno del wrapper
  });

  // Timeout di 2 secondi prima di avviare l'animazione
  setTimeout(() => {
    // Creiamo l'animazione per le linee che emergono dal basso
    gsap.fromTo(
      splitText2.lines,
      { translateY: "100%", opacity: 0 }, // Inizio: le linee sono fuori vista e invisibili
      {
        translateY: "0%", // Le linee si muovono verso la posizione originale
        opacity: 1, // Ripristina l'opacità a 1 (visibile)
        duration: 0.5, // Durata dell'animazione per ogni linea
        ease: "power4.out", // Movimento fluido
        stagger: 0.1, // Ritardo tra l'animazione di ogni linea per creare l'effetto "onda"
        scrollTrigger: {
          trigger: ".reveal-text-2", // Trigger per l'intero testo
          start: "-=40% 80%" // Inizia quando il testo entra nella viewport
        }
      }
    );
  }, 0); // Ritardo di 2 secondi
  setTimeout(() => {
    gsap.fromTo(
      buttonAnim,
      {
        y: 100,
        opacity: 0
      },
      {
        y: 0,
        opacity: 1,
        duration: 1.2,
        ease: "power4.inOut",
        scrollTrigger: {
          trigger: ".reveal-text-2", // Trigger per l'intero testo
          start: "-=40% 80%" // Inizia quando il testo entra nella viewport
        }
      }
    );
  }, 200); // Ritardo di 2 secondi

  // Suddividi manualmente il testo in linee
  const textElement = document.getElementById("text-emote");
  const text = textElement.innerHTML;
  const lines = text.split("<br>");

  // Sostituisci il contenuto con gli span per le linee
  textElement.innerHTML = lines.map((line) => `<span class="line">${line}</span>`).join("");

  // Seleziona il tag e le linee suddivise
  const tagElement = document.querySelector(".title-tag");
  const lineElements = document.querySelectorAll("#text-emote .line");

  // Creazione di una timeline GSAP
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: "#text-emote",
      start: "top 80%",
      end: "bottom center",
      scrub: true,
      toggleActions: "play reverse play reverse"
    }
  });

  // Prima animazione: comparsa del tag
  tl.fromTo(
    tagElement,
    {
      y: 50,
      opacity: 0
    },
    {
      y: 0,
      opacity: 1,
      duration: 1.2,
      ease: "power4.inOut"
    }
  );

  // Successiva animazione: comparsa del testo riga per riga
  tl.fromTo(
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
      ease: "power4.inOut"
    }
  );

  const splitText3 = new SplitType(".reveal-text-3", { types: "chars" });
  const testimonialAnim = document.querySelector(".testimonial-anim");
  const buttonTestimonialAnim = document.querySelector(".button-testimonial-anim");

  gsap.set(splitText3.lines, { opacity: 0 });
  gsap.set(testimonialAnim, { opacity: 0 });
  gsap.set(buttonTestimonialAnim, { opacity: 0 });

  splitText3.chars.forEach((char) => {
    const wrapper = document.createElement("div");
    wrapper.style.overflow = "hidden"; // Nasconde il carattere finché non emerge
    wrapper.style.display = "inline-block"; // Mantiene il carattere inline
    char.parentNode.insertBefore(wrapper, char); // Inserisce il wrapper nel DOM
    wrapper.appendChild(char); // Inserisce il carattere all'interno del wrapper
  });

  setTimeout(() => {
    // Creiamo l'animazione per i caratteri che emergono dal basso
    gsap.fromTo(
      testimonialAnim,
      {
        translateY: "100%",
        opacity: 0
      }, // Inizio: i caratteri partono fuori dalla vista, nascosti dal wrapper
      {
        translateY: "0%", // I caratteri si muovono verso la posizione originale
        duration: 0.35, // Durata breve per ogni carattere
        ease: "power4.out", // Movimento fluido
        opacity: 1,

        scrollTrigger: {
          trigger: ".reveal-text-3", // Trigger generale per l'intero testo
          start: "top 90%" // Inizio quando il testo entra nell'80% della viewport
        }
      }
    );
  }, 200); // Ritardo di 2 secondi

  setTimeout(() => {
    // Creiamo l'animazione per i caratteri che emergono dal basso
    gsap.fromTo(
      splitText3.chars,
      {
        translateY: "100%",
        opacity: 0
      }, // Inizio: i caratteri partono fuori dalla vista, nascosti dal wrapper
      {
        translateY: "0%", // I caratteri si muovono verso la posizione originale
        duration: 0.35, // Durata breve per ogni carattere
        ease: "power4.out", // Movimento fluido
        opacity: 1,
        stagger: 0.01, // Ritardo tra l'animazione di ogni carattere per creare l'effetto "onda"
        scrollTrigger: {
          trigger: ".reveal-text-3", // Trigger generale per l'intero testo
          start: "top 90%" // Inizio quando il testo entra nell'80% della viewport
        }
      }
    );
  }, 400);

  setTimeout(() => {
    gsap.fromTo(
      buttonTestimonialAnim,
      {
        translateY: "100%",
        opacity: 0
      },
      {
        translateY: "0%",
        duration: 0.35,
        ease: "power4.out",
        opacity: 1,
        stagger: 0.01,
        scrollTrigger: {
          trigger: ".reveal-text-3",
          start: "top 90%"
        }
      }
    );
  }, 600);

  gsap.utils.toArray(".portfolio-immagini").forEach((box) => {
    gsap.fromTo(
      box,
      {
        autoAlpha: 0,
        y: 250
      },
      {
        duration: 0.2,
        autoAlpha: 1,
        y: 0,
        ease: "power4.out",
        scrollTrigger: {
          trigger: box,
          start: "top 120%",
          end: "top 20%",
          scrub: true
        }
      }
    );
  });

  setTimeout(() => {
    const swiper = new Swiper(".swiper-portfolio", {
      slidesPerView: 1.4,
      spaceBetween: 20,
      modules: [Navigation],
      navigation: {
        nextEl: ".swiper-portfolio-next",
        prevEl: ".swiper-portfolio-prev"
      },
      drag: true,
      grabCursor: true
    });
  }, 800);
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
