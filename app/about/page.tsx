import { Metadata } from "next";
import { getPageBySlug } from "@/lib/markdown";

export const metadata: Metadata = {
  title: "About Us | JobsHub",
  description: "Learn about JobsHub - India's premier job portal connecting talent with opportunities.",
};

export default function AboutPage() {
  const page = getPageBySlug("about");

  if (!page) {
    return (
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <p>Page not found</p>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <article className="bg-white rounded-xl border border-gray-200 p-8">
        <div
          className="markdown-content"
          dangerouslySetInnerHTML={{ __html: page.htmlContent }}
        />
      </article>
    </div>
  );
}
