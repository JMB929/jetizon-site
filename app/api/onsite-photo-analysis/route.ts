import { NextRequest, NextResponse } from "next/server";

type PhotoInput = {
  label: string;
  dataUrl: string;
  fileName: string;
};

type AnalysisRequestBody = {
  siteName?: string;
  siteAddress?: string;
  hostType?: string;
  projectType?: string;
  locationType?: string;
  hostCommitment?: string;
  productReadiness?: string;
  complexity?: string;
  existingParking?: string;
  onsiteNotes?: string;
  photos?: PhotoInput[];
};

function extractJsonObject(text: string) {
  const start = text.indexOf("{");
  const end = text.lastIndexOf("}");

  if (start === -1 || end === -1 || end <= start) {
    throw new Error("No JSON object found in model output.");
  }

  return text.slice(start, end + 1);
}

function extractOutputText(response: Record<string, unknown>) {
  const output = Array.isArray(response.output) ? response.output : [];

  for (const item of output) {
    if (!item || typeof item !== "object") continue;

    const content = Array.isArray((item as { content?: unknown }).content)
      ? ((item as { content: Array<Record<string, unknown>> }).content ?? [])
      : [];

    for (const part of content) {
      if (part?.type === "output_text" && typeof part.text === "string") {
        return part.text;
      }
    }
  }

  return null;
}

export async function POST(request: NextRequest) {
  const apiKey = process.env.OPENAI_API_KEY;

  if (!apiKey) {
    return NextResponse.json(
      {
        error:
          "AI photo analysis is not configured yet. Add OPENAI_API_KEY to Vercel before using this feature.",
      },
      { status: 503 },
    );
  }

  let body: AnalysisRequestBody;

  try {
    body = (await request.json()) as AnalysisRequestBody;
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const photos = Array.isArray(body.photos) ? body.photos.filter(Boolean) : [];

  if (photos.length === 0) {
    return NextResponse.json(
      { error: "At least one labeled site photo is required." },
      { status: 400 },
    );
  }

  const model = process.env.OPENAI_VISION_MODEL || "gpt-5.4";

  const prompt = [
    "You are helping Jetizon perform an early-stage visible-condition site screening for micromobility or charging infrastructure.",
    "You must only assess what is visible in the submitted photos and the provided site notes.",
    "Do not claim final feasibility, permit approval, electrical capacity, or guaranteed installation outcome.",
    "Return only valid JSON with this exact shape:",
    JSON.stringify(
      {
        site_context: "private property | private property with layout questions | public-space adjacent",
        visual_score: "Green | Yellow | Red",
        visible_positives: ["string"],
        visible_concerns: ["string"],
        suggested_use_case:
          "secure bike parking | secure e-scooter parking | simple charging access | cabinet/rack candidate | too complex for early deployment",
        likely_complexity: "Low | Moderate | High",
        agency_warning:
          "short note about likely visible DOB/FDNY/DOT risk based only on visible conditions",
        next_step: "single concise next-step recommendation",
        confidence_note: "short sentence about what is visible vs unknown",
      },
      null,
      2,
    ),
    "Provided context:",
    JSON.stringify(
      {
        siteName: body.siteName || "Not provided",
        siteAddress: body.siteAddress || "Not provided",
        hostType: body.hostType || "Not provided",
        projectType: body.projectType || "Not provided",
        locationType: body.locationType || "Not provided",
        hostCommitment: body.hostCommitment || "Not provided",
        productReadiness: body.productReadiness || "Not provided",
        complexity: body.complexity || "Not provided",
        existingParking: body.existingParking || "Not provided",
        onsiteNotes: body.onsiteNotes || "None",
        photoLabels: photos.map((photo) => ({
          label: photo.label,
          fileName: photo.fileName,
        })),
      },
      null,
      2,
    ),
  ].join("\n\n");

  const input = [
    {
      role: "user",
      content: [
        { type: "input_text", text: prompt },
        ...photos.map((photo) => ({
          type: "input_image",
          image_url: photo.dataUrl,
        })),
      ],
    },
  ];

  const openAiResponse = await fetch("https://api.openai.com/v1/responses", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model,
      input,
    }),
  });

  if (!openAiResponse.ok) {
    const errorText = await openAiResponse.text();
    return NextResponse.json(
      {
        error: `OpenAI analysis failed: ${errorText}`,
      },
      { status: 502 },
    );
  }

  const responseJson = (await openAiResponse.json()) as Record<string, unknown>;
  const outputText = extractOutputText(responseJson);

  if (!outputText) {
    return NextResponse.json(
      { error: "OpenAI analysis returned no readable text output." },
      { status: 502 },
    );
  }

  try {
    const parsed = JSON.parse(extractJsonObject(outputText));
    return NextResponse.json({
      analysis: parsed,
      model,
    });
  } catch {
    return NextResponse.json(
      {
        error: "OpenAI analysis returned an unreadable JSON payload.",
        raw: outputText,
      },
      { status: 502 },
    );
  }
}
