import CareerTimeline from "@/components/CareerTimeline";
import Hero from "@/components/Hero";
import ProjectSpotlight from "@/components/ProjectSpotlight";
import SkillsDashboard from "@/components/SkillsDashboard";

export default function Page() {
  return (
    <div className="grid gap-16">
      <Hero />
      <CareerTimeline />
      <SkillsDashboard />
      <ProjectSpotlight />
    </div>
  );
}
