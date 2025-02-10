// app/blog/[slug]/page.tsx
import React from 'react';
import matter from 'gray-matter';
import fs from 'fs';
import path from 'path';

const getBlogPostBySlug = async (slug: string) => {
  try {
    const blogDirectory = path.join(process.cwd(), 'blogs');
    const fullPath = path.join(blogDirectory, `${slug}.md`);
    const fileContents = await fs.promises.readFile(fullPath, 'utf8');
    const { data, content } = matter(fileContents);

    return {
      title: data.title,
      content,
    };
  } catch (error) {
    console.error('Error reading blog post:', error);
    return null;
  }
};

const BlogPost = async ({ params }: { params: { slug: string } }) => {
  const post = await getBlogPostBySlug(params.slug);

  if (!post) {
    return <div>Post not found</div>;
  }

  return (
    <div>
      <h1>{post.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: post.content }} />
    </div>
  );
};

export default BlogPost;