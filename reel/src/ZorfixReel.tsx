import React from 'react';
import {
  AbsoluteFill,
  Easing,
  Sequence,
  interpolate,
  useCurrentFrame,
} from 'remotion';

// ── Config ────────────────────────────────────────────────────────────
export const FPS    = 30;
export const WIDTH  = 1080;
export const HEIGHT = 1920;
export const DURATION = 480; // 16 s

// ── Brand tokens ──────────────────────────────────────────────────────
const BG        = '#0A0907';
const GOLD      = '#E8B53C';
const CREAM     = '#E8E2D2';
const GRAY      = '#8C887E';
const GRAY_DARK = '#4A4844';
const SERIF     = 'Georgia, "Times New Roman", serif';
const MONO      = '"Courier New", "Lucida Console", monospace';
const PAD       = 80;

// ── Helpers ───────────────────────────────────────────────────────────
const ease = Easing.bezier(0.16, 1, 0.3, 1);

const fi = (
  f: number,
  [a, b]: [number, number],
  [x, y]: [number, number],
  e: (t: number) => number = ease,
) =>
  interpolate(f, [a, b], [x, y], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: e,
  });

const GRAIN = `url("data:image/svg+xml,${encodeURIComponent(
  '<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200">' +
  '<filter id="n"><feTurbulence type="fractalNoise" baseFrequency="0.82" ' +
  'numOctaves="4" stitchTiles="stitch"/></filter>' +
  '<rect width="200" height="200" filter="url(#n)"/></svg>',
)}")`;

// ── Scene 1 — Logo (0 → 100) ──────────────────────────────────────────
const SceneLogo: React.FC = () => {
  const f = useCurrentFrame();
  const op   = fi(f, [0, 25], [0, 1]);
  const opO  = fi(f, [75, 100], [1, 0]);
  const lineW = fi(f, [5, 35], [0, 100]);
  const titleY = fi(f, [10, 40], [30, 0]);
  const subOp = fi(f, [30, 55], [0, 1]);

  return (
    <AbsoluteFill
      style={{
        opacity: Math.min(op, opO),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <div style={{width: lineW, height: 1, background: GOLD, marginBottom: 36}} />

      <div style={{
        fontFamily: SERIF, fontStyle: 'italic', fontWeight: 200,
        fontSize: 136, color: GOLD, letterSpacing: '0.06em', lineHeight: 1,
        transform: `translateY(${titleY}px)`,
      }}>
        Zorfix
      </div>

      <div style={{
        fontFamily: MONO, fontSize: 22, letterSpacing: '0.28em',
        textTransform: 'uppercase', color: GRAY,
        marginTop: 28, opacity: subOp,
      }}>
        Atelier suisse romand
      </div>

      <div style={{
        width: lineW * 0.55, height: 1, background: GOLD,
        marginTop: 36, opacity: subOp,
      }} />
    </AbsoluteFill>
  );
};

// ── Scene 2 — Promesse (85 → 225) ─────────────────────────────────────
const ScenePromise: React.FC = () => {
  const f = useCurrentFrame();
  const op  = fi(f, [0, 20], [0, 1]);
  const opO = fi(f, [115, 140], [1, 0]);

  const makeY = (delay: number) => fi(f, [delay, delay + 30], [40, 0]);

  return (
    <AbsoluteFill style={{
      opacity: Math.min(op, opO),
      display: 'flex', flexDirection: 'column',
      justifyContent: 'center', padding: `0 ${PAD}px`,
    }}>
      <div style={{
        fontFamily: MONO, fontSize: 20, letterSpacing: '0.2em',
        textTransform: 'uppercase', color: GOLD,
        marginBottom: 52, opacity: fi(f, [5, 25], [0, 1]),
      }}>
        ● Pourquoi Zorfix
      </div>

      {[
        {text: 'Votre', color: CREAM, delay: 10},
        {text: 'présence', color: GOLD,  delay: 22},
        {text: 'doit vous', color: CREAM, delay: 34},
        {text: 'amener', color: GOLD,  delay: 46},
        {text: 'des clients.', color: CREAM, delay: 58},
      ].map(({text, color, delay}) => (
        <div key={text} style={{
          fontFamily: SERIF, fontStyle: 'italic', fontWeight: 300,
          fontSize: 92, lineHeight: 1.05, color,
          transform: `translateY(${makeY(delay)}px)`,
        }}>
          {text}
        </div>
      ))}

      <div style={{
        fontFamily: MONO, fontSize: 22, letterSpacing: '0.12em',
        color: GRAY, marginTop: 52, opacity: fi(f, [75, 95], [0, 1]),
      }}>
        Pas juste exister.
      </div>
    </AbsoluteFill>
  );
};

// ── Scene 3 — Packs (210 → 390) ────────────────────────────────────────
const PackRow: React.FC<{
  name: string; desc: string; featured?: boolean; delay: number;
}> = ({name, desc, featured = false, delay}) => {
  const f = useCurrentFrame();
  const op = fi(f, [delay, delay + 25], [0, 1]);
  const y  = fi(f, [delay, delay + 30], [28, 0]);

  return (
    <div style={{
      opacity: op, transform: `translateY(${y}px)`,
      borderLeft: `2px solid ${featured ? GOLD : GRAY_DARK}`,
      paddingLeft: 36, paddingTop: 28, paddingBottom: 28,
    }}>
      {featured && (
        <div style={{
          fontFamily: MONO, fontSize: 18, letterSpacing: '0.2em',
          textTransform: 'uppercase', color: GOLD, marginBottom: 10,
        }}>
          — Recommandé
        </div>
      )}
      <div style={{
        fontFamily: MONO, fontSize: 28, letterSpacing: '0.16em',
        textTransform: 'uppercase', color: featured ? GOLD : CREAM,
      }}>
        {name}
      </div>
      <div style={{
        fontFamily: SERIF, fontStyle: 'italic', fontSize: 28,
        color: GRAY, marginTop: 8, lineHeight: 1.4,
      }}>
        {desc}
      </div>
    </div>
  );
};

const ScenePacks: React.FC = () => {
  const f = useCurrentFrame();
  const op  = fi(f, [0, 20], [0, 1]);
  const opO = fi(f, [155, 180], [1, 0]);

  return (
    <AbsoluteFill style={{
      opacity: Math.min(op, opO),
      display: 'flex', flexDirection: 'column',
      justifyContent: 'center', padding: `0 ${PAD}px`,
    }}>
      <div style={{
        fontFamily: MONO, fontSize: 20, letterSpacing: '0.2em',
        textTransform: 'uppercase', color: GOLD,
        marginBottom: 56, opacity: fi(f, [5, 25], [0, 1]),
      }}>
        ● 3 packs mensuels
      </div>

      <div style={{display: 'flex', flexDirection: 'column', gap: 4}}>
        <PackRow name="Présence"   desc="Pour crédibiliser votre image." delay={18} />
        <PackRow name="Croissance" desc="Pour attirer des clients."      delay={42} featured />
        <PackRow name="Signature"  desc="Pour dominer votre marché."     delay={66} />
      </div>

      <div style={{
        fontFamily: MONO, fontSize: 20, letterSpacing: '0.14em',
        textTransform: 'uppercase', color: GRAY,
        marginTop: 52, opacity: fi(f, [95, 115], [0, 1]),
      }}>
        — Accompagnement sur 3 mois
      </div>
    </AbsoluteFill>
  );
};

// ── Scene 4 — CTA (375 → 480) ─────────────────────────────────────────
const SceneCTA: React.FC = () => {
  const f = useCurrentFrame();
  const op  = fi(f, [0, 20], [0, 1]);
  const opO = fi(f, [80, 105], [1, 0]);
  const lineW = fi(f, [8, 38], [0, 220]);
  const textY = fi(f, [12, 42], [30, 0]);

  return (
    <AbsoluteFill style={{
      opacity: Math.min(op, opO),
      display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
      padding: `0 ${PAD}px`, textAlign: 'center',
    }}>
      <div style={{width: lineW, height: 1, background: GOLD, marginBottom: 56}} />

      {[
        {text: 'Demandez', color: CREAM},
        {text: 'votre devis.', color: GOLD},
      ].map(({text, color}) => (
        <div key={text} style={{
          fontFamily: SERIF, fontStyle: 'italic', fontWeight: 300,
          fontSize: 100, color, lineHeight: 1.05,
          transform: `translateY(${textY}px)`,
        }}>
          {text}
        </div>
      ))}

      <div style={{width: lineW * 0.55, height: 1, background: GOLD, marginTop: 56, marginBottom: 44}} />

      <div style={{
        fontFamily: MONO, fontSize: 22, letterSpacing: '0.14em', color: GRAY,
        opacity: fi(f, [50, 70], [0, 1]),
      }}>
        zorfix-atelier.github.io
      </div>
    </AbsoluteFill>
  );
};

// ── Main composition ───────────────────────────────────────────────────
export const ZorfixReel: React.FC = () => {
  const f = useCurrentFrame();

  return (
    <AbsoluteFill style={{background: BG, color: CREAM}}>
      {/* Grain */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 50,
        opacity: 0.035, mixBlendMode: 'overlay',
        backgroundImage: GRAIN, backgroundSize: '200px 200px',
        pointerEvents: 'none',
      }} />

      {/* Global fade-in / fade-out */}
      <AbsoluteFill style={{
        opacity: Math.min(fi(f, [0, 8], [0, 1]), fi(f, [472, 480], [1, 0])),
      }}>
        <Sequence from={0}   durationInFrames={100}><SceneLogo /></Sequence>
        <Sequence from={85}  durationInFrames={140}><ScenePromise /></Sequence>
        <Sequence from={210} durationInFrames={180}><ScenePacks /></Sequence>
        <Sequence from={375} durationInFrames={105}><SceneCTA /></Sequence>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
