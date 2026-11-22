import { useRef } from 'react';
import { motion, useAnimationFrame, useMotionTemplate, useMotionValue, useScroll, useSpring, useTransform } from 'framer-motion';
import { ArrowRight, CalendarDays, Car, Leaf, MapPin } from 'lucide-react';
import { useI18n } from '../i18n';
import { G, allEvents } from '../data/site';
import Reveal from './Reveal';

export function Strip() {
  const { t } = useI18n();
  const items = [
    { icon: CalendarDays, k: 's_open' as const }, { icon: Car, k: 's_park' as const }, { icon: MapPin, k: 's_loc' as const },
  ];
  return (
    <div className="strip">
      {items.map(({ icon: Icon, k }, i) => (
        <motion.div key={k} initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.12 }}>
          <Icon size={26} strokeWidth={1.4} /> {t(k)}
        </motion.div>
      ))}
    </div>
  );
}

export function Marquee() {
  const { t } = useI18n();
  const { scrollY } = useScroll();
  const vel = useSpring(useTransform(scrollY, () => scrollY.getVelocity()), { stiffness: 80, damping: 30 });
  const pos = useMotionValue(0);
  const dir = useRef(1);
  useAnimationFrame((_, dt) => {
    const v = vel.get();
    if (Math.abs(v) > 40) dir.current = v > 0 ? 1 : -1;
    const speed = 1.1 + Math.min(Math.abs(v) / 160, 14);
    let next = pos.get() - dir.current * speed * (dt / 1000) * 3.2;
    if (next <= -25) next += 25; else if (next > 0) next -= 25;
    pos.set(next);
  });
  const x = useMotionTemplate`${pos}%`;
  const row = allEvents.map((e) => (
    <span key={e.id}><Leaf size={16} /> {t(e.key)}</span>
  ));
  return (
    <div className="marquee" aria-hidden="true">
      <motion.div className="marquee__track" style={{ x }}>{row}{row}{row}{row}</motion.div>
    </div>
  );
}

export function About() {
  const { t } = useI18n();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const a = useTransform(scrollYProgress, [0, 1], [40, -40]);
  const b = useTransform(scrollYProgress, [0, 1], [-30, 50]);
  const c = useTransform(scrollYProgress, [0, 1], [60, -20]);
  return (
    <section className="about wrap" ref={ref}>
      <Reveal>
        <p className="eyebrow">{t('about_eyebrow')} <span /></p>
        <h2>{t('about_h')}</h2>
        <p className="muted">{t('about_p')}</p>
        <a className="btn btn--outline" href="#contact">{t('about_btn')} <ArrowRight size={15} /></a>
      </Reveal>
      <div className="about__imgs">
        <motion.div className="about__a" style={{ y: a }}><img src={G('12')} alt="Flower-covered pergola walkway" loading="lazy" /></motion.div>
        <motion.div className="about__b" style={{ y: b }}><img src={G('09')} alt="Viewing deck with seating" loading="lazy" /></motion.div>
        <motion.div className="about__c" style={{ y: c }}><img src={G('03')} alt="Swings among the trees" loading="lazy" /></motion.div>
      </div>
    </section>
  );
}
