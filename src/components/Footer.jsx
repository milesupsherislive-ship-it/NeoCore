import React from 'react';

function Footer() {
  return (
    <footer className="footer-section">
      <div className="container">
        <div className="row g-4 py-5">
          <div className="col-lg-4 col-md-6">
            <div className="footer-brand mb-3">
              <img src="/images/logo-footer.png" alt="NeoCore" className="footer-logo" />
            </div>
            <p className="text-muted">
              Передовые технологии биопротезирования. Возвращаем возможности, 
              которые казались утраченными.
            </p>
            <div className="social-links d-flex gap-3 mt-3">
              <a href="#" className="social-link"><i className="fab fa-telegram"></i></a>
              <a href="#" className="social-link"><i className="fab fa-vk"></i></a>
              <a href="#" className="social-link"><i className="fab fa-youtube"></i></a>
              <a href="#" className="social-link"><i className="fab fa-github"></i></a>
            </div>
          </div>
          <div className="col-lg-2 col-md-6">
            <h5 className="footer-title">Продукты</h5>
            <ul className="footer-links">
              <li><a href="#features">Бионические руки</a></li>
              <li><a href="#features">Бионические ноги</a></li>
              <li><a href="#features">Искусственные органы</a></li>
              <li><a href="#features">Нейроинтерфейсы</a></li>
            </ul>
          </div>
          <div className="col-lg-2 col-md-6">
            <h5 className="footer-title">Компания</h5>
            <ul className="footer-links">
              <li><a href="#about">О нас</a></li>
              <li><a href="#testimonials">Отзывы</a></li>
              <li><a href="#">Карьера</a></li>
              <li><a href="#">Новости</a></li>
            </ul>
          </div>
          <div className="col-lg-2 col-md-6">
            <h5 className="footer-title">Поддержка</h5>
            <ul className="footer-links">
              <li><a href="#contact">Контакты</a></li>
              <li><a href="#">FAQ</a></li>
              <li><a href="#">Документация</a></li>
              <li><a href="#">Гарантия</a></li>
            </ul>
          </div>
          <div className="col-lg-2 col-md-6">
            <h5 className="footer-title">Правовая информация</h5>
            <ul className="footer-links">
              <li><a href="#">Политика конфиденциальности</a></li>
              <li><a href="#">Условия использования</a></li>
              <li><a href="#">Лицензии</a></li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom border-top pt-4 pb-3">
          <div className="row align-items-center">
            <div className="col-md-6">
              <p className="text-muted mb-0">
                © 2026 NeoCore. Все права защищены.
              </p>
            </div>
            <div className="col-md-6 text-md-end">
              <p className="text-muted mb-0">
                Лицензия на медицинскую деятельность № ЛО-77-01-012345
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;