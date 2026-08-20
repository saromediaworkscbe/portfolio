import { SITE } from "@/lib/constants";

export default function Footer() {
  return (
    <footer className="mt-auto  px-5 md:px-10 py-6">
      <div className="sprocket mb-6" />
      <div className="flex flex-col md:flex-row gap-3 md:items-center justify-between">
        <p className="tc">
          © {new Date().getFullYear()} {SITE.name} — all frames reserved
        </p>
        <a href={`mailto:${SITE.email}`} className="tc hover:text-signal">
          {SITE.email}
        </a>
      </div>
    </footer>
  );
}
