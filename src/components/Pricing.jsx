import React, { useEffect, useRef } from 'react';
import $ from 'jquery';
import AnimatedBackground from './AnimatedBackground';

const pricingData = [
  {
    name: 'Базовый',
    price: '299 000',
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
    price: '599 000',
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
    price: '1 299 000',
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
    price: '2 499 000',
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
  const carouselRef = useRef(null);

  useEffect(() => {
    const $carousel = $(carouselRef.current);
    const $cards = $carousel.find('.pricing-card');
    const totalCards = $cards.length;
    let current = 1;
    let autoPlayInterval;

    function updateCarousel() {
      $cards.each(function (index) {
        const $card = $(this);
        let offset = index - current;

        const absOffset = Math.abs(offset);
        const translateX = offset * 320;
        const scale = Math.max(0.5, 1 - absOffset * 0.12);
        const opacity = Math.max(0.3, 1 - absOffset * 0.25);
        const zIndex = 10 - absOffset;

        $card.css({
          transform: `translateX(${translateX}px) scale(${scale})`,
          opacity: opacity,
          zIndex: zIndex,
          transition: 'all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
        });

        if (absOffset === 0) {
          $card.addClass('active');
        } else {
          $card.removeClass('active');
        }
      });
    }

    function nextCard() {
      current = (current + 1) % totalCards;
      updateCarousel();
    }

    function prevCard() {
      current = (current - 1 + totalCards) % totalCards;
      updateCarousel();
    }

    $cards.css({
      position: 'absolute',
      left: '50%',
      top: '50%',
      marginLeft: '-175px',
      marginTop: '-320px',
      width: '350px',
    });

    updateCarousel();

    autoPlayInterval = setInterval(nextCard, 5000);

    $('.pricing-next').on('click', function () {
      clearInterval(autoPlayInterval);
      nextCard();
      autoPlayInterval = setInterval(nextCard, 5000);
    });

    $('.pricing-prev').on('click', function () {
      clearInterval(autoPlayInterval);
      prevCard();
      autoPlayInterval = setInterval(nextCard, 5000);
    });

    $carousel.on('mouseenter', function () {
      clearInterval(autoPlayInterval);
    });
    $carousel.on('mouseleave', function () {
      autoPlayInterval = setInterval(nextCard, 5000);
    });

    return () => {
      clearInterval(autoPlayInterval);
    };
  }, []);

  return (
    <section id="pricing" className="pricing-section section-padding">
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
          {pricingData.map((plan, index) => (
            <div className={`pricing-card ${plan.popular ? 'popular' : ''}`} key={index}>
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

        <div className="pricing-controls text-center mt-4">
          <button className="btn btn-outline-neocore pricing-prev me-2">
            <i className="fas fa-chevron-left"></i>
          </button>
          <button className="btn btn-outline-neocore pricing-next">
            <i className="fas fa-chevron-right"></i>
          </button>
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