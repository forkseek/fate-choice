// 数据来源: Tarot.js (MIT License) - Rider-Waite Tarot Deck
// https://github.com/MarketingPipeline/Tarot.js

const tarotCards = [
  // === Major Arcana (大阿卡纳) ===
  { id: 0, name: '愚人', en: 'The Fool', symbol: '🃏', arcana: 'major', meaningUp: '新的开始、冒险、自由', meaningDown: '鲁莽、冒险、拖延', readUp: '愚人牌象征着一段全新的旅程。你站在悬崖边上，即将踏入未知的领域。放下包袱，保持纯真和乐观，命运的翅膀会在你坠落时托起你。', readDown: '逆位的愚人提醒你：不要盲目冲动。你的冒险精神值得嘉许，但需要带上理性和计划。停下来想清楚再跳。' },
  { id: 1, name: '魔术师', en: 'The Magician', symbol: '🎩', arcana: 'major', meaningUp: '技能、自信、创造力', meaningDown: '欺骗、滥用才能', readUp: '魔术师带来了创造的力量。你手中已经拥有了实现目标所需的一切资源。相信自己，将想法化为行动，奇迹将由你亲手创造。', readDown: '逆位的魔术师在警告：你可能在滥用天赋，或者被表面的花招迷惑。回归真诚，才能看清真相。' },
  { id: 2, name: '女祭司', en: 'The High Priestess', symbol: '🌙', arcana: 'major', meaningUp: '直觉、神秘、潜意识', meaningDown: '秘密、隐藏的信息', readUp: '女祭司是智慧和直觉的象征。答案不在外界，而在你的内心深处。静下来倾听潜意识的声音，那里藏着宇宙的奥秘。', readDown: '逆位时，你可能忽略了内心的声音，或被表象蒙蔽。是时候揭开面纱，面对不愿承认的真相了。' },
  { id: 3, name: '皇后', en: 'The Empress', symbol: '🌺', arcana: 'major', meaningUp: '丰收、母性、富饶', meaningDown: '依赖、空虚', readUp: '皇后带来丰饶与温柔。这是一个收获的季节，无论是物质还是情感都将丰盈。享受生活的美好，大自然会滋养你的身心。', readDown: '逆位的皇后提示：不要过度依赖他人。找回自己的独立性，真正的丰盛来自你内心。' },
  { id: 4, name: '皇帝', en: 'The Emperor', symbol: '👑', arcana: 'major', meaningUp: '权威、稳定、保护', meaningDown: '专制、固执', readUp: '皇帝代表着稳固的秩序和权威。你需要建立规则和结构来保护你的事业。坚定、理性是你的力量，用智慧来领导。', readDown: '逆位时你的固执正在阻碍你。适当的柔软和变通，反而能让你获得真正的掌控力。' },
  { id: 5, name: '教皇', en: 'The Hierophant', symbol: '🔮', arcana: 'major', meaningUp: '信仰、传统、指引', meaningDown: '教条、束缚', readUp: '教皇牌象征着传统的智慧和精神的指引。也许你需要寻求一位导师的帮助，或者在既定的制度和信仰中找到答案。', readDown: '逆位的教皇在说：不要被规则束缚。你内心的真理比任何教条都重要，勇敢走出自己的路。' },
  { id: 6, name: '恋人', en: 'The Lovers', symbol: '💑', arcana: 'major', meaningUp: '爱情、选择、和谐', meaningDown: '分歧、错误的决定', readUp: '恋人牌代表了深刻的情感连接和重要的人生选择。跟随你的心，而非头脑。真爱需要勇气，也需要信任。', readDown: '逆位时你可能面临艰难的抉择或感情上的分歧。冷静下来，问问自己真正想要的是什么。' },
  { id: 7, name: '战车', en: 'The Chariot', symbol: '🏎️', arcana: 'major', meaningUp: '胜利、决心、征服', meaningDown: '缺乏方向、失控', readUp: '战车牌宣告着胜利。你有强大的意志力来克服前方的障碍。保持专注，紧握缰绳，胜利就在前方等待着你。', readDown: '逆位时你正在失去方向。停下来协调你内心的冲突，重新找到目标再出发。' },
  { id: 8, name: '力量', en: 'Strength', symbol: '🦁', arcana: 'major', meaningUp: '勇气、耐心、内心力量', meaningDown: '软弱、恐惧', readUp: '力量牌不是蛮力，而是内心的坚韧和温柔的勇气。用你的耐心和同理心去驯服内心的猛兽，真正的力量来自温柔。', readDown: '逆位的你在被恐惧支配。不要用暴力对抗暴力，尝试用理解和爱化解眼前的困境。' },
  { id: 9, name: '隐士', en: 'The Hermit', symbol: '🧙', arcana: 'major', meaningUp: '孤独、内省、智慧', meaningDown: '孤立、偏执', readUp: '隐士牌暗示着暂时退隐和内在探索。提一盏灯，独自上山寻找答案。孤独不是惩罚，而是智慧生长的土壤。', readDown: '逆位时你封闭太久，已经与外界脱节。是时候下山了，分享你的智慧，也听听别人的声音。' },
  { id: 10, name: '命运之轮', en: 'Wheel of Fortune', symbol: '🎡', arcana: 'major', meaningUp: '好运、转折、命运', meaningDown: '厄运、阻力', readUp: '命运之轮转动了，好运正向你而来。这是改变的时刻，抓住机遇。记住，轮子一直在转，坏的会变好，好的也需要珍惜。', readDown: '逆位时外界的阻力让你感到无力。但命运之轮不会停，低谷之后必是上升。保持耐心，等待转机。' },
  { id: 11, name: '正义', en: 'Justice', symbol: '⚖️', arcana: 'major', meaningUp: '公平、真相、法律', meaningDown: '不公、欺骗', readUp: '正义牌要求你实事求是，为自己的选择负责。因果报应真实不虚，诚实面对一切，你将得到公正的对待。', readDown: '逆位时你可能在处理不公，或者你自己的判断有偏颇。重新审视，确保你的决定是平衡和公正的。' },
  { id: 12, name: '倒吊人', en: 'The Hanged Man', symbol: '🙃', arcana: 'major', meaningUp: '牺牲、换个角度看', meaningDown: '拖延、固执', readUp: '倒吊人教你换一个角度看世界。有时候以退为进，暂时的牺牲会带来更深的领悟。停下来、臣服、看开。', readDown: '逆位时你在无谓地拖延。不要用"需要时间思考"来逃避行动，该做决定的时候到了。' },
  { id: 13, name: '死神', en: 'Death', symbol: '💀', arcana: 'major', meaningUp: '结束、转变、重生', meaningDown: '抵抗改变', readUp: '死神牌不是灾难，而是深刻的转变。旧的不去新的不来，放手那些不再服务于你的东西，为新生腾出空间。', readDown: '逆位时你死死抓住不愿放手。抗拒改变只会延长痛苦。顺其自然，让该结束的结束吧。' },
  { id: 14, name: '节制', en: 'Temperance', symbol: '⚗️', arcana: 'major', meaningUp: '平衡、耐心、调节', meaningDown: '极端、失衡', readUp: '节制牌是平衡的艺术。你需要调和生活中的各种元素，保持耐心和适度。中庸之道是通往平和的关键。', readDown: '逆位时你失去了平衡。生活中某方面过度了，需要调整。不要走极端，找到中间的那条路。' },
  { id: 15, name: '恶魔', en: 'The Devil', symbol: '😈', arcana: 'major', meaningUp: '束缚、欲望、贪婪', meaningDown: '觉醒、解脱', readUp: '恶魔牌照出你内心的欲望和执念。你被什么束缚住了？看清它，你就能挣脱。真正的自由来自直面自己的阴影。', readDown: '逆位的恶魔预示着你正在觉醒。那些曾经控制你的枷锁正在松动。勇敢地切断束缚你的链条吧。' },
  { id: 16, name: '高塔', en: 'The Tower', symbol: '🗼', arcana: 'major', meaningUp: '突变、崩塌、启示', meaningDown: '避免灾难', readUp: '高塔象征着突如其来的变故。旧的信念或结构在崩塌，虽然痛苦，但这是必要的摧毁。暴风雨过后，你会看得更清晰。', readDown: '逆位时你还在试图阻止不可避免的崩塌。有时候重建比修补更好，允许旧的坍塌才能建设新的。' },
  { id: 17, name: '星星', en: 'The Star', symbol: '⭐', arcana: 'major', meaningUp: '希望、灵感、平静', meaningDown: '绝望、失望', readUp: '星星牌是夜空中最温柔的光。经历了风暴之后，星星给你带来希望和治愈。保持信念，未来是明亮的。', readDown: '逆位时你可能感到迷茫和失望。但星星从未消失，只是被云遮住了。相信希望，光就在云层之上。' },
  { id: 18, name: '月亮', en: 'The Moon', symbol: '🌙', arcana: 'major', meaningUp: '幻想、不安、恐惧', meaningDown: '释放恐惧', readUp: '月亮牌代表潜意识的恐惧和幻觉。你看到的并不一定是真实的。保持警觉，但也别让恐惧控制你。真相会随着黎明显现。', readDown: '逆位时你正在释放深层的恐惧。那些困扰你的幻觉逐渐消散，你在走向清醒和光明。' },
  { id: 19, name: '太阳', en: 'The Sun', symbol: '☀️', arcana: 'major', meaningUp: '成功、快乐、活力', meaningDown: '暂时的困难', readUp: '太阳牌是最积极的牌。成功的喜悦、生命的活力、清晰的未来。你沐浴在阳光下，一切都在欣欣向荣。', readDown: '逆位的太阳只是暂时的阴霾。你的热情可能短暂受挫，但太阳总会再次升起。保持积极的心态。' },
  { id: 20, name: '审判', en: 'Judgement', symbol: '📯', arcana: 'major', meaningUp: '复活、觉醒、审判', meaningDown: '自省、后悔', readUp: '审判牌召唤你醒来。这是一个自我评估和重生的时刻。倾听内心的召唤，过去的都过去了，新的你正在诞生。', readDown: '逆位时你拒绝面对自己的内心审判。自我怀疑和后悔在困扰你。宽恕自己，才能继续前行。' },
  { id: 21, name: '世界', en: 'The World', symbol: '🌍', arcana: 'major', meaningUp: '完成、成就、圆满', meaningDown: '未完成、停滞', readUp: '世界牌是圆满的终极象征。一个周期完成了，你达到了目标。庆祝你的成就，然后准备迎接新的旅程。', readDown: '逆位时你可能离完成还有一步之遥。不要气馁，最后的冲刺往往最需要耐心。很快你就能到达终点。' },

  // === Minor Arcana - 权杖 (Wands) ===
  { id: 22, name: '权杖一', symbol: '🔥', arcana: 'minor', suit: 'wands', meaningUp: '新开始、灵感、创造', meaningDown: '延迟、计划受阻' },
  { id: 23, name: '权杖二', symbol: '🔥', arcana: 'minor', suit: 'wands', meaningUp: '规划、决策、离开舒适区', meaningDown: '恐惧变化、犹豫' },
  { id: 24, name: '权杖三', symbol: '🔥', arcana: 'minor', suit: 'wands', meaningUp: '远行、扩张、前瞻', meaningDown: '阻碍、延迟' },
  { id: 25, name: '权杖四', symbol: '🔥', arcana: 'minor', suit: 'wands', meaningUp: '庆祝、回家、和谐', meaningDown: '不稳定的基础' },
  { id: 26, name: '权杖五', symbol: '🔥', arcana: 'minor', suit: 'wands', meaningUp: '竞争、冲突、挑战', meaningDown: '和解、合作' },
  { id: 27, name: '权杖六', symbol: '🔥', arcana: 'minor', suit: 'wands', meaningUp: '胜利、认可、自信', meaningDown: '骄傲、失败' },
  { id: 28, name: '权杖七', symbol: '🔥', arcana: 'minor', suit: 'wands', meaningUp: '坚持、防御、勇敢', meaningDown: '屈服、放弃' },
  { id: 29, name: '权杖八', symbol: '🔥', arcana: 'minor', suit: 'wands', meaningUp: '快速、行动、旅行', meaningDown: '延误、失速' },
  { id: 30, name: '权杖九', symbol: '🔥', arcana: 'minor', suit: 'wands', meaningUp: '警惕、坚韧、等待', meaningDown: '疲惫、偏执' },
  { id: 31, name: '权杖十', symbol: '🔥', arcana: 'minor', suit: 'wands', meaningUp: '负担、压力、责任', meaningDown: '释放、放手' },

  // === Minor Arcana - 圣杯 (Cups) ===
  { id: 32, name: '圣杯一', symbol: '🏆', arcana: 'minor', suit: 'cups', meaningUp: '爱情、喜悦、丰盛', meaningDown: '空虚、压抑' },
  { id: 33, name: '圣杯二', symbol: '🏆', arcana: 'minor', suit: 'cups', meaningUp: '连接、爱情、友谊', meaningDown: '分离、不和谐' },
  { id: 34, name: '圣杯三', symbol: '🏆', arcana: 'minor', suit: 'cups', meaningUp: '庆祝、友谊、欢乐', meaningDown: '过度放纵' },
  { id: 35, name: '圣杯四', symbol: '🏆', arcana: 'minor', suit: 'cups', meaningUp: '冥想、不满、冷漠', meaningDown: '新机会' },
  { id: 36, name: '圣杯五', symbol: '🏆', arcana: 'minor', suit: 'cups', meaningUp: '失落、悲伤、遗憾', meaningDown: '接受、继续前行' },
  { id: 37, name: '圣杯六', symbol: '🏆', arcana: 'minor', suit: 'cups', meaningUp: '回忆、怀旧、礼物', meaningDown: '停滞、执念' },
  { id: 38, name: '圣杯七', symbol: '🏆', arcana: 'minor', suit: 'cups', meaningUp: '幻想、选择、白日梦', meaningDown: '聚焦、现实' },
  { id: 39, name: '圣杯八', symbol: '🏆', arcana: 'minor', suit: 'cups', meaningUp: '离开、寻找、探索', meaningDown: '迷失、逃避' },
  { id: 40, name: '圣杯九', symbol: '🏆', arcana: 'minor', suit: 'cups', meaningUp: '满足、享受、梦想成真', meaningDown: '虚荣、不满' },
  { id: 41, name: '圣杯十', symbol: '🏆', arcana: 'minor', suit: 'cups', meaningUp: '幸福、和谐、家庭', meaningDown: '破碎的家' },

  // === Minor Arcana - 宝剑 (Swords) ===
  { id: 42, name: '宝剑一', symbol: '⚔️', arcana: 'minor', suit: 'swords', meaningUp: '真理、突破、新想法', meaningDown: '混乱、误解' },
  { id: 43, name: '宝剑二', symbol: '⚔️', arcana: 'minor', suit: 'swords', meaningUp: '抉择、权衡、僵局', meaningDown: '信息过多' },
  { id: 44, name: '宝剑三', symbol: '⚔️', arcana: 'minor', suit: 'swords', meaningUp: '心碎、痛苦、悲伤', meaningDown: '释放痛苦' },
  { id: 45, name: '宝剑四', symbol: '⚔️', arcana: 'minor', suit: 'swords', meaningUp: '休息、恢复、冥想', meaningDown: '躁动、倦怠' },
  { id: 46, name: '宝剑五', symbol: '⚔️', arcana: 'minor', suit: 'swords', meaningUp: '冲突、失落、屈辱', meaningDown: '和解、释然' },
  { id: 47, name: '宝剑六', symbol: '⚔️', arcana: 'minor', suit: 'swords', meaningUp: '过渡、旅行、疗愈', meaningDown: '未解决的过去' },
  { id: 48, name: '宝剑七', symbol: '⚔️', arcana: 'minor', suit: 'swords', meaningUp: '策略、欺骗、计划', meaningDown: '诚实、直面' },
  { id: 49, name: '宝剑八', symbol: '⚔️', arcana: 'minor', suit: 'swords', meaningUp: '束缚、困境、限制', meaningDown: '解放、自由' },
  { id: 50, name: '宝剑九', symbol: '⚔️', arcana: 'minor', suit: 'swords', meaningUp: '焦虑、噩梦、恐惧', meaningDown: '希望、治愈' },
  { id: 51, name: '宝剑十', symbol: '⚔️', arcana: 'minor', suit: 'swords', meaningUp: '结束、失败、终结', meaningDown: '重生、黎明前' },

  // === Minor Arcana - 星币 (Pentacles) ===
  { id: 52, name: '星币一', symbol: '🪙', arcana: 'minor', suit: 'pentacles', meaningUp: '财富、机会、开始', meaningDown: '失财、错失机会' },
  { id: 53, name: '星币二', symbol: '🪙', arcana: 'minor', suit: 'pentacles', meaningUp: '平衡、适应、改变', meaningDown: '失衡、分心' },
  { id: 54, name: '星币三', symbol: '🪙', arcana: 'minor', suit: 'pentacles', meaningUp: '团队、学习、技能', meaningDown: '缺乏努力' },
  { id: 55, name: '星币四', symbol: '🪙', arcana: 'minor', suit: 'pentacles', meaningUp: '节约、稳定、控制', meaningDown: '贪婪、囤积' },
  { id: 56, name: '星币五', symbol: '🪙', arcana: 'minor', suit: 'pentacles', meaningUp: '贫困、孤立、担忧', meaningDown: '找到帮助' },
  { id: 57, name: '星币六', symbol: '🪙', arcana: 'minor', suit: 'pentacles', meaningUp: '慷慨、分享、援助', meaningDown: '自私、债务' },
  { id: 58, name: '星币七', symbol: '🪙', arcana: 'minor', suit: 'pentacles', meaningUp: '耐心、投资、等待', meaningDown: '浪费、糟糕的投资' },
  { id: 59, name: '星币八', symbol: '🪙', arcana: 'minor', suit: 'pentacles', meaningUp: '技能、勤奋、专注', meaningDown: '完美主义' },
  { id: 60, name: '星币九', symbol: '🪙', arcana: 'minor', suit: 'pentacles', meaningUp: '丰收、奢华、自足', meaningDown: '孤独、表面光鲜' },
  { id: 61, name: '星币十', symbol: '🪙', arcana: 'minor', suit: 'pentacles', meaningUp: '财富、传承、家庭', meaningDown: '破产、失去' },
]

export function drawCards(count = 3) {
  const shuffled = [...tarotCards].sort(() => Math.random() - 0.5)
  return shuffled.slice(0, count).map(card => ({
    ...card,
    reversed: Math.random() > 0.5,
  }))
}

export { tarotCards }
export function getAllCards() {
  return tarotCards
}
