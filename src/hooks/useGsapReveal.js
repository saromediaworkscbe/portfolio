import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

/**
 * Scroll-triggered reveal for anything matching `selector` inside the
 * returned container ref. Uses gsap.context via useGSAP so ScrollTriggers
 * are cleaned up automatically on unmount / route change.
 */
export function useGsapReveal(selector = "[data-reveal]", options = {}) {
  const container = useRef(null);

  useGSAP(
    () => {
      const items = gsap.utils.toArray(selector);
      items.forEach((el) => {
        gsap.fromTo(
          el,
          { y: 60, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.9,
            ease: "power3.out",
            scrollTrigger: {
              trigger: el,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
            ...options,
          }
        );
      });
    },
    { scope: container }
  );

  return container;
}
