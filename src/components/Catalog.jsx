import React, { useEffect } from 'react';
import $ from 'jquery';

const products = [
  {
    icon: 'fa-hand-holding-medical',
    title: 'Бионические руки',
    image: 'images/arms.png',
    description: 'Полнофункциональные протезы рук с нейроинтерфейсом. Естественные движения, тактильная обратная связь, управление силой мысли.',
    features: ['Нейроуправление', 'Тактильная чувствительность', '12 степеней свободы'],
  },
  {
    icon: 'fas fa-walking',
    title: 'Бионические ноги',
    image: 'images/legs.png',
    description: 'Протезы ног с адаптивной амортизацией и микропроцессорным управлением коленным суставом. Естественная походка.',
    features: ['Адаптивная походка', 'Амортизация', 'Водонепроницаемость'],
  },
  {
    icon: 'fa-heart-pulse',
    title: 'Искусственное сердце',
    image: 'images/heart.png',
    description: 'Биоинженерное сердце с полной совместимостью. Автоматическая регуляция сердечного ритма под нагрузкой.',
    features: ['Биосовместимость', 'Автономная работа', 'Мониторинг 24/7'],
  },
  {
    icon: 'fa-lungs',
    title: 'Искусственные органы',
    image: 'images/lungs.png',
    description: 'Печень, почки, желудок и другие органы. Полная функциональность без риска отторжения организмом.',
    features: ['3D-биопечать', 'Генетическая адаптация', 'Пожизненная гарантия'],
  },
  {
    icon: 'fa-eye',
    title: 'Нейровизуализация',
    image: 'images/eyes.png',
    description: 'Импланты сетчатки и зрительного нерва. Восстановление зрения даже при полной атрофии.',
    features: ['HD зрение', 'Ночное видение', 'Инфракрасный режим'],
  },
  {
    icon: 'fa-brain',
    title: 'Нейроинтерфейсы',
    image: 'images/brain.png',
    description: 'Прямое соединение мозга с внешними устройствами. Управление протезами, компьютерами, умным домом.',
    features: ['Прямой доступ', 'ИИ-адаптация', 'Безопасность'],
  },
];

function Catalog() {
  useEffect(() => {
    $(document).ready(function () {
      $(window).on('scroll', function () {
        $('.product-card').each(function () {
          const elementTop = $(this).offset().top;
          const viewportBottom = $(window).scrollTop() + $(window).height();
          if (elementTop < viewportBottom - 100) {
            $(this).addClass('animate-fadeInUp');
          }
        });
      });
    });
  }, []);

  return (
    <section id="catalog" className="catalog-section section-padding bg-light">
      <div className="container">
        <div className="text-center mb-5">
          <span className="badge-neocore">
            <i className="fas fa-cubes me-1"></i>
            Наша продукция
          </span>
          <h2 className="section-title">Каталог биопротезов</h2>
          <p className="section-subtitle">
            Передовые решения для замены и восстановления функций человеческого тела
          </p>
        </div>

        <div className="row g-4">
          {products.map((product, index) => (
            <div className="col-md-6 col-lg-4" key={index}>
              <div className="product-card">
                <div className="product-image-wrapper">
                    <img 
                        src={product.image} 
                        alt={product.title} 
                        className="product-image"
                    />
                </div>
                <div className="product-content">
                  <div className="product-icon">
                    <i className={`fas ${product.icon}`}></i>
                  </div>
                  <h3 className="product-title">{product.title}</h3>
                  <p className="product-description">{product.description}</p>
                  <ul className="product-features">
                    {product.features.map((feature, i) => (
                      <li key={i}>
                        <i className="fas fa-check-circle me-2"></i>
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <a href="#contact" className="btn btn-outline-neocore w-100">
                    Подробнее
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Catalog;