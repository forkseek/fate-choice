// 生成78张中世纪风格塔罗牌SVG
// 运行: node generate-tarot.js
const fs = require('fs')
const path = require('path')

const OUT = path.join(__dirname, 'public', 'tarot')
if (!fs.existsSync(OUT)) fs.mkdirSync(OUT, { recursive: true })

// ============ 全新精美牌背 ============
const CARD_BACK = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 280 420">
  <defs>
    <radialGradient id="bg" cx="50%" cy="50%" r="55%">
      <stop offset="0%" stop-color="#1a0c06"/>
      <stop offset="60%" stop-color="#0d0502"/>
      <stop offset="100%" stop-color="#060201"/>
    </radialGradient>
    <!-- 复杂锦缎纹理 -->
    <pattern id="damask" width="30" height="30" patternUnits="userSpaceOnUse">
      <path d="M15 0 Q22 7 15 15 Q8 7 15 0Z" fill="none" stroke="#c4a050" stroke-width="0.6" opacity="0.12"/>
      <path d="M0 15 Q7 22 15 15 Q22 22 30 15" fill="none" stroke="#c4a050" stroke-width="0.6" opacity="0.12"/>
      <circle cx="15" cy="15" r="2" fill="none" stroke="#ffd700" stroke-width="0.3" opacity="0.08"/>
    </pattern>
    <!-- 中心光芒 -->
    <radialGradient id="glow" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#ffd700" stop-opacity="0.15"/>
      <stop offset="60%" stop-color="#c4a050" stop-opacity="0.05"/>
      <stop offset="100%" stop-color="#000" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <!-- 外框 -->
  <rect x="2" y="2" width="276" height="416" rx="8" fill="url(#bg)" stroke="#c4a050" stroke-width="2.5"/>
  <rect x="6" y="6" width="268" height="408" rx="6" fill="none" stroke="#ffd700" stroke-width="0.6" opacity="0.15"/>
  <rect x="9" y="9" width="262" height="402" rx="5" fill="none" stroke="#c4a050" stroke-width="0.3" opacity="0.08"/>
  
  <!-- 背景锦缎 -->
  <rect x="2" y="2" width="276" height="416" rx="8" fill="url(#damask)"/>
  
  <!-- 中心光晕 -->
  <circle cx="140" cy="210" r="100" fill="url(#glow)"/>
  
  <!-- 内框装饰 -->
  <rect x="14" y="14" width="252" height="392" rx="5" fill="none" stroke="#c4a050" stroke-width="0.8" opacity="0.1"/>
  <rect x="18" y="18" width="244" height="384" rx="4" fill="none" stroke="#ffd700" stroke-width="0.4" opacity="0.05"/>

  <!-- 中心徽章 -->
  <g transform="translate(140,210)" opacity="0.18">
    <!-- 外层八角星 -->
    <path d="M0 -50 L10 -15 L45 -15 L15 5 L25 40 L0 18 L-25 40 L-15 5 L-45 -15 L-10 -15 Z" fill="#ffd700" stroke="#ffd700" stroke-width="0.5"/>
    <!-- 圆环 -->
    <circle cx="0" cy="0" r="30" fill="none" stroke="#ffd700" stroke-width="1.2"/>
    <circle cx="0" cy="0" r="24" fill="none" stroke="#ffd700" stroke-width="0.5" opacity="0.5"/>
    <!-- 中央星 -->
    <text x="0" y="5" text-anchor="middle" font-size="16" fill="#ffd700" font-family="serif">★</text>
    <!-- 文字环 -->
    <text x="0" y="-40" text-anchor="middle" font-size="6" fill="#ffd700" font-family="serif" letter-spacing="4" opacity="0.7">FATE</text>
    <text x="0" y="52" text-anchor="middle" font-size="4.5" fill="#ffd700" font-family="serif" letter-spacing="3" opacity="0.4">✦ T A R O T ✦</text>
  </g>

  <!-- 四角装饰 -->
  <g opacity="0.12">
    <text x="22" y="30" font-size="8" fill="#ffd700" font-family="serif">✧</text>
    <text x="258" y="30" text-anchor="end" font-size="8" fill="#ffd700" font-family="serif">✧</text>
    <text x="22" y="394" font-size="8" fill="#ffd700" font-family="serif">✧</text>
    <text x="258" y="394" text-anchor="end" font-size="8" fill="#ffd700" font-family="serif">✧</text>
  </g>
  
  <!-- 角菱形 -->
  <g opacity="0.06">
    <text x="17" y="50" font-size="5" fill="#ffd700" font-family="serif">◈</text>
    <text x="263" y="50" text-anchor="end" font-size="5" fill="#ffd700" font-family="serif">◈</text>
    <text x="17" y="374" font-size="5" fill="#ffd700" font-family="serif">◈</text>
    <text x="263" y="374" text-anchor="end" font-size="5" fill="#ffd700" font-family="serif">◈</text>
  </g>
</svg>`

// ============ 中世纪艺术风格卡牌模板 ============
// 每张牌包含中世纪风格的插画元素：哥特式拱门、彩色玻璃风格、金色光环等
const FRAME = (num, title, titleFr, keyword, symbol, sub, medievalArt) => `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 280 420">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#f5e6c8"/>
      <stop offset="50%" stop-color="#e8d4a8"/>
      <stop offset="100%" stop-color="#dcc89c"/>
    </linearGradient>
    <linearGradient id="arch" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#6b4f10"/>
      <stop offset="100%" stop-color="#8b6914"/>
    </linearGradient>
  </defs>
  <!-- 主边框 -->
  <rect x="2" y="2" width="276" height="416" rx="8" fill="url(#bg)" stroke="#6b4f10" stroke-width="2.5"/>
  <rect x="6" y="6" width="268" height="408" rx="6" fill="none" stroke="#8b6914" stroke-width="0.8" opacity="0.2"/>
  
  <!-- 哥特式拱门内框 -->
  <path d="M14 380 L14 100 Q140 20 266 100 L266 380 Z" fill="none" stroke="#8b6914" stroke-width="1.2" opacity="0.15"/>
  <path d="M18 376 L18 105 Q140 28 262 105 L262 376 Z" fill="none" stroke="#6b4f10" stroke-width="0.5" opacity="0.08"/>

  <!-- 四角哥特装饰 -->
  <g opacity="0.15">
    <path d="M10 10 L25 10 L10 25 Z" fill="#8b6914"/>
    <path d="M270 10 L255 10 L270 25 Z" fill="#8b6914"/>
    <path d="M10 410 L25 410 L10 395 Z" fill="#8b6914"/>
    <path d="M270 410 L255 410 L270 395 Z" fill="#8b6914"/>
  </g>

  <!-- 编号 - 左上 中世纪风格 -->
  <text x="22" y="390" font-size="11" font-family="serif" fill="#2c1810" font-weight="bold" opacity="0.7" letter-spacing="2">${num}</text>
  <!-- 编号 - 右下 -->
  <text x="258" y="390" text-anchor="end" font-size="11" font-family="serif" fill="#2c1810" font-weight="bold" opacity="0.7" letter-spacing="2">${num}</text>

  <!-- 中世纪插画区域 -->
  <g transform="translate(140,185)">
    ${medievalArt}
  </g>

  <!-- 名称 - 中世纪字体风格 -->
  <text x="140" y="370" text-anchor="middle" font-size="10" font-family="serif" fill="#2c1810" font-weight="bold" letter-spacing="3">${titleFr}</text>
  <text x="140" y="385" text-anchor="middle" font-size="7" font-family="serif" fill="#8b6914" letter-spacing="2">${title}</text>
  <text x="140" y="400" text-anchor="middle" font-size="6" font-family="serif" fill="#6b4f10" opacity="0.5" font-style="italic" letter-spacing="1">${num} — ${keyword}</text>
  
  <!-- 底部 -->
  <text x="140" y="413" text-anchor="middle" font-size="4.5" font-family="serif" fill="#8b6914" opacity="0.12" letter-spacing="1">${sub}</text>
</svg>`

// ============ 中世纪艺术插画生成器 ============
function medievalArt(symbol, isMajor) {
  // 根据符号生成不同的中世纪风格插画
  const arts = {
    '🃏': `<!-- 愚人 - 中世纪朝圣者 -->
      <rect x="-55" y="-80" width="110" height="140" rx="8" fill="#2c1810" opacity="0.03"/>
      <circle cx="0" cy="-25" r="18" fill="none" stroke="#8b6914" stroke-width="0.8" opacity="0.15"/>
      <circle cx="0" cy="-25" r="14" fill="none" stroke="#8b6914" stroke-width="0.4" opacity="0.08"/>
      <circle cx="0" cy="-22" r="7" fill="#f0d8a0" opacity="0.3"/>
      <path d="M-10 -15 Q0 -10 10 -15 L12 15 L-12 15 Z" fill="#c0392b" opacity="0.2"/>
      <line x1="-5" y1="15" x2="-8" y2="40" stroke="#2c1810" stroke-width="2" opacity="0.15"/>
      <line x1="5" y1="15" x2="8" y2="40" stroke="#2c1810" stroke-width="2" opacity="0.15"/>
      <!-- 手杖 -->
      <line x1="12" y1="-5" x2="30" y2="-25" stroke="#8b6914" stroke-width="1.5" opacity="0.12"/>
      <circle cx="32" cy="-28" r="5" fill="#8b6914" opacity="0.08"/>
      <!-- 哥特光环 -->
      <circle cx="0" cy="-25" r="22" fill="none" stroke="#ffd700" stroke-width="1" opacity="0.06"/>`,
    '🎩': `<!-- 魔术师 - 中世纪炼金术士 -->
      <rect x="-55" y="-80" width="110" height="140" rx="8" fill="#2c1810" opacity="0.03"/>
      <circle cx="0" cy="-25" r="15" fill="none" stroke="#8b6914" stroke-width="0.8" opacity="0.12"/>
      <circle cx="0" cy="-22" r="7" fill="#f0d8a0" opacity="0.25"/>
      <path d="M-10 -15 Q0 -10 10 -15 L12 10 L-12 10 Z" fill="#8b6914" opacity="0.15"/>
      <!-- 桌上物品 -->
      <rect x="-35" y="15" width="70" height="6" rx="2" fill="#6b4f10" opacity="0.12"/>
      <circle cx="-20" cy="10" r="5" fill="#c0392b" opacity="0.12"/>
      <circle cx="-5" cy="12" r="4" fill="#2980b9" opacity="0.12"/>
      <circle cx="10" cy="10" r="5" fill="#f1c40f" opacity="0.12"/>
      <circle cx="25" cy="11" r="4" fill="#27ae60" opacity="0.12"/>
      <!-- 魔杖 -->
      <line x1="8" y1="-5" x2="35" y2="-30" stroke="#f1c40f" stroke-width="1.5" opacity="0.15"/>
      <!-- 无限符号 -->
      <path d="M0 -45 Q5 -50 10 -45 Q5 -40 0 -45" fill="none" stroke="#8b6914" stroke-width="1" opacity="0.1"/>`,
    '💑': `<!-- 恋人 - 中世纪婚礼 -->
      <rect x="-55" y="-80" width="110" height="140" rx="8" fill="#2c1810" opacity="0.03"/>
      <!-- 天使 -->
      <circle cx="0" cy="-45" r="12" fill="none" stroke="#8b6914" stroke-width="0.6" opacity="0.12"/>
      <path d="M-10 -40 L-15 -55 M10 -40 L15 -55" stroke="#8b6914" stroke-width="1" opacity="0.08"/>
      <!-- 新人 -->
      <circle cx="-20" cy="-10" r="8" fill="#f0d8a0" opacity="0.25"/>
      <path d="M-28 -2 Q-20 -2 -12 -2 L-10 15 L-30 15 Z" fill="#c0392b" opacity="0.12"/>
      <circle cx="20" cy="-10" r="8" fill="#f0d8a0" opacity="0.25"/>
      <path d="M12 -2 Q20 -2 28 -2 L30 15 L10 15 Z" fill="#2980b9" opacity="0.12"/>
      <!-- 树 -->
      <line x1="-40" y1="-20" x2="-40" y2="20" stroke="#6b4f10" stroke-width="2" opacity="0.08"/>
      <circle cx="-40" cy="-25" r="10" fill="#27ae60" opacity="0.06"/>
      <line x1="40" y1="-20" x2="40" y2="20" stroke="#6b4f10" stroke-width="2" opacity="0.08"/>
      <!-- 太阳 -->
      <circle cx="35" cy="-55" r="10" fill="#f1c40f" opacity="0.1"/>`,
    '🌍': `<!-- 世界 - 中世纪宇宙图 -->
      <rect x="-55" y="-80" width="110" height="140" rx="8" fill="#2c1810" opacity="0.03"/>
      <circle cx="0" cy="0" r="40" fill="none" stroke="#8b6914" stroke-width="1" opacity="0.1"/>
      <circle cx="0" cy="0" r="32" fill="none" stroke="#8b6914" stroke-width="0.6" opacity="0.06"/>
      <circle cx="0" cy="0" r="20" fill="none" stroke="#ffd700" stroke-width="0.8" opacity="0.08"/>
      <text x="0" y="4" text-anchor="middle" font-size="10" fill="#8b6914" opacity="0.15">${symbol}</text>
      <!-- 四角象征 -->
      <g opacity="0.1">
        <text x="0" y="-48" text-anchor="middle" font-size="7" fill="#8b6914">✦</text>
        <text x="0" y="52" text-anchor="middle" font-size="7" fill="#8b6914">✦</text>
        <text x="-50" y="4" text-anchor="middle" font-size="7" fill="#8b6914">✦</text>
        <text x="50" y="4" text-anchor="middle" font-size="7" fill="#8b6914">✦</text>
      </g>`,
    'default': `<!-- 通用中世纪风格 -->
      <rect x="-55" y="-80" width="110" height="140" rx="8" fill="#2c1810" opacity="0.02"/>
      <rect x="-45" y="-70" width="90" height="120" rx="6" fill="none" stroke="#8b6914" stroke-width="0.5" opacity="0.06"/>
      <circle cx="0" cy="0" r="35" fill="none" stroke="#8b6914" stroke-width="0.6" opacity="0.06"/>
      <text x="0" y="5" text-anchor="middle" font-size="36" opacity="0.2">${symbol}</text>`
  }
  return arts[symbol] || arts['default']
}

// ============ 22张大阿卡纳 ============
const MAJOR = [
  ['0','The Fool','LE MAT','Esprit','🃏','0 • La Folie • Nouveau départ'],
  ['I','The Magician','LE BATELEUR','Volonté','🎩','I • Le Mage • Création'],
  ['II','The High Priestess','LA PAPESSE','Savoir','🌙','II • La Science • Intuition'],
  ['III','The Empress','L\'IMPÉRATRICE','Nature','🌺','III • La Fécondité • Abondance'],
  ['IV','The Emperor','L\'EMPEREUR','Autorité','👑','IV • La Domination • Stabilité'],
  ['V','The Hierophant','LE PAPE','Foi','🔮','V • La Bénédiction • Tradition'],
  ['VI','The Lovers','L\'AMOUREUX','Choix','💑','VI • L\'Amour • Décision'],
  ['VII','The Chariot','LE CHARIOT','Victoire','🏎️','VII • Le Triomphe • Volonté'],
  ['VIII','Strength','LA FORCE','Courage','🦁','VIII • La Force • Maîtrise'],
  ['IX','The Hermit','L\'ERMITE','Sagesse','🧙','IX • La Prudence • Recherche'],
  ['X','Wheel of Fortune','LA ROUE DE FORTUNE','Destin','🎡','X • La Fortune • Cycle'],
  ['XI','Justice','LA JUSTICE','Équité','⚖️','XI • La Justice • Vérité'],
  ['XII','The Hanged Man','LE PENDU','Sacrifice','🙃','XII • Le Martyre • Sacrifice'],
  ['XIII','Death','LA MORT','Transformation','💀','XIII • La Mort • Renouveau'],
  ['XIV','Temperance','TEMPÉRANCE','Harmonie','⚗️','XIV • La Tempérance • Mesure'],
  ['XV','The Devil','LE DIABLE','Matière','😈','XV • La Fatalité • Tentation'],
  ['XVI','The Tower','LA MAISON DIEU','Ruine','🗼','XVI • La Foudre • Effondrement'],
  ['XVII','The Star','L\'ÉTOILE','Espoir','⭐','XVII • Les Étoiles • Inspiration'],
  ['XVIII','The Moon','LA LUNE','Illusion','🌙','XVIII • Le Crépuscule • Peur'],
  ['XIX','The Sun','LE SOLEIL','Joie','☀️','XIX • La Lumière • Succès'],
  ['XX','Judgement','LE JUGEMENT','Réveil','📯','XX • La Résurrection • Éveil'],
  ['XXI','The World','LE MONDE','Achèvement','🌍','XXI • La Récompense • Plénitude'],
]

// ============ 生成 ============
console.log('🃏 生成大阿卡纳（22张）...')
MAJOR.forEach(([num, title, fr, kw, sym, sub], idx) => {
  const names = ['fool','magician','priestess','empress','emperor','hierophant','lovers','chariot','strength','hermit','wheel','justice','hanged','death','temperance','devil','tower','star','moon','sun','judgement','world']
  const fname = `${idx}-${names[idx]}.svg`
  fs.writeFileSync(path.join(OUT, fname), FRAME(num, title, fr.toUpperCase(), kw, sym, sub, medievalArt(sym, true)))
  console.log(`  ✓ ${fname}`)
})

// ============ 小阿卡纳生成 ============
const SUIT_META = { wands: { sym: '🔥', fr: 'Bâtons', icon: '✦' }, cups: { sym: '🏆', fr: 'Coupes', icon: '◆' }, swords: { sym: '⚔️', fr: 'Épées', icon: '✧' }, pentacles: { sym: '🪙', fr: 'Deniers', icon: '◈' } }
const COURT_NAMES = ['Page','Knight','Queen','King']
const SUIT_KEYS = { wands: ['Inspiration','Plan','Growth','Celebration','Strife','Victory','Challenge','Speed','Perseverance','Burden','Page','Knight','Queen','King'],
  cups: ['Love','Connection','Joy','Apathy','Loss','Memory','Illusion','Search','Satisfaction','Happiness','Page','Knight','Queen','King'],
  swords: ['Breakthrough','Stalemate','Heartbreak','Rest','Defeat','Transition','Deception','Imprisonment','Anxiety','End','Page','Knight','Queen','King'],
  pentacles: ['Opportunity','Balance','Teamwork','Stability','Hardship','Generosity','Patience','Apprenticeship','Abundance','Legacy','Page','Knight','Queen','King'] }
const NUM_NAMES = ['As','Deux','Trois','Quatre','Cinq','Six','Sept','Huit','Neuf','Dix']

function makeMinor(suit, idx) {
  const m = SUIT_META[suit]
  const isCourt = idx >= 10
  const name = isCourt ? COURT_NAMES[idx - 10] : NUM_NAMES[idx]
  const keyword = SUIT_KEYS[suit][idx]
  const display = isCourt ? ['P','Kn','Q','K'][idx - 10] : String(idx + 1)
  const frName = isCourt ? `${name} de ${m.fr}` : idx === 0 ? `L'As de ${m.fr}` : `${name} de ${m.fr}`
  const enName = isCourt ? `${name} of ${suit.charAt(0).toUpperCase() + suit.slice(1)}` : `${name} of ${suit.charAt(0).toUpperCase() + suit.slice(1)}`
  const sub = `${m.fr} • ${enName}`

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 280 420">
  <defs><linearGradient id="bg" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#f5e6c8"/><stop offset="50%" stop-color="#e8d4a8"/><stop offset="100%" stop-color="#dcc89c"/></linearGradient></defs>
  <rect x="2" y="2" width="276" height="416" rx="8" fill="url(#bg)" stroke="#6b4f10" stroke-width="2.5"/>
  <rect x="6" y="6" width="268" height="408" rx="6" fill="none" stroke="#8b6914" stroke-width="0.8" opacity="0.2"/>
  <path d="M14 380 L14 100 Q140 20 266 100 L266 380 Z" fill="none" stroke="#8b6914" stroke-width="1.2" opacity="0.12"/>
  <path d="M18 376 L18 105 Q140 28 262 105 L262 376 Z" fill="none" stroke="#6b4f10" stroke-width="0.5" opacity="0.06"/>
  <g opacity="0.12">
    <path d="M10 10 L25 10 L10 25 Z" fill="#8b6914"/><path d="M270 10 L255 10 L270 25 Z" fill="#8b6914"/>
    <path d="M10 410 L25 410 L10 395 Z" fill="#8b6914"/><path d="M270 410 L255 410 L270 395 Z" fill="#8b6914"/>
  </g>
  <text x="22" y="390" font-size="11" font-family="serif" fill="#2c1810" font-weight="bold" opacity="0.7" letter-spacing="2">${display}</text>
  <text x="258" y="390" text-anchor="end" font-size="11" font-family="serif" fill="#2c1810" font-weight="bold" opacity="0.7" letter-spacing="2">${display}</text>
  
  <!-- 中世纪风格图案区 -->
  <rect x="45" y="55" width="190" height="250" rx="6" fill="#2c1810" opacity="0.02"/>
  <rect x="50" y="60" width="180" height="240" rx="4" fill="none" stroke="#8b6914" stroke-width="0.5" opacity="0.05"/>
  
  ${isCourt ? `
  <!-- 宫廷牌 - 中世纪人物 -->
  <circle cx="140" cy="160" r="30" fill="none" stroke="#8b6914" stroke-width="0.8" opacity="0.08"/>
  <circle cx="140" cy="145" r="10" fill="#f0d8a0" opacity="0.2"/>
  <path d="M125 170 Q140 170 155 170 L160 210 L120 210 Z" fill="#8b6914" opacity="0.08"/>
  <!-- 王冠/头盔 -->
  <ellipse cx="140" cy="133" rx="12" ry="4" fill="#c4a050" opacity="0.1"/>
  <!-- 权杖/剑 -->
  <line x1="${idx % 2 === 0 ? '160' : '120'}" y1="175" x2="${idx % 2 === 0 ? '185' : '95'}" y2="140" stroke="#8b6914" stroke-width="1.5" opacity="0.1"/>
  <!-- 光环 -->
  <circle cx="140" cy="160" r="35" fill="none" stroke="#ffd700" stroke-width="0.6" opacity="0.04"/>
  ` : `
  <!-- 数字牌 - 排列花色符号 -->
  ${(() => {
    const count = idx + 1
    const rows = count <= 4 ? [count] : count <= 7 ? [3, count - 3] : [3, count - 6, 3]
    let yPos = 140 - (rows.length - 1) * 20
    let result = ''
    rows.forEach((n, ri) => {
      const xStart = 140 - (n - 1) * 18
      for (let j = 0; j < n; j++) {
        const x = xStart + j * 36
        result += `<text x="${x}" y="${yPos + ri * 40}" text-anchor="middle" font-size="18" opacity="0.12" fill="#6b4f10">${m.icon}</text>`
      }
    })
    return result
  })()}
  `}
  
  <text x="140" y="370" text-anchor="middle" font-size="9" font-family="serif" fill="#2c1810" font-weight="bold" letter-spacing="2">${frName}</text>
  <text x="140" y="383" text-anchor="middle" font-size="7" font-family="serif" fill="#8b6914" letter-spacing="1">${enName}</text>
  <text x="140" y="398" text-anchor="middle" font-size="6" font-family="serif" fill="#6b4f10" opacity="0.5" font-style="italic" letter-spacing="1">${keyword}</text>
  <text x="140" y="413" text-anchor="middle" font-size="4.5" font-family="serif" fill="#8b6914" opacity="0.12" letter-spacing="1">${sub}</text>
</svg>`
}

console.log('\n🃏 生成小阿卡纳（56张）...')
['wands','cups','swords','pentacles'].forEach(suit => {
  for (let i = 0; i < 14; i++) {
    const fname = `${suit}-${i + 1}.svg`
    fs.writeFileSync(path.join(OUT, fname), makeMinor(suit, i))
    console.log(`  ✓ ${fname}`)
  }
})

console.log('\n🃏 生成牌背...')
fs.writeFileSync(path.join(OUT, 'card-back.svg'), CARD_BACK)
console.log('  ✓ card-back.svg')

console.log(`\n✅ 完成！共 ${MAJOR.length + 56 + 1} 个文件`)
