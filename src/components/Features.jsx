import React, { useCallback, useEffect, useRef, useState } from 'react';
import useRevealOnScroll from '../useRevealOnScroll';

const featuresData = [
  {
    icon: 'fa-hand-holding-medical',
    title: 'Бионические конечности',
    description: 'Протезы рук и ног с нейроинтерфейсом, управляемые силой мысли. Полное восстановление моторики.',
  },
  {
    icon: 'fa-heart-pulse',
    title: 'Искусственные органы',
    description: 'Биоинженерные сердца, почки и печень, совместимые с организмом без отторжения.',
  },
  {
    icon: 'fa-eye',
    title: 'Нейровизуализация',
    description: 'Импланты сетчатки, восстанавливающие зрение даже при полной атрофии зрительного нерва.',
  },
  {
    icon: 'fa-brain',
    title: 'Нейроинтерфейсы',
    description: 'Прямое соединение мозга с внешними устройствами для управления протезами и компьютерами.',
  },
  {
    icon: 'fa-dna',
    title: 'Генная адаптация',
    description: 'Индивидуальная настройка имплантов под генетический профиль пациента для максимальной совместимости.',
  },
];

function Features() {
  const total = featuresData.length;
  const [current, setCurrent] = useState(2);
  const currentRef = useRef(current);
  currentRef.current = current;

  const viewportRef = useRef(null);
  const trackRef = useRef(null);
  const carouselRef = useRef(null);
  const stepRef = useRef(320);
  const pausedRef = useRef(false);
  const sectionRef = useRevealOnScroll('.feature-card');

  const goTo = useCallback((index) => {
    const n = featuresData.length;
    setCurrent(((index % n) + n) % n);
  }, []);

  // Расчёт шага слайда по фактической ширине карточки (стабильные зазоры)
  useEffect(() => {
    const viewport = viewportRef.current;
    const track = trackRef.current;
    if (!viewport || !track) return undefined;

    const updateStep = () => {
      const card = track.querySelector('.feature-card');
      if (!card) return;
      const gapPx = parseFloat(getComputedStyle(track).columnGap) || 20;
      stepRef.current = card.getBoundingClientRect().width + gapPx;
      // Синхронизируем позицию без анимации после изменения размеров
      track.style.transform = `translateX(${-currentRef.current * stepRef.current}px)`;
    };

    updateStep();
    const observer = new ResizeObserver(updateStep);
    observer.observe(viewport);
    window.addEventListener('resize', updateStep);
    return () => {
      observer.disconnect();
      window.removeEventListener('resize', updateStep);
    };
  }, []);

  // Смещение трека при смене слайда (только transform, без конкурентных CSS-стилей)
  useEffect(() => {
    const track = trackRef.current;
    if (track) {
      track.style.transform = `translateX(${-current * stepRef.current}px)`;
    }
  }, [current]);

  // Автопрокрутка: один интервал; пауза при наведении и неактивной вкладке
  useEffect(() => {
    const carousel = carouselRef.current;
    if (!carousel) return undefined;

    let intervalId = null;
    const start = () => {
      if (intervalId === null && !pausedRef.current && !document.hidden) {
        intervalId = setInterval(() => {
          setCurrent((c) => (c + 1) % total);
        }, 4000);
      }
    };
    const stop = () => {
      if (intervalId !== null) {
        clearInterval(intervalId);
        intervalId = null;
      }
    };

    const onEnter = () => {
      pausedRef.current = true;
      stop();
    };
    const onLeave = () => {
      pausedRef.current = false;
      start();
    };
    const onVisibilityChange = () => {
      if (document.hidden) stop();
      else start();
    };

    carousel.addEventListener('mouseenter', onEnter);
    carousel.addEventListener('mouseleave', onLeave);
    document.addEventListener('visibilitychange', onVisibilityChange);
    start();

    return () => {
      stop();
      carousel.removeEventListener('mouseenter', onEnter);
      carousel.removeEventListener('mouseleave', onLeave);
      document.removeEventListener('visibilitychange', onVisibilityChange);
    };
  }, [total]);

  const handlePrev = () => goTo(currentRef.current - 1);
  const handleNext = () => goTo(currentRef.current + 1);

  return (
    <section id="features" className="features-section section-padding" ref={sectionRef}>
      <div className="container">
        <div className="text-center mb-5">
          <span className="badge-neocore">
            <i className="fas fa-star me-1"></i>
            Наши преимущества
          </span>
          <h2 className="section-title">Почему выбирают NeoCore</h2>
          <p className="section-subtitle">
            Передовые технологии биопротезирования, которые меняют жизни тысяч людей по всему миру
          </p>
        </div>

        <div className="features-carousel-wrapper" ref={carouselRef}>
          <div className="features-carousel-viewport" ref={viewportRef}>
            <div className="features-carousel-track" ref={trackRef}>
              {featuresData.map((feature, index) => (
                <div
                  className={`feature-card${index === current ? ' active' : ''}`}
                  key={index}
                  aria-hidden={index !== current}
                >
                  <div className="feature-icon">
                    <i className={`fas ${feature.icon}`}></i>
                  </div>
                  <h3 className="feature-title">{feature.title}</h3>
                  <p className="feature-description">{feature.description}</p>
                  <a href="#contact" className="feature-link">
                    Подробнее <i className="fas fa-arrow-right ms-1"></i>
                  </a>
                </div>
              ))}
            </div>
          </div>

          <button
            type="button"
            className="btn btn-outline-neocore carousel-arrow features-prev"
            onClick={handlePrev}
            aria-label="Предыдущее преимущество"
          >
            <i className="fas fa-chevron-left"></i>
          </button>
          <button
            type="button"
            className="btn btn-outline-neocore carousel-arrow features-next"
            onClick={handleNext}
            aria-label="Следующее преимущество"
          >
            <i className="fas fa-chevron-right"></i>
          </button>
        </div>

        <div className="features-controls d-flex justify-content-center gap-3">
          {featuresData.map((feature, index) => (
            <button
              type="button"
              key={index}
              className={`carousel-dot${index === current ? ' active' : ''}`}
              onClick={() => goTo(index)}
              aria-label={`Слайд ${index + 1}: ${feature.title}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default Features;