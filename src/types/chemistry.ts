export interface Element {
  name: string;
  appearance: string | null;
  atomic_mass: number;
  boil: number | null;
  category: string;
  density: number | null;
  discovered_by: string | null;
  melt: number | null;
  molar_heat: number | null;
  named_by: string | null;
  number: number;
  period: number;
  group: number;
  phase: string;
  source: string;
  bohr_model_image: string | null;
  bohr_model_3d: string | null;
  spectral_img: string | null;
  summary: string;
  symbol: string;
  xpos: number;
  ypos: number;
  shells: number[];
  electron_configuration: string;
  electron_configuration_semantic: string;
  electron_affinity: number | null;
  electronegativity_pauling: number | null;
  ionization_energies: number[];
  'cpk-hex': string | null;
  image: {
    title: string;
    url: string;
    attribution: string;
  } | null;
  block: string;
}

export const CATEGORIES = [
  { id: 'all', name: 'All Elements', color: '#ffffff' },
  { id: 'alkali metal', name: 'Alkali Metals', color: '#ff6b6b' },
  { id: 'alkaline earth metal', name: 'Alkaline Earth', color: '#ff9f43' },
  { id: 'transition metal', name: 'Transition Metals', color: '#feca57' },
  { id: 'post-transition metal', name: 'Post-Transition', color: '#ff9ff3' },
  { id: 'metalloid', name: 'Metalloids', color: '#48dbfb' },
  { id: 'diatomic nonmetal', name: 'Diatomic Nonmetals', color: '#1dd1a1' },
  { id: 'polyatomic nonmetal', name: 'Polyatomic Nonmetals', color: '#54a0ff' },
  { id: 'noble gas', name: 'Noble Gases', color: '#00d2d3' },
  { id: 'lanthanide', name: 'Lanthanides', color: '#5f27cd' },
  { id: 'actinide', name: 'Actinides', color: '#c56cf0' },
];
