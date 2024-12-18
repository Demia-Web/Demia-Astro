const logoList = ["img/loghi/alpipan.svg", "img/loghi/bianchidino.svg", "img/loghi/celyon.svg", "img/loghi/crever.svg", "img/loghi/ddl.svg", "img/loghi/de-core.svg", "img/loghi/esobit.svg", "img/loghi/estix.svg", "img/loghi/euroedile.svg", "img/loghi/fisiomedical.svg", "img/loghi/lucar.svg", "img/loghi/marameo.svg", "img/loghi/martinelli.svg", "img/loghi/menici.svg", "img/loghi/mevas.svg", "img/loghi/mobipar.svg", "img/loghi/neonform.svg", "img/loghi/perillo.svg", "img/loghi/pontlab.svg", "img/loghi/sadas.svg", "img/loghi/sanchip.svg", "img/loghi/tecnotrasmissioni.svg", "img/loghi/winet.svg", "img/loghi/quindee.svg", "img/loghi/spirulina.svg"];

let shuffledLogos = []; // Lista dei loghi mescolata
let visibleLogos = []; // Loghi attualmente visibili
let logoIndex = 0; // Indice per il prossimo logo da inserire

// Funzione per mescolare la lista dei loghi
function shuffleLogos() {
  shuffledLogos = [...logoList]; // Copia della lista dei loghi
  for (let i = shuffledLogos.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledLogos[i], shuffledLogos[j]] = [shuffledLogos[j], shuffledLogos[i]]; // Swap degli elementi
  }
  logoIndex = 0; // Reset dell'indice
}

// Inizializza i loghi visibili con i primi loghi mescolati
function initializeVisibleLogos() {
  const visibleLogos = shuffledLogos.slice(0, 8); // I primi 8 loghi mescolati
  const logos = document.querySelectorAll(".logo");

  logos.forEach((logo, index) => {
    logo.src = visibleLogos[index];
  });

  let logoIndex = 8; // Indice del prossimo logo da utilizzare
}

// Funzione per cambiare il prossimo logo senza duplicati
function changeNextLogo() {
  const logos = document.querySelectorAll(".logo");
  let randomLogoIndex = Math.floor(Math.random() * logos.length); // Scegli un logo casuale tra quelli visibili
  let logoToChange = logos[randomLogoIndex];

  // Se abbiamo usato tutti i loghi, rimescola
  if (logoIndex >= shuffledLogos.length) {
    shuffleLogos();
  }

  // Cambia il logo corrente con il prossimo della lista mescolata
  let newLogo = shuffledLogos[logoIndex];
  gsap.to(logoToChange, {
    opacity: 0,
    duration: 0.2,
    onComplete: () => {
      logoToChange.src = newLogo;
      gsap.to(logoToChange, { opacity: 0.5, duration: 0.2 });
    }
  });

  // Aggiorna la lista dei loghi visibili e incrementa l'indice
  visibleLogos[randomLogoIndex] = newLogo;
  logoIndex++;
}

// Mescola i loghi e inizializza i loghi visibili
shuffleLogos();
window.onload = initializeVisibleLogos;

// Cambia un logo casualmente ogni 2 secondi
setInterval(changeNextLogo, 1300);

import SplitType from "split-type";
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
