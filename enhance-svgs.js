const fs = require('fs');
const path = require('path');
const OUT = path.join(__dirname, 'public', 'tarot');

const names = ['fool','magician','priestess','empress','emperor','hierophant','lovers','chariot','strength','hermit','wheel','justice','hanged','death','temperance','devil','tower','star','moon','sun','judgement','world'];

// Replace opacity with multiplier
function upOpacity(svg, from, to) {
  while (svg.includes(from)) svg = svg.replace(from, to);
  return svg;
}

// Major arcana
for (let i = 0; i <= 21; i++) {
  const f = path.join(OUT, i + '-' + names[i] + '.svg');
  if (!fs.existsSync(f)) { console.log('SKIP', f); continue; }
  let s = fs.readFileSync(f, 'utf8');

  // Scale art
  s = s.replace('translate(140,185)', 'translate(140,170) scale(1.6)');

  // Enlarge titles
  s = s.replace('y="370" text-anchor="middle" font-size="10"', 'y="374" text-anchor="middle" font-size="16"');
  s = s.replace('y="385" text-anchor="middle" font-size="7"', 'y="394" text-anchor="middle" font-size="12"');
  s = s.replace('y="400" text-anchor="middle" font-size="6"', 'y="410" text-anchor="middle" font-size="9"');
  s = s.replace('y="413" text-anchor="middle" font-size="4.5"', 'y="416" text-anchor="middle" font-size="5.5"');
  s = s.replace('opacity="0.5" font-style="italic"', 'opacity="0.7" font-style="italic"');
  s = s.replace('opacity="0.12" letter-spacing="1">${sub}</text>', 'opacity="0.2" letter-spacing="1">${sub}</text>');

  // Enlarge numbers
  s = s.replace(
    'font-size="11" font-family="serif" fill="#2c1810" font-weight="bold" opacity="0.7" letter-spacing="2">${num}</text>',
    'font-size="16" font-family="serif" fill="#2c1810" font-weight="bold" opacity="0.8" letter-spacing="3">${num}</text>'
  );

  // Increase opacities for art visibility (2-3x)
  s = upOpacity(s, 'opacity="0.03"', 'opacity="0.08"');
  s = upOpacity(s, 'opacity="0.02"', 'opacity="0.06"');
  s = upOpacity(s, 'opacity="0.15"', 'opacity="0.3"');
  s = upOpacity(s, 'opacity="0.08"', 'opacity="0.18"');
  s = upOpacity(s, 'opacity="0.12"', 'opacity="0.25"');
  s = upOpacity(s, 'opacity="0.06"', 'opacity="0.15"');
  s = upOpacity(s, 'opacity="0.05"', 'opacity="0.12"');
  s = upOpacity(s, 'opacity="0.1"', 'opacity="0.2"');
  s = upOpacity(s, 'opacity="0.25"', 'opacity="0.4"');
  s = upOpacity(s, 'opacity="0.3"', 'opacity="0.5"');
  s = upOpacity(s, 'opacity="0.4"', 'opacity="0.55"');
  // Fix cascades: 0.5 -> 0.55 from 0.5, but 0.08->0.18 may have become 0.18->0.38 etc
  // The upOpacity loop fixes this by continuing until no more replacements
  
  fs.writeFileSync(f, s);
  console.log('OK major', names[i]);
}

// Minor arcana
const suits = ['wands','cups','swords','pentacles'];
for (let suit of suits) {
  for (let i = 1; i <= 14; i++) {
    const f = path.join(OUT, suit + '-' + i + '.svg');
    if (!fs.existsSync(f)) { console.log('SKIP', f); continue; }
    let s = fs.readFileSync(f, 'utf8');

    // Enlarge text
    s = s.replace('font-size="11"', 'font-size="14"');
    s = s.replace('y="370" text-anchor="middle" font-size="9"', 'y="374" text-anchor="middle" font-size="14"');
    s = s.replace('y="383" text-anchor="middle" font-size="7"', 'y="392" text-anchor="middle" font-size="11"');
    s = s.replace('y="398" text-anchor="middle" font-size="6"', 'y="408" text-anchor="middle" font-size="9"');
    s = s.replace('y="413" text-anchor="middle" font-size="4.5"', 'y="416" text-anchor="middle" font-size="5.5"');

    // Enlarge court figures
    s = s.replace('cx="140" cy="160" r="30"', 'cx="140" cy="150" r="45"');
    s = s.replace('cx="140" cy="145" r="10"', 'cx="140" cy="130" r="18"');
    s = s.replace('cy="133" rx="12" ry="4"', 'cy="108" rx="18" ry="7"');
    s = s.replace('x="45" y="55" width="190" height="250"', 'x="35" y="50" width="210" height="260"');
    s = s.replace('x="50" y="60" width="180" height="240"', 'x="40" y="55" width="200" height="250"');

    // Enlarge symbols
    s = s.replace('font-size="18" opacity="0.12"', 'font-size="28" opacity="0.25"');

    // Increase opacities
    s = upOpacity(s, 'opacity="0.08"', 'opacity="0.18"');
    s = upOpacity(s, 'opacity="0.02"', 'opacity="0.06"');
    s = upOpacity(s, 'opacity="0.12"', 'opacity="0.22"');
    s = upOpacity(s, 'opacity="0.06"', 'opacity="0.14"');
    s = upOpacity(s, 'opacity="0.05"', 'opacity="0.12"');

    fs.writeFileSync(f, s);
    console.log('OK minor', suit, i);
  }
}

console.log('ALL DONE');
