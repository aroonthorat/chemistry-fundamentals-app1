// HeroMolecule — lightweight CSS-3D rotating atom: a glowing nucleus with three
// inclined electron orbits. A faithful recreation of the design-system hero motif.
const ORBITS = [
  { rot: 'rotateX(75deg) rotateY(0deg)', dur: '6s', color: '#00f0ff' },
  { rot: 'rotateX(75deg) rotateY(60deg)', dur: '8s', color: '#8a2be2' },
  { rot: 'rotateX(75deg) rotateY(120deg)', dur: '7s', color: '#ff007f' },
];

function HeroMolecule() {
  return (
    <div className="hero-stage" aria-hidden="true">
      <div className="cf-molecule">
        <div className="cf-nucleus" />
        {ORBITS.map((o, i) => (
          <div
            key={i}
            className="cf-orbit"
            style={{ transform: `translate(-50%,-50%) ${o.rot}`, borderColor: `${o.color}55` }}
          >
            <div className="cf-electron-track" style={{ animationDuration: o.dur }}>
              <span
                className="cf-electron"
                style={{ background: o.color, boxShadow: `0 0 12px ${o.color}, 0 0 24px ${o.color}` }}
              />
            </div>
          </div>
        ))}
      </div>
      <span className="cf-stage-tag">LIVE · H₂O simulation</span>
    </div>
  );
}

export default HeroMolecule;
