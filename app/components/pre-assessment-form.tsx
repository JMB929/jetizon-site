"use client";

import { ValidationError, useForm } from "@formspree/react";
import { useEffect, useState } from "react";

type PreAssessmentFormProps = {
  layout?: "compact" | "full";
};

export default function PreAssessmentForm({
  layout = "compact",
}: PreAssessmentFormProps) {
  const [state, handleSubmit] = useForm("meevjrzz");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    organization: "",
    interest: "Pre-Assessment Request",
    contactRole: "Property Owner",
    propertyType: "Multifamily",
    siteAddress: "",
    siteControl: "Owner / Authorized Representative",
    parkingSpaces: "",
    chargingGoal: "Level 2 Charging",
    message: "",
    company: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    if (!state.succeeded) return;

    const timer = window.setTimeout(() => {
      window.location.href = "/thank-you";
    }, 1200);

    return () => window.clearTimeout(timer);
  }, [state.succeeded]);

  const shellClassName =
    layout === "full"
      ? "rounded-[2rem] border border-white/10 bg-white/5 p-8 shadow-2xl backdrop-blur md:p-10"
      : "rounded-[2rem] border border-white/10 bg-white/5 p-8 shadow-2xl backdrop-blur";

  return (
    <div className={shellClassName}>
      <form onSubmit={handleSubmit} encType="multipart/form-data" className="space-y-5">
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
        <input
          type="hidden"
          name="_subject"
          value="New Jetizon pre-assessment request"
        />

        <div className="grid gap-5 md:grid-cols-2">
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
            <ValidationError
              prefix="Full Name"
              field="name"
              errors={state.errors}
              className="mt-2 text-sm text-red-200"
            />
          </div>

          <div>
            <label htmlFor="phone" className="mb-2 block text-sm font-medium text-slate-200">
              Phone Number
            </label>
            <input
              id="phone"
              name="phone"
              type="tel"
              value={formData.phone}
              onChange={handleChange}
              className="w-full rounded-2xl border border-white/10 bg-slate-900 px-4 py-3 text-white outline-none transition focus:border-cyan-400/50"
              placeholder="(646) 555-1234"
            />
          </div>
        </div>

        <div className="grid gap-5 md:grid-cols-2">
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
            <ValidationError
              prefix="Email"
              field="email"
              errors={state.errors}
              className="mt-2 text-sm text-red-200"
            />
          </div>

          <div>
            <label
              htmlFor="organization"
              className="mb-2 block text-sm font-medium text-slate-200"
            >
              Business or Property Name
            </label>
            <input
              id="organization"
              name="organization"
              type="text"
              value={formData.organization}
              onChange={handleChange}
              className="w-full rounded-2xl border border-white/10 bg-slate-900 px-4 py-3 text-white outline-none transition focus:border-cyan-400/50"
              placeholder="Property, business, or portfolio name"
            />
          </div>
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          <div>
            <label htmlFor="interest" className="mb-2 block text-sm font-medium text-slate-200">
              Request Type
            </label>
            <select
              id="interest"
              name="interest"
              value={formData.interest}
              onChange={handleChange}
              className="w-full rounded-2xl border border-white/10 bg-slate-900 px-4 py-3 text-white outline-none transition focus:border-cyan-400/50"
            >
              <option>Pre-Assessment Request</option>
              <option>Charging Host Opportunity</option>
              <option>Micromobility Charging Review</option>
              <option>Partnership Discussion</option>
              <option>General Inquiry</option>
            </select>
            <ValidationError
              prefix="Request Type"
              field="interest"
              errors={state.errors}
              className="mt-2 text-sm text-red-200"
            />
          </div>

          <div>
            <label
              htmlFor="contactRole"
              className="mb-2 block text-sm font-medium text-slate-200"
            >
              Your Role
            </label>
            <select
              id="contactRole"
              name="contactRole"
              value={formData.contactRole}
              onChange={handleChange}
              className="w-full rounded-2xl border border-white/10 bg-slate-900 px-4 py-3 text-white outline-none transition focus:border-cyan-400/50"
            >
              <option>Property Owner</option>
              <option>Property Manager</option>
              <option>Business Owner</option>
              <option>Tenant / Operator</option>
              <option>Consultant / Contractor</option>
              <option>Other</option>
            </select>
          </div>
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          <div>
            <label
              htmlFor="propertyType"
              className="mb-2 block text-sm font-medium text-slate-200"
            >
              Property Type
            </label>
            <select
              id="propertyType"
              name="propertyType"
              value={formData.propertyType}
              onChange={handleChange}
              className="w-full rounded-2xl border border-white/10 bg-slate-900 px-4 py-3 text-white outline-none transition focus:border-cyan-400/50"
            >
              <option>Multifamily</option>
              <option>Retail / Mixed Use</option>
              <option>Hotel</option>
              <option>Parking Garage / Lot</option>
              <option>Office / Workplace</option>
              <option>Industrial / Commercial</option>
              <option>Other</option>
            </select>
          </div>

          <div>
            <label
              htmlFor="chargingGoal"
              className="mb-2 block text-sm font-medium text-slate-200"
            >
              Charging Goal
            </label>
            <select
              id="chargingGoal"
              name="chargingGoal"
              value={formData.chargingGoal}
              onChange={handleChange}
              className="w-full rounded-2xl border border-white/10 bg-slate-900 px-4 py-3 text-white outline-none transition focus:border-cyan-400/50"
            >
              <option>Level 2 Charging</option>
              <option>Micromobility Charging</option>
              <option>Both</option>
              <option>Not Sure Yet</option>
            </select>
          </div>
        </div>

        <div>
          <label
            htmlFor="siteAddress"
            className="mb-2 block text-sm font-medium text-slate-200"
          >
            Site Address
          </label>
          <input
            id="siteAddress"
            name="siteAddress"
            type="text"
            value={formData.siteAddress}
            onChange={handleChange}
            className="w-full rounded-2xl border border-white/10 bg-slate-900 px-4 py-3 text-white outline-none transition focus:border-cyan-400/50"
            placeholder="Street address of the site to be reviewed"
          />
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          <div>
            <label
              htmlFor="siteControl"
              className="mb-2 block text-sm font-medium text-slate-200"
            >
              Site Control
            </label>
            <select
              id="siteControl"
              name="siteControl"
              value={formData.siteControl}
              onChange={handleChange}
              className="w-full rounded-2xl border border-white/10 bg-slate-900 px-4 py-3 text-white outline-none transition focus:border-cyan-400/50"
            >
              <option>Owner / Authorized Representative</option>
              <option>Property Manager</option>
              <option>Tenant / Operator</option>
              <option>Exploring Permission</option>
              <option>Not Sure</option>
            </select>
          </div>

          <div>
            <label
              htmlFor="parkingSpaces"
              className="mb-2 block text-sm font-medium text-slate-200"
            >
              Approximate Parking Spaces
            </label>
            <input
              id="parkingSpaces"
              name="parkingSpaces"
              type="text"
              value={formData.parkingSpaces}
              onChange={handleChange}
              className="w-full rounded-2xl border border-white/10 bg-slate-900 px-4 py-3 text-white outline-none transition focus:border-cyan-400/50"
              placeholder="Example: 12 or street frontage only"
            />
          </div>
        </div>

        <div>
          <label htmlFor="message" className="mb-2 block text-sm font-medium text-slate-200">
            Site Details
          </label>
          <textarea
            id="message"
            name="message"
            rows={6}
            value={formData.message}
            onChange={handleChange}
            required
            className="w-full rounded-2xl border border-white/10 bg-slate-900 px-4 py-3 text-white outline-none transition focus:border-cyan-400/50"
            placeholder="Describe the site, the type of charging you are considering, what electrical access you know about, and any timing or rebate goals."
          />
          <ValidationError
            prefix="Site Details"
            field="message"
            errors={state.errors}
            className="mt-2 text-sm text-red-200"
          />
        </div>

        <div>
          <label
            htmlFor="attachments"
            className="mb-2 block text-sm font-medium text-slate-200"
          >
            Photos or Supporting Files
          </label>
          <input
            id="attachments"
            name="attachments"
            type="file"
            multiple
            accept=".pdf,.doc,.docx,.jpg,.jpeg,.png,.heic,.webp"
            className="block w-full rounded-2xl border border-dashed border-white/15 bg-slate-900 px-4 py-4 text-sm text-slate-300 file:mr-4 file:rounded-xl file:border-0 file:bg-cyan-300 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-slate-950"
          />
          <p className="mt-2 text-xs leading-6 text-slate-400">
            Upload site photos, utility documents, sketches, or parking layout references
            for a preliminary review. Actual attachment limits depend on your Formspree
            configuration.
          </p>
        </div>

        {state.succeeded && (
          <div className="rounded-2xl border border-emerald-400/30 bg-emerald-400/10 px-4 py-3 text-sm text-emerald-200">
            Thank you. Your pre-assessment request was sent successfully.
          </div>
        )}

        {state.errors && state.errors.length > 0 && !state.succeeded && (
          <div className="rounded-2xl border border-red-400/30 bg-red-400/10 px-4 py-3 text-sm text-red-200">
            <ValidationError errors={state.errors} className="text-red-200" />
          </div>
        )}

        <button
          type="submit"
          disabled={state.submitting}
          className="w-full rounded-2xl bg-cyan-300 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:scale-[1.01] disabled:cursor-not-allowed disabled:opacity-60"
        >
          {state.submitting ? "Sending..." : "Request Site Review"}
        </button>

        <p className="text-xs leading-6 text-slate-400">
          Protected by a hidden anti-spam field. For stronger protection, enable
          Formspree reCAPTCHA in your Formspree dashboard.
        </p>
      </form>
    </div>
  );
}
