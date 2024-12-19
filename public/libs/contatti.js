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

// Elenco parole
document.addEventListener("astro:page-load", () => {
  const parole = ["sognare", "volare", "creare"];
  const parolaElement = document.querySelector(".animated-word");

  let index = 0;

  function cambiaParola() {
    gsap.to(parolaElement, {
      y: -30,
      opacity: 0,
      duration: 0.3,
      onComplete: () => {
        index = (index + 1) % parole.length;
        parolaElement.textContent = parole[index];
        gsap.set(parolaElement, { y: 30, opacity: 0 });
        gsap.to(parolaElement, {
          y: 0,
          opacity: 1,
          duration: 0.3
        });
      }
    });
  }

  setInterval(cambiaParola, 2000);
});
