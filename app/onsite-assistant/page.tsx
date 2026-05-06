import Link from "next/link";

import OnsiteAssistant from "../components/onsite-assistant";

export default function OnsiteAssistantPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <section className="relative overflow-hidden border-b border-white/10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(56,189,248,0.18),transparent_30%),linear-gradient(to_bottom,rgba(15,23,42,0.96),rgba(2,6,23,1))]" />
        <div className="relative mx-auto max-w-7xl px-5 py-10 md:px-10 md:py-16 lg:px-12">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="max-w-3xl">
              <p className="text-sm uppercase tracking-[0.3em] text-lime-400">
                Private PWA
              </p>
              <h1 className="mt-4 text-3xl font-semibold tracking-tight md:text-6xl">
                Jetizon Onsite Assistant
              </h1>
              <p className="mt-4 text-base leading-7 text-slate-300 md:mt-6 md:text-lg md:leading-8">
                A first internal field-assessment tool for sorting site fit,
                approval risk, and the best next step while you are onsite.
              </p>
              <p className="mt-4 text-sm leading-7 text-slate-400">
                This route is intended for Jetizon internal use and should be
                protected by server-side credentials.
              </p>
            </div>

            <Link
              href="/"
              className="rounded-2xl border border-white/15 bg-white/5 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
            >
              Back to site
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-8 pb-28 md:px-10 md:py-12 lg:px-12 lg:py-16">
        <div className="mb-6 grid gap-4 md:mb-8 md:grid-cols-3">
          <div className="rounded-[1.75rem] border border-white/10 bg-white/5 p-5">
            <div className="text-sm uppercase tracking-[0.25em] text-lime-400">
              Step 1
            </div>
            <p className="mt-3 text-sm leading-7 text-slate-300">
              Capture the basic site facts and classify the project type.
            </p>
          </div>
          <div className="rounded-[1.75rem] border border-white/10 bg-white/5 p-5">
            <div className="text-sm uppercase tracking-[0.25em] text-lime-400">
              Step 2
            </div>
            <p className="mt-3 text-sm leading-7 text-slate-300">
              Read the Green / Yellow / Red scoring and likely agency path.
            </p>
          </div>
          <div className="rounded-[1.75rem] border border-white/10 bg-white/5 p-5">
            <div className="text-sm uppercase tracking-[0.25em] text-lime-400">
              Step 3
            </div>
            <p className="mt-3 text-sm leading-7 text-slate-300">
              Use the recommendation and checklist to decide the next move.
            </p>
          </div>
        </div>

        <OnsiteAssistant />
      </section>
    </div>
  );
}
