import SplitType from "split-type";

import { toggleLenis } from "./main.js";

// TESTO CIAO
document.addEventListener("astro:page-load", () => {
  const splitText = new SplitType(".ciao", { types: "chars" });

  // Avvolgiamo ogni carattere in un contenitore con overflow hidden
  splitText.chars.forEach((char) => {
    const wrapper = document.createElement("div");
    wrapper.style.overflow = "hidden"; // Nasconde il carattere finché non emerge
    wrapper.style.display = "inline-block"; // Mantiene il carattere inline
    char.parentNode.insertBefore(wrapper, char); // Inserisce il wrapper nel DOM
    wrapper.appendChild(char); // Inserisce il carattere all'interno del wrapper
  });

  // Creiamo l'animazione per i caratteri che emergono dal basso
  gsap.fromTo(
    splitText.chars,
    { translateY: "100%" }, // Inizio: i caratteri partono fuori dalla vista, nascosti dal wrapper
    {
      translateY: "0%", // I caratteri si muovono verso la posizione originale
      duration: 0.8, // Durata breve per ogni carattere
      ease: "power4.out", // Movimento fluido
      delay: 0.5,
      stagger: 0.05, // Ritardo tra l'animazione di ogni carattere per creare l'effetto "onda"
      scrollTrigger: {
        trigger: "body", // Trigger generale per l'intero testo
        start: "top 200px", // Inizio quando il testo entra nell'80% della viewport
        toggleActions: "play reverse play reverse" // Anima in reverse quando esce dalla viewport
      }
    }
  );
});

// SLIDER IMMAGINE
document.addEventListener("astro:page-load", () => {
  ScrollTrigger.matchMedia({
    // Configurazione per desktop (larghezza >= 768px)
    "(min-width: 768px)": function () {
      gsap.to("#list-about", {
        xPercent: -126, // Sposta l'elemento a sinistra
        ease: "power3.out",
        scrollTrigger: {
          trigger: "#list-about", // Trigger principale
          start: "top top", // Inizio quando #list-about è in cima alla viewport
          end: "bottom+=500", // Fine alla fine dell'elemento
          scrub: 2, // Sincronizza con lo scroll
          pin: true, // Fissa l'elemento
          pinSpacing: true, // Mantiene lo spazio durante il pin
          anticipatePin: 1, // Anticipa l'effetto pin
          invalidateOnRefresh: true, // Ricalcola al ridimensionamento della finestra
          onUpdate: (self) => {
            gsap.ticker.lagSmoothing(3000, 16); // Minimizza lag durante scroll rapidi
          }
        }
      });
    },

    // Configurazione per mobile (larghezza < 768px)
    "(max-width: 767px)": function () {
      gsap.to("#list-about", {
        xPercent: -306, // Riduce il movimento per mobile
        ease: "power3.out",
        scrollTrigger: {
          trigger: "#list-about", // Trigger principale
          start: "top 20%", // Inizio alla cima della viewport
          end: "bottom+=200", // Estende la durata per un'esperienza più fluida
          scrub: true, // Sincronizza con lo scroll
          pin: true, // Fissa l'elemento
          pinSpacing: true, // Rimuove spazio extra per mobile
          anticipatePin: 1, // Riduce l'anticipazione per prestazioni migliori
          invalidateOnRefresh: true, // Ricalcola al ridimensionamento della finestra
          onUpdate: (self) => {
            gsap.ticker.lagSmoothing(500, 16); // Ottimizza per scroll più rapidi
          }
        }
      });
    }
  });

  // Forza un refresh di GSAP dopo il caricamento della pagina
  window.addEventListener("load", () => {
    ScrollTrigger.refresh(); // Ricalcola le posizioni
  });
});

// ANIMAZIONE PARAGRAFO
document.addEventListener("astro:page-load", () => {
  const textElement = document.getElementById("text-emote");

  const lines = [];
  let currentLine = [];

  textElement.childNodes.forEach((node) => {
    if (node.nodeName === "BR") {
      lines.push(currentLine.join(" ").trim());
      currentLine = [];
    } else if (node.nodeType === Node.TEXT_NODE) {
      currentLine.push(node.textContent.trim());
    }
  });

  if (currentLine.length > 0) {
    lines.push(currentLine.join(" ").trim());
  }

  textElement.innerHTML = lines.map((line) => `<span class="line">${line}</span>`).join("");

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

// ANIMAZIONE PARAGRAFO 2
document.addEventListener("astro:page-load", () => {
  const textElement = document.getElementById("text-emote2");

  const lines = [];
  let currentLine = [];

  textElement.childNodes.forEach((node) => {
    if (node.nodeName === "BR") {
      lines.push(currentLine.join(" ").trim());
      currentLine = [];
    } else if (node.nodeType === Node.TEXT_NODE) {
      currentLine.push(node.textContent.trim());
    }
  });

  if (currentLine.length > 0) {
    lines.push(currentLine.join(" ").trim());
  }

  textElement.innerHTML = lines.map((line) => `<span class="line">${line}</span>`).join("");

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
        start: "top 80%",
        end: "bottom center",
        scrub: true,
        toggleActions: "play reverse play reverse"
      }
    }
  );
});

// TIMELINE
document.addEventListener("astro:page-load", () => {
  // Seleziona le sezioni orizzontali
  let sections = gsap.utils.toArray(".panel2");
  let scrollDistance = 5000; // Durata complessiva dello scroll per questa sezione

  // Seleziona l'elemento che mostrerà l'anno
  let yearDisplay = document.getElementById("yearDisplay");

  // Calcolo del valore delle ultime due cifre
  let startYear = 2013;
  let endYear = 2024;
  let totalYears = endYear - startYear;

  // Animazione dello scroll orizzontale delle sezioni
  gsap.to(sections, {
    xPercent: -100 * (sections.length - 1),
    ease: "none",
    scrollTrigger: {
      trigger: "#hor",
      start: "top top",
      end: `+=${scrollDistance}`,
      scrub: 0.1,
      pin: true,
      anticipatePin: 1,
      onUpdate: (self) => {
        // Calcola la progressione del valore
        let progress = self.progress;
        let currentYear = Math.floor(startYear + progress * totalYears);

        // Controlla se l'anno è cambiato
        if (yearDisplay.textContent != currentYear) {
          // Se l'anno è diverso, anima il movimento verso l'alto
          gsap.fromTo(
            yearDisplay,
            {
              y: 300, // Inizia da sotto
              opacity: 0
            },
            {
              y: 0, // Si sposta al centro
              opacity: 1,
              duration: 0.5, // Durata dell'animazione
              ease: "power4.out" // Effetto di uscita fluido
            }
          );

          // Aggiorna il contenuto del div con il nuovo anno
          yearDisplay.textContent = currentYear;
        }
      }
    }
  });
});

// ANIMAZIONE VTB
document.addEventListener("astro:page-load", () => {
  const tl = gsap.timeline();
  // Applica un'animazione di scaling da 0 a 1
  tl.fromTo(
    "#box-ciao",
    { scale: 0, opacity: 0 }, // Stato iniziale: scalato a 0
    { scale: 1, opacity: 1, duration: 1.4, ease: "power3.out", delay: 1 } // Stato finale: scala a 1 in 1.5 secondi
  ).fromTo(
    ".vtb",
    { opacity: 0 },
    { opacity: 1, duration: 3, ease: "power3.out" },
    "+=0" // Avvia subito dopo la prima animazione
  );
});

// ANIMAZIONE DON'T QUIT
document.addEventListener("astro:page-load", () => {
  gsap.from("#text-dontquit", {
    scrollTrigger: {
      trigger: "#text-dontquit",
      start: "top 80%", // Quando il blocco è visibile all'80% nella viewport
      toggleActions: "play reverse play reverse", // Aggiunge e rimuove la classe durante l'entrata e l'uscita
      onEnter: () => {
        setTimeout(() => {
          document.querySelectorAll("#text-dontquit span").forEach((span) => {
            span.classList.add("text-sfumatura");
            span.classList.add("saturate-[1.3]");
          });
        }, 1000); // Delay di 1 secondo
      },
      onLeaveBack: () => {
        // Rimuove la classe quando si scrolla indietro
        document.querySelectorAll("#text-dontquit span").forEach((span) => {
          span.classList.remove("text-sfumatura");
        });
      }
    }
  });
});

// MARQUEE
document.addEventListener("astro:page-load", () => {
  setTimeout(() => {
    // Selezioniamo il contenitore del testo
    const marqueeTeam = document.querySelector(".marquee-team");

    // Duplicazione del contenuto per l'effetto infinito
    marqueeTeam.innerHTML += marqueeTeam.innerHTML;

    // Animazione GSAP
    gsap.to(".marquee-team", {
      xPercent: -50, // Sposta di metà del contenuto duplicato
      ease: "none", // Mantiene un movimento fluido e costante
      repeat: -1, // Ripete all'infinito
      duration: 20 // Durata, puoi regolare in base alla velocità desiderata
    });
  }, 2000);
});

// AUTOSTART VIDEO
document.addEventListener("astro:page-load", () => {
  setTimeout(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Funzione per far partire i video
    function playVideosInRow(row) {
      const videos = row.querySelectorAll(".team-video");
      videos.forEach((video) => {
        video.play();
      });
    }

    // Funzione per fermare i video
    function pauseVideosInRow(row) {
      const videos = row.querySelectorAll(".team-video");
      videos.forEach((video) => {
        video.pause();
        video.currentTime = 0; // Resetta il video all'inizio
      });
    }

    // Seleziona tutte le righe
    const rows = document.querySelectorAll(".box-team");

    rows.forEach((row, index) => {
      ScrollTrigger.create({
        trigger: row,
        start: "top 50%", // Quando la riga entra nella viewport
        end: "bottom 20%", // Quando la riga esce dalla viewport
        onEnter: () => {
          playVideosInRow(row);
        },
        onLeave: () => {
          pauseVideosInRow(row);
        },
        onEnterBack: () => {
          playVideosInRow(row);
        },
        onLeaveBack: () => {
          pauseVideosInRow(row);
        }
      });
    });
  }, 2000);
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

// POPUP TEAM
document.addEventListener("astro:page-load", () => {
  document.querySelectorAll(".box-team").forEach(function (button) {
    button.addEventListener("click", function () {
      const target = this.getAttribute("data-target");
      console.log("Clicking on:", target);

      // Chiamata API
      fetch(`${import.meta.env.PUBLIC_URL_TOKEN}/api/teams?populate=*`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${import.meta.env.PUBLIC_AUTH_TOKEN}`
        }
      })
        .then((response) => {
          if (response.ok) {
            return response.json();
          } else {
            throw new Error("Network response was not ok");
          }
        })
        .then((data) => {
          const matchingTeam = data.data.find((team) => team.id === parseInt(target, 10));

          if (matchingTeam) {
            console.log("Matching team:", matchingTeam);
          } else {
            console.log("No team found with the given target ID.");
          }
          openPopup(matchingTeam);
        })
        .catch((error) => {
          console.error("There was a problem with the fetch operation:", error);
        });
    });
  });

  function openPopup(memberName) {
    console.log(`Opening popup for member: ${memberName}`);
    console.log(memberName);
    toggleLenis();
    const member = memberName;

    if (member) {
      document.getElementById("popupName").innerText = member.Nome;
      document.getElementById("popupRole").innerText = member.posizione_lavorativa;
      document.getElementById("popupDescription").innerText = member.Descrizione_corta;
      document.getElementById("popupDescription2").innerText = member.descrizione_lunga;
      document.getElementById("popemoji").innerText = member.Emoji;
      document.getElementById("popupvideo").src = `/img/team/${member.Nome.split(" ")[0]}.webp`;

      const popup = document.getElementById("teamPopup");
      const overlay = document.getElementById("overlay");
      overlay.classList.remove("hidden");
      popup.classList.remove("hidden");
      document.body.classList.add("popup-open");

      setTimeout(() => {
        overlay.classList.add("show");
        popup.classList.add("active");
        console.log("Popup opened and animations started."); // Debug: Popup animation confirmation
      }, 10);
    } else {
      console.warn("Member data not found for name:", memberName); // Debug: Warn if no member data
    }
  }

  function closePopup() {
    console.log("Closing popup"); // Debug: Log popup closing
    toggleLenis();
    const popup = document.getElementById("teamPopup");
    const overlay = document.getElementById("overlay");

    popup.classList.remove("active");
    overlay.classList.remove("show");

    setTimeout(() => {
      popup.classList.add("hidden");
      overlay.classList.add("hidden");
      document.body.classList.remove("popup-open");
      console.log("Popup closed and hidden"); // Debug: Popup fully closed confirmation
    }, 300);
  }

  document.getElementById("closePopup").addEventListener("click", closePopup);
});

// ANIMAZIONE LED
document.addEventListener("astro:page-load", () => {
  const myElement = document.getElementById("onair");
  const circleonair = document.getElementById("circle-onair");
  const imgonair = document.getElementById("imgonair");
  const ledonair = document.getElementById("ledonair");

  myElement.addEventListener("click", function () {
    circleonair.classList.toggle("bg-sfumatura");
    circleonair.classList.toggle("move-right");
    imgonair.classList.toggle("opacity-15");
    ledonair.classList.toggle("bg-[#FB72BD]");
    ledonair.classList.toggle("shadow-ledon");
    ledonair.classList.toggle("shadow-ledoff");
    ledonair.classList.toggle("flicker");

    setTimeout(() => {
      ledonair.classList.toggle("flicker");
      ledonair.classList.toggle("on");
    }, 1500);
  });
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
        spaceBetween: 16,
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

document.addEventListener("astro:page-load", () => {
  const customCursor = document.getElementById("custom-cursor");
  const images2 = document.querySelectorAll(".team");

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
