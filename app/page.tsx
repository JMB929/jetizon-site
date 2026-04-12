"use client";

import { useState } from "react";

export default function Page() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    interest: "General Inquiry",
    message: "",
    company: "",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

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

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMessage("");

    if (formData.company) {
      setStatus("success");
      return;
    }

    try {
      const response = await fetch("https://formspree.io/f/meevjrzz", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          interest: formData.interest,
          message: formData.message,
          _subject: "New Jetizon website inquiry",
        }),
      });

      if (response.ok) {
        setStatus("success");
        setFormData({
          name: "",
          email: "",
          interest: "General Inquiry",
          message: "",
          company: "",
        });

        setTimeout(() => {
          window.location.href = "/thank-you";
        }, 1200);
      } else {
        const data = await response.json().catch(() => null);
        setStatus("error");
        setErrorMessage(
          data?.errors?.[0]?.message || "Something went wrong. Please try again."
        );
      }
    } catch {
      setStatus("error");
      setErrorMessage("Network error. Please check your connection and try again.");
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <section className="relative overflow-hidden border-b border-white/10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(56,189,248,0.24),transparent_28%),radial-gradient(circle_at_left,rgba(59,130,246,0.16),transparent_22%),linear-gradient(to_bottom,rgba(15,23,42,0.96),rgba(2,6,23,1))]" />
        <div className="absolute inset-0 opacity-20 [background-image:linear-gradient(rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.08)_1px,transparent_1px)] [background-size:44px_44px]" />
        <div className="relative mx-auto max-w-7xl px-6 py-20 md:px-10 lg:px-12 lg:py-28">
          <div className="grid items-center gap-14 lg:grid-cols-2">
            <div>
              <div className="mb-6 flex items-center gap-4">
                <img
                  src="/jetizon-logo.png"
                  alt="Jetizon logo"
                  className="h-14 w-14 rounded-2xl object-contain shadow-2xl"
                />
                <div className="inline-flex items-center rounded-full border border-cyan-400/30 bg-cyan-400/10 px-4 py-1 text-sm text-cyan-200">
                  Jetizon Motorbike Intech LLC
                </div>
              </div>

              <h1 className="max-w-4xl text-4xl font-semibold tracking-tight md:text-6xl lg:text-7xl">
                Powering the next wave of electric mobility.
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300 md:text-xl">
                Jetizon is a forward-looking electric mobility brand focused on motorbikes,
                smart charging access, and the long-term vision of a connected clean-energy
                transportation ecosystem.
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
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur">
                  <div className="text-2xl font-semibold text-cyan-300">NYC</div>
                  <p className="mt-1 text-sm text-slate-300">Urban rollout focus</p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur">
                  <div className="text-2xl font-semibold text-cyan-300">EV + Micro</div>
                  <p className="mt-1 text-sm text-slate-300">Charging ecosystem vision</p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur">
                  <div className="text-2xl font-semibold text-cyan-300">Smart Safety</div>
                  <p className="mt-1 text-sm text-slate-300">Battery intelligence roadmap</p>
                </div>
              </div>
            </div>

            <div className="relative">
              <img
                src="/jetizon-logo.png"
                alt="Jetizon logo large"
                className="w-56 md:w-64 mx-auto opacity-80 drop-shadow-[0_0_20px_rgba(34,211,238,0.5)]"
              />
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
              innovation—building an ecosystem that combines electric vehicles, charging
              infrastructure, and smart battery intelligence into a unified platform for
              the future of mobility.
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

      <section id="contact" className="mx-auto max-w-7xl px-6 py-20 md:px-10 lg:px-12">
        <div className="grid gap-10 lg:grid-cols-[0.9fr,1.1fr]">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-cyan-300">Contact Jetizon</p>
            <h2 className="mt-4 text-3xl font-semibold md:text-5xl">
              Let’s talk about vehicles, charging, and partnerships.
            </h2>
            <p className="mt-6 text-lg leading-8 text-slate-300">
              Whether you are interested in future collaboration, host-site opportunities,
              or learning more about Jetizon’s mobility vision, use the form or email us directly.
            </p>
            <div className="mt-8 space-y-3 text-slate-300">
              <p><strong>Email:</strong> jmbintech@gmail.com</p>
              <p><strong>Phone:</strong> (646) 991-1287</p>
              <p><strong>Location:</strong> Ridgewood, New York</p>
            </div>
          </div>

          <div className="rounded-[2rem] border border-white/10 bg-white/5 p-8 shadow-2xl backdrop-blur">
            <form onSubmit={handleSubmit} className="space-y-5">
              <input
                type="text"
                name="company"
                value={formData.company}
                onChange={handleChange}
                tabIndex={-1}
                autoComplete="off"
                className="hidden"
                aria-hidden="true"
              />

              <div>
                <label htmlFor="name" className="mb-2 block text-sm font-medium text-slate-200">
                  Full Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full rounded-2xl border border-white/10 bg-slate-900 px-4 py-3 text-white outline-none transition focus:border-cyan-400/50"
                  placeholder="Your name"
                />
              </div>

              <div>
                <label htmlFor="email" className="mb-2 block text-sm font-medium text-slate-200">
                  Email Address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full rounded-2xl border border-white/10 bg-slate-900 px-4 py-3 text-white outline-none transition focus:border-cyan-400/50"
                  placeholder="you@example.com"
                />
              </div>

              <div>
                <label htmlFor="interest" className="mb-2 block text-sm font-medium text-slate-200">
                  Interest
                </label>
                <select
                  id="interest"
                  name="interest"
                  value={formData.interest}
                  onChange={handleChange}
                  className="w-full rounded-2xl border border-white/10 bg-slate-900 px-4 py-3 text-white outline-none transition focus:border-cyan-400/50"
                >
                  <option>General Inquiry</option>
                  <option>Charging Host Opportunity</option>
                  <option>Partnership Discussion</option>
                  <option>Investor / Business Inquiry</option>
                </select>
              </div>

              <div>
                <label htmlFor="message" className="mb-2 block text-sm font-medium text-slate-200">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={6}
                  value={formData.message}
                  onChange={handleChange}
                  required
                  className="w-full rounded-2xl border border-white/10 bg-slate-900 px-4 py-3 text-white outline-none transition focus:border-cyan-400/50"
                  placeholder="Tell us a little about your interest..."
                />
              </div>

              {status === "success" && (
                <div className="rounded-2xl border border-emerald-400/30 bg-emerald-400/10 px-4 py-3 text-sm text-emerald-200">
                  Thank you. Your inquiry was sent successfully.
                </div>
              )}

              {status === "error" && (
                <div className="rounded-2xl border border-red-400/30 bg-red-400/10 px-4 py-3 text-sm text-red-200">
                  {errorMessage}
                </div>
              )}

              <button
                type="submit"
                disabled={status === "loading"}
                className="w-full rounded-2xl bg-cyan-300 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:scale-[1.01] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {status === "loading" ? "Sending..." : "Send Inquiry"}
              </button>

              <p className="text-xs leading-6 text-slate-400">
                Protected by a hidden anti-spam field. For stronger protection, enable
                Formspree reCAPTCHA in your Formspree dashboard.
              </p>
            </form>
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