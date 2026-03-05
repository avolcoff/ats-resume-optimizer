import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';

const htmlPath = path.resolve(process.cwd(), 'index.html');
const html = fs.readFileSync(htmlPath, 'utf8');

function includesAll(text, items) {
  for (const item of items) {
    assert.ok(text.includes(item), `Expected to include: ${item}`);
  }
}

test('core page structure exists', () => {
  includesAll(html, [
    '<title>ATS Resume Optimizer — Beta</title>',
    'id="ats-form"',
    'data-netlify="true"',
    'id="analyzeBtn"',
    'id="submitBtn"',
    'id="result"',
    'id="submitted"'
  ]);
});

test('copy is user-oriented and non-jargony', () => {
  includesAll(html, [
    'Turn any resume into a job-targeted application in minutes.',
    'clear match score',
    'Suggested next edits',
    'No credit card required in beta.'
  ]);
  assert.ok(!html.includes('Feedback capture to shape paid v1'));
});

test('analysis safeguards are present', () => {
  includesAll(html, [
    'Please paste a fuller job description for a reliable result.',
    'Please paste more of your resume content (including bullets).',
    'scoreBand(score)',
    'Confidence:',
    'Evidence found in your resume:',
    'only add items you can support in interviews'
  ]);
});

test('pricing options remain visible', () => {
  includesAll(html, [
    'Starter ($19/month)',
    'Pro ($39/month)',
    'Max ($79/month)'
  ]);
});
