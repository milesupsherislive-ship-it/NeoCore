import React, { useEffect } from 'react';
import $ from 'jquery';

const testimonials = [
  {
    name: 'Александр Петров',
    role: 'Реципиент бионической руки',
    text: 'После аварии я думал, что никогда не смогу нормально жить. NeoCore вернул мне не только руку — они вернули мне уверенность в себе. Управление силой мысли — это невероятно.',
    rating: 5,
  },
  {
    name: 'Елена Смирнова',
    role: 'Реципиент искусственного сердца',
    text: 'Три года назад мне поставили биоимплант сердца от NeoCore. За это время ни одного осложнения. Я снова бегаю, плаваю и живу полноценной жизнью.',
    rating: 5,
  },
  {
    name: 'Дмитрий Козлов',
    role: 'Реципиент нейроинтерфейса',
    text: 'Нейроинтерфейс NeoCore позволил мне управлять компьютером и протезом руки одновременно. Это как получить суперспособность. Благодарен команде за их работу.',
    rating: 5,
  },
];

const partners = ['MedTech Corp', 'BioLife', 'NeuroSync', 'HealthPrime', 'GenomX'];

function Testimonials() {
  useEffect(() => {
    $(document).ready(function () {
      // Animate testimonials on scroll
      $(window).on('scroll', function () {
        $('.testimonial-card').each(function () {
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
    <section id="testimonials" className="testimonials-section section-padding">
      <div className="container">
        <div className="text-center mb-5">
          <span className="badge-neocore">
            <i className="fas fa-quote-left me-1"></i>
            Отзывы
          </span>
          <h2 className="section-title">Истории наших пациентов</h2>
          <p className="section-subtitle">
            Реальные люди, чьи жизни изменились благодаря технологиям NeoCore
          </p>
        </div>

        <div className="row g-4">
          {testimonials.map((testimonial, index) => (
            <div className="col-md-4" key={index}>
              <div className="testimonial-card">
                <div className="testimonial-rating">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <i key={i} className="fas fa-star"></i>
                  ))}
                </div>
                <p className="testimonial-text">"{testimonial.text}"</p>
                <div className="testimonial-author">
                  <div className="author-avatar">
                    <i className="fas fa-user"></i>
                  </div>
                  <div className="author-info">
                    <h5 className="author-name">{testimonial.name}</h5>
                    <p className="author-role">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="partners-section mt-5 pt-5">
          <h4 className="text-center text-muted mb-4">Нам доверяют</h4>
          <div className="partners-logos d-flex justify-content-center align-items-center flex-wrap gap-4">
            {partners.map((partner, index) => (
              <div className="partner-logo" key={index}>
                <i className="fas fa-hospital me-2"></i>
                {partner}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Testimonials;