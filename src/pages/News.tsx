import img from "../assets/images/unloadedimgrivals.png";

type Story = {
  id: string;
  title: string;
  date: string;
  summary: string;
  link?: string;
};

// Manually update these weekly
const STORIES: Story[] = [
  {
    id: "s1",
    title: "Marvel Rivals: Week in Review",
    date: "Aug 28",
    summary:
      "Top roster moves, standout plays, and meta shifts from this week’s scrims and tournaments.",
    link: "#"
  },
  {
    id: "s2",
    title: "Patch 1.0: What changed for your mains?",
    date: "Aug 27",
    summary:
      "A simple rundown of buffs/nerfs and what they mean for competitive play.",
    link: "#"
  },
  {
    id: "s3",
    title: "Community Spotlight: Rising teams to watch",
    date: "Aug 26",
    summary:
      "Five rosters making waves in scrims — who’s peaking just in time for qualifiers?",
    link: "#"
  },
  {
    id: "s4",
    title: "Esports roadmap: What’s next this season",
    date: "Aug 25",
    summary:
      "Qualifier dates, format expectations, and where to catch official broadcasts.",
    link: "#"
  }
];

export default function News() {
  return (
    <div className="w-full px-4 py-6">
      {/* Narrower center column */}
      <div className="mx-auto w-full max-w-3xl lg:max-w-4xl">
        <h1 className="mb-4 text-xl font-semibold text-gray-100">Recent News</h1>

        {/* Stacked cards, each taller but not full-width of screen */}
        <div className="space-y-6">
          {STORIES.map((s) => (
            <article
              key={s.id}
              className="overflow-hidden rounded-lg border border-gray-800 bg-gray-950 shadow-sm ring-1 ring-black/5 hover:bg-gray-900/60"
            >
              <img
                src={img}
                alt={s.title}
                className="h-72 w-full object-cover sm:h-80 md:h-96"  /* taller */
                loading="lazy"
              />
              <div className="p-5">
                <div className="text-xs text-gray-400">{s.date}</div>
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
