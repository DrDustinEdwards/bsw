/*
  Real institution and journal logos pulled from the WordPress media library.
  SVGs live under public/logos/ and are forced solid white in the marquee, so
  the mark itself carries the brand; alt text is for accessibility only.
  Institution order follows the source spec exactly. Journals are every SVG
  present in the uploads folder.
*/

// width and height are each SVG's viewBox, so the img has its aspect ratio before the file loads.
export type Logo = { src: string; name: string; width: number; height: number };

const inst = (file: string, name: string, width: number, height: number): Logo => ({
  src: `/logos/institutions/${file}.svg`,
  name,
  width,
  height,
});
const jrnl = (file: string, name: string, width: number, height: number): Logo => ({
  src: `/logos/journals/${file}.svg`,
  name,
  width,
  height,
});

export const institutions: Logo[] = [
  inst("logo-mayo-clinic", "Mayo Clinic", 45, 56),
  inst("logo-md-anderson", "MD Anderson Cancer Center", 76, 39),
  inst("logo-memorial-sloan-kettering", "Memorial Sloan Kettering", 752, 230),
  inst("logo-baylor-college-of-medicine", "Baylor College of Medicine", 350, 300),
  inst("logo-ucsf", "UCSF", 80, 39),
  inst("logo-cumc", "Columbia University Medical Center", 516, 45),
  inst("logo-washu-medicine", "WashU Medicine", 470, 64),
  inst("logo-brigham-womens-hospital", "Brigham and Women's Hospital", 400, 100),
  inst("logo-cedars-sinai", "Cedars-Sinai", 144, 46),
  inst("logo-tch", "Texas Children's Hospital", 400, 51),
  inst("logo-mount-sinai", "Mount Sinai", 1147, 292),
  inst("logo-houston-methodist", "Houston Methodist", 177, 52),
  inst("logo-ut-southwestern", "UT Southwestern", 462, 91),
  inst("logo-rice-university", "Rice University", 275, 40),
  inst("logo-georgetown-university", "Georgetown University", 330, 70),
  inst("logo-karolinska", "Karolinska Institutet", 1070, 437),
  inst("logo-hong-kong", "University of Hong Kong", 380, 66),
  inst("logo-kaist", "KAIST", 234, 234),
  inst("logo-uab", "University of Alabama at Birmingham", 534, 78),
  inst("logo-indiana-university", "Indiana University", 300, 113),
  inst("logo-tamu", "Texas A&M University", 198, 29),
  inst("logo-osaka-university", "Osaka University", 233, 57),
  inst("logo-uthealth-houston", "UTHealth Houston", 500, 48),
  inst("logo-ttuhsc", "Texas Tech University Health Sciences Center", 119, 17),
  inst("logo-yonsei", "Yonsei University", 655, 128),
  inst("logo-cha", "CHA University", 511, 95),
  inst("logo-ewha", "Ewha Womans University", 416, 88),
  inst("logo-pvamu", "Prairie View A&M University", 323, 90),
];

export const journals: Logo[] = [
  jrnl("logo-cell", "Cell", 140, 32),
  jrnl("logo-cell-metabolism", "Cell Metabolism", 161, 32),
  jrnl("logo-cancer-cell", "Cancer Cell", 140, 32),
  jrnl("nature-communications", "Nature Communications", 318, 32),
  jrnl("logo-nature-immunology", "Nature Immunology", 266, 32),
  jrnl("logo-nature-human-behavior", "Nature Human Behaviour", 329, 32), // codespell:ignore (the journal's own name)
  jrnl("logo-pnas", "PNAS", 280, 104),
  jrnl("logo-sciadv", "Science Advances", 308, 64),
  jrnl("logo-stm", "Science Translational Medicine", 516, 64),
  jrnl("logo-ccr", "Clinical Cancer Research", 662, 33),
  jrnl("logo-immunother", "Journal for ImmunoTherapy of Cancer", 257, 40),
  jrnl("logo-cellular-molecular-immunology", "Cellular and Molecular Immunology", 141, 32),
  jrnl("logo-jcgh", "Cellular and Molecular Gastroenterology and Hepatology", 446, 80),
  jrnl("logo-trends-biotechnology", "Trends in Biotechnology", 356, 50),
  jrnl("logo-trends-cell-biology", "Trends in Cell Biology", 323, 50),
  jrnl("logo-trends-pharmacological-sciences", "Trends in Pharmacological Sciences", 497, 50),
  jrnl("logo-smh", "Scientific journal", 283, 66),
];
