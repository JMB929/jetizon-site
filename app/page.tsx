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
          _subject: "New Jetizon inquiry",
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
        setStatus("error");
        setErrorMessage("Something went wrong. Please try again.");
      }
    } catch {
      setStatus("error");
      setErrorMessage("Network error. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white">

      {/* HERO */}
      <section className="mx-auto max-w-7xl px-6 py-20">
        <div className="grid gap-10 lg:grid-cols-2 items-center">

          <div>
            {/* LOGO + NAME */}
            <div className="mb-6 flex items-center gap-4">
              <img
                src="/jetizon-logo.png"
                alt="Jetizon logo"
                className="h-20 w-20 rounded-2xl object-contain shadow-2xl"
              />
              <div className="text-cyan-300 text-sm">
                Jetizon Motorbike Intech LLC
              </div>
            </div>

            <h1 className="text-4xl md:text-6xl font-semibold">
              Powering the next wave of electric mobility.
            </h1>

            <p className="mt-6 text-lg text-slate-300">
              Jetizon is building a connected ecosystem of electric vehicles,
              charging stations, and smart battery intelligence for the future.
            </p>

            <div className="mt-8 flex gap-4">
              <a href="#contact" className="bg-cyan-300 text-slate-900 px-6 py-3 rounded-xl font-semibold">
                Contact Us
              </a>
              <a href="#contact" className="border border-white/20 px-6 py-3 rounded-xl">
                Partnerships
              </a>
            </div>
          </div>

          <div className="hidden lg:block">
            <img
              src="/jetizon-logo.png"
              alt="Jetizon logo large"
              className="w-full max-w-md mx-auto opacity-90"
            />
          </div>

        </div>
      </section>

      {/* CONTACT FORM */}
      <section id="contact" className="mx-auto max-w-7xl px-6 py-20">
        <div className="grid gap-10 lg:grid-cols-2">

          <div>
            <h2 className="text-3xl font-semibold">
              Contact Jetizon
            </h2>
            <p className="mt-4 text-slate-300">
              Interested in EV charging stations, partnerships, or collaboration?
              Send us a message.
            </p>

            <div className="mt-6 text-slate-300">
              <p><strong>Email:</strong> jmbintech@gmail.com</p>
              <p><strong>Phone:</strong> (646) 991-1287</p>
              <p><strong>Location:</strong> Ridgewood, NY</p>
            </div>
          </div>

          <div className="bg-white/5 p-8 rounded-2xl border border-white/10">
            <form onSubmit={handleSubmit} className="space-y-5">

              {/* Honeypot */}
              <input
                type="text"
                name="company"
                value={formData.company}
                onChange={handleChange}
                className="hidden"
              />

              <input
                name="name"
                placeholder="Full Name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full p-3 rounded-xl bg-slate-900"
              />

              <input
                name="email"
                type="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full p-3 rounded-xl bg-slate-900"
              />

              <select
                name="interest"
                value={formData.interest}
                onChange={handleChange}
                className="w-full p-3 rounded-xl bg-slate-900"
              >
                <option>General Inquiry</option>
                <option>Charging Host Opportunity</option>
                <option>Partnership</option>
                <option>Investor</option>
              </select>

              <textarea
                name="message"
                placeholder="Your message..."
                value={formData.message}
                onChange={handleChange}
                required
                className="w-full p-3 rounded-xl bg-slate-900"
              />

              {status === "success" && (
                <p className="text-green-400">
                  Message sent successfully!
                </p>
              )}

              {status === "error" && (
                <p className="text-red-400">
                  {errorMessage}
                </p>
              )}

              <button
                type="submit"
                disabled={status === "loading"}
                className="w-full bg-cyan-300 text-black py-3 rounded-xl font-semibold"
              >
                {status === "loading" ? "Sending..." : "Send Message"}
              </button>

            </form>
          </div>

        </div>
      </section>

    </div>
  );
}