export type Testimonial = {
  quote: string;
  author: string;
  source: string;
};

export const TESTIMONIALS: Testimonial[] = [
  { quote: '« Je recommande à tous ! Pour avoir fait affaire avec plusieurs compagnies je suis capable de dire que c\'est LA référence dans leur domaine !!! Très belle expérience, merci encore. 🔆 »', author: 'Marc-André Henry Lebel', source: 'Avis Google' },
  { quote: '« Meilleure compagnie de couverture avec qui j\'ai pu faire affaire. Service après-vente incroyable. Équipe motivée et d\'expérience. De très bons prix !!! À appeler absolument. »', author: 'Alex Lepage', source: 'Avis Google' },
  { quote: '« Nous avons eu une expérience incroyable de la soumission jusqu\'au jour des travaux. Un gros merci au président de la compagnie, qui personnellement nous a guidés tout au long de l\'exécution des travaux. »', author: 'Alexandre Granger', source: 'Avis Google' },
  { quote: '« Je recommande Couverture de la Rive-Nord sans hésitation ! Service professionnel, travail de qualité et une très belle équipe. »', author: 'Mathieu Béland', source: 'Avis Google' },
  { quote: '« Ils ont refait mon toit, j\'ai reçu un excellent service, leurs prix étaient compétitifs, je les recommande fortement, merci. »', author: 'Mathieu Chasse', source: 'Avis Google' },
  { quote: '« Superbe travail. Délais respectés et qualité incroyable. »', author: 'Yanick Gosselin', source: 'Avis Google' },
  { quote: '« Super compagnie, propriétaire extrêmement compétent et sympathique ! »', author: 'Francis Bergeron', source: 'Avis Google' },
  { quote: '« Excellent travail !! Les gars sont très professionnels et très respectueux des lieux. Je recommande fortement. »', author: 'Alexandre Blais', source: 'Avis Google' },
  { quote: '« Je recommande fortement. Ils ont le souci du travail bien fait. »', author: 'Eric Poirier', source: 'Avis Google' },
  { quote: '« Super service, très efficace et honnête, je recommande. »', author: 'Sébastien Gaudreau', source: 'Avis Google' },
  { quote: '« Une équipe à l\'écoute de ce que l\'on demande et des travaux au-delà des attentes, je recommande à 100 %. »', author: 'Keven Simon', source: 'Avis Google' },
  { quote: '« Très professionnel et ponctuel. Merci beaucoup à Kevin pour le travail. »', author: 'Guillaume Couture', source: 'Avis Google' },
];

export type Service = {
  slug: string;
  title: string;
  description: string;
  image: string;
  alt: string;
};

export const SERVICES: Service[] = [
  { slug: 'installation', title: "L'installation", description: "Toits plats et toitures neuves : membranes EPDM, TPO, ou bardeaux d'asphalte. Une installation de qualité avec des produits écologiques et durables.", image: '/services/installation.jpg', alt: 'Installation de toiture' },
  { slug: 'reparation', title: 'La réparation', description: "Infiltration d'eau, moisissure, humidité ? Intervention rapide pour stopper les dommages avant qu'ils s'aggravent.", image: '/services/reparation.jpg', alt: 'Réparation de toiture' },
  { slug: 'refection', title: 'La réfection', description: 'Toiture défectueuse, fuites, perte d\'efficacité ? Remplacement complet avec membranes blanches EPDM ou TPO de haute qualité.', image: '/services/refection.jpg', alt: 'Réfection de toiture' },
  { slug: 'inspection', title: "L'inspection", description: 'Inspections préventives annuelles par une équipe équipée pour le travail en hauteur. Plus tôt vous repérez un défaut, moins la réparation coûte.', image: '/services/inspection.jpg', alt: 'Inspection de toiture' },
  { slug: 'entretien', title: "L'entretien", description: 'Entretien annuel pour éviter les dégradations causées par les intempéries québécoises. Un partenaire sur le long terme.', image: '/services/entretien.jpg', alt: 'Entretien de toiture' },
  { slug: 'deneigement', title: 'Le déneigement', description: 'Équipement professionnel pour déneiger votre toit de manière sécuritaire. Évitez infiltrations d\'eau et fléchissement de la charpente.', image: '/services/deneigement.jpg', alt: 'Déneigement de toiture' },
  { slug: 'autres', title: 'Autres services', description: 'Nettoyage de gouttières, inspection et nettoyage de drains, calfeutrage, travaux avec nacelle, installation de lumières de Noël.', image: '/services/autres.jpg', alt: 'Autres services' },
  { slug: 'ajout-unites', title: "Ajout d'unités sur toitures", description: "Installation professionnelle d'unités mécaniques, de climatisation et de ventilation sur toitures commerciales et industrielles. Travail structuré et sécuritaire, respectant l'intégrité de votre membrane.", image: '/services/installation.jpg', alt: "Ajout d'unités sur toiture commerciale et industrielle" },
];

export type Advantage = {
  iconKey: 'house' | 'medal' | 'dollar';
  title: string;
  body: string;
};

export const ADVANTAGES: Advantage[] = [
  { iconKey: 'house',  title: 'Un service exceptionnel', body: "De l'identification de vos besoins jusqu'à la fin de vos travaux, notre équipe est à votre écoute et disponible tout le long de vos projets." },
  { iconKey: 'medal',  title: 'Une équipe compétente',  body: "Plus de 23 ans d'expérience. Nos couvreurs réalisent tous vos projets avec passion, professionnalisme et minutie." },
  { iconKey: 'dollar', title: 'Des prix compétitifs',   body: 'Un excellent rapport qualité/prix, autant pour nos services que pour nos matériaux. Soumission gratuite, sans engagement.' },
];

export const REALIZATIONS: string[] = Array.from({ length: 12 }, (_, i) => {
  const n = String(i + 1).padStart(2, '0');
  return `/realisations/realisation-${n}.jpg`;
});
