import { Link } from "react-router-dom";
import { useState } from "react";

function UserIcon(props: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={props.className ?? "h-5 w-5"}>
      <path className="stroke-current" strokeWidth="1.5" d="M12 12a4 4 0 1 0-4-4 4 4 0 0 0 4 4Z" />
      <path className="stroke-current" strokeWidth="1.5" d="M4 20a8 8 0 0 1 16 0" />
    </svg>
  );
}
function MailIcon(props: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={props.className ?? "h-5 w-5"}>
      <path className="stroke-current" strokeWidth="1.5" d="M3 6h18v12H3z" />
      <path className="stroke-current" strokeWidth="1.5" d="M3 7l9 6 9-6" />
    </svg>
  );
}
function LockIcon(props: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={props.className ?? "h-5 w-5"}>
      <rect x="4" y="10" width="16" height="10" rx="2" className="stroke-current" strokeWidth="1.5" />
      <path d="M8 10V7a4 4 0 1 1 8 0v3" className="stroke-current" strokeWidth="1.5" />
    </svg>
  );
}

export default function SignUp() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`(demo) create account for ${username} / ${email}`);
  };

  return (
    <div className="w-full px-4 py-10">
      <div className="mx-auto max-w-xl">
        {/* Softer/brighter card using a subtle gradient */}
        <div className="rounded-2xl border border-indigo-500/30 bg-gradient-to-b from-slate-900/70 to-indigo-900/40 p-6 shadow-xl backdrop-blur">
          <h1 className="mb-2 text-2xl font-semibold text-gray-100">Create new account</h1>
          <p className="mb-5 text-sm text-gray-400">
            Already a member?{" "}
            <Link to="/login" className="font-medium text-brand hover:underline">
              Log in
            </Link>
          </p>

          <form onSubmit={onSubmit} className="space-y-4">
            <div className="relative">
              <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                <UserIcon />
              </span>
              <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full rounded-xl border border-white/20 bg-white/90 py-2 pl-10 pr-4 text-sm text-gray-900 placeholder-gray-500 outline-none focus:ring-2 focus:ring-brand"
              />
            </div>

            <div className="relative">
              <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                <MailIcon />
              </span>
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-xl border border-white/20 bg-white/90 py-2 pl-10 pr-4 text-sm text-gray-900 placeholder-gray-500 outline-none focus:ring-2 focus:ring-brand"
              />
            </div>

            <div className="relative">
              <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                <LockIcon />
              </span>
              <input
                type="password"
                placeholder="Password"
                value={pw}
                onChange={(e) => setPw(e.target.value)}
                className="w-full rounded-xl border border-white/20 bg-white/90 py-2 pl-10 pr-4 text-sm text-gray-900 placeholder-gray-500 outline-none focus:ring-2 focus:ring-brand"
              />
            </div>

            <button
              type="submit"
              className="mt-2 w-full rounded-xl bg-brand px-4 py-2 font-medium text-white shadow hover:bg-brand-dark"
            >
              Create account
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
