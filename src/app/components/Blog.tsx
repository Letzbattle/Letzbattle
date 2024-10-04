
import Particles from '@/components/magicui/particles';
import React from 'react';

function Blog() {
  const blogs = [
    {
      title: 'How to Succeed in Online Tournaments',
      date: 'October 1, 2024',
      excerpt: 'Participating in online tournaments can be challenging. This article provides key strategies and tips on how to prepare, practice, and dominate in competitive gaming events.',
    },
    {
      title: 'BGMI: The Future of Mobile Esports',
      date: 'September 20, 2024',
      excerpt: 'BGMI has quickly become a major player in the mobile esports scene. Explore its rise and why it is shaping the future of mobile gaming.',
    },
    {
      title: 'What Makes a Great Gaming Organization?',
      date: 'September 15, 2024',
      excerpt: 'From talent management to effective tournament organization, learn what it takes to build and run a successful gaming organization in today’s competitive landscape.',
    },
    // Add more blogs
  ];

  return (
    <div className="p-6 bg-black dark:bg-gray-900 min-h-screen">
      <Particles
        className="fixed inset-0 h-full w-full"
        quantity={500}
        ease={100}
        color="#ffffff"
        refresh
      />
      <h1 className="text-4xl font-bold text-white text-center my-8 mt-24">Blog</h1>
      <div className="max-w-4xl mx-auto relative z-10">
        {blogs.map((blog, index) => (
          <div key={index} className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg mb-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{blog.title}</h2>
            <p className="text-gray-500 dark:text-gray-400">{blog.date}</p>
            <p className="text-gray-700 dark:text-gray-300 mt-4">{blog.excerpt}</p>
            <a href="#" className="text-blue-500 mt-2 inline-block">Read more</a>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Blog;
