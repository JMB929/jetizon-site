import Link from "next/link";

type LanguageSwitcherProps = {
  current: "en" | "es";
  enHref: string;
  esHref: string;
};

export default function LanguageSwitcher({
  current,
  enHref,
  esHref,
}: LanguageSwitcherProps) {
  const baseClass =
    "rounded-full border px-3 py-2 text-[11px] font-semibold uppercase tracking-[0.22em] transition";

  return (
    <div className="flex items-center gap-2">
      <Link
        href={enHref}
        className={`${baseClass} ${
          current === "en"
            ? "border-lime-400/30 bg-lime-400 text-slate-950"
            : "border-white/15 bg-white/5 text-slate-200 hover:bg-white/10"
        }`}
      >
        EN
      </Link>
      <Link
        href={esHref}
        className={`${baseClass} ${
          current === "es"
            ? "border-lime-400/30 bg-lime-400 text-slate-950"
            : "border-white/15 bg-white/5 text-slate-200 hover:bg-white/10"
        }`}
      >
        ES
      </Link>
    </div>
  );
}
