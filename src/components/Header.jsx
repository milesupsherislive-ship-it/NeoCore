import React, { useEffect } from 'react';
import $ from 'jquery';

function Header() {
 useEffect(() => {
  // Smooth scroll - быстрая и плавная анимация
  $('a[href^="#"]').on('click', function (e) {
    e.preventDefault();
    const target = $(this.getAttribute('href'));
    if (target.length) {
      $('html, body').animate(
        { scrollTop: target.offset().top - 80 },
        300, // <-- Уменьшили с 800 до 500ms
        'swing' // <-- Плавная easing функция
      );
    }
  });

  // Navbar background on scroll
  $(window).on('scroll', function () {
    if ($(window).scrollTop() > 50) {
      $('.navbar-neocore').addClass('scrolled');
    } else {
      $('.navbar-neocore').removeClass('scrolled');
    }
  });
}, []);

  return (
    <nav className="navbar navbar-expand-lg navbar-neocore fixed-top">
      <div className="container">
        <a className="navbar-brand" href="#hero">
            <img src="/images/logo.png" alt="NeoCore" className="brand-logo" />
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto align-items-center">
            <li className="nav-item">
              <a className="nav-link" href="#features">Преимущества</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#catalog">Каталог</a> 
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#about">О продукте</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#testimonials">Отзывы</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#pricing">Тарифы</a>
            </li>
            <li className="nav-item ms-lg-3">
              <a className="btn btn-neocore btn-sm" href="#contact">
                Связаться
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Header;