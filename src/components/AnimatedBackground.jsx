import React, { useEffect, useRef } from 'react';

function AnimatedBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return undefined;
    const ctx = canvas.getContext('2d');
    let animationId = null;
    let time = 0;
    let running = false;
    let visible = true;

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isMobile = window.matchMedia('(max-width: 768px)').matches;

    // На мобильных — крупнее шаг сетки (упрощённый фон, меньше точек)
    const dotSpacing = isMobile ? 44 : 30;

    function drawFrame(t) {
      const cols = Math.ceil(canvas.width / dotSpacing);
      const rows = Math.ceil(canvas.height / dotSpacing);

      for (let i = 0; i < cols; i++) {
        const x = i * dotSpacing + dotSpacing / 2;
        // Обе волны зависят только от x и времени — считаем один раз на столбец
        const wave1 = Math.sin(x * 0.02 + t * 1.5) * 30;
        const wave2 = isMobile ? 0 : Math.cos(x * 0.01 - t * 0.8) * 20;
        const center = 75 + wave1 + wave2;

        for (let j = 0; j < rows; j++) {
          const y = j * dotSpacing + dotSpacing / 2;
          const distance = Math.abs((y % 150) - center);
          const maxDistance = 100;

          if (distance < maxDistance) {
            const opacity = 1 - distance / maxDistance;
            const size = 2 + opacity;
            ctx.fillStyle = `rgba(0, 230, 118, ${(opacity * 0.7).toFixed(3)})`;
            ctx.beginPath();
            ctx.arc(x, y, size, 0, Math.PI * 2);
            ctx.fill();
          } else {
            ctx.fillStyle = 'rgba(0, 230, 118, 0.12)';
            ctx.fillRect(x - 1.5, y - 1.5, 3, 3); // дешёвая отрисовка базовых точек
          }
        }
      }
    }

    function renderStatic() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      drawFrame(time);
    }

    function resize() {
      const parent = canvas.parentElement;
      canvas.width = parent.offsetWidth;
      canvas.height = parent.offsetHeight;
      renderStatic();
    }

    function loop() {
      if (!running) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      drawFrame(time);
      time += 0.04;
      animationId = requestAnimationFrame(loop);
    }

    function start() {
      if (running || reduceMotion || !visible || document.hidden) return;
      running = true;
      animationId = requestAnimationFrame(loop);
    }

    function stop() {
      running = false;
      if (animationId !== null) {
        cancelAnimationFrame(animationId);
        animationId = null;
      }
    }

    resize();

    const onVisibilityChange = () => {
      if (document.hidden) stop();
      else start();
    };
    window.addEventListener('resize', resize);
    document.addEventListener('visibilitychange', onVisibilityChange);

    // Пауза анимации, когда секция не видна на странице
    let io = null;
    if (!reduceMotion && typeof IntersectionObserver !== 'undefined') {
      io = new IntersectionObserver(
        ([entry]) => {
          visible = entry.isIntersecting;
          if (visible) start();
          else stop();
        },
        { threshold: 0 }
      );
      io.observe(canvas);
    }

    if (!reduceMotion) start();

    return () => {
      stop();
      window.removeEventListener('resize', resize);
      document.removeEventListener('visibilitychange', onVisibilityChange);
      if (io) io.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 1,
      }}
    />
  );
}

export default AnimatedBackground;
