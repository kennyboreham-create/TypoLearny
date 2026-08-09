const API_BASE = window.__API_BASE__ || '';
const apiUrl = (path) => {
  if (!API_BASE) return path;
  return `${API_BASE}${path}`;
};

const state = {
  score: 0,
  levelIndex: 0,
  currentLevel: null,
  currentLevelTarget: 100,
  currentTarget: '',
  currentTargetIndex: 0,
  currentType: 'basic',
  currentPrompt: '',
  isPlaying: false,
  user: null,
  levelProgress: 0,
  currentWordIndex: 0,
  currentWord: '',
  timerRemaining: 30000,
  timerInterval: null,
  audioEnabled: false,
  token: getStoredToken()
};

function getStoredToken() {
  try {
    return sessionStorage.getItem('typolearny_token') || '';
  } catch {
    return '';
  }
}

function saveToken(token) {
  state.token = token || '';
  try {
    if (state.token) {
      sessionStorage.setItem('typolearny_token', state.token);
    } else {
      sessionStorage.removeItem('typolearny_token');
    }
  } catch {
    // ignore storage errors
  }
}

const basicLevels = [
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

const advancedLevels = [
  { id: 101, label: 'Advanced 1', description: '3 to 4 letter easy words (4 words)', words: ['cat', 'dog', 'sun', 'map',"bear","duck","frog","fish","lion","bird","tree","star"] },
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

const scoreEl = document.getElementById('score');
const levelLabelEl = document.getElementById('levelLabel');
const promptTitleEl = document.getElementById('promptTitle');
const promptTextEl = document.getElementById('promptText');
const challengeTextEl = document.getElementById('challengeText');
const inputFieldEl = document.getElementById('inputField');
const startBtnEl = document.getElementById('startBtn');
const volumeBtnEl = document.getElementById('volumeBtn');
const levelListEl = document.getElementById('levelList');
const emojiLayerEl = document.getElementById('emojiLayer');
const videoOverlayEl = document.getElementById('videoOverlay');
const emailEl = document.getElementById('email');
const passwordEl = document.getElementById('password');
const usernameEl = document.getElementById('username');
const registerBtnEl = document.getElementById('registerBtn');
const loginBtnEl = document.getElementById('loginBtn');
const loginToggleEl = document.getElementById('loginToggle');
const logoutBtnEl = document.getElementById('logoutBtn');
const authPanelEl = document.getElementById('authPanel');
const authStatusEl = document.getElementById('authStatus');

function getAllLevels() {
  return [...basicLevels, ...advancedLevels];
}

function getLevelById(levelId) {
  return getAllLevels().find((level) => level.id === levelId) || basicLevels[0];
}

function getNextLevelToStart() {
  if (state.levelProgress >= basicLevels.length) {
    const nextLevel = advancedLevels.find((level) => level.id > state.levelProgress);
    return nextLevel || advancedLevels[0];
  }
  const nextLevel = basicLevels.find((level) => level.id > state.levelProgress);
  return nextLevel || basicLevels[0];
}

function renderLevels() {
  const beginnerComplete = state.levelProgress >= basicLevels.length;

  if (beginnerComplete) {
    levelListEl.innerHTML = `
      <div class="rounded-xl border border-cyan-500/30 bg-slate-950 px-3 py-3 text-sm text-slate-300">
        Advanced levels are unlocked. Press <span class="font-semibold text-cyan-400">Start</span> to begin the first advanced challenge.
      </div>
    `;
    return;
  }

  const items = basicLevels.map((level) => {
    const isUnlocked = level.id <= state.levelProgress + 1 || level.id === 1;
    const isCompleted = level.id <= state.levelProgress;
    const stateClass = !isUnlocked
      ? 'opacity-50 cursor-not-allowed'
      : 'opacity-100 cursor-pointer hover:border-cyan-500';
    const borderClass = isCompleted ? 'border-cyan-500/40' : 'border-slate-800';
    return `<button type="button" data-level-id="${level.id}" class="w-full rounded-xl border ${borderClass} bg-slate-950 px-3 py-2 text-left ${stateClass}" ${!isUnlocked ? 'disabled' : ''}>${level.label}: ${level.description || level.letters}</button>`;
  });
  levelListEl.innerHTML = items.join('');
}

function renderAuthUI() {
  const isLoggedIn = !!state.user;
  authPanelEl.classList.toggle('hidden', isLoggedIn);
  logoutBtnEl.classList.toggle('hidden', !isLoggedIn);
  loginToggleEl.textContent = isLoggedIn ? 'Account' : 'Login';

  if (!isLoggedIn) {
    authStatusEl.classList.add('hidden');
    authStatusEl.innerHTML = '';
    return;
  }

  authStatusEl.classList.remove('hidden');
  authStatusEl.innerHTML = '';
  const displayName = state.user.username || state.user.email?.split('@')[0] || 'Player';
  const label = document.createElement('div');
  label.className = 'font-semibold text-cyan-400';
  label.textContent = `Signed in as ${displayName}`;
  authStatusEl.appendChild(label);
}

function buildBasicSequence(level) {
  const base = level.id === 14 ? 'thequickfoxjumps' : level.letters;
  const chars = Array.from(base);
  const sequence = [];

  for (let index = 0; index < 120; index += 1) {
    sequence.push(chars[Math.floor(Math.random() * chars.length)]);
  }

  return sequence.join('');
}

function buildAdvancedSequence(level) {
  return level.words.join(' ');
}

function setLevel(level) {
  state.currentLevel = level;
  state.currentLevelTarget = (level.id <= 14 ? level.id : level.id - 100 + 14) * 100;
  state.currentPrompt = level.description || `Type: ${level.letters}`;
  state.currentType = level.id >= 101 ? 'advanced' : 'basic';
  state.currentTarget = state.currentType === 'basic' ? buildBasicSequence(level) : buildAdvancedSequence(level);
  state.currentTargetIndex = 0;
  state.currentWordIndex = 0;
  state.currentWord = Array.isArray(level.words) ? level.words[0] : '';

  promptTitleEl.textContent = level.label;
  promptTextEl.textContent = state.currentPrompt;
  updateChallengeText();
  levelLabelEl.textContent = level.label;
  clearInterval(state.timerInterval);
  state.timerRemaining = 30000;
  if (state.currentLevel.id === 109 || state.currentLevel.id === 110) {
    startTimer();
  }
}

function updateChallengeText() {
  if (state.currentType === 'basic') {
    const nextChar = state.currentTarget[state.currentTargetIndex] || '✓';
    challengeTextEl.innerHTML = `Next key: <span class="font-mono text-cyan-400">${nextChar}</span><br />Keep going until you reach 100 points.`;
    return;
  }

  const word = state.currentWord || state.currentTarget;
  challengeTextEl.innerHTML = `Practice word: <span class="font-mono text-cyan-400">${word}</span><br />Type it exactly to earn a point.`;
}

function updateScore() {
  scoreEl.textContent = state.score;
}

function burstEmojis() {
  const emojis = ['🎉', '✨', '🌟', '💥', '🚀'];
  const emoji = document.createElement('div');
  emoji.className = 'emoji-burst text-3xl';
  emoji.textContent = emojis[Math.floor(Math.random() * emojis.length)];
  emoji.style.left = `${Math.random() * 80 + 10}%`;
  emoji.style.top = `${Math.random() * 60 + 20}%`;
  emojiLayerEl.appendChild(emoji);
  setTimeout(() => emoji.remove(), 1200);
}

function speakLetter(letter) {
  if (!state.audioEnabled || !letter) return;
  if ('speechSynthesis' in window) {
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(letter);
    utterance.lang = 'en-US';
    utterance.rate = 1.1;
    window.speechSynthesis.speak(utterance);
  }
}

function handleCorrectInput(letter) {
  state.score += 1;
  updateScore();
  burstEmojis();
  if (state.currentType === 'basic') {
    speakLetter(letter);
  } else {
    speakLetter(letter);
  }
  if (state.score >= state.currentLevelTarget) {
    completeLevel();
  }
}

function completeLevel() {
  const nextProgress = state.currentLevel.id <= 14 ? state.currentLevel.id : state.currentLevel.id - 100 + 14;
  state.levelProgress = Math.max(state.levelProgress, nextProgress);
  renderLevels();
  if (state.user) {
    fetch(apiUrl('/api/progress'), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(state.token ? { Authorization: `Bearer ${state.token}` } : {})
      },
      credentials: 'include',
      body: JSON.stringify({ levelId: state.currentLevel.id <= 14 ? state.currentLevel.id : state.currentLevel.id - 100 + 14 })
    }).catch(() => {});
  }

  videoOverlayEl.classList.remove('hidden');
  videoOverlayEl.classList.add('flex');
  const isBeginnerComplete = state.currentLevel.id === basicLevels[basicLevels.length - 1].id;
  const message = isBeginnerComplete
    ? '<p class="text-lg font-semibold">Congratulations! You passed the beginner levels.</p><p class="mt-2 text-sm text-slate-400">The advanced levels are now unlocked.</p>'
    : '<p class="text-lg font-semibold">Level complete! Great work.</p><p class="mt-2 text-sm text-slate-400">If you add a video named <span class="font-mono text-cyan-400">/assets/level-' + state.currentLevel.id + '.mp4</span>, it will play here.</p>';
  videoOverlayEl.innerHTML = `
    <div class="w-full max-w-xl rounded-3xl border border-cyan-500/30 bg-slate-900 p-4 text-center">
      ${message}
      <button id="closeVideoBtn" class="mt-4 rounded-xl bg-cyan-500 px-4 py-2 font-semibold text-slate-950">Continue</button>
    </div>
  `;
  document.getElementById('closeVideoBtn').addEventListener('click', () => {
    videoOverlayEl.classList.add('hidden');
    videoOverlayEl.classList.remove('flex');
    nextLevel();
  });
}

function startGame(level = null) {
  state.isPlaying = true;
  state.score = 0;
  state.levelIndex = 0;
  updateScore();
  const targetLevel = level || getNextLevelToStart();
  setLevel(targetLevel);
  inputFieldEl.value = '';
  inputFieldEl.focus();
}

function nextLevel() {
  if (state.levelIndex < basicLevels.length - 1) {
    state.levelIndex += 1;
    setLevel(basicLevels[state.levelIndex]);
  } else {
    const advancedIndex = 0;
    setLevel(advancedLevels[advancedIndex]);
  }
}

function startTimer() {
  clearInterval(state.timerInterval);
  state.timerRemaining = 30000;
  state.timerInterval = setInterval(() => {
    state.timerRemaining -= 1000;
    if (state.timerRemaining <= 0) {
      clearInterval(state.timerInterval);
      completeLevel();
    }
  }, 1000);
}

inputFieldEl.addEventListener('input', (event) => {
  if (!state.isPlaying) return;

  if (state.currentType === 'basic') {
    const value = event.target.value;
    const lastChar = value.slice(-1).toLowerCase();
    const targetChar = state.currentTarget[state.currentTargetIndex].toLowerCase();
    if (lastChar === targetChar) {
      handleCorrectInput(lastChar);
      state.currentTargetIndex += 1;
      if (state.currentTargetIndex >= state.currentTarget.length) {
        state.currentTargetIndex = 0;
      }
      updateChallengeText();
      event.target.value = '';
    } else if (value.length > 1) {
      event.target.value = value.slice(0, -1);
    }
    return;
  }

  const value = event.target.value.trim().toLowerCase();
  if (value === state.currentWord.toLowerCase()) {
    handleCorrectInput(state.currentWord);
    state.currentWordIndex = (state.currentWordIndex + 1) % state.currentLevel.words.length;
    state.currentWord = state.currentLevel.words[state.currentWordIndex];
    updateChallengeText();
    event.target.value = '';
  }
});

startBtnEl.addEventListener('click', () => startGame());

levelListEl.addEventListener('click', (event) => {
  const button = event.target.closest('[data-level-id]');
  if (!button) return;
  const levelId = Number(button.getAttribute('data-level-id'));
  if (!Number.isFinite(levelId)) return;
  const level = getLevelById(levelId);
  if (level.id <= state.levelProgress + 1 || level.id === 1) {
    startGame(level);
  }
});

volumeBtnEl.addEventListener('click', () => {
  state.audioEnabled = !state.audioEnabled;
  volumeBtnEl.textContent = state.audioEnabled ? '🔊 On' : '🔈 Off';
});

loginToggleEl.addEventListener('click', () => {
  if (state.user) return;
  authPanelEl.classList.toggle('hidden');
});

logoutBtnEl.addEventListener('click', async () => {
  try {
    await fetch(apiUrl('/api/auth/logout'), {
      method: 'POST',
      credentials: 'include'
    });
  } catch {
    // ignore logout errors
  }
  state.user = null;
  saveToken('');
  state.levelProgress = 0;
  renderAuthUI();
  renderLevels();
  updateScore();
});

registerBtnEl.addEventListener('click', async () => {
  const res = await fetch(apiUrl('/api/auth/register'), {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify({ username: usernameEl.value.trim(), email: emailEl.value, password: passwordEl.value })
  });
  const data = await res.json();
  if (data.user) {
    state.user = data.user;
    state.levelProgress = data.user.progress || 0;
    saveToken(data.token || '');
    renderAuthUI();
    renderLevels();
    updateScore();
    alert('Registered and logged in.');
  } else {
    alert(data.error || 'Registration failed');
  }
});

loginBtnEl.addEventListener('click', async () => {
  const res = await fetch(apiUrl('/api/auth/login'), {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify({ email: emailEl.value, password: passwordEl.value })
  });
  const data = await res.json();
  if (data.user) {
    state.user = data.user;
    state.levelProgress = data.user.progress || 0;
    saveToken(data.token || '');
    renderAuthUI();
    renderLevels();
    updateScore();
    alert('Logged in.');
  } else {
    alert(data.error || 'Login failed');
  }
});

(async function loadUser() {
  if (!state.token) {
    renderLevels();
    updateScore();
    return;
  }

  try {
    const res = await fetch(apiUrl('/api/me'), {
      credentials: 'include',
      headers: { Authorization: `Bearer ${state.token}` }
    });
    if (!res.ok) {
      if (res.status === 401) {
        state.user = null;
        saveToken('');
      }
      renderLevels();
      updateScore();
      return;
    }
    const data = await res.json();
    state.user = data.user;
    state.levelProgress = data.user.progress || 0;
  } catch {
    // guest mode
  }
  renderAuthUI();
  renderLevels();
  updateScore();
})();

renderAuthUI();
renderLevels();
updateScore();
