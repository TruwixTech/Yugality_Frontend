import DemoHero from "@/app/components/home/DemoHero";

export const metadata = {
  title: "Book a Demo | Yugality",
  description: "Book a personalized demo to see how Yugality can transform your legal practice.",
};

export default function DemoPage() {
  return (
    <main className="flex flex-col min-h-screen pt-24 bg-colorlight">
      <DemoHero />
    </main>
  );
}
