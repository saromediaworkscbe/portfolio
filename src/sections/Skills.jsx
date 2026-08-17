import { useMemo } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import SectionHeading from "@/components/ui/SectionHeading";
import SkillsScene from "@/components/three/SkillsScene";
import { useGsapReveal } from "@/hooks/useGsapReveal";
import { kit } from "@/data/skills";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function Skills() {
  const container = useGsapReveal("[data-reveal]");

  const groups = useMemo(() => {
    const byDept = new Map();
    kit.forEach((skill) => {
      if (!byDept.has(skill.dept)) byDept.set(skill.dept, []);
      byDept.get(skill.dept).push(skill);
    });
    return Array.from(byDept, ([dept, skills]) => ({ dept, skills }));
  }, []);

  const stats = useMemo(() => {
    const avg = (kit.reduce((sum, s) => sum + s.level, 0) / kit.length).toFixed(1);
    return [
      { value: String(groups.length).padStart(2, "0"), label: "Disciplines" },
      { value: String(kit.length).padStart(2, "0"), label: "Tools" },
      { value: avg, label: "Avg level" },
    ];
  }, [groups.length]);

  // GSAP: each meter bar grows from zero when it scrolls into view.
  useGSAP(
    () => {
      gsap.utils.toArray(".meter-fill").forEach((bar) => {
        gsap.fromTo(
          bar,
          { scaleX: 0 },
          {
            scaleX: 1,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: { trigger: bar, start: "top 92%" },
          }
        );
      });
    },
    { scope: container }
  );

  return (
    <section id="skills" ref={container} className="px-5 md:px-10 py-24 md:py-32 border-t border-line">
      <SectionHeading slate="KIT LIST" title="Skills" />

      <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 max-w-6xl mx-auto min-w-0">
        {/* ---- Render preview + stats ---- */}
        <div className="lg:col-span-4 min-w-0">
          <div data-reveal className="relative aspect-square border border-line bg-ink mb-10">
            <SkillsScene />
            <p className="tc absolute bottom-3 left-3">Render preview</p>
          </div>

          <div data-reveal className="border-t border-line pt-6 space-y-3">
            {stats.map((s) => (
              <div key={s.label} className="flex items-baseline justify-between gap-4">
                <p className="tc">{s.label}</p>
                <p className="display-narrow text-2xl text-signal">{s.value}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ---- Spec sheet, grouped by department ---- */}
        <div className="lg:col-span-8 space-y-10 min-w-0">
          {groups.map((group) => (
            <div key={group.dept} data-reveal>
              <div className="flex items-center gap-3 mb-5">
                <p className="tc !text-signal shrink-0">{group.dept}</p>
                <div className="sprocket flex-1" />
              </div>

              <div className="space-y-6">
                {group.skills.map((skill) => (
                  <div key={skill.name} className="group">
                    <div className="flex items-baseline justify-between gap-4 mb-1.5">
                      <h3 className="display-narrow text-lg md:text-xl group-hover:text-signal transition-colors min-w-0">
                        {skill.name}
                      </h3>
                      <span className="font-mono text-xs text-signal tabular-nums shrink-0">
                        {skill.level}.0/10
                      </span>
                    </div>
                    <p className="font-mono text-[11px] text-mute mb-2">{skill.note}</p>
                    <div className="h-1 bg-line overflow-hidden">
                      <div
                        className="meter-fill h-full origin-left bg-signal"
                        style={{ width: `${skill.level * 10}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
