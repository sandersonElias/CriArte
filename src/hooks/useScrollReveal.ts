import { useEffect } from 'react';
import { useRouterContext } from '../contexts/RouterContext';

export function useScrollReveal() {
  const { route } = useRouterContext();

  useEffect(() => {
    const timer = setTimeout(() => {
      const els = document.querySelectorAll<HTMLElement>('[data-reveal]');
      if (!els.length) return;

      const io = new IntersectionObserver(
        (entries) => {
          entries.forEach((e) => {
            if (e.isIntersecting) {
              const delay = Number(
                (e.target as HTMLElement).dataset.revealDelay ?? 0,
              );
              setTimeout(() => e.target.classList.add('is-visible'), delay);
              io.unobserve(e.target);
            }
          });
        },
        { threshold: 0.12, rootMargin: '0px 0px -40px 0px' },
      );

      els.forEach((el) => io.observe(el));

      return () => io.disconnect();
    }, 150);

    return () => clearTimeout(timer);
  }, [route]);
}
