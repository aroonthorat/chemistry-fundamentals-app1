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
    "description": "A study of the physical properties and behavior of chemical systems, focusing on energy, rates, and electrochemical potential.",
    "subtopics": [
      {
        "id": "chemical_thermodynamics",
        "title": "Chemical Thermodynamics",
        "content": "<h2>1. Fundamentals and the First Law</h2><p>Thermodynamics in JEE/NEET focuses on energy transformations. The state of a system is defined by state functions like P, V, T, U, H, and S, which are independent of the path taken.</p><h3>The First Law</h3><p>Energy conservation is expressed as: $$\\Delta U = q + w$$ where $$w = -P_{ext}\\Delta V$$ for irreversible expansion and $$w = -2.303nRT \\log(V_2/V_1)$$ for reversible isothermal expansion. Enthalpy ($$H$$) is related to internal energy by $$H = U + PV$$.</p><h2>2. Thermochemistry</h2><p>Hess's Law of Constant Heat Summation states that the total enthalpy change for a reaction is the same whether it occurs in one step or several. Standard enthalpy of formation ($$\\Delta_f H^\\circ$$) is the change when one mole of a substance is formed from its elements in their most stable state.</p><h2>3. Second Law and Gibbs Free Energy</h2><p>The spontaneity of a process is determined by the total entropy change of the universe. For a system at constant T and P, the Gibbs Free Energy ($$G$$) is the criterion:</p>$$\\Delta G = \\Delta H - T\\Delta S$$<ul><li>$$\\Delta G < 0$$: Spontaneous process (Exergonic).</li><li>$$\\Delta G > 0$$: Non-spontaneous (Endergonic).</li><li>$$\\Delta G = 0$$: System at equilibrium.</li></ul><p>The relationship between $$\\Delta G^\\circ$$ and the equilibrium constant $$K$$ is: $$\\Delta G^\\circ = -RT \\ln K = -2.303RT \\log K$$</p>"
      },
      {
        "id": "chemical_kinetics",
        "title": "Chemical Kinetics",
        "content": "<h2>1. Rate of Reaction and Rate Laws</h2><p>Kinetics deals with the speed of reactions and the mechanisms involved. The rate is the change in concentration of reactants or products per unit time. For a reaction $$aA + bB \\to cC$$, the rate law is:</p>$$Rate = k[A]^x[B]^y$$<p>where $$x+y$$ is the overall order of the reaction. Note that order is an experimental quantity, whereas molecularity is a theoretical concept for elementary reactions.</p><h2>2. Integrated Rate Equations</h2><p><b>Zero Order:</b> $$[A]_t = [A]_0 - kt$$. Half-life $$t_{1/2} = [A]_0 / 2k$$.</p><p><b>First Order:</b> $$k = \\frac{2.303}{t} \\log \\frac{[A]_0}{[A]_t}$$. Half-life $$t_{1/2} = \\frac{0.693}{k}$$ (independent of initial concentration).</p><h2>3. Temperature Dependence and Collision Theory</h2><p>The Arrhenius Equation describes how the rate constant $$k$$ changes with temperature: $$k = A e^{-E_a/RT}$$ Taking the logarithm: $$\\log \\frac{k_2}{k_1} = \\frac{E_a}{2.303R} \\left[ \\frac{T_2 - T_1}{T_1 T_2} \\right]$$<ul><li><b>Activation Energy ($$E_a$$):</b> The energy barrier that must be overcome by reactants to form the activated complex.</li><li><b>Threshold Energy:</b> The minimum energy required for effective collisions.</li></ul>"
      },
      {
        "id": "electrochemistry",
        "title": "Electrochemistry",
        "content": "<h2>1. Galvanic Cells and Electrode Potential</h2><p>Galvanic cells convert chemical energy into electrical energy through spontaneous redox reactions. The standard electrode potential ($$E^\\circ$$) is measured against the Standard Hydrogen Electrode (SHE). The Nernst Equation calculates the cell potential under non-standard conditions:</p>$$E_{cell} = E^\\circ_{cell} - \\frac{0.0591}{n} \\log Q \\quad (at 298 K)$$<h2>2. Conductance in Electrolytic Solutions</h2><p>Conductivity ($$\\kappa$$) decreases with dilution, but Molar Conductivity ($$\\Lambda_m$$) increases. For strong electrolytes, $$\\Lambda_m$$ varies linearly with $$\\sqrt{c}$$ (Debye-Huckel-Onsager). <b>Kohlrausch's Law</b> states that at infinite dilution, the molar conductivity of an electrolyte is the sum of the limiting molar conductivities of its constituent ions:</p>$$\\Lambda_m^\\infty = \\nu_+ \\lambda_+^\\infty + \\nu_- \\lambda_-^\\infty$$<h2>3. Electrolysis and Faraday's Laws</h2><ul><li><b>First Law:</b> $$w = ZIt$$, where $$w$$ is the mass deposited and $$Z$$ is the electrochemical equivalent.</li><li><b>Second Law:</b> When the same quantity of electricity passes through different electrolytes, the masses of substances liberated are proportional to their chemical equivalent weights ($$w \\propto E$$).</li></ul>"
      },
      {
        "id": "solid_state",
        "title": "The Solid State",
        "content": "<h2>1. Crystalline vs Amorphous</h2><p>Solids are the quiet, orderly citizens of the molecular world. Crystalline solids feature long-range order and sharp melting points, while amorphous solids (like glass) are actually 'supercooled liquids' with no definite arrangement.</p><h2>2. Unit Cells and Lattices</h2><p>The smallest repeating unit of a space lattice is the <b>Unit Cell</b>. There are 14 possible 3D lattices called <b>Bravais Lattices</b>.</p><ul><li><b>Simple Cubic:</b> 1 atom/cell. Packing efficiency: 52.4%.</li><li><b>BCC (Body-Centered):</b> 2 atoms/cell. Packing efficiency: 68%.</li><li><b>FCC (Face-Centered):</b> 4 atoms/cell. Packing efficiency: 74% (most efficient!).</li></ul><p>Density of a unit cell: $$d = \\frac{z \\cdot M}{a^3 \\cdot N_A}$$ where $$z$$ is atoms per unit cell and $$a$$ is edge length.</p><h2>3. Imperfections and Defects</h2><p>No crystal is perfect! <b>Point defects</b> change the vibe:</p><ul><li><b>Schottky Defect:</b> Equal numbers of cations and anions missing. Decreases density.</li><li><b>Frenkel Defect:</b> An ion (usually cation) moves to an interstitial site. Density remains same.</li></ul>"
      },
      {
        "id": "solutions",
        "title": "Solutions and Colligative Properties",
        "content": "<h2>1. Concentration and Solubility</h2><p>Solutions are homogeneous mixtures where the solute disappears into the solvent. Solubility of gases in liquids follows <b>Henry's Law</b>: $$p = K_H \\chi$$, where $$p$$ is partial pressure and $$\\chi$$ is mole fraction.</p><h2>2. Raoult's Law and Ideal Solutions</h2><p>For a solution of volatile liquids, the partial vapor pressure of each component is proportional to its mole fraction: $$p_A = p_A^\\circ \\chi_A$$. <b>Ideal solutions</b> follow this across all concentrations, with $$\\Delta H_{mix} = 0$$ and $$\\Delta V_{mix} = 0$$.</p><h2>3. Colligative Properties</h2><p>Properties that depend ONLY on the number of solute particles, not their identity:</p><ul><li><b>Relative Lowering of Vapor Pressure:</b> $$\\frac{p_1^\\circ - p_1}{p_1^\\circ} = \\chi_2$$</li><li><b>Elevation of Boiling Point:</b> $$\\Delta T_b = K_b m$$</li><li><b>Depression of Freezing Point:</b> $$\\Delta T_f = K_f m$$</li><li><b>Osmotic Pressure:</b> $$\\Pi = CRT$$</li></ul><p><b>Van't Hoff Factor ($$i$$):</b> Accounts for dissociation or association. $$i = \\text{Observed property} / \\text{Calculated property}$$.</p>"
      },
      {
        "id": "atomic_structure",
        "title": "Structure of Atom",
        "content": "<h2>1. Subatomic Particles and Bohr's Model</h2><p>The journey from Dalton's 'indivisible' atom to the quantum world. Bohr's model introduced quantized energy levels: $$E_n = -2.18 \\times 10^{-18} \\left( \\frac{Z^2}{n^2} \\right) \\text{ J/atom}$$. Electrons jump between levels, emitting or absorbing photons of frequency $$\\nu = \\Delta E / h$$.</p><h2>2. Quantum Mechanical Model</h2><p><b>Heisenberg's Uncertainty Principle:</b> $$\\Delta x \\cdot \\Delta p \\ge \\frac{h}{4\\pi}$$. We can't know exactly where an electron is, only where it's likely to be. <b>De Broglie's Relationship:</b> $$\\lambda = \\frac{h}{mv}$$.</p><h2>3. Quantum Numbers and Orbitals</h2><ul><li><b>Principal ($$n$$):</b> Size and energy of orbital.</li><li><b>Azimuthal ($$l$$):</b> Shape (0 to $$n-1$$). $$s, p, d, f$$.</li><li><b>Magnetic ($$m_l$$):</b> Orientation in space ($$-l$$ to $$+l$$).</li><li><b>Spin ($$m_s$$):</b> Electron rotation ($$+\\frac{1}{2}$$ or $$-\\frac{1}{2}$$).</li></ul><p><b>Pauli Exclusion Principle:</b> No two electrons can have the same four quantum numbers. <b>Hund's Rule:</b> Pairing occurs only after each degenerate orbital is singly occupied.</p>"
      },
      {
        "id": "equilibrium",
        "title": "Chemical Equilibrium",
        "content": "<h2>1. Dynamic Equilibrium</h2><p>Equilibrium is reached when the rate of forward reaction equals the rate of backward reaction. The equilibrium constant ($$K_c$$) is defined as:</p>$$K_c = \\frac{[C]^c [D]^d}{[A]^a [B]^b}$$<p>For gaseous reactions, $$K_p = K_c(RT)^{\\Delta n_g}$$.</p><h2>2. Le Chatelier's Principle</h2><p>If a system at equilibrium is disturbed, it shifts to counteract the change:</p><ul><li><b>Concentration:</b> Add reactant, shift right.</li><li><b>Pressure:</b> Increase pressure, shift to side with fewer gas moles.</li><li><b>Temperature:</b> Increase T, shift in endothermic direction.</li></ul><h2>3. Relation between $$G$$ and $$K$$</h2><p>$$\\Delta G = \\Delta G^\\circ + RT \\ln Q$$. At equilibrium ($$\\Delta G = 0$$):</p>$$\\Delta G^\\circ = -RT \\ln K$$"
      },
      {
        "id": "ionic_equilibrium",
        "title": "Ionic Equilibrium",
        "content": "<h2>1. Acids, Bases, and pH</h2><p><b>Ostwald's Dilution Law:</b> For a weak electrolyte, $$\\alpha = \\sqrt{K_a / C}$$. Degree of dissociation increases with dilution. The pH is defined as $$-\\log[H^+]$$. For water at 298K, $$K_w = [H^+][OH^-] = 10^{-14}$$.</p><h2>2. Buffer Solutions</h2><p>Solutions that resist pH changes. <b>Henderson-Hasselbalch Equation:</b></p>$$pH = pK_a + \\log \\frac{[Salt]}{[Acid]}$$<p>Buffers are vital in biological systems (like blood) to maintain homeostasis.</p><h2>3. Solubility Product ($$K_{sp}$$)</h2><p>For a sparingly soluble salt $$A_xB_y \\leftrightharpoons xA^{y+} + yB^{x-}$$, the solubility product is: $$K_{sp} = [A^{y+}]^x [B^{x-}]^y$$. Precipitation occurs if the Ionic Product ($$Q_{sp}$$) exceeds $$K_{sp}$$.</p>"
      },
      {
        "id": "redox",
        "title": "Redox Reactions",
        "content": "<h2>1. Oxidation and Reduction</h2><p>Oxidation is loss of electrons (LEO); Reduction is gain of electrons (GER). Oxidation Number rules: Free elements are 0, Oxygen is usually -2 (except peroxides), Hydrogen is +1 (except hydrides).</p><h2>2. Balancing Redox Reactions</h2><ul><li><b>Oxidation Number Method:</b> Equalize the total increase and decrease in oxidation numbers.</li><li><b>Half-Reaction Method:</b> Balance atoms other than O and H, then balance O using $$H_2O$$, then H using $$H^+$$, and finally charge using electrons ($$e^-$$).</li></ul><h2>3. Standard Electrode Potentials</h2><p>The Electrochemical Series ranks elements by their reducing power. A negative $$E^\\circ$$ means the element is a strong reducing agent (easily oxidized).</p>"
      }
    ]
  },
  {
    "id": "organic",
    "title": "Organic Chemistry",
    "description": "Focuses on the structure, properties, and reactions of carbon-based compounds, emphasizing mechanisms and functional group transformations.",
    "subtopics": [
      {
        "id": "goc",
        "title": "General Organic Chemistry (GOC)",
        "content": "<h2>1. Electronic Effects</h2><p>The behavior of organic molecules is dictated by how electrons are distributed. Key effects include:</p><ul><li><b>Inductive Effect:</b> Permanent displacement of $$\\sigma$$-electrons due to electronegativity differences (-I and +I effects).</li><li><b>Resonance (Mesomeric) Effect:</b> Delocalization of $$\\pi$$-electrons in conjugated systems. It is the most powerful effect for stabilizing intermediates.</li><li><b>Hyperconjugation:</b> Delocalization of $$\\sigma$$-electrons of C-H bonds with adjacent $$\\pi$$ or p-orbitals (Baker-Nathan effect).</li></ul><h2>2. Reaction Intermediates</h2><p><b>Carbocations:</b> $$sp^2$$ hybridized carbons with a positive charge. Stability: $$3^\\circ > 2^\\circ > 1^\\circ > methyl$$ (enhanced by +I, +M, and hyperconjugation).</p><p><b>Carbanions:</b> $$sp^3$$ hybridized (usually pyramidal) with a negative charge. Stability: $$methyl > 1^\\circ > 2^\\circ > 3^\\circ$$ (enhanced by -I and -M effects).</p><h2>3. Acid-Base Strength</h2><p>Acidity increases with the stability of the conjugate base. For phenols, electron-withdrawing groups (EWG) like $$-NO_2$$ increase acidity, especially at ortho/para positions. Basicity of amines in aqueous solution follows the order: $$2^\\circ > 1^\\circ > 3^\\circ$$ for methyl groups due to inductive, steric, and solvation effects.</p>"
      },
      {
        "id": "hydrocarbons",
        "title": "Hydrocarbons",
        "content": "<h2>1. Alkanes and Conformations</h2><p>Alkanes are relatively inert but undergo free radical substitution. In ethane, the <b>staggered</b> conformation is more stable than the <b>eclipsed</b> conformation due to minimized torsional strain.</p><h2>2. Alkenes and Electrophilic Addition</h2><p>Alkenes react with electrophiles. According to <b>Markownikoff's Rule</b>, the electrophile ($$H^+$$) adds to the carbon with more hydrogens to form the more stable carbocation. <b>Anti-Markownikoff</b> addition occurs with HBr in the presence of peroxides (Kharasch effect) via a free radical mechanism.</p><h2>3. Aromatic Hydrocarbons</h2><p>Benzene is exceptionally stable due to resonance (aromaticity). To be aromatic, a compound must be planar, cyclic, conjugated, and follow <b>Huckel's Rule</b> ($$(4n+2)\\pi$$ electrons). Benzene undergoes Electrophilic Aromatic Substitution ($$S_EAr$$), such as:</p><ul><li><b>Nitration:</b> $$HNO_3 + H_2SO_4$$ (forms $$NO_2^+$$).</li><li><b>Friedel-Crafts Alkylation:</b> $$RX + AlCl_3$$ (forms $$R^+$$).</li><li><b>Sulphonation:</b> Fuming $$H_2SO_4$$ (forms $$SO_3$$).</li></ul>"
      },
      {
        "id": "carbonyl_compounds",
        "title": "Aldehydes, Ketones, and Carboxylic Acids",
        "content": "<h2>1. Nucleophilic Addition</h2><p>The carbonyl carbon is electrophilic. Reactions include addition of HCN, $$NaHSO_3$$, Grignard reagents ($$RMgX$$), and alcohols (acetal formation). Reactivity order: $$HCHO > RCHO > RCOR$$.</p><h2>2. Named Reactions</h2><ul><li><b>Aldol Condensation:</b> Occurs in aldehydes/ketones with $$\\alpha$$-hydrogen in the presence of dilute alkali. Forms $$\\beta$$-hydroxy carbonyl compounds.</li><li><b>Cannizzaro Reaction:</b> Occurs in aldehydes with <i>no</i> $$\\alpha$$-hydrogen (e.g., HCHO, $$C_6H_5CHO$$) with concentrated alkali. It is a disproportionation reaction forming an alcohol and a carboxylate salt.</li><li><b>Clemmensen Reduction:</b> Carbonyl group $$\\to CH_2$$ using $$Zn-Hg/HCl$$.</li></ul><h2>3. Carboxylic Acids and Derivatives</h2><p>Acids have high boiling points due to extensive hydrogen bonding (dimerization). The <b>Hell-Volhard-Zelinsky (HVZ)</b> reaction replaces $$\\alpha$$-hydrogens with halogens using $$X_2/Red \\ P$$. Esterification ($$RCOOH + R'OH \\leftrightharpoons RCOOR' + H_2O$$) is an acid-catalyzed equilibrium process.</p>"
      },
      {
        "id": "amines",
        "title": "Amines and Nitrogen Compounds",
        "content": "<h2>1. Preparation and Properties</h2><p>Amines are the ammonia-cousins of the organic world. They can be prepared via <b>Hoffmann Bromamide Degradation</b>: $$RCONH_2 + Br_2 + 4NaOH \\to RNH_2 + Na_2CO_3 + 2NaBr + 2H_2O$$. This reaction is a 'magic' way to shorten a carbon chain by one atom!</p><h2>2. Chemical Reactions</h2><ul><li><b>Carbylamine Reaction:</b> Primary amines react with chloroform and ethanolic KOH to form foul-smelling isocyanides ($$RNC$$). A classic test for primary amines!</li><li><b>Hinsberg Test:</b> Uses benzenesulphonyl chloride ($$C_6H_5SO_2Cl$$) to distinguish between $$1^\\circ, 2^\\circ$$, and $$3^\\circ$$ amines.</li></ul><h2>3. Diazonium Salts</h2><p>At low temperatures ($$0-5^\\circ C$$), primary aromatic amines form diazonium salts ($$ArN_2^+Cl^-$$). These are versatile intermediates for synthesizing phenols, haloarenes, and cyanides via <b>Sandmeyer</b> and <b>Gattermann</b> reactions.</p>"
      },
      {
        "id": "biomolecules",
        "title": "Biomolecules",
        "content": "<h2>1. Carbohydrates</h2><p>Life's fuel! They are polyhydroxy aldehydes or ketones. <b>Glucose</b> ($$C_6H_{12}O_6$$) is an aldohexose that exists in cyclic hemiacetal forms ($\\alpha$ and $\\beta$ anomers). Sucrose is a non-reducing sugar because its glycosidic linkage involves the reducing groups of both glucose and fructose.</p><h2>2. Proteins and Amino Acids</h2><p>Proteins are polymers of $$\\alpha$$-amino acids linked by <b>peptide bonds</b> ($-CONH-$). Primary structure is the sequence, secondary involves $$\\alpha$$-helices and $$\\beta$$-pleated sheets (H-bonding), and tertiary structure gives the overall 3D shape (active site formation).</p><h2>3. Nucleic Acids</h2><p>The blueprints of life. <b>DNA</b> contains deoxyribose and bases (A, G, C, T) in a double helix. <b>RNA</b> contains ribose and Uracil instead of Thymine. They are polymers of nucleotides (Sugar + Base + Phosphate).</p>"
      },
      {
        "id": "haloalkanes",
        "title": "Haloalkanes and Haloarenes",
        "content": "<h2>1. Nomenclature and Nature of C-X Bond</h2><p>Haloalkanes are organic compounds containing one or more halogen atoms. The C-X bond is polar due to the electronegativity of halogens ($$X = F, Cl, Br, I$$).</p><h2>2. Nucleophilic Substitution ($$S_N1$$ and $$S_N2$$)</h2><ul><li><b>$$S_N2$$ Mechanism:</b> Single step, bimolecular, inversion of configuration (Walden Inversion). Reactivity: $$CH_3X > 1^\\circ > 2^\\circ > 3^\\circ$$.</li><li><b>$$S_N1$$ Mechanism:</b> Two steps via carbocation intermediate, unimolecular, racemization occurs. Reactivity: $$3^\\circ > 2^\\circ > 1^\\circ > CH_3X$$.</li></ul><h2>3. Important Reactions</h2><ul><li><b>Wurtz Reaction:</b> $$2RX + 2Na \\xrightarrow{\\text{dry ether}} R-R + 2NaX$$.</li><li><b>Fittig Reaction:</b> Coupling of two aryl halides using Sodium.</li><li><b>Finkelstein Reaction:</b> $$R-X + NaI \\to R-I + NaX$$ (Halogen exchange).</li></ul>"
      },
      {
        "id": "alcohols_phenols",
        "title": "Alcohols, Phenols and Ethers",
        "content": "<h2>1. Preparation and Acidity</h2><p>Alcohols are prepared from alkenes via acid-catalyzed hydration or hydroboration-oxidation. <b>Phenols</b> are more acidic than alcohols due to the resonance stabilization of the phenoxide ion.</p><h2>2. Key Chemical Tests</h2><ul><li><b>Lucas Test:</b> Distinguishes $$1^\\circ, 2^\\circ, 3^\\circ$$ alcohols using $$ZnCl_2/HCl$$. $$3^\\circ$$ alcohols give immediate turbidity.</li><li><b>Reimer-Tiemann Reaction:</b> Phenol + Chloroform + aq. NaOH $$\\to$$ Salicylaldehyde.</li><li><b>Kolbe's Reaction:</b> Phenol + $$CO_2$$ + NaOH $$\\to$$ Salicylic Acid.</li></ul><h2>3. Ethers</h2><p>Prepared via <b>Williamson Synthesis</b>: $$R-ONa + R'-X \\to R-O-R' + NaX$$. Note: The halide must be primary ($$1^\\circ$$) to avoid elimination.</p>"
      },
      {
        "id": "polymers",
        "title": "Polymers",
        "content": "<h2>1. Classification</h2><p>Polymers are giant molecules (macromolecules) formed by repeating monomers. They can be natural (DNA, protein), semi-synthetic (cellulose nitrate), or synthetic (Nylon, Polythene).</p><h2>2. Types of Polymerization</h2><ul><li><b>Addition Polymerization:</b> Repeated addition of monomers with double/triple bonds (e.g., Polythene, Teflon, PVC).</li><li><b>Condensation Polymerization:</b> Loss of small molecules like $$H_2O, NH_3$$ (e.g., Nylon 6,6, Terylene, Bakelite).</li></ul><h2>3. Rubber and Biodegradable Polymers</h2><ul><li><b>Vulcanization:</b> Heating natural rubber with sulphur to improve elasticity and strength.</li><li><b>Biodegradable Polymers:</b> PHBV and Nylon 2-nylon 6 are important for reducing environmental impact.</li></ul>"
      }
    ]
  },
  {
    "id": "inorganic",
    "title": "Inorganic Chemistry",
    "description": "Exploration of the periodic table, chemical bonding, and coordination complexes, focusing on electronic structures and properties.",
    "subtopics": [
      {
        "id": "chemical_bonding",
        "title": "Chemical Bonding and Molecular Structure",
        "content": "<h2>1. VSEPR Theory</h2><p>The Valence Shell Electron Pair Repulsion theory predicts molecular geometry based on minimizing repulsion between electron pairs. The repulsion order is: $$lp-lp > lp-bp > bp-bp$$.</p><ul><li><b>$$AX_2L_2$$ (e.g., $$H_2O$$):</b> Bent shape ($$104.5^\\circ$$).</li><li><b>$$AX_3L_1$$ (e.g., $$NH_3$$):</b> Pyramidal shape ($$107^\\circ$$).</li></ul><h2>2. Hybridization</h2><p>The mixing of atomic orbitals to form equivalent hybrid orbitals. Steric number ($$SN = \\text{sigma bonds} + \\text{lone pairs}$$) determines hybridization:</p><ul><li>$$SN=2$$: $$sp$$ (Linear)</li><li>$$SN=3$$: $$sp^2$$ (Trigonal Planar)</li><li>$$SN=4$$: $$sp^3$$ (Tetrahedral)</li><li>$$SN=5$$: $$sp^3d$$ (Trigonal Bipyramidal)</li></ul><h2>3. Molecular Orbital Theory (MOT)</h2><p>MOT explains the paramagnetic nature of $$O_2$$. Bond order is calculated as $$B.O. = 0.5(N_b - N_a)$$. For $$N_2$$, $$B.O.=3$$ (diamagnetic). For $$O_2$$, $$B.O.=2$$ (paramagnetic due to two unpaired electrons in $$\\pi^*$$ orbitals).</p>"
      },
      {
        "id": "coordination_compounds",
        "title": "Coordination Compounds",
        "content": "<h2>1. Werner's Theory and IUPAC</h2><p>Werner proposed Primary Valency (oxidation state, ionizable) and Secondary Valency (coordination number, non-ionizable). IUPAC nomenclature involves naming ligands alphabetically, then the metal with its oxidation state in Roman numerals.</p><h2>2. Crystal Field Theory (CFT)</h2><p>CFT treats ligands as point charges causing the splitting of d-orbitals. In an octahedral field, d-orbitals split into $$t_{2g}$$ (lower energy) and $$e_g$$ (higher energy). The energy difference is $$\\Delta_o$$.</p><ul><li><b>Spectrochemical Series:</b> $$I^- < Br^- < S^{2-} < Cl^- < F^- < OH^- < H_2O < NH_3 < en < CN^- < CO$$.</li><li><b>Pairing Energy ($$P$$):</b> If $$\\Delta_o > P$$, electrons pair up (Low Spin). If $$\\Delta_o < P$$, electrons remain unpaired (High Spin).</li></ul><h2>3. Isomerism</h2><p><b>Structural Isomerism:</b> Linkage ($$NO_2$$ vs $$ONO$$), Ionization, Coordination, and Hydrate isomerism. <b>Stereoisomerism:</b> Geometrical (cis/trans or fac/mer) and Optical (dextro/laevo, common in octahedral complexes with bidentate ligands like $$[Co(en)_3]^{3+}$$).</p>"
      },
      {
        "id": "d_and_f_block",
        "title": "d- and f-Block Elements",
        "content": "<h2>1. Transition Elements (d-Block)</h2><p>Elements with partially filled d-orbitals. They exhibit variable oxidation states, form colored ions (due to d-d transitions), and act as catalysts. Magnetic moment: $$\\mu = \\sqrt{n(n+2)}$$ B.M., where $$n$$ is the number of unpaired electrons.</p><h2>2. Important Compounds</h2><ul><li><b>Potassium Dichromate ($$K_2Cr_2O_7$$):</b> A powerful oxidizing agent. In acidic medium: $$Cr_2O_7^{2-} + 14H^+ + 6e^- \\to 2Cr^{3+} + 7H_2O$$.</li><li><b>Potassium Permanganate ($$KMnO_4$$):</b> Dark purple crystals. Shows intense color due to charge transfer transitions.</li></ul><h2>3. Inner Transition Elements (f-Block)</h2><p><b>Lanthanoids:</b> Exhibit <b>Lanthanoid Contraction</b>—the steady decrease in atomic and ionic radii with increasing atomic number due to poor shielding by 4f electrons. <b>Actinoids:</b> Radioactive elements with more complex oxidation states than lanthanoids.</p>"
      },
      {
        "id": "metallurgy",
        "title": "General Principles of Metallurgy",
        "content": "<h2>1. Concentration of Ores</h2><p>Separating the good stuff from the 'gangue' (waste). <b>Froth Flotation</b> is used for sulphide ores, using pine oil as a foaming agent. <b>Leaching</b> uses chemical reactions (like cyanide for gold extraction).</p><h2>2. Extraction and Reduction</h2><ul><li><b>Calcination:</b> Heating ore in absence of air (for carbonates/hydroxides).</li><li><b>Roasting:</b> Heating ore in presence of air (for sulphides).</li><li><b>Smelting:</b> Reduction with Carbon/Coke in a blast furnace.</li></ul><h2>3. Refining Processes</h2><p>Making it 99.9% pure!</p><ul><li><b>Distillation:</b> For low boiling metals (Zn, Hg).</li><li><b>Mond Process:</b> For refining Nickel using Carbon Monoxide ($$Ni + 4CO \\leftrightharpoons Ni(CO)_4$$).</li><li><b>Van Arkel Method:</b> For Zr and Ti using Iodine to form volatile iodides.</li></ul>"
      },
      {
        "id": "p_block",
        "title": "p-Block Elements",
        "content": "<h2>1. Group 13 to 18 characteristics</h2><p>The p-block is unique as it contains metals, non-metals, and metalloids. General electronic configuration: $$ns^2 np^{1-6}$$. <b>Inert Pair Effect:</b> The reluctance of s-electrons to participate in bonding, leading to lower oxidation states being more stable in heavier elements (e.g., $$Pb^{2+}$$ is more stable than $$Pb^{4+}$$).</p><h2>2. Important Compounds</h2><ul><li><b>Boranes:</b> Electron-deficient compounds. Diborane ($$B_2H_6$$) has 3-center-2-electron bonds (banana bonds).</li><li><b>Silicates:</b> Basic unit is the $$SiO_4^{4-}$$ tetrahedron. Zeolites are shape-selective catalysts.</li><li><b>Nitrogen and Phosphorus:</b> Anomalous properties of Nitrogen due to small size and high electronegativity. Phosphorus has allotropes: White (reactive), Red (stable), Black.</li></ul><h2>3. Halogens and Noble Gases</h2><p>Halogens are strong oxidizing agents. Noble gases are relatively inert, but Xenon forms several compounds with Oxygen and Fluorine ($$XeF_2, XeF_4, XeF_6$$) due to available empty d-orbitals.</p>"
      },
      {
        "id": "s_block",
        "title": "s-Block Elements",
        "content": "<h2>1. Alkali Metals (Group 1)</h2><p>Soft, highly reactive metals. They show characteristic flame colors (Li-Crimson, Na-Yellow, K-Violet). Their oxides/hydroxides are highly basic. They dissolve in liquid ammonia to give deep blue conducting solutions due to <b>ammoniated electrons</b>.</p><h2>2. Alkaline Earth Metals (Group 2)</h2><p>Harder than Group 1. Beryllium shows a <b>diagonal relationship</b> with Aluminum. Their carbonates become more stable as we move down the group.</p><h2>3. Biological Importance</h2><ul><li><b>Na/K Pump:</b> Essential for nerve impulse transmission.</li><li><b>Mg/Ca:</b> Mg is in chlorophyll; Ca is in bones/teeth and vital for muscle contraction and blood clotting.</li></ul>"
      },
      {
        "id": "periodicity",
        "title": "Periodicity and Classification",
        "content": "<h2>1. Atomic and Ionic Radii</h2><p>Radii decrease across a period due to increased effective nuclear charge ($$Z_{eff}$$) and increase down a group due to new shells. Cations are smaller than their parent atoms, while anions are larger.</p><h2>2. Ionization Enthalpy and Electron Gain Enthalpy</h2><ul><li><b>I.E.:</b> Increases across period, decreases down group. Anomalies: $$N > O$$ and $$Be > B$$ due to stable electronic configurations.</li><li><b>E.G.E.:</b> Halogens have highest negative electron gain enthalpy. Chlorine is more negative than Fluorine due to less inter-electronic repulsion.</li></ul><h2>3. Electronegativity and Chemical Reactivity</h2><p>The ability of an atom to attract shared electrons. Pauling Scale: $$F$$ is the most electronegative (4.0). Electronegativity drives the polar nature of bonds and reactivity patterns.</p>"
      }
    ]
  }
];
