import React, { useEffect } from 'react';
import $ from 'jquery';

const steps = [
  {
    number: '01',
    icon: 'fa-user-doctor',
    title: 'Консультация',
    description: 'Детальное обследование пациента, анализ совместимости и подбор оптимального решения.',
  },
  {
    number: '02',
    icon: 'fa-microscope',
    title: 'Проектирование',
    description: 'Создание индивидуальной 3D-модели протеза с учётом анатомии и генетического профиля.',
  },
  {
    number: '03',
    icon: 'fa-screwdriver-wrench',
    title: 'Производство',
    description: 'Изготовление биопротеза из биосовместимых материалов с интеграцией нейроинтерфейса.',
  },
  {
    number: '04',
    icon: 'fa-hospital-user',
    title: 'Имплантация',
    description: 'Хирургическая установка с последующей калибровкой и подключением к нервной системе.',
  },
  {
    number: '05',
    icon: 'fa-chart-line',
    title: 'Реабилитация',
    description: 'Программа адаптации с ИИ-тренажёрами и постоянным мониторингом показателей.',
  },
];

function About() {
  useEffect(() => {
    $(document).ready(function () {
      $(window).on('scroll', function () {
        $('.step-card').each(function () {
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
    <section id="about" className="about-section section-padding">
      <div className="container">
        <div className="text-center mb-5">
          <span className="badge-neocore badge-dark">
            <i className="fas fa-cogs me-1"></i>
            Как это работает
          </span>
          <h2 className="section-title text-white">Процесс биопротезирования</h2>
          <p className="section-subtitle text-light">
            От первой консультации до полного восстановления — пять шагов к новой жизни
          </p>
        </div>

        <div className="row g-4">
          {steps.map((step, index) => (
            <div className="col-md-6 col-lg-4" key={index}>
              <div className="step-card step-card-dark">
                <div className="step-number">{step.number}</div>
                <div className="step-icon">
                  <i className={`fas ${step.icon}`}></i>
                </div>
                <h3 className="step-title text-white">{step.title}</h3>
                <p className="step-description text-light">{step.description}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="about-image-section mt-5">
          <div className="row align-items-center">
            <div className="col-lg-6">
              <div className="about-image-wrapper">
                <img 
                    src="images/lab-neocore.png" 
                    alt="Лаборатория NeoCore" 
                    className="about-image"
                />
              </div>
            </div>
            <div className="col-lg-6">
              <h3 className="mb-4 text-white">Технологии будущего уже сегодня</h3>
              <p className="text-light mb-4">
                Наши лаборатории оснащены оборудованием последнего поколения. 
                Мы используем нанотехнологии, 3D-биопечать и искусственный интеллект 
                для создания протезов, которые неотличимы от натуральных органов.
              </p>
              <div className="row g-3">
                <div className="col-6">
                  <div className="about-stat">
                    <h4 className="text-green">50+</h4>
                    <p className="text-light">Патентов</p>
                  </div>
                </div>
                <div className="col-6">
                  <div className="about-stat">
                    <h4 className="text-green">120+</h4>
                    <p className="text-light">Учёных в команде</p>
                  </div>
                </div>
                <div className="col-6">
                  <div className="about-stat">
                    <h4 className="text-green">24/7</h4>
                    <p className="text-light">Мониторинг</p>
                  </div>
                </div>
                <div className="col-6">
                  <div className="about-stat">
                    <h4 className="text-green">ISO</h4>
                    <p className="text-light">Сертификация</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;