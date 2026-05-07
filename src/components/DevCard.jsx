import { Link } from "react-router-dom";

export default function DevCard({ dev }) {
  const initials = dev.name
    .split(" ")
    .map((n) => n[0])
    .join("");

  return (
    <div className="group flex flex-col rounded-[20px] border border-border bg-background p-6 hover:border-primary/40 hover:shadow-md transition-all duration-300">
      
      <div className="flex items-start justify-between mb-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground font-semibold">
          {initials}
        </div>

        <span className="rounded-full border border-border bg-surface px-3 py-1 text-[12px] font-semibold">
          {dev.level_display}
        </span>
      </div>

      <h3 className="font-heading text-[19px] font-semibold text-foreground">
        {dev.name}
      </h3>

      <p className="mt-2 text-[13px] text-muted-foreground flex items-center gap-1">
        📍 {dev.city_display}
      </p>

      <p className="mt-3 text-[14px] text-muted-foreground line-clamp-3 flex-1">
        {dev.about}
      </p>

      <div className="mt-4 flex flex-wrap gap-1.5">
        {dev.skills.slice(0, 4).map((skill) => (
          <span
            key={skill.id}
            className="rounded-full bg-surface border border-border px-2.5 py-1 text-[11px]"
          >
            {skill.name}
          </span>
        ))}
      </div>

      <div className="mt-5 flex items-center justify-between border-t border-border pt-4">
        <span className="text-[12px] font-medium text-primary">
          {dev.availability_display}
        </span>

        <Link
          to={`/devs/${dev.id}`}
          className="text-[14px] font-semibold hover:text-primary transition-colors"
        >
          View →
        </Link>
      </div>
    </div>
  );
}