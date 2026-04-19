import Link from "next/link";
import BlogCard from "./BlogCard";
import { ArrowUpRight } from "lucide-react";

export default function Blogs({ blogs }) {
  return (
    <section className="relative bg-colorlight py-[120px] px-6 max-md:py-[90px] max-[480px]:py-[72px]">
      <div className="max-w-[1400px] mx-auto md:px-4">
        <div className="flex flex-col md:flex-row items-end justify-between mb-12 gap-6">
          <div>
            <h2 className="text-[clamp(2rem,4vw,2.75rem)] font-medium leading-[1.15] tracking-[-0.03em] text-colordark">
              Insights & Updates
            </h2>
          </div>
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-colordark/15 text-colordark/70 hover:text-colorlight hover:bg-colordark transition-all duration-300 font-medium whitespace-nowrap"
          >
            View all articles
            <ArrowUpRight size={18} />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogs.slice(0, 3).map((blog) => (
            <BlogCard key={blog.slug} blog={blog} variant="light" />
          ))}
        </div>
      </div>
    </section>
  );
}
