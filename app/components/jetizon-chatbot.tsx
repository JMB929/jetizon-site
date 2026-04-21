"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

const cannedResponses = [
  {
    keywords: ["cost", "price", "pricing", "expensive"],
    answer:
      "For many New York style sites, Level 2 charging often ranges from about $8,000 to $25,000 per port before incentives. Final cost depends on electrical capacity, trenching, permits, and site layout.",
  },
  {
    keywords: ["roi", "return", "payback"],
    answer:
      "ROI depends mostly on utilization, incentives, and site complexity. For a straightforward Level 2 site with incentives and real usage, rough payback is often around 3 to 7 years.",
  },
  {
    keywords: ["architect", "engineer", "contractor", "plans"],
    answer:
      "Most prospects do not need an architect just to explore the opportunity. A qualified electrical contractor is usually the first technical professional needed once the site moves past early screening.",
  },
  {
    keywords: ["rebate", "incentive", "nyserda", "con ed", "coned", "utility"],
    answer:
      "Jetizon can help screen likely incentive paths, including New York style rebate programs and utility support where applicable. Final eligibility depends on the site and current program rules.",
  },
  {
    keywords: ["pre-assessment", "assessment", "upload", "photos", "site"],
    answer:
      "The best next step is the pre-assessment form. You can share site details, photos, and supporting documents so Jetizon can screen whether the location looks worth evaluating further.",
  },
];

type Message = {
  role: "assistant" | "user";
  content: string;
};

export default function JetizonChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content:
        "Ask about EV charging costs, ROI, incentives, pre-assessment, or what kind of contractor a project might need.",
    },
  ]);

  const quickPrompts = useMemo(
    () => [
      "How much does Level 2 charging cost?",
      "Do I need an architect?",
      "What kind of ROI is realistic?",
      "How do incentives help?",
    ],
    []
  );

  const respond = (prompt: string) => {
    const normalized = prompt.toLowerCase();
    const match = cannedResponses.find((entry) =>
      entry.keywords.some((keyword) => normalized.includes(keyword))
    );

    return (
      match?.answer ??
      "Jetizon can help screen your site, likely costs, and incentive paths. If you want a more useful answer, the best next step is to start a pre-assessment so the project can be reviewed against the actual property."
    );
  };

  const submitPrompt = (prompt: string) => {
    const trimmed = prompt.trim();
    if (!trimmed) return;

    setMessages((current) => [
      ...current,
      { role: "user", content: trimmed },
      { role: "assistant", content: respond(trimmed) },
    ]);
    setInput("");
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {isOpen && (
        <div className="mb-4 w-[min(24rem,calc(100vw-2rem))] rounded-[1.5rem] border border-cyan-400/20 bg-slate-950/95 p-4 shadow-2xl backdrop-blur">
          <div className="mb-4 flex items-center justify-between gap-4">
            <div>
              <p className="text-sm font-semibold text-white">Ask Jetizon</p>
              <p className="text-xs text-slate-400">
                Quick answers for host-site screening
              </p>
            </div>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="rounded-full border border-white/10 px-2 py-1 text-xs text-slate-300 hover:bg-white/5"
            >
              Close
            </button>
          </div>

          <div className="max-h-80 space-y-3 overflow-y-auto pr-1">
            {messages.map((message, index) => (
              <div
                key={`${message.role}-${index}`}
                className={
                  message.role === "assistant"
                    ? "rounded-2xl bg-white/5 px-4 py-3 text-sm leading-6 text-slate-200"
                    : "ml-8 rounded-2xl bg-cyan-300 px-4 py-3 text-sm leading-6 text-slate-950"
                }
              >
                {message.content}
              </div>
            ))}
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            {quickPrompts.map((prompt) => (
              <button
                key={prompt}
                type="button"
                onClick={() => submitPrompt(prompt)}
                className="rounded-full border border-white/10 bg-white/5 px-3 py-2 text-xs text-slate-200 hover:bg-white/10"
              >
                {prompt}
              </button>
            ))}
          </div>

          <div className="mt-4 space-y-3">
            <textarea
              value={input}
              onChange={(event) => setInput(event.target.value)}
              rows={3}
              placeholder="Ask a question about costs, ROI, incentives, or site fit..."
              className="w-full rounded-2xl border border-white/10 bg-slate-900 px-4 py-3 text-sm text-white outline-none transition focus:border-cyan-400/50"
            />
            <div className="flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={() => submitPrompt(input)}
                className="rounded-2xl bg-cyan-300 px-4 py-2 text-sm font-semibold text-slate-950 transition hover:scale-[1.01]"
              >
                Ask
              </button>
              <Link
                href="/pre-assessment"
                className="text-sm font-medium text-cyan-300 underline"
              >
                Start Pre-Assessment
              </Link>
            </div>
          </div>
        </div>
      )}

      <button
        type="button"
        onClick={() => setIsOpen((current) => !current)}
        className="rounded-full border border-cyan-400/20 bg-cyan-300 px-5 py-3 text-sm font-semibold text-slate-950 shadow-xl transition hover:scale-[1.02]"
      >
        {isOpen ? "Hide Jetizon Help" : "Ask Jetizon"}
      </button>
    </div>
  );
}
