export interface Card {
  sv: string;
  en: string;
}

export interface Deck {
  id: string;
  label: string;
  emoji: string;
  colorKey: string;
  cards: Card[];
}

import decksData from "./flashcards.json";
export const DECKS: Deck[] = decksData as Deck[];
