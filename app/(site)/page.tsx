import { Hero } from "@/components/home/Hero";
import { Approach } from "@/components/home/Approach";
import { WhatWeCreate } from "@/components/home/WhatWeCreate";
import { FeaturedFinishes } from "@/components/home/FeaturedFinishes";
import { ExplorerTeaser } from "@/components/home/ExplorerTeaser";
import { CameleoSection } from "@/components/home/CameleoSection";
import { ProcessSection } from "@/components/home/ProcessSection";
import { FeaturedProjects } from "@/components/home/FeaturedProjects";
import { ApplicationsGrid } from "@/components/home/ApplicationsGrid";
import { WhyCraftmint } from "@/components/home/WhyCraftmint";
import { BespokeSection } from "@/components/home/BespokeSection";
import { AboutTeaser } from "@/components/home/AboutTeaser";
import { InspirationTeaser } from "@/components/home/InspirationTeaser";
import { FinalCta } from "@/components/home/FinalCta";
import { projectsStore } from "@/lib/store";

export default async function HomePage() {
  const allProjects = await projectsStore.all();
  const featuredProjects = allProjects.filter((p) => p.published && p.featured);

  return (
    <>
      <Hero />
      <Approach />
      <WhatWeCreate />
      <FeaturedFinishes />
      <ExplorerTeaser />
      <CameleoSection />
      <ProcessSection />
      <FeaturedProjects projects={featuredProjects} />
      <ApplicationsGrid />
      <WhyCraftmint />
      <BespokeSection />
      <AboutTeaser />
      <InspirationTeaser />
      <FinalCta />
    </>
  );
}
