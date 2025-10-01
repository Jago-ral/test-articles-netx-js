import { Suspense } from "react";
import PostsClientComponent from "./PostsClientComponent";

interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

async function getPosts(): Promise<Post[]> {
  const response = await fetch("https://jsonplaceholder.typicode.com/posts", {
    next: {
      revalidate: 3600,
      tags: ["posts"],
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch posts");
  }

  return response.json();
}

async function PostsContent() {
  const posts = await getPosts();

  return <PostsClientComponent initialPosts={posts} />;
}

export default function PostsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="container mx-auto px-4 py-8">
        <header className="mb-8">
          <h1 className="text-4xl font-bold text-slate-900 mb-2">
            Articles
          </h1>
          <p className="text-slate-600">
            Explorez notre collection d'articles
          </p>
        </header>

        <Suspense fallback={<div>Chargement...</div>}>
          <PostsContent />
        </Suspense>
      </div>
    </div>
  );
}
