// app/page.tsx
import type { ReactNode } from 'react';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="relative min-h-screen bg-black overflow-hidden">
      {/* 群星闪耀动画背景 */}
      <div className="absolute top-0 left-0 w-full h-full z-0">
        <canvas id="starry-sky"></canvas>
      </div>
      {/* 内容部分 */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen">
        <h1 className="text-4xl font-bold text-white mb-8">欢迎来到博客世界</h1>
        <Link href="/blog" className="px-8 py-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-300">
          进入博客列表
        </Link>
      </div>
    </div>
  );
}
