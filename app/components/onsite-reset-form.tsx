"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function OnsiteResetForm() {
  const router = useRouter();
  const [resetCode, setResetCode] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    setSuccess("");

    if (password !== confirmPassword) {
      setError("The new password and confirmation do not match.");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/onsite-auth/reset", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          resetCode,
          username,
          password,
        }),
      });

      const payload = (await response.json()) as { error?: string };

      if (!response.ok) {
        throw new Error(payload.error || "Reset failed.");
      }

      setSuccess("Credentials updated. You are signed in with the new pair.");
      router.refresh();
      router.push("/onsite-assistant");
    } catch (submitError) {
      setError(
        submitError instanceof Error ? submitError.message : "Reset failed.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="rounded-[2rem] border border-white/10 bg-white/6 p-5 shadow-2xl backdrop-blur md:p-8">
      <p className="text-sm uppercase tracking-[0.3em] text-lime-400">Reset</p>
      <h2 className="mt-3 text-2xl font-semibold">Rotate onsite credentials</h2>
      <p className="mt-3 text-sm leading-7 text-slate-300">
        Use the server reset code to replace the current onsite username and password
        with a new pair.
      </p>

      <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
        <label className="block text-sm text-slate-300">
          <span className="mb-2 block font-medium text-white">Reset code</span>
          <input
            value={resetCode}
            onChange={(event) => setResetCode(event.target.value)}
            className="w-full rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3 text-white outline-none transition focus:border-lime-400"
            autoComplete="off"
            required
          />
        </label>

        <label className="block text-sm text-slate-300">
          <span className="mb-2 block font-medium text-white">New username</span>
          <input
            value={username}
            onChange={(event) => setUsername(event.target.value)}
            className="w-full rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3 text-white outline-none transition focus:border-lime-400"
            autoComplete="username"
            required
          />
        </label>

        <label className="block text-sm text-slate-300">
          <span className="mb-2 block font-medium text-white">New password</span>
          <input
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            className="w-full rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3 text-white outline-none transition focus:border-lime-400"
            autoComplete="new-password"
            required
          />
        </label>

        <label className="block text-sm text-slate-300">
          <span className="mb-2 block font-medium text-white">
            Confirm new password
          </span>
          <input
            type="password"
            value={confirmPassword}
            onChange={(event) => setConfirmPassword(event.target.value)}
            className="w-full rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3 text-white outline-none transition focus:border-lime-400"
            autoComplete="new-password"
            required
          />
        </label>

        {error && (
          <div className="rounded-2xl border border-rose-400/30 bg-rose-400/10 p-4 text-sm leading-7 text-rose-200">
            {error}
          </div>
        )}

        {success && (
          <div className="rounded-2xl border border-lime-400/30 bg-lime-400/10 p-4 text-sm leading-7 text-lime-100">
            {success}
          </div>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full rounded-2xl bg-lime-400 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:scale-[1.01] disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isSubmitting ? "Updating..." : "Reset and sign in"}
        </button>
      </form>
    </div>
  );
}

