// import fs from "fs";
// import path from "path";
// import matter from "gray-matter";

// const contentDirectory = path.join(process.cwd(), "content", "blogs");

// export function getBlogSlugs() {
//   if (!fs.existsSync(contentDirectory)) return [];
//   return fs.readdirSync(contentDirectory).filter((filepath) => filepath.endsWith(".mdx"));
// }

// export function getBlogBySlug(slug) {
//   const realSlug = slug.replace(/\.mdx$/, "");
//   const fullPath = path.join(contentDirectory, `${realSlug}.mdx`);
  
//   if (!fs.existsSync(fullPath)) return null;

//   const fileContents = fs.readFileSync(fullPath, "utf8");
//   const { data, content } = matter(fileContents);

//   return {
//     slug: realSlug,
//     meta: data,
//     content,
//   };
// }

// export function getAllBlogs() {
//   const slugs = getBlogSlugs();
//   const blogs = slugs
//     .map((slug) => getBlogBySlug(slug))
//     .sort((blog1, blog2) => (blog1.meta.date > blog2.meta.date ? -1 : 1));
//   return blogs;
// }

export function getAllBlogs() {
  return []; // temporary fix
}

export function getBlogBySlug(slug) {
  return null;
}

export function getBlogSlugs() {
  return [];
}