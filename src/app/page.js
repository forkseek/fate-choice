'use client'
import { useState, useMemo } from 'react'
import { tarotCards } from './tarot-data'

const SCENES = {
  shopping: [
    { icon: '📱', text: 'iPhone vs 小米 买哪个？', opts: ['iPhone', '小米'] },
    { icon: '👟', text: '这双鞋买白色还是黑色？', opts: ['白色', '黑色'] },
    { icon: '🎧', text: 'AirPods Pro 还是 Sony 降噪耳机？', opts: ['AirPods Pro', 'Sony'] },
  ],
  study: [
    { icon: '💻', text: '暑假学编程还是学英语？', opts: ['学编程', '学英语'] },
    { icon: '📖', text: '考研还是直接工作？', opts: ['考研', '直接工作'] },
    { icon: '🎓', text: '选文科还是理科？', opts: ['文科', '理科'] },
  ],
  love: [
    { icon: '💌', text: '要不要主动加TA微信？', opts: ['主动加', '再等等'] },
    { icon: '💔', text: '吵架了 主动哄TA还是等TA消气？', opts: ['主动哄TA', '等TA消气'] },
    { icon: '💔', text: '感觉不合适 继续还是放手？', opts: ['继续', '放手'] },
  ],
  work: [
    { icon: '💰', text: '涨薪20%但更累 跳不跳槽？', opts: ['跳槽', '留下'] },
    { icon: '🏠', text: '留在大城市还是回老家？', opts: ['大城市', '回老家'] },
  ],
  life: [
    { icon: '🍲', text: '今晚吃火锅还是烤肉？', opts: ['火锅', '烤肉'] },
    { icon: '🎮', text: '周末宅家还是出去浪？', opts: ['宅家', '出去浪'] },
    { icon: '✈️', text: '去三亚还是成都？', opts: ['三亚', '成都'] },
  ],
}

const TRENDING = {
  eat: ['火锅', '烤肉', '日料', '川菜', '粤菜', '泰国菜', '小龙虾', '麻辣烫'],
  movie: ['流浪地球3', '哪吒之魔童闹海', '封神第二部', '功夫熊猫4', '沙丘2', '热辣滚烫'],
  game: ['黑神话悟空', '原神', '王者荣耀', '绝区零', '永劫无间', '无畏契约'],
  show: ['庆余年2', '繁花', '大唐狄公案', '凡人修仙传', '大江大河3', '玫瑰故事'],
  travel: ['成都', '重庆', '西安', '长沙', '大理', '厦门', '青岛'],
}

const MOODS = [
  { id: 'tired', icon: '😫', label: '上班好累', tip: '继续卷 or 躺平？', opts: ['继续卷', '果断躺平'] },
  { id: 'sad', icon: '😤', label: '心情不好', tip: '来看看怎么哄自己开心', opts: ['出去大吃一顿', '在家看剧'] },
  { id: 'shop', icon: '🛍️', label: '想花钱', tip: '看看买哪个更值', opts: ['买贵的', '省下来'] },
  { id: 'confused', icon: '😵', label: '好迷茫', tip: '让塔罗牌给你一点指引', opts: ['先停下来想想', '往前走试试'] },
  { id: 'bored', icon: '🥱', label: '好无聊', tip: '让命运给你安排点乐子', opts: ['出去玩', '学新技能'] },
  { id: 'eat', icon: '🍔', label: '饿了', tip: '看看最近大家都在吃什么', opts: ['出去吃', '点外卖'] },
  { id: 'movie', icon: '🎬', label: '看电影', tip: '最近这些电影超火', opts: ['看热门', '看小众'] },
  { id: 'play', icon: '🎮', label: '打游戏', tip: '看看哪个合你口味', opts: ['玩手游', '玩端游'] },
  { id: 'love', icon: '💕', label: '想谈恋爱', tip: '占卜一下你的桃花运', opts: ['主动出击', '随缘吧'] },
  { id: 'money', icon: '💰', label: '想搞钱', tip: '看看哪条路更适合你', opts: ['搞副业', '提升技能涨薪'] },
  { id: 'travel', icon: '✈️', label: '想旅游', tip: '最近热门旅行地推荐', opts: ['去南方', '去北方'] },
  { id: 'watch', icon: '📺', label: '追剧', tip: '最近这些剧很火', opts: ['看古装剧', '看现代剧'] },
]

const SUITS = { wands: '🔥', cups: '🏆', swords: '⚔️', pentacles: '🪙' }
const ELEMENTS = { wands: '火', cups: '水', swords: '风', pentacles: '土' }

function TarotCard({ card, upright, compact }) {
  return (
    <div className={`relative ${compact ? 'w-[130px]' : 'w-[160px]'} animate-popIn`}>
      <div className={`rounded-[10px] p-2.5 text-center ${compact ? 'p-2' : 'p-3'}`}
        style={{
          background: upright ? 'linear-gradient(145deg, #1a0e08, #2a1508)' : 'linear-gradient(145deg, #1a0806, #2a0a06)',
          border: upright ? '2px solid rgba(212,168,84,0.3)' : '2px solid rgba(200,60,40,0.25)',
        }}>
        <div className="absolute top-1 left-1.5 text-[6px]" style={{ color: upright ? 'rgba(212,168,84,0.2)' : 'rgba(200,60,40,0.15)' }}>◈</div>
        <div className="absolute top-1 right-1.5 text-[6px]" style={{ color: upright ? 'rgba(212,168,84,0.2)' : 'rgba(200,60,40,0.15)' }}>◈</div>
        {card.value !== undefined && (
          <div className="text-[8px] font-bold mb-0.5" style={{ color: upright ? 'rgba(212,168,84,0.2)' : 'rgba(200,60,40,0.15)' }}>
            {card.arcana === 'major' ? `No.${card.value}` : card.value}
          </div>
        )}
        <div className={`flex items-center justify-center ${compact ? 'my-1' : 'my-2'}`}>
          <div className={`rounded-full flex items-center justify-center ${compact ? 'w-10 h-10' : 'w-12 h-12'}`}
            style={{
              background: upright ? 'radial-gradient(circle, rgba(212,168,84,0.08), transparent)' : 'radial-gradient(circle, rgba(200,60,40,0.06), transparent)',
              border: `1px solid ${upright ? 'rgba(212,168,84,0.1)' : 'rgba(200,60,40,0.08)'}`,
            }}>
            <span className={`${compact ? 'text-lg' : 'text-xl'}`}>{card.symbol || '🃏'}</span>
          </div>
        </div>
        <div className={`font-bold leading-tight ${compact ? 'text-[9px]' : 'text-[10px]'}`}
          style={{ color: upright ? 'rgba(212,168,84,0.7)' : 'rgba(200,100,80,0.5)' }}>
          {card.name}
        </div>
        {card.suit && (
          <div className={`${compact ? 'text-[7px]' : 'text-[8px]'} mt-0.5`}
            style={{ color: upright ? 'rgba(212,168,84,0.15)' : 'rgba(200,100,80,0.1)' }}>
            {SUITS[card.suit] || ''} {ELEMENTS[card.suit] || ''}
          </div>
        )}
        <div className={`${compact ? 'text-[7px]' : 'text-[8px]'} font-bold mt-1 mb-0.5`}
          style={{ color: upright ? 'rgba(212,168,84,0.35)' : 'rgba(200,60,40,0.25)' }}>
          {upright ? '✦ 正位' : '⚡ 逆位'}
        </div>
        <div className={`${compact ? 'text-[6px]' : 'text-[7px]'} leading-tight`}
          style={{ color: 'rgba(255,220,180,0.25)' }}>
          {upright ? (card.meaningUp || '') : (card.meaningDown || card.meaningUp || '')}
        </div>
        {!compact && card.readUp && (
          <div className="mt-2 pt-2 text-[8px] leading-relaxed text-center"
            style={{ color: 'rgba(255,220,180,0.4)', borderTop: '1px solid rgba(212,168,84,0.08)' }}>
            <div className="text-[7px] tracking-wider mb-1" style={{ color: upright ? 'rgba(212,168,84,0.2)' : 'rgba(200,60,40,0.15)' }}>
              ─ 🔮 命运建议 ─
            </div>
            <div>{upright ? (card.readUp || '') : (card.readDown || card.readUp || '')}</div>
          </div>
        )}
        <div className="absolute bottom-1 left-1.5 text-[6px]" style={{ color: upright ? 'rgba(212,168,84,0.2)' : 'rgba(200,60,40,0.15)' }}>◈</div>
        <div className="absolute bottom-1 right-1.5 text-[6px]" style={{ color: upright ? 'rgba(212,168,84,0.2)' : 'rgba(200,60,40,0.15)' }}>◈</div>
      </div>
    </div>
  )
}

export default function Home() {
  const cards = useMemo(() => tarotCards, [])
  const [options, setOptions] = useState(['', ''])
  const [result, setResult] = useState(null)
  const [animating, setAnimating] = useState(false)
  const [showInspire, setShowInspire] = useState(false)
  const [showMoods, setShowMoods] = useState(false)
  const [selectedPro, setSelectedPro] = useState(false)
  const [drawnCards, setDrawnCards] = useState([])
  const [deckMode, setDeckMode] = useState(false)
  const [moodTip, setMoodTip] = useState('')
  const [question, setQuestion] = useState('')
  const [aiLoading, setAiLoading] = useState(false)
  const [aiResult, setAiResult] = useState(null)

  const shuffle = (arr) => [...arr].sort(() => Math.random() - 0.5)
  const pick = (arr) => arr[Math.floor(Math.random() * arr.length)]

  const addOption = () => {
    if (options.length >= 10) return
    setOptions([...options, ''])
  }
  const updateOption = (idx, val) => {
    const next = [...options]; next[idx] = val; setOptions(next)
  }
  const removeOption = (idx) => {
    if (options.length <= 2) return
    setOptions(options.filter((_, i) => i !== idx))
  }

  const doTarot = (numCards = 1) => {
    const shuffled = shuffle(cards)
    const drawn = []
    for (let i = 0; i < numCards && i < shuffled.length; i++) {
      drawn.push({ ...shuffled[i], upright: Math.random() > 0.2 })
    }
    return drawn
  }

  const pickRandom = () => {
    const valid = options.filter(o => o.trim())
    if (valid.length < 2) return
    setAnimating(true)
    setResult(null); setDrawnCards([]); setDeckMode(false)
    setTimeout(() => {
      setResult(pick(valid))
      setAnimating(false)
      setDrawnCards(doTarot(1))
    }, 800)
  }

  const askAI = async () => {
    const valid = options.filter(o => o.trim())
    if (valid.length < 2) { alert('请先输入至少2个选项'); return }
    setAiLoading(true); setAiResult(null)
    const newCards = doTarot(3)
    setDrawnCards(newCards); setDeckMode(true)
    try {
      const res = await fetch('/api/tarot-ai', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          options: valid,
          cards: newCards,
          question: question || '请帮我做个决定',
        }),
      })
      const data = await res.json()
      setAiResult(data)
    } catch (e) {
      setAiResult({ reading: '网络不通，请稍后再试 🙏', recommendation: '' })
    }
    setAiLoading(false)
  }

  const handleMood = (m) => {
    setShowMoods(false); setMoodTip(m.tip)
    if (['eat','movie','play','watch','travel'].includes(m.id)) {
      const items = shuffle(TRENDING[m.id === 'play' ? 'game' : m.id === 'watch' ? 'show' : m.id]).slice(0, 4)
      setOptions([items[0], items[1]])
      setAnimating(true)
      setTimeout(() => { setResult(pick(items.slice(0,2))); setAnimating(false); setDrawnCards(doTarot(1)) }, 800)
      return
    }
    setOptions(m.opts)
    setAnimating(true); setResult(null); setDrawnCards([]); setDeckMode(false)
    setTimeout(() => { setResult(pick(m.opts)); setAnimating(false); setDrawnCards(doTarot(1)) }, 800)
  }

  const drawTarot = () => {
    setAnimating(true); setDrawnCards([]); setDeckMode(true)
    setTimeout(() => { setDrawnCards(doTarot(3)); setAnimating(false) }, 1000)
  }

  const useScene = (item) => {
    setOptions(item.opts || ['是', '否']); setShowInspire(false)
  }

  const CATEGORIES = [
    { key: 'shopping', label: '🛍️ 购物', items: SCENES.shopping },
    { key: 'study', label: '📚 学习', items: SCENES.study },
    { key: 'love', label: '💕 感情', items: SCENES.love },
    { key: 'work', label: '💼 工作', items: SCENES.work },
    { key: 'life', label: '🍜 生活', items: SCENES.life },
  ]

  return (
    <div className="min-h-screen flex items-center justify-center p-3 font-serif overflow-hidden"
      style={{ background: 'radial-gradient(ellipse at 50% 0%, #d45a3a 0%, #8b2a1a 100%)' }}>
      <div className="fixed inset-0 z-0 pointer-events-none opacity-[0.06]"
        style={{ backgroundImage: 'repeating-conic-gradient(#ffd700 0% 25%, transparent 0% 50%)', backgroundSize: '60px 60px' }} />
      <div className="fixed inset-0 z-0 pointer-events-none"
        style={{ backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 4px, rgba(0,0,0,0.04) 4px, rgba(0,0,0,0.04) 5px)' }} />
      <div className="fixed inset-0 z-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at 30% 20%, rgba(255,200,100,0.15) 0%, transparent 40%), radial-gradient(ellipse at 70% 80%, rgba(200,100,50,0.08) 0%, transparent 30%)' }} />

      <div className="perspective-[900px] w-full max-w-[420px] relative z-10">
        <div className="relative rounded-[16px] overflow-hidden transition-all"
          style={{
            background: 'linear-gradient(145deg, rgba(60,20,15,0.88), rgba(40,12,8,0.92))',
            backdropFilter: 'blur(10px)',
            boxShadow: '0 10px 40px rgba(0,0,0,0.4), 0 0 30px rgba(200,100,50,0.06)',
            transform: 'rotateX(2deg) rotateY(-1deg)',
            border: '1px solid rgba(255,200,100,0.08)',
          }}>
          <div className="absolute top-[4px] left-3 right-3 h-[3px] rounded opacity-30"
            style={{ background: 'repeating-linear-gradient(90deg, #ffd700 0px, #ffd700 6px, #8b4513 6px, #8b4513 10px, #ffd700 10px, #ffd700 16px)' }} />
          <div className="absolute bottom-[4px] left-3 right-3 h-[3px] rounded opacity-30"
            style={{ background: 'repeating-linear-gradient(90deg, #ffd700 0px, #ffd700 6px, #8b4513 6px, #8b4513 10px, #ffd700 10px, #ffd700 16px)' }} />

          <div className="p-5 pb-4 relative z-[2] max-h-[85vh] overflow-y-auto scrollbar-thin">
            <div className="text-center mb-3">
              <div className="w-11 h-11 mx-auto mb-1 rounded-full relative"
                style={{ background: 'radial-gradient(circle at 35% 25%, rgba(255,220,180,0.4), rgba(200,100,50,0.1) 40%, rgba(80,30,15,0.15) 70%)', boxShadow: '0 0 12px rgba(255,200,100,0.08)' }} />
              <h1 className="text-[#ffd700] text-xl font-bold tracking-[4px]">命运之选</h1>
              <p className="text-[10px] text-[rgba(255,200,150,0.4)] tracking-[4px] italic">吉普赛塔罗占卜</p>
            </div>

            <div className="flex items-center gap-1.5 my-2">
              <div className="flex-1 h-[1px]" style={{ background: 'linear-gradient(90deg, transparent, rgba(255,200,100,0.12), transparent)' }} />
              <span className="text-[rgba(255,200,100,0.15)] text-[8px] tracking-[4px]">✦ ✦</span>
              <div className="flex-1 h-[1px]" style={{ background: 'linear-gradient(90deg, transparent, rgba(255,200,100,0.12), transparent)' }} />
            </div>

            <div className="rounded-[10px] p-2.5 mb-2"
              style={{ background: 'rgba(0,0,0,0.15)', border: '1px solid rgba(255,200,100,0.05)' }}>
              <div className="flex items-center gap-1.5 mb-1.5 text-[11px] font-semibold text-[rgba(255,200,150,0.6)]">
                ✦ 我在纠结
                <span className="text-[8px] px-1.5 py-0.5 rounded border"
                  style={{ background: 'rgba(255,200,100,0.04)', color: 'rgba(255,200,150,0.3)', borderColor: 'rgba(255,200,100,0.04)' }}>最多10项</span>
              </div>
              {options.map((opt, i) => (
                <div key={i} className="flex gap-1 mb-1">
                  <input className="flex-1 px-2.5 py-2 rounded-[7px] text-xs outline-none font-serif"
                    style={{ border: '1px solid rgba(255,200,100,0.05)', background: 'rgba(0,0,0,0.2)', color: 'rgba(255,220,180,0.7)' }}
                    value={opt} onChange={(e) => updateOption(i, e.target.value)} placeholder="输入选项" />
                  <button onClick={() => removeOption(i)}
                    className="w-8 h-8 rounded-[7px] flex-shrink-0 text-xs cursor-pointer"
                    style={{ border: '1px solid rgba(200,80,60,0.05)', background: 'rgba(200,50,30,0.08)', color: 'rgba(200,80,60,0.35)' }}>✕</button>
                </div>
              ))}
              <button onClick={addOption}
                className="w-full h-8 rounded-[7px] text-[11px] cursor-pointer"
                style={{ border: '1px dashed rgba(255,200,100,0.05)', color: 'rgba(255,200,150,0.2)' }}>＋ 添加选项</button>
            </div>

            {/* question input */}
            <div className="rounded-[10px] p-2.5 mb-2"
              style={{ background: 'rgba(0,0,0,0.08)', border: '1px solid rgba(255,200,100,0.03)' }}>
              <div className="text-[10px] text-[rgba(255,200,150,0.3)] mb-1.5 italic">📝 告诉巫师你的情况（选填）</div>
              <input className="w-full px-2.5 py-2 rounded-[7px] text-xs outline-none font-serif"
                style={{ border: '1px solid rgba(255,200,100,0.05)', background: 'rgba(0,0,0,0.2)', color: 'rgba(255,220,180,0.6)' }}
                value={question} onChange={(e) => setQuestion(e.target.value)}
                placeholder="比如：我最近工作压力很大，不知道该不该跳槽…" />
            </div>

            <button onClick={() => setShowMoods(!showMoods)}
              className="w-full py-2 rounded-[7px] text-[11px] italic cursor-pointer mb-1.5"
              style={{ background: 'rgba(0,0,0,0.08)', border: '1px solid rgba(255,200,100,0.05)', color: 'rgba(255,200,150,0.35)' }}>
              🎭 不知道想干嘛？告诉命运你的状态
            </button>

            {showMoods && (
              <div className="mb-2">
                <p className="text-[9px] text-[rgba(255,200,150,0.2)] text-center mb-2 italic">你今天什么心情？选一个</p>
                <div className="grid grid-cols-4 gap-1.5">
                  {MOODS.map((m) => (
                    <button key={m.id} onClick={() => handleMood(m)}
                      className="flex flex-col items-center py-2 rounded-[8px] cursor-pointer active:scale-95 hover:opacity-80"
                      style={{ background: 'rgba(0,0,0,0.1)', border: '1px solid rgba(255,200,100,0.04)' }}>
                      <span className="text-lg">{m.icon}</span>
                      <span className="text-[8px] text-[rgba(255,220,180,0.4)] mt-0.5 leading-tight text-center">{m.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {moodTip && (
              <div className="rounded-[8px] p-2 mb-1.5 animate-fadeIn text-center"
                style={{ background: 'rgba(255,200,100,0.03)', border: '1px solid rgba(255,200,100,0.06)' }}>
                <p className="text-[10px] text-[rgba(255,220,180,0.5)] italic">{moodTip}</p>
              </div>
            )}

            <button onClick={() => setShowInspire(!showInspire)}
              className="w-full py-2 rounded-[7px] text-[11px] italic cursor-pointer mb-2"
              style={{ background: 'rgba(0,0,0,0.08)', border: '1px solid rgba(255,200,100,0.04)', color: 'rgba(255,200,150,0.35)' }}>
              🔮 或者从模板里选一个题目
            </button>

            {showInspire && CATEGORIES.map((cat) => (
              <div key={cat.key}>
                <div className="flex items-center gap-1 text-[10px] font-bold text-[rgba(255,200,150,0.5)] mt-1.5 mb-1 tracking-[2px]">
                  <span>{cat.label}</span>
                  <div className="flex-1 h-[1px]" style={{ background: 'linear-gradient(90deg, rgba(255,200,100,0.06), transparent)' }} />
                </div>
                {cat.items.map((item, j) => (
                  <div key={j} className="flex items-center gap-1.5 px-2.5 py-1.5 mb-1 rounded-[8px]"
                    style={{ background: 'rgba(0,0,0,0.08)', border: '1px solid rgba(255,200,100,0.04)' }}>
                    <span className="text-sm flex-shrink-0">{item.icon}</span>
                    <span className="flex-1 text-[11px] leading-tight text-[rgba(255,220,180,0.6)]">{item.text}</span>
                    <button onClick={() => useScene(item)}
                      className="px-2.5 py-0.5 rounded-[5px] text-[9px] cursor-pointer whitespace-nowrap font-serif"
                      style={{ background: 'linear-gradient(180deg, rgba(255,200,100,0.08), rgba(200,100,50,0.04))', border: '1px solid rgba(255,200,100,0.08)', color: 'rgba(255,200,150,0.5)' }}>用这个</button>
                  </div>
                ))}
              </div>
            ))}

            <button onClick={pickRandom} disabled={animating}
              className="w-full py-2.5 rounded-[8px] text-sm font-semibold cursor-pointer tracking-[2px] mb-1.5 font-serif transition-all active:scale-[0.97] disabled:opacity-50"
              style={{ background: 'linear-gradient(180deg, rgba(255,200,100,0.06), rgba(200,100,50,0.03))', border: '1px solid rgba(255,200,100,0.08)', color: 'rgba(255,200,150,0.6)' }}>
              🔮 塔罗占卜
            </button>

            <div className="rounded-[10px] p-3.5 mb-2 min-h-[80px]"
              style={{ background: 'rgba(0,0,0,0.08)', border: '1px solid rgba(255,200,100,0.03)' }}>
              {animating ? (
                <div className="flex flex-col items-center gap-2 py-4">
                  <span className="text-2xl animate-bounce">🔮</span>
                  <span className="text-[rgba(255,200,150,0.3)] text-[10px] italic">命运正在运转</span>
                </div>
              ) : deckMode && drawnCards.length > 0 ? (
                <>
                  <p className="text-[9px] text-[rgba(255,200,150,0.2)] tracking-[2px] mb-3 text-center italic">✦ 塔罗占卜 ✦</p>
                  <div className="flex justify-center gap-2">
                    {drawnCards.map((card, i) => (
                      <TarotCard key={i} card={card} upright={card.upright} compact />
                    ))}
                  </div>
                  {aiResult && aiResult.reading && (
                    <div className="mt-3 pt-3 text-center animate-slideUp"
                      style={{ borderTop: '1px solid rgba(212,168,84,0.08)' }}>
                      <p className="text-[9px] text-[rgba(255,200,150,0.25)] tracking-[2px] mb-2 italic">✦ 巫师解读 ✦</p>
                      <div className="text-[9px] leading-relaxed text-[rgba(255,220,180,0.5)] whitespace-pre-line">{aiResult.reading}</div>
                    </div>
                  )}
                </>
              ) : result && drawnCards.length > 0 ? (
                <div className="flex flex-col items-center gap-3">
                  <TarotCard card={drawnCards[0]} upright={drawnCards[0].upright} compact={false} />
                  <div className="text-center">
                    <p className="text-[9px] text-[rgba(255,200,150,0.2)] tracking-[2px] mb-1 italic">✦ 塔罗启示 ✦</p>
                    <p className="text-lg font-bold text-[rgba(255,200,150,0.6)]">{result}</p>
                    <p className="text-[8px] text-[rgba(255,200,150,0.15)] mt-0.5">抽到：{drawnCards[0]?.name}</p>
                  </div>
                </div>
              ) : (
                <p className="text-[10px] text-[rgba(255,200,150,0.2)] text-center italic py-4">✦ 等待命运 ✦</p>
              )}
            </div>

            <button onClick={drawTarot} disabled={animating}
              className="w-full py-1.5 rounded-[7px] text-[10px] italic cursor-pointer mb-2 active:scale-[0.97]"
              style={{ background: 'rgba(0,0,0,0.05)', border: '1px solid rgba(255,200,100,0.03)', color: 'rgba(255,200,150,0.2)' }}>
              🃏 单纯抽三张塔罗牌看看运势
            </button>

            {/* Pro section */}
            <div className="rounded-[10px] p-2.5 mb-2"
              style={{ background: 'linear-gradient(180deg, rgba(255,200,100,0.04), rgba(200,100,50,0.02))', border: '1px solid rgba(255,200,100,0.08)' }}>
              <div className="flex items-center gap-1.5 mb-2">
                <span className="text-lg opacity-40">🃏</span>
                <div>
                  <p className="text-xs font-semibold text-[rgba(255,200,150,0.6)]">吉普赛巫师帮你分析</p>
                  <p className="text-[9px] text-[rgba(255,200,150,0.25)] italic">AI 根据你的选项 + 塔罗牌，给个性和建议</p>
                </div>
              </div>
              <div className="flex gap-1.5">
                <button onClick={askAI} disabled={aiLoading}
                  className="flex-1 py-2 rounded-[8px] text-xs font-medium cursor-pointer tracking-[1px] font-serif transition-all active:scale-[0.97] disabled:opacity-50"
                  style={{ background: 'linear-gradient(180deg, rgba(255,200,100,0.08), rgba(200,100,50,0.04))', border: '1px solid rgba(255,200,100,0.1)', color: 'rgba(255,200,150,0.6)' }}>
                  {aiLoading ? '🔮 占卜中…' : '✦ 免费试一次 ✦'}
                </button>
                <span className="flex items-center px-2 text-xs font-bold text-[rgba(255,200,100,0.4)]"
                  style={{ background: 'rgba(0,0,0,0.08)', border: '1px solid rgba(255,200,100,0.04)', borderRadius: '8px' }}>
                  ￥4.9
                </span>
              </div>
              <p className="text-[8px] text-[rgba(255,200,150,0.1)] mt-1.5 text-center italic">免费用户每天限用1次，付费不限次</p>
            </div>

            <div className="flex justify-between items-center pt-0.5 text-[10px] text-[rgba(255,200,150,0.1)]">
              <span>已有 <span className="text-[rgba(255,200,150,0.3)]">2,847</span> 次占卜</span>
              <div className="flex gap-2">
                <span className="cursor-pointer hover:text-[rgba(255,200,150,0.2)]">🔮 分享</span>
                <span onClick={pickRandom} className="cursor-pointer hover:text-[rgba(255,200,150,0.2)]">🔄 再占一次</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes popIn { 0% { transform: scale(0.5) rotate(-3deg); opacity: 0; } 100% { transform: scale(1) rotate(0deg); opacity: 1; } }
        @keyframes slideUp { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
        .animate-fadeIn { animation: fadeIn 0.3s ease-out; }
        .animate-popIn { animation: popIn 0.5s cubic-bezier(0.34, 1.56, 0.64, 1); }
        .animate-slideUp { animation: slideUp 0.3s ease-out; }
        .scrollbar-thin::-webkit-scrollbar { width: 3px; }
        .scrollbar-thin::-webkit-scrollbar-thumb { background: rgba(255,200,100,0.1); border-radius: 2px; }
      `}</style>
    </div>
  )
}
