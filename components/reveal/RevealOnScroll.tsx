'use client';

import { useEffect, useRef, useState } from 'react';

type Props = {
  as?: keyof JSX.IntrinsicElements;
  className?: string;
  delayMs?: number;
  children: React.ReactNode;
};

export function RevealOnScroll({ as: Tag = 'div', className = '', delayMs, children }: Props) {
  const ref = useRef<HTMLElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!ref.current) return;
    const el = ref.current;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true);
            obs.unobserve(el);
          }
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -50px 0px' }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const finalClassName = `reveal ${visible ? 'is-visible' : ''} ${className}`.trim();
  const style = delayMs ? { transitionDelay: `${delayMs}ms` } : undefined;

  // @ts-expect-error — dynamic Tag is fine, TypeScript can't narrow ref type
  return <Tag ref={ref} className={finalClassName} style={style}>{children}</Tag>;
}
