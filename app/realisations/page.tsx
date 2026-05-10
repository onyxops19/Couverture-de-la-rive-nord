import type { Metadata } from 'next';
import { PageHeader } from '@/components/ui/PageHeader';
import { RealizationsGallery } from '@/components/sections/RealizationsGallery';
import { FinalCTA } from '@/components/sections/FinalCTA';

export const metadata: Metadata = {
  title: 'Nos réalisations — Couverture de la Rive-Nord',
  description: 'Découvrez nos projets de toiture à membrane blanche EPDM et TPO à Laval et Montréal-Nord. Plus de 23 ans de réalisations.',
};

export default function RealisationsPage() {
  return (
    <main>
      <PageHeader
        title="Nos réalisations"
        lead="Plus de 23 ans de projets de toiture à membrane blanche"
      />
      <RealizationsGallery count={12} variant="full" showLink={false} />
      <FinalCTA />
    </main>
  );
}
