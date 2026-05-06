"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function OnsiteLoginForm({ nextPath }: { nextPath: string }) {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/onsite-auth", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      const payload = (await response.json()) as { error?: string };

      if (!response.ok) {
        throw new Error(payload.error || "Sign-in failed.");
      }

      router.push(nextPath);
      router.refresh();
    } catch (submitError) {
      setError(
        submitError instanceof Error ? submitError.message : "Sign-in failed.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="rounded-[2rem] border border-white/10 bg-white/6 p-5 shadow-2xl backdrop-blur md:p-8">
      <p className="text-sm uppercase tracking-[0.3em] text-lime-400">Sign in</p>
      <h2 className="mt-3 text-2xl font-semibold">Private onsite access</h2>
      <p className="mt-3 text-sm leading-7 text-slate-300">
        Use your Jetizon onsite credentials to continue.
      </p>

      <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
        <label className="block text-sm text-slate-300">
          <span className="mb-2 block font-medium text-white">Username</span>
          <input
            value={username}
            onChange={(event) => setUsername(event.target.value)}
            className="w-full rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3 text-white outline-none transition focus:border-lime-400"
            autoComplete="username"
            required
          />
        </label>

        <label className="block text-sm text-slate-300">
          <span className="mb-2 block font-medium text-white">Password</span>
          <input
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            className="w-full rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3 text-white outline-none transition focus:border-lime-400"
            autoComplete="current-password"
            required
          />
        </label>

        {error && (
          <div className="rounded-2xl border border-rose-400/30 bg-rose-400/10 p-4 text-sm leading-7 text-rose-200">
            {error}
          </div>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full rounded-2xl bg-lime-400 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:scale-[1.01] disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isSubmitting ? "Signing in..." : "Open onsite assistant"}
        </button>
      </form>
    </div>
  );
}
