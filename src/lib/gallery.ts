/**
 * Catalogue central des médias du projet.
 *
 * Toutes les images sont servies depuis /public/images/{profil|temoignages|recompense}
 * et optimisées à la volée par next/image (AVIF/WebP + redimensionnement).
 */

export type MediaItem = {
  /** Chemin public de l'image (relatif au dossier /public). */
  src: string;
  /** Texte alternatif accessible (obligatoire pour l'accessibilité). */
  alt: string;
  /** Légende lisible affichée sous l'image. */
  caption?: string;
};

const PROFIL_FILES = [
  "1774303705870.jpg",
  "1774303746238.jpg",
  "1774303749125.jpg",
  "1787385023760.jpg",
  "1787385074427.jpg",
  "1787385084530.jpg",
  "1787385157544.jpg",
  "1787385164613.jpg",
  "1787385297187.jpg",
  "1787386116369.jpg",
  "1787386135816.jpg",
  "1787386148324.jpg",
  "1787389717650.jpg",
  "1787389806776.jpg",
  "IMG-20260820-WA0016.jpg",
  "IMG-20260820-WA0021.jpg",
  "IMG-20260820-WA0024.jpg",
  "IMG-20260820-WA0027.jpg",
  "IMG-20260820-WA0030.jpg",
  "IMG-20260820-WA0031.jpg",
] as const;

const TEMOIGNAGE_FILES = [
  "1787385369927.jpg",
  "1787386079806.jpg",
  "1787386135816.jpg",
  "1787386189666.jpg",
  "1787386196228.jpg",
  "1787386199052.jpg",
  "1787388596201.jpg",
  "1787388600484.jpg",
  "1787388616865.jpg",
  "1787389766206.jpg",
  "1787390062643.jpg",
  "1787390319671.jpg",
  "1787390323250.jpg",
  "FB_IMG_16945197719865343.jpg",
  "IMG-20240217-WA0002-2.jpg",
  "IMG-20240217-WA0004-1.jpg",
] as const;

const RECOMPENSE_FILES = [
  "1787386408536.jpg",
  "1787388667061.jpg",
  "1787389814989.jpg",
  "1787389819218.jpg",
  "1787389824779.jpg",
  "1787389829246.jpg",
  "1787389841073.jpg",
  "IMG-20260902-WA0002.jpg",
  "IMG-20260902-WA0003.jpg",
  "IMG-20260902-WA0004.jpg",
  "IMG-20260902-WA0005.jpg",
  "IMG-20260902-WA0006.jpg",
  "IMG-20260902-WA0007.jpg",
  "IMG-20260902-WA0008.jpg",
  "IMG-20260902-WA0009.jpg",
  "IMG-20260902-WA0010.jpg",
  "IMG-20260902-WA0011.jpg",
  "IMG-20260902-WA0012.jpg",
  "IMG-20260902-WA0013.jpg",
  "IMG-20260902-WA0014.jpg",
  "IMG-20260902-WA0015.jpg",
  "IMG-20260902-WA0016.jpg",
  "IMG-20260902-WA0017.jpg",
  "IMG-20260902-WA0018.jpg",
  "IMG-20260902-WA0019.jpg",
  "IMG-20260902-WA0020.jpg",
  "IMG-20260902-WA0021.jpg",
] as const;

function buildItems(
  folder: "profil" | "temoignages" | "recompense",
  files: readonly string[],
  altPrefix: string,
  captionPrefix?: string
): MediaItem[] {
  return files.map((file, index) => ({
    src: `/images/${folder}/${file}`,
    alt: `${altPrefix} — photo n°${index + 1}`,
    caption: captionPrefix ? `${captionPrefix} n°${index + 1}` : undefined,
  }));
}

/** Portraits utilisés comme avatars (témoignages, mini-slider de l'accueil). */
export const PROFIL_IMAGES: MediaItem[] = buildItems(
  "profil",
  PROFIL_FILES,
  "Portrait d'un participant du Projet Solidarité",
  "Participant"
);

/** Photos de gagnants : utilisées dans la section témoignages. */
export const TEMOIGNAGE_IMAGES: MediaItem[] = buildItems(
  "temoignages",
  TEMOIGNAGE_FILES,
  "Photo d'un gagnant du Projet Solidarité",
  "Gagnant"
);

/** Photos des récompenses déjà remises. */
export const RECOMPENSE_IMAGES: MediaItem[] = buildItems(
  "recompense",
  RECOMPENSE_FILES,
  "Récompense remise à un gagnant du Projet Solidarité",
  "Récompense"
);

/**
 * Sélection mise en avant dans le carrousel d'en-tête de la page d'accueil.
 * Mélange récompenses + gagnants pour maximiser la preuve sociale.
 */
export const HERO_SLIDES: MediaItem[] = [
  {
    src: "/images/recompense/1787388667061.jpg",
    alt: "Remise d'une récompense à un gagnant du Projet Solidarité",
    caption: "Récompense remise à un gagnant",
  },
  {
    src: "/images/temoignages/1787385369927.jpg",
    alt: "Gagnant du Projet Solidarité recevant son don",
    caption: "Un gagnant reçoit son don",
  },
  {
    src: "/images/recompense/1787386408536.jpg",
    alt: "Don spécial remis par l'équipe Projet Solidarité",
    caption: "Don spécial remis",
  },
  {
    src: "/images/temoignages/1787386079806.jpg",
    alt: "Participant du Projet Solidarité après sa victoire",
    caption: "Victoire partagée",
  },
  {
    src: "/images/recompense/1787389814989.jpg",
    alt: "Récompense officielle du Projet Solidarité",
    caption: "Récompense officielle",
  },
  {
    src: "/images/temoignages/IMG-20240217-WA0002-2.jpg",
    alt: "Photo souvenir d'un gagnant du Projet Solidarité",
    caption: "Photo souvenir d'un gagnant",
  },
  {
    src: "/images/recompense/1787389824779.jpg",
    alt: "Remise de prix du Projet Solidarité",
    caption: "Remise de prix",
  },
  {
    src: "/images/temoignages/1787388596201.jpg",
    alt: "Gagnante du Projet Solidarité présentant sa récompense",
    caption: "Gagnante et sa récompense",
  },
];

/** Photos de gagnants mises en avant dans la galerie de la page témoignages. */
export const TEMOIGNAGE_SPOTLIGHT: MediaItem[] = TEMOIGNAGE_IMAGES.slice(0, 8);

/** Récompenses mises en avant sur l'accueil et la page succès. */
export const RECOMPENSE_SPOTLIGHT: MediaItem[] = RECOMPENSE_IMAGES.slice(0, 6);
