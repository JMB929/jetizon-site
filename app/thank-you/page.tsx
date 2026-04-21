import Link from "next/link";

export default function ThankYouPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center px-6">
      <div className="max-w-2xl rounded-[2rem] border border-white/10 bg-white/5 p-10 shadow-2xl backdrop-blur text-center">
        <p className="text-sm uppercase tracking-[0.3em] text-cyan-300">
          Request Received
        </p>

        <h1 className="mt-4 text-4xl font-semibold md:text-5xl">
          Thank you for sending your Jetizon intake.
        </h1>

        <p className="mt-6 text-lg leading-8 text-slate-300">
          Your pre-assessment request was submitted successfully. Jetizon will
          review the site details and any uploaded materials, then follow up if
          the location looks worth evaluating further.
        </p>

        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Link
            href="/"
            className="rounded-2xl bg-cyan-300 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:scale-[1.02]"
          >
            Return to Homepage
          </Link>

          <Link
            href="/pre-assessment"
            className="rounded-2xl border border-white/15 bg-white/5 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
          >
            Submit Another Intake
          </Link>

          <a
            href="mailto:jmbintech@gmail.com"
            className="rounded-2xl border border-white/15 bg-white/5 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
          >
            Email Jetizon
          </a>
        </div>
      </div>
    </div>
  );
}
