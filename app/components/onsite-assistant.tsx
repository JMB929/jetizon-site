"use client";

import { useState } from "react";

type TrafficLight = "Green" | "Yellow" | "Red";

function scoreClass(score: TrafficLight) {
  if (score === "Green") {
    return "border-emerald-400/30 bg-emerald-400/10 text-emerald-200";
  }

  if (score === "Yellow") {
    return "border-amber-400/30 bg-amber-400/10 text-amber-100";
  }

  return "border-rose-400/30 bg-rose-400/10 text-rose-200";
}

function badgeClass(score: TrafficLight) {
  if (score === "Green") {
    return "bg-emerald-300 text-slate-950";
  }

  if (score === "Yellow") {
    return "bg-amber-300 text-slate-950";
  }

  return "bg-rose-300 text-slate-950";
}

export default function OnsiteAssistant() {
  const [siteName, setSiteName] = useState("");
  const [siteAddress, setSiteAddress] = useState("");
  const [hostType, setHostType] = useState("multifamily");
  const [projectType, setProjectType] = useState("secure-bike-parking");
  const [locationType, setLocationType] = useState("private");
  const [hostCommitment, setHostCommitment] = useState("strong");
  const [productReadiness, setProductReadiness] = useState("known");
  const [complexity, setComplexity] = useState("low");
  const [existingParking, setExistingParking] = useState("yes");
  const [onsiteNotes, setOnsiteNotes] = useState("");

  const isCabinetProject =
    projectType === "battery-cabinet" || projectType === "charging-rack";
  const isSimpleParking =
    projectType === "secure-bike-parking" ||
    projectType === "secure-escooter-parking";

  let projectScore: TrafficLight = "Green";
  if (isCabinetProject) {
    projectScore = "Red";
  } else if (!isSimpleParking) {
    projectScore = "Yellow";
  }

  let siteControlScore: TrafficLight = "Green";
  if (hostCommitment === "unclear") {
    siteControlScore = "Yellow";
  }
  if (hostCommitment === "weak") {
    siteControlScore = "Red";
  }

  let locationScore: TrafficLight = "Green";
  if (locationType === "private-with-layout-questions") {
    locationScore = "Yellow";
  }
  if (locationType === "public-space") {
    locationScore = "Red";
  }

  let approvalScore: TrafficLight = "Green";
  if (complexity === "moderate") {
    approvalScore = "Yellow";
  }
  if (complexity === "high" || isCabinetProject || locationType === "public-space") {
    approvalScore = "Red";
  }

  let productScore: TrafficLight = "Green";
  if (productReadiness === "unclear") {
    productScore = "Yellow";
  }
  if (productReadiness === "unapproved") {
    productScore = "Red";
  }

  let parkingSignalScore: TrafficLight = "Green";
  if (existingParking === "unknown") {
    parkingSignalScore = "Yellow";
  }
  if (existingParking === "no") {
    parkingSignalScore = "Yellow";
  }

  const scores = [
    projectScore,
    siteControlScore,
    locationScore,
    approvalScore,
    productScore,
    parkingSignalScore,
  ];

  const redCount = scores.filter((score) => score === "Red").length;
  const yellowCount = scores.filter((score) => score === "Yellow").length;

  let overall: TrafficLight = "Green";
  let recommendation =
    "Good early-stage candidate. Keep moving with site photos, host follow-up, and vendor screening.";
  let bestFitUseCase = "Secure parking or low-complexity amenity deployment";

  if (redCount > 0) {
    overall = "Red";
    recommendation =
      "Too approval-heavy or under-qualified for an early Jetizon deployment. Do not overdevelop until the biggest blockers are removed.";
  } else if (yellowCount >= 2) {
    overall = "Yellow";
    recommendation =
      "Possible candidate, but gather more information before bringing in a vendor or contractor.";
  }

  if (projectType === "simple-charging") {
    bestFitUseCase = "Low-complexity charging access with contractor review";
  }

  if (isCabinetProject) {
    bestFitUseCase = "FDNY-sensitive battery cabinet or rack deployment";
  }

  const agencies = {
    dob: "Likely yes",
    fdny:
      isCabinetProject || complexity === "high"
        ? "Likely yes"
        : projectType === "simple-charging"
          ? "Maybe"
          : "Usually no",
    dot: locationType === "public-space" ? "Likely yes" : "Usually no",
  };

  const nextSteps: string[] = [];
  if (overall === "Green") {
    nextSteps.push("Collect complete site-photo set.");
    nextSteps.push("Confirm host authority and point of contact.");
    nextSteps.push("Match the site to the best vendor path.");
  }
  if (overall === "Yellow") {
    nextSteps.push("Request more site details before pitching a solution.");
    nextSteps.push("Clarify electrical and layout conditions.");
    nextSteps.push("Validate whether the host is serious enough to proceed.");
  }
  if (overall === "Red") {
    nextSteps.push("Pause active development until the approval path is clearer.");
    nextSteps.push("Do not position this as a simple early deployment.");
    nextSteps.push("Escalate to contractor, engineer, or vendor only if the host remains committed.");
  }

  const photoChecklist = [
    "Site frontage",
    "Proposed install zone",
    "Existing bike or e-scooter parking",
    "Panel or electrical room if accessible",
    "Sidewalk, curb, or access conditions",
  ];

  const usageSteps = [
    "Walk the site first and take photos before filling anything in.",
    "Choose the closest host type, project type, and location type.",
    "Be honest about host commitment, product readiness, and complexity.",
    "Use notes for what you actually observed onsite, not assumptions.",
    "Read the Green / Yellow / Red result before bringing in a vendor or contractor.",
  ];

  return (
    <div className="grid gap-8 lg:grid-cols-[1.05fr,0.95fr]">
      <div className="rounded-[2rem] border border-white/10 bg-white/5 p-6 shadow-2xl backdrop-blur">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-lime-400">
              Field Intake
            </p>
            <h2 className="mt-3 text-2xl font-semibold md:text-3xl">
              Onsite screening inputs
            </h2>
          </div>
          <div
            className={`rounded-full px-4 py-2 text-sm font-semibold ${badgeClass(overall)}`}
          >
            {overall}
          </div>
        </div>

        <div className="mt-8 grid gap-5 md:grid-cols-2">
          <label className="text-sm text-slate-300">
            <span className="mb-2 block font-medium text-white">Site name</span>
            <input
              value={siteName}
              onChange={(event) => setSiteName(event.target.value)}
              className="w-full rounded-2xl border border-white/10 bg-slate-950/60 px-4 py-3 text-white outline-none transition focus:border-lime-400"
              placeholder="Hostos Community College"
            />
          </label>

          <label className="text-sm text-slate-300">
            <span className="mb-2 block font-medium text-white">Site address</span>
            <input
              value={siteAddress}
              onChange={(event) => setSiteAddress(event.target.value)}
              className="w-full rounded-2xl border border-white/10 bg-slate-950/60 px-4 py-3 text-white outline-none transition focus:border-lime-400"
              placeholder="Bronx, NY"
            />
          </label>

          <label className="text-sm text-slate-300">
            <span className="mb-2 block font-medium text-white">Host type</span>
            <select
              value={hostType}
              onChange={(event) => setHostType(event.target.value)}
              className="w-full rounded-2xl border border-white/10 bg-slate-950/60 px-4 py-3 text-white outline-none transition focus:border-lime-400"
            >
              <option value="multifamily">Multifamily</option>
              <option value="mixed-use">Mixed-use</option>
              <option value="university">University / campus</option>
              <option value="hospitality">Hospitality</option>
              <option value="community">Community facility</option>
              <option value="retail">Retail / commercial</option>
            </select>
          </label>

          <label className="text-sm text-slate-300">
            <span className="mb-2 block font-medium text-white">Project type</span>
            <select
              value={projectType}
              onChange={(event) => setProjectType(event.target.value)}
              className="w-full rounded-2xl border border-white/10 bg-slate-950/60 px-4 py-3 text-white outline-none transition focus:border-lime-400"
            >
              <option value="secure-bike-parking">Secure bike parking</option>
              <option value="secure-escooter-parking">Secure e-scooter parking</option>
              <option value="simple-charging">Simple charging access</option>
              <option value="battery-cabinet">Battery charging cabinet</option>
              <option value="charging-rack">Charging rack / enclosure</option>
            </select>
          </label>

          <label className="text-sm text-slate-300">
            <span className="mb-2 block font-medium text-white">Location type</span>
            <select
              value={locationType}
              onChange={(event) => setLocationType(event.target.value)}
              className="w-full rounded-2xl border border-white/10 bg-slate-950/60 px-4 py-3 text-white outline-none transition focus:border-lime-400"
            >
              <option value="private">Private property</option>
              <option value="private-with-layout-questions">
                Private property with layout questions
              </option>
              <option value="public-space">Touches sidewalk, curb, or street space</option>
            </select>
          </label>

          <label className="text-sm text-slate-300">
            <span className="mb-2 block font-medium text-white">Host commitment</span>
            <select
              value={hostCommitment}
              onChange={(event) => setHostCommitment(event.target.value)}
              className="w-full rounded-2xl border border-white/10 bg-slate-950/60 px-4 py-3 text-white outline-none transition focus:border-lime-400"
            >
              <option value="strong">Strong</option>
              <option value="unclear">Unclear</option>
              <option value="weak">Weak</option>
            </select>
          </label>

          <label className="text-sm text-slate-300">
            <span className="mb-2 block font-medium text-white">Product readiness</span>
            <select
              value={productReadiness}
              onChange={(event) => setProductReadiness(event.target.value)}
              className="w-full rounded-2xl border border-white/10 bg-slate-950/60 px-4 py-3 text-white outline-none transition focus:border-lime-400"
            >
              <option value="known">Known / established</option>
              <option value="unclear">Unclear</option>
              <option value="unapproved">Approval path unknown</option>
            </select>
          </label>

          <label className="text-sm text-slate-300">
            <span className="mb-2 block font-medium text-white">Complexity read</span>
            <select
              value={complexity}
              onChange={(event) => setComplexity(event.target.value)}
              className="w-full rounded-2xl border border-white/10 bg-slate-950/60 px-4 py-3 text-white outline-none transition focus:border-lime-400"
            >
              <option value="low">Low</option>
              <option value="moderate">Moderate</option>
              <option value="high">High</option>
            </select>
          </label>

          <label className="text-sm text-slate-300 md:col-span-2">
            <span className="mb-2 block font-medium text-white">
              Existing parking visible
            </span>
            <select
              value={existingParking}
              onChange={(event) => setExistingParking(event.target.value)}
              className="w-full rounded-2xl border border-white/10 bg-slate-950/60 px-4 py-3 text-white outline-none transition focus:border-lime-400"
            >
              <option value="yes">Yes</option>
              <option value="no">No</option>
              <option value="unknown">Unknown</option>
            </select>
          </label>

          <label className="text-sm text-slate-300 md:col-span-2">
            <span className="mb-2 block font-medium text-white">Onsite notes</span>
            <textarea
              value={onsiteNotes}
              onChange={(event) => setOnsiteNotes(event.target.value)}
              rows={5}
              className="w-full rounded-2xl border border-white/10 bg-slate-950/60 px-4 py-3 text-white outline-none transition focus:border-lime-400"
              placeholder="Visible bike theft problem, tight sidewalk clearance, host mentioned security concerns..."
            />
          </label>
        </div>
      </div>

      <div className="space-y-6">
        <div className="rounded-[2rem] border border-lime-400/20 bg-lime-400/5 p-6 shadow-2xl backdrop-blur">
          <p className="text-sm uppercase tracking-[0.3em] text-lime-400">
            How to use this tool
          </p>
          <ol className="mt-4 space-y-3 text-sm leading-7 text-slate-300">
            {usageSteps.map((step, index) => (
              <li key={step}>
                <span className="font-semibold text-white">{index + 1}.</span>{" "}
                {step}
              </li>
            ))}
          </ol>
        </div>

        <div className="rounded-[2rem] border border-white/10 bg-white/5 p-6 shadow-2xl backdrop-blur">
          <p className="text-sm uppercase tracking-[0.3em] text-lime-400">
            Recommendation
          </p>
          <h2 className="mt-3 text-2xl font-semibold">{bestFitUseCase}</h2>
          <p className="mt-4 text-sm leading-7 text-slate-300">{recommendation}</p>
          <div className="mt-6 rounded-2xl border border-white/10 bg-slate-950/40 p-4">
            <p className="text-sm font-semibold text-white">Likely agency path</p>
            <ul className="mt-3 space-y-2 text-sm text-slate-300">
              <li>
                <span className="font-medium text-white">DOB:</span> {agencies.dob}
              </li>
              <li>
                <span className="font-medium text-white">FDNY:</span> {agencies.fdny}
              </li>
              <li>
                <span className="font-medium text-white">DOT:</span> {agencies.dot}
              </li>
            </ul>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {[
            ["Project type", projectScore],
            ["Site control", siteControlScore],
            ["Location type", locationScore],
            ["Approval complexity", approvalScore],
            ["Product readiness", productScore],
            ["Parking signal", parkingSignalScore],
          ].map(([label, score]) => (
            <div
              key={label}
              className={`rounded-[1.5rem] border p-4 ${scoreClass(score as TrafficLight)}`}
            >
              <div className="text-xs uppercase tracking-[0.25em]">{label}</div>
              <div className="mt-2 text-lg font-semibold">{score}</div>
            </div>
          ))}
        </div>

        <div className="rounded-[2rem] border border-white/10 bg-white/5 p-6 shadow-2xl backdrop-blur">
          <p className="text-sm uppercase tracking-[0.3em] text-lime-400">
            Photo checklist
          </p>
          <ul className="mt-4 space-y-3 text-sm leading-7 text-slate-300">
            {photoChecklist.map((item) => (
              <li key={item}>- {item}</li>
            ))}
          </ul>
        </div>

        <div className="rounded-[2rem] border border-white/10 bg-white/5 p-6 shadow-2xl backdrop-blur">
          <p className="text-sm uppercase tracking-[0.3em] text-lime-400">
            Next steps
          </p>
          <ul className="mt-4 space-y-3 text-sm leading-7 text-slate-300">
            {nextSteps.map((step) => (
              <li key={step}>- {step}</li>
            ))}
          </ul>
          {(siteName || siteAddress || onsiteNotes) && (
            <div className="mt-6 rounded-2xl border border-white/10 bg-slate-950/40 p-4 text-sm text-slate-300">
              <p className="font-semibold text-white">Current site snapshot</p>
              <p className="mt-2">
                <span className="font-medium text-white">Site:</span>{" "}
                {siteName || "Not entered"}
              </p>
              <p className="mt-1">
                <span className="font-medium text-white">Address:</span>{" "}
                {siteAddress || "Not entered"}
              </p>
              {onsiteNotes && (
                <p className="mt-2">
                  <span className="font-medium text-white">Notes:</span> {onsiteNotes}
                </p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
