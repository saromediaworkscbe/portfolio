import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { NAV_LINKS, SITE } from "@/lib/constants";

gsap.registerPlugin(ScrollTrigger);

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("home");
  const location = useLocation();
  const navigate = useNavigate();
  const isHome = location.pathname === "/";

  // Highlight the nav item for whichever section is on screen — only
  // meaningful on the one-page home route, where these sections exist.
  useEffect(() => {
    if (!isHome) return;
    const triggers = NAV_LINKS.map((link) =>
      ScrollTrigger.create({
        trigger: `#${link.id}`,
        start: "top center",
        end: "bottom center",
        onToggle: (self) => self.isActive && setActive(link.id),
      })
    );
    return () => triggers.forEach((t) => t.kill());
  }, [isHome]);

  const scrollTo = (id) => {
    // If the mobile menu is open, its collapse animation shifts the page
    // layout underneath an in-progress smooth scroll and cancels it — so
    // wait for the collapse (300ms, matches the AnimatePresence transition)
    // before scrolling.
    const delay = open ? 300 : 0;
    setOpen(false);
    window.setTimeout(() => {
      if (!isHome) {
        // Sections only exist on the home route — navigate back first,
        // then scroll once the home page has mounted.
        navigate("/");
        window.setTimeout(() => {
          document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
        }, 60);
      } else {
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
      }
    }, delay);
  };

  return (
    <header className="fixed top-0 inset-x-0 z-50">
      <nav className="flex items-center justify-between px-5 md:px-10 h-16 mix-blend-difference">
        <button onClick={() => scrollTo("home")} className="flex items-center gap-3">
          {/* <span className="relative flex h-2.5 w-2.5">
            <span className="absolute inline-flex h-full w-full rounded-full bg-rec opacity-75 animate-ping" />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-rec" />
          </span> */}
          <span className="display-narrow text-sm  text-bone">
            {SITE.name}
          </span>
        </button>

        {/* Desktop */}
        <ul className="hidden lg:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <li key={link.id}>
              <button
                onClick={() => scrollTo(link.id)}
                className={`tc transition-colors hover:text-bone ${
                  isHome && active === link.id ? "!text-signal" : "!text-mute"
                }`}
              >
                {link.label}
              </button>
            </li>
          ))}
        </ul>

        {/* Mobile toggle */}
        <button
          onClick={() => setOpen(!open)}
          className="lg:hidden tc !text-bone"
          aria-expanded={open}
          aria-label="Toggle menu"
        >
          {open ? "Close" : "Menu"}
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.ul
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="lg:hidden overflow-hidden bg-ink/95 backdrop-blur border-b border-line"
          >
            {NAV_LINKS.map((link) => (
              <li key={link.id} className="border-t border-line">
                <button
                  onClick={() => scrollTo(link.id)}
                  className={`block w-full text-left px-5 py-4 display-narrow text-2xl ${
                    isHome && active === link.id ? "text-signal" : "text-bone"
                  }`}
                >
                  {link.label}
                </button>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </header>
  );
}
