import Link from "next/link";

import OnsiteLoginForm from "../components/onsite-login-form";

export default async function OnsiteLoginPage({
  searchParams,
}: {
  searchParams: Promise<{ next?: string }>;
}) {
  const params = await searchParams;
  const nextPath = params.next || "/onsite-assistant";

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(56,189,248,0.16),transparent_30%),linear-gradient(to_bottom,rgba(15,23,42,0.96),rgba(2,6,23,1))]" />
        <div className="relative mx-auto flex min-h-screen max-w-6xl items-center px-5 py-10 md:px-10">
          <div className="grid w-full gap-8 lg:grid-cols-[1fr,0.95fr]">
            <div className="max-w-2xl">
              <p className="text-sm uppercase tracking-[0.3em] text-lime-400">
                Private Access
              </p>
              <h1 className="mt-4 text-4xl font-semibold tracking-tight md:text-6xl">
                Jetizon Onsite Sign In
              </h1>
              <p className="mt-6 text-base leading-7 text-slate-300 md:text-lg md:leading-8">
                Sign in to open the private Jetizon field assistant for site
                screening, aerial review, and AI-assisted photo analysis.
              </p>
              <div className="mt-8 rounded-[1.75rem] border border-white/10 bg-white/5 p-5">
                <p className="text-sm font-semibold text-white">What this opens</p>
                <ul className="mt-4 space-y-3 text-sm leading-7 text-slate-300">
                  <li>- Mobile-friendly onsite assessment workflow</li>
                  <li>- Bird&apos;s-eye property review from the address</li>
                  <li>- AI photo screening and saved summaries</li>
                </ul>
              </div>
              <Link
                href="/"
                className="mt-6 inline-flex rounded-2xl border border-white/15 bg-white/5 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
              >
                Back to site
              </Link>
            </div>

            <OnsiteLoginForm nextPath={nextPath} />
          </div>
        </div>
      </section>
    </div>
  );
}
