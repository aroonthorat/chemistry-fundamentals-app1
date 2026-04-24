export interface Subtopic {
  id: string;
  title: string;
  content: string;
}

export interface DisciplineNote {
  id: string;
  title: string;
  description: string;
  subtopics: Subtopic[];
}

export const disciplineNotes: DisciplineNote[] = [
  {
    "id": "physical",
    "title": "Physical Chemistry",
    "description": "The foundation of chemistry, dealing with the quantitative aspects of chemical systems, energy, and reaction kinetics.",
    "subtopics": [
      {
        "id": "chemical_thermodynamics",
        "title": "Chemical Thermodynamics",
        "content": "<h2>1. Fundamentals and the First Law</h2><p>Thermodynamics is the study of energy transformations. In JEE/NEET, we focus on macroscopic properties and state functions. A <b>State Function</b> (like $U$, $H$, $S$, $G$) depends only on the current state, not the path taken.</p><h3>The First Law</h3><p>Energy cannot be created or destroyed, only transformed:</p><div class='math-block'>$$\\Delta U = q + w$$</div><ul><li><b>Work ($w$):</b> For expansion against constant external pressure, $w = -P_{ext}\\Delta V$. For reversible isothermal expansion, $w = -2.303nRT \\log(V_2/V_1)$.</li><li><b>Enthalpy ($H$):</b> Defined as $H = U + PV$. At constant pressure, $\\Delta H = q_p$.</li></ul><div class='wiki-callout callout-tip'><h4>💡 Pro Tip: Sign Convention</h4><p>Remember: Work done <b>on</b> the system is positive ($+w$), and work done <b>by</b> the system is negative ($-w$). This is the IUPAC convention!</p></div><h2>2. The Second Law and Spontaneity</h2><p>The universe tends toward disorder. Entropy ($S$) is a measure of this randomness. For a spontaneous process, $\\Delta S_{total} = \\Delta S_{sys} + \\Delta S_{surr} > 0$.</p><h3>Gibbs Free Energy ($G$)</h3><p>The ultimate criterion for spontaneity at constant $T$ and $P$:</p><div class='math-block'>$$\\Delta G = \\Delta H - T\\Delta S$$</div><ul><li><b>$\\Delta G < 0$:</b> Spontaneous (Exergonic).</li><li><b>$\\Delta G > 0$:</b> Non-spontaneous (Endergonic).</li><li><b>$\\Delta G = 0$:</b> Equilibrium.</li></ul><div class='wiki-callout callout-exam'><h4>🎯 JEE/NEET Corner</h4><p>The relation $\\Delta G^\\circ = -2.303RT \\log K_{eq}$ is frequently tested. Remember that $\\Delta G^\\circ$ refers to standard states, while $\\Delta G$ determines directionality at any state.</p></div>"
      },
      {
        "id": "chemical_kinetics",
        "title": "Chemical Kinetics",
        "content": "<h2>1. Rate Laws and Order</h2><p>Kinetics describes <i>how fast</i> a reaction occurs. The rate law is determined experimentally: $Rate = k[A]^x[B]^y$.</p><ul><li><b>Order:</b> The sum $x+y$. It can be fractional or zero.</li><li><b>Molecularity:</b> The number of reacting species in an elementary step. It is always a whole number (1, 2, or 3).</li></ul><h2>2. Integrated Rate Equations</h2><p><b>First Order Reactions:</b> Most common in exams. $k = \\frac{2.303}{t} \\log \\frac{[A]_0}{[A]_t}$. The half-life $t_{1/2} = \\frac{0.693}{k}$ is independent of initial concentration.</p><h2>3. Temperature Dependence</h2><p>The <b>Arrhenius Equation</b>: $k = A e^{-E_a/RT}$. As temperature increases, the fraction of molecules with energy $\\ge E_a$ increases exponentially, leading to a much faster rate.</p><div class='wiki-callout callout-tip'><h4>⚡ Quick Hack</h4><p>For every $10^\\circ C$ rise in temperature, the rate constant approximately doubles. This is known as the <b>Temperature Coefficient</b> (typically 2 to 3).</p></div>"
      },
      {
        "id": "electrochemistry",
        "title": "Electrochemistry",
        "content": "<h2>1. Electrochemical Cells</h2><p><b>Galvanic Cells:</b> Spontaneous chemical energy $\\to$ electrical energy ($\\Delta G < 0$). <b>Electrolytic Cells:</b> Electrical energy $\\to$ non-spontaneous chemical change.</p><h3>Nernst Equation</h3><p>Calculates cell potential under any conditions:</p><div class='math-block'>$$E_{cell} = E^\\circ_{cell} - \\frac{0.0591}{n} \\log Q \\quad (at 298 K)$$</div><h2>2. Conductance and Molar Conductivity</h2><p><b>Kohlrausch's Law:</b> At infinite dilution, each ion migrates independently. $\\Lambda_m^\\infty = \\nu_+ \\lambda_+^\\infty + \\nu_- \\lambda_-^\\infty$. This allows calculation of $\\Lambda_m^\\infty$ for weak electrolytes.</p><div class='wiki-callout callout-alert'><h4>⚠️ Common Pitfall</h4><p>In the Nernst equation, $n$ is the number of electrons transferred in the <i>balanced</i> redox reaction. Don't forget to balance the reaction first!</p></div>"
      }
    ]
  },
  {
    "id": "organic",
    "title": "Organic Chemistry",
    "description": "The chemistry of carbon compounds, focusing on functional groups, reaction mechanisms, and synthetic pathways.",
    "subtopics": [
      {
        "id": "goc",
        "title": "General Organic Chemistry",
        "content": "<h2>1. Electronic Effects</h2><p>Electronic effects determine the reactivity and stability of organic molecules.</p><ul><li><b>Inductive Effect:</b> Polarisation of $\\sigma$-bonds due to electronegativity. It decreases rapidly with distance.</li><li><b>Resonance Effect:</b> Delocalisation of $\\pi$-electrons. It is a permanent effect and much stronger than the inductive effect.</li><li><b>Hyperconjugation:</b> 'No-bond resonance' involving $\\sigma$-electrons of C-H bonds adjacent to unsaturated systems.</li></ul><h2>2. Reaction Intermediates</h2><p>Stability orders are critical for predicting major products:</p><ul><li><b>Carbocations ($C^+$):</b> $3^\\circ > 2^\\circ > 1^\\circ > methyl$. Stabilized by $+I$ and $+M$ effects.</li><li><b>Free Radicals:</b> Follow the same order as carbocations.</li><li><b>Carbanions ($C^-$):</b> $methyl > 1^\\circ > 2^\\circ > 3^\\circ$. Stabilized by $-I$ and $-M$ effects.</li></ul><div class='wiki-callout callout-tip'><h4>🔬 Mechanism Insight</h4><p>Always look for <b>Carbocation Rearrangement</b> (Hydride or Methyl shift) if a more stable carbocation can be formed. This is a favorite JEE topic!</p></div>"
      },
      {
        "id": "hydrocarbons",
        "title": "Alkanes, Alkenes, and Alkynes",
        "content": "<h2>1. Alkenes: Electrophilic Addition</h2><p>The most characteristic reaction of alkenes. <b>Markownikoff's Rule:</b> The negative part of the addendum goes to the carbon with fewer hydrogen atoms. <b>Peroxide Effect:</b> Only HBr shows Anti-Markownikoff addition in the presence of peroxides.</p><h2>2. Aromaticity and Huckel's Rule</h2><p>A compound is aromatic if it is Cyclic, Planar, Conjugated, and has $(4n+2)\\pi$ electrons. Non-aromatic compounds fail one of the first three criteria. Anti-aromatic compounds have $4n\\pi$ electrons.</p><div class='wiki-callout callout-exam'><h4>🌟 High-Yield Reagents</h4><p><b>Ozonolysis ($O_3, Zn/H_2O$):</b> Cleaves C=C bonds to form carbonyl compounds. It's the best way to locate the position of a double bond.</p></div>"
      }
    ]
  },
  {
    "id": "inorganic",
    "title": "Inorganic Chemistry",
    "description": "Study of the elements and their compounds, focusing on periodic trends, coordination chemistry, and bonding.",
    "subtopics": [
      {
        "id": "chemical_bonding",
        "title": "Chemical Bonding",
        "content": "<h2>1. VSEPR Theory and Geometry</h2><p>Valence Shell Electron Pair Repulsion theory explains why molecules have specific shapes. Repulsion order: $lp-lp > lp-bp > bp-bp$.</p><ul><li><b>$sp^3$ with 1 lone pair:</b> Pyramidal (e.g., $NH_3$).</li><li><b>$sp^3$ with 2 lone pairs:</b> Bent/V-shaped (e.g., $H_2O$).</li></ul><h2>2. Molecular Orbital Theory (MOT)</h2><p>Explains bonding in homonuclear diatomic molecules. For $B_2, C_2, N_2$, the $\\pi_{2p_x} = \\pi_{2p_y}$ orbitals are lower in energy than $\\sigma_{2p_z}$. For $O_2$ and $F_2$, the order is reversed.</p><div class='wiki-callout callout-tip'><h4>🧪 Bond Order Check</h4><p>Bond Order = $0.5(N_b - N_a)$. If Bond Order is 0, the molecule does not exist. Paramagnetism is due to unpaired electrons (like in $O_2$ and $B_2$).</p></div>"
      },
      {
        "id": "coordination_compounds",
        "title": "Coordination Chemistry",
        "content": "<h2>1. Isomerism in Complexes</h2><p><b>Geometrical Isomerism:</b> Cis/Trans for square planar ($MA_2B_2$) and octahedral ($MA_4B_2$). <b>Optical Isomerism:</b> Common in octahedral complexes with chelate ligands like 'en'.</p><h2>2. Crystal Field Theory (CFT)</h2><p>Splitting of d-orbitals in octahedral ($t_{2g}$ and $e_g$) and tetrahedral fields. The magnitude of splitting ($\\Delta_o$) depends on the ligand strength (Spectrochemical Series).</p><div class='wiki-callout callout-exam'><h4>🏆 JEE Favorite</h4><p>Strong field ligands (like $CN^-, CO$) cause pairing of electrons, leading to low-spin, inner-orbital complexes ($d^2sp^3$).</p></div>"
      }
    ]
  }
];

