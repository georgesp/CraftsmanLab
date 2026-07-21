import { COLORS } from '../../styles';

// Rubriques du site — chaque rubrique porte sa couleur, son fond et sa bordure.
export type Rubric = 'tips' | 'prompts' | 'news';

export interface RubricTheme {
  fg: string; // couleur d'accent (texte, border-left, action)
  bg: string; // fond clair (chips, encadrés)
  border: string; // bordure des chips/encadrés
}

export const RUBRICS: Record<Rubric, RubricTheme> = {
  tips: {
    fg: COLORS.atelier.tips,
    bg: COLORS.atelier.tipsBg,
    border: COLORS.atelier.tipsBorder,
  },
  prompts: {
    fg: COLORS.atelier.prompts,
    bg: COLORS.atelier.promptsBg,
    border: COLORS.atelier.promptsBorder,
  },
  news: {
    fg: COLORS.atelier.news,
    bg: COLORS.atelier.newsBg,
    border: COLORS.atelier.newsBorder,
  },
};

// Badges illustrations disponibles (fichiers /illus-*.svg dans public/).
export type IllusName =
  | 'code'
  | 'layers'
  | 'blueprint'
  | 'tools'
  | 'prompt'
  | 'book';
