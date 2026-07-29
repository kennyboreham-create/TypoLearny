const BASIC_LEVELS = [
  { id: 1, label: 'Level 1', letters: 'fj' },
  { id: 2, label: 'Level 2', letters: 'dk' },
  { id: 3, label: 'Level 3', letters: 'sl' },
  { id: 4, label: 'Level 4', letters: 'aq' },
  { id: 5, label: 'Level 5', letters: 'gh' },
  { id: 6, label: 'Level 6', letters: 'ru' },
  { id: 7, label: 'Level 7', letters: 'ty' },
  { id: 8, label: 'Level 8', letters: 'ei' },
  { id: 9, label: 'Level 9', letters: 'wo' },
  { id: 10, label: 'Level 10', letters: 'pz' },
  { id: 11, label: 'Level 11', letters: 'xm' },
  { id: 12, label: 'Level 12', letters: 'cn' },
  { id: 13, label: 'Level 13', letters: 'vb' },
  { id: 14, label: 'Level 14', letters: 'sentences' }
];

const ADVANCED_LEVELS = [
  { id: 101, label: 'Advanced 1', description: '3 to 4 letter easy words (4 words)', words: ['cat', 'dog', 'sun', 'map'] },
  { id: 102, label: 'Advanced 2', description: '3 to 4 letter easy words (5 words)', words: ['red', 'box', 'pen', 'car', 'hat'] },
  { id: 103, label: 'Advanced 3', description: '3 to 5 letter easy words (5 words)', words: ['plant', 'stone', 'water', 'grass', 'river'] },
  { id: 104, label: 'Advanced 4', description: 'up to 5 letter easy words (6 words)', words: ['apple', 'grape', 'smile', 'table', 'candy', 'light'] },
  { id: 105, label: 'Advanced 5', description: 'up to 5 letter normal words (5 words)', words: ['train', 'storm', 'music', 'magic', 'cloud'] },
  { id: 106, label: 'Advanced 6', description: 'up to 6 letter normal words (5 words)', words: ['forest', 'rocket', 'silver', 'garden', 'planet'] },
  { id: 107, label: 'Advanced 7', description: 'any word normal difficulty (5 words)', words: ['journey', 'bridge', 'winter', 'thunder', 'mirror'] },
  { id: 108, label: 'Advanced 8', description: 'any word normal difficulty (6 words)', words: ['captain', 'volcano', 'horizon', 'treasure', 'lantern', 'puzzle'] },
  { id: 109, label: 'Advanced 9', description: '3 to 5 letter normal difficulty, 30 words pass', words: ['dream', 'sound', 'bloom', 'spirit', 'glow', 'ocean', 'night', 'smoke', 'shine', 'flame'] },
  { id: 110, label: 'Advanced 10', description: 'any word, 30 words pass', words: ['freedom', 'adventure', 'discover', 'wildlife', 'harmony', 'journey', 'victory', 'collect', 'balance', 'sparkle'] }
];

function createLevelPrompt(level) {
  if (level.id <= 13) {
    return { type: 'basic', prompt: `Type the highlighted letters for ${level.label}: ${level.letters}` };
  }

  if (level.id === 14) {
    return { type: 'basic', prompt: 'Type the sentence: The quick fox jumps.' };
  }

  const advancedLevel = ADVANCED_LEVELS.find((item) => item.id === level.id);
  if (advancedLevel) {
    return { type: 'advanced', prompt: advancedLevel.description, words: advancedLevel.words };
  }

  return { type: 'basic', prompt: 'Good luck!' };
}

function buildTypingSequence(level, length = 120) {
  if (level.id <= 13) {
    const base = level.id === 14 ? 'thequickfoxjumps' : level.letters;
    const chars = Array.from(base);
    const sequence = [];

    for (let index = 0; index < length; index += 1) {
      const nextChar = chars[Math.floor(Math.random() * chars.length)];
      sequence.push(nextChar);
    }

    return sequence.join('');
  }

  const advancedLevel = ADVANCED_LEVELS.find((item) => item.id === level.id);
  if (!advancedLevel) {
    return '';
  }

  return advancedLevel.words.join(' ');
}

function getLevelTargetPoints(levelNumber) {
  return levelNumber * 100;
}

function calculateScore(points, levelId) {
  return points + (levelId >= 100 ? 10 : 5);
}

function evaluateTyping(input, target) {
  const normalizedInput = input.trim().toLowerCase();
  const normalizedTarget = target.trim().toLowerCase();

  return normalizedInput === normalizedTarget;
}

function buildProgressSummary(levelId, points) {
  return {
    levelId,
    points,
    passed: points >= 100
  };
}

export { BASIC_LEVELS, ADVANCED_LEVELS, createLevelPrompt, buildTypingSequence, getLevelTargetPoints, calculateScore, evaluateTyping, buildProgressSummary };
