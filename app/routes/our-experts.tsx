import type { Route } from "./+types/our-experts";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { PageHero } from "../components/PageHero";
import { PrimaryButton } from "../components/ui";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "PhD/MD Editors | BioScience Writers" },
    {
      name: "description",
      content:
        "An elite network of MD and PhD editors providing subject-matter expert review across every scientific discipline.",
    },
  ];
}

export default function OurExperts() {
  return (
    <div className="flex min-h-screen flex-col bg-white">
      <Header />
      <main className="flex-1">
        <PageHero title="PhD/MD Editors" />
        <section>
          <div className="page-prose mx-auto max-w-3xl px-5 py-16 sm:py-20">
            <h2>MD/PhD Authority in Every Scientific Discipline</h2>
            <p>
              At the core of BioScience Writers is an elite network of editors
              and consultants who are active participants in the global
              scientific community. We don't just employ linguists; we partner
              with subject-matter experts who understand the nuances, logic, and
              rigor required for high-impact publication and funding. Our
              "Network" hub is designed to provide complete transparency into the
              credentials and quality standards that safeguard your research.
            </p>

            <h3>The MD/PhD Standard of Excellence</h3>
            <p>
              We believe that only a scientist can truly edit science. Our
              network is built on a foundation of rigorous credentialing to
              ensure your work is handled with the authority it deserves:
            </p>
            <ul>
              <li>
                <strong>Subject-Matter Matching:</strong> Every project is
                assigned to an editor with an advanced degree (MD or PhD) in your
                specific field of study.
              </li>
              <li>
                <strong>Verified Credentials:</strong> We maintain a strict
                MD/PhD verification process, ensuring our team members have the
                academic background and peer-reviewed publication history
                necessary to provide substantive feedback.
              </li>
              <li>
                <strong>Active Researchers:</strong> Many of our editors are
                active faculty members, clinicians, and researchers who stay at
                the forefront of their respective disciplines.
              </li>
            </ul>

            <h3>Breadth of Expertise</h3>
            <p>
              Our network spans the full spectrum of modern science, medicine,
              and engineering. We provide specialized editorial support across
              hundreds of sub-disciplines, including:
            </p>
            <ul>
              <li>
                <strong>Life Sciences &amp; Biology:</strong> From molecular
                genetics and bioinformatics to ecology and plant sciences.
              </li>
              <li>
                <strong>Medicine &amp; Health Sciences:</strong> Covering
                clinical specialties, oncology, neurology, public health, and
                nursing.
              </li>
              <li>
                <strong>Physical Sciences &amp; Engineering:</strong> Including
                chemistry, physics, materials science, and civil/electrical
                engineering.
              </li>
              <li>
                <strong>Social Sciences &amp; Humanities:</strong> Support for
                high-level academic work in psychology, sociology, and
                economics.
              </li>
            </ul>

            <h3>Our Commitment to Editing Quality</h3>
            <p>
              Trust is built on consistency. BioScience Writers employs a
              multi-tiered quality control system to ensure that every document
              meets our "Universal Quality Standard" before it returns to you:
            </p>
            <ul>
              <li>
                <strong>Internal Peer Review:</strong> Senior editors perform
                secondary quality checks on complex projects to ensure scientific
                logic and style compliance are perfect.
              </li>
              <li>
                <strong>The BSW Guarantee:</strong> We stand behind our work. If
                a journal raises concerns regarding the quality of the English
                language in a manuscript we have edited, we will re-edit the
                document at no additional cost.
              </li>
              <li>
                <strong>Confidentiality &amp; Security:</strong> All members of
                our network are bound by strict Non-Disclosure Agreements (NDAs),
                ensuring your intellectual property remains secure throughout the
                editing process.
              </li>
            </ul>

            <h3>Client Evidence &amp; Success Stories</h3>
            <p>
              The success of our network is measured by the success of our
              clients. We take pride in the thousands of manuscripts we have
              helped move from draft to high-impact publication:
            </p>
            <ul>
              <li>
                <strong>Peer Testimonials:</strong> "The editor's grasp of my
                specific field in oncology was impressive. They didn't just fix
                my grammar; they strengthened my discussion section." - Lead PI,
                Research Hospital.
              </li>
              <li>
                <strong>Journal Success:</strong> Our clients regularly publish
                in top-tier journals, including Nature, Science, The Lancet, and
                Cell.
              </li>
              <li>
                <strong>Global Impact:</strong> We support researchers from over
                50 countries, providing a bridge between local data and global
                scientific conversation.
              </li>
            </ul>

            <p className="mt-10 font-display text-xl font-bold text-ink">
              Ready to connect with an expert in your field?
            </p>
            <div className="mt-5">
              <PrimaryButton href="/contact-us/">
                Meet Your Editor in the Client Portal
              </PrimaryButton>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
