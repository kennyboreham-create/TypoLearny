// frontend/js/config/levels.js

export const BASIC_LEVELS = [
  { id: 1, type: 'basic', targetChars: 'fj', passScore: 100 },
  { id: 2, type: 'basic', targetChars: 'dk', passScore: 100 },
  { id: 3, type: 'basic', targetChars: 'sl', passScore: 100 },
  { id: 4, type: 'basic', targetChars: 'aq', passScore: 100 },
  { id: 5, type: 'basic', targetChars: 'gh', passScore: 100 },
  { id: 6, type: 'basic', targetChars: 'ru', passScore: 100 },
  { id: 7, type: 'basic', targetChars: 'ty', passScore: 100 },
  { id: 8, type: 'basic', targetChars: 'ei', passScore: 100 },
  { id: 9, type: 'basic', targetChars: 'wo', passScore: 100 },
  { id: 10, type: 'basic', targetChars: 'pz', passScore: 100 },
  { id: 11, type: 'basic', targetChars: 'xm', passScore: 100 },
  { id: 12, type: 'basic', targetChars: 'cn', passScore: 100 },
  { id: 13, type: 'basic', targetChars: 'vb', passScore: 100 },
  { id: 14, type: 'basic', targetChars: 'sentences', maxWordLen: 4, passScore: 100 }
];

export const ADVANCED_LEVELS = [
  { id: 15, advId: 1, type: 'adv_practice', wordLen: [3,4], wordCount: 4 },
  { id: 16, advId: 2, type: 'adv_practice', wordLen: [3,4], wordCount: 5 },
  { id: 17, advId: 3, type: 'adv_practice', wordLen: [3,5], wordCount: 5 },
  { id: 18, advId: 4, type: 'adv_practice', wordLen: [1,5], wordCount: 6 },
  { id: 19, advId: 5, type: 'adv_practice', mode: 'normal', maxLen: 5, wordCount: 5 },
  { id: 20, advId: 6, type: 'adv_practice', mode: 'normal', maxLen: 6, wordCount: 5 },
  { id: 21, advId: 7, type: 'adv_practice', mode: 'normal', maxLen: 99, wordCount: 5 },
  { id: 22, advId: 8, type: 'adv_practice', mode: 'normal', maxLen: 99, wordCount: 6 },
  { id: 23, advId: 9, type: 'adv_test', wordLen: [3,5], timeLimit: 30, passWords: 30 },
  { id: 24, advId: 10, type: 'adv_test', wordLen: 'any', timeLimit: 30, passWords: 30 }
];