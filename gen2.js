// 生成78张中世纪风格塔罗牌
const fs = require("fs"), path = require("path")
const OUT = path.join(__dirname, "public", "tarot")
if (!fs.existsSync(OUT)) fs.mkdirSync(OUT, { recursive: true })

const CB = `<?xml version="1.0"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 280 420">
  <defs>
    <radialGradient id="bg" cx="50%" cy="50%" r="55%">
      <stop offset="0%" stop-color="#2a1508"/>
      <stop offset="60%" stop-color="#0d0502"/>
      <stop offset="100%" stop-color="#040201"/>
    </radialGradient>
    <pattern id="damask" width="30" height="30" patternUnits="userSpaceOnUse">
      <path d="M15 0 Q22 7 15 15 Q8 7 15 0Z" fill="none" stroke="#ffd700" stroke-width="0.8" opacity="0.2"/>
      <path d="M0 15 Q7 22 15 15 Q22 22 30 15" fill="none" stroke="#ffd700" stroke-width="0.8" opacity="0.2"/>
      <circle cx="15" cy="15" r="2" fill="none" stroke="#ffd700" stroke-width="0.4" opacity="0.15"/>
    </pattern>
  </defs>
  <rect x="2" y="2" width="276" height="416" rx="8" fill="url(#bg)" stroke="#c4a050" stroke-width="2.5"/>
  <rect x="6" y="6" width="268" height="408" rx="6" fill="none" stroke="#ffd700" stroke-width="0.6" opacity="0.25"/>
  <rect x="2" y="2" width="276" height="416" rx="8" fill="url(#damask)"/>
  <rect x="12" y="12" width="256" height="396" rx="5" fill="none" stroke="#c4a050" stroke-width="0.8" opacity="0.15"/>
  <g transform="translate(140,210)" opacity="0.25">
    <path d="M0 -45 L10 -12 L45 -12 L15 5 L25 38 L0 16 L-25 38 L-15 5 L-45 -12 L-10 -12 Z" fill="#ffd700"/>
    <circle cx="0" cy="0" r="28" fill="none" stroke="#ffd700" stroke-width="1.5"/>
    <circle cx="0" cy="0" r="20" fill="none" stroke="#ffd700" stroke-width="0.6" opacity="0.6"/>
    <text x="0" y="5" text-anchor="middle" font-size="18" fill="#ffd700" font-family="serif">&#9733;</text>
    <text x="0" y="-35" text-anchor="middle" font-size="7" fill="#ffd700" font-family="serif" letter-spacing="4">FATE</text>
    <text x="0" y="48" text-anchor="middle" font-size="5" fill="#ffd700" font-family="serif" letter-spacing="3">T A R O T</text>
  </g>
</svg>`

const M = [
  ["0","The Fool","LE MAT","Esprit","&#127923;","Nouveau d&#233;part"],
  ["I","The Magician","LE BATELEUR","Volont&#233;","&#127968;","Cr&#233;ation"],
  ["VI","The Lovers","L'AMOUREUX","Choix","&#128145;","D&#233;cision"],
  ["XXI","The World","LE MONDE","Ach&#232;vement","&#127758;","Pl&#233;nitude"]
]

const FR = (num,title,fr,kw,sym,sub) => `<?xml version="1.0"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 280 420">
  <rect x="2" y="2" width="276" height="416" rx="8" fill="#f5e6c8" stroke="#6b4f10" stroke-width="2.5"/>
  <rect x="6" y="6" width="268" height="408" rx="6" fill="none" stroke="#8b6914" stroke-width="0.8" opacity="0.2"/>
  <path d="M14 380 L14 100 Q140 20 266 100 L266 380 Z" fill="none" stroke="#8b6914" stroke-width="1.5" opacity="0.2"/>
  <path d="M18 376 L18 105 Q140 28 262 105 L262 376 Z" fill="none" stroke="#6b4f10" stroke-width="0.5" opacity="0.08"/>
  <g opacity="0.2">
    <path d="M10 10 L25 10 L10 25 Z" fill="#8b6914"/>
    <path d="M270 10 L255 10 L270 25 Z" fill="#8b6914"/>
    <path d="M10 410 L25 410 L10 395 Z" fill="#8b6914"/>
    <path d="M270 410 L255 410 L270 395 Z" fill="#8b6914"/>
  </g>
  <text x="22" y="390" font-size="12" font-family="serif" fill="#2c1810" font-weight="bold" letter-spacing="2">${num}</text>
  <text x="258" y="390" text-anchor="end" font-size="12" font-family="serif" fill="#2c1810" font-weight="bold" letter-spacing="2">${num}</text>
  <text x="140" y="180" text-anchor="middle" font-size="64" opacity="0.35">${sym}</text>
  <text x="140" y="370" text-anchor="middle" font-size="12" font-family="serif" fill="#2c1810" font-weight="bold" letter-spacing="3">${fr}</text>
  <text x="140" y="388" text-anchor="middle" font-size="8" font-family="serif" fill="#8b6914" letter-spacing="2">${title}</text>
  <text x="140" y="405" text-anchor="middle" font-size="6" font-family="serif" fill="#6b4f10" opacity="0.5" font-style="italic">${num} - ${sub}</text>
</svg>`

const names = ["fool","magician","lovers","world"]
M.forEach((m,i) => fs.writeFileSync(path.join(OUT, `${i}-${names[i]}.svg`), FR(...m)))

fs.writeFileSync(path.join(OUT, "card-back.svg"), CB)
console.log("OK: 4 cards + card-back")
