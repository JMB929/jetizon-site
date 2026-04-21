"use client";

import Link from "next/link";

export default function Page() {
  const pillars = [
    {
      title: "Electric Micromobility",
      text: "Jetizon is building a cleaner urban future through electric motorbikes, e-bikes, and smart mobility solutions designed for real-world use.",
    },
    {
      title: "Charging Infrastructure",
      text: "Our vision extends beyond vehicles. We are developing a connected charging ecosystem that can support both micromobility and broader EV adoption.",
    },
    {
      title: "Smart Battery Intelligence",
      text: "Jetizon aims to integrate advanced battery monitoring, safety awareness, and data-driven energy insights to improve reliability and performance.",
    },
  ];

  const roadmap = [
    {
      phase: "Phase 1",
      title: "Brand Foundation",
      text: "Establish the Jetizon identity, clarify the mission, and introduce the vision for an electrified mobility ecosystem.",
    },
    {
      phase: "Phase 2",
      title: "Pilot Rollout",
      text: "Launch initial vehicles and the first charging location to demonstrate real-world usability and community value.",
    },
    {
      phase: "Phase 3",
      title: "Strategic Collaborations",
      text: "Announce partnerships, expand the charging footprint, and connect Jetizon to a broader clean-energy mobility network.",
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
                Powering the next wave of electric mobility.
              </h1>

              <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300 md:text-xl">
                Jetizon is a forward-looking electric mobility brand focused on
                motorbikes, smart charging access, and the long-term vision of a
                connected clean-energy transportation ecosystem.
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
            Jetizon is more than a motorbike concept.
          </h2>
          <p className="mt-6 text-lg leading-8 text-slate-300">
            We envision a unified electric mobility experience where clean vehicles,
            accessible charging, and intelligent battery systems work together to
            support a more efficient and sustainable future.
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
                property owners, and host businesses interested in the future of urban charging.
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
              Start with a focused intake before a full charging review.
            </h2>
            <p className="mt-6 text-lg leading-8 text-slate-300">
              If you are exploring Level 2 or micromobility charging for your property,
              Jetizon can review your initial site information and determine whether
              the location looks worth evaluating further.
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
              information, and any supporting documents before a deeper review.
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

      {/* FOOTER CTA */}
      <section className="mx-auto max-w-7xl px-6 pb-20 md:px-10 lg:px-12">
        <div className="rounded-[2rem] border border-cyan-400/20 bg-gradient-to-br from-cyan-500/10 via-slate-900 to-slate-950 p-8 shadow-2xl md:p-12">
          <div className="max-w-3xl">
            <p className="text-sm uppercase tracking-[0.3em] text-cyan-300">Coming Soon</p>
            <h2 className="mt-4 text-3xl font-semibold md:text-5xl">
              Vehicles. Charging. Smart expansion.
            </h2>
            <p className="mt-6 text-lg leading-8 text-slate-300">
              Jetizon is currently building its foundation for launch. As milestones are
              met, future announcements will highlight vehicle deployment, charging
              activation, and collaborative growth opportunities.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
