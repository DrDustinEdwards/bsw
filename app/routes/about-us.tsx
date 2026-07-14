import type { Route } from "./+types/about-us";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { PageHero } from "../components/PageHero";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "About Us | BioScience Writers" },
    {
      name: "description",
      content:
        "Founded in 2001, BioScience Writers is a team of research scientists and physicians providing scientific editing, writing, and grant support.",
    },
  ];
}

export default function AboutUs() {
  return (
    <div className="flex min-h-screen flex-col bg-white">
      <Header />
      <main className="flex-1">
        <PageHero title="About Us" />
        <section>
          <div className="page-prose mx-auto max-w-3xl px-5 py-16 sm:py-20">
            <p>
              BioScience Writers was founded in 2001 by Dr. Susan Marriott, who
              recognized that her colleagues wanted a reviewer and proofreader
              who was always available at a moment's notice. They needed someone
              with subject expertise in their specific area of research who could
              understand the science, correct English grammar errors, and improve
              the clarity and impact of the document. After she gathered a group
              of research scientists and physicians with expertise in manuscript
              preparation, publishing, and grant writing, BioScience Writers was
              born.
            </p>
            <p>
              The editors at BioScience Writers have broad knowledge in more than
              170 scientific disciplines. Each member of our editing team has
              authored peer-reviewed journal articles, review articles, book
              chapters, brochures, reports, or grant proposals. Many have served
              as reviewers for manuscripts and grants. Our editors have experience
              helping non-native English speakers perfect their scientific texts.
              Learn more about our editors.
            </p>
            <p>
              We operate on a policy of transparency. Our pricing is easy to
              understand, and we are proud to show the expertise of our scientific
              and medical editors. You can easily browse our editor list for your
              specific area of research. We understand that having a properly
              matched editor with expertise in your area of research is critical
              to your success.
            </p>
            <p>
              Many journals recommend our services, and all journals allow you to
              choose the best scientific editing service provider for your needs.
              We promise to work hard to be the best service provider for you. Try
              us, and you too will see the difference BioScience Writers can make!
            </p>

            <h2>Our Mission Statement</h2>
            <p>
              Our mission is to provide the highest quality scientific writing and
              editing services, together with exceptional customer service,
              accessible to scientists around the world.
            </p>
            <p>
              To accomplish this goal, we offer a variety of concierge publishing
              services including academic editing, medical editing, scientific
              editing, writing workshops, as well as science technical and medical
              copyediting services for publishers. We offer unparalleled
              flexibility in all of our services as well as group discounts for
              associations, societies, corporations, hospitals, and universities.
            </p>

            <h2>About Our Logo</h2>
            <p>
              Our logo represents the four basic elements of life science: earth,
              water, air, and fire. These basic elements are the building blocks
              on which all scientific research is based. BioScience Writers
              represents the human mind, which is needed to express scientific
              ideas for publication and advance the human race.
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
