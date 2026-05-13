'use client';

import { useEffect, useRef, useState } from 'react';
import { RevealOnScroll } from '@/components/reveal/RevealOnScroll';
import { CertBadge } from '@/components/ui/CertBadge';

const STATS = [
  { target: 25, suffix: '+',     label: "Années d'expérience" },
  { target: 50, suffix: ' ans',  label: 'Durée de vie membrane EPDM' },
];

function StatNumber({ target, suffix }: { target: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement | null>(null);
  const [value, setValue] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (!ref.current) return;
    const el = ref.current;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const start = performance.now();
            const dur = 1500;
            const tick = (now: number) => {
              const t = Math.min((now - start) / dur, 1);
              const eased = 1 - Math.pow(1 - t, 3);
              setValue(Math.round(target * eased));
              if (t < 1) requestAnimationFrame(tick);
              else setDone(true);
            };
            requestAnimationFrame(tick);
            obs.unobserve(el);
          }
        });
      },
      { threshold: 0.5 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [target]);

  return (
    <span ref={ref} className={`stat__num ${done ? 'is-counted' : ''}`}>
      {value}{suffix}
    </span>
  );
}

export function StatsSection() {
  return (
    <section className="section section--dark">
      <div className="container">
        <RevealOnScroll as="h2" className="section__title section__title--centered">
          Plus de 25 ans<br />
          au service de votre toiture
        </RevealOnScroll>

        <RevealOnScroll as="p" className="section__lead">
          Membre de l&apos;APCHQ, Couverture de la Rive-Nord œuvre depuis 25 ans à Laval, Montréal-Nord, Terrebonne et la Rive-Nord. Résidentiel comme commercial, notre équipe installe des membranes blanches durables, écologiques et rentables.
        </RevealOnScroll>

        <ul className="stats stagger">
          {STATS.map((s, i) => (
            <RevealOnScroll as="li" className="stat" delayMs={i * 100} key={s.label}>
              <StatNumber target={s.target} suffix={s.suffix} />
              <span className="stat__label">{s.label}</span>
            </RevealOnScroll>
          ))}
        </ul>

        <RevealOnScroll className="cert-badges">
          <CertBadge>Membre APCHQ</CertBadge>
        </RevealOnScroll>
      </div>
    </section>
  );
}
