import test from 'node:test';
import assert from 'node:assert/strict';
import { BASIC_LEVELS, ADVANCED_LEVELS, createLevelPrompt, buildTypingSequence, calculateScore, evaluateTyping, buildProgressSummary, getLevelTargetPoints } from './gameLogic.js';

test('basic levels include the requested 14 levels', () => {
  assert.equal(BASIC_LEVELS.length, 14);
  assert.deepEqual(BASIC_LEVELS[0], { id: 1, label: 'Level 1', letters: 'fj' });
  assert.equal(BASIC_LEVELS[13].letters, 'sentences');
});

test('advanced levels include the requested ten levels', () => {
  assert.equal(ADVANCED_LEVELS.length, 10);
  assert.equal(ADVANCED_LEVELS[8].id, 109);
  assert.equal(ADVANCED_LEVELS[9].id, 110);
});

test('prompts are generated for basic and advanced levels', () => {
  const basic = createLevelPrompt(BASIC_LEVELS[0]);
  const advanced = createLevelPrompt(ADVANCED_LEVELS[0]);
  assert.equal(basic.type, 'basic');
  assert.equal(advanced.type, 'advanced');
  assert.ok(advanced.words.length > 0);
});

test('score and typing evaluation behave as expected', () => {
  assert.equal(calculateScore(90, 1), 95);
  assert.equal(calculateScore(100, 101), 110);
  assert.equal(evaluateTyping('cat', 'cat'), true);
  assert.equal(evaluateTyping('Cat', 'cat'), true);
  assert.equal(evaluateTyping('dog', 'cat'), false);
});

test('typing sequences are generated for basic and advanced levels', () => {
  const basicSequence = buildTypingSequence(BASIC_LEVELS[0], 12);
  const advancedSequence = buildTypingSequence(ADVANCED_LEVELS[0], 12);
  assert.equal(basicSequence.length, 12);
  assert.ok(advancedSequence.includes('cat'));
});

test('each level requires a higher target than the previous one', () => {
  assert.equal(getLevelTargetPoints(1), 100);
  assert.equal(getLevelTargetPoints(2), 200);
  assert.equal(getLevelTargetPoints(3), 300);
});

test('progress summary marks a passing score', () => {
  const summary = buildProgressSummary(14, 100);
  assert.equal(summary.passed, true);
  assert.equal(summary.points, 100);
});
