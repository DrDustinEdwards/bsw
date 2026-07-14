import { useEffect, useRef } from "react";

/*
  Precision Editing Demonstrated: a faithful port of the real interactive
  editor. The document versions and comment cards are the verbatim source
  markup (injected as static HTML so the tracked-changes and highlight spans
  stay exact). The glass draggable pill tab switcher and the two-way
  card <-> highlight linking are ported from the source script into a scoped
  effect. Styling lives in app.css (.psms-*). prefers-reduced-motion disables
  smooth scroll and the spring snap.
*/

const PSMS_HTML = `
<div class="psms-container">

<div class="psms-tab-nav-wrap">
  <div class="psms-glass-track" id="psms-track">
    <div class="psms-pill" id="psms-pill"></div>
    <div class="psms-track-label" data-idx="0">Original</div>
    <div class="psms-track-label psms-active" data-idx="1">Simple Markup</div>
    <div class="psms-track-label" data-idx="2">All Markup</div>
  </div>
</div>

<div class="psms-gray-wrap">
<div class="psms-layout" id="psms-layout" data-tab="simple">

<!-- ORIGINAL -->
<div class="psms-tab-panel" id="psms-panel-original">
<div class="psms-scroll-box">
<p>Staphylococcus aureus (SA) is the leading cause of invasive bacterial infections in the US. Despite its status as a priority target for vaccine development, all SA vaccines tested to date have been unsuccessful. One consistent barrier has been the lack of reliable translational animal models that predict vaccine protection in humans. Given the impossibility of controlled human infection models of invasive staphylococcal infections, we have sought to define the adaptive host response following natural invasive SA disease in children and older adults through models that best recapitulate the natural human host environment.</p>
<p>Our group seeks to define the adaptive host response following natural invasive SA disease. We recently demonstrated that the transfer of convalescent sera from children with invasive staphylococcal disease protected mice from SA sepsis, and alpha toxin-specific antibodies purified from protective sera conferred partial anti-staphylococcal immunity. Using the same approach, we discovered non-protective human anti-SA antibodies that abrogated otherwise protective SA vaccines. Vaccine interference occurred because of the recall of non-protective memory responses and antibody competition. Based on these findings, <strong>we hypothesize that SA infection in humans generates a functional, but limited, antibody response that is beset by non-protective or interfering antibodies that suppress the protective response</strong>. Development of a successful antibody-based approach to SA must take these factors into account, but they remain poorly defined. The central objective of this proposal is to elucidate critical mechanisms of human anti-staphylococcal antibody protection. These studies will elucidate critical mechanisms of adaptive staphylococcal immunity, including the protective responses to SA and to delineate these from non-protective or suppressive responses, in order to inform novel antibody-based approaches to prevent or treat SA infections. We propose three Aims to address these goals:</p>
<p class="psms-ms-h1">Specific Aim 1: To define functionally protective antibody responses to SA antigens in children and older adults with invasive SA infections.</p>
<p>SA is a highly evolved human pathogen, and it remains unclear what antigens are produced in the setting of invasive human infections. While certain genes may be present in clinical isolates, this does not indicate expression during human infection and functional recognition by the host immune system remains understudied. We will leverage our existing infrastructure to develop a prospective cohort of clinical samples from children and older adults with invasive SA infections and age-matched controls. We will evaluate serial serologic samples obtained from these patients to define the targets and kinetics of the natural humoral response to SA and follow these patients for clinical assessments, including the possibility of re-infection. In parallel, we will transfer sera to mouse models of SA infection to define the protective characteristics of the human adaptive response. Successful completion of this aim will result in a list of specific candidate antibodies associated with protection against human SA infection.</p>
<p class="psms-ms-h1">Specific Aim 2: To identify and characterize protective and non-protective human antibodies targeting clinically relevant SA antigens.</p>
<p>Serologic assessment provides candidate antigen targets for intervention, but functional assays are critical for rational design of vaccines with a high likelihood of success. Using the cohort established in Aim 1, we will interrogate clinical samples and identify specific antibodies for a) their ability to confer protection, and b) the mechanisms of protection as defined by a series of in vivo and ex vivo models. Targeted antibody depletion of serum will be performed against selected antigens identified in Aim 1, and structural and functional profiling will elucidate protective and non-protective antibodies. <em>In vitro</em> bacterial killing and cytotoxicity assays coupled with structural analyses will be part of the battery of assays used to characterize protective and non-protective antibodies, and confirmatory assessments will occur by transfer to both wild-type and humanized mouse models. Successful completion of this aim will reveal the key determinants of the functional, adaptive human response to SA and define candidates for reverse vaccine development.</p>
<p class="psms-ms-h1">Specific Aim 3: To determine how prior humoral interaction with SA shapes vaccine efficacy.</p>
<p>The concept of original antigenic sin postulates that the immune response to first infection imprints itself on subsequent host responses to infections and vaccination. Using a prototype vaccine that targets a SA surface protein, IsdB, we have shown that immune imprinting and antibody interference impair an otherwise functional antibody response. This aim will determine the impact of pre-existing SA antibodies on both passive and active immunization strategies by defining antibody interference in specific vaccination models. We <strong>hypothesize</strong> that a truly effective antibody-based intervention must account for antibody interference and suppression and that subdominant antigen targets or antigens not prone to interference may be good vaccine targets. Successful completion of this aim will guide the rational assessment of putative vaccine candidates while accounting for the impacts of immune imprinting and interference related to prior host exposure to SA.</p>
</div>
</div>

<!-- SIMPLE MARKUP -->
<div class="psms-tab-panel psms-active" id="psms-panel-simple">
<div class="psms-scroll-box">
<p>As the leading cause of invasive bacterial infections in the US, <span class="hl-editorial" data-highlight="c5"><em>Staphylococcus aureus</em></span> (<span class="hl-editorial" data-highlight="c7"><strong>SA</strong></span>) has been designated as a priority target for vaccine development. However, these efforts are hampered by the inability to explore invasive staphylococcal infections in humans under controlled settings, combined with the lack of translational animal models able to accurately predict whether a vaccine will offer protection in humans. As a result, no tested SA vaccine has yet been successful at preventing infection.</p>
<p>Our group seeks to develop models that recapitulate the natural host environment <span class="hl-scientific" data-highlight="c22">in children and older adults</span> to better define the adaptive host response to invasive SA disease. We recently demonstrated that mice were protected from SA sepsis following the transfer of convalescent sera obtained from children with invasive staphylococcal disease, and <span class="hl-scientific" data-highlight="c29">alpha toxin</span>&ndash;specific antibodies purified from protective sera conferred partial SA immunity. We also identified non-protective human anti-SA antibodies that interfered with the protective effects of SA vaccines <span class="hl-impact" data-highlight="c41">due to the recall of non-protective memory responses and antibody competition</span>. Based on these findings, <span class="hl-rhetorical" data-highlight="c42"><strong>we hypothesize that SA infection in humans activates a functional but limited antibody response that may include <span class="hl-scientific" data-highlight="c49">non-protective or interfering antibodies that suppress the protective response</span></strong></span>. <span class="hl-rhetorical" data-highlight="c50">The central objective of this proposal is to elucidate critical mechanisms of human adaptive staphylococcal immunity, including the protective, non-protective, and suppressive responses to SA infection. The successful completion of the following Specific Aims will inform the development of novel and effective antibody-based approaches for preventing or treating SA infections while accounting for the presence of non-protective or suppressive factors.</span></p>
<p class="psms-ms-h1"><span class="hl-rhetorical" data-highlight="c65"><span class="hl-impact" data-highlight="c67">Specific Aim 1: <strong>Define protective antibody responses against SA antigens in children and older adults with invasive SA infections.</strong></span></span></p>
<p>SA is a highly evolved human pathogen, and the antigens produced during an invasive human infection remain poorly defined. Although some SA genes have been identified in clinical isolates, gene expression patterns during human infection and functional recognition of gene products by the host immune system remain understudied. We will leverage our existing infrastructure to develop a prospective cohort of clinical samples from children and older adults diagnosed with invasive SA infections and age-matched healthy controls. We will evaluate serial serologic samples obtained from these patients to define the targets and kinetics of the natural humoral response to SA. We will also track clinical assessments over time, which may include re-infection. In parallel<span class="hl-scientific" data-highlight="c91">,<span class="hl-rhetorical" data-highlight="c92"> we will transfer sera to mouse models of SA infection to</span></span> define the protective characteristics of the human adaptive response. Successful completion of this aim will result in a list of <span class="hl-scientific" data-highlight="c93">specific candidate antibodies</span> associated with protection against human SA infection.</p>
<p class="psms-ms-h1">Specific Aim 2: <strong>Identify and characterize protective and non-protective human antibodies targeting clinically relevant SA antigens.</strong></p>
<p>Serologic assessment provides candidate antigen targets for intervention, but functional assays are critical for the rational design of vaccines with a high likelihood of success. <span class="hl-rhetorical" data-highlight="c97">Using clinical samples obtained from the cohort established in Aim 1, we will characterize specific antibodies for the ability to confer protection and define the mechanisms through which protective effects are activated. <span class="hl-scientific" data-highlight="c108">We will use a targeted antibody depletion approach to remove antibodies targeting antigens identified in Aim 1.</span> A battery of <em>ex vivo</em> assays, including structural analyses and functional assessments (e.g., <em>in vitro</em> bacterial killing and cytotoxicity assays), will be used to characterize protective and non-protective antibodies. <span class="hl-scientific" data-highlight="c120">Antibody characterization will be validated by transfer to both wild-type and humanized mouse models.</span></span> Successful completion of this aim will reveal the key determinants of the functional, adaptive human response to SA and define candidates for reverse vaccine development.</p>
<p class="psms-ms-h1">Specific Aim 3: <strong>Determine how prior humoral interaction with SA shapes vaccine efficacy.</strong></p>
<p>The concept of original antigenic sin postulates that the immune response to the first infection imprints itself on subsequent host responses to infections and vaccination. Using a prototype vaccine that targets an SA surface protein, IsdB, we have shown that immune imprinting and antibody interference can impair an otherwise functional antibody response. We will determine the impact of pre-existing SA antibodies and antibody interference on both <span class="hl-scientific" data-highlight="c132">passive and active immunization strategies using specific vaccination models.</span> We <strong>hypothesize</strong> that a truly effective antibody-based intervention must account for antibody interference and suppression and that <span class="hl-scientific" data-highlight="c135">subdominant antigen targets</span> or antigens not prone to interference may be good vaccine targets. <span class="hl-scientific" data-highlight="c136">Successful completion of this aim will guide the rational assessment of putative vaccine candidates while accounting for the impacts of immune imprinting and interference <span class="hl-impact" data-highlight="c137">related to prior host exposure to SA.</span></span><span class="hl-impact" data-highlight="c138"></span></p>
</div>
</div>

<!-- ALL MARKUP -->
<div class="psms-tab-panel" id="psms-panel-all">
<div class="psms-scroll-box">
<p><span class="psms-del">Staphylococcus aureus (SA) is</span><span class="psms-ins">As</span> the leading cause of invasive bacterial infections in the US<span class="psms-del">. Despite its status</span><span class="psms-ins">, </span><span class="hl-editorial" data-highlight="c5"><em>Staphylococcus aureus</em></span> (<span class="hl-editorial" data-highlight="c7"><strong>SA</strong></span>)<span class="psms-ins"> has been designated</span> as a priority target for vaccine development<span class="psms-del">, all SA vaccines tested </span><span class="psms-ins">. However, these efforts are hampered by the inability </span>to <span class="psms-del">date have been unsuccessful. One consistent barrier has been </span><span class="psms-ins">explore invasive staphylococcal infections in humans under controlled settings, combined with </span>the lack of <span class="psms-del">reliable </span>translational animal models <span class="psms-del">that </span><span class="psms-ins">able to accurately </span>predict <span class="psms-ins">whether a </span>vaccine <span class="psms-ins">will offer </span>protection in humans. <span class="psms-del">Given the impossibility of controlled human</span><span class="psms-ins">As a result, no tested SA vaccine has yet been successful at preventing</span> infection<span class="psms-del"> models of invasive staphylococcal infections, we have sought to </span><span class="psms-ins">.</span></p>
<p>O<span class="psms-ins">ur group seeks to develop models that recapitulate the natural host environment </span><span class="hl-scientific" data-highlight="c22"><span class="psms-ins">in children and older adults</span></span><span class="psms-ins"> to better </span>define the adaptive host response <span class="psms-del">following natural </span><span class="psms-ins">to </span>invasive SA disease. <span class="psms-del">in children and older adults through models that best recapitulate the natural human host environment. </span>We recently demonstrated that <span class="psms-ins">mice were protected from SA sepsis following </span>the transfer of convalescent sera <span class="psms-ins">obtained </span>from children with invasive staphylococcal disease<span class="psms-del"> protected mice from SA sepsis</span>, and  <span class="hl-scientific" data-highlight="c29">alpha toxin</span><span class="psms-del">-</span><span class="psms-ins">&ndash;</span>specific antibodies purified from protective sera conferred partial <span class="psms-del">anti-staphylococcal </span><span class="psms-ins">SA </span>immunity. <span class="psms-del">Using the same approach, we discovered</span><span class="psms-ins">We also identified</span> non-protective human anti-SA antibodies that <span class="psms-del">abrogated otherwise </span><span class="psms-ins">interfered with the </span>protective <span class="psms-ins">effects of </span>SA vaccines<span class="psms-del">. Vaccine interference occurred because of</span><span class="psms-ins"> </span><span class="hl-impact" data-highlight="c41"><span class="psms-ins">due to the </span>recall of non-protective memory responses and antibody competition.</span> Based on these findings, <span class="hl-rhetorical" data-highlight="c42"><strong>we hypothesize that SA infection in humans <span class="psms-del">generates</span><span class="psms-ins">activates</span> a functional<span class="psms-del">,</span> but limited<span class="psms-del">,</span> antibody response that <span class="psms-del">is beset by</span><span class="psms-ins">may include</span> <span class="hl-scientific" data-highlight="c49">non-protective or interfering antibodies</span></strong></span><span class="hl-scientific" data-highlight="c49"><strong> that suppress the protective response</strong></span>. <span class="hl-rhetorical" data-highlight="c50"><span class="psms-del">Development of a successful antibody-based approach to SA must take these factors into account, but they remain poorly defined. The central objective of </span>The central objective of this proposal is to elucidate critical mechanisms of human <span class="psms-del">anti-staphylococcal antibody protection. These studies will elucidate critical mechanisms of </span>adaptive staphylococcal immunity, including the protective<span class="psms-del"> </span><span class="psms-ins">, non-protective, and suppressive </span>responses to SA <span class="psms-del">and to delineate these from non-protective or suppressive responses, in order to </span><span class="psms-ins">infection. </span>The successful completion of the following Specific Aims will inform <span class="psms-ins">the development of </span>novel <span class="psms-ins">and effective </span>antibody-based approaches <span class="psms-del">to prevent</span><span class="psms-ins">for preventing</span> or <span class="psms-del">treat</span><span class="psms-ins">treating</span> SA infections<span class="psms-del">. We propose three Aims to address these goals: </span><span class="psms-ins"> while accounting for the presence of non-protective or suppressive factors.</span></span></p>
<p class="psms-ms-h1"><span class="hl-rhetorical" data-highlight="c65">Specific Aim 1: <span class="psms-del">To define functionally</span><span class="hl-impact" data-highlight="c67"><span class="psms-ins">Define</span> protective antibody responses <span class="psms-del">to</span><span class="psms-ins">against</span> SA antigens in children and older adults with invasive SA infections.</span></span></p>
<p>SA is a highly evolved human pathogen, and <span class="psms-del">it remains unclear what </span><span class="psms-ins">the </span>antigens <span class="psms-del">are </span>produced <span class="psms-del">in the setting of</span><span class="psms-ins">during an</span> invasive human <span class="psms-del">infections. While certain</span><span class="psms-ins">infection remain poorly defined. Although some SA</span> genes <span class="psms-del">may be present</span><span class="psms-ins">have been identified</span> in clinical isolates, <span class="psms-del">this does not indicate</span><span class="psms-ins">gene</span> expression <span class="psms-ins">patterns </span>during human infection and functional recognition <span class="psms-ins">of gene products </span>by the host<span class="psms-ins"> immune system </span>remain understudied. We will leverage our existing infrastructure to develop a prospective cohort of clinical samples from children and older adults <span class="psms-ins">diagnosed </span>with invasive SA infections and age-matched <span class="psms-ins">healthy </span>controls. We will evaluate serial serologic samples obtained from these patients to define the targets and kinetics of the natural humoral response to SA<span class="psms-del"> and follow these patients for</span><span class="psms-ins">. We will also track</span> clinical assessments<span class="psms-del">, including the possibility of</span><span class="psms-ins"> over time, which may include</span> re-infection. In parallel<span class="hl-scientific" data-highlight="c91">,<span class="hl-rhetorical" data-highlight="c92"> we will transfer sera to mouse models of SA infection to</span></span> define the protective characteristics of the human adaptive response. Successful completion of this aim will result in a list of <span class="hl-scientific" data-highlight="c93">specific candidate antibodies</span> associated with protection against human SA infection.</p>
<p class="psms-ms-h1">Specific Aim 2:<span class="psms-del"> To</span> Identify and characterize protective and non-protective human antibodies targeting clinically relevant SA antigens.</p>
<p>Serologic assessment provides candidate antigen targets for intervention, but functional assays are critical for <span class="psms-ins">the </span>rational design of vaccines with a high likelihood of success. <span class="hl-rhetorical" data-highlight="c97">Using <span class="psms-ins">clinical samples obtained from </span>the cohort established in Aim 1, we will <span class="psms-del">interrogate clinical samples and </span><span class="psms-ins">characterize </span>specific antibodies for <span class="psms-del">a) their</span><span class="psms-ins">the</span> ability to confer protection<span class="psms-del">,</span> and <span class="psms-del">b)</span><span class="psms-ins">define</span> the mechanisms <span class="psms-del">of protection as defined by a series of in vivo and ex vivo models.</span><span class="psms-ins">through which protective effects are activated.</span> <span class="hl-scientific" data-highlight="c108"><span class="psms-ins">We will use a</span> targeted antibody depletion <span class="psms-del">of serum will be performed against selected</span><span class="psms-ins">approach to remove antibodies targeting</span> antigens identified in Aim 1<span class="psms-del">, and</span><span class="psms-ins">. </span></span><span class="psms-ins">A battery of <em>ex vivo</em> assays, including</span> structural <span class="psms-ins">analyses </span>and functional <span class="psms-del">profiling will elucidate protective and non-protective antibodies.</span><span class="psms-ins">assessments (e.g.,</span> <em>in vitro</em> bacterial killing and cytotoxicity assays<span class="psms-del"> coupled with structural analyses will be part of the battery of assays </span><span class="psms-ins">), will be </span>used to characterize protective and non-protective antibodies<span class="psms-del">, and confirmatory assessments</span><span class="psms-ins">. </span><span class="hl-scientific" data-highlight="c120"><span class="psms-ins">Antibody characterization</span> will <span class="psms-del">occur</span><span class="psms-ins">be validated</span> by transfer to both wild-type and humanized mouse models</span>.</span> Successful completion of this aim will reveal the key determinants of the functional, adaptive human response to SA and define candidates for reverse vaccine development.</p>
<p class="psms-ms-h1">Specific Aim 3:<span class="psms-del"> To</span> Determine how prior humoral interaction with SA shapes vaccine efficacy.</p>
<p>The concept of original antigenic sin postulates that the immune response to <span class="psms-ins">the </span>first infection imprints itself on subsequent host responses to infections and vaccination. Using a prototype vaccine that targets <span class="psms-del">a</span><span class="psms-ins">an</span> SA surface protein, IsdB, we have shown that immune imprinting and antibody interference <span class="psms-ins">can </span>impair an otherwise functional antibody response. <span class="psms-del">This aim</span><span class="psms-ins">We</span> will determine the impact of pre-existing SA antibodies <span class="psms-ins">and antibody interference </span>on both <span class="hl-scientific" data-highlight="c132">passive and active immunization strategies <span class="psms-del">by defining antibody interference in</span><span class="psms-ins">using</span> specific vaccination models.</span> We <strong>hypothesize</strong> that a truly effective antibody-based intervention must account for antibody interference and suppression and that <span class="hl-scientific" data-highlight="c135">subdominant antigen targets </span>or antigens not prone to interference may be good vaccine targets. <span class="hl-scientific" data-highlight="c136">Successful completion of this aim will guide the rational assessment of putative vaccine candidates while accounting for the impacts of immune imprinting and interference <span class="hl-impact" data-highlight="c137">related to prior host exposure to SA.</span></span><span class="hl-impact" data-highlight="c138"></span></p>
</div>
</div>

<!-- COMMENTS -->
<div class="psms-comments-col">
<div class="psms-comments-scroll" id="psms-comments-scroll">

  <div class="psms-card psms-editorial-card" data-comment="c5">
    <div class="psms-card-icon psms-editorial-icon">E</div>
    <div class="psms-card-body">
      <div class="psms-card-label psms-editorial-label">Editorial</div>
      <div class="psms-card-text">Italicize species names.</div>
    </div>
  </div>

  <div class="psms-card psms-editorial-card" data-comment="c7">
    <div class="psms-card-icon psms-editorial-icon">E</div>
    <div class="psms-card-body">
      <div class="psms-card-label psms-editorial-label">Editorial</div>
      <div class="psms-card-text">Bold or color abbreviations so reviewers can locate definitions quickly.</div>
    </div>
  </div>

  <div class="psms-card psms-scientific-card" data-comment="c22">
    <div class="psms-card-icon psms-scientific-icon">S</div>
    <div class="psms-card-body">
      <div class="psms-card-label psms-scientific-label">Scientific</div>
      <div class="psms-card-text">Clarify why children and older adults are the focus &mdash; e.g., heightened vulnerability &mdash; before introducing these groups.</div>
    </div>
  </div>

  <div class="psms-card psms-scientific-card" data-comment="c29">
    <div class="psms-card-icon psms-scientific-icon">S</div>
    <div class="psms-card-body">
      <div class="psms-card-label psms-scientific-label">Scientific</div>
      <div class="psms-card-text">Briefly explain alpha toxin's role in SA sepsis for readers unfamiliar with it.</div>
    </div>
  </div>

  <div class="psms-card psms-impact-card" data-comment="c41">
    <div class="psms-card-icon psms-impact-icon">I</div>
    <div class="psms-card-body">
      <div class="psms-card-label psms-impact-label">Impact / Framing</div>
      <div class="psms-card-text">Add detail on these mechanisms so reviewers understand which barriers must be overcome.</div>
    </div>
  </div>

  <div class="psms-card psms-rhetorical-card" data-comment="c42">
    <div class="psms-card-icon psms-rhetorical-icon">R</div>
    <div class="psms-card-body">
      <div class="psms-card-label psms-rhetorical-label">Rhetorical</div>
      <div class="psms-card-text">Bold the hypothesis so reviewers can easily verify it drives each aim.</div>
    </div>
  </div>

  <div class="psms-card psms-scientific-card" data-comment="c49">
    <div class="psms-card-icon psms-scientific-icon">S</div>
    <div class="psms-card-body">
      <div class="psms-card-label psms-scientific-label">Scientific</div>
      <div class="psms-card-text">Edit clarifies that non-protective antibodies drive suppression &mdash; confirm this matches your intent.</div>
    </div>
  </div>

  <div class="psms-card psms-rhetorical-card" data-comment="c50">
    <div class="psms-card-icon psms-rhetorical-icon">R</div>
    <div class="psms-card-body">
      <div class="psms-card-label psms-rhetorical-label">Rhetorical</div>
      <div class="psms-card-text">Repetitive sentences consolidated &mdash; confirm the edit retains your meaning.</div>
    </div>
  </div>

  <div class="psms-card psms-impact-card" data-comment="c67">
    <div class="psms-card-icon psms-impact-icon">I</div>
    <div class="psms-card-body">
      <div class="psms-card-label psms-impact-label">Impact / Framing</div>
      <div class="psms-card-text">State a testable hypothesis for each aim to avoid an exploratory appearance.</div>
    </div>
  </div>

  <div class="psms-card psms-rhetorical-card" data-comment="c65">
    <div class="psms-card-icon psms-rhetorical-icon">R</div>
    <div class="psms-card-body">
      <div class="psms-card-label psms-rhetorical-label">Rhetorical</div>
      <div class="psms-card-text">Bold the full aim heading so reviewers can compare it against your approach at a glance.</div>
    </div>
  </div>

  <div class="psms-card psms-scientific-card" data-comment="c91">
    <div class="psms-card-icon psms-scientific-icon">S</div>
    <div class="psms-card-body">
      <div class="psms-card-label psms-scientific-label">Scientific</div>
      <div class="psms-card-text">Explain why this passive-transfer model outperforms prior animal models that failed to predict human protection.</div>
    </div>
  </div>

  <div class="psms-card psms-rhetorical-card" data-comment="c92">
    <div class="psms-card-icon psms-rhetorical-icon">R</div>
    <div class="psms-card-body">
      <div class="psms-card-label psms-rhetorical-label">Rhetorical</div>
      <div class="psms-card-text">Model name restated here for clarity &mdash; adjust if the connection to the earlier description is already clear.</div>
    </div>
  </div>

  <div class="psms-card psms-scientific-card" data-comment="c93">
    <div class="psms-card-icon psms-scientific-icon">S</div>
    <div class="psms-card-body">
      <div class="psms-card-label psms-scientific-label">Scientific</div>
      <div class="psms-card-text">Note here that you will characterize both dominant and subdominant protective antibodies (introduced in Aim 3).</div>
    </div>
  </div>

  <div class="psms-card psms-rhetorical-card" data-comment="c97">
    <div class="psms-card-icon psms-rhetorical-icon">R</div>
    <div class="psms-card-body">
      <div class="psms-card-label psms-rhetorical-label">Rhetorical</div>
      <div class="psms-card-text">Repetition removed and aim description streamlined &mdash; confirm edits retain your intent.</div>
    </div>
  </div>

  <div class="psms-card psms-scientific-card" data-comment="c108">
    <div class="psms-card-icon psms-scientific-icon">S</div>
    <div class="psms-card-body">
      <div class="psms-card-label psms-scientific-label">Scientific</div>
      <div class="psms-card-text">Clarify whether depletion isolates antibodies iteratively or uses a leave-one-out design; this may also raise Aim dependency concerns.</div>
    </div>
  </div>

  <div class="psms-card psms-scientific-card" data-comment="c120">
    <div class="psms-card-icon psms-scientific-icon">S</div>
    <div class="psms-card-body">
      <div class="psms-card-label psms-scientific-label">Scientific</div>
      <div class="psms-card-text">Specify whether depleted serum or purified antibodies are transferred, and briefly define the humanized mouse model.</div>
    </div>
  </div>

  <div class="psms-card psms-scientific-card" data-comment="c132">
    <div class="psms-card-icon psms-scientific-icon">S</div>
    <div class="psms-card-body">
      <div class="psms-card-label psms-scientific-label">Scientific</div>
      <div class="psms-card-text">Define passive vs. active immunization and state how many distinct vaccination models will be tested.</div>
    </div>
  </div>

  <div class="psms-card psms-scientific-card" data-comment="c135">
    <div class="psms-card-icon psms-scientific-icon">S</div>
    <div class="psms-card-body">
      <div class="psms-card-label psms-scientific-label">Scientific</div>
      <div class="psms-card-text">Introduce and define "subdominant antigen targets" before using the term.</div>
    </div>
  </div>

  <div class="psms-card psms-scientific-card" data-comment="c136">
    <div class="psms-card-icon psms-scientific-icon">S</div>
    <div class="psms-card-body">
      <div class="psms-card-label psms-scientific-label">Scientific</div>
      <div class="psms-card-text">Aim 3 is underdeveloped &mdash; add detail on how the hypothesis will be tested and how subdominant antigens will be identified.</div>
    </div>
  </div>

  <div class="psms-card psms-impact-card" data-comment="c138">
    <div class="psms-card-icon psms-impact-icon">I</div>
    <div class="psms-card-body">
      <div class="psms-card-label psms-impact-label">Impact / Framing</div>
      <div class="psms-card-text">Add a closing impact statement summarizing how all three aims advance the field and public health.</div>
    </div>
  </div>

  <div class="psms-card psms-impact-card" data-comment="c137">
    <div class="psms-card-icon psms-impact-icon">I</div>
    <div class="psms-card-body">
      <div class="psms-card-label psms-impact-label">Impact / Framing</div>
      <div class="psms-card-text">State how common prior SA exposure is &mdash; reviewers need this to gauge whether immune imprinting plausibly undermines current vaccine efforts.</div>
    </div>
  </div>

</div>
</div>

</div>
</div>
</div>
`;

export function EditingDemo() {
  const rootRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!rootRef.current) return;
    // Non-null for the hoisted closures below (control-flow narrowing of a
    // guarded const is not preserved inside function declarations).
    const root: HTMLDivElement = rootRef.current;

    const TABS = 3;
    const TAB_NAMES = ["original", "simple", "all"];
    let current = 1;

    const layout = root.querySelector("#psms-layout") as HTMLElement;
    const track = root.querySelector("#psms-track") as HTMLElement;
    const pill = root.querySelector("#psms-pill") as HTMLElement;
    const labels = Array.from(
      track.querySelectorAll(".psms-track-label"),
    ) as HTMLElement[];
    if (!layout || !track || !pill || labels.length !== TABS) return;

    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const scrollBehavior: ScrollBehavior = reduce ? "auto" : "smooth";

    function clearAll() {
      root
        .querySelectorAll(".psms-card-lit,.psms-lit")
        .forEach((el) => el.classList.remove("psms-card-lit", "psms-lit"));
    }

    function switchTab(name: string) {
      root.querySelectorAll(".psms-tab-panel").forEach((p) => {
        p.classList.toggle("psms-active", p.id === "psms-panel-" + name);
      });
      layout.setAttribute("data-tab", name);
      current = TAB_NAMES.indexOf(name);
      clearAll();
    }

    function pillXForIdx(i: number) {
      return (
        labels[i].getBoundingClientRect().left -
        track.getBoundingClientRect().left -
        6
      );
    }

    function pillTo(idx: number, animate: boolean) {
      pill.classList.toggle("psms-snapping", !!animate && !reduce);
      pill.style.width = labels[idx].getBoundingClientRect().width + "px";
      pill.style.transform = "translateX(" + pillXForIdx(idx) + "px)";
      pill.classList.remove("psms-color-1", "psms-color-2");
      if (idx === 1) pill.classList.add("psms-color-1");
      if (idx === 2) pill.classList.add("psms-color-2");
      labels.forEach((l, i) => l.classList.toggle("psms-active", i === idx));
    }

    const onPillTransitionEnd = () => pill.classList.remove("psms-snapping");
    pill.addEventListener("transitionend", onPillTransitionEnd);

    function goTo(idx: number, animate: boolean) {
      idx = Math.max(0, Math.min(TABS - 1, idx));
      pillTo(idx, animate !== false);
      switchTab(TAB_NAMES[idx]);
    }

    function nearestIdx(x: number) {
      let best = 0;
      let bd = Infinity;
      for (let i = 0; i < TABS; i++) {
        const d = Math.abs(x - pillXForIdx(i));
        if (d < bd) {
          bd = d;
          best = i;
        }
      }
      return best;
    }

    let dragStartX = 0;
    let dragCurX = 0;
    let dragging = false;
    let startIdx = 0;
    let pillBaseX = 0;
    let pillBaseW = 0;
    const getX = (e: any) => (e.touches ? e.touches[0].clientX : e.clientX);

    function onMove(e: any) {
      if (e.cancelable) e.preventDefault();
      dragCurX = getX(e);
      const delta = dragCurX - dragStartX;
      if (Math.abs(delta) > 4) dragging = true;
      if (!dragging) return;
      const minX = pillXForIdx(0);
      const maxX = pillXForIdx(TABS - 1);
      const rawX = Math.max(minX, Math.min(maxX, pillBaseX + delta));
      const ni = nearestIdx(rawX);
      pill.style.transform = "translateX(" + rawX + "px)";
      pill.style.width = pillBaseW + "px";
      pill.classList.remove("psms-color-1", "psms-color-2");
      if (ni === 1) pill.classList.add("psms-color-1");
      if (ni === 2) pill.classList.add("psms-color-2");
      labels.forEach((l, i) => l.classList.toggle("psms-active", i === ni));
    }

    function onEnd() {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("touchmove", onMove);
      window.removeEventListener("mouseup", onEnd);
      window.removeEventListener("touchend", onEnd);
      if (!dragging) {
        const cx = dragStartX;
        let best = startIdx;
        let bd = Infinity;
        labels.forEach((l, i) => {
          const r = l.getBoundingClientRect();
          const d = Math.abs(cx - (r.left + r.width / 2));
          if (d < bd) {
            bd = d;
            best = i;
          }
        });
        goTo(best, true);
        return;
      }
      const rawX = Math.max(
        pillXForIdx(0),
        Math.min(pillXForIdx(TABS - 1), pillBaseX + (dragCurX - dragStartX)),
      );
      dragging = false;
      goTo(nearestIdx(rawX), true);
    }

    function onStart(e: any) {
      dragStartX = dragCurX = getX(e);
      dragging = false;
      startIdx = current;
      pillBaseX = pillXForIdx(startIdx);
      pillBaseW = labels[startIdx].getBoundingClientRect().width;
      pill.classList.remove("psms-snapping");
      window.addEventListener("mousemove", onMove);
      window.addEventListener("touchmove", onMove, { passive: false });
      window.addEventListener("mouseup", onEnd);
      window.addEventListener("touchend", onEnd);
    }

    track.addEventListener("mousedown", onStart);
    track.addEventListener("touchstart", onStart, { passive: true });

    function activateCard(card: HTMLElement) {
      const id = card.getAttribute("data-comment");
      const already = card.classList.contains("psms-card-lit");
      clearAll();
      if (already) return;
      card.classList.add("psms-card-lit");
      const panel = root.querySelector(
        ".psms-tab-panel.psms-active",
      ) as HTMLElement | null;
      if (!panel) return;
      const targets = panel.querySelectorAll(
        '[data-highlight="' + id + '"]',
      ) as NodeListOf<HTMLElement>;
      if (!targets.length) return;
      targets.forEach((el) => el.classList.add("psms-lit"));
      const box = panel.querySelector(".psms-scroll-box") as HTMLElement | null;
      if (box && targets[0]) {
        box.scrollTo({
          top:
            targets[0].getBoundingClientRect().top -
            box.getBoundingClientRect().top +
            box.scrollTop -
            40,
          behavior: scrollBehavior,
        });
      }
      const col = root.querySelector(
        "#psms-comments-scroll",
      ) as HTMLElement | null;
      if (col) {
        col.scrollTo({
          top:
            card.getBoundingClientRect().top -
            col.getBoundingClientRect().top +
            col.scrollTop -
            60,
          behavior: scrollBehavior,
        });
      }
    }

    function onClick(e: Event) {
      const target = e.target as HTMLElement;
      const card = target.closest(".psms-card") as HTMLElement | null;
      if (card) {
        activateCard(card);
        return;
      }
      const hl = target.closest("[data-highlight]") as HTMLElement | null;
      if (hl) {
        const m = root.querySelector(
          '.psms-card[data-comment="' + hl.getAttribute("data-highlight") + '"]',
        ) as HTMLElement | null;
        if (m) activateCard(m);
      }
    }
    root.addEventListener("click", onClick);

    const onResize = () => pillTo(current, false);
    window.addEventListener("resize", onResize);

    let raf2 = 0;
    const raf1 = requestAnimationFrame(() => {
      raf2 = requestAnimationFrame(() => {
        pillTo(1, false);
        switchTab("simple");
      });
    });

    return () => {
      pill.removeEventListener("transitionend", onPillTransitionEnd);
      track.removeEventListener("mousedown", onStart);
      track.removeEventListener("touchstart", onStart);
      root.removeEventListener("click", onClick);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("touchmove", onMove);
      window.removeEventListener("mouseup", onEnd);
      window.removeEventListener("touchend", onEnd);
      cancelAnimationFrame(raf1);
      cancelAnimationFrame(raf2);
    };
  }, []);

  return (
    <div
      className="psms-section"
      ref={rootRef}
      dangerouslySetInnerHTML={{ __html: PSMS_HTML }}
    />
  );
}
