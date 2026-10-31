import { ArrowRight } from "lucide-react";
import type { Stat, ServiceCard as ServiceCardData, TeamMember as TeamMemberData } from "../data/content";

/*
  Small presentational cards used by the home page, extracted so each repeated
  block is a single component mapped over its data array (see app/data/content).
*/

// One impact statistic on the dark band: icon, big value, uppercase label.
export function StatItem({ stat }: { stat: Stat }) {
  return (
    <div className="text-center">
      <stat.Icon
        className="mx-auto text-white/80"
        size={30}
        strokeWidth={2}
        aria-hidden="true"
      />
      <div className="mt-3 font-display text-4xl font-bold text-white sm:text-5xl">
        {stat.value}
      </div>
      <p className="mt-2 text-xs font-semibold uppercase tracking-[0.12em] text-slate-300 sm:text-sm">
        {stat.label}
      </p>
    </div>
  );
}

// Secondary service card: accent inner-glow revealed on hover, accent arrow.
export function ServiceCard({ card }: { card: ServiceCardData }) {
  return (
    <div
      className="group relative flex h-full flex-col overflow-hidden rounded-2xl bg-white shadow-sm transition-[transform,box-shadow] duration-200 ease-out hover:-translate-y-1 hover:shadow-xl hover:shadow-slate-900/10"
      style={{ "--accent": card.accent } as React.CSSProperties}
    >
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-200 ease-out group-hover:opacity-100"
        style={{
          background: `radial-gradient(125% 115% at 100% 100%, color-mix(in srgb, ${card.accent} 24%, transparent) 0%, transparent 68%)`,
        }}
      />
      <div className="relative flex flex-1 flex-col p-7">
        <h3 className="font-display text-xl font-bold text-ink">{card.title}</h3>
        <p className="mt-1 text-sm font-bold text-ink/80">{card.subhead}</p>
        <p className="mt-3 text-[0.95rem] leading-relaxed text-muted">
          {card.desc}
        </p>
        <div className="mt-6 flex flex-1 items-end justify-end">
          <span
            className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-300 text-icon-muted transition-colors duration-200 group-hover:border-[color:var(--accent)] group-hover:[color:var(--accent)]"
            aria-hidden="true"
          >
            <ArrowRight size={16} strokeWidth={2} />
          </span>
        </div>
      </div>
    </div>
  );
}

// Team member: photo with an accent-tinted caption panel beneath.
export function TeamMember({ member }: { member: TeamMemberData }) {
  return (
    <div className="mx-auto flex h-full max-w-[220px] flex-col overflow-hidden rounded-2xl bg-white shadow-sm shadow-slate-900/5 sm:max-w-none">
      <img
        src={member.photo}
        alt={member.name}
        width={200}
        height={300}
        loading="lazy"
        className="aspect-[4/5] w-full object-cover object-top"
      />
      <div
        className="flex flex-1 flex-col px-4 py-5 text-center"
        style={{
          background: `linear-gradient(180deg, #ffffff 0%, color-mix(in srgb, ${member.accent} 15%, transparent) 100%)`,
        }}
      >
        <h3 className="font-display text-lg font-bold text-ink">
          {member.name}
        </h3>
        <p className="mt-1 text-sm leading-snug text-muted">{member.role}</p>
      </div>
    </div>
  );
}
