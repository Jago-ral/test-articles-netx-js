"use client";

import { useState, useTransition, useEffect, useRef } from "react";
import Link from "next/link";
import { Search, RefreshCw } from "lucide-react";

interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

interface PostsClientComponentProps {
  initialPosts: Post[];
}

function capitalizeFirst(text: string): string {
  if (!text) return text;
  return text.charAt(0).toUpperCase() + text.slice(1);
}

export default function PostsClientComponent({
  initialPosts,
}: PostsClientComponentProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [isPending, startTransition] = useTransition();
  const [displayCount, setDisplayCount] = useState(9);
  const observerTarget = useRef<HTMLDivElement>(null);

  const filteredPosts = initialPosts.filter((post) =>
    post.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const displayedPosts = filteredPosts.slice(0, displayCount);
  const hasMore = displayCount < filteredPosts.length;

  useEffect(() => {
    setDisplayCount(9);
  }, [searchTerm]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setDisplayCount((prev) => Math.min(prev + 9, filteredPosts.length));
        }
      },
      { threshold: 0.1 }
    );

    const currentTarget = observerTarget.current;
    if (currentTarget) {
      observer.observe(currentTarget);
    }

    return () => {
      if (currentTarget) {
        observer.unobserve(currentTarget);
      }
    };
  }, [hasMore, filteredPosts.length]);

  const handleRefresh = () => {
    startTransition(async () => {
      try {
        await fetch("/api/revalidate", {
          method: "POST",
        });
        window.location.reload();
      } catch (error) {
        console.error("Failed to revalidate:", error);
        window.location.reload();
      }
    });
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
            <input
              type="search"
              placeholder="Rechercher un article..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <button
            onClick={handleRefresh}
            disabled={isPending}
            className="flex items-center justify-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <RefreshCw
              className={`w-5 h-5 ${isPending ? "animate-spin" : ""}`}
            />
            {isPending ? "Rafraîchissement..." : "Rafraîchir la liste"}
          </button>
        </div>

        {searchTerm && (
          <p className="mt-4 text-sm text-slate-600">
            {filteredPosts.length} résultat(s) pour "{searchTerm}"
          </p>
        )}
      </div>

      {filteredPosts.length === 0 ? (
        <div className="bg-white rounded-lg shadow-sm p-12 text-center">
          <div className="text-slate-400 mb-4">
            <Search className="w-16 h-16 mx-auto" />
          </div>
          <h3 className="text-xl font-semibold text-slate-700 mb-2">
            Aucun résultat trouvé
          </h3>
          <p className="text-slate-500">
            Essayez de modifier votre recherche ou réinitialisez les filtres
          </p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayedPosts.map((post) => (
              <Link
                key={post.id}
                href={`/posts/${post.id}`}
                className="group bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden border border-slate-200 hover:border-blue-300"
              >
                <div className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <span className="text-xs font-medium text-blue-600 bg-blue-50 px-2 py-1 rounded">
                      Article #{post.id}
                    </span>
                  </div>

                  <h2 className="text-lg font-semibold text-slate-900 mb-3 line-clamp-2 group-hover:text-blue-600 transition-colors">
                    {capitalizeFirst(post.title)}
                  </h2>

                  <p className="text-sm text-slate-600 line-clamp-3">
                    {capitalizeFirst(post.body)}
                  </p>

                  <div className="mt-4 flex items-center text-sm text-blue-600 font-medium group-hover:gap-2 transition-all">
                    Lire la suite
                    <span className="inline-block transform group-hover:translate-x-1 transition-transform">
                      →
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {hasMore && (
            <div
              ref={observerTarget}
              className="flex justify-center py-8"
            >
              <div className="flex items-center gap-2 text-slate-600">
                <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
