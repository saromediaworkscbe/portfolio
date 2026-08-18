import SectionHeading from "@/components/ui/SectionHeading";
import { useGsapReveal } from "@/hooks/useGsapReveal";
import { clients } from "@/data/clients";

export default function Clients() {
  const container = useGsapReveal(".client-logo");

  return (
    <section id="clients" ref={container} className="px-5 md:px-10 py-24 md:py-32 border-t border-line">
      <SectionHeading slate="TRUSTED BY" title="Clients" />

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 md:gap-6 max-w-6xl mx-auto">
        {clients.map((client) => (
          <div
            key={client.name}
            className="client-logo group relative aspect-[2/1] bg-bone/60 overflow-hidden transition-all duration-300 hover:-translate-y-1"
          >
            <div className="absolute inset-0 border-2 border-transparent group-hover:border-signal transition-colors" />
            <div className="flex h-full items-center justify-center p-3 md:p-5">
              <img
                src={client.logo}
                alt={client.name}
                loading="lazy"
                className="max-h-full max-w-full object-cover"
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
