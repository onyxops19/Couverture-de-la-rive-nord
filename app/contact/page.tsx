import type { Metadata } from 'next';
import { PageHeader } from '@/components/ui/PageHeader';
import { ContactForm } from '@/components/form/ContactForm';
import { SITE } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Contactez-nous — Couverture de la Rive-Nord',
  description: 'Obtenez une soumission gratuite de notre équipe de couvreurs à Laval et Montréal-Nord. Appelez le (514) 835-7617 ou remplissez notre formulaire.',
};

export default function ContactPage() {
  return (
    <main>
      <PageHeader
        title="Contactez-nous"
        lead="Soumission gratuite et sans engagement"
      />

      <section className="section section--light">
        <div className="container">
          <div className="contact-grid">
            {/* Left: form */}
            <div>
              <h2 className="contact__heading">Demandez votre soumission</h2>
              <p className="contact__intro">
                Remplissez le formulaire ci-dessous et nous vous rappellerons
                dans les 24&nbsp;heures. Vous pouvez aussi nous appeler
                directement au{' '}
                <a href={`tel:${SITE.phoneRaw}`}>{SITE.phone}</a>.
              </p>
              <ContactForm />
            </div>

            {/* Right: info + map */}
            <div>
              <div className="contact-info-card">
                <h2 className="contact__heading">Nos coordonnées</h2>
                <ul className="contact-info-list">
                  <li>
                    <span className="contact-info-list__label">Téléphone</span>
                    <a href={`tel:${SITE.phoneRaw}`} className="contact-info-list__value">{SITE.phone}</a>
                  </li>
                  <li>
                    <span className="contact-info-list__label">Courriel</span>
                    <a href={`mailto:${SITE.email}`} className="contact-info-list__value">{SITE.email}</a>
                  </li>
                  <li>
                    <span className="contact-info-list__label">Adresse</span>
                    <span className="contact-info-list__value">
                      {SITE.address.street}<br />
                      {SITE.address.city}, {SITE.address.region} {SITE.address.postal}
                    </span>
                  </li>
                  <li>
                    <span className="contact-info-list__label">Zones desservies</span>
                    <span className="contact-info-list__value">{SITE.zones.join(' · ')}</span>
                  </li>
                </ul>
                <div className="contact-info-certs">
                  {SITE.certifications.map((cert) => (
                    <span key={cert} className="cert-badge">{cert}</span>
                  ))}
                </div>
              </div>

              <div className="contact-map">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2793.4!2d-73.713!3d45.699!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4cc920c8c8d!2s3776+Rue+Georges+Corbeil%2C+Terrebonne%2C+QC!5e0!3m2!1sfr!2sca!4v1"
                  width="100%"
                  height="280"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Couverture de la Rive-Nord — 3776 Rue Georges Corbeil, Terrebonne"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
