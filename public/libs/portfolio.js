import SplitType from "split-type";

document.addEventListener("astro:page-load", () => {
  const splitText = new SplitType(".port", { types: "chars" });

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
      duration: 0.8,
      ease: "power4.out",
      delay: 0.5,
      stagger: 0.05,
      scrollTrigger: {
        trigger: "body",
        start: "top 200px",
        toggleActions: "play reverse play reverse"
      }
    }
  );
});

// BUTTON
document.addEventListener("astro:page-load", () => {
  document.querySelectorAll(".big-button-dark").forEach(function (button) {
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
  gsap.to("#paint0", {
    attr: { gradientTransform: "rotate(360, 35, 35)" },
    duration: 2,
    repeat: -1,
    ease: "linear"
  });

  gsap.to("#paint1", {
    attr: { gradientTransform: "rotate(360, 35, 35)" },
    duration: 2,
    repeat: -1,
    ease: "linear"
  });
});

document.addEventListener("astro:page-load", () => {
  const customCursor = document.getElementById("custom-cursor");
  const images2 = document.querySelectorAll(".box-portfolio");

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
