import React, { useState, useEffect } from 'react';
import {
  Calendar,
  Clock,
  User,
  ArrowRight,
  Search,
  Tag,
  Share2,
  BookOpen,
  ChevronLeft,
  ChevronRight,
  Check
} from 'lucide-react';
import { ImageWithFallback } from '../components/common/ImageWithFallback';
import { BlogPostModal } from '../components/modals/BlogPostModal';

interface BlogPageProps {
  onNavigate: (path: string) => void;
  initialSlug?: string | null;
}

const CATEGORIES = [
  'All',
  'School News',
  'Academic Activities',
  'Events',
  'Student Achievements',
  'Sports',
  'Education',
  'Announcements',
  'Parent Information'
];

export const BlogPage: React.FC<BlogPageProps> = ({ onNavigate, initialSlug }) => {
  const [posts, setPosts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalPosts, setTotalPosts] = useState(0);

  // Single article view
  const [currentArticle, setCurrentArticle] = useState<any | null>(null);
  const [isLoadingArticle, setIsLoadingArticle] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  // Load article if slug provided
  useEffect(() => {
    if (initialSlug) {
      loadArticleBySlug(initialSlug);
    } else {
      setCurrentArticle(null);
      loadPosts();
    }
  }, [initialSlug, selectedCategory, page]);

  const loadPosts = async () => {
    setIsLoading(true);
    try {
      const params = new URLSearchParams();
      if (selectedCategory && selectedCategory !== 'All') {
        params.append('category', selectedCategory);
      }
      if (searchTerm.trim()) {
        params.append('search', searchTerm.trim());
      }
      params.append('page', page.toString());
      params.append('limit', '9');

      const res = await fetch(`/api/public/blog?${params.toString()}`);
      if (res.ok) {
        const data = await res.json();
        setPosts(data.posts || []);
        setTotalPages(data.totalPages || 1);
        setTotalPosts(data.total || 0);
      }
    } catch (e) {
      console.error('Failed to load blog posts:', e);
    } finally {
      setIsLoading(false);
    }
  };

  const loadArticleBySlug = async (slug: string) => {
    setIsLoadingArticle(true);
    try {
      const res = await fetch(`/api/public/blog/${slug}`);
      if (res.ok) {
        const data = await res.json();
        setCurrentArticle(data);
      } else {
        setCurrentArticle(null);
      }
    } catch (e) {
      console.error('Failed to load article:', e);
      setCurrentArticle(null);
    } finally {
      setIsLoadingArticle(false);
    }
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setPage(1);
    loadPosts();
  };

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    }
  };

  // Article view render
  if (initialSlug) {
    if (isLoadingArticle) {
      return (
        <div className="py-20 max-w-4xl mx-auto px-4">
          <div className="animate-pulse space-y-6">
            <div className="h-8 bg-[#E8DFD5] rounded-lg w-2/3" />
            <div className="h-4 bg-[#E8DFD5] rounded w-1/3" />
            <div className="aspect-[16/9] bg-[#E8DFD5] rounded-2xl" />
            <div className="space-y-3">
              <div className="h-4 bg-[#E8DFD5] rounded w-full" />
              <div className="h-4 bg-[#E8DFD5] rounded w-5/6" />
              <div className="h-4 bg-[#E8DFD5] rounded w-4/6" />
            </div>
          </div>
        </div>
      );
    }

    if (!currentArticle) {
      return (
        <div className="py-20 max-w-3xl mx-auto px-4 text-center">
          <BookOpen className="w-12 h-12 text-[#6B1724] mx-auto mb-4 opacity-50" />
          <h2 className="text-2xl font-bold font-display text-[#221F1F] mb-2">Article Not Found</h2>
          <p className="text-sm text-[#57534E] mb-6">The article you requested could not be located or may have been updated.</p>
          <button
            onClick={() => onNavigate('/blog')}
            className="px-5 py-2.5 bg-[#6B1724] text-white rounded-lg text-sm font-semibold hover:bg-[#52111B] transition-colors"
          >
            Back to School News
          </button>
        </div>
      );
    }

    return (
      <div className="py-12 sm:py-16 bg-[#FAF7F2]">
        <article className="max-w-4xl mx-auto px-4 sm:px-6">
          {/* Breadcrumb back */}
          <div className="mb-6 flex items-center justify-between">
            <button
              onClick={() => onNavigate('/blog')}
              className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-[#6B1724] hover:underline"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Back to All Articles</span>
            </button>
            <button
              onClick={handleShare}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white border border-[#E8DFD5] rounded-lg text-xs font-semibold text-[#221F1F] hover:bg-[#F4EFEB] transition-colors shadow-xs"
            >
              {copiedLink ? <Check className="w-3.5 h-3.5 text-[#1B4332]" /> : <Share2 className="w-3.5 h-3.5" />}
              <span>{copiedLink ? 'Link Copied!' : 'Share Article'}</span>
            </button>
          </div>

          {/* Header */}
          <div className="bg-white border border-[#E8DFD5] rounded-2xl p-6 sm:p-10 shadow-xs mb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#FAF7F2] border border-[#E8DFD5] text-xs font-bold uppercase tracking-wider text-[#6B1724] mb-4">
              <Tag className="w-3 h-3 text-[#C88A1A]" />
              <span>{currentArticle.category}</span>
            </div>

            <h1 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold text-[#221F1F] leading-tight mb-4">
              {currentArticle.title}
            </h1>

            <div className="flex flex-wrap items-center gap-4 text-xs sm:text-sm text-[#57534E] pb-6 border-b border-[#E8DFD5]">
              <div className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-[#C88A1A]" />
                <span>{currentArticle.publication_date || currentArticle.date}</span>
              </div>
              <span>·</span>
              <div className="flex items-center gap-1.5">
                <User className="w-4 h-4 text-[#C88A1A]" />
                <span>{currentArticle.author || 'School Administration'}</span>
              </div>
            </div>

            {/* Featured Image */}
            <div className="mt-6 aspect-[16/9] rounded-xl overflow-hidden bg-[#F4EFEB] border border-[#E8DFD5]">
              <ImageWithFallback
                src={currentArticle.featured_image || currentArticle.image || '/images/children_sealed.jpg'}
                alt={currentArticle.title}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Lead Excerpt */}
            <p className="mt-6 text-base sm:text-lg font-serif italic text-[#6B1724] leading-relaxed border-l-3 border-[#C88A1A] pl-4 bg-[#FAF7F2] py-3 rounded-r-lg">
              "{currentArticle.excerpt}"
            </p>

            {/* HTML Body */}
            <div
              className="mt-8 prose prose-stone max-w-none text-[#221F1F] text-sm sm:text-base leading-relaxed space-y-4"
              dangerouslySetInnerHTML={{ __html: currentArticle.content }}
            />
          </div>

          {/* CTA at end of article */}
          <div className="p-6 sm:p-8 bg-[#6B1724] text-white rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <h3 className="font-display text-lg sm:text-xl font-bold">Discover Sealed Nectar Ambassadors Academy</h3>
              <p className="text-xs sm:text-sm text-white/80 mt-1">Providing balanced Islamic upbringing, global languages, and rigorous academics in Sagamu.</p>
            </div>
            <button
              onClick={() => onNavigate('/admissions')}
              className="px-5 py-2.5 rounded-lg bg-[#C88A1A] text-white font-semibold text-xs sm:text-sm hover:bg-[#b07815] transition-colors whitespace-nowrap"
            >
              Apply for Admission
            </button>
          </div>
        </article>
      </div>
    );
  }

  // Main Blog List View
  return (
    <div className="min-h-screen bg-[#FAF7F2]">
      {/* 1. Hero Section */}
      <section className="relative py-14 sm:py-20 bg-white border-b border-[#E8DFD5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-3xl">
          <div className="inline-flex items-center gap-2 mb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-[#6B1724]">
              Academy Publications
            </span>
            <span className="w-8 h-px bg-[#6B1724]" />
            <span className="text-xs font-semibold text-[#C88A1A]">
              Updates & Articles
            </span>
          </div>

          <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#221F1F] leading-tight mb-4 text-balance">
            Latest From Our School
          </h1>

          <p className="text-base sm:text-lg text-[#57534E] leading-relaxed mb-8 font-body">
            Stay connected with activities, achievements, announcements and stories from Sealed Nectar Ambassadors Academy.
          </p>

          {/* Search Form */}
          <form onSubmit={handleSearchSubmit} className="max-w-xl mx-auto flex items-center gap-2 bg-[#FAF7F2] p-1.5 rounded-xl border border-[#E8DFD5] shadow-xs">
            <Search className="w-5 h-5 text-[#57534E] ml-2.5 shrink-0" />
            <input
              type="text"
              placeholder="Search news, events, academics..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-1 bg-transparent px-2 py-2 text-sm text-[#221F1F] focus:outline-none"
            />
            <button
              type="submit"
              className="px-4 py-2 bg-[#6B1724] text-white rounded-lg text-xs font-semibold hover:bg-[#52111B] transition-colors"
            >
              Search
            </button>
          </form>
        </div>
      </section>

      {/* 2. Category Filter Bar */}
      <section className="bg-white border-b border-[#E8DFD5] py-3.5 sticky top-20 z-20 backdrop-blur-md bg-white/95">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  setSelectedCategory(cat);
                  setPage(1);
                }}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
                  selectedCategory === cat
                    ? 'bg-[#6B1724] text-white shadow-xs'
                    : 'bg-[#FAF7F2] text-[#57534E] hover:text-[#221F1F] hover:bg-[#F4EFEB] border border-[#E8DFD5]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Blog Grid */}
      <section className="py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3, 4, 5, 6].map((n) => (
                <div key={n} className="bg-white rounded-2xl border border-[#E8DFD5] p-3 animate-pulse">
                  <div className="aspect-[16/10] bg-[#E8DFD5] rounded-xl mb-4" />
                  <div className="h-4 bg-[#E8DFD5] rounded w-1/3 mb-2" />
                  <div className="h-6 bg-[#E8DFD5] rounded w-5/6 mb-3" />
                  <div className="h-3 bg-[#E8DFD5] rounded w-full mb-1" />
                  <div className="h-3 bg-[#E8DFD5] rounded w-4/6" />
                </div>
              ))}
            </div>
          ) : posts.length === 0 ? (
            <div className="bg-white rounded-2xl border border-[#E8DFD5] p-12 text-center max-w-lg mx-auto">
              <BookOpen className="w-12 h-12 text-[#C88A1A] mx-auto mb-3 opacity-60" />
              <h3 className="font-display text-lg font-bold text-[#221F1F] mb-1">
                No school updates have been published yet.
              </h3>
              <p className="text-xs text-[#57534E] mb-6">
                Check back soon or explore our academic pillars and admissions.
              </p>
              <button
                onClick={() => {
                  setSelectedCategory('All');
                  setSearchTerm('');
                  setPage(1);
                  loadPosts();
                }}
                className="px-4 py-2 text-xs font-semibold text-[#6B1724] border border-[#6B1724] rounded-lg hover:bg-[#6B1724] hover:text-white transition-colors"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {posts.map((post) => (
                  <article
                    key={post.id}
                    onClick={() => onNavigate(`/blog/${post.slug}`)}
                    className="group bg-white rounded-2xl border border-[#E8DFD5] p-3 hover:border-[#C88A1A] transition-all duration-300 shadow-xs hover:shadow-md cursor-pointer flex flex-col justify-between"
                  >
                    <div>
                      <div className="relative aspect-[16/10] rounded-xl overflow-hidden mb-4 bg-[#F4EFEB]">
                        <ImageWithFallback
                          src={post.featured_image || post.image || '/images/children_sealed.jpg'}
                          alt={post.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute top-3 left-3">
                          <span className="px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider bg-white/95 text-[#6B1724] shadow-sm backdrop-blur-xs">
                            {post.category}
                          </span>
                        </div>
                      </div>

                      <div className="px-1.5">
                        <div className="flex items-center gap-2 text-[11px] text-[#57534E] mb-2">
                          <Calendar className="w-3.5 h-3.5 text-[#C88A1A]" />
                          <span>{post.publication_date || post.date}</span>
                          <span>·</span>
                          <span className="text-[#6B1724] font-medium">{post.author || 'SNAA Faculty'}</span>
                        </div>

                        <h2 className="font-display text-base sm:text-lg font-bold text-[#221F1F] group-hover:text-[#6B1724] transition-colors leading-snug line-clamp-2 mb-2">
                          {post.title}
                        </h2>

                        <p className="text-xs text-[#57534E] line-clamp-3 leading-relaxed">
                          {post.excerpt}
                        </p>
                      </div>
                    </div>

                    <div className="pt-4 mt-4 border-t border-[#E8DFD5] px-1.5 flex items-center justify-between text-xs font-semibold text-[#6B1724]">
                      <span>Read More</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </article>
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="mt-12 flex items-center justify-center gap-2">
                  <button
                    disabled={page <= 1}
                    onClick={() => setPage((p) => Math.max(1, p - 1))}
                    className="p-2 rounded-lg border border-[#E8DFD5] bg-white text-[#221F1F] disabled:opacity-40 hover:bg-[#FAF7F2] transition-colors"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <span className="px-4 py-2 text-xs font-semibold text-[#57534E]">
                    Page {page} of {totalPages}
                  </span>
                  <button
                    disabled={page >= totalPages}
                    onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                    className="p-2 rounded-lg border border-[#E8DFD5] bg-white text-[#221F1F] disabled:opacity-40 hover:bg-[#FAF7F2] transition-colors"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </div>
  );
};
