import { notFound } from "next/navigation";
import { getBlogBySlug, getBlogSlugs } from "@/lib/mdx";
import { MDXRemote } from "next-mdx-remote/rsc";
import BlogPostHeader from "@/app/components/home/BlogPostHeader";

export async function generateStaticParams() {
  const slugs = getBlogSlugs();
  return slugs.map((slug) => ({
    slug: slug.replace(/\.mdx$/, ""),
  }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const blog = getBlogBySlug(slug);
  
  if (!blog) return { title: "Not Found" };
  
  return {
    title: `${blog.meta.title} | Yugality Blog`,
    description: blog.meta.description,
  };
}

export default async function BlogPostPage({ params }) {
  const { slug } = await params;
  const blog = getBlogBySlug(slug);

  if (!blog) {
    return notFound();
  }

  const { meta, content } = blog;

  return (
    <main className="bg-colorlight text-colordark min-h-screen flex flex-col pt-24">

      <article className="flex-1 w-full max-w-[800px] mx-auto px-6 pt-8 pb-20 lg:px-8">
        <BlogPostHeader meta={meta} />

        {meta.image && (
          <div className="w-full aspect-video rounded-2xl overflow-hidden mb-16 bg-colordark/5">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={meta.image}
              alt={meta.title}
              className="w-full h-full object-cover"
            />
          </div>
        )}

        <div className="prose prose-lg max-w-none my-12
          prose-p:text-[1.125rem] prose-p:leading-[1.8] prose-p:text-colordark/80 prose-p:tracking-normal prose-p:mb-8
          prose-headings:font-medium prose-headings:tracking-[-0.02em] prose-headings:text-colordark
          prose-h2:text-[1.875rem] prose-h2:mt-12 prose-h2:mb-6 prose-h2:leading-[1.2]
          prose-h3:text-[1.5rem] prose-h3:mt-10 prose-h3:mb-4 prose-h3:leading-[1.3]
          prose-strong:text-colordark prose-strong:font-medium
          prose-a:text-blue-from prose-a:underline prose-a:underline-offset-4 prose-a:decoration-blue-from/30 hover:prose-a:decoration-blue-from hover:prose-a:text-blue-to transition-all
          prose-ul:text-[1.125rem] prose-ul:text-colordark/80 prose-ul:mb-8 prose-ul:leading-[1.8]
          prose-ol:text-[1.125rem] prose-ol:text-colordark/80 prose-ol:mb-8 prose-ol:leading-[1.8]
          prose-li:marker:text-colordark/40
          prose-img:rounded-2xl
          prose-blockquote:border-l-colordark/20 prose-blockquote:bg-colordark/[0.03] prose-blockquote:py-4 prose-blockquote:px-6 prose-blockquote:rounded-r-2xl prose-blockquote:not-italic prose-blockquote:text-colordark/70 prose-blockquote:text-[1.125rem]
          prose-pre:bg-colordark/[0.03] prose-pre:border prose-pre:border-colordark/10 prose-pre:rounded-xl
          prose-code:text-colordark/90 prose-code:bg-colordark/[0.05] prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded-md prose-code:font-medium
          prose-code:before:content-none prose-code:after:content-none
        ">
          <MDXRemote source={content} />
        </div>
      </article>
    </main>
  );
}
