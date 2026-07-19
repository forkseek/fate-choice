'use client'
import { useState, useMemo, useEffect, useRef } from 'react'

const tarotCards = [
  { id: 0, name: '愚人', en: 'The Fool', symbol: '🃏', arcana: 'major', meaningUp: '新的开始、冒险、自由', meaningDown: '鲁莽、拖延', readUp: '一段全新的旅程正在等待你。放下包袱，保持纯真和乐观，命运的翅膀会在你坠落时托起你。', readDown: '不要盲目冲动。你的冒险精神值得嘉许，但需要带上理性和计划。停下来想清楚再跳。' },
  { id: 1, name: '魔术师', en: 'The Magician', symbol: '🎩', arcana: 'major', meaningUp: '技能、自信、创造力', meaningDown: '欺骗、滥用才能', readUp: '创造的力量正在你手中。你已拥有实现目标所需的一切资源。相信自己，将想法化为行动。', readDown: '你可能在滥用天赋，或被表面的花招迷惑。回归真诚，才能看清真相。' },
  { id: 2, name: '女祭司', en: 'The High Priestess', symbol: '🌙', arcana: 'major', meaningUp: '直觉、神秘、潜意识', meaningDown: '秘密、隐藏信息', readUp: '答案不在外界，而在你的内心深处。静下来倾听潜意识的声音，那里藏着宇宙的奥秘。', readDown: '你可能忽略了内心的声音，或被表象蒙蔽。是时候揭开面纱了。' },
  { id: 3, name: '皇后', en: 'The Empress', symbol: '🌺', arcana: 'major', meaningUp: '丰收、母性、富饶', meaningDown: '依赖、空虚', readUp: '这是收获的季节，物质和情感都将丰盈。享受生活的美好。', readDown: '不要过度依赖他人。找回自己的独立性，真正的丰盛来自你内心。' },
  { id: 4, name: '皇帝', en: 'The Emperor', symbol: '👑', arcana: 'major', meaningUp: '权威、稳定、保护', meaningDown: '专制、固执', readUp: '稳固的秩序和权威。用智慧和理性来领导，坚定是你的力量。', readDown: '你的固执正在阻碍你。适当的柔软和变通反而能让你获得真正的掌控力。' },
  { id: 5, name: '教皇', en: 'The Hierophant', symbol: '🔮', arcana: 'major', meaningUp: '信仰、传统、指引', meaningDown: '教条、束缚', readUp: '也许你需要寻求一位导师的帮助，在既定的制度和信仰中找到答案。', readDown: '不要被规则束缚。你内心的真理比任何教条都重要。' },
  { id: 6, name: '恋人', en: 'The Lovers', symbol: '💑', arcana: 'major', meaningUp: '爱情、选择、和谐', meaningDown: '分歧、错误决定', readUp: '深刻的情感连接和重要的人生选择。跟随你的心，而非头脑。', readDown: '你可能面临艰难的抉择。冷静下来，问问自己真正想要的是什么。' },
  { id: 7, name: '战车', en: 'The Chariot', symbol: '🏎️', arcana: 'major', meaningUp: '胜利、决心、征服', meaningDown: '缺乏方向、失控', readUp: '你有强大的意志力克服障碍。保持专注，紧握缰绳，胜利就在前方。', readDown: '你正在失去方向。停下来协调你内心的冲突，重新找到目标。' },
  { id: 8, name: '力量', en: 'Strength', symbol: '🦁', arcana: 'major', meaningUp: '勇气、耐心、力量', meaningDown: '软弱、恐惧', readUp: '真正的力量来自温柔。用耐心和同理心去驯服内心的猛兽。', readDown: '你在被恐惧支配。不要用暴力对抗，尝试用理解和爱化解困境。' },
  { id: 9, name: '隐士', en: 'The Hermit', symbol: '🧙', arcana: 'major', meaningUp: '内省、智慧、指引', meaningDown: '孤立、偏执', readUp: '提一盏灯，独自上山寻找答案。孤独不是惩罚，而是智慧生长的土壤。', readDown: '你封闭太久，已与外界脱节。是时候下山分享你的智慧了。' },
  { id: 10, name: '命运之轮', en: 'Wheel of Fortune', symbol: '🎡', arcana: 'major', meaningUp: '好运、转折、命运', meaningDown: '厄运、阻力', readUp: '命运之轮转动了，好运正向你而来。抓住机遇。', readDown: '外界的阻力让你感到无力。但低谷之后必是上升，保持耐心。' },
  { id: 11, name: '正义', en: 'Justice', symbol: '⚖️', arcana: 'major', meaningUp: '公平、真相、法律', meaningDown: '不公、欺骗', readUp: '因果报应真实不虚。诚实面对一切，你将得到公正的对待。', readDown: '你的判断可能有偏颇。重新审视，确保你的决定是平衡的。' },
  { id: 12, name: '倒吊人', en: 'The Hanged Man', symbol: '🙃', arcana: 'major', meaningUp: '牺牲、新视角', meaningDown: '拖延、固执', readUp: '换一个角度看世界。以退为进，暂时的牺牲会带来更深的领悟。', readDown: '你在无谓地拖延。该做决定的时候到了。' },
  { id: 13, name: '死神', en: 'Death', symbol: '💀', arcana: 'major', meaningUp: '结束、转变、重生', meaningDown: '抗拒改变', readUp: '旧的不去新的不来。放手那些不再服务于你的东西，为新生腾出空间。', readDown: '你死死抓住不愿放手。抗拒改变只会延长痛苦。' },
  { id: 14, name: '节制', en: 'Temperance', symbol: '⚗️', arcana: 'major', meaningUp: '平衡、耐心、和谐', meaningDown: '极端、失衡', readUp: '调和生活中的各种元素，保持耐心和适度。中庸之道是通往平和的关键。', readDown: '你失去了平衡。不要走极端，找到中间的那条路。' },
  { id: 15, name: '恶魔', en: 'The Devil', symbol: '😈', arcana: 'major', meaningUp: '束缚、欲望', meaningDown: '觉醒、解脱', readUp: '看清你被什么束缚住，你就能挣脱。真正的自由来自直面自己的阴影。', readDown: '那些曾经控制你的枷锁正在松动。勇敢地切断束缚你的链条。' },
  { id: 16, name: '高塔', en: 'The Tower', symbol: '🗼', arcana: 'major', meaningUp: '突变、崩塌', meaningDown: '避免灾难', readUp: '虽然痛苦但这是必要的摧毁。暴风雨过后，你会看得更清晰。', readDown: '你还在试图阻止不可避免的崩塌。允许旧的坍塌才能建设新的。' },
  { id: 17, name: '星星', en: 'The Star', symbol: '⭐', arcana: 'major', meaningUp: '希望、灵感、平静', meaningDown: '绝望、失望', readUp: '经历了风暴之后，星星给你带来希望和治愈。保持信念，未来是明亮的。', readDown: '你可能感到迷茫失望。但星星从未消失，只是被云遮住了。' },
  { id: 18, name: '月亮', en: 'The Moon', symbol: '🌙', arcana: 'major', meaningUp: '幻想、不安、恐惧', meaningDown: '释放恐惧', readUp: '保持警觉，但别让恐惧控制你。真相会随着黎明显现。', readDown: '你正在释放深层的恐惧。那些困扰你的幻觉逐渐消散。' },
  { id: 19, name: '太阳', en: 'The Sun', symbol: '☀️', arcana: 'major', meaningUp: '成功、快乐、活力', meaningDown: '暂时困难', readUp: '最积极的牌。成功的喜悦、生命的活力、清晰的未来。', readDown: '你的热情可能短暂受挫，但太阳总会再次升起。' },
  { id: 20, name: '审判', en: 'Judgement', symbol: '📯', arcana: 'major', meaningUp: '觉醒、重生', meaningDown: '自省、后悔', readUp: '这是一个自我评估和重生的时刻。过去的都过去了，新的你正在诞生。', readDown: '你拒绝面对自己的内心。宽恕自己，才能继续前行。' },
  { id: 21, name: '世界', en: 'The World', symbol: '🌍', arcana: 'major', meaningUp: '圆满、成就', meaningDown: '未完成、停滞', readUp: '一个周期完成了，你达到了目标。庆祝你的成就，准备迎接新的旅程。', readDown: '你离完成还有一步之遥。最后的冲刺往往最需要耐心。' },
  { id: 22, name: '权杖一', symbol: '🔥', arcana: 'minor', suit: 'wands', meaningUp: '新开始、灵感', meaningDown: '延迟、受阻' },
  { id: 23, name: '权杖二', symbol: '🔥', arcana: 'minor', suit: 'wands', meaningUp: '规划、决策', meaningDown: '恐惧变化' },
  { id: 24, name: '权杖三', symbol: '🔥', arcana: 'minor', suit: 'wands', meaningUp: '远行、扩张', meaningDown: '阻碍延迟' },
  { id: 25, name: '权杖四', symbol: '🔥', arcana: 'minor', suit: 'wands', meaningUp: '庆祝、和谐', meaningDown: '基础不稳' },
  { id: 26, name: '权杖五', symbol: '🔥', arcana: 'minor', suit: 'wands', meaningUp: '竞争、挑战', meaningDown: '和解合作' },
  { id: 27, name: '权杖六', symbol: '🔥', arcana: 'minor', suit: 'wands', meaningUp: '胜利、认可', meaningDown: '骄傲失败' },
  { id: 28, name: '权杖七', symbol: '🔥', arcana: 'minor', suit: 'wands', meaningUp: '坚持、勇敢', meaningDown: '屈服放弃' },
  { id: 29, name: '权杖八', symbol: '🔥', arcana: 'minor', suit: 'wands', meaningUp: '快速、行动', meaningDown: '延误失速' },
  { id: 30, name: '权杖九', symbol: '🔥', arcana: 'minor', suit: 'wands', meaningUp: '警惕、坚韧', meaningDown: '疲惫偏执' },
  { id: 31, name: '权杖十', symbol: '🔥', arcana: 'minor', suit: 'wands', meaningUp: '负担、压力', meaningDown: '释放放手' },
  { id: 32, name: '圣杯一', symbol: '🏆', arcana: 'minor', suit: 'cups', meaningUp: '爱情、喜悦', meaningDown: '空虚压抑' },
  { id: 33, name: '圣杯二', symbol: '🏆', arcana: 'minor', suit: 'cups', meaningUp: '连接、友谊', meaningDown: '分离不和' },
  { id: 34, name: '圣杯三', symbol: '🏆', arcana: 'minor', suit: 'cups', meaningUp: '庆祝、欢乐', meaningDown: '过度放纵' },
  { id: 35, name: '圣杯四', symbol: '🏆', arcana: 'minor', suit: 'cups', meaningUp: '冥想、不满', meaningDown: '新机会' },
  { id: 36, name: '圣杯五', symbol: '🏆', arcana: 'minor', suit: 'cups', meaningUp: '失落、悲伤', meaningDown: '接受前行' },
  { id: 37, name: '圣杯六', symbol: '🏆', arcana: 'minor', suit: 'cups', meaningUp: '回忆、怀旧', meaningDown: '停滞执念' },
  { id: 38, name: '圣杯七', symbol: '🏆', arcana: 'minor', suit: 'cups', meaningUp: '幻想、选择', meaningDown: '聚焦现实' },
  { id: 39, name: '圣杯八', symbol: '🏆', arcana: 'minor', suit: 'cups', meaningUp: '离开、探索', meaningDown: '迷失逃避' },
  { id: 40, name: '圣杯九', symbol: '🏆', arcana: 'minor', suit: 'cups', meaningUp: '满足、成真', meaningDown: '虚荣不满' },
  { id: 41, name: '圣杯十', symbol: '🏆', arcana: 'minor', suit: 'cups', meaningUp: '幸福、家庭', meaningDown: '破碎的家' },
  { id: 42, name: '宝剑一', symbol: '⚔️', arcana: 'minor', suit: 'swords', meaningUp: '真理、突破', meaningDown: '混乱误解' },
  { id: 43, name: '宝剑二', symbol: '⚔️', arcana: 'minor', suit: 'swords', meaningUp: '抉择、权衡', meaningDown: '信息过多' },
  { id: 44, name: '宝剑三', symbol: '⚔️', arcana: 'minor', suit: 'swords', meaningUp: '心碎、痛苦', meaningDown: '释放痛苦' },
  { id: 45, name: '宝剑四', symbol: '⚔️', arcana: 'minor', suit: 'swords', meaningUp: '休息、恢复', meaningDown: '躁动倦怠' },
  { id: 46, name: '宝剑五', symbol: '⚔️', arcana: 'minor', suit: 'swords', meaningUp: '冲突、失落', meaningDown: '和解释然' },
  { id: 47, name: '宝剑六', symbol: '⚔️', arcana: 'minor', suit: 'swords', meaningUp: '过渡、疗愈', meaningDown: '未解过去' },
  { id: 48, name: '宝剑七', symbol: '⚔️', arcana: 'minor', suit: 'swords', meaningUp: '策略、计划', meaningDown: '诚实直面' },
  { id: 49, name: '宝剑八', symbol: '⚔️', arcana: 'minor', suit: 'swords', meaningUp: '束缚、限制', meaningDown: '解放自由' },
  { id: 50, name: '宝剑九', symbol: '⚔️', arcana: 'minor', suit: 'swords', meaningUp: '焦虑、恐惧', meaningDown: '希望治愈' },
  { id: 51, name: '宝剑十', symbol: '⚔️', arcana: 'minor', suit: 'swords', meaningUp: '结束、终结', meaningDown: '重生黎明' },
  { id: 52, name: '星币一', symbol: '🪙', arcana: 'minor', suit: 'pentacles', meaningUp: '财富、机会', meaningDown: '失财错失' },
  { id: 53, name: '星币二', symbol: '🪙', arcana: 'minor', suit: 'pentacles', meaningUp: '平衡、适应', meaningDown: '失衡分心' },
  { id: 54, name: '星币三', symbol: '🪙', arcana: 'minor', suit: 'pentacles', meaningUp: '团队、技能', meaningDown: '缺乏努力' },
  { id: 55, name: '星币四', symbol: '🪙', arcana: 'minor', suit: 'pentacles', meaningUp: '节约、控制', meaningDown: '贪婪囤积' },
  { id: 56, name: '星币五', symbol: '🪙', arcana: 'minor', suit: 'pentacles', meaningUp: '贫困、担忧', meaningDown: '找到帮助' },
  { id: 57, name: '星币六', symbol: '🪙', arcana: 'minor', suit: 'pentacles', meaningUp: '慷慨、分享', meaningDown: '自私债务' },
  { id: 58, name: '星币七', symbol: '🪙', arcana: 'minor', suit: 'pentacles', meaningUp: '耐心、等待', meaningDown: '浪费投资' },
  { id: 59, name: '星币八', symbol: '🪙', arcana: 'minor', suit: 'pentacles', meaningUp: '勤奋、专注', meaningDown: '完美主义' },
  { id: 60, name: '星币九', symbol: '🪙', arcana: 'minor', suit: 'pentacles', meaningUp: '丰收、自足', meaningDown: '孤独表面' },
  { id: 61, name: '星币十', symbol: '🪙', arcana: 'minor', suit: 'pentacles', meaningUp: '财富、传承', meaningDown: '破产失去' },
]

function getCardImage(card) {
  if (card.arcana === 'major') {
    const slugs = ['fool','magician','priestess','empress','emperor','hierophant','lovers','chariot','strength','hermit','wheel','justice','hanged','death','temperance','devil','tower','star','moon','sun','judgement','world']
    return `/tarot/${card.id}-${slugs[card.id]}.svg`
  } else {
    const off = { wands: 21, cups: 31, swords: 41, pentacles: 51 }
    return `/tarot/${card.suit}-${card.id - off[card.suit]}.svg`
  }
}

function TarotCard3D({ card, upright, compact, delay }) {
  const [flipped, setFlipped] = useState(false)
  useEffect(() => {
    const t = setTimeout(() => setFlipped(true), 200 + (delay || 0) * 200)
    return () => clearTimeout(t)
  }, [delay])

  const imgSrc = getCardImage(card)
  const sz = compact ? 'c' : 'f'

  return (
    <div className="relative" style={{ width: compact ? 115 : 160, perspective: '800px' }}>
      <div
        onClick={() => setFlipped(!flipped)}
        className="relative w-full transition-all duration-700 cursor-pointer"
        style={{
          transformStyle: 'preserve-3d',
          transform: flipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
          minHeight: compact ? 160 : 220,
        }}>
        {/* ======== CARD BACK ======== */}
        <div className={`absolute inset-0 backface-hidden ornate-back-${sz}`}>
          <div className={`absolute inset-0 rounded-xl overflow-hidden`}
            style={{ background: 'transparent' }}>
            {/* main back SVG – rich visible texture */}
            <img src="/tarot/card-back.svg" alt="card back"
              className="w-full h-full object-cover" />
            {/* ornate outer border glow */}
            <div className={`absolute inset-0 rounded-xl pointer-events-none`}
              style={{
                border: `4px solid rgba(196,160,80,${compact ? '0.3' : '0.4'})`,
                boxShadow: 'inset 0 0 40px rgba(255,215,0,0.06), 0 0 25px rgba(0,0,0,0.5)',
              }} />
            {/* inner gold line */}
            <div className={`absolute ${compact ? 'inset-[7px]' : 'inset-[9px]'} rounded-lg pointer-events-none`}
              style={{ border: '1px solid rgba(196,160,80,0.15)' }} />

            {/* corner ornaments */}
            {['top-0 left-0', 'top-0 right-0', 'bottom-0 left-0', 'bottom-0 right-0'].map((pos, i) => (
              <div key={i} className={`absolute ${pos} ${compact ? 'w-7 h-7' : 'w-9 h-9'} pointer-events-none`} style={{ zIndex: 2 }}>
                <div className={`absolute ${i===0||i===2 ? 'left-0' : 'right-0'} ${i<2 ? 'top-0' : 'bottom-0'} ${compact ? 'w-[14px] h-[14px]' : 'w-[18px] h-[18px]'}`}>
                  <div className="w-full h-full"
                    style={{
                      borderColor: 'rgba(196,160,80,0.35)',
                      borderStyle: 'solid',
                      borderWidth: i===0 ? '2px 0 0 2px' : i===1 ? '2px 2px 0 0' : i===2 ? '0 0 2px 2px' : '0 2px 2px 0',
                    }} />
                  <div className={`absolute ${i===0||i===2 ? 'left-[3px]' : 'right-[3px]'} ${i<2 ? 'top-[3px]' : 'bottom-[3px]'} ${compact ? 'w-[4px] h-[4px]' : 'w-[5px] h-[5px]'}`}
                    style={{ background: 'rgba(196,160,80,0.2)', borderRadius: '50%' }} />
                </div>
                {/* corner fleur */}
                <div className={`absolute ${i===0||i===2 ? 'left-[5px]' : 'right-[5px]'} ${i<2 ? 'top-[5px]' : 'bottom-[5px]'} ${compact ? 'w-[7px] h-[10px]' : 'w-[9px] h-[13px]'}`}
                  style={{
                    background: 'rgba(196,160,80,0.08)',
                    clipPath: 'polygon(50% 0%, 100% 40%, 80% 50%, 100% 100%, 50% 75%, 0% 100%, 20% 50%, 0% 40%)',
                    transform: i===1 ? 'scaleX(-1)' : i===3 ? 'scale(-1)' : i===2 ? 'scaleX(-1)' : '',
                  }} />
              </div>
            ))}
          </div>
        </div>

        {/* ======== CARD FRONT ======== */}
        <div className={`absolute inset-0 backface-hidden ornate-front-${sz}`}
          style={{ transform: 'rotateY(180deg)' }}>
          {/* outermost ornate frame */}
          <div className={`absolute inset-0 rounded-xl overflow-hidden`}
            style={{
              background: upright
                ? 'linear-gradient(180deg, #1a0e08 0%, #0d0502 100%)'
                : 'linear-gradient(180deg, #1a0806 0%, #0d0302 100%)',
              border: upright
                ? `3px solid rgba(212,168,84,${compact ? '0.3' : '0.4'})`
                : `3px solid rgba(200,60,40,${compact ? '0.25' : '0.35'})`,
              boxShadow: upright
                ? 'inset 0 0 40px rgba(212,168,84,0.04), 0 4px 20px rgba(0,0,0,0.4)'
                : 'inset 0 0 40px rgba(200,60,40,0.03), 0 4px 20px rgba(0,0,0,0.4)',
            }}>

            {/* second inner border */}
            <div className={`absolute ${compact ? 'inset-[5px]' : 'inset-[7px]'} rounded-lg pointer-events-none`}
              style={{
                border: upright
                  ? `1px solid rgba(212,168,84,${compact ? '0.12' : '0.18'})`
                  : `1px solid rgba(200,60,40,${compact ? '0.08' : '0.12'})`,
              }} />

            {/* decorative top band */}
            <div className={`absolute ${compact ? 'top-[3px] left-3 right-3 h-[9px]' : 'top-[5px] left-4 right-4 h-[11px]'} pointer-events-none`}>
              <div className="w-full h-full flex items-center justify-center gap-1"
                style={{ color: upright ? 'rgba(212,168,84,0.08)' : 'rgba(200,60,40,0.06)' }}>
                {Array(compact ? 5 : 6).fill(0).map((_, i) => (
                  <div key={i} className={compact ? 'w-[5px] h-[5px]' : 'w-[6px] h-[6px]'}
                    style={{
                      background: upright ? 'rgba(212,168,84,0.06)' : 'rgba(200,60,40,0.04)',
                      clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
                    }} />
                ))}
              </div>
            </div>

            {/* decorative bottom band */}
            <div className={`absolute ${compact ? 'bottom-[3px] left-3 right-3 h-[9px]' : 'bottom-[5px] left-4 right-4 h-[11px]'} pointer-events-none`}>
              <div className="w-full h-full flex items-center justify-center gap-1"
                style={{ color: upright ? 'rgba(212,168,84,0.08)' : 'rgba(200,60,40,0.06)' }}>
                {Array(compact ? 5 : 6).fill(0).map((_, i) => (
                  <div key={i} className={compact ? 'w-[5px] h-[5px]' : 'w-[6px] h-[6px]'}
                    style={{
                      background: upright ? 'rgba(212,168,84,0.06)' : 'rgba(200,60,40,0.04)',
                      clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
                    }} />
                ))}
              </div>
            </div>

            {/* corner ornaments - front */}
            {['top-0 left-0', 'top-0 right-0', 'bottom-0 left-0', 'bottom-0 right-0'].map((pos, i) => (
              <div key={i} className={`absolute ${pos} ${compact ? 'w-7 h-7' : 'w-9 h-9'} pointer-events-none`} style={{ zIndex: 2 }}>
                <div className={`absolute ${i===0||i===2 ? 'left-1' : 'right-1'} ${i<2 ? 'top-1' : 'bottom-1'} ${compact ? 'w-3 h-3' : 'w-4 h-4'}`}>
                  <div className="w-full h-full"
                    style={{
                      borderColor: upright ? 'rgba(212,168,84,0.2)' : 'rgba(200,60,40,0.15)',
                      borderStyle: 'solid',
                      borderWidth: i===0 ? '2px 0 0 2px' : i===1 ? '2px 2px 0 0' : i===2 ? '0 0 2px 2px' : '0 2px 2px 0',
                    }} />
                  {/* inner dot */}
                  <div className={`absolute ${i===0||i===2 ? 'left-[3px]' : 'right-[3px]'} ${i<2 ? 'top-[3px]' : 'bottom-[3px]'} ${compact ? 'w-[3px] h-[3px]' : 'w-[4px] h-[4px]'}`}
                    style={{
                      background: upright ? 'rgba(212,168,84,0.08)' : 'rgba(200,60,40,0.06)',
                      borderRadius: '50%',
                    }} />
                </div>
                {/* fleur-de-lis corner accent */}
                <div className={`absolute ${i===0||i===2 ? 'left-[6px]' : 'right-[6px]'} ${i<2 ? 'top-[6px]' : 'bottom-[6px]'} ${compact ? 'w-[5px] h-[8px]' : 'w-[7px] h-[11px]'} opacity-40`}
                  style={{
                    background: upright ? 'rgba(212,168,84,0.08)' : 'rgba(200,60,40,0.06)',
                    clipPath: 'polygon(50% 0%, 100% 40%, 80% 50%, 100% 100%, 50% 75%, 0% 100%, 20% 50%, 0% 40%)',
                    transform: i===1 ? 'scaleX(-1)' : i===3 ? 'scale(-1)' : i===2 ? 'scaleX(-1)' : '',
                  }} />
              </div>
            ))}

            {/* card SVG image */}
            <img src={imgSrc} alt={card.name}
              className={`absolute ${compact ? 'inset-[8px]' : 'inset-[10px]'} w-auto h-auto object-contain ${!upright ? 'scale-y-[-1]' : ''}`}
              style={{
                maxWidth: `calc(100% - ${compact ? 16 : 20}px)`,
                maxHeight: `calc(100% - ${compact ? 16 : 20}px)`,
                top: '50%', left: '50%',
                transform: `translate(-50%, -50%) ${!upright ? 'scaleY(-1)' : ''}`,
              }} />

            {/* ornate label banner */}
            <div className={`absolute ${compact ? 'bottom-[8px]' : 'bottom-[10px]'} left-1/2 -translate-x-1/2 pointer-events-none`}
              style={{ zIndex: 3 }}>
              <div className={`${compact ? 'px-2 py-[2px]' : 'px-3 py-[3px]'} rounded-sm`}
                style={{
                  background: upright
                    ? 'linear-gradient(90deg, transparent, rgba(212,168,84,0.08) 20%, rgba(212,168,84,0.08) 80%, transparent)'
                    : 'linear-gradient(90deg, transparent, rgba(200,60,40,0.06) 20%, rgba(200,60,40,0.06) 80%, transparent)',
                  borderTop: `1px solid ${upright ? 'rgba(212,168,84,0.08)' : 'rgba(200,60,40,0.06)'}`,
                  borderBottom: `1px solid ${upright ? 'rgba(212,168,84,0.08)' : 'rgba(200,60,40,0.06)'}`,
                }}>
                {/* side ornaments */}
                <div className="flex items-center gap-1.5">
                  <span className={compact ? 'text-[4px]' : 'text-[5px]'} style={{ color: upright ? 'rgba(212,168,84,0.15)' : 'rgba(200,60,40,0.12)' }}>❧</span>
                  <span className={`${compact ? 'text-[6px]' : 'text-[7px]'} font-bold tracking-[2px] font-serif`}
                    style={{ color: upright ? 'rgba(212,168,84,0.45)' : 'rgba(200,80,60,0.35)' }}>
                    {upright ? '✦ 正位 ✦' : '↡ 逆位 ↡'}
                  </span>
                  <span className={compact ? 'text-[4px]' : 'text-[5px]'} style={{ color: upright ? 'rgba(212,168,84,0.15)' : 'rgba(200,60,40,0.12)' }}>❧</span>
                </div>
              </div>
            </div>

            {/* decorative left/right vine patterns */}
            <div className={`absolute top-0 ${compact ? 'left-[4px]' : 'left-[6px]'} w-[2px] h-full pointer-events-none`}
              style={{
                background: `repeating-linear-gradient(180deg, transparent 0px, transparent 3px, ${upright ? 'rgba(212,168,84,0.03)' : 'rgba(200,60,40,0.02)'} 3px, ${upright ? 'rgba(212,168,84,0.03)' : 'rgba(200,60,40,0.02)'} 5px, transparent 5px, transparent 8px)`,
              }} />
            <div className={`absolute top-0 ${compact ? 'right-[4px]' : 'right-[6px]'} w-[2px] h-full pointer-events-none`}
              style={{
                background: `repeating-linear-gradient(180deg, transparent 0px, transparent 3px, ${upright ? 'rgba(212,168,84,0.03)' : 'rgba(200,60,40,0.02)'} 3px, ${upright ? 'rgba(212,168,84,0.03)' : 'rgba(200,60,40,0.02)'} 5px, transparent 5px, transparent 8px)`,
              }} />

            {/* card name corner text */}
            <div className={`absolute ${compact ? 'top-[10px] left-[8px] text-[4px]' : 'top-[12px] left-[10px] text-[5px]'} tracking-[1px] opacity-20 font-serif pointer-events-none`}
              style={{ color: upright ? 'rgba(212,168,84,0.3)' : 'rgba(200,60,40,0.2)' }}>
              {card.name?.slice(0, compact ? 2 : 3)}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .ornate-back-c, .ornate-back-f {
          border-radius: 12px;
        }
        .ornate-back-c {
          background: #0d0502;
        }
        .ornate-back-f {
          background: #0d0502;
        }
        .ornate-front-c, .ornate-front-f {
          border-radius: 12px;
        }
      `}</style>
    </div>
  )
}

const SCENES = {
  shopping: [
    { icon: '📱', text: 'iPhone vs 小米 买哪个？', opts: ['iPhone', '小米'] },
    { icon: '👟', text: '白色还是黑色？', opts: ['白色', '黑色'] },
    { icon: '🎧', text: 'AirPods Pro vs Sony？', opts: ['AirPods Pro', 'Sony'] },
  ],
  study: [
    { icon: '💻', text: '学编程还是学英语？', opts: ['学编程', '学英语'] },
    { icon: '📖', text: '考研还是工作？', opts: ['考研', '直接工作'] },
    { icon: '🎓', text: '文科还是理科？', opts: ['文科', '理科'] },
  ],
  love: [
    { icon: '💌', text: '加不加TA微信？', opts: ['主动加', '再等等'] },
    { icon: '💔', text: '吵架了主动哄TA还是等？', opts: ['主动哄TA', '等TA消气'] },
    { icon: '💔', text: '继续还是放手？', opts: ['继续', '放手'] },
  ],
  work: [
    { icon: '💰', text: '涨薪20%跳不跳？', opts: ['跳槽', '留下'] },
    { icon: '🏠', text: '大城市还是回老家？', opts: ['大城市', '回老家'] },
  ],
  life: [
    { icon: '🍲', text: '吃火锅还是烤肉？', opts: ['火锅', '烤肉'] },
    { icon: '🎮', text: '宅家还是出去浪？', opts: ['宅家', '出去浪'] },
    { icon: '✈️', text: '去三亚还是成都？', opts: ['三亚', '成都'] },
  ],
}

const MOODS = [
  { id: 'tired', icon: '😫', label: '上班好累', opts: ['继续卷', '果断躺平'] },
  { id: 'sad', icon: '😤', label: '心情不好', opts: ['出去吃', '在家看剧'] },
  { id: 'shop', icon: '🛍️', label: '想花钱', opts: ['买贵的', '省下来'] },
  { id: 'confused', icon: '😵', label: '好迷茫', opts: ['停下来', '往前走'] },
  { id: 'bored', icon: '🥱', label: '好无聊', opts: ['出去玩', '学新技能'] },
  { id: 'eat', icon: '🍔', label: '饿了', opts: ['出去吃', '点外卖'] },
  { id: 'love', icon: '💕', label: '想谈恋爱', opts: ['主动出击', '随缘吧'] },
  { id: 'money', icon: '💰', label: '想搞钱', opts: ['搞副业', '提升技能'] },
]

export default function Home() {
  const [options, setOptions] = useState(['', ''])
  const [result, setResult] = useState(null)
  const [animating, setAnimating] = useState(false)
  const [showMoods, setShowMoods] = useState(false)
  const [drawnCards, setDrawnCards] = useState([])
  const [deckMode, setDeckMode] = useState(false)
  const [aiLoading, setAiLoading] = useState(false)
  const [aiResult, setAiResult] = useState(null)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const cardRef = useRef(null)

  useEffect(() => {
    const handleMouse = (e) => {
      const rect = cardRef.current?.getBoundingClientRect()
      if (rect) {
        const x = (e.clientX - rect.left) / rect.width - 0.5
        const y = (e.clientY - rect.top) / rect.height - 0.5
        setMousePos({ x: x * 4, y: y * 4 })
      }
    }
    window.addEventListener('mousemove', handleMouse)
    return () => window.removeEventListener('mousemove', handleMouse)
  }, [])

  const shuffle = (arr) => [...arr].sort(() => Math.random() - 0.5)
  const pick = (arr) => arr[Math.floor(Math.random() * arr.length)]

  const addOption = () => options.length < 10 && setOptions([...options, ''])
  const updateOption = (i, v) => { const n = [...options]; n[i] = v; setOptions(n) }
  const removeOption = (i) => options.length > 2 && setOptions(options.filter((_, j) => j !== i))

  const doTarot = (n = 1) => shuffle(tarotCards).slice(0, n).map(c => ({ ...c, upright: Math.random() > 0.2 }))

  const pickRandom = () => {
    const v = options.filter(o => o.trim())
    if (v.length < 2) return
    setAnimating(true); setResult(null); setDrawnCards([]); setDeckMode(false)
    setTimeout(() => { setResult(pick(v)); setAnimating(false); setDrawnCards(doTarot(1)) }, 800)
  }

  const askAI = async () => {
    const v = options.filter(o => o.trim())
    if (v.length < 2) { alert('请先输入至少2个选项'); return }
    setAiLoading(true); setAiResult(null)
    const c = doTarot(3); setDrawnCards(c); setDeckMode(true)
    try {
      const r = await fetch('/api/tarot-ai', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ options: v, cards: c, question: '请帮我做个决定' }),
      })
      setAiResult(await r.json())
    } catch { setAiResult({ reading: '网络不通，请稍后再试 🙏' }) }
    setAiLoading(false)
  }

  const handleMood = (m) => {
    setShowMoods(false)
    setOptions(m.opts)
    setAnimating(true); setResult(null); setDrawnCards([])
    setTimeout(() => { setResult(pick(m.opts)); setAnimating(false); setDrawnCards(doTarot(1)) }, 800)
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-3 font-serif overflow-hidden"
      style={{ background: 'radial-gradient(ellipse at 50% 0%, #1a0a06 0%, #0d0402 100%)' }}>
      
      {/* floating orbs */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute w-96 h-96 rounded-full opacity-[0.02] animate-drift" style={{ top: '10%', left: '20%', background: 'radial-gradient(circle, #ffd700, transparent)' }} />
        <div className="absolute w-80 h-80 rounded-full opacity-[0.015] animate-drift-reverse" style={{ bottom: '10%', right: '20%', background: 'radial-gradient(circle, #8b5cf6, transparent)' }} />
      </div>

      <div className="perspective-[1200px] w-full max-w-[420px] relative z-10">
        <div ref={cardRef}
          className="relative rounded-2xl overflow-hidden transition-all duration-200 ease-out"
          style={{
            background: 'linear-gradient(160deg, rgba(20,8,4,0.94), rgba(10,3,1,0.97))',
            backdropFilter: 'blur(20px)',
            boxShadow: '0 20px 60px rgba(0,0,0,0.5), 0 0 40px rgba(212,168,84,0.02)',
            transform: `perspective(1200px) rotateX(${2 - mousePos.y}deg) rotateY(${mousePos.x}deg)`,
            border: '1px solid rgba(212,168,84,0.04)',
            transition: 'transform 0.1s ease-out',
          }}>

          <div className="absolute top-0 left-0 right-0 h-[1.5px] z-20 opacity-30"
            style={{ background: 'linear-gradient(90deg, transparent, #ffd700, transparent)' }} />

          <div className="p-5 pb-4 relative z-10 max-h-[85vh] overflow-y-auto scrollbar-custom">

            {/* header */}
            <div className="text-center mb-4">
              <div className="w-12 h-12 mx-auto mb-2 rounded-full relative flex items-center justify-center"
                style={{ background: 'radial-gradient(circle at 35% 25%, rgba(255,200,150,0.08), transparent 60%)', border: '1px solid rgba(212,168,84,0.04)' }}>
                <div className="absolute inset-0.5 rounded-full opacity-[0.06]"
                  style={{ background: 'conic-gradient(from 0deg, transparent, #ffd700, transparent)', animation: 'spin 6s linear infinite' }} />
                <span className="text-xl relative z-10">🔮</span>
              </div>
              <h1 className="text-[#ffd700] text-lg font-bold tracking-[5px] opacity-80">命运之选</h1>
              <p className="text-[8px] mt-0.5 tracking-[4px] opacity-25 italic" style={{ color: '#c4a050' }}>吉普赛塔罗占卜</p>
            </div>

            <div className="flex items-center gap-2 my-2.5">
              <div className="flex-1 h-[1px]" style={{ background: 'linear-gradient(90deg, transparent, rgba(212,168,84,0.04))' }} />
              <div className="text-[8px] tracking-[4px] opacity-15" style={{ color: '#ffd700' }}>✦ ✦ ✦</div>
              <div className="flex-1 h-[1px]" style={{ background: 'linear-gradient(90deg, rgba(212,168,84,0.04), transparent)' }} />
            </div>

            {/* input */}
            <div className="rounded-xl p-2.5 mb-2" style={{ background: 'rgba(0,0,0,0.1)', border: '1px solid rgba(212,168,84,0.02)' }}>
              <div className="flex gap-1.5 mb-1.5 text-[9px]" style={{ color: 'rgba(212,168,84,0.3)' }}>
                <span>✦ 我在纠结</span>
                <span className="text-[6px] px-1.5 py-0.5 rounded" style={{ background: 'rgba(212,168,84,0.02)', color: 'rgba(212,168,84,0.12)' }}>最多10项</span>
              </div>
              {options.map((o, i) => (
                <div key={i} className="flex gap-1.5 mb-1">
                  <div className="flex-1 flex items-center gap-2 rounded-lg px-2.5 py-2" style={{ background: 'rgba(0,0,0,0.12)', border: '1px solid rgba(212,168,84,0.02)' }}>
                    <input className="flex-1 bg-transparent text-[11px] outline-none font-serif" style={{ color: 'rgba(255,220,180,0.6)' }}
                      value={o} onChange={e => updateOption(i, e.target.value)} placeholder="输入选项" />
                  </div>
                  <button onClick={() => removeOption(i)}
                    className="w-8 h-8 rounded-lg flex items-center justify-center text-xs cursor-pointer transition-all hover:opacity-50"
                    style={{ background: 'rgba(200,50,30,0.04)', border: '1px solid rgba(200,80,60,0.02)', color: 'rgba(200,80,60,0.2)' }}>✕</button>
                </div>
              ))}
              <button onClick={addOption}
                className="w-full py-1.5 rounded-lg text-[9px] cursor-pointer transition-all hover:opacity-50"
                style={{ border: '1px dashed rgba(212,168,84,0.02)', color: 'rgba(212,168,84,0.12)' }}>＋ 添加选项</button>
            </div>

            {/* moods */}
            <button onClick={() => setShowMoods(!showMoods)}
              className="w-full py-1.5 rounded-lg text-[9px] italic cursor-pointer mb-1.5 transition-all hover:opacity-60"
              style={{ background: 'rgba(0,0,0,0.04)', border: '1px solid rgba(212,168,84,0.02)', color: 'rgba(212,168,84,0.2)' }}>
              🎭 不知从何说起？让命运为你选题
            </button>

            {showMoods && (
              <div className="mb-2">
                <p className="text-[7px] text-center mb-1.5 italic opacity-25" style={{ color: '#c4a050' }}>选一个状态，命运为你出题</p>
                <div className="grid grid-cols-4 gap-1">
                  {MOODS.map(m => (
                    <button key={m.id} onClick={() => handleMood(m)}
                      className="flex flex-col items-center py-1.5 rounded-lg cursor-pointer transition-all active:scale-95 hover:opacity-60"
                      style={{ background: 'rgba(0,0,0,0.06)', border: '1px solid rgba(212,168,84,0.02)' }}>
                      <span className="text-base">{m.icon}</span>
                      <span className="text-[6px] mt-0.5 opacity-35" style={{ color: '#c4a050' }}>{m.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* main button */}
            <button onClick={pickRandom} disabled={animating}
              className="w-full py-2.5 rounded-xl text-sm font-semibold cursor-pointer tracking-[3px] mb-2 font-serif transition-all duration-300 active:scale-[0.95] disabled:opacity-20"
              style={{ background: 'linear-gradient(180deg, rgba(212,168,84,0.03), rgba(200,100,50,0.01))', border: '1px solid rgba(212,168,84,0.04)', color: 'rgba(212,168,84,0.4)' }}>
              🔮 翻开命运之牌
            </button>

            {/* result */}
            <div className="rounded-xl p-3 mb-2 min-h-[60px] transition-all" style={{ background: 'rgba(0,0,0,0.04)', border: '1px solid rgba(212,168,84,0.02)' }}>
              {animating ? (
                <div className="flex flex-col items-center gap-2 py-4">
                  <div className="relative w-8 h-8"><span className="text-2xl absolute inset-0 flex items-center justify-center animate-pulse">🔮</span></div>
                  <span className="text-[8px] italic opacity-25" style={{ color: '#c4a050' }}>命运编织中…</span>
                </div>
              ) : deckMode && drawnCards.length > 0 ? (
                <div className="flex flex-col items-center">
                  <p className="text-[7px] tracking-[2px] mb-2.5 opacity-20 italic" style={{ color: '#c4a050' }}>✦ 三张塔罗 ✦</p>
                  <div className="flex justify-center gap-1">
                    {drawnCards.map((c, i) => (
                      <div key={i} className="flex flex-col items-center gap-0.5">
                        <TarotCard3D card={c} upright={c.upright} compact delay={i} />
                        <span className="text-[5px] tracking-[2px] opacity-15" style={{ color: '#c4a050' }}>{['过去','现在','未来'][i]}</span>
                      </div>
                    ))}
                  </div>
                  {aiResult?.reading && (
                    <div className="mt-2.5 pt-2.5 w-full text-center animate-fadeIn" style={{ borderTop: '1px solid rgba(212,168,84,0.03)' }}>
                      <p className="text-[7px] tracking-[2px] mb-1.5 italic opacity-20" style={{ color: '#c4a050' }}>✦ 女巫的解读 ✦</p>
                      <div className="text-[7px] leading-relaxed whitespace-pre-line opacity-40 text-left px-1" style={{ color: 'rgba(255,220,180,0.45)' }}>{aiResult.reading}</div>
                    </div>
                  )}
                </div>
              ) : result && drawnCards.length > 0 ? (
                <div className="flex flex-col items-center gap-2">
                  <TarotCard3D card={drawnCards[0]} upright={drawnCards[0].upright} delay={0} />
                  <div className="text-center mt-1">
                    <p className="text-[7px] tracking-[2px] mb-1 italic opacity-20" style={{ color: '#c4a050' }}>✦ 命运启示 ✦</p>
                    <p className="text-base font-bold" style={{ color: 'rgba(212,168,84,0.5)' }}>{result}</p>
                    <p className="text-[6px] mt-0.5 opacity-15" style={{ color: '#c4a050' }}>{drawnCards[0]?.name} · {drawnCards[0]?.upright ? '正位' : '逆位'}</p>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center py-4 gap-1.5">
                  <span className="text-base opacity-15">🃏</span>
                  <p className="text-[8px] italic opacity-15" style={{ color: '#c4a050' }}>✦ 等待命运揭晓 ✦</p>
                </div>
              )}
            </div>

            {/* AI pro */}
            <div className="rounded-xl p-2.5 mb-1.5" style={{ background: 'linear-gradient(180deg, rgba(212,168,84,0.015), transparent)', border: '1px solid rgba(212,168,84,0.03)' }}>
              <div className="flex items-center gap-2 mb-1.5">
                <span className="text-sm opacity-30">🃏</span>
                <div className="flex-1">
                  <p className="text-[10px] font-semibold" style={{ color: 'rgba(212,168,84,0.35)' }}>吉普赛巫师深度占卜</p>
                  <p className="text-[6px] italic opacity-20" style={{ color: '#c4a050' }}>AI + 塔罗，给出专属指引</p>
                </div>
              </div>
              <button onClick={askAI} disabled={aiLoading}
                className="w-full py-1.5 rounded-lg text-[9px] font-medium cursor-pointer tracking-[1px] font-serif transition-all active:scale-[0.95] disabled:opacity-30"
                style={{ background: 'linear-gradient(180deg, rgba(212,168,84,0.03), rgba(200,100,50,0.01))', border: '1px solid rgba(212,168,84,0.03)', color: 'rgba(212,168,84,0.3)' }}>
                {aiLoading ? '🔮 占卜中…' : '✦ 免费试一次 ✦'}
              </button>
            </div>

            {/* footer */}
            <div className="flex justify-between pt-1 text-[7px]" style={{ color: 'rgba(212,168,84,0.06)' }}>
              <span>2,847 次占卜</span>
              <div className="flex gap-2"><span className="cursor-pointer transition-all hover:opacity-40">🔮 分享</span><span onClick={pickRandom} className="cursor-pointer transition-all hover:opacity-40">🔄 再占</span></div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @keyframes drift { 0%, 100% { transform: translate(0, 0); } 50% { transform: translate(20px, -15px); } }
        @keyframes drift-reverse { 0%, 100% { transform: translate(0, 0); } 50% { transform: translate(-15px, 20px); } }
        .animate-fadeIn { animation: fadeIn 0.3s ease-out; }
        .animate-drift { animation: drift 20s ease-in-out infinite; }
        .animate-drift-reverse { animation: drift-reverse 25s ease-in-out infinite; }
        .backface-hidden { backface-visibility: hidden; -webkit-backface-visibility: hidden; }
        .scrollbar-custom::-webkit-scrollbar { width: 2px; }
        .scrollbar-custom::-webkit-scrollbar-thumb { background: rgba(212,168,84,0.04); border-radius: 2px; }
      `}</style>
    </div>
  )
}
