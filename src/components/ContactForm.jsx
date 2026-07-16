import React, { useEffect, useState } from 'react';
import $ from 'jquery';

function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    $(document).ready(function () {
      // Form validation animation
      $('.form-control').on('focus', function () {
        $(this).parent().addClass('focused');
      });
      $('.form-control').on('blur', function () {
        $(this).parent().removeClass('focused');
      });
    });
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <section id="contact" className="contact-section section-padding">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-lg-5 mb-4 mb-lg-0">
            <span className="badge-neocore">
              <i className="fas fa-envelope me-1"></i>
              Связаться с нами
            </span>
            <h2 className="section-title">Готовы начать?</h2>
            <p className="text-muted mb-4">
              Оставьте заявку, и наш специалист свяжется с вами в течение 24 часов 
              для бесплатной консультации.
            </p>
            <div className="contact-info">
              <div className="contact-item mb-3">
                <i className="fas fa-phone text-green me-3"></i>
                <div>
                  <strong>Телефон</strong>
                  <p className="text-muted mb-0">+7 (800) 555-35-35</p>
                </div>
              </div>
              <div className="contact-item mb-3">
                <i className="fas fa-envelope text-green me-3"></i>
                <div>
                  <strong>Email</strong>
                  <p className="text-muted mb-0">info@neocore.ru</p>
                </div>
              </div>
              <div className="contact-item mb-3">
                <i className="fas fa-location-dot text-green me-3"></i>
                <div>
                  <strong>Адрес</strong>
                  <p className="text-muted mb-0">Москва, ул. Инновационная, 42</p>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-7">
            <div className="contact-form-wrapper">
              {submitted ? (
                <div className="success-message text-center">
                  <i className="fas fa-check-circle fa-3x text-green mb-3"></i>
                  <h3>Заявка отправлена!</h3>
                  <p className="text-muted">Мы свяжемся с вами в ближайшее время.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <div className="row g-3">
                    <div className="col-md-6">
                      <div className="form-group">
                        <label className="form-label">Ваше имя</label>
                        <input
                          type="text"
                          className="form-control"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          placeholder="Иван Иванов"
                          required
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <label className="form-label">Email</label>
                        <input
                          type="email"
                          className="form-control"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="ivan@example.com"
                          required
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <label className="form-label">Телефон</label>
                        <input
                          type="tel"
                          className="form-control"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          placeholder="+7 (___) ___-__-__"
                          required
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <label className="form-label">Интересующий продукт</label>
                        <select className="form-control" name="product">
                          <option>Бионическая конечность</option>
                          <option>Искусственный орган</option>
                          <option>Нейроинтерфейс</option>
                          <option>Другое</option>
                        </select>
                      </div>
                    </div>
                    <div className="col-12">
                      <div className="form-group">
                        <label className="form-label">Сообщение</label>
                        <textarea
                          className="form-control"
                          name="message"
                          value={formData.message}
                          onChange={handleChange}
                          rows="4"
                          placeholder="Расскажите о вашей ситуации..."
                        ></textarea>
                      </div>
                    </div>
                    <div className="col-12">
                      <button type="submit" className="btn btn-neocore w-100">
                        <i className="fas fa-paper-plane me-2"></i>
                        Отправить заявку
                      </button>
                    </div>
                    <div className="col-12">
                      <p className="form-disclaimer text-muted small">
                        <i className="fas fa-shield-halved me-1"></i>
                        Нажимая кнопку, вы соглашаетесь с политикой конфиденциальности
                      </p>
                    </div>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ContactForm;