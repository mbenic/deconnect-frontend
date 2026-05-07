import { Link } from "react-router-dom";

/* ---------------- CARD ---------------- */

export default function ProjectCard({ project }) {
  const initials = project.title
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <div className="group flex flex-col rounded-[20px] border border-border bg-background hover:border-primary/40 hover:shadow-md transition-all overflow-hidden">

      <div className="h-[6px] w-full bg-primary" />

      <div className="flex flex-col flex-1 p-6">

        <div className="flex items-start justify-between mb-4">

          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-[10px] bg-foreground text-background font-semibold">
              {initials}
            </div>

            <div>
              <h3 className="font-heading text-[17px] font-semibold text-foreground">
                {project.title}
              </h3>
              <p className="text-[13px] text-muted-foreground">
                by {project.owner.first_name} {project.owner.last_name} · {project.city_display}
              </p>
            </div>
          </div>

          <span className="rounded-full px-2.5 py-1 text-[11px] font-semibold border bg-surface text-muted-foreground">
            {project.timeline_display}
          </span>
        </div>

        <p className="text-[14px] text-muted-foreground line-clamp-2 mb-4 flex-1">
          {project.description}
        </p>

        <div className="flex flex-wrap gap-1.5 mb-4">
          {project.skills.slice(0, 3).map((t) => (
            <span
              key={t.id}
              className="rounded-full bg-surface border border-border px-2.5 py-1 text-[11px]"
            >
              {t.name}
            </span>
          ))}
        </div>

        <div className="flex items-center justify-between border-t border-border pt-4 mt-auto">

          <span className="rounded-full px-3 py-1 text-[12px] font-semibold border bg-surface text-muted-foreground">
            {project.type_display}
          </span>

        <Link
          to={`/projects/${project.id}`}
          className="text-[14px] font-semibold hover:text-primary transition-colors"
        >
          View →
        </Link>

        </div>
      </div>
    </div>
  );
}
