import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Hero from "@/sections/Hero";
import Gallery from "@/sections/Gallery";
import Projects from "@/sections/Projects";
import About from "@/sections/About";
import Skills from "@/sections/Skills";
import Contact from "@/sections/Contact";

export default function App() {
  return (
    <div className="min-h-screen flex flex-col overflow-hidden">
      <Navbar />
      <main className="flex-1">
        <Hero />
        <About />
        <Gallery />
        <Projects />
        <Skills />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
