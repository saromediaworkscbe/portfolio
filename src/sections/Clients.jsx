import SectionHeading from "@/components/ui/SectionHeading";
import { clients } from "@/data/clients";

const track = [...clients, ...clients];

export default function Clients() {
  return (
    <section id="clients" className="px-5 md:px-10 py-24 md:py-32 border-t border-line">
      <SectionHeading slate="TRUSTED BY" title="Clients" />

      <div className="marquee-paused relative max-w-6xl mx-auto overflow-hidden">
        <div className="pointer-events-none absolute inset-y-0 left-0 w-16 md:w-32 bg-gradient-to-r from-ink to-transparent z-10" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-16 md:w-32 bg-gradient-to-l from-ink to-transparent z-10" />

        <div className="marquee-track flex w-max items-center gap-16 md:gap-24">
          {track.map((client, i) => (
            <img
              key={`${client.name}-${i}`}
              src={client.logo}
              alt={client.name}
              loading="lazy"
              className="h-20 md:h-20 w-auto max-w-none object-contain shrink-0"
            />
          ))}
        </div>
      </div>
    </section>
  );
}
