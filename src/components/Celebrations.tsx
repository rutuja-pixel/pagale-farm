import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useI18n } from '../i18n';
import { allEvents, type EventItem } from '../data/site';
import Reveal from './Reveal';

function Tilt({ ev, onPick, i }: { ev: EventItem; onPick: (id: string) => void; i: number }) {
  const { t } = useI18n();
  const x = useMotionValue(0.5), y = useMotionValue(0.5);
  const rx = useSpring(useTransform(y, [0, 1], [9, -9]), { stiffness: 180, damping: 18 });
  const ry = useSpring(useTransform(x, [0, 1], [-9, 9]), { stiffness: 180, damping: 18 });
  const Icon = ev.icon;
  return (
    <motion.a
      href="#plan" className="card"
      style={{ rotateX: rx, rotateY: ry, transformPerspective: 900 }}
      initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-60px' }} transition={{ delay: i * 0.1, duration: 0.6 }}
      onMouseMove={(e) => { const r = e.currentTarget.getBoundingClientRect(); x.set((e.clientX - r.left) / r.width); y.set((e.clientY - r.top) / r.height); }}
      onMouseLeave={() => { x.set(0.5); y.set(0.5); }}
      onClick={() => onPick(ev.id)}
    >
      <div className="card__img">
        {ev.src ? <img src={ev.src} alt={t(ev.key)} loading="lazy" /> : <div className="card__ph"><Icon size={44} strokeWidth={1.1} /></div>}
      </div>
      <div className="card__foot"><Icon size={20} strokeWidth={1.5} /><span>{t(ev.key)}</span><ArrowRight size={16} /></div>
    </motion.a>
  );
}

export default function Celebrations({ onPick }: { onPick: (id: string) => void }) {
  const { t } = useI18n();
  return (
    <section id="celebrations" className="wrap celebrate">
      <Reveal><h2><span /> {t('cel_h')} <span /></h2></Reveal>
      <Reveal delay={0.1}><p className="muted center">{t('cel_p')} · {t('cel_tap')}</p></Reveal>
      <div className="cards">
        {allEvents.map((ev, i) => <Tilt key={ev.id} ev={ev} onPick={onPick} i={i} />)}
      </div>
    </section>
  );
}
