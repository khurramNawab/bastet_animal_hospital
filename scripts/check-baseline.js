const fs = require('fs');

const d = JSON.parse(fs.readFileSync('./lighthouse-baseline-desktop.json', 'utf8'));
const m = JSON.parse(fs.readFileSync('./lighthouse-baseline-mobile.json', 'utf8'));

console.log('=== BASELINE LIGHTHOUSE SCORES ===');
console.log('DESKTOP:', {
  Performance: Math.round(d.categories.performance.score * 100),
  Accessibility: Math.round(d.categories.accessibility.score * 100),
  BestPractices: Math.round(d.categories['best-practices'].score * 100),
  SEO: Math.round(d.categories.seo.score * 100),
  FCP: d.audits['first-contentful-paint'].displayValue,
  LCP: d.audits['largest-contentful-paint'].displayValue,
  TBT: d.audits['total-blocking-time'].displayValue,
  CLS: d.audits['cumulative-layout-shift'].displayValue,
});

console.log('MOBILE:', {
  Performance: Math.round(m.categories.performance.score * 100),
  Accessibility: Math.round(m.categories.accessibility.score * 100),
  BestPractices: Math.round(m.categories['best-practices'].score * 100),
  SEO: Math.round(m.categories.seo.score * 100),
  FCP: m.audits['first-contentful-paint'].displayValue,
  LCP: m.audits['largest-contentful-paint'].displayValue,
  TBT: m.audits['total-blocking-time'].displayValue,
  CLS: m.audits['cumulative-layout-shift'].displayValue,
});
