import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useMotionValue, useSpring } from 'framer-motion';
import { ArrowUp, Clock, MessageCircle, Moon, Sun, Sunset } from 'lucide-react';
import { useI18n } from '../i18n';
import { useScrolled } from '../hooks';
import { WHATSAPP } from '../data/site';

export type Time = 'day' | 'dusk' | 'night';
export type Mode = Time | 'auto';
const opts = [
  { id: 'day' as const, icon: Sun, key: 'th_day' as const },
  { id: 'dusk' as const, icon: Sunset, key: 'th_dusk' as const },
  { id: 'night' as const, icon: Moon, key: 'th_night' as const },
  { id: 'auto' as const, icon: Clock, key: 'th_auto' as const },
];

export function TimeSwitch({ time, setTime }: { time: Mode; setTime: (t: Mode) => void }) {
  const { t } = useI18n();
  return (
    <div className="timesw" role="radiogroup" aria-label={t('th_label')}>
      {opts.map(({ id, icon: Icon, key }) => (
        <button key={id} type="button" role="radio" aria-checked={time === id} aria-label={t(key)} title={t(key)} className={time === id ? 'on' : ''} onClick={() => setTime(id)}>
          {time === id && <motion.span layoutId="time-bg" className="timesw__bg" transition={{ type: 'spring', stiffness: 380, damping: 30 }} />}
          <Icon size={17} />
        </button>
      ))}
    </div>
  );
}

export function WhatsAppFab() {
  const msg = encodeURIComponent('Hi Pagale Celebration Farm! I would like to know more about booking.');
  return (
    <a className="fab" href={`https://wa.me/${WHATSAPP}?text=${msg}`} target="_blank" rel="noreferrer" aria-label="WhatsApp">
      <MessageCircle size={26} />
    </a>
  );
}

export function ToTop() {
  const { t } = useI18n();
  const show = useScrolled(700);
  return (
    <AnimatePresence>
      {show && (
        <motion.button type="button" className="totop" aria-label={t('up')} initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.8 }}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          <ArrowUp size={18} />
        </motion.button>
      )}
    </AnimatePresence>
  );
}

/** Soft gold ring that trails the pointer and swells over anything clickable (mouse devices only). */
export function Cursor() {
  const [on, setOn] = useState(false);
  const [big, setBig] = useState(false);
  const x = useMotionValue(-100), y = useMotionValue(-100);
  const sx = useSpring(x, { stiffness: 420, damping: 32 }), sy = useSpring(y, { stiffness: 420, damping: 32 });
  useEffect(() => {
    if (!window.matchMedia('(pointer: fine)').matches) return;
    setOn(true);
    const mv = (e: MouseEvent) => {
      x.set(e.clientX); y.set(e.clientY);
      setBig(!!(e.target as HTMLElement).closest?.('a,button,select,input,.gallery__item,.card'));
    };
    window.addEventListener('mousemove', mv);
    return () => window.removeEventListener('mousemove', mv);
  }, [x, y]);
  if (!on) return null;
  return <motion.div className={`cursor ${big ? 'is-big' : ''}`} style={{ x: sx, y: sy }} aria-hidden="true" />;
}
