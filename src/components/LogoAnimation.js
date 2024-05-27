import React, { useEffect } from "react";
import anime from "animejs/lib/anime.es.js";

const LogoAnimation = () => {
  useEffect(() => {
    const setDashoffset = (el) => {
      const l = el.getTotalLength();
      el.setAttribute("stroke-dasharray", l);
      return [l, 0];
    };

    const letters = anime({
      targets: "#lines path",
      strokeDashoffset: {
        value: setDashoffset,
        duration: 700,
        easing: "easeOutQuad",
      },
      transform: ["translate(0 128)", "translate(0 0)"],
      delay: (el, i) => 750 + i * 120,
      duration: 1400,
    });

    const dotJSRoll = anime({
      targets: "#dot-js",
      transform: ["translate(0 0)", "translate(544 0)"],
      delay: letters.duration - 800,
      duration: 800,
      elasticity: 300,
    });

    const dotJSDown = anime({
      targets: "#dot-js",
      transform: ["translate(0 -304)", "translate(0 0)"],
      duration: 500,
      elasticity: 600,
      autoplay: false,
    });

    const dotJSUp = anime({
      targets: "#dot-js",
      transform: ["translate(0 0) scale(1 3)", "translate(0 -352) scale(1 1)"],
      duration: 800,
      easing: "easeOutCirc",
      complete: () => {
        const animatable = dotJSDown.animatables[0];
        if (animatable) {
          const dot = animatable.target.getBoundingClientRect();
          const pos = { x: dot.left + dot.width / 2, y: dot.top + dot.height / 2 };
          fireworks.boom(pos.x, pos.y);
        }
      },
    });

    const letterI = anime({
      targets: "#line-i-1",
      strokeDashoffset: {
        value: setDashoffset,
        duration: 700,
        easing: "easeOutQuad",
      },
      transform: () =>
        ff ? ["rotate(360)", "rotate(0)"] : ["rotate(360 240 64)", "rotate(0 240 64)"],
      duration: 2500,
      delay: letters.duration - 780,
    });

    const dotI = anime({
      targets: "#dot-i",
      transform: ["translate(0 -352) scale(1 3)", "translate(0 0) scale(1 1)"],
      opacity: { value: [0, 1], easing: "linear", duration: 100 },
      delay: letters.duration + 250,
    });

    const JSletters = anime({
      targets: ["#line-j", "#line-s"],
      strokeDashoffset: setDashoffset,
      duration: 1400,
      delay: (el, i) => (letterI.duration - 1400) + i * 60,
      easing: "easeInOutQuart",
    });

    const gradients = anime({
      targets: "#fills *:not(#dot-i)",
      opacity: [0, 1],
      delay: letterI.duration - 300,
      delay: (el, i, l) => {
        const mid = l / 2;
        const index = (i - mid) > mid ? 0 : i;
        const delay = Math.abs(index - mid);
        return (letterI.duration - 1300) + delay * 30;
      },
      duration: 500,
      easing: "linear",
    });

    // Cleanup function
    return () => {
      letters.pause();
      dotJSRoll.pause();
      dotJSDown.pause();
      dotJSUp.pause();
      letterI.pause();
      dotI.pause();
      JSletters.pause();
      gradients.pause();
    };
  }, []);

  return null;
};

export default LogoAnimation;
