/*
  Real institution and journal logos pulled from the WordPress media library.
  SVGs live under public/logos/ and are forced solid white in the marquee, so
  the mark itself carries the brand; alt text is for accessibility only.
  Institution order follows the source spec exactly. Journals are every SVG
  present in the uploads folder.
*/

type Logo = { src: string; name: string };

const inst = (file: string, name: string): Logo => ({
  src: `/logos/institutions/${file}.svg`,
  name,
});
const jrnl = (file: string, name: string): Logo => ({
  src: `/logos/journals/${file}.svg`,
  name,
});

export const institutions: Logo[] = [
  inst("logo-mayo-clinic", "Mayo Clinic"),
  inst("logo-md-anderson", "MD Anderson Cancer Center"),
  inst("logo-memorial-sloan-kettering", "Memorial Sloan Kettering"),
  inst("logo-baylor-college-of-medicine", "Baylor College of Medicine"),
  inst("logo-ucsf", "UCSF"),
  inst("logo-cumc", "Columbia University Medical Center"),
  inst("logo-washu-medicine", "WashU Medicine"),
  inst("logo-brigham-womens-hospital", "Brigham and Women's Hospital"),
  inst("logo-cedars-sinai", "Cedars-Sinai"),
  inst("logo-tch", "Texas Children's Hospital"),
  inst("logo-mount-sinai", "Mount Sinai"),
  inst("logo-houston-methodist", "Houston Methodist"),
  inst("logo-ut-southwestern", "UT Southwestern"),
  inst("logo-rice-university", "Rice University"),
  inst("logo-georgetown-university", "Georgetown University"),
  inst("logo-karolinska", "Karolinska Institutet"),
  inst("logo-hong-kong", "University of Hong Kong"),
  inst("logo-kaist", "KAIST"),
  inst("logo-uab", "University of Alabama at Birmingham"),
  inst("logo-indiana-university", "Indiana University"),
  inst("logo-tamu", "Texas A&M University"),
  inst("logo-osaka-university", "Osaka University"),
  inst("logo-uthealth-houston", "UTHealth Houston"),
  inst("logo-ttuhsc", "Texas Tech University Health Sciences Center"),
  inst("logo-yonsei", "Yonsei University"),
  inst("logo-cha", "CHA University"),
  inst("logo-ewha", "Ewha Womans University"),
  inst("logo-pvamu", "Prairie View A&M University"),
];

export const journals: Logo[] = [
  jrnl("logo-cell", "Cell"),
  jrnl("logo-cell-metabolism", "Cell Metabolism"),
  jrnl("logo-cancer-cell", "Cancer Cell"),
  jrnl("nature-communications", "Nature Communications"),
  jrnl("logo-nature-immunology", "Nature Immunology"),
  jrnl("logo-nature-human-behavior", "Nature Human Behaviour"),
  jrnl("logo-pnas", "PNAS"),
  jrnl("logo-sciadv", "Science Advances"),
  jrnl("logo-stm", "Science Translational Medicine"),
  jrnl("logo-ccr", "Clinical Cancer Research"),
  jrnl("logo-immunother", "Journal for ImmunoTherapy of Cancer"),
  jrnl("logo-cellular-molecular-immunology", "Cellular and Molecular Immunology"),
  jrnl("logo-jcgh", "Cellular and Molecular Gastroenterology and Hepatology"),
  jrnl("logo-trends-biotechnology", "Trends in Biotechnology"),
  jrnl("logo-trends-cell-biology", "Trends in Cell Biology"),
  jrnl("logo-trends-pharmacological-sciences", "Trends in Pharmacological Sciences"),
  jrnl("logo-smh", "Scientific journal"),
];
