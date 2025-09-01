import img from "../assets/images/unloadedimgrivals.png";
import { useNews } from "../hooks/useNews";

type Story = {
  id: string;
  title: string;
  date: string;
  summary: string;
  link?: string;
};

export default function News() {
  const { data } = useNews();

  // Use stories from the hook, then pad up to 4 with simple placeholders
  const items = (data?.items ?? []) as Story[];
  const needed = Math.max(0, 4 - items.length);
  const placeholders: Story[] = Array.from({ length: needed }, (_, i) => ({
    id: `placeholder-${i + 1}`,
    title: "More stories coming soon",
    date: "",
    summary:
      "Check back for the latest Marvel Rivals news, updates, and community highlights.",
    link: "#",
  }));
  const stories: Story[] = [...items].slice(0, 4).concat(placeholders).slice(0, 4);

  return (
    <div className="w-full px-4 py-6">
      {/* Narrower center column */}
      <div className="mx-auto w-full max-w-3xl lg:max-w-4xl">
        <h1 className="mb-4 text-xl font-semibold text-gray-100">Recent News</h1>

        {/* Stacked cards, each taller but not full-width of screen */}
        <div className="space-y-6">
          {stories.map((s) => (
            <article
              key={s.id}
              className="overflow-hidden rounded-lg border border-gray-800 bg-gray-950 shadow-sm ring-1 ring-black/5 hover:bg-gray-900/60"
            >
              <img
                src={img}
                alt={s.title}
                className="h-72 w-full object-cover sm:h-80 md:h-96" /* taller */
                loading="lazy"
              />
              <div className="p-5">
                {s.date && <div className="text-xs text-gray-400">{s.date}</div>}
                <h2 className="mt-1 text-lg font-semibold text-gray-100">
                  <a href={s.link} className="hover:text-brand">
                    {s.title}
                  </a>
                </h2>
                <p className="mt-2 text-sm text-gray-300">{s.summary}</p>
              </div>
            </article>
          ))}
        </div>

        <p className="mt-6 text-xs text-gray-500">
          These stories are updated manually each week.
        </p>
      </div>
    </div>
  );
}
