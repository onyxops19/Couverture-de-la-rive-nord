import Link from 'next/link';
import type { ComponentProps } from 'react';

type Variant = 'gold' | 'outline-white' | 'outline-charcoal' | 'charcoal';

type Props = {
  variant?: Variant;
  href?: string;
  external?: boolean;
  className?: string;
  children: React.ReactNode;
} & Omit<ComponentProps<'button'>, 'className' | 'children'>;

export function Button({
  variant = 'gold',
  href,
  external,
  className = '',
  children,
  ...rest
}: Props) {
  const classes = `btn btn--${variant} ${className}`.trim();

  if (href) {
    if (external || href.startsWith('http') || href.startsWith('tel:') || href.startsWith('mailto:')) {
      return (
        <a className={classes} href={href} {...(external ? { target: '_blank', rel: 'noopener' } : {})}>
          {children}
        </a>
      );
    }
    return <Link className={classes} href={href}>{children}</Link>;
  }

  return <button className={classes} {...rest}>{children}</button>;
}
