/*
  Real institution and journal logos pulled from the WordPress media library.
  SVGs live under public/logos/ and are rendered on white tiles in the marquee
  so colored artwork stays legible on the dark band.
*/

export type Logo = { src: string; name: string };

const inst = (file: string, name: string): Logo => ({
  src: `/logos/institutions/${file}`,
  name,
});
const jrnl = (file: string, name: string): Logo => ({
  src: `/logos/journals/${file}`,
  name,
});

export const institutions: Logo[] = [
  inst("logo-mayo-clinic.svg", "Mayo Clinic"),
  inst("logo-md-anderson.svg", "MD Anderson Cancer Center"),
  inst("logo-memorial-sloan-kettering.svg", "Memorial Sloan Kettering"),
  inst("logo-baylor-college-of-medicine.svg", "Baylor College of Medicine"),
  inst("logo-ucsf.svg", "UCSF"),
  inst("logo-ut-southwestern.svg", "UT Southwestern"),
  inst("logo-uthealth-houston.svg", "UTHealth Houston"),
  inst("logo-houston-methodist.svg", "Houston Methodist"),
  inst("logo-mount-sinai.svg", "Mount Sinai"),
  inst("logo-cedars-sinai.svg", "Cedars-Sinai"),
  inst("logo-brigham-womens-hospital.svg", "Brigham and Women's Hospital"),
  inst("logo-cumc.svg", "Columbia University Medical Center"),
  inst("logo-georgetown-university.svg", "Georgetown University"),
  inst("logo-indiana-university.svg", "Indiana University"),
  inst("logo-rice-university.svg", "Rice University"),
  inst("logo-tamu.svg", "Texas A&M University"),
  inst("logo-tch.svg", "Texas Children's Hospital"),
  inst("logo-ttuhsc.svg", "Texas Tech University Health Sciences Center"),
  inst("logo-uab.svg", "University of Alabama at Birmingham"),
  inst("logo-pvamu.svg", "Prairie View A&M University"),
  inst("logo-washu-medicine.svg", "WashU Medicine"),
  inst("logo-karolinska.svg", "Karolinska Institutet"),
  inst("logo-osaka-university.svg", "Osaka University"),
  inst("logo-hong-kong.svg", "University of Hong Kong"),
  inst("logo-kaist.svg", "KAIST"),
  inst("logo-yonsei.svg", "Yonsei University"),
  inst("logo-ewha.svg", "Ewha Womans University"),
  inst("logo-cha.svg", "CHA University"),
];

export const journals: Logo[] = [
  jrnl("logo-cell.svg", "Cell"),
  jrnl("logo-cell-metabolism.svg", "Cell Metabolism"),
  jrnl("logo-cancer-cell.svg", "Cancer Cell"),
  jrnl("nature-communications.svg", "Nature Communications"),
  jrnl("logo-nature-immunology.svg", "Nature Immunology"),
  jrnl("logo-nature-human-behavior.svg", "Nature Human Behaviour"),
  jrnl("logo-pnas.svg", "PNAS"),
  jrnl("logo-sciadv.svg", "Science Advances"),
  jrnl("logo-stm.svg", "Science Translational Medicine"),
  jrnl("logo-ccr.svg", "Clinical Cancer Research"),
  jrnl("logo-immunother.svg", "Journal for ImmunoTherapy of Cancer"),
  jrnl("logo-cellular-molecular-immunology.svg", "Cellular and Molecular Immunology"),
  jrnl("logo-jcgh.svg", "Cellular and Molecular Gastroenterology and Hepatology"),
  jrnl("logo-trends-biotechnology.svg", "Trends in Biotechnology"),
  jrnl("logo-trends-cell-biology.svg", "Trends in Cell Biology"),
  jrnl("logo-trends-pharmacological-sciences.svg", "Trends in Pharmacological Sciences"),
  // logo-smh.svg omitted: could not be reliably identified (ambiguous mark with
  // stray placeholder text), so it is left out rather than mislabeled.
];
