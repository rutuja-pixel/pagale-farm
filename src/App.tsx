import { useEffect, useState } from 'react';
import { MotionConfig, motion, useScroll, useSpring } from 'framer-motion';
import { I18nProvider } from './i18n';
import Nav from './components/Nav';
import Hero from './components/Hero';
import { About, Marquee, Strip } from './components/Intro';
import Tour from './components/Tour';
import Celebrations from './components/Celebrations';
import Gallery from './components/Gallery';
import Plan from './components/Plan';
import Footer, { Location } from './components/Footer';
import DayScrub from './components/DayScrub';
import { Cursor, ToTop, TimeSwitch, WhatsAppFab, type Mode, type Time } from './components/Floaters';

const byHour = (h: number): Time => (h >= 6 && h < 17 ? 'day' : h >= 17 && h < 19 ? 'dusk' : 'night');

export default function App() {
  const [mode, setMode] = useState<Mode>('day');
  const [, setTick] = useState(0);
  const time: Time = mode === 'auto' ? byHour(new Date().getHours()) : mode;
  const [eventId, setEventId] = useState('');
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 140, damping: 30 });

  useEffect(() => { document.documentElement.dataset.time = time; }, [time]);
  useEffect(() => {
    if (mode !== 'auto') return;
    const id = setInterval(() => setTick((x) => x + 1), 60000);
    return () => clearInterval(id);
  }, [mode]);

  // Magnetic buttons: they lean toward the pointer.
  useEffect(() => {
    if (!window.matchMedia('(pointer: fine)').matches) return;
    const sel = '.btn,.fab';
    const move = (e: MouseEvent) => {
      const el = (e.target as HTMLElement).closest?.(sel) as HTMLElement | null;
      if (!el) return;
      const r = el.getBoundingClientRect();
      el.style.setProperty('--mx', `${(e.clientX - r.left - r.width / 2) * 0.2}px`);
      el.style.setProperty('--my', `${(e.clientY - r.top - r.height / 2) * 0.3}px`);
    };
    const out = (e: MouseEvent) => {
      const el = (e.target as HTMLElement).closest?.(sel) as HTMLElement | null;
      if (el) { el.style.setProperty('--mx', '0px'); el.style.setProperty('--my', '0px'); }
    };
    document.addEventListener('mousemove', move);
    document.addEventListener('mouseout', out);
    return () => { document.removeEventListener('mousemove', move); document.removeEventListener('mouseout', out); };
  }, []);

  return (
    <I18nProvider>
      <MotionConfig reducedMotion="user">
        <motion.div className="progress" style={{ scaleX: progress }} />
        <Nav />
        <main>
          <Hero />
          <Strip />
          <Marquee />
          <About />
          <Tour />
          <DayScrub apply={setMode} />
          <Celebrations onPick={setEventId} />
          <Gallery />
          <Plan eventId={eventId} setEventId={setEventId} />
          <Location />
        </main>
        <Footer />
        <TimeSwitch time={mode} setTime={setMode} />
        <Cursor />
        <WhatsAppFab />
        <ToTop />
      </MotionConfig>
    </I18nProvider>
  );
}
