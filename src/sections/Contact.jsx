import { useState } from "react";
import { motion } from "framer-motion";
import SectionHeading from "@/components/ui/SectionHeading";
import { SITE } from "@/lib/constants";

const fieldClass =
  "w-full bg-transparent border-b border-line py-3 text-bone placeholder:text-mute/60 focus:border-signal focus:outline-none transition-colors";

export default function Contact() {
  const [sent, setSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Wire this to your backend / Formspree / EmailJS.
    setSent(true);
  };

  return (
    <section id="contact" className="px-5 md:px-10 py-24 md:py-32 border-t border-line">
      <div className="w-full">
        <SectionHeading slate="CALL SHEET" title="Contact" />

        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <p className="text-md text-bone/90 leading-relaxed mb-8">
              Booking for late 2026. Tell me about the film you want to make —
              location, length, and the feeling it should leave behind.
            </p>
            <p className="tc mb-2">Direct</p>
            <a href={`mailto:${SITE.email}`} className="font-mono text-signal hover:underline">
              {SITE.email}
            </a>

            <p className="tc mt-8 mb-2">Call</p>
            <a href={`tel:${SITE.phoneHref}`} className="font-mono text-signal hover:underline">
              {SITE.phone}
            </a>

            <p className="tc mt-8 mb-2">Instagram</p>
            <a
              href={SITE.instagram}
              target="_blank"
              rel="noreferrer"
              className="font-mono text-signal hover:underline"
            >
              {SITE.instagramHandle}
            </a>

            <p className="tc mt-8 mb-2">Based in</p>
            <p className="text-mute">{SITE.location} — travels anywhere the light is good.</p>
          </div>

          {sent ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="border border-line bg-smoke p-8 self-start"
            >
              <p className="tc !text-signal mb-3">MESSAGE LOGGED</p>
              <p className="text-mute">
                Thanks — I read everything myself and reply within two days.
              </p>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-8">
              <label className="block">
                <span className="tc block mb-1">Name</span>
                <input required name="name" className={fieldClass} placeholder="Your name" />
              </label>
              <label className="block">
                <span className="tc block mb-1">Email</span>
                <input required type="email" name="email" className={fieldClass} placeholder="you@studio.com" />
              </label>
              <label className="block">
                <span className="tc block mb-1">Project</span>
                <textarea required name="message" rows={4} className={fieldClass} placeholder="What are we shooting?" />
              </label>
              <motion.button
                whileHover={{ x: 4 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="tc border border-line px-6 py-3 text-bone hover:border-signal hover:text-signal transition-colors"
              >
                Send message →
              </motion.button>
            </form>
          )}
        </div>
        
      </div>
    </section>
  );
}
