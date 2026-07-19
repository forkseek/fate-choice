// AI 占卜 API - 支持本地回退（无 API Key 时自动使用本地占卜）
export async function POST(req) {
  try {
    const { options, cards, question } = await req.json()
    if (!options || options.length < 2) {
      return Response.json({ error: '请提供至少2个选项' }, { status: 400 })
    }

    const apiKey = process.env.AI_API_KEY || ''

    // 没有 API Key → 本地占卜回退
    if (!apiKey) {
      return Response.json({ success: true, reading: localReading(options, cards, question) })
    }

    // ─── 有 API Key → 调用 AI ───
    const baseURL = process.env.AI_BASE_URL || 'https://api.deepseek.com'
    const model = process.env.AI_MODEL || 'deepseek-chat'
    const positions = ['过去', '现在', '未来']
    const cardText = cards.map((c, i) =>
      `第${i+1}张牌【${positions[i] || '未知'}】：${c.name}（${c.upright ? '正位' : '逆位'}）\n关键字：${c.upright ? (c.meaningUp || '') : (c.meaningDown || '')}\n解读：${c.upright ? (c.readUp || '') : (c.readDown || '')}`
    ).join('\n\n')

    const prompt = `你是一个吉普赛塔罗占卜师"命运女巫"。请结合塔罗牌和用户的问题，给出有诗意的占卜解读和建议。

用户问题：${question || '请帮我做个决定'}
用户选项：${options.join('、')}

塔罗牌阵：
${cardText}

请按以下格式回复（不要用JSON，直接文字）：
🔮 占卜解读：（2-3句话概括）
🃏 牌面分析：（逐张分析）
💡 命运建议：（具体的行动建议）
🏆 我的推荐：（推荐选哪个选项及原因）`

    const url = baseURL.endsWith('/chat/completions') ? baseURL : baseURL + '/chat/completions'

    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${apiKey}` },
      body: JSON.stringify({ model, messages: [
        { role: 'system', content: '你是一个吉普赛塔罗占卜师"命运女巫"。请用中文回答，有诗意又温暖。' },
        { role: 'user', content: prompt },
      ], temperature: 0.8, max_tokens: 2000 }),
    })

    if (!res.ok) {
      const errText = await res.text().catch(() => '')
      console.error('API error:', res.status, errText)
      throw new Error(`API returned ${res.status}`)
    }

    const data = await res.json()
    const text = data.choices?.[0]?.message?.content || '命运沉默不语，请再试一次 🙏'
    return Response.json({ success: true, reading: text })

  } catch (err) {
    console.error('Tarot AI error:', err.message)
    return Response.json({ success: false, reading: '🔮 命运之轮暂时停转，请稍后再来占卜 🙏' })
  }
}

// ─── 本地占卜回退 ───
function localReading(options, cards, question) {
  const positions = ['过去', '现在', '未来']
  const lines = cards.map((c, i) => {
    const pos = positions[i] || '位置' + (i+1)
    const dir = c.upright ? '正位' : '逆位'
    const meaning = c.upright ? (c.meaningUp || '未知') : (c.meaningDown || '未知')
    return `**${pos}** — ${c.name}（${dir}）\n> ${meaning}`
  }).join('\n\n')

  const opts = options.join('、')

  // 推荐逻辑
  const pick = options[Math.floor(Math.random() * options.length)]
  const reject = options.find(o => o !== pick)

  return `🔮 **占卜解读**\n命运之轮已将你带到这一刻。塔罗牌显示你正处在人生的十字路口，` +
    `${cards[0]?.name || '未知'}的能量笼罩着${opts}之间的抉择。` +
    `内心的声音与外界的信号正在交织成一幅指引的画卷。\n\n` +
    `🃏 **牌面分析**\n${lines}\n\n` +
    `💡 **命运建议**\n` +
    `✦ 静下心来，倾听第一直觉——你的潜意识已经知道答案。\n` +
    `✦ 不要被短期波动迷惑，看长远趋势才是关键。\n` +
    `✦ 可以找人聊聊，但最终决定权在你手中。\n\n` +
    `🏆 **我的推荐**\n` +
    `综合牌面来看，我更倾向于推荐 **「${pick}」**。` +
    (reject ? `虽然「${reject}」也有它的道理，但${cards[0]?.upright ? '正位' : '逆位'}的${cards[0]?.name || '牌'}暗示着选择「${pick}」会让你走得更远。` : '') +
    `\n\n*（以上为 AI 辅助占卜，仅供参考。命运最终掌握在你自己手中 🌙）*`
}
