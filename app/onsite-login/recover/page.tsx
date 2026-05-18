import Link from "next/link";

import OnsiteResetForm from "@/app/components/onsite-reset-form";

export default function OnsiteResetPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(132,225,0,0.16),transparent_30%),linear-gradient(to_bottom,rgba(15,23,42,0.96),rgba(2,6,23,1))]" />
        <div className="relative mx-auto flex min-h-screen max-w-6xl items-center px-5 py-10 md:px-10">
          <div className="grid w-full gap-8 lg:grid-cols-[1fr,0.95fr]">
            <div className="max-w-2xl">
              <p className="text-sm uppercase tracking-[0.3em] text-lime-400">
                Recovery
              </p>
              <h1 className="mt-4 text-4xl font-semibold tracking-tight md:text-6xl">
                Reset Jetizon onsite access
              </h1>
              <p className="mt-6 text-base leading-7 text-slate-300 md:text-lg md:leading-8">
                Rotate the onsite username and password without needing the old pair.
                The reset code should stay with the owner or operator only.
              </p>
              <div className="mt-8 rounded-[1.75rem] border border-white/10 bg-white/5 p-5">
                <p className="text-sm font-semibold text-white">What this does</p>
                <ul className="mt-4 space-y-3 text-sm leading-7 text-slate-300">
                  <li>- Replaces the active onsite login credentials</li>
                  <li>- Signs you in with the new pair after the reset</li>
                  <li>- Keeps the recovery path off the public login screen</li>
                </ul>
              </div>
              <Link
                href="/onsite-login"
                className="mt-6 inline-flex rounded-2xl border border-white/15 bg-white/5 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
              >
                Back to sign in
              </Link>
            </div>

            <OnsiteResetForm />
          </div>
        </div>
      </section>
    </div>
  );
}

