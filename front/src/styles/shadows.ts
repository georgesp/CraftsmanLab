// Ombres centralisées pour tous les composants
// Définit les box-shadow utilisées dans le site pour uniformiser les effets visuels

export const SHADOWS = {
  none: 'none',
  
  // Ombre légère pour la description box de la page d'accueil
  light: '0 8px 28px rgba(16, 24, 40, 0.06)',
  
  // Ombre au survol des boutons
  button: '0 4px 12px rgba(0, 0, 0, 0.15)',
  
  // Ombre pour les chips de mots-clés sélectionnés
  chipSelected: '0 1px 6px rgba(2, 168, 233, 0.25)',

  // Refonte « Atelier adouci »
  cardHover: '0 14px 30px -16px rgba(17,21,29,.25)', // survol carte (+ translateY(-2px))
  codeWindow: '0 30px 60px -30px rgba(15,20,32,.6)', // fenêtre de code hero
};
