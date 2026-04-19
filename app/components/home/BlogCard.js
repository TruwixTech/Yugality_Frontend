import Link from "next/link";

export default function BlogCard({ blog, variant = "dark" }) {
  const isDark = variant === "dark";

  return (
    <Link
      href={`/blog/${blog.slug}`}
      className={`group flex flex-col rounded-2xl overflow-hidden transition-all duration-300 ${
        isDark 
          ? "bg-colordark border border-colorlight/10 hover:border-colorlight/20" 
          : "bg-transparent border border-colordark/10 hover:border-colordark/20 shadow-sm hover:shadow-md"
      }`}
    >
      <div className={`relative w-full aspect-[16/10] overflow-hidden ${isDark ? "bg-colorlight/5" : "bg-colordark/5"}`}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={
            blog.meta.image ||
            "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&q=80&w=600&h=400"
          }
          alt={blog.meta.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
      </div>

      <div className={`p-6 flex flex-col flex-1 ${isDark ? "bg-colorlight/[0.04]" : "bg-transparent"}`}>
        <div className="flex items-center gap-3 mb-4">
          {blog.meta.tags?.slice(0, 2).map((tag) => (
            <span
              key={tag}
              className={`px-3 py-1 rounded-full text-[11px] font-medium tracking-wide uppercase ${
                isDark 
                  ? "bg-colorlight/10 text-colorlight/70" 
                  : "bg-colordark/10 text-colordark/70"
              }`}
            >
              {tag}
            </span>
          ))}
          <span className={`text-[13px] ml-auto ${isDark ? "text-colorlight/40" : "text-colordark/40"}`}>
            {new Date(blog.meta.date).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
            })}
          </span>
        </div>

        <h3 className={`text-[1.125rem] font-medium mb-3 leading-[1.35] tracking-tight transition-colors duration-300 ${
          isDark 
            ? "text-colorlight group-hover:text-blue-400" 
            : "text-colordark group-hover:text-blue-from"
        }`}>
          {blog.meta.title}
        </h3>
        <p className={`text-[15px] leading-[1.65] line-clamp-2 ${isDark ? "text-colorlight/60" : "text-colordark/60"}`}>
          {blog.meta.description}
        </p>
      </div>
    </Link>
  );
}
