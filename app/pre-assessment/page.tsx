import Link from "next/link";
import PreAssessmentForm from "../components/pre-assessment-form";

export default function PreAssessmentPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <section className="relative overflow-hidden border-b border-white/10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(56,189,248,0.18),transparent_30%),radial-gradient(circle_at_left,rgba(59,130,246,0.10),transparent_22%),linear-gradient(to_bottom,rgba(15,23,42,0.96),rgba(2,6,23,1))]" />
        <div className="relative mx-auto max-w-7xl px-6 py-16 md:px-10 lg:px-12 lg:py-20">
          <div className="max-w-4xl">
            <p className="text-sm uppercase tracking-[0.3em] text-cyan-300">
              Jetizon Pre-Assessment
            </p>
            <h1 className="mt-4 text-4xl font-semibold tracking-tight md:text-6xl">
              Send site details, photos, and documents before a full charging review.
            </h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-300 md:text-xl">
              This intake is for property owners, managers, and host businesses exploring
              Level 2 or micromobility charging. Share the basics now and Jetizon can
              screen whether the site looks worth taking to the next step.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/"
                className="rounded-2xl border border-white/15 bg-white/5 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
              >
                Back to Homepage
              </Link>
              <a
                href="mailto:jmbintech@gmail.com"
                className="rounded-2xl bg-cyan-300 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:scale-[1.02]"
              >
                Email Jetizon Directly
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-20 md:px-10 lg:px-12">
        <div className="grid gap-10 lg:grid-cols-[0.85fr,1.15fr]">
          <div className="space-y-6">
            <div className="rounded-[1.75rem] border border-cyan-400/20 bg-cyan-400/5 p-6">
              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-cyan-300">
                What To Upload
              </p>
              <ul className="mt-4 space-y-3 text-sm leading-7 text-slate-300">
                <li>Parking area, garage, curbside, or loading-zone photos</li>
                <li>Electrical panel, meter room, or service access photos</li>
                <li>Utility letters, site plans, or sketches if you already have them</li>
              </ul>
            </div>

            <div className="rounded-[1.75rem] border border-white/10 bg-white/5 p-6">
              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-cyan-300">
                Best Fit For
              </p>
              <ul className="mt-4 space-y-3 text-sm leading-7 text-slate-300">
                <li>Multifamily or mixed-use properties with parking</li>
                <li>Hotels, garages, lots, and neighborhood host sites</li>
                <li>Businesses exploring tenant, guest, or micromobility charging</li>
              </ul>
            </div>

            <div className="rounded-[1.75rem] border border-white/10 bg-white/5 p-6">
              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-cyan-300">
                What Happens Next
              </p>
              <p className="mt-4 text-sm leading-7 text-slate-300">
                Jetizon reviews the materials, screens the site for basic fit, and then
                follows up if the location appears technically and commercially worth
                evaluating further.
              </p>
            </div>
          </div>

          <PreAssessmentForm layout="full" />
        </div>
      </section>
    </div>
  );
}
