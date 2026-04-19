// (Navbar and Footer are in the layout now)
import Hero from "../components/home/Hero";
import ProductDemo from "../components/home/ProductDemo";
import RotatingText from "../components/home/RotatingText";
import Features from "../components/home/Features";
import Testimonials from "../components/home/Testimonials";
import Impact from "../components/home/Impact";
import Pricing from "../components/home/Pricing";
import Blogs from "../components/home/Blogs";
import FAQ from "../components/home/FAQ";
import Preloader from "../components/home/Preloader";
// import { getAllBlogs } from "@/lib/mdx";

export default async function Home() {
  const blogs = getAllBlogs();

  return (
    <main className="bg-colordark text-colorlight overflow-x-hidden relative">
      <Preloader />
      <Hero />
      <ProductDemo />
      <RotatingText />
      <Features />
      <Testimonials />
      <Impact />
      <Pricing />
      <Blogs blogs={blogs} />
      <FAQ />
    </main>
  );
}
