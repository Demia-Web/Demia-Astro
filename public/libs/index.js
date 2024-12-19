import SplitType from "split-type";

// LOADER
document.addEventListener("astro:page-load", () => {
  // // console.log("Evento 'astro:page-load' catturato. Inizializzazione...");

  function startLoader() {
    // // console.log("startLoader avviato.");
    let counterElement = document.querySelector(".load");
    if (!counterElement) {
      // // console.errkor("Elemento '.load' non trovato!");
      return;
    }
    let currentValue = 0;

    function updateCounter() {
      if (currentValue === 100) {
        // console.log("Contatore raggiunto il valore massimo: 100.");
        return;
      }

      let oldValue = currentValue;
      currentValue += Math.floor(Math.random() * 15) + 20;
      if (currentValue > 100) {
        currentValue = 100;
      }
      // console.log(`Aggiornamento contatore: ${oldValue} -> ${currentValue}`);

      gsap.to(counterElement, {
        y: -50,
        opacity: 0,
        duration: 0.5,
        ease: "power2.out",
        onComplete: function () {
          counterElement.textContent = currentValue + "%";
          gsap.set(counterElement, {
            y: 50,
            opacity: 0
          });
          gsap.to(counterElement, {
            y: 0,
            opacity: 1,
            duration: 0.5,
            ease: "power2.out"
          });
        }
      });

      let delay = Math.floor(Math.random() * 1000) + 500;
      // console.log(`Prossimo aggiornamento contatore tra ${delay}ms.`);
      setTimeout(updateCounter, delay);
    }

    updateCounter();
  }

  startLoader();

  gsap.to(".contatore", {
    delay: 4,
    opacity: 0,
    display: "none"
    // onComplete: () => console.log("Animazione '.contatore' completata: nascosto.")
  });

  const immagini = document.querySelectorAll(".container-foto .foto");
  // console.log(`${immagini.length} immagini trovate per animazione.`);

  const tempoVisualizzazione = 0.3;

  let tl = gsap.timeline({ repeat: -1 });

  immagini.forEach((img, index) => {
    // console.log(`Aggiunta immagine ${index + 1} alla timeline.`);
    tl.to(img, {
      opacity: 1,
      duration: 0
    }).to(img, {
      opacity: 0,
      duration: 0,
      delay: tempoVisualizzazione
    });
  });

  const tl2 = gsap.timeline({
    defaults: {
      ease: "power4.out"
    },
    delay: 5
  });
  // console.log("Timeline 'tl2' creata per l'animazione di '#word'.");

  tl2
    .fromTo(
      "#word",
      {
        scale: 0.1,
        opacity: 0
      },
      {
        scale: 1,
        duration: 1,
        opacity: 1
      }
    )
    .to("#word", {
      duration: 0.5
      // onComplete: () => console.log("Animazione '#word' completata: parola visibile.")
    })
    .to("#word", {
      scale: 10,
      opacity: 0,
      duration: 0.6,
      onComplete: function () {
        // console.log("Animazione finale di '#word' completata.");
        const content = document.getElementById("content");
        if (!content) {
          // console.error("Elemento '#content' non trovato!");
          return;
        }
        content.style.display = "block";
        content.style.visibility = "hidden";

        gsap.fromTo(
          content,
          {
            opacity: 0,
            visibility: "visible"
          },
          {
            opacity: 1,
            duration: 0.5
            // onComplete: () => console.log("Contenuto principale visibile.")
          }
        );

        const overlayHero = document.getElementById("overlayhero");
        if (!overlayHero) {
          // console.error("Elemento '#overlayhero' non trovato!");
          return;
        }
        overlayHero.style.display = "none";
        // console.log("Overlay nascosto.");
      }
    });
});

// BOTTOM BAR

document.addEventListener("astro:page-load", () => {
  const bottomBar = document.querySelectorAll("#bottom-bar");
  gsap.fromTo(
    bottomBar,
    { translateY: "0%" },
    {
      translateY: "100%",
      opacity: 1,
      duration: 0.3,
      ease: "power4.out",
      scrollTrigger: {
        trigger: "#footer",
        start: "30% 100%",
        markers: false,
        toggleActions: "play reverse play reverse"
      }
    }
  );
});

// LOGO RANDOM
const logoList = ["img/loghi/alpipan.svg", "img/loghi/bianchidino.svg", "img/loghi/celyon.svg", "img/loghi/crever.svg", "img/loghi/ddl.svg", "img/loghi/de-core.svg", "img/loghi/esobit.svg", "img/loghi/estix.svg", "img/loghi/euroedile.svg", "img/loghi/fisiomedical.svg", "img/loghi/lucar.svg", "img/loghi/marameo.svg", "img/loghi/martinelli.svg", "img/loghi/menici.svg", "img/loghi/mevas.svg", "img/loghi/mobipar.svg", "img/loghi/neonform.svg", "img/loghi/perillo.svg", "img/loghi/pontlab.svg", "img/loghi/sadas.svg", "img/loghi/sanchip.svg", "img/loghi/tecnotrasmissioni.svg", "img/loghi/winet.svg", "img/loghi/quindee.svg", "img/loghi/spirulina.svg"];

let shuffledLogos = [];
let visibleLogos = [];
let logoIndex = 0;

function shuffleLogos() {
  shuffledLogos = [...logoList];
  for (let i = shuffledLogos.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledLogos[i], shuffledLogos[j]] = [shuffledLogos[j], shuffledLogos[i]];
  }
  logoIndex = 0; // Reset dell'indice
}

function initializeVisibleLogos() {
  const visibleLogos = shuffledLogos.slice(0, 8);
  const logos = document.querySelectorAll(".logo");

  logos.forEach((logo, index) => {
    logo.src = visibleLogos[index];
  });

  let logoIndex = 8;
}

function changeNextLogo() {
  const logos = document.querySelectorAll(".logo");
  let randomLogoIndex = Math.floor(Math.random() * logos.length);
  let logoToChange = logos[randomLogoIndex];

  if (logoIndex >= shuffledLogos.length) {
    shuffleLogos();
  }

  let newLogo = shuffledLogos[logoIndex];
  gsap.to(logoToChange, {
    opacity: 0,
    duration: 0.2,
    onComplete: () => {
      logoToChange.src = newLogo;
      gsap.to(logoToChange, { opacity: 0.5, duration: 0.2 });
    }
  });

  visibleLogos[randomLogoIndex] = newLogo;
  logoIndex++;
}

shuffleLogos();
window.onload = initializeVisibleLogos;

setInterval(changeNextLogo, 1300);

// SPLIT TEXT 1
document.addEventListener("astro:page-load", () => {
  const splitText = new SplitType(".reveal-text", { types: "chars" });

  // Avvolgiamo ogni carattere in un contenitore con overflow hidden
  splitText.chars?.forEach((char) => {
    if (char) {
      // Controlla che 'char' non sia null
      const wrapper = document.createElement("div");
      wrapper.style.overflow = "hidden"; // Nasconde il carattere finché non emerge
      wrapper.style.display = "inline-block"; // Mantiene il carattere inline
      wrapper.classList.add("wrapper-class"); // Aggiunge una classe opzionale al wrapper

      const parent = char.parentNode; // Verifica il nodo genitore
      if (parent) {
        // Assicurati che il nodo genitore non sia null
        parent.replaceChild(wrapper, char); // Sostituisce il carattere originale con il wrapper
        wrapper.appendChild(char); // Inserisce il carattere all'interno del wrapper
      }
    }
  });

  // Creiamo l'animazione per i caratteri che emergono dal basso
  gsap.fromTo(
    splitText.chars,
    { translateY: "100%" }, // Inizio: i caratteri partono fuori dalla vista, nascosti dal wrapper
    {
      translateY: "0%", // I caratteri si muovono verso la posizione originale
      duration: 0.35, // Durata breve per ogni carattere
      ease: "power4.out", // Movimento fluido
      stagger: 0.01, // Ritardo tra l'animazione di ogni carattere per creare l'effetto "onda"
      scrollTrigger: {
        trigger: ".reveal-text", // Trigger generale per l'intero testo
        start: "top 200px", // Inizio quando il testo entra nell'80% della viewport
        toggleActions: "play none none none" // Anima in reverse quando esce dalla viewport
      }
    }
  );
});

// HERO
document.addEventListener("astro:page-load", () => {
  // Impostiamo un'animazione per la prima immagine (verso sinistra)
  gsap.to(".title-hero1", {
    x: -200, // Sposta a sinistra di 200px
    scrollTrigger: {
      trigger: ".title-hero",
      start: "top 100px", // Quando il container raggiunge il centro della viewport
      scrub: true // L'animazione segue lo scroll in maniera fluida
    }
  });

  // Animazione per la seconda immagine (verso destra)
  gsap.to(".title-hero2", {
    x: 200, // Sposta a destra di 200px
    scrollTrigger: {
      trigger: ".title-hero",
      start: "top 100px",
      scrub: true
    }
  });

  // Animazione per la terza immagine (verso sinistra)
  gsap.to(".title-hero3", {
    x: -200, // Sposta a sinistra di 200px
    scrollTrigger: {
      trigger: ".title-hero",
      start: "top 100px",
      scrub: true
    }
  });
});

// RESIZE VIDEO
document.addEventListener("astro:page-load", () => {
  // Configura le animazioni per diverse media query
  ScrollTrigger.matchMedia({
    // Desktop (larghezza maggiore di 768px)
    "(min-width: 769px)": function () {
      gsap.to(".video", {
        scale: 1,
        width: "100%",
        ease: "power4.inOut",
        scrollTrigger: {
          trigger: "#prevideo",
          start: "top 1100px",
          end: "bottom top",
          scrub: true,
          pin: true,
          onLeave: () => {
            gsap.to(".gradient-border", {
              height: "10px",
              opacity: 1,
              duration: 0.2
            });
          },
          onEnterBack: () => {
            gsap.to(".gradient-border", {
              height: "0px",
              opacity: 0,
              duration: 0.1
            });
          }
        }
      });
    },

    // Mobile (larghezza massima 768px)
    "(max-width: 768px)": function () {
      gsap.to(".video", {
        scale: 1,
        width: "100%",
        ease: "power2.inOut",
        scrollTrigger: {
          trigger: "#prevideo",
          start: "top", // Cambia il valore di start per mobile
          end: "bottom center", // Modifica il punto finale
          scrub: true,
          pin: false, // Disattiva il pin su mobile
          onLeave: () => {
            gsap.to(".gradient-border", {
              height: "10px",
              opacity: 1,
              duration: 0.2
            });
          },
          onEnterBack: () => {
            gsap.to(".gradient-border", {
              height: "0px",
              opacity: 0,
              duration: 0.1
            });
          }
        }
      });
    }
  });
});

// PORTFOLIO
document.addEventListener("astro:page-load", () => {
  ScrollTrigger.matchMedia({
    // Regola per desktop (larghezza >= 768px)
    "(min-width: 768px)": function () {
      var largeTL = gsap.timeline({
        scrollTrigger: {
          trigger: "#portfolio-home", // Trigger principale
          pin: ".pin-container", // Fissa il titolo
          pinSpacing: false, // Nessuno spazio extra
          start: "top top", // Inizio con un piccolo offset
          endTrigger: ".scroll-container", // Fine con la scroll-container
          end: "bottom top", // Fine quando la scroll-container lascia la viewport
          scrub: true // Sincronizza con lo scroll
        }
      });

      // Fase 1: Il titolo appare con opacità da 0 a 1
      largeTL.fromTo(
        ".portfolio-text",
        {
          y: 50, // Parte leggermente spostato verso il basso
          opacity: 0 // Invisibile all'inizio
        },
        {
          y: 0, // Si muove verso il centro della viewport
          opacity: 1, // Appare con opacità 1
          duration: 0.3, // Durata dell'effetto di entrata
          ease: "power4.out" // Effetto di entrata fluido
        }
      );

      // Fase 2: Il titolo riduce l'opacità da 1 a 0.5
      largeTL.to(".portfolio-text", {
        opacity: 0.5, // Diminuisce opacità a 0.5
        duration: 0.3, // Durata della transizione
        ease: "power2.out" // Transizione morbida
      });

      // Fase 3: Scrolla via il titolo e dissolvilo fino a 0
      largeTL.to(
        ".portfolio-text",
        {
          y: "-10vh", // Scrolla via il titolo verso l'alto
          opacity: 0, // Fa scomparire il titolo gradualmente
          duration: 0.5, // Durata della dissolvenza
          ease: "power4.inOut" // Easing fluido per l'uscita
        },
        "+=0.2"
      );
    },

    // Regola per mobile (larghezza < 768px)
    "(max-width: 767px)": function () {
      var largeTL = gsap.timeline({
        scrollTrigger: {
          trigger: "#portfolio-home", // Trigger principale
          pin: ".pin-container", // Fissa il titolo
          pinSpacing: false, // Nessuno spazio extra
          startTrigger: "#showreel",
          start: "top top+=80", // Inizio con un piccolo offset
          endTrigger: ".scroll-container", // Fine con la scroll-container
          end: "bottom top", // Fine quando la scroll-container lascia la viewport
          scrub: true // Sincronizza con lo scroll
        }
      });

      // Fase 1: Il titolo appare con opacità da 0 a 1
      largeTL.fromTo(
        ".portfolio-text",
        {
          y: 20, // Parte leggermente spostato verso il basso
          opacity: 1 // Invisibile all'inizio
        },
        {
          y: 0, // Si muove verso il centro della viewport
          opacity: 1, // Appare con opacità 1
          duration: 0.3, // Durata dell'effetto di entrata
          ease: "power4.out" // Effetto di entrata fluido
        }
      );

      // Fase 2: Il titolo riduce l'opacità da 1 a 0.5
      largeTL.to(".portfolio-text", {
        opacity: 0.5, // Diminuisce opacità a 0.5
        duration: 0.3, // Durata della transizione
        ease: "power2.out" // Transizione morbida
      });

      // Fase 3: Scrolla via il titolo e dissolvilo fino a 0
      largeTL.to(
        ".portfolio-text",
        {
          y: "-10vh", // Scrolla via il titolo verso l'alto
          opacity: 0, // Fa scomparire il titolo gradualmente
          duration: 0.5, // Durata della dissolvenza
          ease: "power4.inOut" // Easing fluido per l'uscita
        },
        "+=0.2"
      );
    }
  });
});

// CARD SERVIZI
gsap.registerPlugin(Observer);
document.addEventListener("astro:page-load", () => {
  Observer.create({
    target: "#pre-servizi", // can be any element (selector text is fine)
    type: "wheel,touch", // comma-delimited list of what to listen for
    onUp: () => ScrollTrigger.refresh(),
    onDown: () => ScrollTrigger.refresh(),

    onChange: (self) => {
      // console.log("velocity:", self.velocityX, self.velocityY, "delta:", self.deltaX, self.deltaY, "target element:", self.target, "last event:", self.event);
    }
  });
  // Esegui il codice solo quando la pagina è completamente caricata
  // Seleziona tutti gli elementi con la classe 'card-servizi'
  const cards = document.querySelectorAll(".card-servizi");

  // Loop su tutte le schede per applicare l'animazione
  cards.forEach((card, i) => {
    gsap.fromTo(
      card,
      {
        rotationX: "32deg", // Inclinazione iniziale sull'asse X
        skewY: 0, // Distorce l'elemento lungo l'asse Y
        skewX: 0, // Distorce l'elemento lungo l'asse X
        scale: 0.9, // Scala iniziale ridotta
        opacity: 0.6, // Opacità ridotta per un effetto visivo migliore
        transformPerspective: 800 // Prospettiva per l'effetto 3D
      },
      {
        rotationX: 0, // Torna alla posizione normale sull'asse X
        skewY: 0, // Rimuove la distorsione sull'asse Y
        skewX: 0, // Rimuove la distorsione sull'asse X
        scale: 1, // Torna alla scala normale (dimensione originale)
        opacity: 1, // Torna completamente visibile
        scrollTrigger: {
          trigger: card, // L'elemento che attiva l'animazione
          start: "top 130%", // Inizia quando l'elemento è nel viewport
          end: "top 20%", // Finisce quando l'elemento è più in alto nel viewport
          scrub: 0.5
        }
      }
    );
  });

  setTimeout(() => {
    ScrollTrigger.refresh();
  }, 100);
});

// INCONTRA IL TEAM
document.addEventListener("astro:page-load", () => {
  ScrollTrigger.matchMedia({
    // Regola per dispositivi con larghezza maggiore di 768px (desktop e tablet in landscape)
    "(min-width: 768px)": function () {
      gsap.fromTo(
        "#incontra-il-team",
        { backgroundSize: "100%" },
        {
          backgroundSize: "135%",
          ease: "power1.out", // Easing per transizione
          scrollTrigger: {
            trigger: "#incontra-il-team",
            start: "top 300px",
            end: "bottom top",
            scrub: true
          }
        }
      );
    },

    // Regola per dispositivi mobili con larghezza inferiore a 768px
    "(max-width: 767px)": function () {
      gsap.fromTo(
        "#incontra-il-team",
        { backgroundSize: "cover" },
        {
          backgroundSize: "cover", // Riduzione della variazione per schermi piccoli
          ease: "power4.out",
          scrollTrigger: {
            trigger: "#incontra-il-team",
            start: "top 250px", // Personalizzazione per mobile
            end: "bottom top",
            scrub: 0.3
          }
        }
      );
    }
  });

  gsap.fromTo(
    ".big-title",
    { x: "70%", opacity: 1 },
    {
      x: "-140%",
      opacity: 1,
      ease: "power1.out", // Aggiunto easing
      scrollTrigger: {
        trigger: "#incontra-il-team",
        start: "top 150px",
        end: "bottom top",
        scrub: true
      }
    }
  );
});

// REVEAL TEXT 2
document.addEventListener("astro:page-load", () => {
  const splitText2 = new SplitType(".reveal-text2", { types: "chars" });

  if (splitText2 && splitText2.chars) {
    // Avvolgiamo ogni carattere in un contenitore con overflow hidden
    splitText2.chars.forEach((char) => {
      if (char && char.parentNode) {
        // Controllo per assicurarsi che char e il suo parent esistano
        const wrapper = document.createElement("div");
        wrapper.style.overflow = "hidden"; // Nasconde il carattere finché non emerge
        wrapper.style.display = "inline-block"; // Mantiene il carattere inline
        wrapper.classList.add("wrapper-class"); // Aggiunge una classe opzionale al wrapper

        // Inserisce il wrapper nel DOM e il carattere all'interno del wrapper
        char.parentNode.insertBefore(wrapper, char);
        wrapper.appendChild(char);
      }
    });

    // Creiamo l'animazione per i caratteri che emergono dal basso
    gsap.fromTo(
      splitText2.chars,
      { translateY: "100%" }, // Inizio: i caratteri partono fuori dalla vista, nascosti dal wrapper
      {
        translateY: "0%", // I caratteri si muovono verso la posizione originale
        duration: 0.35, // Durata breve per ogni carattere
        ease: "power4.out", // Movimento fluido
        stagger: 0.01, // Ritardo tra l'animazione di ogni carattere per creare l'effetto "onda"
        scrollTrigger: {
          trigger: ".reveal-text2", // Trigger generale per l'intero testo
          start: "top 200px", // Inizio quando il testo entra nel 20% della viewport
          toggleActions: "play none none none" // Anima solo una volta
        }
      }
    );
  }
});

// RECENSIONI
document.addEventListener("astro:page-load", () => {
  const panels = gsap.utils.toArray(".panel");

  // Iterate over each panel to stagger their appearance
  panels.forEach((panel, index) => {
    gsap.fromTo(
      panel,
      {
        y: 100,
        opacity: 0
      }, // start off-screen and invisible
      {
        y: 0, // bring it to normal position
        opacity: 1, // make it fully visible
        ease: "power2.out",
        duration: 1,
        scrollTrigger: {
          trigger: panel,
          start: "top 80%", // trigger when panel is 80% into view
          toggleActions: "play none none reverse",
          markers: false
        },
        delay: index * 0.15 // stagger effect for each panel
      }
    );
  });
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

document.addEventListener("astro:page-load", () => {
  document.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", function (event) {
      event.preventDefault();
      const href = this.getAttribute("href");
      if (!href) return;
      setTimeout(() => {
        window.location.href = href;
      }, 500);
    });
  });
});

document.addEventListener("astro:page-load", () => {
  const customCursor = document.getElementById("custom-cursor");
  const images2 = document.querySelectorAll(".box-portfolio-home");

  images2.forEach((img) => {
    img.addEventListener("mouseenter", () => {
      customCursor.style.display = "flex";
      document.addEventListener("mousemove", moveCursor);
    });

    img.addEventListener("mouseleave", () => {
      customCursor.style.display = "none";
      document.removeEventListener("mousemove", moveCursor);
    });
  });

  document.addEventListener("mousedown", () => {
    customCursor.classList.add("click-scale");
  });

  document.addEventListener("mouseup", () => {
    customCursor.classList.remove("click-scale");
  });

  function moveCursor(e) {
    const cursorX = e.clientX - customCursor.offsetWidth / 20;
    const cursorY = e.clientY - customCursor.offsetHeight / 20;

    gsap.to(customCursor, {
      duration: 0.1,
      left: cursorX,
      top: cursorY,
      ease: "none"
    });
  }
});
