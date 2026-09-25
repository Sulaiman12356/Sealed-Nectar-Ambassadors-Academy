import React from 'react';
import { ArrowRight, Calendar, Clock } from 'lucide-react';
import { ImageWithFallback } from '../common/ImageWithFallback';
import { BLOG_POSTS } from '../../data/schoolData';
import { BlogPost } from '../../types';

interface BlogPreviewProps {
  onSelectPost: (post: BlogPost) => void;
  onViewAllPosts: () => void;
}

export const BlogPreview: React.FC<BlogPreviewProps> = ({
  onSelectPost,
  onViewAllPosts,
}) => {
  return (
    <section id="blog" className="py-16 sm:py-20 bg-white border-t border-[#E8DFD5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 sm:mb-12 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 mb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-[#6B1724]">
                School Journal & News
              </span>
              <span className="w-6 h-px bg-[#6B1724]" />
            </div>
            <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold text-[#221F1F]">
              Latest From Our School
            </h2>
            <p className="text-sm sm:text-base text-[#57534E] mt-1 max-w-2xl">
              Stay updated with academic activities, announcements, parenting tips and student milestones.
            </p>
          </div>

          <button
            onClick={onViewAllPosts}
            className="self-start md:self-auto inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold text-[#6B1724] bg-[#FAF7F2] border border-[#E8DFD5] hover:bg-[#F4EFEB] hover:border-[#C88A1A]/40 transition-colors shadow-xs whitespace-nowrap"
          >
            <span>View All Posts</span>
            <ArrowRight className="w-4 h-4 text-[#C88A1A]" />
          </button>
        </div>

        {/* 3 Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {BLOG_POSTS.map((post) => (
            <article
              key={post.id}
              className="bg-[#FAF7F2] border border-[#E8DFD5] rounded-xl overflow-hidden flex flex-col justify-between hover:border-[#C88A1A] transition-all hover:shadow-xs group"
            >
              <div>
                {/* Featured Image */}
                <div className="aspect-[16/10] overflow-hidden bg-[#F4EFEB] relative">
                  <ImageWithFallback
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-300"
                    fallbackText={post.title}
                  />
                </div>

                <div className="p-5">
                  {/* Category & Metadata (Anti-pill clean unboxed text) */}
                  <div className="flex items-center gap-2 text-xs text-[#57534E] mb-2 font-medium">
                    <span className="text-[#6B1724] font-semibold">{post.category}</span>
                    <span aria-hidden="true">·</span>
                    <div className="flex items-center gap-1">
                      <Calendar className="w-3 h-3 text-[#C88A1A]" />
                      <span>{post.formattedDate}</span>
                    </div>
                  </div>

                  <h3 className="font-display text-base sm:text-lg font-bold text-[#221F1F] mb-2 group-hover:text-[#6B1724] transition-colors line-clamp-2">
                    {post.title}
                  </h3>

                  <p className="text-xs text-[#57534E] leading-relaxed line-clamp-3 mb-4">
                    {post.excerpt}
                  </p>
                </div>
              </div>

              <div className="px-5 pb-5 pt-2 border-t border-[#E8DFD5]/60 flex items-center justify-between">
                <div className="flex items-center gap-1 text-[11px] text-[#57534E]">
                  <Clock className="w-3 h-3 text-[#C88A1A]" />
                  <span>{post.readTime}</span>
                </div>

                <button
                  onClick={() => onSelectPost(post)}
                  className="inline-flex items-center gap-1 text-xs font-semibold text-[#6B1724] hover:text-[#52111B] transition-colors"
                >
                  <span>Read Article</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
