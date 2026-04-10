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
      <section className="relative overflow-hidden border-b border-white/10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(56,189,248,0.22),transparent_28%),radial-gradient(circle_at_left,rgba(59,130,246,0.18),transparent_22%),linear-gradient(to_bottom,rgba(15,23,42,0.96),rgba(2,6,23,1))]" />
        <div className="relative mx-auto max-w-7xl px-6 py-20 md:px-10 lg:px-12">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div>
              <div className="mb-4 inline-flex items-center rounded-full border border-cyan-400/30 bg-cyan-400/10 px-4 py-1 text-sm text-cyan-200">
                Jetizon Motorbike Intech LLC
              </div>
              <h1 className="max-w-3xl text-4xl font-semibold tracking-tight md:text-6xl">
                Powering the next wave of electric mobility.
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300 md:text-xl">
                Jetizon is a forward-looking electric mobility brand focused on motorbikes,
                smart charging access, and the long-term vision of a connected clean-energy
                transportation ecosystem.
              </p>
            </div>

            <div className="relative">
              <div className="rounded-[2rem] border border-white/10 bg-white/5 p-5 shadow-2xl backdrop-blur">
                <div className="rounded-[1.5rem] border border-cyan-400/20 bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 p-8">
                  <div className="mb-8 flex items-center justify-between">
                    <span className="text-sm uppercase tracking-[0.3em] text-cyan-300">
                      Vision Snapshot
                    </span>
                    <span className="rounded-full border border-emerald-400/30 bg-emerald-400/10 px-3 py-1 text-xs text-emerald-200">
                      Early Stage
                    </span>
                  </div>
                  <div className="space-y-5">
                    <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
                      <h3 className="text-lg font-semibold">Mission</h3>
                      <p className="mt-2 text-sm leading-7 text-slate-300">
                        Build an electric mobility platform that brings together vehicles,
                        charging access, and smarter battery awareness under one brand.
                      </p>
                    </div>
                    <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
                      <h3 className="text-lg font-semibold">Focus</h3>
                      <p className="mt-2 text-sm leading-7 text-slate-300">
                        Urban transportation, practical charging convenience, and scalable
                        infrastructure that can grow from micromobility into broader EV use.
                      </p>
                    </div>
                    <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
                      <h3 className="text-lg font-semibold">Future</h3>
                      <p className="mt-2 text-sm leading-7 text-slate-300">
                        Launch initial products, activate the first charging location, and
                        prepare for collaborative expansion with aligned partners.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="vision" className="mx-auto max-w-7xl px-6 py-20 md:px-10 lg:px-12">
        <div className="max-w-3xl">
          <p className="text-sm uppercase tracking-[0.3em] text-cyan-300">The Vision</p>
          <h2 className="mt-4 text-3xl font-semibold md:text-5xl">
            Jetizon is more than a motorbike concept.
          </h2>
          <p className="mt-6 text-lg leading-8 text-slate-300">
            We envision a unified electric mobility experience where clean vehicles,
            accessible charging, and intelligent battery systems work together to support
            a more efficient and sustainable future.
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

      <section id="roadmap" className="mx-auto max-w-7xl px-6 py-20 md:px-10 lg:px-12">
        <div className="max-w-3xl">
          <p className="text-sm uppercase tracking-[0.3em] text-cyan-300">Roadmap</p>
          <h2 className="mt-4 text-3xl font-semibold md:text-5xl">
            How the vision comes to life.
          </h2>
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

      <section className="mx-auto max-w-7xl px-6 py-20 md:px-10 lg:px-12">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <div>
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
              innovation—building an ecosystem that combines electric vehicles, charging
              infrastructure, and smart battery intelligence into a unified platform for
              the future of mobility.
            </p>
          </div>

          <div className="rounded-[2rem] border border-white/10 bg-slate-900 p-8 shadow-2xl">
            <h3 className="text-xl font-semibold">Contact Information</h3>
            <div className="mt-6 space-y-4 text-slate-300">
              <p>
                <strong>Owner:</strong> Andre Neptune Jr
              </p>
              <p>
                <strong>Phone:</strong> (646) 991-1287
              </p>
              <p>
                <strong>Location:</strong> Ridgewood, New York
              </p>
              <p>
                <strong>Company:</strong> Jetizon Motorbike Intech LLC
              </p>
            </div>
          </div>
        </div>
      </section>

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