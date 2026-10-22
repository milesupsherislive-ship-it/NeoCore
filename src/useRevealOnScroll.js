import { useEffect, useRef } from 'react';

/**
 * Однократная анимация появления при прокрутке через IntersectionObserver.
 * Возвращает ref для корневого элемента секции; внутри него элементы selector
 * получают класс `reveal-hidden` до появления в зоне видимости и класс
 * `revealed` (однократно) при пересечении. После показа элемент «забывается» —
 * повторной работы нет. Наблюдатель отключается при размонтировании.
 */
export default function useRevealOnScroll(selector, options) {
  const rootRef = useRef(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return undefined;

    const elements = Array.from(root.querySelectorAll(selector));

    // prefers-reduced-motion: сразу показываем, без наблюдателя
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduceMotion || typeof IntersectionObserver === 'undefined') {
      elements.forEach((el) => el.classList.add('revealed'));
      return undefined;
    }

    elements.forEach((el) => el.classList.add('reveal-hidden'));

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -80px 0px', ...(options || {}) }
    );

    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [selector]);

  return rootRef;
}
