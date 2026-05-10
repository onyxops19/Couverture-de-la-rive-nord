import type { Metadata } from 'next';
import { PageHeader } from '@/components/ui/PageHeader';
import { ServicesGrid } from '@/components/sections/ServicesGrid';
import { FinalCTA } from '@/components/sections/FinalCTA';

export const metadata: Metadata = {
  title: 'Nos services de toiture — Couverture de la Rive-Nord',
  description: 'Installation, réparation, réfection, inspection, entretien et déneigement de toiture à Laval et Montréal-Nord. Spécialiste des membranes EPDM et TPO.',
};

export default function ServicesPage() {
  return (
    <main>
      <PageHeader
        title="Nos services"
        lead="Installation · Réparation · Réfection · Inspection · Entretien"
      />
      <ServicesGrid />
      <FinalCTA />
    </main>
  );
}
