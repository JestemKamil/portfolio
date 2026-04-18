import { AboutSection } from "@/components/home/AboutSection";
import { ContactSection } from "@/components/home/ContactSection";
import { HeroSection } from "@/components/home/HeroSection";
import { MainHeader } from "@/components/home/MainHeader";
import { ProjectsSection } from "@/components/home/ProjectsSection";
import { Divider } from "@/components/home/primitives";
import { SiteFooter } from "@/components/home/SiteFooter";
import { ToolsSection } from "@/components/home/ToolsSection";

export function HomePage() {
  return (
    <>
      <MainHeader />
      <HeroSection />
      <Divider />
      <AboutSection />
      <Divider />
      <ProjectsSection />
      <Divider />
      <ToolsSection />
      <Divider />
      <ContactSection />
      <SiteFooter />
    </>
  );
}
