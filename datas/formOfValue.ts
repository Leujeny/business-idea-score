export interface FormOfValue {
  id: number;
  title: string;
  placeholder: string;
  content: string;
}

export const formOfValues: FormOfValue[] = [
  {
    id: 1,
    title: "Produit",
    placeholder: "Précisez ici...",
    content: `Un produit est une forme de valeur tangible. Pour faire fonctionner une entreprise orientée produit, vous devez :
    1. Créer une article tangible capable de séduire les gens.
    2. Produire cet article avec un coût aussi bas que possible tout en maintenant un niveau de qualité acceptable.
    3. Vendre un maximum d'unités à un prix aussi élevé que le marché accepte.
    4. Avoir suffisamment de stock pour satisfaire les commmandes au fur et à mesure

ex: Livre, Logiciel, Aliments, ect...
  `,
  },
  {
    id: 2,
    title: "Service",
    placeholder: "Précisez ici...",
    content: `Un service consiste à aider ou assister quelqu'un en échange d'une rétribution. Si vous voulez créer de la valeur via un Service, vous devez petre capable d'apporter un avantage quelconque à votre client.
Pour être prospère, une entreprise orientée service doit :
    1. Avoir des employées qui possèdent une compétence, un talent ou une capacité que les clients réclamment mais ne peuvent pas ou ne veulent pas mettre en oeuvre eux-mêmes.
    2. Veiller à ce que le service qu'elle offre soit toujours de qualité optimale
    3. Attirer des clients et les fidéliser.

ex: Salon de coiffure, Médecins, Désigner, ect...
    `,
  },
  {
    id: 3,
    title: "Ressource partagée",
    placeholder: "Précisez ici...",
    content: `Une ressource partagée est une bien durable accessible à de nombreux utilisateurs.
Les Ressources partagées vous permettent de créer un bien une fois pour toutes et de faire payer son utilisation à vos clients.
Pour créer une Ressource partagée qui vous rapporte, vous devez :
    1. Créer un bien auquel des clients vuelent avoir accès
    2. Servir un maximum d'utilisateurs sans nuire à la qualité de leur expérience invidividuelle.
    3. Fixer un tarif suffisant qui vous permette de maintenir et d'améliorer dans le temps cette ressource partagée.
  
ex: Club de gym, Musées, Parcs de loisirs, ect...
    `,
  },
  {
    id: 4,
    title: "Abonnement",
    placeholder: "Précisez ici...",
    content: `Un abonnement fournit un avantage prédéfini valable dans le durée en échange d'une cotisation périodique. Les avantages en qeustion peuvent être tangible ou intengible.
Pour créer un abonnnement qui fonctionne bien, vous devez :
  1. Distribuer une valeur significative à chacun de vos abonnées de manière régulière.
  2. Développer une base d'abonnés et attirer continuellement de nouveaux abonnée pour remplacer ceux qui résilient leur abonnement.
  3. Facturer périodiquement vos clients
  4. Fidéliser chacun de vos abonnées le plus longtemps possible.

ex: Video à la demande, IA proffessionnel, ect...
    `,
  },
  {
    id: 5,
    title: "Revente",
    placeholder: "Précisez ici...",
    content: `La revente consiste à acheter un bien à un grossiste, puis à le vendre à un détaillant à un prix plus élevé. C'est ainsi que fonctionnent les distributeurs:
Ils achètent ce qu'ils vendent à d'autres entreprises, puis revendent chaque article plus cher qu'ils l'ont acheté.
Pour créer de la valeur en tant que revendeur, vous devez :
  1. Acheter un produit à un prix aussi bas que possible, généralement à un prix de gros.
  2. Conserver ce produit en bon état jusqu'à ce que vous le vendiez, les biens endommagés sont invendables.
  3. Trouver des acheteurs potentiels aussi rapidement que possible pour limiter les frais de stockage.
  4. Vendre le produit à un prix aussi élevé que possible, de préférence plusieurs fois le prix d'achat

  ex: Entrepris de la distribution (Carrefour, Walmart), ect..
    `,
  },
  {
    id: 6,
    title: "Location",
    placeholder: "Précisez ici...",
    content: `Dans le cadre d'une location, une personne acquiert un bien et autorise une autre personne à l'utiliser pendant un certain temps moyennant un certain prix.
Tout bien, ou presque peut faire l'object d'une location à condition d'être suffisamment durable pour résister à une utilisation pendant une durée suffisante.
Pour créer de la valeur via une location, vous devez :
  1. Aquérir une bien que d'autres personnes veulent utiliser
  2. Donner l'utilisation temporaire de ce bien à un client qui accepte vos conditions
  3. Vous protéger d'évènements imprévus ou de circonstances défavorables, notamment de la parte de ce bien ou du dommage qui peut lui être causé.
  `,
  },
  {
    id: 7,
    title: "Représentation commercial",
    placeholder: "Précisez ici...",
    content: `La représentation commercial implique la commercialisation et la vente d'un nbien que vous ne possédez pas. Au lieu de créer de la valeur par vous-même, vous faites équipe avec une personne qui propse de la valeur, puis vous vous efforcez de trouver un acheteur.
En échange de la nouvelle relation que vous établissez entre le vendeur et l'acheteur, vous percevez une commission ou des honoraires.
Pour créer de la valeur via une représentation, vous devez :
  1. Trouver un vendeur qui a quelque chose de valable à vendre.
  2. Etablir le contact avec des acheteurs potentiels et instaurer une relation de confiance
  3. Négocier jusqu'à trouver un accord sur les conditions de vente
  4. Toucher la commission convenue entre le vendeur et vous

ex: Agents littéraires, agence d'intérim, ect...
  `,
  },
  {
    id: 8,
    title: "Agrégation d'un public",
    placeholder: "Précisez ici...",
    content: `L'agrégation d'un public consiste à attirer l'attention d'une groupe d'individus aux caractéristiques similaires, puis à vendre l'accès à ce public à une tierce personne.
Puisque l'attention estlimitée et possède une valeur, rassembler une groupe d'invididus partageant un profil donnée est précieux pour les entreprises désireuses de capter leur attention.
Pour créer de la valeur via une représentation, vous devez :
  1. Identifier un groupe d'indidivus aux caractéristiques ou aux interêts communs.
  2. Trouver un moyen d'attirer constemment et durablement l'attention de ce groupe d'individu.
  3. Trouver des tierces personnes qui souhaitent acheter l'attention de ce public.
  4. Vendre l'accès à ce public sans l'aliéner

ex: Forum, Magazines, Conférence, ect...
  `,
  },
  {
    id: 9,
    title: "Emprunt",
    placeholder: "Précisez ici...",
    content: `Un emprunt est un accord qui autorise un certaines quantité de ressources pendant une période donnée.
En échange, l'emprunteur doit verser au prêteur des paiements échelonnées sur période déterminée qui équivalent à la somme prêtée initialement majorée d'une taux d'intérêt fixé d'avance.
Pour créer de la valeur via une emprunt, vous devez :
  1. Avoir une certaine somme d'argent à prêter.
  2. Trouver des peronnes qui souhaitent emprunter cet argent.
  3. Fixer un taux d'intéret qui vous rémunère suffisamment pour le prêt que vous consentez.
  4. Envisager la possibilité que l'emprunter ne rembourse pas son emprunt et vous protéger cette éventualité.

ex: Forum, Magazines, Conférence, ect...
  `,
  },
  {
    id: 10,
    title: "Option",
    placeholder: "Précisez ici...",
    content: `Une option vous donne le droit, et non pas l'obligation, de réaliser quelque chose de féini à l'avance dans une période donnée moyennant le paiement d'une sommes.
On a tendance à ne voir les Options que sur les marchés financiers mais elles sont partout.
Pour créer de la valeur via une option, vous devez :
  1. Identifier quelqeu chose que les individus pourraient aimer faire dans le futur.
  2. Offir à des acheteurs potentiles le droit de réaliser cette chose dans un délai fixé d'avance
  3. Convaincre les acheteurs potentiels que l'option justifie le prix demandé.
  4. Respecter la date limite d'exécution de l'action convenue

ex: Place de cinéma, place de concert, Bon de réduction, ect...
  `,
  },
  {
    id: 11,
    title: "Assurance",
    placeholder: "Précisez ici...",
    content: `L'assurance implique un transfert de risque de l'acheteur au vendeur. L'assureur accepte de couvrir un risque de dommage à l'assuré moyennant la paiement d'une prime.
Si le risque en question se réaliste, c'est l'assureur qui doit payer la facture et indemniser l'assuré. Si le risque ne se réalise pas, l'assurance garde l'argent versé par l'assuré.
Pour créer de la valeur via une option, vous devez :
  1. Signer un contrat avec l'assuré par lequel vous prenez en charge le risque qu'il subisse un dommage (une perte, par exemple).
  2. Evaluer le risque de survenue du dommage à l'aide des données disponibles.
  3. Percevoir les sommes définies et versées par l'assuré (les primes).
  4. Indemniser l'assuré en cas de réalisation du risque ?
  `,
  },
  {
    id: 12,
    title: "Capital",
    placeholder: "Précisez ici...",
    content: `Le capital est l'achat d'une participation dans une entreprise. pour les parties qui ont des ressources à affecter, founir des capitaux est un moyen d'aider les propriétaires d'entreprises à développer leur activité ou pénétrer de nouveaux marchés.
Les invest
Pour créer de la valeur via un capital, vous devez :
  1. Avoir des ressources disponibles à investir.
  2. Trouver une entreprise prometteuse dans laquelle vous seriez prêt à investir.
  3. Estimer la valeur actuelle et future de cette entreprise, ainsi que son risque de faillite qui signifierait la perte de votre capital?
  4. Négocier la part du capital que vous allez détenir en échange du montant du capital que vous investissez

ex: Investissemnet, business angels, capital-risque, ect...
  `,
  },
];

export function getFormOfValueById(id: number): FormOfValue | undefined {
  return formOfValues.find((formOfValue) => formOfValue.id === id);
}
