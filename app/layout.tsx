import "styles/tailwind.css"
import Script from 'next/script';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        {/* 引入动画脚本 */}
        <Script src="/scripts/starry-sky.js" strategy="afterInteractive" />
      </head>
      <body>{children}</body>
    </html>
  )
}
