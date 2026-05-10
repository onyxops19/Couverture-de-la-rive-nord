import type { Metadata } from 'next';
import { Raleway, Open_Sans } from 'next/font/google';
import { PromoBar } from '@/components/layout/PromoBar';
import { StickyNav } from '@/components/layout/StickyNav';
import { Footer } from '@/components/layout/Footer';
import { LocalBusinessSchema } from '@/components/seo/LocalBusinessSchema';
import './globals.css';

const raleway = Raleway({
  subsets: ['latin'],
  weight: ['700'],
  variable: '--font-raleway',
  display: 'swap',
});

const openSans = Open_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-open-sans',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://couverturerivenord.com'),
  title: {
    default: 'Couverture de la Rive-Nord — Couvreur à Laval et Montréal-Nord',
    template: '%s — Couverture de la Rive-Nord',
  },
  description: 'Compagnie de toiture à Laval et Montréal-Nord depuis plus de 23 ans. Spécialiste des membranes blanches EPDM et TPO pour toits plats. Membre APCHQ, certifié Firestone.',
  openGraph: {
    type: 'website',
    locale: 'fr_CA',
    siteName: 'Couverture de la Rive-Nord',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr-CA" className={`${raleway.variable} ${openSans.variable}`}>
      <body>
        <LocalBusinessSchema />
        <PromoBar />
        <StickyNav />
        {children}
        <Footer />
      </body>
    </html>
  );
}
