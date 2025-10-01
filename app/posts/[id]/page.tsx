import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, User } from "lucide-react";
import JsonModal from "./JsonModal";

interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

function capitalizeFirst(text: string): string {
  if (!text) return text;
  return text.charAt(0).toUpperCase() + text.slice(1);
}

async function getPost(id: string): Promise<Post> {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/posts/${id}`,
    {
      next: {
        revalidate: 3600,
      },
    }
  );

  if (!response.ok) {
    notFound();
  }

  return response.json();
}

export async function generateStaticParams() {
  return Array.from({ length: 9 }, (_, i) => ({
    id: String(i + 1),
  }));
}

export default async function PostDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const post = await getPost(id);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <Link
          href="/posts"
          className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Retour aux articles
        </Link>

        <article className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-8 text-white">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-sm bg-white/20 px-3 py-1 rounded-full">
                Article #{post.id}
              </span>
              <span className="flex items-center gap-1 text-sm bg-white/20 px-3 py-1 rounded-full">
                <User className="w-3 h-3" />
                User {post.userId}
              </span>
            </div>

            <h1 className="text-3xl md:text-4xl font-bold leading-tight">
              {capitalizeFirst(post.title)}
            </h1>
          </div>

          <div className="p-8">
            <div className="prose prose-slate max-w-none">
              <p className="text-lg text-slate-700 leading-relaxed whitespace-pre-wrap">
                {capitalizeFirst(post.body)}
              </p>
            </div>

            <div className="mt-8 pt-8 border-t border-slate-200">
              <JsonModal post={post} />
            </div>
          </div>
        </article>

        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h2 className="text-lg font-semibold text-slate-900 mb-2">
            À propos de cet article
          </h2>
          <div className="text-sm text-slate-600 space-y-1">
            <p>
              <span className="font-medium">ID de l'article:</span> {post.id}
            </p>
            <p>
              <span className="font-medium">Auteur (User ID):</span>{" "}
              {post.userId}
            </p>
            <p>
              <span className="font-medium">Caractères:</span>{" "}
              {post.body.length}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
