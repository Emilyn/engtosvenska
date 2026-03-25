export interface VowelVariant {
  ipa: string;
  hint: string;
  word: string;
  meaning: string;
  pron: string;
}

export interface VowelData {
  letter: string;
  colorKey: string;
  short: VowelVariant;
  long: VowelVariant;
}

import vowelsData from "./vowels.json";
export const VOWELS: VowelData[] = vowelsData as VowelData[];
