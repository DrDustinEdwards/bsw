import { Icon, iconArrowRight } from "capsomer/react/icons";
import type { ServiceCard as ServiceCardData, TeamMember as TeamMemberData } from "../data/content";
import { sitePicture } from "../lib/media/images";
import { Picture } from "capsomer/react/picture";

// Secondary service card, Capsomer's card: heading, one content block, a footer with the accent arrow, and an accent
// inner-glow revealed on hover.
export function ServiceCard({ card }: { card: ServiceCardData }) {
  return (
    <article
      className="cap-card service-card"
      style={{ "--accent": card.accent } as React.CSSProperties}
    >
      <span
        aria-hidden="true"
        className="service-card-glow"
        style={{
          background: `radial-gradient(125% 115% at 100% 100%, color-mix(in srgb, ${card.accent} 24%, transparent) 0%, transparent 68%)`,
        }}
      />
      <h3 className="service-card-title">{card.title}</h3>
      <div className="service-card-body">
        <p className="service-card-desc">{card.desc}</p>
      </div>
      <footer className="service-card-foot">
        <span className="service-card-arrow" aria-hidden="true">
          <Icon d={iconArrowRight} />
        </span>
      </footer>
    </article>
  );
}

// Team member: Capsomer's card, the photo to the card's edges with an accent-tinted caption panel beneath.
export function TeamMember({ member }: { member: TeamMemberData }) {
  return (
    <article className="cap-card team-card">
      <Picture
        picture={sitePicture(member.photo, "team", {
          alt: member.name,
          className: "team-card-photo",
        })}
      />
      <div
        className="team-card-caption"
        style={{
          background: `linear-gradient(180deg, #ffffff 0%, color-mix(in srgb, ${member.accent} 15%, transparent) 100%)`,
        }}
      >
        <h3 className="team-card-name">{member.name}</h3>
        <p className="team-card-role">{member.role}</p>
      </div>
    </article>
  );
}
