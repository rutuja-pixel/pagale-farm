import { useEffect, useRef, useState, type CSSProperties } from 'react';
import { AnimatePresence, animate, motion, useInView } from 'framer-motion';
import { Moon, Sun } from 'lucide-react';
import { useI18n, type Key } from '../i18n';
import { G } from '../data/site';
import { FairyLights } from './Atmosphere';
import Reveal from './Reveal';
import type { Time } from './Floaters';

const MIN = 7, MAX = 23;
type Ph = 'm' | 'a' | 'g' | 'n';
const phaseOf = (h: number): Ph => (h < 12 ? 'm' : h < 16.5 ? 'a' : h < 19 ? 'g' : 'n');
const PH: Record<Ph, { img: string; t: Key; p: Key; theme: Time }> = {
  m: { img: '14', t: 'ph_m_t', p: 'ph_m_p', theme: 'day' },
  a: { img: '09', t: 'ph_a_t', p: 'ph_a_p', theme: 'day' },
  g: { img: '03', t: 'ph_g_t', p: 'ph_g_p', theme: 'dusk' },
  n: { img: '13', t: 'ph_n_t', p: 'ph_n_p', theme: 'night' },
};
const clamp = (v: number) => Math.max(0, Math.min(1, v));

function fmt(h: number) {
  const m = Math.round(h * 12) * 5;
  const hr = Math.floor(m / 60) % 24, mi = m % 60;
  return `${((hr + 11) % 12) + 1}:${String(mi).padStart(2, '0')} ${hr >= 12 ? 'PM' : 'AM'}`;
}

export default function DayScrub({ apply }: { apply: (t: Time) => void }) {
  const { t } = useI18n();
  const ref = useRef<HTMLDivElement>(null);
  const seen = useInView(ref, { once: true, amount: 0.5 });
  const [h, setH] = useState(8);
  const [touched, setTouched] = useState(false);

  // Auto-play the sunrise-to-dusk sweep once when the section scrolls into view.
  useEffect(() => {
    if (!seen || touched) return;
    const a = animate(8, 18.5, { duration: 5, ease: 'easeInOut', onUpdate: setH });
    return () => a.stop();
  }, [seen, touched]);

  const ph = phaseOf(h);
  const n = clamp((h - 18) / 2.2);
  const g = Math.max(0, 1 - Math.abs(h - 17.5) / 2.2);
  const filter = `brightness(${1 - 0.55 * n}) sepia(${0.5 * g + 0.1 * n}) saturate(${1 + 0.4 * g - 0.15 * n}) hue-rotate(${-12 * g + 10 * n}deg)`;
  const tt = (h - MIN) / (MAX - MIN);
  const x = 2 * (1 - tt) * tt * 50 + tt * tt * 100;
  const y = (1 - tt) ** 2 * 100 + 2 * (1 - tt) * tt * -40 + tt * tt * 100;

  return (
    <section id="day" className="wrap day">
      <Reveal><h2><span /> {t('day_h')} <span /></h2></Reveal>
      <Reveal delay={0.1}><p className="muted center">{t('day_p')}</p></Reveal>
      <div className="day__card" ref={ref}>
        <div className="day__stage">
          <div className="day__photo" style={{ filter }}>
            <AnimatePresence initial={false}>
              <motion.img key={ph} src={G(PH[ph].img)} alt="" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.8 }} />
            </AnimatePresence>
          </div>
          <div className="day__sky" style={{ background: `linear-gradient(0deg, rgba(0,0,0,.6), rgba(10,20,60,${0.5 * n}) 70%), rgba(255,140,60,${0.18 * g})` }} />
          <div className="day__lights" style={{ opacity: 0.25 + 0.75 * n, ['--glow' as string]: n } as CSSProperties}><FairyLights /></div>
          <svg className="day__arc" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
            <path d="M0 100 Q50 -40 100 100" fill="none" stroke="rgba(255,255,255,.45)" strokeWidth="1.5" strokeDasharray="3 5" vectorEffect="non-scaling-stroke" />
          </svg>
          <div className="day__orb" style={{ left: `${x}%`, top: `${y}%`, ['--n' as string]: n } as CSSProperties}>
            {n > 0.5 ? <Moon size={26} /> : <Sun size={30} />}
          </div>
          <div className="day__clock">{fmt(h)}</div>
          <div className="day__cap">
            <AnimatePresence mode="wait">
              <motion.div key={ph} initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.35 }}>
                <h3>{t(PH[ph].t)}</h3>
                <p>{t(PH[ph].p)}</p>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
        <div className="day__ctrl">
          <input type="range" min={MIN} max={MAX} step={0.05} value={h} aria-label={fmt(h)}
            onChange={(e) => { setTouched(true); setH(+e.target.value); }} />
          <button type="button" className="btn btn--gold" onClick={() => apply(PH[ph].theme)}>{t('day_btn')}</button>
        </div>
      </div>
    </section>
  );
}
