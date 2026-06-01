import type { FC } from 'react';
import { TestimonialCard } from '../components/TestimonialCard';
import { useTestimonialsViewModel } from '../../viewmodels/useTestimonialsViewModel';

export const TestimonialsSection: FC = () => {
  const { slides, index, go, next, prev, startAutoplay, stopAutoplay } =
    useTestimonialsViewModel();

  return (
    <section className="test-section" id="test" data-reveal>
      <div className="sec-head">
        <div>
          <div className="sec-head__meta">— Avaliações verificadas · 4.9 ★</div>
          <h2 className="sec-head__title">
            O que os clientes <span className="y">contam</span>.
          </h2>
        </div>
        <a className="sec-head__link" href="#">
          Ver todas as 184 avaliações →
        </a>
      </div>

      <div
        className="test-slider"
        onMouseEnter={stopAutoplay}
        onMouseLeave={startAutoplay}
        aria-roledescription="carrossel"
      >
        {/* Track */}
        <div
          className="test-track"
          style={{ transform: `translateX(-${index * 100}%)` }}
        >
          {slides.map((slide, si) => (
            <div
              key={si}
              className="test-slide"
              role="group"
              aria-roledescription="slide"
              aria-label={`Slide ${si + 1} de ${slides.length}`}
            >
              {slide.map((t) => (
                <TestimonialCard key={t.name} testimonial={t} />
              ))}
            </div>
          ))}
        </div>

        {/* Navigation */}
        <div className="test-nav">
          <div className="test-dots" role="tablist" aria-label="Slides">
            {slides.map((_, i) => (
              <button
                key={i}
                role="tab"
                aria-selected={i === index}
                aria-label={`Ir para slide ${i + 1}`}
                className={`test-dot${i === index ? ' test-dot--active' : ''}`}
                onClick={() => go(i)}
              />
            ))}
          </div>

          <div className="arrows">
            <button className="arr" onClick={prev} aria-label="Slide anterior">
              ‹
            </button>
            <button className="arr" onClick={next} aria-label="Próximo slide">
              ›
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
