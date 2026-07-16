export async function POST(req) {
  // 预留支付接口，暂时返回模拟成功的响应
  const body = await req.json().catch(() => ({}))
  return Response.json({
    success: true,
    message: '支付接口已预留，待接入微信支付',
    orderId: 'MOCK_' + Date.now(),
  })
}
