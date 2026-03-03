"use client";

import styles from '../SpaceJourney.module.css';

interface ThrusterExitOverlayProps {
  direction: 'forward' | 'backward';
  /** 0 = hidden, 1 = full intensity */
  intensity: number;
}

const FLAMES = [
  { wrapCls: 'exitFlameWrap0', coreCls: 'exitFlameCore0', glowCls: 'exitFlameGlow0' },
  { wrapCls: 'exitFlameWrap1', coreCls: 'exitFlameCore1', glowCls: 'exitFlameGlow1' },
];

const SMOKE_DELAYS = [styles.exitSmoke0, styles.exitSmoke1, styles.exitSmoke2];

export default function ThrusterExitOverlay({ direction, intensity }: ThrusterExitOverlayProps) {
  const isBottom = direction === 'forward';

  return (
    <div
      className={[
        styles.thrusterOverlay,
        isBottom ? styles.thrusterBottom : styles.thrusterTop,
      ].join(' ')}
      style={{ ['--thruster-intensity' as string]: intensity }}
      aria-hidden="true"
    >
      {/* Ambient warm flood over the whole viewport */}
      <div className={isBottom ? styles.screenFloodBottom : styles.screenFloodTop} />

      {/* Flame row — 2 engines */}
      <div className={styles.exitFlameRow}>
        {FLAMES.map(({ wrapCls, coreCls, glowCls }, i) => (
          <div key={i} className={[styles.exitFlameWrap, styles[wrapCls as keyof typeof styles]].join(' ')}>
            <div className={[styles.exitFlameGlow, styles[glowCls as keyof typeof styles]].join(' ')} />
            <div className={[styles.exitFlameCore, styles[coreCls as keyof typeof styles]].join(' ')} />
          </div>
        ))}
      </div>

      {/* Smoke layer — separate row so it's not clipped by the flame containers */}
      <div className={styles.exitSmokeRow}>
        {FLAMES.map((_, i) => (
          <div key={i} className={styles.exitSmokeGroup}>
            {SMOKE_DELAYS.map((delayCls, j) => (
              <div key={j} className={[styles.exitSmoke, delayCls].join(' ')} />
            ))}
          </div>
        ))}
      </div>

    </div>
  );
}
