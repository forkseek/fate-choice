export async function POST(req) {
  const { options } = await req.json()
  if (!options || options.length === 0) {
    return Response.json({ error: '请提供选项' }, { status: 400 })
  }
  const pick = options[Math.floor(Math.random() * options.length)]
  return Response.json({ result: pick })
}
