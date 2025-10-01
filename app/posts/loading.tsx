import { Loader as Loader2 } from "lucide-react";

export default function Loading() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="container mx-auto px-4 py-8">
        <header className="mb-8 animate-pulse">
          <div className="h-10 w-48 bg-slate-300 rounded mb-2"></div>
          <div className="h-6 w-64 bg-slate-200 rounded"></div>
        </header>

        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1 h-10 bg-slate-200 rounded-lg animate-pulse"></div>
              <div className="h-10 w-48 bg-slate-200 rounded-lg animate-pulse"></div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 9 }).map((_, i) => (
              <div
                key={i}
                className="bg-white rounded-lg shadow-sm p-6 border border-slate-200 animate-pulse"
              >
                <div className="h-6 w-20 bg-slate-200 rounded mb-3"></div>
                <div className="h-6 w-full bg-slate-300 rounded mb-2"></div>
                <div className="h-6 w-3/4 bg-slate-300 rounded mb-3"></div>
                <div className="space-y-2">
                  <div className="h-4 w-full bg-slate-200 rounded"></div>
                  <div className="h-4 w-full bg-slate-200 rounded"></div>
                  <div className="h-4 w-2/3 bg-slate-200 rounded"></div>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-center py-8">
            <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
          </div>
        </div>
      </div>
    </div>
  );
}
