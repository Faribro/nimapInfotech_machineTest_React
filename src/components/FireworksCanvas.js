  import React, { useEffect } from "react";
  import anime from "animejs/lib/anime.es.js";



  const FireworksCanvas = () => {
    useEffect(() => {
      const iOS = !!navigator.platform && /iPad|iPhone|iPod/.test(navigator.platform);
      const tap = ('ontouchstart' in window || navigator.msMaxTouchPoints) ? 'touchstart' : 'mousedown';
      const headerHeight = 10; 
      if (iOS) document.body.classList.add('iOS');

      const getNavbarHeight = () => {
        const navbarElement = document.querySelector('.navbar'); // Adjust selector as needed
        if (navbarElement) {
          return navbarElement.offsetHeight;
        } else {
          return 0; // Default if no navbar found
        }
      };
      
      const setCanvasSize = () => {
        const navbarHeight = getNavbarHeight();
        const animationAreaHeight = 630; // Adjust animation area height as needed
        canvas.width = window.innerWidth;
        // Reduced height by navbar and animation area
        canvas.height = window.innerHeight - navbarHeight - animationAreaHeight;
      };
      

     

      const canvas = document.querySelector('.fireworks');
      const ctx = canvas.getContext('2d');
      const numberOfParticules = 24;
      const distance = 200;
      let x = 0;
      let y = 0;
      const animations = [];

      const createCircle = (x, y) => {
        const p = {};
        p.x = x;
        p.y = y;
        p.color = '#FFF';
        p.radius = 0;
        p.alpha = 1;
        p.lineWidth = 6;
        p.draw = () => {
          ctx.globalAlpha = p.alpha;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.radius, 0, 2 * Math.PI, true);
          ctx.lineWidth = p.lineWidth;
          ctx.strokeStyle = p.color;
          ctx.stroke();
          ctx.globalAlpha = 1;
        };
        return p;
      };

      const createParticule = (x, y) => {
        const p = {};
        p.x = x;
        p.y = y;
        p.color = ['#FF324A', '#31FFA6', '#206EFF', '#FFFF99'][anime.random(0, 3)];
        p.radius = anime.random(4, 8); // Adjust radius calculation as needed
        p.draw = () => {
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.radius, 0, 2 * Math.PI, true);
          ctx.fillStyle = p.color;
          ctx.fill();
        };
        return p;
      };

      const createParticles = (x, y) => {
        const particules = [];
        for (let i = 0; i < numberOfParticules; i++) {
          const p = createParticule(x, y);
          particules.push(p);
        }
        return particules;
      };

      const removeAnimation = (animation) => {
        const index = animations.indexOf(animation);
        if (index > -1) animations.splice(index, 1);
      };

      const animateParticules = (x, y) => {
        setCanvasSize(); // Set canvas size when animating
        const particules = createParticles(x, y);
        const circle = createCircle(x, y);
        const particulesAnimation = anime({
          targets: particules,
          x: (p) => p.x + anime.random(-distance, distance),
          y: (p) => p.y + anime.random(-distance, distance),
          radius: 0,
          duration: () => anime.random(1200, 1800),
          easing: 'easeOutExpo',
          complete: removeAnimation
        });
        const circleAnimation = anime({
          targets: circle,
          radius: () => anime.random(35, 55), // Adjust radius calculation as needed
          lineWidth: 0,
          alpha: {
            value: 0,
            easing: 'linear',
            duration: () => anime.random(400, 600)
          },
          duration: () => anime.random(1200, 1800),
          easing: 'easeOutExpo',
          complete: removeAnimation
        });
        animations.push(particulesAnimation);
        animations.push(circleAnimation);
      };

      const mainLoop = anime({
        duration: Infinity,
        update: () => {
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          animations.forEach((anim) => {
            anim.animatables.forEach((animatable) => {
              animatable.target.draw();
            });
          });
        }
      });

      const handleTap = (e) => {
        const updateCoords = (e) => {
          x = e.clientX || e.touches[0].clientX;
          y = e.clientY || e.touches[0].clientY;
        };

        updateCoords(e);
        animateParticules(x, y);
      };

      window.addEventListener('resize', setCanvasSize, false);
      document.addEventListener(tap, handleTap, false);

      return () => {
        document.removeEventListener(tap, handleTap, false);
        window.removeEventListener('resize', setCanvasSize, false);
      };
    }, []);

    return (
      <canvas className="fireworks" style={{ position: "fixed", top: 0, left: 0, zIndex: 1000 }} />
    );
  };

  export default FireworksCanvas;
