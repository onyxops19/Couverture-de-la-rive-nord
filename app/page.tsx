import { Hero } from '@/components/sections/Hero';
import { ValueWithTestimonials } from '@/components/sections/ValueWithTestimonials';
import { StatsSection } from '@/components/sections/StatsSection';
import { ServicesGrid } from '@/components/sections/ServicesGrid';
import { InlineCTAStrip } from '@/components/sections/InlineCTAStrip';
import { MembranesAlternating } from '@/components/sections/MembranesAlternating';
import { AdvantagesSection } from '@/components/sections/AdvantagesSection';
import { RealizationsGallery } from '@/components/sections/RealizationsGallery';
import { FinalCTA } from '@/components/sections/FinalCTA';

export default function HomePage() {
  return (
    <main>
      <Hero />
      <ValueWithTestimonials />
      <StatsSection />
      <ServicesGrid />
      <InlineCTAStrip />
      <MembranesAlternating />
      <AdvantagesSection />
      <RealizationsGallery />
      <FinalCTA />
    </main>
  );
}
