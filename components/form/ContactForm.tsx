'use client';

import { useFormState, useFormStatus } from 'react-dom';
import { submitContact, type FormState } from '@/app/contact/actions';
import { Button } from '@/components/ui/Button';

const SERVICES = [
  'Installation',
  'Réparation',
  'Réfection',
  'Inspection',
  'Entretien',
  'Déneigement',
  'Autres',
];

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <div className="form-submit">
      <Button variant="gold" type="submit" disabled={pending}>
        {pending ? 'Envoi en cours…' : 'Envoyer ma demande'}
      </Button>
    </div>
  );
}

const initial: FormState = { success: false };

export function ContactForm() {
  const [state, action] = useFormState(submitContact, initial);

  if (state.success) {
    return (
      <p className="form-success" role="status">
        Merci ! Nous vous contacterons sous peu.
        <span className="form-success__note">Un représentant vous appellera dans les 24h.</span>
      </p>
    );
  }

  return (
    <form className="contact-form" action={action} noValidate>
      {state.error && (
        <p className="form-success" role="alert" style={{ borderColor: '#c0392b', background: 'rgba(192,57,43,0.08)', color: '#c0392b' }}>
          {state.error}
        </p>
      )}

      <div className="form-row">
        <div className="form-field">
          <label htmlFor="name">Nom complet <span className="req">*</span></label>
          <input id="name" name="name" type="text" required autoComplete="name" placeholder="Jean Tremblay" />
        </div>
        <div className="form-field">
          <label htmlFor="phone">Téléphone <span className="req">*</span></label>
          <input id="phone" name="phone" type="tel" required autoComplete="tel" placeholder="(514) 000-0000" />
        </div>
      </div>

      <div className="form-field">
        <label htmlFor="email">Courriel <span className="req">*</span></label>
        <input id="email" name="email" type="email" required autoComplete="email" placeholder="jean@exemple.com" />
      </div>

      <div className="form-field">
        <label htmlFor="address">Adresse des travaux</label>
        <input id="address" name="address" type="text" autoComplete="street-address" placeholder="123 Rue Principale, Laval, QC" />
      </div>

      <fieldset className="form-fieldset">
        <legend className="form-fieldset__legend">Type de services</legend>
        <div className="form-checkboxes">
          {SERVICES.map((service) => (
            <label key={service} className="form-checkbox">
              <input type="checkbox" name="services" value={service} />
              <span>{service}</span>
            </label>
          ))}
        </div>
      </fieldset>

      <div className="form-field">
        <label htmlFor="message">Message <span className="req">*</span></label>
        <textarea id="message" name="message" required rows={5} placeholder="Décrivez votre projet…" />
      </div>

      <SubmitButton />
    </form>
  );
}
