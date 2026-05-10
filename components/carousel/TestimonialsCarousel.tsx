'use client';

import { useEffect, useRef, useState } from 'react';
import { TESTIMONIALS } from '@/lib/content';

const AUTO_MS = 6000;

export function TestimonialsCarousel() {
  const [index, setIndex] = useState(0);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const touchStartX = useRef(0);

  const next = () => setIndex((i) => (i + 1) % TESTIMONIALS.length);
  const prev = () => setIndex((i) => (i - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  const to = (i: number) => setIndex(i);

  const play = () => {
    pause();
    timer.current = setInterval(next, AUTO_MS);
  };
  const pause = () => {
    if (timer.current) {
      clearInterval(timer.current);
      timer.current = null;
    }
  };

  useEffect(() => {
    play();
    return pause;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(dx) > 40) {
      if (dx < 0) next();
      else prev();
      play();
    }
  };

  return (
    <div className="testimonials" ref={containerRef} onMouseEnter={pause} onMouseLeave={play}>
      <p className="testimonials__heading">
        <span className="testimonials__heading-stars" aria-hidden="true">★★★★★</span>
        <span className="testimonials__heading-text">Ce que disent nos clients</span>
      </p>

      <div className="testimonials__viewport">
        <div
          className="testimonials__track"
          style={{ transform: `translateX(${-index * 100}%)` }}
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
        >
          {TESTIMONIALS.map((t) => (
            <article className="testimonial" key={t.author}>
              <div className="testimonial__stars" aria-label="5 étoiles sur 5">★★★★★</div>
              <blockquote className="testimonial__quote">{t.quote}</blockquote>
              <p className="testimonial__author">{t.author}</p>
              <p className="testimonial__source">{t.source}</p>
            </article>
          ))}
        </div>
      </div>

      <div className="testimonials__nav">
        <button
          className="testimonials__btn testimonials__btn--prev"
          aria-label="Témoignage précédent"
          onClick={() => { prev(); play(); }}
        >
          ‹
        </button>
        <div className="testimonials__dots">
          {TESTIMONIALS.map((_, i) => (
            <button
              key={i}
              className={`testimonials__dot ${i === index ? 'is-active' : ''}`}
              aria-label={`Témoignage ${i + 1}`}
              onClick={() => { to(i); play(); }}
            />
          ))}
        </div>
        <button
          className="testimonials__btn testimonials__btn--next"
          aria-label="Témoignage suivant"
          onClick={() => { next(); play(); }}
        >
          ›
        </button>
      </div>
    </div>
  );
}
