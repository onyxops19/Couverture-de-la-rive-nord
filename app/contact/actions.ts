'use server';

import { z } from 'zod';

const schema = z.object({
  name: z.string().min(2, 'Nom requis'),
  phone: z.string().min(10, 'Numéro de téléphone invalide'),
  email: z.string().email('Courriel invalide'),
  message: z.string().min(10, 'Message trop court'),
});

export type FormState = {
  success: boolean;
  error?: string;
};

export async function submitContact(
  _prev: FormState,
  formData: FormData,
): Promise<FormState> {
  const raw = {
    name: formData.get('name'),
    phone: formData.get('phone'),
    email: formData.get('email'),
    message: formData.get('message'),
  };

  const parsed = schema.safeParse(raw);
  if (!parsed.success) {
    const firstError = parsed.error.errors[0]?.message ?? 'Formulaire invalide';
    return { success: false, error: firstError };
  }

  const webhookUrl = process.env.MAKE_WEBHOOK_URL;
  if (!webhookUrl) {
    return { success: false, error: 'Service temporairement indisponible.' };
  }

  try {
    const res = await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(parsed.data),
    });
    if (!res.ok) throw new Error(`Webhook error ${res.status}`);
    return { success: true };
  } catch {
    return { success: false, error: 'Une erreur est survenue. Veuillez réessayer.' };
  }
}
