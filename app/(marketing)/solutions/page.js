import StackedFeatures from "@/app/components/home/StackedFeatures";

export const metadata = {
  title: "Solutions | Yugality",
  description: "Explore the complete suite of AI-powered tools built for modern legal teams.",
};

export default function SolutionsPage() {
  return (
    <main className="flex flex-col min-h-screen pt-24 bg-colorlight">
      <StackedFeatures theme="light" />
    </main>
  );
}
