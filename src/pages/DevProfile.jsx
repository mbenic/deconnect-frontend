import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { API_URL } from "../config";
import { ChoicesContext } from "../context/ChoicesContext";
 

export default function DevProfile() {
  const { id } = useParams();

  const mockDev = {
    name: "Maria Benic",
    level: "Mid-level",
    city: "Perth",
    availability: "Part-time Only",
    work_preference: "Remote Only",
    about: "ggff",
    portfolio: "https://mysite.com",
    skills: ["HTML/CSS", "JavaScript", "React", "PHP", "Laravel"],
    projects: "fddssd",
    vibes: ["I work best async", "I'm a finisher not just a starter"],
    industries: ["Health & Wellness"],
    memberSince: "April 2026",
    links: {
      portfolio: "https://mysite.com",
      linkedin: null,
      github: "https://github.com/mariabenic"
    }
  };


const [loading, setLoading] = useState(true);
const [dev, setDev] = useState(null);

// useEffect(() => {
//   // simulate API
//   setTimeout(() => {
//     setDev(mockDev);
//     setLoading(false);
//   }, 1000);
// }, []);

useEffect(() => {
  const fetchDev = async () => {
    setLoading(true);
    setDev(null);

    try {
      const res = await fetch(`${API_URL}/devs/${id}/`);

      if (!res.ok) {
        throw new Error("Failed to fetch developer");
      }

      const data = await res.json();

      // transform API → UI shape
      const formattedDev = {
        ...data,

        name: data.name,
        level: data.level_display,
        city: data.city_display,
        availability: data.availability_display,
        work_preference: data.work_preference_display,

        skills: data.skills?.map((s) => s.name) || [],
        industries: data.industries?.map((i) => i.name) || [],
        vibes: data.vibes?.map((v) => v.name) || [],
        memberSince: new Date(data.created_at).toLocaleDateString("en-US", {
          year: "numeric",
          month: "long"
        })
      };

      setDev(formattedDev);
    } catch (err) {
      console.error(err);
      setDev(null);
    } finally {
      setLoading(false);
    }
  };

  fetchDev();
}, [id]);

if (loading) return <div>Loading...</div>;
if (!dev) return <div>Not found</div>;

  return (
    <main className="bg-surface px-5 md:px-10 py-12 md:py-16">
      <div className="mx-auto max-w-[820px]">

        <BackLink />

        <ProfileHeader dev={dev} />

        <div className="grid gap-6 md:grid-cols-[1fr_300px]">
          {/* LEFT */}
          <div className="space-y-6">
            <Card title="Skills & tech stack">
              <TagList items={dev.skills} />
            </Card>

            <Card title="Past projects">
              <p className="text-[15px] text-foreground leading-relaxed whitespace-pre-wrap">
                {dev.projects}
              </p>
            </Card>

            <Card title="Working style">
              <TagList items={dev.vibes} highlight />
            </Card>
          </div>

          {/* RIGHT */}
          <div className="space-y-6">
            <Card title="Availability">
              <InfoRow label="Status" value={dev.availability} primary />
              <InfoRow label="Work preference" value={dev.work_preference} primary/>
            </Card>

            <Card title="Industries">
              <TagList items={dev.industries} />
            </Card>

            <Card title="Member since">
              <p className="text-[15px] font-medium text-foreground">
                {dev.memberSince}
              </p>
            </Card>
          </div>
        </div>
      </div>
    </main>
  );
}


/* ---------------- COMPONENTS ---------------- */

function BackLink() {
  return (
    <a
      href="/devs"
      className="inline-flex items-center gap-1.5 text-[14px] font-medium text-muted-foreground hover:text-primary transition-colors mb-10"
    >
      ← Browse developers
    </a>
  );
}


function ProfileHeader({ dev }) {
  return (
    <div className="rounded-[24px] border border-border bg-background p-8 md:p-10 mb-6">
      <div className="flex flex-col sm:flex-row sm:items-start gap-6">

        {/* Avatar */}
        <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground font-semibold text-[26px]">
          {dev.name.split(" ").map(n => n[0]).join("")}
        </div>

        <div className="flex-1 min-w-0">

          {/* Name + badge */}
          <div className="flex flex-wrap items-start gap-3">
            <h1 className="font-heading text-[32px] sm:text-[38px] font-semibold tracking-tight text-foreground leading-tight">
              {dev.name}
            </h1>

            <span className="mt-1.5 rounded-full border border-border bg-surface px-3 py-1 text-[13px] font-semibold text-foreground shrink-0">
              {dev.level}
            </span>
          </div>

          {/* Meta row */}
          <div className="flex flex-wrap items-center gap-4 mt-3 text-[14px]">

            <span className="font-medium text-primary">
             📍{dev.city}
            </span>

            <span className="font-medium text-primary">
              ⏰{dev.availability}
            </span>

            <span className="font-medium text-primary">
              🖥️{dev.work_preference}
            </span>
          </div>

          {/* Links */}
          {/* {dev.portfolio && (
            <div className="flex flex-wrap gap-4 mt-4">
              <a
                href={dev.portfolio}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-[14px] font-medium text-foreground hover:text-primary transition-colors"
              >
                Portfolio →
              </a>
            </div>
          )} */}

          <div className="flex flex-wrap gap-4 mt-4">
          <ExternalLink href={dev.links?.portfolio} label="Portfolio" />
          <ExternalLink href={dev.links?.linkedin} label="LinkedIn" />
          <ExternalLink href={dev.links?.github} label="GitHub" />
        </div>

        </div>
      </div>

      {/* About */}
      {dev.about && (
        <div className="mt-8 pt-8 border-t border-border">
          <p className="text-[16px] text-muted-foreground leading-relaxed">
            {dev.about}
          </p>
        </div>
      )}
    </div>
  );
}


function Card({ title, children }) {
  return (
    <div className="rounded-[20px] border border-border bg-background p-7">
      <h2 className="text-[16px] font-semibold uppercase tracking-[0.08em]  mb-4">
        {title}
      </h2>
      {children}
    </div>
  );
}


function SideCard({ title, children }) {
  return (
    <div className="rounded-[20px] border border-border bg-background p-6 space-y-3">
      <h2 className="text-[16px] font-semibold uppercase tracking-[0.08em] mb-2">
        {title}
      </h2>
      {children}
    </div>
  );
}

function TagList({ items = [], highlight = false }) {
  return (
    <div className="flex flex-wrap gap-2">
      {items.map((item) => (
        <span
          key={item}
          className={`rounded-full px-3 py-1.5 text-[13px] font-medium border
            ${
              highlight
                ? "bg-primary/10 border-primary/30 text-primary"
                : "bg-surface border-border text-foreground"
            }`}
        >
          {item}
        </span>
      ))}
    </div>
  );
}

function InfoRow({ label, value, primary }) {
  return (
    <div>
      <p className="text-[12px] text-muted-foreground mb-0.5">{label}</p>
      <p className={`text-[15px] ${primary ? "text-primary font-semibold" : "text-foreground"}`}>
        {value}
      </p>
    </div>
  );
}

function ExternalLink({ href, label }) {
  if (!href) return null;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center gap-1.5 text-[14px] font-medium text-foreground hover:text-primary transition-colors"
    >
      {label} →
    </a>
  );
}