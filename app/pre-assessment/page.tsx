import Link from "next/link";
import PreAssessmentForm from "../components/pre-assessment-form";

export default function PreAssessmentPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <section className="relative overflow-hidden border-b border-white/10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(132,225,0,0.18),transparent_30%),radial-gradient(circle_at_left,rgba(95,183,0,0.12),transparent_22%),linear-gradient(to_bottom,rgba(7,9,7,0.97),rgba(2,2,2,1))]" />
        <div className="relative mx-auto max-w-7xl px-6 py-16 md:px-10 lg:px-12 lg:py-20">
          <div className="max-w-4xl">
            <p className="text-sm uppercase tracking-[0.3em] text-lime-400">
              Jetizon Pre-Assessment
            </p>
            <h1 className="mt-4 text-4xl font-semibold tracking-tight md:text-6xl">
              Send site details, photos, and documents before a deeper charging review.
            </h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-300 md:text-xl">
              This intake is for property owners, managers, and host businesses
              exploring Level 2 or micromobility charging. Share the basics now
              and Jetizon can screen whether the site looks worth taking toward a
              contractor, partner, utility, or co-host discussion.
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
                className="rounded-2xl bg-lime-400 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:scale-[1.02]"
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
            <div className="rounded-[1.75rem] border border-lime-400/20 bg-lime-400/5 p-6">
              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-lime-400">
                What To Upload
              </p>
              <ul className="mt-4 space-y-3 text-sm leading-7 text-slate-300">
                <li>Parking area, garage, curbside, or loading-zone photos</li>
                <li>Electrical panel, meter room, or service access photos</li>
                <li>Utility letters, site plans, or sketches if you already have them</li>
              </ul>
            </div>

            <div className="rounded-[1.75rem] border border-white/10 bg-white/5 p-6">
              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-lime-400">
                Best Fit For
              </p>
              <ul className="mt-4 space-y-3 text-sm leading-7 text-slate-300">
                <li>Multifamily or mixed-use properties with parking</li>
                <li>Hotels, garages, lots, and neighborhood host sites</li>
                <li>Businesses exploring tenant, guest, or micromobility charging</li>
              </ul>
            </div>

            <div className="rounded-[1.75rem] border border-white/10 bg-white/5 p-6">
              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-lime-400">
                What Happens Next
              </p>
              <ol className="mt-4 space-y-3 text-sm leading-7 text-slate-300">
                <li>Jetizon reviews the site details, photos, and supporting files.</li>
                <li>
                  The property is screened for basic fit, likely charging path, and
                  obvious electrical or layout constraints.
                </li>
                <li>
                  If the site looks promising, Jetizon follows up about the next technical
                  step, which may include contractor review, utility document gathering, or
                  incentive screening.
                </li>
              </ol>
            </div>
          </div>

          <PreAssessmentForm layout="full" />
        </div>
      </section>
    </div>
  );
}
