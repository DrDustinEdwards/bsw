/*
  Precision Editing Demonstrated: a faithful port of the real editor's sample, on Capsomer's annotated document
  (annotated-document.md). The edit is written once, with ins and del, and the three views (Original, Simple markup,
  All markup) are Capsomer's segmented radios and CSS, so they work with no script. The text is static trusted HTML,
  server-rendered for crawlers. The note linking is Capsomer's behavior, loaded by the editing-demo island
  (app/islands/editing-demo.ts) only as the demo nears the viewport. Each note's kind is its tone: Editorial warn,
  Scientific info, Impact ok, Rhetorical the accent (app.css gives each the demo's annotation colors).
*/
import { AnnotatedDocument, type AnnotatedNote } from "capsomer/react/annotated-document";
import { markup } from "capsomer/behavior/trusted-html";

const DOCUMENT_HTML = `
<p><del>Staphylococcus aureus (SA) is</del><ins>As</ins> the leading cause of invasive bacterial infections in the US<del>. Despite its status</del><ins>, </ins><mark data-note="c5" data-tone="warn"><em><ins>Staphylococcus aureus</ins></em></mark><ins> (</ins><mark data-note="c7" data-tone="warn"><strong><ins>SA</ins></strong></mark><ins>) has been designated</ins> as a priority target for vaccine development<del>, all SA vaccines tested </del><ins>. However, these efforts are hampered by the inability </ins>to <del>date have been unsuccessful. One consistent barrier has been </del><ins>explore invasive staphylococcal infections in humans under controlled settings, combined with </ins>the lack of <del>reliable </del>translational animal models <del>that </del><ins>able to accurately </ins>predict <ins>whether a </ins>vaccine <ins>will offer </ins>protection in humans. <del>Given the impossibility of controlled human</del><ins>As a result, no tested SA vaccine has yet been successful at preventing</ins> infection<del> models of invasive staphylococcal infections, we have sought to define the adaptive host response following natural invasive SA disease in children and older adults through models that best recapitulate the natural human host environment.</del><ins>. </ins></p>
<p><del>Our group seeks to define</del><ins>Our group seeks to develop models that recapitulate the natural host environment </ins><mark data-note="c22" data-tone="info"><ins>in children and older adults</ins></mark><ins> to better define</ins> the adaptive host response <del>following natural </del><ins>to </ins>invasive SA disease<ins>. </ins><del>. </del>We recently demonstrated that <ins>mice were protected from SA sepsis following </ins>the transfer of convalescent sera <ins>obtained </ins>from children with invasive staphylococcal disease<del> protected mice from SA sepsis</del>, and <mark data-note="c29" data-tone="info">alpha toxin</mark><del>-</del><ins>–</ins>specific antibodies purified from protective sera conferred partial <del>anti-staphylococcal </del><ins>SA </ins>immunity. <del>Using the same approach, we discovered</del><ins>We also identified</ins> non-protective human anti-SA antibodies that <del>abrogated otherwise </del><ins>interfered with the </ins>protective <ins>effects of </ins>SA vaccines<del>. Vaccine interference occurred because of the recall</del><ins> </ins><mark data-note="c41" data-tone="ok"><ins>due to the recall</ins> of non-protective memory responses and antibody competition</mark>. Based on these findings, <mark data-note="c42"><strong>we hypothesize that SA infection in humans <del>generates</del><ins>activates</ins> a functional<del>,</del> but limited<del>,</del> antibody response that <del>is beset by</del><ins>may include</ins> <mark data-note="c49" data-tone="info">non-protective or interfering antibodies that suppress the protective response</mark></strong></mark>. <mark data-note="c50"><del>Development of a successful antibody-based approach to SA must take these factors into account, but they remain poorly defined. The central objective of </del><ins>The central objective of </ins>this proposal is to elucidate critical mechanisms of human <del>anti-staphylococcal antibody protection. These studies will elucidate critical mechanisms of </del>adaptive staphylococcal immunity, including the protective<del> </del><ins>, non-protective, and suppressive </ins>responses to SA <del>and to delineate these from non-protective or suppressive responses, in order to </del><ins>infection. The successful completion of the following Specific Aims will </ins>inform <ins>the development of </ins>novel <ins>and effective </ins>antibody-based approaches <del>to prevent</del><ins>for preventing</ins> or <del>treat</del><ins>treating</ins> SA infections<del>. We propose three Aims to address these goals:</del><ins> while accounting for the presence of non-protective or suppressive factors.</ins></mark><ins> </ins></p>
<p class="aim-heading"><mark data-note="c65"><mark data-note="c67" data-tone="ok">Specific Aim 1: </mark><del>To define functionally</del><mark data-note="c67" data-tone="ok"><strong><ins>Define</ins> protective antibody responses </strong><del>to</del><strong><ins>against</ins> SA antigens in children and older adults with invasive SA infections.</strong></mark></mark><ins> </ins></p>
<p>SA is a highly evolved human pathogen, and <del>it remains unclear what </del><ins>the </ins>antigens <del>are </del>produced <del>in the setting of</del><ins>during an</ins> invasive human <del>infections. While certain</del><ins>infection remain poorly defined. Although some SA</ins> genes <del>may be present</del><ins>have been identified</ins> in clinical isolates, <del>this does not indicate</del><ins>gene</ins> expression <ins>patterns </ins>during human infection and functional recognition <ins>of gene products </ins>by the <del>host immune system remains</del><ins>host immune system remain</ins> understudied. We will leverage our existing infrastructure to develop a prospective cohort of clinical samples from children and older adults <ins>diagnosed </ins>with invasive SA infections and age-matched <ins>healthy </ins>controls. We will evaluate serial serologic samples obtained from these patients to define the targets and kinetics of the natural humoral response to SA<del> and follow these patients for</del><ins>. We will also track</ins> clinical assessments<del>, including the possibility of</del><ins> over time, which may include</ins> re-infection. In parallel<mark data-note="c91" data-tone="info">, <mark data-note="c92">we will transfer sera to mouse models of SA infection to</mark></mark> define the protective characteristics of the human adaptive response. Successful completion of this aim will result in a list of <mark data-note="c93" data-tone="info">specific candidate antibodies</mark> associated with protection against human SA infection.<ins> </ins></p>
<p class="aim-heading">Specific Aim 2:<del> To</del> <del>identify</del><strong><ins>Identify</ins> and characterize protective and non-protective human antibodies targeting clinically relevant SA antigens.</strong><ins> </ins></p>
<p>Serologic assessment provides candidate antigen targets for intervention, but functional assays are critical for <ins>the </ins>rational design of vaccines with a high likelihood of success. <mark data-note="c97">Using <ins>clinical samples obtained from </ins>the cohort established in Aim 1, we will <del>interrogate clinical samples and </del><ins>characterize </ins></mark><del>identify </del><mark data-note="c97">specific antibodies for <del>a) their</del><ins>the</ins> ability to confer protection<del>,</del> and <del>b)</del><ins>define</ins> the mechanisms <del>of protection as defined by a series of in vivo and ex vivo models.</del><ins>through which protective effects are activated.</ins></mark><del> Targeted</del><mark data-note="c97"><ins> </ins><mark data-note="c108" data-tone="info"><ins>We will use a targeted</ins> antibody depletion <del>of serum will be performed against selected</del><ins>approach to remove antibodies targeting</ins> antigens identified in Aim 1<del>, and</del><ins>.</ins></mark><ins> A battery of </ins><em><ins>ex vivo</ins></em><ins> assays, including</ins> structural <ins>analyses </ins>and functional <del>profiling will elucidate protective and non-protective antibodies.</del><ins>assessments (e.g.,</ins> </mark><em><del>In</del></em><mark data-note="c97"><em><ins>in</ins> vitro</em> bacterial killing and cytotoxicity assays<del> coupled with structural analyses will be part of the battery of assays </del><ins>), will be </ins>used to characterize protective and non-protective antibodies<del>, and confirmatory assessments</del><ins>. </ins><mark data-note="c120" data-tone="info"><ins>Antibody characterization</ins> will <del>occur</del><ins>be validated</ins> by transfer to both wild-type and humanized mouse models.</mark></mark> Successful completion of this aim will reveal the key determinants of the functional, adaptive human response to SA and define candidates for reverse vaccine development.<ins> </ins></p>
<p class="aim-heading">Specific Aim 3:<del> To</del> <del>determine</del><strong><ins>Determine</ins> how prior humoral interaction with SA shapes vaccine efficacy.</strong><ins> </ins></p>
<p>The concept of original antigenic sin postulates that the immune response to <ins>the </ins>first infection imprints itself on subsequent host responses to infections and vaccination. Using a prototype vaccine that targets <del>a</del><ins>an</ins> SA surface protein, IsdB, we have shown that immune imprinting and antibody interference <ins>can </ins>impair an otherwise functional antibody response. <del>This aim</del><ins>We</ins> will determine the impact of pre-existing SA antibodies <ins>and antibody interference </ins>on both <mark data-note="c132" data-tone="info">passive and active immunization strategies <del>by defining antibody interference in</del><ins>using</ins> specific vaccination models.</mark> We <strong>hypothesize</strong> that a truly effective antibody-based intervention must account for antibody interference and suppression and that <mark data-note="c135" data-tone="info">subdominant antigen targets</mark> or antigens not prone to interference may be good vaccine targets. <mark data-note="c136" data-tone="info">Successful completion of this aim will guide the rational assessment of putative vaccine candidates while accounting for the impacts of immune imprinting and interference <mark data-note="c137" data-tone="ok">related to prior host exposure to SA.</mark></mark></p>
`;

const NOTES: AnnotatedNote[] = [
  { id: "c5", kind: "Editorial", icon: "E", tone: "warn", text: "Italicize species names." },
  {
    id: "c7",
    kind: "Editorial",
    icon: "E",
    tone: "warn",
    text: "Bold or color abbreviations so reviewers can locate definitions quickly.",
  },
  {
    id: "c22",
    kind: "Scientific",
    icon: "S",
    tone: "info",
    text: "Clarify why children and older adults are the focus (e.g., heightened vulnerability) before introducing these groups.",
  },
  {
    id: "c29",
    kind: "Scientific",
    icon: "S",
    tone: "info",
    text: "Briefly explain alpha toxin's role in SA sepsis for readers unfamiliar with it.",
  },
  {
    id: "c41",
    kind: "Impact / Framing",
    icon: "I",
    tone: "ok",
    text: "Add detail on these mechanisms so reviewers understand which barriers must be overcome.",
  },
  {
    id: "c42",
    kind: "Rhetorical",
    icon: "R",
    text: "Bold the hypothesis so reviewers can easily verify it drives each aim.",
  },
  {
    id: "c49",
    kind: "Scientific",
    icon: "S",
    tone: "info",
    text: "Edit clarifies that non-protective antibodies drive suppression; confirm this matches your intent.",
  },
  {
    id: "c50",
    kind: "Rhetorical",
    icon: "R",
    text: "Repetitive sentences consolidated; confirm the edit retains your meaning.",
  },
  {
    id: "c67",
    kind: "Impact / Framing",
    icon: "I",
    tone: "ok",
    text: "State a testable hypothesis for each aim to avoid an exploratory appearance.",
  },
  {
    id: "c65",
    kind: "Rhetorical",
    icon: "R",
    text: "Bold the full aim heading so reviewers can compare it against your approach at a glance.",
  },
  {
    id: "c91",
    kind: "Scientific",
    icon: "S",
    tone: "info",
    text: "Explain why this passive-transfer model outperforms prior animal models that failed to predict human protection.",
  },
  {
    id: "c92",
    kind: "Rhetorical",
    icon: "R",
    text: "Model name restated here for clarity; adjust if the connection to the earlier description is already clear.",
  },
  {
    id: "c93",
    kind: "Scientific",
    icon: "S",
    tone: "info",
    text: "Note here that you will characterize both dominant and subdominant protective antibodies (introduced in Aim 3).",
  },
  {
    id: "c97",
    kind: "Rhetorical",
    icon: "R",
    text: "Repetition removed and aim description streamlined; confirm edits retain your intent.",
  },
  {
    id: "c108",
    kind: "Scientific",
    icon: "S",
    tone: "info",
    text: "Clarify whether depletion isolates antibodies iteratively or uses a leave-one-out design; this may also raise Aim dependency concerns.",
  },
  {
    id: "c120",
    kind: "Scientific",
    icon: "S",
    tone: "info",
    text: "Specify whether depleted serum or purified antibodies are transferred, and briefly define the humanized mouse model.",
  },
  {
    id: "c132",
    kind: "Scientific",
    icon: "S",
    tone: "info",
    text: "Define passive vs. active immunization and state how many distinct vaccination models will be tested.",
  },
  {
    id: "c135",
    kind: "Scientific",
    icon: "S",
    tone: "info",
    text: 'Introduce and define "subdominant antigen targets" before using the term.',
  },
  {
    id: "c136",
    kind: "Scientific",
    icon: "S",
    tone: "info",
    text: "Aim 3 is underdeveloped; add detail on how the hypothesis will be tested and how subdominant antigens will be identified.",
  },
  {
    id: "c138",
    kind: "Impact / Framing",
    icon: "I",
    tone: "ok",
    text: "Add a closing impact statement summarizing how all three aims advance the field and public health.",
  },
  {
    id: "c137",
    kind: "Impact / Framing",
    icon: "I",
    tone: "ok",
    text: "State how common prior SA exposure is; reviewers need this to gauge whether immune imprinting plausibly undermines current vaccine efforts.",
  },
];

export function EditingDemo() {
  return (
    <div
      className="editing-demo"
      data-island="editing-demo"
      data-client="visible"
      data-client-root-margin="200px"
    >
      <AnnotatedDocument
        notes={NOTES}
        name="editing-demo-view"
        views={{ original: "Original", edited: "Simple Markup", all: "All Markup" }}
        docLabel="Manuscript text"
        notesLabel="Editor comments"
      >
        <div dangerouslySetInnerHTML={markup(DOCUMENT_HTML)} />
      </AnnotatedDocument>
    </div>
  );
}
