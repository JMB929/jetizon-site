"use client";

import FaqBlock from "./components/faq-block";
import Link from "next/link";

export default function Page() {
  const pillars = [
    {
      title: "Electric Micromobility",
      text: "Jetizon is focused on practical electric mobility opportunities that connect host sites, charging access, and real-world urban use cases.",
    },
    {
      title: "Host-Site Development",
      text: "Jetizon helps property owners, businesses, and host sites evaluate and advance Level 2 and micromobility charging opportunities.",
    },
    {
      title: "Smart Battery Intelligence",
      text: "Over time, Jetizon's charging vision is intended to expand into smarter battery-awareness, safety insight, and data-informed charging operations.",
    },
  ];

  const roadmap = [
    {
      phase: "Phase 1",
      title: "Host-Site Origination",
      text: "Build the Jetizon intake and screening pipeline, qualify host opportunities, and create a practical path for early charging projects.",
    },
    {
      phase: "Phase 2",
      title: "Co-Host and Partner Projects",
      text: "Advance selected sites with installation partners, co-host structures, and staged charging deployments that prove real-world traction.",
    },
    {
      phase: "Phase 3",
      title: "Broader Charging Ecosystem",
      text: "Expand from facilitation and partner-led projects toward a broader Jetizon charging ecosystem that can support smarter long-term infrastructure growth.",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      {/* HERO */}
      <section className="relative overflow-hidden border-b border-white/10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(56,189,248,0.18),transparent_30%),radial-gradient(circle_at_left,rgba(59,130,246,0.10),transparent_22%),linear-gradient(to_bottom,rgba(15,23,42,0.96),rgba(2,6,23,1))]" />
        <div className="absolute inset-0 opacity-20 [background-image:linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] [background-size:44px_44px]" />

        <div className="relative mx-auto max-w-7xl px-6 py-16 md:px-10 lg:px-12 lg:py-20">
          <div className="grid items-center gap-14 lg:grid-cols-2">
            <div>
              <div className="mb-4 flex items-center gap-3">
                <img
                  src="/jetizon-logo.png"
                  alt="Jetizon logo"
                  className="h-12 w-12 rounded-xl object-contain"
                />
                <span className="text-sm font-medium text-cyan-300">
                  Jetizon Motorbike Intech LLC
                </span>
              </div>

              <h1 className="max-w-4xl text-4xl font-semibold tracking-tight md:text-6xl lg:text-7xl">
                Helping host sites move from charging interest to real project pathways.
              </h1>

              <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300 md:text-xl">
                Jetizon is building a charging-site facilitation and host-site
                development business focused on Level 2 and micromobility
                opportunities, with a long-term vision for a broader connected
                charging ecosystem.
              </p>

              <div className="mt-8 flex flex-wrap gap-4">
                <a
                  href="#contact"
                  className="rounded-2xl bg-cyan-300 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:scale-[1.02]"
                >
                  Contact Jetizon
                </a>
                <a
                  href="#roadmap"
                  className="rounded-2xl border border-white/15 bg-white/5 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
                >
                  View Roadmap
                </a>
              </div>

              <div className="mt-10 grid gap-4 sm:grid-cols-3">
                <div className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur">
                  <div className="text-2xl font-semibold text-cyan-300">NYC</div>
                  <p className="mt-1 text-sm text-slate-300">Urban rollout focus</p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur">
                  <div className="text-2xl font-semibold text-cyan-300">EV + Micro</div>
                  <p className="mt-1 text-sm text-slate-300">Charging ecosystem vision</p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur">
                  <div className="text-2xl font-semibold text-cyan-300">Smart Safety</div>
                  <p className="mt-1 text-sm text-slate-300">Battery intelligence roadmap</p>
                </div>
              </div>
            </div>

            <div className="relative flex justify-center">
              <div className="rounded-[2rem] border border-cyan-400/10 bg-white/5 p-6 shadow-2xl backdrop-blur">
                <img
                  src="/jetizon-logo.png"
                  alt="Jetizon logo large"
                  className="w-56 md:w-64 mx-auto opacity-90 drop-shadow-[0_0_22px_rgba(34,211,238,0.45)]"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* VISION */}
      <section id="vision" className="mx-auto max-w-7xl px-6 py-20 md:px-10 lg:px-12">
        <div className="max-w-3xl">
          <p className="text-sm uppercase tracking-[0.3em] text-cyan-300">The Vision</p>
            <h2 className="mt-4 text-3xl font-semibold md:text-5xl">
              Jetizon starts with facilitation, not overstatement.
            </h2>
            <p className="mt-6 text-lg leading-8 text-slate-300">
              Jetizon&apos;s near-term role is to help identify, screen, and advance
              real charging-site opportunities. Over time, that work is intended
              to grow into a broader charging ecosystem supported by better site
              intelligence, stronger host partnerships, and smarter battery-aware
              infrastructure.
            </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {pillars.map((pillar) => (
            <div
              key={pillar.title}
              className="rounded-[1.75rem] border border-white/10 bg-white/5 p-7 shadow-xl backdrop-blur"
            >
              <div className="mb-4 h-12 w-12 rounded-2xl bg-cyan-400/10 ring-1 ring-cyan-400/30" />
              <h3 className="text-xl font-semibold">{pillar.title}</h3>
              <p className="mt-3 text-sm leading-7 text-slate-300">{pillar.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ROADMAP */}
      <section id="roadmap" className="mx-auto max-w-7xl px-6 py-20 md:px-10 lg:px-12">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div className="max-w-3xl">
            <p className="text-sm uppercase tracking-[0.3em] text-cyan-300">Roadmap</p>
            <h2 className="mt-4 text-3xl font-semibold md:text-5xl">
              How the vision comes to life.
            </h2>
          </div>
          <p className="max-w-xl text-sm leading-7 text-slate-400">
            Jetizon is being developed in phases, beginning with brand foundation,
            followed by pilot deployment and long-term strategic collaborations.
          </p>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {roadmap.map((item) => (
            <div
              key={item.phase}
              className="rounded-[1.75rem] border border-white/10 bg-white/5 p-7"
            >
              <div className="text-sm uppercase tracking-[0.25em] text-cyan-300">
                {item.phase}
              </div>
              <h3 className="mt-3 text-2xl font-semibold">{item.title}</h3>
              <p className="mt-4 text-sm leading-7 text-slate-300">{item.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* PRE-ASSESSMENT OVERVIEW */}
      <section className="mx-auto max-w-7xl px-6 py-20 md:px-10 lg:px-12">
        <div className="grid gap-10 lg:grid-cols-[0.95fr,1.05fr]">
          <div className="max-w-3xl">
          <p className="text-sm uppercase tracking-[0.3em] text-cyan-300">
            Preliminary Site Review
          </p>
          <h2 className="mt-4 text-3xl font-semibold md:text-5xl">
            A structured first step for host sites exploring charging.
          </h2>
          <p className="mt-6 text-lg leading-8 text-slate-300">
            Jetizon helps property owners, businesses, and host sites understand
            whether a site appears to be a realistic fit for Level 2 or
            micromobility charging before time and money are spent on the wrong
            design path.
          </p>
            <div className="mt-8 rounded-[1.75rem] border border-white/10 bg-white/5 p-6">
              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-cyan-300">
                What We Review
              </p>
              <ul className="mt-4 space-y-3 text-sm leading-7 text-slate-300">
                <li>Property type, parking layout, and charging goal</li>
                <li>Site photos and basic electrical visibility</li>
                <li>Whether the project looks straightforward or more complex</li>
                <li>Whether contractor, utility, partner, or added approval coordination may be needed</li>
              </ul>
            </div>
          </div>

          <div className="space-y-6">
            <div className="rounded-[1.75rem] border border-white/10 bg-white/5 p-6">
              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-cyan-300">
                How It Works
              </p>
              <ol className="mt-4 space-y-4 text-sm leading-7 text-slate-300">
                <li>
                  <strong className="text-white">1. Submit site details and photos.</strong>{" "}
                  Share the address, charging goal, and the basics of the property.
                </li>
                <li>
                  <strong className="text-white">2. Jetizon performs a preliminary review.</strong>{" "}
                  We screen for fit, likely electrical practicality, and early complexity triggers.
                </li>
                <li>
                  <strong className="text-white">3. Receive a recommended next step.</strong>{" "}
                  That may be contractor review, technical follow-up, more documentation, or pause.
                </li>
              </ol>
            </div>

            <div className="rounded-[1.75rem] border border-cyan-400/20 bg-cyan-400/5 p-6">
              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-cyan-300">
                Best Fit Examples
              </p>
              <ul className="mt-4 space-y-3 text-sm leading-7 text-slate-300">
                <li>Multifamily properties and mixed-use buildings with parking</li>
                <li>Hotels, garages, lots, and neighborhood host sites</li>
                <li>Businesses exploring guest, tenant, customer, or micromobility charging</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* FOUNDER + CONTACT INFO */}
      <section className="mx-auto max-w-7xl px-6 py-20 md:px-10 lg:px-12">
        <div className="grid items-center gap-10 lg:grid-cols-[1.1fr,0.9fr]">
          <div className="rounded-[2rem] border border-white/10 bg-white/5 p-8 shadow-2xl backdrop-blur">
            <img
              src="/andre-neptune-jr.jpg"
              alt="Andre Neptune Jr"
              className="mb-6 h-40 w-40 rounded-full border border-white/10 object-cover shadow-2xl"
            />
            <p className="text-sm uppercase tracking-[0.3em] text-cyan-300">Founder</p>
            <h2 className="mt-4 text-3xl font-semibold md:text-5xl">Andre Neptune Jr</h2>
            <p className="mt-6 text-lg leading-8 text-slate-300">
              Andre Neptune Jr is a Doctor of Information Technology candidate at City
              University of Seattle, specializing in the intersection of artificial
              intelligence, battery safety, and edge computing systems. His research
              focuses on developing physics-informed machine learning frameworks for
              early-stage safety prediction in lithium-ion batteries, particularly under
              reduced atmospheric pressure conditions.
            </p>
            <p className="mt-4 text-lg leading-8 text-slate-300">
              With a strong emphasis on real-world deployment, his work explores how
              intelligent battery monitoring and predictive analytics can be embedded
              directly into edge devices to enhance safety, reliability, and response
              time in electric mobility systems.
            </p>
            <p className="mt-4 text-lg leading-8 text-slate-300">
              Through Jetizon, Andre is translating this research into practical
              innovation—building an ecosystem that combines electric vehicles,
              charging infrastructure, and smart battery intelligence into a unified
              platform for the future of mobility.
            </p>
          </div>

          <div className="rounded-[2rem] border border-white/10 bg-slate-900 p-8 shadow-2xl">
            <h3 className="text-xl font-semibold">Contact Information</h3>
            <div className="mt-6 space-y-4 text-slate-300">
              <p><strong>Owner:</strong> Andre Neptune Jr</p>
              <p><strong>Phone:</strong> (646) 991-1287</p>
              <p>
                <strong>Email:</strong>{" "}
                <a href="mailto:jmbintech@gmail.com" className="text-cyan-300 underline">
                  jmbintech@gmail.com
                </a>
              </p>
              <p><strong>Location:</strong> Ridgewood, New York</p>
              <p><strong>Company:</strong> Jetizon Motorbike Intech LLC</p>
            </div>

            <div className="mt-8 rounded-2xl border border-cyan-400/20 bg-cyan-400/5 p-5">
              <p className="text-sm uppercase tracking-[0.25em] text-cyan-300">Partnerships</p>
              <p className="mt-3 text-sm leading-7 text-slate-300">
                Jetizon is actively exploring opportunities with infrastructure providers,
                site hosts, and strategic partners interested in advancing practical
                urban charging projects.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CONTACT FORM */}
      <section id="contact" className="mx-auto max-w-7xl px-6 py-20 md:px-10 lg:px-12">
        <div className="grid gap-10 lg:grid-cols-[0.9fr,1.1fr]">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-cyan-300">
              Free Preliminary Site Review
            </p>
            <h2 className="mt-4 text-3xl font-semibold md:text-5xl">
              Start with a focused intake before deeper charging planning.
            </h2>
            <p className="mt-6 text-lg leading-8 text-slate-300">
              If you are exploring Level 2 or micromobility charging for your
              property, Jetizon can review your initial site information and help
              determine whether the location looks worth advancing toward a contractor,
              partner, utility, or co-host discussion.
            </p>
            <div className="mt-8 rounded-[1.75rem] border border-cyan-400/20 bg-cyan-400/5 p-6">
              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-cyan-300">
                Best For
              </p>
              <ul className="mt-4 space-y-3 text-sm leading-7 text-slate-300">
                <li>Property owners and managers screening host-site potential</li>
                <li>Businesses exploring customer, tenant, or micromobility charging</li>
                <li>Sites with parking, curb access, or utility information ready to share</li>
              </ul>
            </div>
            <div className="mt-8 space-y-3 text-slate-300">
              <p><strong>Email:</strong> jmbintech@gmail.com</p>
              <p><strong>Phone:</strong> (646) 991-1287</p>
              <p><strong>Location:</strong> Ridgewood, New York</p>
            </div>
          </div>

          <div className="rounded-[2rem] border border-white/10 bg-white/5 p-8 shadow-2xl backdrop-blur">
            <p className="text-lg leading-8 text-slate-300">
              Use the dedicated intake form to upload photos, parking details, site
              information, and supporting documents before a deeper site review.
            </p>
            <div className="mt-8 rounded-2xl border border-white/10 bg-slate-900/70 p-6">
              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-cyan-300">
                Included In The Intake
              </p>
              <ul className="mt-4 space-y-3 text-sm leading-7 text-slate-300">
                <li>Property and contact details</li>
                <li>Charging type and site-control questions</li>
                <li>Photo and document uploads for early screening</li>
              </ul>
            </div>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/pre-assessment"
                className="rounded-2xl bg-cyan-300 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:scale-[1.01]"
              >
                Start Pre-Assessment
              </Link>
              <a
                href="mailto:jmbintech@gmail.com"
                className="rounded-2xl border border-white/15 bg-white/5 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
              >
                Email Instead
              </a>
            </div>
          </div>
        </div>
      </section>

      <FaqBlock />

      {/* FOOTER CTA */}
      <section className="mx-auto max-w-7xl px-6 pb-20 md:px-10 lg:px-12">
        <div className="rounded-[2rem] border border-cyan-400/20 bg-gradient-to-br from-cyan-500/10 via-slate-900 to-slate-950 p-8 shadow-2xl md:p-12">
          <div className="max-w-3xl">
            <p className="text-sm uppercase tracking-[0.3em] text-cyan-300">Coming Soon</p>
            <h2 className="mt-4 text-3xl font-semibold md:text-5xl">
              Vehicles. Charging. Smart expansion.
            </h2>
            <p className="mt-6 text-lg leading-8 text-slate-300">
              Jetizon is building from host-site screening and partner development
              toward broader charging growth. As milestones are met, future
              announcements will highlight project advancement, charging activation,
              and collaborative expansion opportunities.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
