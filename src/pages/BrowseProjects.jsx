import { useMemo, useState, useEffect, useContext } from "react";
import ProjectCard from "../components/ProjectCard";
import { INDUSTRIES, TYPES } from "../data/formOptions";
import { API_URL } from "../config";

import { ChoicesContext } from "../context/ChoicesContext";

/* mock data (replace with API later) */
const mockProjects = [
  {
    id: 1,
    title: "The Wellness App",
    author: "Maria Benic",
    city: "Perth",
    industry: "Health & Fitness",
    type: "Volunteer",
    timeline: "3_weeks",
    description: "A mobile app focused on mental wellbeing and tracking habits.",
    tech: ["HTML/CSS", "React", "Laravel", "PHP"],
  },
  {
    id: 2,
    title: "ShopEasy",
    author: "John Smith",
    city: "Melbourne",
    industry: "Ecommerce",
    type: "Paid",
    timeline: "6_weeks",
    description: "An ecommerce platform for small local businesses.",
    tech: ["React", "Node.js", "PostgreSQL"],
  },
];

// React loads filter options from API → renders buttons → uses values directly in query params


export default function BrowseProjects() {
  const [industry, setIndustry] = useState("All");
  const [type, setType] = useState("All");
  const [error, setError] = useState(null);

  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");


  const choices = useContext(ChoicesContext);


  useEffect(() => {
  const fetchProjects = async () => {
    setLoading(true);
    setError(null);

    try {
      let url = `${API_URL}/projects/`;

      const params = new URLSearchParams();

      if (industry !== "All") params.append("industries", industry);
      if (type !== "All") params.append("type", type);

      // ADD THIS
      if (search.trim()) {
        params.append("search", search.trim());
      }
   
      // attach params to URL
      if ([...params].length > 0) {
        url += `?${params.toString()}`;
      }

  
      const res = await fetch(url);

      if (!res.ok) {
        throw new Error("Failed to fetch projects");
      }

      const data = await res.json();

      setProjects(data);
    } catch (err) {
      console.error(err);
      setError(err.message);
    } finally {
      setLoading(false);
   
  
    }
  };

  fetchProjects();
}, [industry, type, search]);



// const filteredProjects = useMemo(() => {
//   return projects.filter((p) => {
//     const industryMatch = industry === "All" ||  p.industries?.some((i) => i.name === industry);
//     const typeMatch = type === "All" || p.type_display === type;

//     const query = search.toLowerCase();

//     const searchMatch =
//       p.title?.toLowerCase().includes(query) ||
//       p.description?.toLowerCase().includes(query) ||
//       p.owner?.username?.toLowerCase().includes(query) ||
//       p.skills?.some((t) => t.name.toLowerCase().includes(query));

//     return industryMatch && typeMatch && searchMatch;
 
//   });
// }, [industry, type, search]);

const filteredProjects = projects;

  return (
    <main className="bg-surface pb-24 pt-12 md:pt-16">
      <div className="mx-auto max-w-[1320px] px-5 md:px-10">

        {/* HEADER (consistent with other pages) */}
        <div className="mb-10 md:mb-12">
          <h1 className="font-heading text-[40px] sm:text-[52px] md:text-[64px] font-semibold tracking-[-0.025em] leading-[1.02] text-foreground">
            Browse projects
          </h1>
          <p className="mt-4 text-[17px] text-muted-foreground max-w-[520px]">
            Find your next build. Filter by industry or opportunity type and reach out to founders directly.
          </p>
        </div>

        {/* SEARCH  */}
        <div className="relative mb-6 max-w-[600px]">
          <SearchIcon />
           <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search projects, tech, or founders..."
                className="w-full rounded-full border border-border bg-background py-3 pl-11 pr-5 text-[15px] text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none transition-colors"
            />
        </div>

        {/* FILTERS */}
        <div className="mb-10 space-y-4 border-b border-border pb-8">

          {/* <FilterGroup label="Industry">
            {["All", ...INDUSTRIES].map((i) => (
              <FilterButton
                key={i}
                active={industry === i}
                onClick={() => setIndustry(i)}
              >
                {i}
              </FilterButton>
            ))}
          </FilterGroup> */}

          <FilterGroup label="Industry">
            {[{ id: "All", name: "All" }, ...choices.industries].map((i) => (
              <FilterButton
                key={i.id}
                active={industry === i.id}
                onClick={() => setIndustry(i.id)}
              >
                {i.name}
              </FilterButton>
            ))}
          </FilterGroup>
{/* 
          <FilterGroup label="Type">
            {["All", ...choices.type].map((t) => (
              <FilterButton
                key={t.id}
                active={type === t}
                onClick={() => setType(t.id)}
              >
                {t}
              </FilterButton>
            ))}
          </FilterGroup> */}


          <FilterGroup label="Type">
            {[{ id: "All", name: "All" }, ...choices.type].map((t) => (
              <FilterButton
                key={t.id}
                active={type === t.id}
                onClick={() => setType(t.id)}
              >
                {t.name}
              </FilterButton>
            ))}
          </FilterGroup>
        </div>

        {/* RESULTS */}
        <p className="mb-6 text-[14px] text-muted-foreground">
          {/* {filteredProjects.length} project(s) found */}
           {projects.length} project(s) found
        </p>

        {/* GRID */}
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filteredProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </main>
  );
}


/* ---------------- FILTER HELPERS ---------------- */

function FilterGroup({ label, children }) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="text-[12px] font-semibold uppercase tracking-[0.08em] text-muted-foreground w-[64px]">
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

/* ---------------- ICON ---------------- */

function SearchIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={18}
      height={18}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none"
    >
      <circle cx={11} cy={11} r={8} />
      <path d="m21 21-4.34-4.34" />
    </svg>
  );
}