import React from 'react';
import { X, Calendar, Clock, Share2, ArrowLeft } from 'lucide-react';
import { BlogPost } from '../../types';
import { ImageWithFallback } from '../common/ImageWithFallback';

interface BlogPostModalProps {
  post: BlogPost | null;
  onClose: () => void;
}

export const BlogPostModal: React.FC<BlogPostModalProps> = ({ post, onClose }) => {
  if (!post) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs overflow-y-auto">
      <div className="bg-[#FAF7F2] border border-[#E8DFD5] rounded-2xl w-full max-w-3xl overflow-hidden shadow-2xl my-8">
        {/* Top Header */}
        <div className="bg-[#6B1724] text-white p-4 sm:p-5 flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs">
            <span className="font-semibold">{post.category}</span>
            <span aria-hidden="true">·</span>
            <span>{post.formattedDate}</span>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-white/80 hover:text-white hover:bg-white/10"
            aria-label="Close article"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Article Body */}
        <div className="p-6 sm:p-8 max-h-[75vh] overflow-y-auto">
          <div className="aspect-[16/9] rounded-xl overflow-hidden bg-[#F4EFEB] mb-6">
            <ImageWithFallback
              src={post.image}
              alt={post.title}
              className="w-full h-full object-cover"
              fallbackText={post.title}
            />
          </div>

          <div className="flex items-center gap-3 text-xs text-[#57534E] mb-3">
            <div className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5 text-[#C88A1A]" />
              <span>Published {post.formattedDate}</span>
            </div>
            <span>·</span>
            <div className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-[#C88A1A]" />
              <span>{post.readTime}</span>
            </div>
            <span>·</span>
            <span className="text-[#6B1724] font-medium">By SNAA Academic Editorial</span>
          </div>

          <h2 className="font-display text-2xl sm:text-3xl font-bold text-[#221F1F] mb-4 leading-tight">
            {post.title}
          </h2>

          <p className="text-sm sm:text-base font-medium text-[#6B1724] mb-6 leading-relaxed">
            {post.excerpt}
          </p>

          <div className="prose text-sm text-[#57534E] leading-relaxed space-y-4">
            <p>{post.content}</p>
            <p>
              Education at Sealed Nectar Ambassadors Academy represents a holistic blend of structured cognitive mastery and sound moral training. Every initiative, whether in language acquisition, STEM experimentation, or physical athletics, is designed to ensure our learners emerge ready to contribute responsibly to society.
            </p>
            <p>
              For more information on school programs or to schedule a visit to our classrooms in Makun, Sagamu, please reach out to our administration office.
            </p>
          </div>
        </div>

        {/* Modal Bottom Bar */}
        <div className="bg-[#F4EFEB] px-6 py-4 border-t border-[#E8DFD5] flex items-center justify-between">
          <button
            onClick={onClose}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#57534E] hover:text-[#221F1F]"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Homepage</span>
          </button>

          <button
            onClick={onClose}
            className="px-5 py-2 rounded-lg bg-[#6B1724] text-white text-xs font-semibold hover:bg-[#52111B]"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
