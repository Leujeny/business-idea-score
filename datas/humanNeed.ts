export interface HumanNeed {
  id: number;
  title: string;
  placeholder: string;
  content: string;
}

export const humanNeeds: HumanNeed[] = [
  {
    id: 1,
    title: "Besoin d'acquérir",
    placeholder: "Ex: richesse...",
    content: `Le besoin d'acquérir correspond au besoin d'obtenir ou d'accumuler aussi bien des objects physiques que des qualités immatérielles, tel que :
    - Un statut social
    - Du pouvoir
    - De l'influence

Les entreprises qui nous promettent de nous rendre riches, célèbres, influents ou puissants exploitent ce besoin. 
  `,
  },
  {
    id: 2,
    title: "Besoin de se relier",
    placeholder: "Précisez ici...",
    content: `Le besoin de se relier correspond au besoin d'entrée en relation les autres pour nous sentir appréciées, valorisés et aimés.
Les activités fondés sur le besoin de nous relier incluent :
- La restauration
- Les conférences
- L'évènementiel
- Les services de rencontre.

Les entreprises qui nous promettent de faire de nous des individus séduisants, appréciés ou très estimés exploitent ce besoin.
    `,
  },
  {
    id: 3,
    title: "Besoin d'apprendre",
    placeholder: "Précisez ici...",
    content: `Le besoin d'apprendre correspond au besoin de satisfaire notre curiosité. les activités fondées sur le besoin d'apprendre incluent :
- Les universités
- La formation
- L'édition

Les entreprises qui nous promettent d'améliorer nos connaissances ou nos compétences exploitent ce besoin.
    `,
  },
  {
    id: 4,
    title: "Besoin de se défendre",
    placeholder: "Précisez ici...",
    content: `Le besoin de se défendre correspond au besoin de se protéger, de protéger nos proches et de défendre notre territoire.
Les activités fondées sur le besoin de nous défendre incluent: 
- Les alarmes
- Les systèmes de surveillances
- Les assurances
- La formation aux arts martiaux
- Les services juridiques

Les entreprises qui nous promettent d'assurer notre sécurité, d'élimiter un problème ou d'empêcher la survenue d'évènements nuisibles exploitent ce besoin.
  `,
  },
  {
    id: 5,
    title: "Besoin de ressentir",
    placeholder: "Précisez ici...",
    content: `Le besoin de ressentir correspond au besoin de nouvelles stimulations sensorielles, d'expériences émotionnelles intense, de plaisir, d'excitation, de divertissement  et d'anticipation.
Les activités basées sur le besoun d'éprouver incluent :
- La restauration
- Le cinéma
- Les jeux
- Les concerts
- Les évènements sportifs

Les entreprises qui nous promettent de nous procurer du plaisir, de nous faire vibrer ou qui stimulent nos envies exploitent ce besoin.
    `,
  },
];

export function getHumanNeedById(id: number): HumanNeed | undefined {
  return humanNeeds.find((need) => need.id === id);
}
