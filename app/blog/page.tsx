// app/blog/page.tsx
import React from "react"
import matter from "gray-matter"
import fs from "fs"
import path from "path"
import Link from "next/link" // 引入 Next.js 的 Link 组件用于客户端导航
import { motion } from "framer-motion" // 引入 framer-motion 库用于添加动画效果

// 服务器端组件
const getBlogPosts = async () => {
  try {
    const blogDirectory = path.join(process.cwd(), "blogs") // 修正路径
    const fileNames = await fs.promises.readdir(blogDirectory)
    const posts = await Promise.all(
      fileNames.map(async (fileName) => {
        const slug = fileName.replace(/\.md$/, "")
        const fullPath = path.join(blogDirectory, fileName)
        const fileContents = await fs.promises.readFile(fullPath, "utf8")
        const { data, content } = matter(fileContents)
        const excerpt = content.split("\n")[0]

        return {
          slug,
          title: data.title,
          excerpt,
        }
      })
    )

    return posts
  } catch (error) {
    console.error("Error reading blog posts:", error)
    return []
  }
}

// 定义动画效果
const listItemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
}

const BlogList = async () => {
  const posts = await getBlogPosts()
  return (
    <>
      <motion.div
        initial="hidden"
        animate="visible"
        exit="hidden"
        variants={{
          hidden: { opacity: 0 },
          visible: { opacity: 1, transition: { duration: 0.5 } },
        }}
        className="flex min-h-screen flex-col items-center justify-center bg-gray-100"
      >
        <motion.h1
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0, y: -20 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
          }}
          className="mb-8 text-4xl font-bold text-blue-600"
        >
          Blog Posts
        </motion.h1>
        <motion.ul
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
          }}
          className="w-full max-w-2xl space-y-6"
        >
          {posts.map((post) => (
            <motion.li
              key={post.slug}
              variants={listItemVariants}
              whileHover={{ scale: 1.05, boxShadow: "0 0 10px rgba(0, 0, 0, 0.2)" }}
              className="rounded-lg bg-white p-6 shadow-md transition-transform duration-300 hover:shadow-lg"
            >
              <Link href={`/blog/${post.slug}`}>
                <span className="text-xl font-semibold text-blue-600 hover:text-blue-800">{post.title}</span>
              </Link>
              <p className="mt-2 text-gray-600">{post.excerpt || ''}</p>
            </motion.li>
          ))}
        </motion.ul>
      </motion.div>
    </>
  )
}

export default BlogList
