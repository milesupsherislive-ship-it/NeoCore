import React, { useCallback, useEffect, useRef, useState } from 'react';
import useRevealOnScroll from '../useRevealOnScroll';
import AnimatedBackground from './AnimatedBackground';

// Неразрывный пробел для разрядов цены — запрет переноса числа на две строки
const NBSP = '\u00A0';

const pricingData = [
  {
    name: 'Базовый',
    price: `299${NBSP}000`,
    period: 'единоразово',
    description: 'Базовый протез конечности',
    features: [
      'Бионический протез руки или ноги',
      'Базовый нейроинтерфейс',
      'Стандартная калибровка',
      '1 год гарантии',
      'Телефонная поддержка',
    ],
    popular: false,
  },
  {
    name: 'Профессиональный',
    price: `599${NBSP}000`,
    period: 'единоразово',
    description: 'Расширенный пакет с реабилитацией',
    features: [
      'Продвинутый биопротез',
      'Полный нейроинтерфейс',
      'Индивидуальная 3D-модель',
      '3 года гарантии',
      'Программа реабилитации',
      'Персональный куратор',
      'Приоритетная поддержка 24/7',
    ],
    popular: true,
  },
  {
    name: 'Корпоративный',
    price: `1${NBSP}299${NBSP}000`,
    period: 'единоразово',
    description: 'Полный пакет для клиник',
    features: [
      'Все функции Профессионального',
      'Оборудование для клиники',
      'Обучение персонала',
      '5 лет гарантии',
      'Выделенная команда поддержки',
      'Регулярные обновления ПО',
      'Исследовательский доступ',
    ],
    popular: false,
  },
  {
    name: 'Премиум',
    price: `2${NBSP}499${NBSP}000`,
    period: 'единоразово',
    description: 'Максимальные возможности',
    features: [
      'Эксклюзивный биопротез',
      'Полная интеграция с ЦНС',
      'Генетическая адаптация',
      'Пожизненная гарантия',
      'Пожизненная поддержка',
      'Бесплатные обновления',
      'VIP реабилитация',
      'Доступ к бета-тестам',
    ],
    popular: false,
  },
];

function Pricing() {
  const total = pricingData.length;
  const [current, setCurrent] = useState(1);
  const currentRef = useRef(current);
  currentRef.current = current;

  const viewportRef = useRef(null);
  const trackRef = useRef(null);
  const carouselRef = useRef(null);
  const stepRef = useRef(380);
  const pausedRef = useRef(false);
  const sectionRef = useRevealOnScroll('.pricing-card');

  const goTo = useCallback((index) => {
    const n = pricingData.length;
    setCurrent(((index % n) + n) % n);
  }, []);

  // Шаг слайда = фактическая ширина карточки + зазор (стабильные отступы)
  useEffect(() => {
    const viewport = viewportRef.current;
    const track = trackRef.current;
    if (!viewport || !track) return undefined;

    const updateStep = () => {
      const card = track.querySelector('.pricing-card');
      if (!card) return;
      const gapPx = parseFloat(getComputedStyle(track).columnGap) || 24;
      stepRef.current = card.getBoundingClientRect().width + gapPx;
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

  // Смещение трека при смене слайда (только transform)
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
        }, 5000);
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
    <section id="pricing" className="pricing-section section-padding" ref={sectionRef}>
      {/* Анимированный фон */}
      <AnimatedBackground />

      <div className="container position-relative" style={{ zIndex: 2 }}>
        <div className="text-center mb-5">
          <span className="badge-neocore badge-dark">
            <i className="fas fa-tags me-1"></i>
            Тарифы
          </span>
          <h2 className="section-title text-white">Выберите свой план</h2>
          <p className="section-subtitle text-light">
            Гибкие тарифные планы для индивидуальных пациентов и медицинских учреждений
          </p>
        </div>

        <div className="pricing-carousel-wrapper" ref={carouselRef}>
          <div className="pricing-carousel-viewport" ref={viewportRef}>
            <div className="pricing-carousel-track" ref={trackRef}>
              {pricingData.map((plan, index) => (
                <div
                  className={`pricing-card${plan.popular ? ' popular' : ''}${index === current ? ' active' : ''}`}
                  key={index}
                  aria-hidden={index !== current}
                >
                  {plan.popular && (
                    <div className="popular-badge">Популярный</div>
                  )}
                  <div className="pricing-header">
                    <h3 className="pricing-name">{plan.name}</h3>
                    <p className="pricing-description">{plan.description}</p>
                    <div className="pricing-price">
                      <span className="price-currency">₽</span>
                      <span className="price-amount">{plan.price}</span>
                    </div>
                    <p className="pricing-period">{plan.period}</p>
                  </div>
                  <div className="pricing-features">
                    <ul>
                      {plan.features.map((feature, i) => (
                        <li key={i}>
                          <i className="fas fa-check-circle me-2"></i>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="pricing-footer">
                    <a href="#contact" className={`btn ${plan.popular ? 'btn-neocore' : 'btn-outline-neocore'} w-100`}>
                      Выбрать план
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button
            type="button"
            className="btn btn-outline-neocore carousel-arrow pricing-prev"
            onClick={handlePrev}
            aria-label="Предыдущий тариф"
          >
            <i className="fas fa-chevron-left"></i>
          </button>
          <button
            type="button"
            className="btn btn-outline-neocore carousel-arrow pricing-next"
            onClick={handleNext}
            aria-label="Следующий тариф"
          >
            <i className="fas fa-chevron-right"></i>
          </button>
        </div>

        <div className="pricing-controls d-flex justify-content-center gap-3">
          {pricingData.map((plan, index) => (
            <button
              type="button"
              key={index}
              className={`carousel-dot${index === current ? ' active' : ''}`}
              onClick={() => goTo(index)}
              aria-label={`Тариф ${index + 1}: ${plan.name}`}
            />
          ))}
        </div>

        <p className="text-center text-light mt-4">
          <i className="fas fa-info-circle me-1"></i>
          Все цены указаны без учёта стоимости хирургической операции. Возможна рассрочка.
        </p>
      </div>
    </section>
  );
}

export default Pricing;
