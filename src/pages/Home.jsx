import Hero from "@/sections/Hero";
import Gallery from "@/sections/Gallery";
import Projects from "@/sections/Projects";
import Showreel from "@/sections/Showreel";
import About from "@/sections/About";
import Skills from "@/sections/Skills";
import Clients from "@/sections/Clients";
import Contact from "@/sections/Contact";

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Gallery />
      <Projects />
      <Showreel />
      <Skills />
      <Clients />
      <Contact />
    </>
  );
}
