import React, { useEffect } from 'react';
import $ from 'jquery';

function HeroSection() {
  useEffect(() => {
    $(document).ready(function () {
      $('.hero-content').addClass('animate-fadeInUp');
    });
  }, []);

  return (
    <section id="hero" className="hero-section">
      {/* Тёмный градиент слева */}
      <div className="hero-dark-gradient"></div>
      
      {/* Изображение */}
      <div className="hero-image-bg">
        <img src="images/hero-cyborg.png" alt="NeoCore Bio Prosthesis" />
      </div>
      
      {/* Зелёный градиент поверх изображения */}
      <div className="hero-green-overlay"></div>

      <div className="container position-relative" style={{ zIndex: 10 }}>
        <div className="row align-items-center min-vh-100 pt-5">
          <div className="col-lg-6 hero-content">
            <span className="badge-neocore badge-dark">
              <i className="fas fa-microchip me-1"></i>
              Биопротезирование нового поколения
            </span>
            <h1 className="hero-title mt-3 mb-4">
              Возвращаем <span className="text-green">возможности</span>,<br />
              которые казались утраченными
            </h1>
            <p className="hero-subtitle mb-4">
              NeoCore создаёт интеллектуальные биопротезы и импланты, 
              которые интегрируются с нервной системой и восстанавливают 
              естественные функции организма.
            </p>
            <div className="hero-buttons d-flex flex-wrap gap-3">
              <a href="#contact" className="btn btn-neocore">
                <i className="fas fa-calendar-check me-2"></i>
                Записаться на консультацию
              </a>
              <a href="#about" className="btn btn-outline-neocore">
                <i className="fas fa-play-circle me-2"></i>
                Узнать больше
              </a>
            </div>
            <div className="hero-stats mt-5 d-flex flex-wrap gap-4">
              <div className="stat-item">
                <h3 className="stat-number text-green">5000+</h3>
                <p className="stat-label">Успешных операций</p>
              </div>
              <div className="stat-item">
                <h3 className="stat-number text-green">98%</h3>
                <p className="stat-label">Приживаемость</p>
              </div>
              <div className="stat-item">
                <h3 className="stat-number text-green">15+</h3>
                <p className="stat-label">Лет опыта</p>
              </div>
            </div>
          </div>
          <div className="col-lg-6"></div>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;