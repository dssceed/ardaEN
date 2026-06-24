import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import Image from "next/image";
import { Calendar, Tag, ChevronLeft } from "lucide-react";
import Link from "next/link";
export const dynamic = 'force-dynamic';

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const news = await prisma.arda_news.findFirst({
    where: { slug: slug, status: 1 },
  });

  if (!news) return { title: "Not Found | ARDA" };

  return {
    title: `${news.title} | ARDA`,
    description: news.content.substring(0, 160).replace(/<[^>]*>/g, ""),
  };
}

export default async function NewsDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const news = await prisma.arda_news.findFirst({
    where: { slug: slug, status: 1 },
  });

  if (!news) notFound();

  // Update view count
  await prisma.arda_news.update({
    where: { id: news.id },
    data: { view_count: { increment: 1 } },
  }).catch(() => { }); // Ignore error on view count update

  return (
    <div className="w-full max-w-5xl px-4 md:px-8 py-10">
      {/* Breadcrumb / Back button */}
      <Link
        href="/"
        className="inline-flex items-center gap-2 text-gray-500 hover:text-blue-600 transition-colors mb-8 group"
      >
        <ChevronLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
        <span className="font-medium">Back to Home</span>
      </Link>

      <article className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
        {/* Header Section */}
        <div className="p-6 md:p-10 border-b border-gray-50">
          <div className="flex flex-wrap items-center gap-4 mb-6">
            <span className="bg-blue-100 text-blue-700 px-4 py-1.5 rounded-full text-sm font-bold flex items-center gap-2">
              <Tag size={14} />
              {news.category || "General"}
            </span>
            <span className="text-gray-400 text-sm flex items-center gap-2">
              <Calendar size={14} />
              {new Date(news.created_at).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </span>
            <span className="text-gray-400 text-sm font-medium">
              view {news.view_count || 0} times
            </span>
          </div>

          <h1 className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-gray-900 leading-tight mb-8">
            {news.title}
          </h1>

          {/* Featured Image */}
          {news.thumbnail && (
            <div className="relative aspect-video w-full rounded-2xl overflow-hidden shadow-2xl mb-10 group">
              <Image
                src={news.thumbnail}
                alt={news.title}
                fill
                className="object-contain bg-gray-50 scale-100 transition-transform duration-700 group-hover:scale-105"
                priority
              />
            </div>
          )}

          {/* Content */}
          <div
            className="prose prose-lg max-w-none text-gray-700 leading-relaxed prose-img:rounded-2xl prose-headings:text-gray-900 prose-a:text-blue-600 prose-strong:text-gray-900"
            dangerouslySetInnerHTML={{ __html: news.content }}
          />
        </div>

        {/* Footer info */}
        <div className="bg-gray-50 p-6 md:p-8 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-sm text-gray-500">
            Last updated: {new Date(news.updated_at).toLocaleDateString("en-US", {
              year: "numeric",
              month: 'long',
              day: 'numeric'
            })}
          </div>
          <div className="flex gap-4">
            {/* Simple social share buttons could go here */}
          </div>
        </div>
      </article>

      {/* Recommended News / Related News section could be added here */}
    </div>
  );
}
