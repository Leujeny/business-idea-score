export interface MarketAssessment {
  id: number;
  title: string;
  placeholder: string;
  content: string;
}

export const marketAssessments: MarketAssessment[] = [
  {
    id: 1,
    title: "L'urgence",
    placeholder: "Précisez ici...",
    content: `Dans quelle mesure votre offe répond-elle à un besoin ou à un désir immédiat des invidius ?

(Louer un film n'a pas de caractère urgent alors qu'assister à la première projection officiel d'un nouveau film est d'une urgence extrême car l'évènement ne se produit qu'une fois)
  `,
  },
  {
    id: 2,
    title: "Taille du marché",
    placeholder: "Précisez ici...",
    content: `Combien de personnes sont prêtes à acheter ce genre de choses ?

(Le marché des cours de tressage de paniers en osier estr très restreint alors que celui des traitements anticancéreux est énorme)
    `,
  },
  {
    id: 3,
    title: "Le prix possible",
    placeholder: "Précisez ici...",
    content: `Quel est le prix le plus élevé qu'un acheteur type serait prêt à payer pour trouver une solution à son problèmes ?

  (Les sucettes se vendent quelques centimes, les porte-avions quelques milliards)
    `,
  },
  {
    id: 4,
    title: "Le coût d'acquisition d'un client",
    placeholder: "Précisez ici...",
    content: `Est-il facile de gagner un nouveau client ? En moyenne, combien allez-vous investir - en terme d'argent, de temps et d'énergie pour générer une vente ?

(Les restaurants situés sur des lieux de passage très fréquentés, notamment au bord des autoroutes et des nationales, n'ont guère besoin d'investir pour attirer de nouveaux clients, contraitement aux candidats qui doivent parfois dépenser des millions pour répondre à un gros appel d'offres d'infrastructure.)
  `,
  },
  {
    id: 5,
    title: "Le coût pour délivrer la valeur",
    placeholder: "Précisez ici...",
    content: `A combien estimez-vous le coût de la création de la valeur pour la délivrer en termes de temps, d'argent et d'énergie ?

(Transmettre des fichiers par Internet est quasiement gratuit, alors qu'il faut des millions pour inventer un produit et constuire une usine)
    `,
  },
  {
    id: 6,
    title: "Originalité de l'offre",
    placeholder: "Précisez ici...",
    content: `Que est le degré de singularité de votre offre comparée aux offres existantes de la concurrence et dans quelle mesure est-il facile pour vos concurrents de vous copier ?

(Il existe de nombreux salons de coiffure, mais rares sont les entreprises à proposer des voyages dans l'espace)
    `,
  },
  {
    id: 7,
    title: "La rapidité de mise sur le marché",
    placeholder: "Précisez ici...",
    content: `Avec quelle rapidité pouvez-vous créer quelque chose à vendre ?

(Vous n'avez besoin que de quelques minutes pour proposer à votre voison de tontre sa pelouse, alors que créer une manque peut prendre des années)
    `,
  },
  {
    id: 8,
    title: "L'investissement initial",
    placeholder: "Précisez ici...",
    content: `Combien allez-vous devoir investir avant d'être prêt à vendre votre produit ?

(Pour faire du ménage, vous n'avez besoin que de quelques produits de nettoyage bon marché. Mais si vous voulez exploiter une mine d'or, l'achat du terrain et le matériel d'extraction vont vous coûter des millions)
    `,
  },
  {
    id: 9,
    title: "Le potentiel de ventes additionnelles",
    placeholder: "Précisez ici...",
    content: `Pourriez-vous réaliser des ventes connexes à l'offre que vous proposez à vos clients ?

(Les clients qui achètent des rasoirs ont besoin de mousse et de lame de rechange, mais si vous achetez un frisbee, vous n'en avez pas besoin d'un autre, à moins de le perdre.)
    `,
  },
  {
    id: 10,
    title: "Le potentiel de persistance",
    placeholder: "Précisez ici...",
    content: `Une fois que vous avez créé votre offre initiale, quelle somme de travail supplémentaire allez-vous devoir lui consacrer pour continuer à la vendre ?

(Le conseil en entreprise réclame un travail continu, tandis qu'un livre peut être produit une seule fois, puis continuer de se vendre sans travail supplémentaire.)
    `,
  },
];

export function getMarketAssessmentById(id: number): MarketAssessment | undefined {
  return marketAssessments.find((need) => need.id === id);
}
