import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";

export default function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100">
      <main className="mx-auto max-w-3xl p-8">
        <div className="flex items-center gap-6">
          <a href="https://vite.dev" target="_blank" rel="noreferrer">
            <img src={viteLogo} alt="Vite" className="h-14 w-14" />
          </a>
          <a href="https://react.dev" target="_blank" rel="noreferrer">
            <img src={reactLogo} alt="React" className="h-14 w-14 animate-spin" />
          </a>
        </div>

        <h1 className="mt-6 text-3xl font-semibold">
          Vite + React <span className="text-emerald-400">+ Tailwind</span>
        </h1>

        <div className="mt-4 rounded-lg border border-gray-800 bg-gray-900 p-6">
          <button
            onClick={() => setCount((c) => c + 1)}
            className="rounded-md bg-pink-600 px-4 py-2 font-medium hover:bg-pink-700"
          >
            count is {count}
          </button>
          <p className="mt-2 text-gray-400">
            Edit <code className="rounded bg-gray-800 px-1 py-0.5">src/App.tsx</code> and save to
            test HMR
          </p>
        </div>

        <p className="mt-6 text-sm text-gray-500">
          Click the logos to learn more.
        </p>
      </main>
    </div>
  );
}

