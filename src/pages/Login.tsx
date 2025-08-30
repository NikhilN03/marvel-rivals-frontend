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
function LockIcon(props: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={props.className ?? "h-5 w-5"}>
      <rect x="4" y="10" width="16" height="10" rx="2" className="stroke-current" strokeWidth="1.5" />
      <path d="M8 10V7a4 4 0 1 1 8 0v3" className="stroke-current" strokeWidth="1.5" />
    </svg>
  );
}

export default function Login() {
  const [username, setUsername] = useState("");
  const [pw, setPw] = useState("");

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // hook to Cognito later
    alert(`(demo) logging in as ${username}`);
  };

  return (
    <div className="w-full px-4 py-10">
      {/* center the card under the fixed NavBar */}
      <div className="mx-auto max-w-md">
        <div className="rounded-2xl border border-gray-800 bg-gray-950/80 p-6 shadow-2xl backdrop-blur">
          <h1 className="mb-4 text-center text-2xl font-semibold text-gray-100">Login</h1>

          <form onSubmit={onSubmit} className="space-y-4">
            <div className="relative">
              <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                <UserIcon />
              </span>
              <input
                type="text"
                placeholder="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full rounded-full border border-gray-800 bg-gray-900/70 py-2 pl-10 pr-4 text-sm text-gray-200 placeholder-gray-500 outline-none focus:ring-2 focus:ring-brand"
              />
            </div>

            <div className="relative">
              <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                <LockIcon />
              </span>
              <input
                type="password"
                placeholder="Password"
                value={pw}
                onChange={(e) => setPw(e.target.value)}
                className="w-full rounded-full border border-gray-800 bg-gray-900/70 py-2 pl-10 pr-4 text-sm text-gray-200 placeholder-gray-500 outline-none focus:ring-2 focus:ring-brand"
              />
            </div>

            <div className="flex justify-end text-xs">
              <a href="#" className="text-gray-400 hover:text-brand">
                Forgot Password?
              </a>
            </div>

            <button
              type="submit"
              className="mt-2 w-full rounded-full bg-brand px-4 py-2 font-medium text-white hover:bg-brand-dark"
            >
              Log in
            </button>
          </form>

          <p className="mt-4 text-center text-sm text-gray-400">
            Don&apos;t have an account?{" "}
            <Link to="/signup" className="font-medium text-brand hover:underline">
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
