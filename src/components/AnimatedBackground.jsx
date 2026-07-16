import React, { useEffect, useRef } from 'react';

function AnimatedBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationId;
    let time = 0;

    function resize() {
      const parent = canvas.parentElement;
      canvas.width = parent.offsetWidth;
      canvas.height = parent.offsetHeight;
    }

    resize();
    window.addEventListener('resize', resize);

    function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      const dotSpacing = 30;
      const cols = Math.ceil(canvas.width / dotSpacing);
      const rows = Math.ceil(canvas.height / dotSpacing);

      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          const x = i * dotSpacing + dotSpacing / 2;
          const y = j * dotSpacing + dotSpacing / 2;

          // Две волны
          const wave1 = Math.sin(x * 0.02 + time * 1.5) * 30;
          const wave2 = Math.cos(y * 0.015 + time) * 20;
          const wave = wave1 + wave2;
          
          const distance = Math.abs((y % 150) - (75 + wave));
          const maxDistance = 100;
          
          if (distance < maxDistance) {
            const opacity = 1 - (distance / maxDistance);
            const size = 2 + opacity; // Меньше размер
            
            ctx.fillStyle = `rgba(0, 230, 118, ${opacity * 0.7})`; // Чуть тусклее
            ctx.beginPath();
            ctx.arc(x, y, size, 0, Math.PI * 2);
            ctx.fill();
          } else {
            ctx.fillStyle = 'rgba(0, 230, 118, 0.12)';
            ctx.beginPath();
            ctx.arc(x, y, 1.5, 0, Math.PI * 2);
            ctx.fill();
          }
        }
      }

      time += 0.04;
      animationId = requestAnimationFrame(draw);
    }

    draw();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationId);
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