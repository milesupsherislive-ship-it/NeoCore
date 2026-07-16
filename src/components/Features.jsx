import React, { useEffect, useRef } from 'react';
import $ from 'jquery';

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
  const carouselRef = useRef(null);
  const currentIndexRef = useRef(2);

  useEffect(() => {
    const $carousel = $(carouselRef.current);
    const $cards = $carousel.find('.feature-card');
    const totalCards = $cards.length;
    let current = 2;
    let autoPlayInterval;

    function updateCarousel() {
      $cards.each(function (index) {
        const $card = $(this);
        let offset = index - current;

        // Handle wrapping
        if (offset > totalCards / 2) offset -= totalCards;
        if (offset < -totalCards / 2) offset += totalCards;

        const absOffset = Math.abs(offset);
        const translateX = offset * 280;
        const scale = Math.max(0.6, 1 - absOffset * 0.15);
        const opacity = Math.max(0.3, 1 - absOffset * 0.3);
        const zIndex = 10 - absOffset;
        const blur = absOffset > 1 ? 2 : 0;

        $card.css({
          transform: `translateX(${translateX}px) scale(${scale})`,
          opacity: opacity,
          zIndex: zIndex,
          filter: `blur(${blur}px)`,
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

    // Initial setup
    $cards.css({
      position: 'absolute',
      left: '50%',
      top: '50%',
      marginLeft: '-150px',
      marginTop: '-175px',
      width: '300px',
    });

    updateCarousel();

    // Auto play
    autoPlayInterval = setInterval(nextCard, 4000);

    // Controls
    $('.features-next').on('click', function () {
      clearInterval(autoPlayInterval);
      nextCard();
      autoPlayInterval = setInterval(nextCard, 4000);
    });

    $('.features-prev').on('click', function () {
      clearInterval(autoPlayInterval);
      prevCard();
      autoPlayInterval = setInterval(nextCard, 4000);
    });

    // Pause on hover
    $carousel.on('mouseenter', function () {
      clearInterval(autoPlayInterval);
    });
    $carousel.on('mouseleave', function () {
      autoPlayInterval = setInterval(nextCard, 4000);
    });

    return () => {
      clearInterval(autoPlayInterval);
    };
  }, []);

  return (
    <section id="features" className="features-section section-padding">
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
          {featuresData.map((feature, index) => (
            <div className="feature-card" key={index}>
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

        <div className="features-controls d-flex justify-content-center gap-3 mt-4">
          <button className="btn btn-outline-neocore features-prev">
            <i className="fas fa-chevron-left"></i>
          </button>
          <button className="btn btn-outline-neocore features-next">
            <i className="fas fa-chevron-right"></i>
          </button>
        </div>
      </div>
    </section>
  );
}

export default Features;