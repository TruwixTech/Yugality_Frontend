export default function BlogPostHeader({ meta }) {
  return (
    <div className="mb-10 text-center">
      <div className="flex items-center justify-center gap-3 mb-6">
        {meta.tags?.map((tag) => (
          <span
            key={tag}
            className="px-3 py-1 rounded-full bg-colordark/10 text-[11px] font-medium tracking-wide text-colordark/70 uppercase"
          >
            {tag}
          </span>
        ))}
      </div>

      <h1 className="text-[clamp(2rem,4vw,2.75rem)] font-medium tracking-tight mb-6 leading-[1.15] max-w-2xl mx-auto text-colordark">
        {meta.title}
      </h1>

      <div className="flex items-center justify-center gap-4 text-[14px] text-colordark/50">
        <span>By {meta.author}</span>
        <span className="w-1 h-1 rounded-full bg-colordark/30"></span>
        <span>
          {new Date(meta.date).toLocaleDateString("en-US", {
            month: "long",
            day: "numeric",
            year: "numeric",
          })}
        </span>
      </div>
    </div>
  );
}
