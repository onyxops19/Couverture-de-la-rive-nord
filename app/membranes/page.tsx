import type { Metadata } from 'next';
import { PageHeader } from '@/components/ui/PageHeader';
import { MembranesAlternating } from '@/components/sections/MembranesAlternating';
import { FinalCTA } from '@/components/sections/FinalCTA';

export const metadata: Metadata = {
  title: 'Membranes EPDM et TPO — Couverture de la Rive-Nord',
  description: 'Expert en toiture à membrane blanche EPDM et TPO depuis plus de 15 ans à Laval et Montréal-Nord. Durée de vie jusqu\'à 50 ans, écologique et écoénergétique.',
};

export default function MembranesPage() {
  return (
    <main>
      <PageHeader
        title="Membranes EPDM & TPO"
        lead="La spécialité de la Rive-Nord depuis plus de 15 ans"
      />
      <MembranesAlternating />
      <FinalCTA />
    </main>
  );
}
