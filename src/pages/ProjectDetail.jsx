import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { API_URL } from "../config";


export default function ProjectDetail() {
  const { id } = useParams();

  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const mockProject  = {
    
    title: "Health & Wellness App",
    description: "A mobile app that provides personalized health and wellness recommendations based on user data and preferences.",
    city: "Perth",
    industry: "Health & Wellness",
    budget:"Under $500",
    timeline: "3 months",
    stage: "MVP",
    type: "Collaboration",
    skills: ["React Native", "Node.js", "MongoDB", "UI/UX Design"],
    created_at: "2024-05-15T10:00:00Z",
    owner: {
      name: "John Doe",
      email: "john.doe@example.com"
    }
  };

//   useEffect(() => {
//     async function fetchProject() {
//       try {
//         const res = await fetch(`${API_URL}/projects/${id}/`);

//         if (!res.ok) {
//           throw new Error("Failed to fetch project");
//         }

//         const data = await res.json();
//         setProject(data);
//       } catch (err) {
//         setError(err.message);
//       } finally {
//         setLoading(false);
//       }
//     }

//     fetchProject();
//   }, [id]);

//   if (loading) return <ProjectSkeleton />;
//   if (error) return <ErrorState message={error} />;
//   if (!project) return null;


// useEffect(() => {
//   // simulate API
//   setTimeout(() => {
//     setProject(mockProject);
//     setLoading(false);
//   }, 1000);
// }, []);


useEffect(() => {
  const fetchProject = async () => {
    setLoading(true);
    setProject(null);

    try {
      const res = await fetch(`${API_URL}/projects/${id}/`);

      if (!res.ok) {
        throw new Error("Failed to fetch project");
      }

      const data = await res.json();

      // transform API → UI shape
      const formattedProject = {
        ...data,

        title: data.title,
        description: data.description,
        city: data.city_display,
        industry: data.industry_display,
        budget: data.budget_display,
        timeline: data.timeline_display,
        stage: data.stage_display,
        type: data.type_display,  
        skills: data.skills?.map((s) => s.name) || [],
        industries: data.industries?.map((i) => i.name) || [],
        created_at: data.created_at,
        owner: {
          name: data.owner.first_name + " " + data.owner.last_name,
          email: data.owner?.email || "",
        },
      };

      setProject(formattedProject);
    } catch (err) {
      console.error(err);
      setProject(null);
    } finally {
      setLoading(false);
    }
  };

  fetchProject();
}, [id]);

if (loading) return <div>Loading...</div>;
if (!project) return <div>Not found</div>;

  return (
    <main className="bg-surface px-5 md:px-10 py-12 md:py-16">
      <div className="mx-auto max-w-[820px] space-y-6">

        <BackLink />
        
        {/* HERO */}
        <div className="rounded-[24px] border border-border bg-background p-8 md:p-10">
          <div className="flex flex-col sm:flex-row gap-6">

            <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-primary text-primary-foreground font-bold text-[26px]">
              {getInitials(project.title)}
            </div>

            <div className="flex-1">
              <div className="flex flex-wrap items-start gap-3">
                <h1 className="font-heading text-[32px] sm:text-[38px] font-semibold text-foreground">
                  {project.title}
                </h1>

                <Badge>{project.type}</Badge>
                <Badge variant="warning">{formatTimeline(project.timeline)}</Badge>
              </div>

              <p className="mt-2 text-[15px] text-muted-foreground">
                by {project.owner?.name}
              </p>

              <div className="flex flex-wrap gap-4 mt-4 text-[14px] font-medium text-primary">
                <span>📍 {project.city}</span>
                <span>🏢 {project.industries?.join(", ")}</span>
                <span>💰 {formatBudget(project.budget)}</span>
              </div>
            </div>
          </div>

          <div className="mt-8 pt-8 border-t border-border">
            <p className="text-[16px] text-muted-foreground">
              {project.description}
            </p>
          </div>
        </div>

        {/* INFO STACK */}
        <div className="space-y-6">

          <InfoCard title="Skills needed">
            <div className="flex flex-wrap gap-2">
              {project.skills?.map((skill) => (
                <Tag key={skill}>{skill}</Tag>
              ))}
            </div>
          </InfoCard>

          <InfoCard title="Stage" emoji="🧠">
            <p className="text-[15px] font-semibold">{project.stage}</p>
          </InfoCard>

          <InfoCard title="Timeline" emoji="⏱">
            <p className="text-[15px] font-semibold">
              {formatTimeline(project.timeline)}
            </p>
          </InfoCard>

          <InfoCard title="Budget" emoji="💰">
            <p className="text-[15px] font-semibold">
              {formatBudget(project.budget)}
            </p>
          </InfoCard>

          <InfoCard title="Opportunity type" emoji="🤝">
            <p className="text-[15px] font-semibold">{project.type}</p>
          </InfoCard>

          <InfoCard title="Posted">
            <p className="text-[15px]">
              {formatDate(project.created_at)}
            </p>
          </InfoCard>

          {/* CONTACT */}
          <div className="rounded-[20px] border border-primary/20 bg-primary/5 p-7">
            <p className="text-[14px] text-muted-foreground mb-1">
              Posted by
            </p>

            <p className="text-[16px] font-semibold mb-4">
              {project.owner?.name}
            </p>

            <a
              href={`mailto:${project.owner?.email}`}
              className="inline-flex w-full justify-center rounded-full bg-primary px-5 py-3 text-[14px] font-semibold text-primary-foreground"
            >
              Get in touch
            </a>
          </div>

        </div>
      </div>
    </main>
  );
}


function BackLink() {
  return (
    <a
      href="/projects"
      className="inline-flex items-center gap-1.5 text-[14px] font-medium text-muted-foreground hover:text-primary transition-colors mb-10"
    >
      ← Browse projects
    </a>
  );
}

function InfoCard({ title, emoji, children }) {
  return (
    <div className="rounded-[20px] border border-border bg-background p-7">
      <h2 className="text-[16px] font-semibold uppercase tracking-[0.08em] text-muted-foreground mb-4 flex items-center gap-2">
        {emoji && <span>{emoji}</span>}
        {title}
      </h2>
      {children}
    </div>
  );
}

function Tag({ children }) {
  return (
    <span className="rounded-full bg-surface border border-border px-3 py-1.5 text-[13px] font-medium text-foreground">
      {children}
    </span>
  );
}

function Badge({ children, variant }) {
  const styles =
    variant === "warning"
      ? "bg-amber-50 border-amber-200 text-amber-700"
      : "bg-surface border-border text-foreground";

  return (
    <span className={`rounded-full border px-3 py-1 text-[13px] font-semibold ${styles}`}>
      {children}
    </span>
  );
}

function ErrorState({ message }) {
  return (
    <div className="text-center py-20 text-muted-foreground">
      {message}
    </div>
  );
}

function getInitials(text = "") {
  return text
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

// function formatBudget(budget) {
//   if (!budget) return "";
//   return budget.replace("_", " ");
// }

function formatBudget(budget) {
  if (!budget) return "";

  if (typeof budget === "number") {
    return `$${budget}`;
  }

  if (typeof budget === "string") {
    return budget.replace(/_/g, " ");
  }

  if (typeof budget === "object") {
    const { min, max } = budget;
    if (min && max) return `$${min} - $${max}`;
    if (max) return `Under $${max}`;
    if (min) return `$${min}+`;
  }

  return "";
}

function formatTimeline(t) {
  return t?.replace("_", " ");
}

function formatDate(date) {
  return new Date(date).toLocaleDateString("en-AU", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}