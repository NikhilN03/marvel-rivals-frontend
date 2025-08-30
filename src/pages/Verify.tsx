// src/pages/Verify.tsx
import { useRef, useState } from "react";
import { Link } from "react-router-dom";

const CODE_LEN = 6;

export default function Verify() {
  const [digits, setDigits] = useState<string[]>(Array(CODE_LEN).fill(""));
  const inputsRef = useRef<Array<HTMLInputElement | null>>([]);

  const value = digits.join("");
  const isComplete = value.length === CODE_LEN && digits.every((d) => d !== "");

  const focusIndex = (i: number) => inputsRef.current[i]?.focus();

  const handleChange = (i: number, v: string) => {
    const only = v.replace(/\D/g, "").slice(0, 1);
    if (!only) return;
    const next = [...digits];
    next[i] = only;
    setDigits(next);
    if (i < CODE_LEN - 1) focusIndex(i + 1);
  };

  const handleKeyDown = (i: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace") {
      e.preventDefault();
      if (digits[i]) {
        const next = [...digits];
        next[i] = "";
        setDigits(next);
      } else if (i > 0) {
        const prev = [...digits];
        prev[i - 1] = "";
        setDigits(prev);
        focusIndex(i - 1);
      }
    } else if (e.key === "ArrowLeft" && i > 0) {
      focusIndex(i - 1);
    } else if (e.key === "ArrowRight" && i < CODE_LEN - 1) {
      focusIndex(i + 1);
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    const text = e.clipboardData.getData("text").replace(/\D/g, "");
    if (!text) return;
    e.preventDefault();
    const arr = Array(CODE_LEN)
      .fill("")
      .map((_, idx) => text[idx] ?? "");
    setDigits(arr);
    const last = Math.min(text.length, CODE_LEN) - 1;
    focusIndex(last >= 0 ? last : 0);
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isComplete) return;
    // TODO: wire to Cognito confirm sign-up
    alert(`(demo) verifying code: ${value}`);
  };

  const resend = (e: React.MouseEvent) => {
    e.preventDefault();
    // TODO: wire to resend code
    alert("(demo) code resent");
  };

  return (
    <div className="w-full px-4 py-10">
      <div className="mx-auto max-w-md">
        <div className="rounded-2xl border border-gray-800 bg-gray-950/85 p-6 shadow-2xl backdrop-blur">
          <h1 className="text-2xl font-semibold text-gray-100">Verify Your Code</h1>
          <p className="mt-2 text-sm text-gray-400">
            Enter the 6-digit code sent to your email. This code is valid for the next 10 minutes.
          </p>

          <form onSubmit={submit} className="mt-5 space-y-5">
            <div className="flex justify-between gap-2">
              {digits.map((d, i) => (
              <input
                key={i}
                ref={(el: HTMLInputElement | null) => { inputsRef.current[i] = el; }}
                value={d}
                onChange={(e) => handleChange(i, e.target.value)}
                onKeyDown={(e) => handleKeyDown(i, e)}
                onPaste={i === 0 ? handlePaste : undefined}
                inputMode="numeric"
                pattern="\d*"
                maxLength={1}
                className="h-12 w-12 rounded-lg border border-gray-800 bg-gray-900/70 text-center text-lg text-gray-100 outline-none focus:ring-2 focus:ring-violet-500"
              />
            ))}
            </div>

            <button
              type="submit"
              disabled={!isComplete}
              className="inline-flex w-full items-center justify-center rounded-md bg-violet-500 px-4 py-2 font-medium text-white hover:bg-violet-600 disabled:cursor-not-allowed disabled:opacity-60"
            >
              Confirm
            </button>

            <div className="text-center text-sm text-gray-400">
              Didn&apos;t get the code?{" "}
              <a href="#" onClick={resend} className="text-violet-400 hover:underline">
                Resend code
              </a>
            </div>
          </form>

          <div className="mt-4 text-center text-xs text-gray-500">
            <span>Back to </span>
            <Link to="/signup" className="text-gray-300 hover:underline">
              Sign up
            </Link>
            <span> or </span>
            <Link to="/login" className="text-gray-300 hover:underline">
              Log in
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
