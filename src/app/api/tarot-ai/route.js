// AI 占卜 API - 直接使用 fetch，兼容任何 OpenAI 格式的 API
export async function POST(req) {
  try {
    const { options, cards, question } = await req.json()
    if (!options || options.length < 2) {
      return Response.json({ error: '请提供至少2个选项' }, { status: 400 })
    }

    const positions = ['过去', '现在', '未来']
    const cardText = cards.map((c, i) =>
      `第${i+1}张牌【${positions[i] || '未知'}】：${c.name}（${c.upright ? '正位' : '逆位'}）
关键字：${c.upright ? (c.meaningUp || '') : (c.meaningDown || '')}
解读：${c.upright ? (c.readUp || '') : (c.readDown || '')}`
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

    const baseURL = process.env.AI_BASE_URL || 'https://api.deepseek.com'
    const apiKey = process.env.AI_API_KEY || ''
    const model = process.env.AI_MODEL || 'deepseek-chat'

    // 兼容不同 API 的路径格式
    let url = baseURL.endsWith('/chat/completions') ? baseURL : baseURL + '/chat/completions'

    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model,
        messages: [
          { role: 'system', content: '你是一个吉普赛塔罗占卜师"命运女巫"。请用中文回答，有诗意又温暖。' },
          { role: 'user', content: prompt },
        ],
        temperature: 0.8,
        max_tokens: 2000,
      }),
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
    return Response.json({
      success: false,
      reading: '🔮 命运之轮暂时停转，请稍后再来占卜 🙏\n（提示：检查 API Key 是否配置正确）',
    })
  }
}
