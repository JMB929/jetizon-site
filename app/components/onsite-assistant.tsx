"use client";

import { useEffect, useState } from "react";

type TrafficLight = "Green" | "Yellow" | "Red";
type PhotoFieldKey =
  | "frontage"
  | "installZone"
  | "existingParking"
  | "electricalAccess"
  | "circulation";

type PhotoAnalysisResult = {
  site_context: string;
  visual_score: TrafficLight;
  visible_positives: string[];
  visible_concerns: string[];
  suggested_use_case: string;
  likely_complexity: string;
  agency_warning: string;
  next_step: string;
  confidence_note: string;
};

type SelectedPhoto = {
  label: string;
  file: File;
};

type TernaryChoice = "yes" | "no" | "unclear";
type ThirtyCEligibility = "not-started" | "eligible" | "ineligible" | "unclear";
type FitResult =
  | "not-started"
  | "likely-fits"
  | "may-fit"
  | "unlikely-fit"
  | "needs-measurement";
type WorkflowStage =
  | "lead"
  | "pre-assessment-started"
  | "waiting-on-owner"
  | "waiting-on-photos-docs"
  | "pre-assessment-complete"
  | "partner-review"
  | "fdny-review-needed"
  | "dob-review-needed"
  | "ready-to-submit"
  | "submitted"
  | "waiting-on-agency"
  | "approved"
  | "stopped-archived";
type AgencyStatus =
  | "not-needed"
  | "not-started"
  | "in-progress"
  | "submitted"
  | "waiting-on-confirmation"
  | "confirmed";

type WorkflowChecklist = {
  ownerDecisionMakerConfirmed: boolean;
  photosAndDocsReceived: boolean;
  proposalAccepted: boolean;
  vendorOrPartnerSelected: boolean;
  requiredDocsReady: boolean;
};

type WorkflowTracking = {
  stage: WorkflowStage;
  checklist: WorkflowChecklist;
  fdnyStatus: AgencyStatus;
  dobStatus: AgencyStatus;
  dotStatus: AgencyStatus;
  nextFollowUpDate: string;
  notes: string;
};

type SavedAssessmentFormState = {
  hostType: string;
  projectType: string;
  locationType: string;
  hostCommitment: string;
  productReadiness: string;
  complexity: string;
  existingParking: string;
  onsiteNotes: string;
  mapSource: string;
  parkingLotVisible: TernaryChoice;
  installZoneVisible: TernaryChoice;
  publicSpaceExposure: TernaryChoice;
  drivewayAccessVisible: TernaryChoice;
  layoutRead: string;
  likelyInstallZone: string;
  aerialNotes: string;
  thirtyCEligibility: ThirtyCEligibility;
  thirtyCNotes: string;
  stationModel: string;
  knownMeasurement: string;
  fitResult: FitResult;
  fitNotes: string;
  schematicFileName: string;
};

type SavedAssessment = {
  id: string;
  savedAt: string;
  siteName: string;
  siteAddress: string;
  overall: TrafficLight;
  visualScore: TrafficLight | null;
  bestFitUseCase: string;
  recommendation: string;
  agencies: {
    dob: string;
    fdny: string;
    dot: string;
  };
  aerialReview: {
    status: "Not started" | "Partial" | "Completed";
    mapSource: string;
    siteContext: string;
    score: TrafficLight | null;
    likelyInstallZone: string;
    summary: string;
  };
  thirtyCReview: {
    status: ThirtyCEligibility;
    summary: string;
    notes: string;
  };
  fitReview: {
    stationModel: string;
    schematicFileName: string;
    knownMeasurement: string;
    result: FitResult;
    summary: string;
    notes: string;
  };
  onsiteNotes: string;
  analysis: PhotoAnalysisResult | null;
  workflow: WorkflowTracking;
  formState: SavedAssessmentFormState;
};

const STORAGE_KEY = "jetizon-onsite-assessments";

const HOST_TYPE_LABELS: Record<string, string> = {
  multifamily: "Multifamily",
  "mixed-use": "Mixed-use",
  university: "University / campus",
  hospitality: "Hospitality",
  community: "Community facility",
  retail: "Retail / commercial",
};

const PROJECT_TYPE_LABELS: Record<string, string> = {
  "secure-bike-parking": "Secure bike parking",
  "secure-escooter-parking": "Secure e-scooter parking",
  "simple-charging": "Simple charging access",
  "ev-car-charging-port": "EV charging port / car charging station",
  "battery-cabinet": "Battery charging cabinet",
  "charging-rack": "Charging rack / enclosure",
};

const LOCATION_TYPE_LABELS: Record<string, string> = {
  private: "Private property",
  "private-with-layout-questions": "Private property with layout questions",
  "public-space": "Touches sidewalk, curb, or street space",
};

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

function severityRank(score: TrafficLight) {
  if (score === "Red") return 3;
  if (score === "Yellow") return 2;
  return 1;
}

function strongestScore(a: TrafficLight, b: TrafficLight): TrafficLight {
  return severityRank(a) >= severityRank(b) ? a : b;
}

function ternaryLabel(value: TernaryChoice) {
  if (value === "yes") return "Yes";
  if (value === "no") return "No";
  return "Unclear";
}

function workflowStageLabel(value: WorkflowStage) {
  return {
    lead: "Lead",
    "pre-assessment-started": "Pre-assessment started",
    "waiting-on-owner": "Waiting on owner info",
    "waiting-on-photos-docs": "Waiting on photos/docs",
    "pre-assessment-complete": "Pre-assessment complete",
    "partner-review": "Partner review",
    "fdny-review-needed": "FDNY review needed",
    "dob-review-needed": "DOB review needed",
    "ready-to-submit": "Ready to submit",
    submitted: "Submitted",
    "waiting-on-agency": "Waiting on agency confirmation",
    approved: "Approved",
    "stopped-archived": "Stopped / archived",
  }[value];
}

function agencyStatusLabel(value: AgencyStatus) {
  return {
    "not-needed": "Not needed",
    "not-started": "Not started",
    "in-progress": "In progress",
    submitted: "Submitted",
    "waiting-on-confirmation": "Waiting on confirmation",
    confirmed: "Confirmed",
  }[value];
}

function downloadTextFile(fileName: string, content: string) {
  const blob = new Blob([content], { type: "text/plain" });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = fileName;
  anchor.click();
  URL.revokeObjectURL(url);
}

async function fileToDataUrl(file: File) {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === "string") {
        resolve(reader.result);
        return;
      }

      reject(new Error("Could not read image file."));
    };
    reader.onerror = () => reject(new Error("Could not read image file."));
    reader.readAsDataURL(file);
  });
}

export default function OnsiteAssistant() {
  const [currentProjectId, setCurrentProjectId] = useState<string | null>(null);
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
  const [mapSource, setMapSource] = useState("google-satellite");
  const [parkingLotVisible, setParkingLotVisible] = useState<TernaryChoice>("unclear");
  const [installZoneVisible, setInstallZoneVisible] = useState<TernaryChoice>("unclear");
  const [publicSpaceExposure, setPublicSpaceExposure] = useState<TernaryChoice>("unclear");
  const [drivewayAccessVisible, setDrivewayAccessVisible] = useState<TernaryChoice>("unclear");
  const [layoutRead, setLayoutRead] = useState("unclear");
  const [likelyInstallZone, setLikelyInstallZone] = useState("");
  const [aerialNotes, setAerialNotes] = useState("");
  const [thirtyCEligibility, setThirtyCEligibility] =
    useState<ThirtyCEligibility>("not-started");
  const [thirtyCNotes, setThirtyCNotes] = useState("");
  const [stationModel, setStationModel] = useState("");
  const [knownMeasurement, setKnownMeasurement] = useState("");
  const [fitResult, setFitResult] = useState<FitResult>("not-started");
  const [fitNotes, setFitNotes] = useState("");
  const [schematicFileName, setSchematicFileName] = useState("");
  const [workflowStage, setWorkflowStage] = useState<WorkflowStage>("lead");
  const [ownerDecisionMakerConfirmed, setOwnerDecisionMakerConfirmed] = useState(false);
  const [photosAndDocsReceived, setPhotosAndDocsReceived] = useState(false);
  const [proposalAccepted, setProposalAccepted] = useState(false);
  const [vendorOrPartnerSelected, setVendorOrPartnerSelected] = useState(false);
  const [requiredDocsReady, setRequiredDocsReady] = useState(false);
  const [fdnyStatus, setFdnyStatus] = useState<AgencyStatus>("not-needed");
  const [dobStatus, setDobStatus] = useState<AgencyStatus>("not-started");
  const [dotStatus, setDotStatus] = useState<AgencyStatus>("not-needed");
  const [nextFollowUpDate, setNextFollowUpDate] = useState("");
  const [workflowNotes, setWorkflowNotes] = useState("");
  const [selectedPhotos, setSelectedPhotos] = useState<
    Partial<Record<PhotoFieldKey, SelectedPhoto>>
  >({});
  const [analysis, setAnalysis] = useState<PhotoAnalysisResult | null>(null);
  const [analysisError, setAnalysisError] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [savedAssessments, setSavedAssessments] = useState<SavedAssessment[]>([]);
  const [saveMessage, setSaveMessage] = useState("");

  const isCabinetProject =
    projectType === "battery-cabinet" || projectType === "charging-rack";
  const isChargingPortProject = projectType === "ev-car-charging-port";
  const isSimpleParking =
    projectType === "secure-bike-parking" ||
    projectType === "secure-escooter-parking";

  let projectScore: TrafficLight = "Green";
  if (isCabinetProject) {
    projectScore = "Red";
  } else if (isChargingPortProject) {
    projectScore = "Yellow";
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

  const aerialInputsStarted =
    parkingLotVisible !== "unclear" ||
    installZoneVisible !== "unclear" ||
    publicSpaceExposure !== "unclear" ||
    drivewayAccessVisible !== "unclear" ||
    layoutRead !== "unclear" ||
    Boolean(likelyInstallZone.trim()) ||
    Boolean(aerialNotes.trim());

  let aerialScore: TrafficLight | null = null;
  if (aerialInputsStarted) {
    aerialScore = "Green";

    if (
      publicSpaceExposure === "yes" ||
      layoutRead === "tight" ||
      installZoneVisible === "no"
    ) {
      aerialScore = "Red";
    } else if (
      parkingLotVisible === "unclear" ||
      installZoneVisible === "unclear" ||
      drivewayAccessVisible === "unclear" ||
      publicSpaceExposure === "unclear" ||
      layoutRead === "mixed"
    ) {
      aerialScore = "Yellow";
    }
  }

  let aerialReviewStatus: "Not started" | "Partial" | "Completed" = "Not started";
  if (aerialInputsStarted) {
    const completeInputs =
      parkingLotVisible !== "unclear" &&
      installZoneVisible !== "unclear" &&
      publicSpaceExposure !== "unclear" &&
      drivewayAccessVisible !== "unclear" &&
      layoutRead !== "unclear";

    aerialReviewStatus = completeInputs ? "Completed" : "Partial";
  }

  let aerialSiteContext = "Bird's-eye review not started";
  if (publicSpaceExposure === "yes" || locationType === "public-space") {
    aerialSiteContext = "Public-space adjacent";
  } else if (
    layoutRead === "tight" ||
    layoutRead === "mixed" ||
    locationType === "private-with-layout-questions"
  ) {
    aerialSiteContext = "Private property with layout questions";
  } else if (aerialInputsStarted) {
    aerialSiteContext = "Private property";
  }

  const aerialPositives: string[] = [];
  const aerialConcerns: string[] = [];

  if (parkingLotVisible === "yes") {
    aerialPositives.push("Visible lot or staging area from aerial review.");
  } else if (parkingLotVisible === "no") {
    aerialConcerns.push("No obvious lot or setback area visible from above.");
  }

  if (installZoneVisible === "yes") {
    aerialPositives.push("Likely install zone appears visible from bird's-eye view.");
  } else if (installZoneVisible === "no") {
    aerialConcerns.push("No clear install zone is visible from bird's-eye review.");
  }

  if (drivewayAccessVisible === "yes") {
    aerialPositives.push("Driveway or access pattern appears readable from above.");
  } else if (drivewayAccessVisible === "no") {
    aerialConcerns.push("Access pattern is not obvious from aerial review.");
  }

  if (publicSpaceExposure === "yes") {
    aerialConcerns.push("Site appears exposed to sidewalk, curb, or street-space issues.");
  } else if (publicSpaceExposure === "no") {
    aerialPositives.push("Site appears to sit more cleanly within private-property space.");
  }

  if (layoutRead === "clean") {
    aerialPositives.push("Overall aerial layout reads as straightforward.");
  } else if (layoutRead === "mixed") {
    aerialConcerns.push("Layout shows some aerial ambiguity or circulation questions.");
  } else if (layoutRead === "tight") {
    aerialConcerns.push("Layout appears tight or awkward from above.");
  }

  const aerialSummary = !aerialInputsStarted
    ? "Bird's-eye review has not been completed yet."
    : `${aerialSiteContext}. ${
        aerialScore === "Red"
          ? "Aerial review shows a constrained or public-space-sensitive layout."
          : aerialScore === "Yellow"
            ? "Aerial review shows a possible site with layout or clarity questions."
            : "Aerial review suggests a cleaner private-property layout."
      } ${likelyInstallZone.trim() ? `Likely install zone: ${likelyInstallZone.trim()}.` : ""} ${
        aerialNotes.trim() ? `Notes: ${aerialNotes.trim()}` : ""
      }`.trim();

  const scores = [
    projectScore,
    siteControlScore,
    locationScore,
    approvalScore,
    productScore,
    parkingSignalScore,
    ...(aerialScore ? [aerialScore] : []),
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
  } else if (isChargingPortProject) {
    bestFitUseCase = "EV charging port deployment with electrical review";
  }

  const agencies = {
    dob: "Likely yes",
    fdny:
      isCabinetProject || complexity === "high"
        ? "Likely yes"
        : isChargingPortProject
          ? "Usually no"
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
    "Use the Bird's-Eye Review to check the address in satellite view before trusting ground-level photos alone.",
    "Be honest about host commitment, product readiness, and complexity.",
    "Use notes for what you actually observed onsite, not assumptions.",
    "Read the Green / Yellow / Red result before bringing in a vendor or contractor.",
  ];

  const photoFieldConfig: Array<{ key: PhotoFieldKey; label: string }> = [
    { key: "frontage", label: "Site frontage" },
    { key: "installZone", label: "Proposed install zone" },
    { key: "existingParking", label: "Existing bike or e-scooter parking" },
    { key: "electricalAccess", label: "Electrical / panel access" },
    { key: "circulation", label: "Sidewalk, curb, or circulation" },
  ];

  const visualScore = analysis?.visual_score ?? null;
  const manualWithAerial = aerialScore ? strongestScore(overall, aerialScore) : overall;
  const combinedScore = visualScore ? strongestScore(manualWithAerial, visualScore) : manualWithAerial;
  const finalRecommendation =
    aerialScore === "Red" && overall !== "Red"
      ? "Bird's-eye review shows a constrained or public-space-sensitive layout. Do not treat this as a clean early deployment until the layout and access risks are resolved."
      : recommendation;
  const combinedBadge = [
    overall,
    aerialScore ? `${aerialScore} aerial` : null,
    visualScore ? `${visualScore} visual` : null,
  ]
    .filter(Boolean)
    .join(" / ");

  const buildFallbackPhotoAnalysis = (
    reason: string,
    photoCount: number,
  ): PhotoAnalysisResult => {
    const visualScoreFallback = strongestScore(manualWithAerial, combinedScore);
    const sanitizedReason = (() => {
      if (
        /expected pattern|unreadable json|no json object|openai analysis/i.test(
          reason,
        )
      ) {
        return "OpenAI analysis could not be completed, so this read uses the current site inputs only.";
      }

      if (reason.trim()) {
        return reason.trim();
      }

      return "OpenAI analysis could not be completed, so this read uses the current site inputs only.";
    })();

    const visiblePositives = [
      ...(photoCount > 0
        ? [`${photoCount} labeled site photo${photoCount === 1 ? "" : "s"} received for review.`]
        : ["No photo upload was available, so this is a site-data fallback read."]),
      ...(aerialPositives.length > 0 ? aerialPositives.slice(0, 2) : []),
    ];

    const visibleConcerns = [
      ...(aerialConcerns.length > 0 ? aerialConcerns.slice(0, 2) : []),
      ...(photoCount === 0
        ? ["The photo analyzer could not inspect image content because no photos were uploaded."]
        : ["OpenAI analysis was unavailable, so this read falls back to the current site inputs."]),
    ];

    return {
      site_context: aerialSiteContext,
      visual_score: visualScoreFallback,
      visible_positives: visiblePositives,
      visible_concerns: visibleConcerns,
      suggested_use_case: isCabinetProject
        ? "cabinet/rack candidate"
        : isChargingPortProject
          ? "EV charging port candidate"
          : isSimpleParking
            ? "secure bike parking"
            : "simple charging access",
      likely_complexity: isCabinetProject
        ? "High"
        : isChargingPortProject
          ? "Moderate"
          : aerialScore === "Red"
            ? "High"
            : "Low",
      agency_warning: sanitizedReason,
      next_step: nextSteps[0] || "Gather more site information before advancing.",
      confidence_note:
        photoCount > 0
          ? "Fallback feedback shown because AI photo analysis could not be completed."
          : "Fallback feedback shown because no photos were uploaded.",
    };
  };

  const encodedAddress = encodeURIComponent(siteAddress.trim());
  const googleSatelliteUrl = encodedAddress
    ? `https://www.google.com/maps/search/?api=1&query=${encodedAddress}&basemap=satellite`
    : "";
  const googleMapUrl = encodedAddress
    ? `https://www.google.com/maps/search/?api=1&query=${encodedAddress}`
    : "";
  const thirtyCLocatorUrl =
    "https://experience.arcgis.com/experience/3f67d5e82dc64d1589714d5499196d4f/page/Page";
  const thirtyCSummary =
    thirtyCEligibility === "eligible"
      ? "Site appears to fall within a 30C-eligible census tract based on the locator review."
      : thirtyCEligibility === "ineligible"
        ? "Site does not appear to fall within a 30C-eligible census tract based on the locator review."
        : thirtyCEligibility === "unclear"
          ? "30C locator review was attempted, but the result is still unclear."
        : "30C locator review has not been completed yet.";
  const fitSummary =
    fitResult === "likely-fits"
      ? "The selected station appears likely to fit the visible install area, subject to field measurement and contractor review."
      : fitResult === "may-fit"
        ? "The station may fit, but the layout still shows enough constraints that field measurement is needed."
        : fitResult === "unlikely-fit"
          ? "The station appears too large or too constrained for the visible install area."
          : fitResult === "needs-measurement"
            ? "The current photos and references are not strong enough to support a reliable fit conclusion without on-site measurement."
            : "Station fit screening has not been completed yet.";

  const workflowChecklistMissing = [
    ownerDecisionMakerConfirmed ? null : "Owner or decision-maker confirmation",
    photosAndDocsReceived ? null : "Photos and supporting documents received",
    aerialReviewStatus === "Completed" ? null : "Completed bird's-eye review",
    thirtyCEligibility !== "not-started" ? null : "30C review completed",
    fitResult !== "not-started" ? null : "Station fit screen completed",
    proposalAccepted ? null : "Proposal or scope acceptance",
    vendorOrPartnerSelected ? null : "Vendor or partner selected",
    requiredDocsReady ? null : "Required submission documents ready",
  ].filter(Boolean) as string[];

  const readyToSubmit =
    workflowChecklistMissing.length === 0 &&
    (fdnyStatus === "not-needed" || fdnyStatus === "in-progress") &&
    (dobStatus === "in-progress" || dobStatus === "not-needed") &&
    (dotStatus === "not-needed" || dotStatus === "in-progress");

  const workflowSummary =
    readyToSubmit
      ? "Project appears ready to move into submission or formal agency coordination."
      : workflowChecklistMissing.length > 0
        ? `Project is not ready to submit yet. Missing: ${workflowChecklistMissing.join(", ")}.`
        : "Project is in motion, but agency or owner-side follow-up is still needed before submission.";

  useEffect(() => {
    const raw = window.localStorage.getItem(STORAGE_KEY);

    if (!raw) return;

    try {
      const parsed = JSON.parse(raw) as SavedAssessment[];
      if (Array.isArray(parsed)) {
        setSavedAssessments(parsed);
      }
    } catch {
      window.localStorage.removeItem(STORAGE_KEY);
    }
  }, []);

  const handlePhotoChange = (key: PhotoFieldKey, label: string, file?: File) => {
    setAnalysis(null);
    setAnalysisError("");

    if (!file) {
      setSelectedPhotos((current) => {
        const next = { ...current };
        delete next[key];
        return next;
      });
      return;
    }

    setSelectedPhotos((current) => ({
      ...current,
      [key]: { label, file },
    }));
  };

  const handleAnalyzePhotos = async () => {
    const photoEntries = Object.values(selectedPhotos);

    try {
      setIsAnalyzing(true);
      setAnalysis(null);
      setAnalysisError("");

      if (photoEntries.length === 0) {
        setAnalysis(
          buildFallbackPhotoAnalysis(
            "Upload at least one labeled site photo for AI image analysis.",
            0,
          ),
        );
        return;
      }

      const photos = await Promise.all(
        photoEntries.map(async (photo) => ({
          label: photo.label,
          fileName: photo.file.name,
          dataUrl: await fileToDataUrl(photo.file),
        })),
      );

      const response = await fetch("/api/onsite-photo-analysis", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          siteName,
          siteAddress,
          hostType,
          projectType,
          locationType,
          hostCommitment,
          productReadiness,
          complexity,
          existingParking,
          onsiteNotes,
          photos,
        }),
      });

      const payload = (await response.json()) as {
        analysis?: PhotoAnalysisResult;
        error?: string;
      };

      if (!response.ok || !payload.analysis) {
        throw new Error(payload.error || "AI photo analysis could not be completed.");
      }

      setAnalysis(payload.analysis);
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "AI photo analysis could not be completed.";
      setAnalysis(buildFallbackPhotoAnalysis(message, photoEntries.length));
      setAnalysisError("");
    } finally {
      setIsAnalyzing(false);
    }
  };

  const currentAssessment: SavedAssessment = {
    id: currentProjectId || `${Date.now()}`,
    savedAt: new Date().toISOString(),
    siteName: siteName || "Unnamed site",
    siteAddress: siteAddress || "Address not entered",
    overall: manualWithAerial,
    visualScore,
    bestFitUseCase,
    recommendation: finalRecommendation,
    agencies,
    aerialReview: {
      status: aerialReviewStatus,
      mapSource,
      siteContext: aerialSiteContext,
      score: aerialScore,
      likelyInstallZone: likelyInstallZone.trim(),
      summary: aerialSummary,
    },
    thirtyCReview: {
      status: thirtyCEligibility,
      summary: thirtyCSummary,
      notes: thirtyCNotes.trim(),
    },
    fitReview: {
      stationModel: stationModel.trim(),
      schematicFileName,
      knownMeasurement: knownMeasurement.trim(),
      result: fitResult,
      summary: fitSummary,
      notes: fitNotes.trim(),
    },
    onsiteNotes,
    analysis,
    workflow: {
      stage: workflowStage,
      checklist: {
        ownerDecisionMakerConfirmed,
        photosAndDocsReceived,
        proposalAccepted,
        vendorOrPartnerSelected,
        requiredDocsReady,
      },
      fdnyStatus,
      dobStatus,
      dotStatus,
      nextFollowUpDate,
      notes: workflowNotes.trim(),
    },
    formState: {
      hostType,
      projectType,
      locationType,
      hostCommitment,
      productReadiness,
      complexity,
      existingParking,
      onsiteNotes,
      mapSource,
      parkingLotVisible,
      installZoneVisible,
      publicSpaceExposure,
      drivewayAccessVisible,
      layoutRead,
      likelyInstallZone,
      aerialNotes,
      thirtyCEligibility,
      thirtyCNotes,
      stationModel,
      knownMeasurement,
      fitResult,
      fitNotes,
      schematicFileName,
    },
  };

  const hostTypeLabel = HOST_TYPE_LABELS[hostType] || hostType;
  const projectTypeLabel = PROJECT_TYPE_LABELS[projectType] || projectType;
  const locationTypeLabel = LOCATION_TYPE_LABELS[locationType] || locationType;
  const safeName = (siteName || "jetizon-site").toLowerCase().replace(/[^a-z0-9]+/g, "-");
  const missingInfo = [
    siteAddress ? null : "Exact site address",
    siteName ? null : "Named property or site",
    likelyInstallZone.trim() ? null : "Likely install zone",
    onsiteNotes.trim() ? null : "Ground-level onsite notes",
    aerialInputsStarted ? null : "Bird's-eye review",
    thirtyCEligibility !== "not-started" ? null : "30C locator review",
    fitResult !== "not-started" ? null : "Station fit screen",
    analysis ? null : "AI photo screening",
  ].filter(Boolean) as string[];

  const propertyReportDraft = [
    "# Jetizon Property-Specific Pre-Assessment Report",
    "",
    "## Cover Information",
    `- Property name: ${siteName || "Not entered"}`,
    `- Property address: ${siteAddress || "Not entered"}`,
    `- Assessment date: ${new Date().toLocaleDateString()}`,
    `- Host type: ${hostTypeLabel}`,
    `- Proposed deployment type: ${projectTypeLabel}`,
    "",
    "## Executive Summary",
    `- Result: ${manualWithAerial}`,
    `- Best-fit first deployment: ${bestFitUseCase}`,
    `- Main opportunity: ${finalRecommendation}`,
    `- Main constraint: ${aerialScore === "Red" ? aerialSummary : analysis?.agency_warning || "No major visual blocker flagged yet."}`,
    "",
    "## Bird's-Eye Review",
    `- Status: ${aerialReviewStatus}`,
    `- Map source: ${mapSource}`,
    `- Site context: ${aerialSiteContext}`,
    `- Bird's-eye score: ${aerialScore || "Not started"}`,
    `- Likely install zone: ${likelyInstallZone || "Not entered"}`,
    `- Summary: ${aerialSummary}`,
    "",
    "## 30C Tax Credit Locator Review",
    `- Status: ${thirtyCEligibility}`,
    `- Summary: ${thirtyCSummary}`,
    `- Notes: ${thirtyCNotes || "None entered"}`,
    "",
    "## Station Fit Screen",
    `- Station model: ${stationModel || "Not entered"}`,
    `- Uploaded schematic: ${schematicFileName || "Not uploaded"}`,
    `- Known measurement reference: ${knownMeasurement || "Not entered"}`,
    `- Fit result: ${fitResult}`,
    `- Summary: ${fitSummary}`,
    `- Notes: ${fitNotes || "None entered"}`,
    "",
    "## Ground-Level Review",
    `- Existing parking visible: ${existingParking}`,
    `- Onsite notes: ${onsiteNotes || "None entered"}`,
    analysis
      ? `- AI visual summary: ${analysis.site_context}; ${analysis.next_step}`
      : "- AI visual summary: Not run",
    "",
    "## Early Feasibility Read",
    `- Location type: ${locationTypeLabel}`,
    `- Product readiness: ${productReadiness}`,
    `- Complexity read: ${complexity}`,
    `- Likely agency path: DOB ${agencies.dob}, FDNY ${agencies.fdny}, DOT ${agencies.dot}`,
    "",
    "## Workflow Tracking",
    `- Current stage: ${workflowStageLabel(workflowStage)}`,
    `- Ready-to-submit read: ${readyToSubmit ? "Yes" : "No"}`,
    `- Workflow summary: ${workflowSummary}`,
    `- FDNY tracking: ${agencyStatusLabel(fdnyStatus)}`,
    `- DOB tracking: ${agencyStatusLabel(dobStatus)}`,
    `- DOT tracking: ${agencyStatusLabel(dotStatus)}`,
    `- Next follow-up: ${nextFollowUpDate || "Not entered"}`,
    `- Workflow notes: ${workflowNotes || "None entered"}`,
    "",
    "## Missing Information",
    ...(
      [...missingInfo, ...workflowChecklistMissing].length
        ? [...missingInfo, ...workflowChecklistMissing].map((item) => `- ${item}`)
        : ["- No major missing inputs flagged from the current form state."]
    ),
    "",
    "## Recommended Next Step",
    ...nextSteps.map((step) => `- ${step}`),
  ].join("\n");

  const clientSummaryDraft = [
    "# Jetizon Preliminary Property Review",
    "",
    `Property: ${siteName || "Not entered"}`,
    `Address: ${siteAddress || "Not entered"}`,
    `Property type: ${hostTypeLabel}`,
    `Recommended first use case: ${bestFitUseCase}`,
    "",
    "## Current Read",
    `Jetizon currently reads this opportunity as ${manualWithAerial}. ${finalRecommendation}`,
    "",
    "## What Jetizon Reviewed",
    `- Site address and layout category: ${locationTypeLabel}`,
    `- Bird's-eye review: ${aerialReviewStatus}`,
    `- Ground-level notes: ${onsiteNotes || "Pending more onsite notes"}`,
    `- Program and approval path screen: DOB ${agencies.dob}, FDNY ${agencies.fdny}, DOT ${agencies.dot}`,
    "",
    "## Bird's-Eye Summary",
    aerialSummary,
    "",
    "## 30C Tax Credit Read",
    `${thirtyCSummary}${thirtyCNotes.trim() ? ` Notes: ${thirtyCNotes.trim()}` : ""}`,
    "",
    "## Station Fit Read",
    `${fitSummary}${stationModel.trim() ? ` Model: ${stationModel.trim()}.` : ""}${
      fitNotes.trim() ? ` Notes: ${fitNotes.trim()}` : ""
    }`,
    "",
    "## Next Step",
    nextSteps[0] || "Gather more site information before advancing.",
    "",
    "## Workflow Read",
    `${workflowSummary} Current stage: ${workflowStageLabel(workflowStage)}.`,
    "",
    "## Important Note",
    "This is an early Jetizon screening summary. It is not final engineering, permit approval, or a locked installation quote.",
  ].join("\n");

  const proposalStarterDraft = [
    "# Jetizon Proposal Starter",
    "",
    `Opportunity: ${siteName || "Not entered"}`,
    `Address: ${siteAddress || "Not entered"}`,
    `Host type: ${hostTypeLabel}`,
    `Project type: ${projectTypeLabel}`,
    "",
    "## Scope Direction",
    `Jetizon is proposing an early-stage site development and screening path for ${siteName || "the property"}, focused first on ${bestFitUseCase.toLowerCase()}.`,
    "",
    "## Why This Site",
    finalRecommendation,
    "",
    "## Current Site Signals",
    `- Assessment score: ${manualWithAerial}`,
    `- Bird's-eye review: ${aerialScore || "Not started"} (${aerialSiteContext})`,
    `- 30C locator review: ${thirtyCEligibility}`,
    `- Station fit result: ${fitResult}`,
    `- Workflow stage: ${workflowStageLabel(workflowStage)}`,
    `- Host commitment: ${hostCommitment}`,
    `- Product readiness: ${productReadiness}`,
    "",
    "## Recommended Jetizon Next Step",
    nextSteps[0] || "Complete the next assessment step.",
    "",
    "## Proposal Notes To Finalize",
    ...(missingInfo.length ? missingInfo.map((item) => `- ${item}`) : ["- Add pricing, scope, and external partner details as needed."]),
  ].join("\n");

  const documentDrafts = [
    {
      title: "Property report",
      description: "Internal report shell for one real site assessment.",
      preview: `Result: ${manualWithAerial}. ${aerialSummary}`,
      fileName: `${safeName || "jetizon-site"}-property-report.md`,
      content: propertyReportDraft,
    },
    {
      title: "Client summary",
      description: "Cleaner host-facing summary of the current screening read.",
      preview: `Recommended first use case: ${bestFitUseCase}. Next step: ${nextSteps[0] || "Gather more information."}`,
      fileName: `${safeName || "jetizon-site"}-client-summary.md`,
      content: clientSummaryDraft,
    },
    {
      title: "Proposal starter",
      description: "Commercial next-step draft using the same assessment data.",
      preview: `Scope direction: ${projectTypeLabel}. Current score: ${manualWithAerial}.`,
      fileName: `${safeName || "jetizon-site"}-proposal-starter.md`,
      content: proposalStarterDraft,
    },
  ];

  const formatAssessmentText = (assessment: SavedAssessment) => {
    const lines = [
      "Jetizon Onsite Assessment",
      "-------------------------",
      `Saved: ${new Date(assessment.savedAt).toLocaleString()}`,
      `Site: ${assessment.siteName}`,
      `Address: ${assessment.siteAddress}`,
      `Assessment score: ${assessment.overall}`,
      `AI visual score: ${assessment.visualScore || "Not run"}`,
      `Best-fit use case: ${assessment.bestFitUseCase}`,
      "",
      "Recommendation:",
      assessment.recommendation,
      "",
      "Likely agency path:",
      `- DOB: ${assessment.agencies.dob}`,
      `- FDNY: ${assessment.agencies.fdny}`,
      `- DOT: ${assessment.agencies.dot}`,
      "",
      "Bird's-Eye Review:",
      `- Status: ${assessment.aerialReview.status}`,
      `- Map source: ${assessment.aerialReview.mapSource}`,
      `- Site context: ${assessment.aerialReview.siteContext}`,
      `- Bird's-eye score: ${assessment.aerialReview.score || "Not scored"}`,
      `- Likely install zone: ${assessment.aerialReview.likelyInstallZone || "Not entered"}`,
      `- Summary: ${assessment.aerialReview.summary}`,
      "",
      "30C Tax Credit Locator Review:",
      `- Status: ${assessment.thirtyCReview.status}`,
      `- Summary: ${assessment.thirtyCReview.summary}`,
      `- Notes: ${assessment.thirtyCReview.notes || "None entered"}`,
      "",
      "Station Fit Screen:",
      `- Station model: ${assessment.fitReview.stationModel || "Not entered"}`,
      `- Uploaded schematic: ${assessment.fitReview.schematicFileName || "Not uploaded"}`,
      `- Known measurement reference: ${assessment.fitReview.knownMeasurement || "Not entered"}`,
      `- Fit result: ${assessment.fitReview.result}`,
      `- Summary: ${assessment.fitReview.summary}`,
      `- Notes: ${assessment.fitReview.notes || "None entered"}`,
      "",
      "Workflow Tracking:",
      `- Stage: ${workflowStageLabel(assessment.workflow?.stage || "lead")}`,
      `- Owner / decision-maker confirmed: ${assessment.workflow?.checklist.ownerDecisionMakerConfirmed ? "Yes" : "No"}`,
      `- Photos and docs received: ${assessment.workflow?.checklist.photosAndDocsReceived ? "Yes" : "No"}`,
      `- Proposal accepted: ${assessment.workflow?.checklist.proposalAccepted ? "Yes" : "No"}`,
      `- Vendor or partner selected: ${assessment.workflow?.checklist.vendorOrPartnerSelected ? "Yes" : "No"}`,
      `- Required docs ready: ${assessment.workflow?.checklist.requiredDocsReady ? "Yes" : "No"}`,
      `- FDNY tracking: ${agencyStatusLabel(assessment.workflow?.fdnyStatus || "not-needed")}`,
      `- DOB tracking: ${agencyStatusLabel(assessment.workflow?.dobStatus || "not-started")}`,
      `- DOT tracking: ${agencyStatusLabel(assessment.workflow?.dotStatus || "not-needed")}`,
      `- Next follow-up: ${assessment.workflow?.nextFollowUpDate || "Not entered"}`,
      `- Workflow notes: ${assessment.workflow?.notes || "None entered"}`,
      "",
      "Onsite notes:",
      assessment.onsiteNotes || "None entered",
    ];

    if (assessment.analysis) {
      lines.push(
        "",
        "AI Photo Findings:",
        `- Site context guess: ${assessment.analysis.site_context}`,
        `- Suggested use case: ${assessment.analysis.suggested_use_case}`,
        `- Likely complexity: ${assessment.analysis.likely_complexity}`,
        `- Agency warning: ${assessment.analysis.agency_warning}`,
        `- AI next step: ${assessment.analysis.next_step}`,
        "",
        "Visible positives:",
        ...assessment.analysis.visible_positives.map((item) => `- ${item}`),
        "",
        "Visible concerns:",
        ...assessment.analysis.visible_concerns.map((item) => `- ${item}`),
      );
    }

    return lines.join("\n");
  };

  const handleSaveAssessment = () => {
    const existingIndex = savedAssessments.findIndex(
      (assessment) => assessment.id === currentAssessment.id,
    );
    const next =
      existingIndex >= 0
        ? [
            currentAssessment,
            ...savedAssessments.filter(
              (assessment) => assessment.id !== currentAssessment.id,
            ),
          ].slice(0, 12)
        : [currentAssessment, ...savedAssessments].slice(0, 12);
    setSavedAssessments(next);
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    setCurrentProjectId(currentAssessment.id);
    setSaveMessage(
      existingIndex >= 0
        ? "Project updated in this browser."
        : "Project saved in this browser.",
    );
    window.setTimeout(() => setSaveMessage(""), 2200);
  };

  const handleDownloadAssessment = (assessment: SavedAssessment = currentAssessment) => {
    const savedSafeName = assessment.siteName.toLowerCase().replace(/[^a-z0-9]+/g, "-");
    downloadTextFile(
      `${savedSafeName || "jetizon-site"}-assessment.txt`,
      formatAssessmentText(assessment),
    );
  };

  const handleLoadAssessment = (assessment: SavedAssessment) => {
    setCurrentProjectId(assessment.id);
    setSiteName(assessment.siteName);
    setSiteAddress(assessment.siteAddress);
    setHostType(assessment.formState?.hostType || "multifamily");
    setProjectType(assessment.formState?.projectType || "secure-bike-parking");
    setLocationType(assessment.formState?.locationType || "private");
    setHostCommitment(assessment.formState?.hostCommitment || "strong");
    setProductReadiness(assessment.formState?.productReadiness || "known");
    setComplexity(assessment.formState?.complexity || "low");
    setExistingParking(assessment.formState?.existingParking || "yes");
    setOnsiteNotes(assessment.formState?.onsiteNotes || assessment.onsiteNotes || "");
    setMapSource(assessment.formState?.mapSource || assessment.aerialReview.mapSource || "google-satellite");
    setParkingLotVisible(assessment.formState?.parkingLotVisible || "unclear");
    setInstallZoneVisible(assessment.formState?.installZoneVisible || "unclear");
    setPublicSpaceExposure(assessment.formState?.publicSpaceExposure || "unclear");
    setDrivewayAccessVisible(assessment.formState?.drivewayAccessVisible || "unclear");
    setLayoutRead(assessment.formState?.layoutRead || "unclear");
    setLikelyInstallZone(
      assessment.formState?.likelyInstallZone || assessment.aerialReview.likelyInstallZone || "",
    );
    setAerialNotes(assessment.formState?.aerialNotes || "");
    setThirtyCEligibility(
      assessment.formState?.thirtyCEligibility || assessment.thirtyCReview.status,
    );
    setThirtyCNotes(assessment.formState?.thirtyCNotes || assessment.thirtyCReview.notes || "");
    setStationModel(assessment.formState?.stationModel || assessment.fitReview.stationModel || "");
    setKnownMeasurement(
      assessment.formState?.knownMeasurement || assessment.fitReview.knownMeasurement || "",
    );
    setFitResult(assessment.formState?.fitResult || assessment.fitReview.result);
    setFitNotes(assessment.formState?.fitNotes || assessment.fitReview.notes || "");
    setSchematicFileName(
      assessment.formState?.schematicFileName || assessment.fitReview.schematicFileName || "",
    );
    setWorkflowStage(assessment.workflow?.stage || "lead");
    setOwnerDecisionMakerConfirmed(
      assessment.workflow?.checklist.ownerDecisionMakerConfirmed || false,
    );
    setPhotosAndDocsReceived(
      assessment.workflow?.checklist.photosAndDocsReceived || false,
    );
    setProposalAccepted(assessment.workflow?.checklist.proposalAccepted || false);
    setVendorOrPartnerSelected(
      assessment.workflow?.checklist.vendorOrPartnerSelected || false,
    );
    setRequiredDocsReady(assessment.workflow?.checklist.requiredDocsReady || false);
    setFdnyStatus(assessment.workflow?.fdnyStatus || "not-needed");
    setDobStatus(assessment.workflow?.dobStatus || "not-started");
    setDotStatus(assessment.workflow?.dotStatus || "not-needed");
    setNextFollowUpDate(assessment.workflow?.nextFollowUpDate || "");
    setWorkflowNotes(assessment.workflow?.notes || "");
    setAnalysis(assessment.analysis || null);
    setAnalysisError("");
    setSelectedPhotos({});
    setSaveMessage(`Loaded ${assessment.siteName} back into the assistant.`);
    window.setTimeout(() => setSaveMessage(""), 2200);
  };

  return (
    <div className="grid gap-8 lg:grid-cols-[1.05fr,0.95fr]">
      <div className="rounded-[2rem] border border-white/10 bg-white/5 p-4 shadow-2xl backdrop-blur md:p-6">
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
            className={`rounded-full px-4 py-2 text-sm font-semibold ${badgeClass(combinedScore)}`}
          >
            {combinedBadge}
          </div>
        </div>

        <div className="mt-6 grid gap-4 md:mt-8 md:gap-5 md:grid-cols-2">
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
              <option value="ev-car-charging-port">EV car charging port / EV charging port</option>
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

          <div className="rounded-[1.75rem] border border-white/10 bg-white/5 p-5 md:col-span-2">
            <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
              <div className="max-w-2xl">
                <p className="text-sm uppercase tracking-[0.25em] text-lime-400">
                  Bird&apos;s-Eye Review
                </p>
                <p className="mt-3 text-sm leading-7 text-slate-300">
                  Use the site address to run a map or satellite-based layout check.
                  This helps you judge whether the property looks cleanly private,
                  layout-constrained, or public-space-adjacent before relying on
                  photos alone.
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                <a
                  href={googleSatelliteUrl || undefined}
                  target="_blank"
                  rel="noreferrer"
                  className={`rounded-2xl px-4 py-3 text-sm font-semibold transition ${
                    googleSatelliteUrl
                      ? "bg-lime-400 text-slate-950 hover:scale-[1.01]"
                      : "cursor-not-allowed bg-white/10 text-slate-500"
                  }`}
                  aria-disabled={!googleSatelliteUrl}
                >
                  Open Satellite View
                </a>
                <a
                  href={googleMapUrl || undefined}
                  target="_blank"
                  rel="noreferrer"
                  className={`rounded-2xl border px-4 py-3 text-sm font-semibold transition ${
                    googleMapUrl
                      ? "border-white/15 bg-white/5 text-white hover:bg-white/10"
                      : "cursor-not-allowed border-white/10 bg-white/5 text-slate-500"
                  }`}
                  aria-disabled={!googleMapUrl}
                >
                  Open Map View
                </a>
              </div>
            </div>

            <div className="mt-6 grid gap-4 md:grid-cols-2">
              <label className="text-sm text-slate-300">
                <span className="mb-2 block font-medium text-white">Map source</span>
                <select
                  value={mapSource}
                  onChange={(event) => setMapSource(event.target.value)}
                  className="w-full rounded-2xl border border-white/10 bg-slate-950/60 px-4 py-3 text-white outline-none transition focus:border-lime-400"
                >
                  <option value="google-satellite">Google Maps satellite</option>
                  <option value="google-map">Google Maps standard</option>
                  <option value="google-earth">Google Earth</option>
                  <option value="bing-aerial">Bing aerial</option>
                  <option value="nyc-zola">NYC ZoLa / local GIS</option>
                </select>
              </label>

              <label className="text-sm text-slate-300">
                <span className="mb-2 block font-medium text-white">Layout read</span>
                <select
                  value={layoutRead}
                  onChange={(event) => setLayoutRead(event.target.value)}
                  className="w-full rounded-2xl border border-white/10 bg-slate-950/60 px-4 py-3 text-white outline-none transition focus:border-lime-400"
                >
                  <option value="unclear">Not reviewed yet</option>
                  <option value="clean">Clean / straightforward</option>
                  <option value="mixed">Some layout questions</option>
                  <option value="tight">Tight / awkward / constrained</option>
                </select>
              </label>

              <label className="text-sm text-slate-300">
                <span className="mb-2 block font-medium text-white">
                  Parking lot or setback visible
                </span>
                <select
                  value={parkingLotVisible}
                  onChange={(event) =>
                    setParkingLotVisible(event.target.value as TernaryChoice)
                  }
                  className="w-full rounded-2xl border border-white/10 bg-slate-950/60 px-4 py-3 text-white outline-none transition focus:border-lime-400"
                >
                  <option value="unclear">Not reviewed yet</option>
                  <option value="yes">Yes</option>
                  <option value="no">No</option>
                </select>
              </label>

              <label className="text-sm text-slate-300">
                <span className="mb-2 block font-medium text-white">
                  Clear install zone visible
                </span>
                <select
                  value={installZoneVisible}
                  onChange={(event) =>
                    setInstallZoneVisible(event.target.value as TernaryChoice)
                  }
                  className="w-full rounded-2xl border border-white/10 bg-slate-950/60 px-4 py-3 text-white outline-none transition focus:border-lime-400"
                >
                  <option value="unclear">Not reviewed yet</option>
                  <option value="yes">Yes</option>
                  <option value="no">No</option>
                </select>
              </label>

              <label className="text-sm text-slate-300">
                <span className="mb-2 block font-medium text-white">
                  Public-space exposure visible
                </span>
                <select
                  value={publicSpaceExposure}
                  onChange={(event) =>
                    setPublicSpaceExposure(event.target.value as TernaryChoice)
                  }
                  className="w-full rounded-2xl border border-white/10 bg-slate-950/60 px-4 py-3 text-white outline-none transition focus:border-lime-400"
                >
                  <option value="unclear">Not reviewed yet</option>
                  <option value="yes">Yes</option>
                  <option value="no">No</option>
                </select>
              </label>

              <label className="text-sm text-slate-300">
                <span className="mb-2 block font-medium text-white">
                  Driveway / access pattern visible
                </span>
                <select
                  value={drivewayAccessVisible}
                  onChange={(event) =>
                    setDrivewayAccessVisible(event.target.value as TernaryChoice)
                  }
                  className="w-full rounded-2xl border border-white/10 bg-slate-950/60 px-4 py-3 text-white outline-none transition focus:border-lime-400"
                >
                  <option value="unclear">Not reviewed yet</option>
                  <option value="yes">Yes</option>
                  <option value="no">No</option>
                </select>
              </label>

              <label className="text-sm text-slate-300 md:col-span-2">
                <span className="mb-2 block font-medium text-white">Likely install zone</span>
                <input
                  value={likelyInstallZone}
                  onChange={(event) => setLikelyInstallZone(event.target.value)}
                  className="w-full rounded-2xl border border-white/10 bg-slate-950/60 px-4 py-3 text-white outline-none transition focus:border-lime-400"
                  placeholder="Rear lot edge near private parking row"
                />
              </label>

              <label className="text-sm text-slate-300 md:col-span-2">
                <span className="mb-2 block font-medium text-white">Aerial notes</span>
                <textarea
                  value={aerialNotes}
                  onChange={(event) => setAerialNotes(event.target.value)}
                  rows={4}
                  className="w-full rounded-2xl border border-white/10 bg-slate-950/60 px-4 py-3 text-white outline-none transition focus:border-lime-400"
                  placeholder="Lot appears internal to the property. Sidewalk frontage is limited but circulation looks tight near the main entrance..."
                />
              </label>
            </div>

            <div className="mt-6 grid gap-4 md:grid-cols-2">
              <div className={`rounded-2xl border p-4 ${scoreClass(aerialScore || "Yellow")}`}>
                <p className="text-sm font-semibold text-white">Bird&apos;s-eye score</p>
                <p className="mt-2 text-sm leading-7">
                  {aerialScore || "Not started"} from satellite or map review.
                </p>
                <p className="mt-3 text-xs uppercase tracking-[0.22em] text-lime-300">
                  Status: {aerialReviewStatus}
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-slate-950/40 p-4">
                <p className="text-sm font-semibold text-white">Site context</p>
                <p className="mt-2 text-sm leading-7 text-slate-300">{aerialSiteContext}</p>
                <p className="mt-3 text-xs leading-6 text-slate-400">
                  Parking visible: {ternaryLabel(parkingLotVisible)} | Install zone:{" "}
                  {ternaryLabel(installZoneVisible)} | Public exposure:{" "}
                  {ternaryLabel(publicSpaceExposure)}
                </p>
              </div>
            </div>

            <div className="mt-4 rounded-2xl border border-white/10 bg-slate-950/40 p-4">
              <p className="text-sm font-semibold text-white">Bird&apos;s-eye summary</p>
              <p className="mt-2 text-sm leading-7 text-slate-300">{aerialSummary}</p>
              {!!aerialPositives.length && (
                <div className="mt-4">
                  <p className="text-xs uppercase tracking-[0.22em] text-lime-300">
                    Visible positives
                  </p>
                  <ul className="mt-2 space-y-2 text-sm leading-7 text-slate-300">
                    {aerialPositives.map((item) => (
                      <li key={item}>- {item}</li>
                    ))}
                  </ul>
                </div>
              )}
              {!!aerialConcerns.length && (
                <div className="mt-4">
                  <p className="text-xs uppercase tracking-[0.22em] text-amber-300">
                    Visible concerns
                  </p>
                  <ul className="mt-2 space-y-2 text-sm leading-7 text-slate-300">
                    {aerialConcerns.map((item) => (
                      <li key={item}>- {item}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>

          <div className="rounded-[1.75rem] border border-sky-400/20 bg-sky-400/5 p-5 md:col-span-2">
            <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
              <div className="max-w-2xl">
                <p className="text-sm uppercase tracking-[0.25em] text-sky-300">
                  30C Tax Credit Locator
                </p>
                <p className="mt-3 text-sm leading-7 text-slate-300">
                  Use the federal ArcGIS locator to check whether the site appears to
                  fall within a census tract that may qualify for the Alternative Fuel
                  Vehicle Refueling Property Credit under Section 30C. This is an early
                  screening layer, not tax advice or a final IRS determination.
                </p>
              </div>
              <a
                href={thirtyCLocatorUrl}
                target="_blank"
                rel="noreferrer"
                className="rounded-2xl bg-sky-300 px-4 py-3 text-sm font-semibold text-slate-950 transition hover:scale-[1.01]"
              >
                Open 30C Locator
              </a>
            </div>

            <div className="mt-6 grid gap-4 md:grid-cols-2">
              <label className="text-sm text-slate-300">
                <span className="mb-2 block font-medium text-white">30C locator result</span>
                <select
                  value={thirtyCEligibility}
                  onChange={(event) =>
                    setThirtyCEligibility(event.target.value as ThirtyCEligibility)
                  }
                  className="w-full rounded-2xl border border-white/10 bg-slate-950/60 px-4 py-3 text-white outline-none transition focus:border-sky-300"
                >
                  <option value="not-started">Not reviewed yet</option>
                  <option value="eligible">Appears eligible</option>
                  <option value="ineligible">Does not appear eligible</option>
                  <option value="unclear">Unclear / needs follow-up</option>
                </select>
              </label>

              <div className="rounded-2xl border border-white/10 bg-slate-950/40 p-4">
                <p className="text-sm font-semibold text-white">30C summary</p>
                <p className="mt-2 text-sm leading-7 text-slate-300">{thirtyCSummary}</p>
              </div>

              <label className="text-sm text-slate-300 md:col-span-2">
                <span className="mb-2 block font-medium text-white">30C notes</span>
                <textarea
                  value={thirtyCNotes}
                  onChange={(event) => setThirtyCNotes(event.target.value)}
                  rows={4}
                  className="w-full rounded-2xl border border-white/10 bg-slate-950/60 px-4 py-3 text-white outline-none transition focus:border-sky-300"
                  placeholder="Eligible tract confirmed in the locator, screenshot captured, or result remained unclear near tract boundary..."
                />
              </label>
            </div>

            <p className="mt-4 text-xs leading-6 text-slate-400">
              The DOE / ArcGIS 30C locator is useful for screening, but it is not formal
              IRS guidance. Final tax-credit eligibility still depends on the applicable
              IRS rules and the taxpayer&apos;s actual situation.
            </p>
          </div>

          <div className="rounded-[1.75rem] border border-fuchsia-400/20 bg-fuchsia-400/5 p-5 md:col-span-2">
            <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
              <div className="max-w-2xl">
                <p className="text-sm uppercase tracking-[0.25em] text-fuchsia-300">
                  Station Fit Screen
                </p>
                <p className="mt-3 text-sm leading-7 text-slate-300">
                  Upload a charger cut sheet or schematic and capture an early fit
                  judgment against the visible install area. This is a product-fit
                  screen, not a final engineering approval.
                </p>
              </div>
            </div>

            <div className="mt-6 grid gap-4 md:grid-cols-2">
              <label className="text-sm text-slate-300">
                <span className="mb-2 block font-medium text-white">Station model</span>
                <input
                  value={stationModel}
                  onChange={(event) => setStationModel(event.target.value)}
                  className="w-full rounded-2xl border border-white/10 bg-slate-950/60 px-4 py-3 text-white outline-none transition focus:border-fuchsia-300"
                  placeholder="Wallbox Pulsar Pro 48A"
                />
              </label>

              <label className="text-sm text-slate-300">
                <span className="mb-2 block font-medium text-white">
                  Known measurement reference
                </span>
                <input
                  value={knownMeasurement}
                  onChange={(event) => setKnownMeasurement(event.target.value)}
                  className="w-full rounded-2xl border border-white/10 bg-slate-950/60 px-4 py-3 text-white outline-none transition focus:border-fuchsia-300"
                  placeholder="Parking stripe approx. 9 ft wide"
                />
              </label>

              <label className="text-sm text-slate-300">
                <span className="mb-2 block font-medium text-white">
                  Schematic or cut sheet
                </span>
                <input
                  type="file"
                  accept=".pdf,image/*"
                  onChange={(event) =>
                    setSchematicFileName(event.target.files?.[0]?.name || "")
                  }
                  className="block w-full rounded-2xl border border-dashed border-white/15 bg-slate-950/60 px-4 py-3 text-sm text-slate-300 file:mr-4 file:rounded-xl file:border-0 file:bg-white/10 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-white"
                />
                {schematicFileName && (
                  <p className="mt-2 text-xs leading-6 text-fuchsia-200">
                    Selected: {schematicFileName}
                  </p>
                )}
              </label>

              <label className="text-sm text-slate-300">
                <span className="mb-2 block font-medium text-white">Fit result</span>
                <select
                  value={fitResult}
                  onChange={(event) => setFitResult(event.target.value as FitResult)}
                  className="w-full rounded-2xl border border-white/10 bg-slate-950/60 px-4 py-3 text-white outline-none transition focus:border-fuchsia-300"
                >
                  <option value="not-started">Not reviewed yet</option>
                  <option value="likely-fits">Likely fits</option>
                  <option value="may-fit">May fit with layout constraints</option>
                  <option value="unlikely-fit">Unlikely fit</option>
                  <option value="needs-measurement">Need on-site measurement</option>
                </select>
              </label>

              <div className="rounded-2xl border border-white/10 bg-slate-950/40 p-4 md:col-span-2">
                <p className="text-sm font-semibold text-white">Fit summary</p>
                <p className="mt-2 text-sm leading-7 text-slate-300">{fitSummary}</p>
              </div>

              <label className="text-sm text-slate-300 md:col-span-2">
                <span className="mb-2 block font-medium text-white">Fit notes</span>
                <textarea
                  value={fitNotes}
                  onChange={(event) => setFitNotes(event.target.value)}
                  rows={4}
                  className="w-full rounded-2xl border border-white/10 bg-slate-950/60 px-4 py-3 text-white outline-none transition focus:border-fuchsia-300"
                  placeholder="Wallbox profile appears to fit the side wall, but service clearance near the walkway still needs tape measurement..."
                />
              </label>
            </div>

            <p className="mt-4 text-xs leading-6 text-slate-400">
              Phase 1 stores the charger model, schematic reference, and your fit
              judgment. A future phase can compare the uploaded schematic against the
              site photos with AI, but this current step should still be treated as an
              early screening layer only.
            </p>
          </div>

          <div className="rounded-[1.75rem] border border-amber-400/20 bg-amber-400/5 p-5 md:col-span-2">
            <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
              <div className="max-w-2xl">
                <p className="text-sm uppercase tracking-[0.25em] text-amber-300">
                  Project Workflow Tracker
                </p>
                <p className="mt-3 text-sm leading-7 text-slate-300">
                  Use this block to keep one site moving through Jetizon&apos;s process
                  instead of treating the assessment like a one-time form. Reopen the
                  same site later, update the checklist, and move it toward submission
                  or agency follow-up.
                </p>
              </div>
              {currentProjectId && (
                <div className="rounded-2xl border border-white/10 bg-slate-950/40 px-4 py-3 text-xs uppercase tracking-[0.22em] text-amber-200">
                  Active project loaded
                </div>
              )}
            </div>

            <div className="mt-6 grid gap-4 md:grid-cols-2">
              <label className="text-sm text-slate-300">
                <span className="mb-2 block font-medium text-white">Current stage</span>
                <select
                  value={workflowStage}
                  onChange={(event) =>
                    setWorkflowStage(event.target.value as WorkflowStage)
                  }
                  className="w-full rounded-2xl border border-white/10 bg-slate-950/60 px-4 py-3 text-white outline-none transition focus:border-amber-300"
                >
                  <option value="lead">Lead</option>
                  <option value="pre-assessment-started">Pre-assessment started</option>
                  <option value="waiting-on-owner">Waiting on owner info</option>
                  <option value="waiting-on-photos-docs">Waiting on photos/docs</option>
                  <option value="pre-assessment-complete">Pre-assessment complete</option>
                  <option value="partner-review">Partner review</option>
                  <option value="fdny-review-needed">FDNY review needed</option>
                  <option value="dob-review-needed">DOB review needed</option>
                  <option value="ready-to-submit">Ready to submit</option>
                  <option value="submitted">Submitted</option>
                  <option value="waiting-on-agency">Waiting on agency confirmation</option>
                  <option value="approved">Approved</option>
                  <option value="stopped-archived">Stopped / archived</option>
                </select>
              </label>

              <label className="text-sm text-slate-300">
                <span className="mb-2 block font-medium text-white">Next follow-up</span>
                <input
                  type="date"
                  value={nextFollowUpDate}
                  onChange={(event) => setNextFollowUpDate(event.target.value)}
                  className="w-full rounded-2xl border border-white/10 bg-slate-950/60 px-4 py-3 text-white outline-none transition focus:border-amber-300"
                />
              </label>
            </div>

            <div className="mt-6 grid gap-3 md:grid-cols-2">
              {[
                {
                  label: "Owner / decision-maker confirmed",
                  checked: ownerDecisionMakerConfirmed,
                  onChange: setOwnerDecisionMakerConfirmed,
                },
                {
                  label: "Photos and docs received",
                  checked: photosAndDocsReceived,
                  onChange: setPhotosAndDocsReceived,
                },
                {
                  label: "Proposal / scope accepted",
                  checked: proposalAccepted,
                  onChange: setProposalAccepted,
                },
                {
                  label: "Vendor or partner selected",
                  checked: vendorOrPartnerSelected,
                  onChange: setVendorOrPartnerSelected,
                },
                {
                  label: "Required submission docs ready",
                  checked: requiredDocsReady,
                  onChange: setRequiredDocsReady,
                },
              ].map((item) => (
                <label
                  key={item.label}
                  className="flex items-center gap-3 rounded-2xl border border-white/10 bg-slate-950/40 px-4 py-3 text-sm text-slate-200"
                >
                  <input
                    type="checkbox"
                    checked={item.checked}
                    onChange={(event) => item.onChange(event.target.checked)}
                    className="h-4 w-4 rounded border-white/20 bg-slate-950/60 text-amber-300 focus:ring-amber-300"
                  />
                  <span>{item.label}</span>
                </label>
              ))}
            </div>

            <div className="mt-6 grid gap-4 md:grid-cols-3">
              <label className="text-sm text-slate-300">
                <span className="mb-2 block font-medium text-white">FDNY tracking</span>
                <select
                  value={fdnyStatus}
                  onChange={(event) => setFdnyStatus(event.target.value as AgencyStatus)}
                  className="w-full rounded-2xl border border-white/10 bg-slate-950/60 px-4 py-3 text-white outline-none transition focus:border-amber-300"
                >
                  <option value="not-needed">Not needed</option>
                  <option value="not-started">Not started</option>
                  <option value="in-progress">In progress</option>
                  <option value="submitted">Submitted</option>
                  <option value="waiting-on-confirmation">Waiting on confirmation</option>
                  <option value="confirmed">Confirmed</option>
                </select>
              </label>

              <label className="text-sm text-slate-300">
                <span className="mb-2 block font-medium text-white">DOB tracking</span>
                <select
                  value={dobStatus}
                  onChange={(event) => setDobStatus(event.target.value as AgencyStatus)}
                  className="w-full rounded-2xl border border-white/10 bg-slate-950/60 px-4 py-3 text-white outline-none transition focus:border-amber-300"
                >
                  <option value="not-needed">Not needed</option>
                  <option value="not-started">Not started</option>
                  <option value="in-progress">In progress</option>
                  <option value="submitted">Submitted</option>
                  <option value="waiting-on-confirmation">Waiting on confirmation</option>
                  <option value="confirmed">Confirmed</option>
                </select>
              </label>

              <label className="text-sm text-slate-300">
                <span className="mb-2 block font-medium text-white">DOT tracking</span>
                <select
                  value={dotStatus}
                  onChange={(event) => setDotStatus(event.target.value as AgencyStatus)}
                  className="w-full rounded-2xl border border-white/10 bg-slate-950/60 px-4 py-3 text-white outline-none transition focus:border-amber-300"
                >
                  <option value="not-needed">Not needed</option>
                  <option value="not-started">Not started</option>
                  <option value="in-progress">In progress</option>
                  <option value="submitted">Submitted</option>
                  <option value="waiting-on-confirmation">Waiting on confirmation</option>
                  <option value="confirmed">Confirmed</option>
                </select>
              </label>

              <label className="text-sm text-slate-300 md:col-span-3">
                <span className="mb-2 block font-medium text-white">Workflow notes</span>
                <textarea
                  value={workflowNotes}
                  onChange={(event) => setWorkflowNotes(event.target.value)}
                  rows={4}
                  className="w-full rounded-2xl border border-white/10 bg-slate-950/60 px-4 py-3 text-white outline-none transition focus:border-amber-300"
                  placeholder="Waiting on property manager signature, FDNY path identified, electrician selected, or follow-up timing..."
                />
              </label>
            </div>

            <div className="mt-6 grid gap-4 md:grid-cols-2">
              <div
                className={`rounded-2xl border p-4 ${
                  readyToSubmit
                    ? "border-emerald-400/30 bg-emerald-400/10 text-emerald-100"
                    : "border-amber-400/25 bg-amber-400/10 text-amber-100"
                }`}
              >
                <p className="text-sm font-semibold text-white">Readiness</p>
                <p className="mt-2 text-sm leading-7">{workflowSummary}</p>
                <p className="mt-3 text-xs uppercase tracking-[0.22em] text-white/80">
                  Stage: {workflowStageLabel(workflowStage)}
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-slate-950/40 p-4">
                <p className="text-sm font-semibold text-white">Still missing</p>
                {workflowChecklistMissing.length > 0 ? (
                  <ul className="mt-2 space-y-2 text-sm leading-7 text-slate-300">
                    {workflowChecklistMissing.map((item) => (
                      <li key={item}>- {item}</li>
                    ))}
                  </ul>
                ) : (
                  <p className="mt-2 text-sm leading-7 text-slate-300">
                    No major workflow blockers are currently flagged.
                  </p>
                )}
              </div>
            </div>
          </div>

          <div className="rounded-[1.75rem] border border-lime-400/20 bg-lime-400/5 p-5 md:col-span-2">
            <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
              <div className="max-w-2xl">
                <p className="text-sm uppercase tracking-[0.25em] text-lime-400">
                  AI photo analysis
                </p>
                <p className="mt-3 text-sm leading-7 text-slate-300">
                  Upload labeled site photos to get an AI-assisted visible-condition
                  screening layer. If you do not have photos yet, Jetizon will still
                  return a site-based fallback read from the current form inputs.
                </p>
              </div>
              <button
                type="button"
                onClick={handleAnalyzePhotos}
                disabled={isAnalyzing}
                className="rounded-2xl bg-lime-400 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:scale-[1.01] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isAnalyzing ? "Analyzing..." : "Analyze Site Photos"}
              </button>
            </div>

            <div className="mt-6 grid gap-4 md:grid-cols-2">
              {photoFieldConfig.map((photoField) => (
                <label key={photoField.key} className="text-sm text-slate-300">
                  <span className="mb-2 block font-medium text-white">{photoField.label}</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(event) =>
                      handlePhotoChange(
                        photoField.key,
                        photoField.label,
                        event.target.files?.[0],
                      )
                    }
                    className="block w-full rounded-2xl border border-dashed border-white/15 bg-slate-950/60 px-4 py-3 text-sm text-slate-300 file:mr-4 file:rounded-xl file:border-0 file:bg-white/10 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-white"
                  />
                  {selectedPhotos[photoField.key] && (
                    <p className="mt-2 text-xs leading-6 text-lime-300">
                      Selected: {selectedPhotos[photoField.key]?.file.name}
                    </p>
                  )}
                </label>
              ))}
            </div>

            <p className="mt-4 text-xs leading-6 text-slate-400">
              This review is based on submitted photos when available and falls back
              to a site-data read when no photos are uploaded. It does not confirm
              electrical capacity, permit approval, or final project feasibility.
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-5 md:space-y-6">
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
          <p className="mt-4 text-sm leading-7 text-slate-300">{finalRecommendation}</p>
          {visualScore && (
            <div className={`mt-6 rounded-2xl border p-4 ${scoreClass(visualScore)}`}>
              <p className="text-sm font-semibold">AI visible-condition signal</p>
              <p className="mt-2 text-sm leading-7">
                The uploaded photos were screened as <strong>{visualScore}</strong>.
              </p>
            </div>
          )}
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
          <div className="mt-6 hidden flex-wrap gap-3 md:flex">
            <button
              type="button"
              onClick={handleSaveAssessment}
              className="rounded-2xl bg-lime-400 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:scale-[1.01]"
            >
              Save Assessment
            </button>
            <button
              type="button"
              onClick={() => handleDownloadAssessment()}
              className="rounded-2xl border border-white/15 bg-white/5 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
            >
              Download Summary
            </button>
          </div>
          {saveMessage && (
            <p className="mt-3 text-xs leading-6 text-lime-300">{saveMessage}</p>
          )}
        </div>

        <div className="rounded-[2rem] border border-white/10 bg-white/5 p-6 shadow-2xl backdrop-blur">
          <p className="text-sm uppercase tracking-[0.3em] text-lime-400">
            Auto-fill drafts
          </p>
          <p className="mt-3 text-sm leading-7 text-slate-300">
            Use the current onsite assessment to generate first-draft Jetizon documents
            without retyping the same site details.
          </p>
          <div className="mt-5 space-y-4">
            {documentDrafts.map((draft) => (
              <div
                key={draft.title}
                className="rounded-2xl border border-white/10 bg-slate-950/40 p-4"
              >
                <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                  <div className="max-w-2xl">
                    <p className="font-semibold text-white">{draft.title}</p>
                    <p className="mt-1 text-sm leading-7 text-slate-300">
                      {draft.description}
                    </p>
                    <p className="mt-2 text-sm leading-7 text-slate-400">
                      {draft.preview}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => downloadTextFile(draft.fileName, draft.content)}
                    className="rounded-2xl border border-white/15 bg-white/5 px-4 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
                  >
                    Download Draft
                  </button>
                </div>
              </div>
            ))}
          </div>
          {missingInfo.length > 0 && (
            <div className="mt-5 rounded-2xl border border-amber-400/25 bg-amber-400/10 p-4 text-sm leading-7 text-amber-100">
              <p className="font-semibold text-white">Still missing for stronger drafts</p>
              <ul className="mt-2 space-y-2">
                {missingInfo.map((item) => (
                  <li key={item}>- {item}</li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {(analysis || analysisError) && (
          <div className="rounded-[2rem] border border-white/10 bg-white/5 p-6 shadow-2xl backdrop-blur">
            <p className="text-sm uppercase tracking-[0.3em] text-lime-400">
              AI photo findings
            </p>

            {analysisError && (
              <div className="mt-4 rounded-2xl border border-rose-400/30 bg-rose-400/10 p-4 text-sm leading-7 text-rose-200">
                {analysisError}
              </div>
            )}

            {analysis && (
              <div className="mt-4 space-y-5 text-sm text-slate-300">
                <div className={`rounded-2xl border p-4 ${scoreClass(analysis.visual_score)}`}>
                  <p className="text-sm font-semibold text-white">Visual score</p>
                  <p className="mt-2">
                    <strong>{analysis.visual_score}</strong> based on visible site
                    conditions.
                  </p>
                </div>

                <div className="rounded-2xl border border-white/10 bg-slate-950/40 p-4">
                  <p className="font-semibold text-white">Site context guess</p>
                  <p className="mt-2 leading-7">{analysis.site_context}</p>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="rounded-2xl border border-white/10 bg-slate-950/40 p-4">
                    <p className="font-semibold text-white">Visible positives</p>
                    <ul className="mt-3 space-y-2 leading-7">
                      {analysis.visible_positives.map((item) => (
                        <li key={item}>- {item}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="rounded-2xl border border-white/10 bg-slate-950/40 p-4">
                    <p className="font-semibold text-white">Visible concerns</p>
                    <ul className="mt-3 space-y-2 leading-7">
                      {analysis.visible_concerns.map((item) => (
                        <li key={item}>- {item}</li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="rounded-2xl border border-white/10 bg-slate-950/40 p-4">
                  <p className="font-semibold text-white">Suggested use case</p>
                  <p className="mt-2 leading-7">{analysis.suggested_use_case}</p>
                  <p className="mt-3 text-xs uppercase tracking-[0.22em] text-lime-300">
                    Likely complexity: {analysis.likely_complexity}
                  </p>
                </div>

                <div className="rounded-2xl border border-white/10 bg-slate-950/40 p-4">
                  <p className="font-semibold text-white">Agency warning</p>
                  <p className="mt-2 leading-7">{analysis.agency_warning}</p>
                </div>

                <div className="rounded-2xl border border-lime-400/20 bg-lime-400/5 p-4">
                  <p className="font-semibold text-white">AI next step</p>
                  <p className="mt-2 leading-7">{analysis.next_step}</p>
                  <p className="mt-3 text-xs leading-6 text-slate-400">
                    {analysis.confidence_note}
                  </p>
                </div>
              </div>
            )}
          </div>
        )}

        <div className="grid gap-4 sm:grid-cols-2">
          {[
            ["Project type", projectScore],
            ["Site control", siteControlScore],
            ["Location type", locationScore],
            ["Bird's-eye review", aerialScore || "Yellow"],
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
              {currentProjectId && (
                <p className="mt-2 text-xs uppercase tracking-[0.22em] text-amber-300">
                  Working on saved project
                </p>
              )}
              <p className="mt-2">
                <span className="font-medium text-white">Site:</span>{" "}
                {siteName || "Not entered"}
              </p>
              <p className="mt-1">
                <span className="font-medium text-white">Address:</span>{" "}
                {siteAddress || "Not entered"}
              </p>
              {aerialReviewStatus !== "Not started" && (
                <>
                  <p className="mt-2">
                    <span className="font-medium text-white">Bird&apos;s-eye:</span>{" "}
                    {aerialSiteContext}
                  </p>
                  <p className="mt-1">
                    <span className="font-medium text-white">Aerial summary:</span>{" "}
                    {aerialSummary}
                  </p>
                </>
              )}
              {onsiteNotes && (
                <p className="mt-2">
                  <span className="font-medium text-white">Notes:</span> {onsiteNotes}
                </p>
              )}
              {fitResult !== "not-started" && (
                <>
                  <p className="mt-2">
                    <span className="font-medium text-white">Station fit:</span>{" "}
                    {fitSummary}
                  </p>
                  {stationModel && (
                    <p className="mt-1">
                      <span className="font-medium text-white">Model:</span> {stationModel}
                    </p>
                  )}
                </>
              )}
              <p className="mt-2">
                <span className="font-medium text-white">Workflow stage:</span>{" "}
                {workflowStageLabel(workflowStage)}
              </p>
              <p className="mt-1">
                <span className="font-medium text-white">Readiness:</span>{" "}
                {workflowSummary}
              </p>
            </div>
          )}
        </div>

        {savedAssessments.length > 0 && (
          <div className="rounded-[2rem] border border-white/10 bg-white/5 p-6 shadow-2xl backdrop-blur">
            <p className="text-sm uppercase tracking-[0.3em] text-lime-400">
              Saved assessments
            </p>
            <div className="mt-4 space-y-4">
              {savedAssessments.map((assessment) => (
                <div
                  key={assessment.id}
                  className="rounded-2xl border border-white/10 bg-slate-950/40 p-4"
                >
                  <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                    <div>
                      <p className="font-semibold text-white">{assessment.siteName}</p>
                      <p className="mt-1 text-sm text-slate-300">{assessment.siteAddress}</p>
                      <p className="mt-2 text-xs uppercase tracking-[0.22em] text-lime-300">
                        Saved {new Date(assessment.savedAt).toLocaleString()}
                      </p>
                      <p className="mt-2 text-xs uppercase tracking-[0.22em] text-amber-300">
                        {workflowStageLabel(assessment.workflow?.stage || "lead")}
                      </p>
                      <p className="mt-2 text-sm text-slate-300">
                        {assessment.aerialReview.siteContext}
                      </p>
                      {assessment.fitReview.result !== "not-started" && (
                        <p className="mt-1 text-sm text-slate-300">
                          {assessment.fitReview.summary}
                        </p>
                      )}
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <span
                        className={`rounded-full px-3 py-2 text-xs font-semibold ${badgeClass(
                          assessment.visualScore
                            ? strongestScore(assessment.overall, assessment.visualScore)
                            : assessment.aerialReview.score
                              ? assessment.overall
                              : assessment.overall,
                        )}`}
                      >
                        {assessment.overall}
                        {assessment.visualScore ? ` / ${assessment.visualScore}` : ""}
                      </span>
                      <button
                        type="button"
                        onClick={() => handleLoadAssessment(assessment)}
                        className="rounded-full border border-amber-300/20 bg-amber-300/10 px-3 py-2 text-xs font-semibold text-amber-100 transition hover:bg-amber-300/20"
                      >
                        Load
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDownloadAssessment(assessment)}
                        className="rounded-full border border-white/15 bg-white/5 px-3 py-2 text-xs font-semibold text-white transition hover:bg-white/10"
                      >
                        Download
                      </button>
                    </div>
                  </div>
                  <p className="mt-3 text-sm leading-7 text-slate-300">
                    {assessment.bestFitUseCase}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-white/10 bg-slate-950/95 px-4 pb-[calc(env(safe-area-inset-bottom)+1rem)] pt-3 backdrop-blur md:hidden">
        <div className="mx-auto flex max-w-7xl gap-3">
          <button
            type="button"
            onClick={handleSaveAssessment}
            className="flex-1 rounded-2xl bg-lime-400 px-4 py-3 text-sm font-semibold text-slate-950 transition active:scale-[0.99]"
          >
            Save
          </button>
          <button
            type="button"
            onClick={() => handleDownloadAssessment()}
            className="flex-1 rounded-2xl border border-white/15 bg-white/5 px-4 py-3 text-sm font-semibold text-white transition active:scale-[0.99]"
          >
            Download
          </button>
        </div>
      </div>
    </div>
  );
}
