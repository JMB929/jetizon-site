import Link from "next/link";
import PreAssessmentForm from "../components/pre-assessment-form";

export default function PreAssessmentPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <section className="relative overflow-hidden border-b border-white/10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(132,225,0,0.18),transparent_30%),radial-gradient(circle_at_left,rgba(95,183,0,0.12),transparent_22%),linear-gradient(to_bottom,rgba(7,9,7,0.97),rgba(2,2,2,1))]" />
        <div className="relative mx-auto max-w-7xl px-6 py-16 md:px-10 lg:px-12 lg:py-20">
          <div className="flex items-center justify-between gap-4 rounded-full border border-white/10 bg-white/[0.04] px-4 py-3 backdrop-blur">
            <div className="flex items-center gap-3">
              <span className="inline-flex h-3 w-3 rounded-full bg-lime-400 shadow-[0_0_18px_rgba(132,225,0,0.7)]" />
              <p className="text-xs font-medium uppercase tracking-[0.3em] text-slate-300">
                Jetizon Intake Flow
              </p>
            </div>
            <Link
              href="/"
              className="text-xs font-medium uppercase tracking-[0.24em] text-slate-300 transition hover:text-lime-300"
            >
              Back to Homepage
            </Link>
          </div>

          <div className="mt-10 grid gap-10 lg:grid-cols-[1.1fr,0.9fr] lg:items-start">
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
                <a
                  href="mailto:andre@jetizonmotorbikeintech.com"
                  className="rounded-2xl bg-lime-400 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:scale-[1.02]"
                >
                  Email Jetizon Directly
                </a>
                <Link
                  href="/#contact"
                  className="rounded-2xl border border-white/15 bg-white/5 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
                >
                  View Homepage Overview
                </Link>
              </div>
            </div>

            <div className="rounded-[2rem] border border-lime-400/20 bg-black/25 p-7 shadow-2xl backdrop-blur">
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-lime-300">
                Before A Full Technical Step
              </p>
              <h2 className="mt-3 text-2xl font-semibold">
                Jetizon uses this page to separate credible sites from weak ones.
              </h2>
              <div className="mt-6 grid gap-4">
                <div className="rounded-[1.5rem] border border-white/10 bg-white/[0.03] p-4">
                  <p className="text-xs uppercase tracking-[0.22em] text-lime-300">
                    Current Use
                  </p>
                  <p className="mt-2 text-sm leading-6 text-slate-300">
                    Early site screening before contractor pricing, utility document
                    gathering, or partner review.
                  </p>
                </div>
                <div className="rounded-[1.5rem] border border-white/10 bg-white/[0.03] p-4">
                  <p className="text-xs uppercase tracking-[0.22em] text-lime-300">
                    Typical Output
                  </p>
                  <p className="mt-2 text-sm leading-6 text-slate-300">
                    Clearer next step, likely project path, and an early read on
                    whether the opportunity looks simple, conditional, or too complex.
                  </p>
                </div>
                <div className="rounded-[1.5rem] border border-white/10 bg-white/[0.03] p-4">
                  <p className="text-xs uppercase tracking-[0.22em] text-lime-300">
                    Best Early Signal
                  </p>
                  <p className="mt-2 text-sm leading-6 text-slate-300">
                    A host that can share site control, parking context, and usable
                    photos on the first pass.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-20 md:px-10 lg:px-12">
        <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div className="max-w-3xl">
            <p className="text-sm uppercase tracking-[0.3em] text-lime-400">Intake Packet</p>
            <h2 className="mt-4 text-3xl font-semibold md:text-5xl">
              Give enough signal to decide whether the site should move forward.
            </h2>
          </div>
          <p className="max-w-xl text-sm leading-7 text-slate-400">
            The goal is not a final engineering package. It is enough context to
            screen the opportunity, spot obvious issues, and decide whether deeper
            review is justified.
          </p>
        </div>

        <div className="grid gap-10 lg:grid-cols-[0.8fr,1.2fr]">
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

            <div className="rounded-[1.75rem] border border-white/10 bg-black/25 p-6">
              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-lime-400">
                Submission Should Answer
              </p>
              <ul className="mt-4 space-y-3 text-sm leading-7 text-slate-300">
                <li>Who controls the property or host decision</li>
                <li>What charging outcome the site is actually exploring</li>
                <li>Whether there is enough visibility to justify the next step</li>
              </ul>
            </div>
          </div>

          <div className="space-y-6">
            <div className="rounded-[1.75rem] border border-white/10 bg-white/5 p-6">
              <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                <div className="max-w-2xl">
                  <p className="text-sm font-semibold uppercase tracking-[0.25em] text-lime-400">
                    Form Summary
                  </p>
                  <p className="mt-3 text-sm leading-7 text-slate-300">
                    This form captures the site basics, photos, host role, and charging
                    objective needed for a practical first-pass review.
                  </p>
                </div>
                <div className="rounded-2xl border border-lime-400/20 bg-lime-400/5 px-4 py-3 text-xs font-medium uppercase tracking-[0.22em] text-lime-300">
                  Internal Use: Screening First
                </div>
              </div>
            </div>

            <PreAssessmentForm layout="full" />
          </div>
        </div>
      </section>
    </div>
  );
}
