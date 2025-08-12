export type SearchKind = 'tip' | 'prompt';
export type SearchHit = { kind: SearchKind; slug: string; title: string; shortDescription: string };

// Stub pour l'environnement de test: retourne une liste vide
export function searchAll(_query: string): SearchHit[] {
  return [];
}
