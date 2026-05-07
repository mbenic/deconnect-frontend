import { useMemo, useState, useEffect, useContext } from "react";
import { CITIES, EXPERIENCE } from "../data/formOptions";
import DevCard from "../components/DevCard";
import { API_URL } from "../config";


import { ChoicesContext } from "../context/ChoicesContext";

/* mock data (replace with API later) */
const mockDevs = [
  {
    id: 1,
    name: "Maria Benic",
    level: "Mid-level",
    city: "Perth",
    about: "Frontend developer focused on React and UI systems.",
    skills: ["HTML/CSS", "JavaScript", "React", "PHP", "Laravel"],
    availability: "Part-time Only",
  },
  {
    id: 2,
    name: "John Smith",
    level: "Junior",
    city: "Melbourne",
    about: "Full-stack dev learning modern web stacks.",
    skills: ["HTML/CSS", "JavaScript"],
    availability: "Full-time",
  },
];

export default function BrowseDevs() {
  const [level, setLevel] = useState("All");
  const [city, setCity] = useState("All");

  const [devs, setDevs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const choices = useContext(ChoicesContext);

useEffect(() => {
  const fetchDevs = async () => {
    setLoading(true);
    setError(null);
    

    try {
      let url = `${API_URL}/devs/`;

      const params = new URLSearchParams();

      if (level !== "All") params.append("level", level);
      if (city !== "All") params.append("city", city);

      // attach params to URL
      if ([...params].length > 0) {
        url += `?${params.toString()}`;
      }

      const res = await fetch(url);

      if (!res.ok) {
        throw new Error("Failed to fetch developers");
      }

      const data = await res.json();

      setDevs(data);
    } catch (err) {
      console.error(err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  fetchDevs();
}, [level, city]);


  // const filteredDevs = useMemo(() => {
  //   return devs.filter((dev) => {
  //     const levelMatch = level === "All" || dev.level_display === level;
  //     const cityMatch = city === "All" || dev.city_display === city;
       
  //     return levelMatch && cityMatch;
  //   });
  // }, [level, city]);

  const filteredDevs= devs // for testing - to show all devs regardless of filters. Remove when API supports filtering.

  return (
    <main className="bg-surface pb-24 pt-12 md:pt-16">
      <div className="mx-auto max-w-[1320px] px-5 md:px-10">
        
        {/* HEADER (consistent spacing with other pages) */}
        <div className="mb-10 md:mb-12">
          <h1 className="font-heading text-[40px] sm:text-[52px] md:text-[64px] font-semibold tracking-[-0.025em] leading-[1.02] text-foreground">
            Browse developers & designers
          </h1>
          <p className="mt-4 text-[17px] text-muted-foreground max-w-[520px]">
            Find vetted talent ready to build your next project.
          </p>
        </div>

        {/* FILTERS */}
        <div className="mb-10 space-y-4 border-b border-border pb-8">
          {/* you can filter on the frontend, but for your app, you really shouldn’t rely on it long-term.*/}
          <FilterGroup label="Level">
              {[{ id: "All", name: "All" }, ...choices.levels].map((lev) => (
              <FilterButton
                key={lev.id}
                active={level === lev.id}
                onClick={() => setLevel(lev.id)}
              >
                {lev.name}
              </FilterButton>
            ))}
          </FilterGroup>

          <FilterGroup label="City">
              {[{ id: "All", name: "All" }, ...choices.city].map((c) => (
             
              <FilterButton
                key={c.id}
                active={city === c.id}
                onClick={() => setCity(c.id)}
              >
                {c.name}
              </FilterButton>
            ))}
          </FilterGroup>
        </div>

        <p className="mb-6 text-[14px] text-muted-foreground">
          {/* {filteredDevs.length} developer(s) found */}
          {devs.length} developer(s) found
        </p>

        {/* GRID */}
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filteredDevs.map((dev) => (
            <DevCard key={dev.id} dev={dev} />
          ))}
          {/* {devs.map(dev => <DevCard key={dev.id} dev={dev} />)} */}
        </div>
      </div>
    </main>
  );
}

/* ---------------- COMPONENTS ---------------- */



/* ---------------- FILTER UI ---------------- */

function FilterGroup({ label, children }) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="text-[12px] font-semibold uppercase tracking-[0.08em] text-muted-foreground w-[60px]">
        {label}
      </span>
      {children}
    </div>
  );
}

function FilterButton({ children, active, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`rounded-full px-4 py-1.5 text-[14px] font-medium border transition-all
        ${
          active
            ? "bg-primary text-primary-foreground border-primary"
            : "bg-background text-foreground border-border hover:border-primary/50"
        }`}
    >
      {children}
    </button>
  );
}