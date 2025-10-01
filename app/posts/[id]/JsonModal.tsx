"use client";

import { useState } from "react";
import { Code, X } from "lucide-react";

interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

interface JsonModalProps {
  post: Post;
}

export default function JsonModal({ post }: JsonModalProps) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleModal = () => setIsOpen(!isOpen);

  return (
    <>
      <button
        onClick={toggleModal}
        className="inline-flex items-center gap-2 px-4 py-2 bg-slate-800 text-white rounded-lg hover:bg-slate-700 transition-colors"
      >
        <Code className="w-4 h-4" />
        Voir le JSON
      </button>

      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={toggleModal}
        >
          <div
            className="bg-white rounded-lg shadow-2xl max-w-3xl w-full max-h-[80vh] overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between p-6 border-b border-slate-200">
              <div className="flex items-center gap-2">
                <Code className="w-5 h-5 text-slate-700" />
                <h3 className="text-lg font-semibold text-slate-900">
                  Données JSON de l'article
                </h3>
              </div>

              <button
                onClick={toggleModal}
                className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
                aria-label="Fermer"
              >
                <X className="w-5 h-5 text-slate-600" />
              </button>
            </div>

            <div className="p-6 overflow-auto max-h-[calc(80vh-8rem)]">
              <pre className="bg-slate-900 text-slate-100 p-4 rounded-lg overflow-x-auto text-sm font-mono">
                {JSON.stringify(post, null, 2)}
              </pre>
            </div>

            <div className="flex justify-end p-6 border-t border-slate-200 bg-slate-50">
              <button
                onClick={toggleModal}
                className="px-4 py-2 bg-slate-800 text-white rounded-lg hover:bg-slate-700 transition-colors"
              >
                Fermer
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
