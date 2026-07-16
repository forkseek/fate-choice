import './globals.css'

export const metadata = {
  title: '命运之选 - 吉普赛占卜',
  description: '帮你做决定的占卜工具',
}

export default function RootLayout({ children }) {
  return (
    <html lang="zh-CN">
      <body>{children}</body>
    </html>
  )
}
