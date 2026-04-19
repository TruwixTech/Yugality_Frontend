import { getAllBlogs } from "@/lib/mdx";
import BlogCard from "@/app/components/home/BlogCard";

export const metadata = {
  title: "Blog | Yugality",
  description: "Read the latest thoughts and updates.",
};

export default async function BlogIndex() {
  const blogs = getAllBlogs();

  return (
    <main className="bg-colorlight text-colordark min-h-screen flex flex-col pt-24">
      <div className="flex-1 max-w-[1200px] mx-auto w-full px-6 pt-8 pb-20 lg:px-10">
        <h1 className="text-[clamp(2rem,4vw,2.75rem)] font-medium tracking-[-0.03em] mb-4 leading-[1.15] text-colordark">
          Our Journal.{" "}
          <span className="text-colordark/50">
            Latest insights and updates.
          </span>
        </h1>

        <p className="text-[16px] text-colordark/60 max-w-2xl mb-16 leading-[1.6]">
          Discover the latest thoughts from the team on the future of legal tech,
          data privacy, and workflow optimization.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
          {blogs.map((blog) => (
            <BlogCard key={blog.slug} blog={blog} variant="light" />
          ))}
        </div>
      </div>
    </main>
  );
}