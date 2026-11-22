import { Fragment, useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useMotionValue, useScroll, useSpring, useTransform } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { useI18n } from '../i18n';
import { G, HERO_SLIDES } from '../data/site';
import { FairyLights, Particles } from './Atmosphere';

function Rotator({ words, delay }: { words: string[]; delay: number }) {
  const [i, setI] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setI((x) => (x + 1) % words.length), 2400);
    return () => clearInterval(id);
  }, [words.length]);
  return (
    <motion.span className="rot" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay }}>
      <AnimatePresence mode="wait">
        <motion.span key={words[i]} className="rot__w em" initial={{ y: '70%', opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: '-70%', opacity: 0 }} transition={{ duration: 0.45 }}>
          {words[i]}
        </motion.span>
      </AnimatePresence>
      <span>.</span>
    </motion.span>
  );
}

export default function Hero() {
  const { t, lang } = useI18n();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '22%']);
  const copyY = useTransform(scrollYProgress, [0, 1], ['0%', '-25%']);
  const fade = useTransform(scrollYProgress, [0, 0.75], [1, 0]);
  const [i, setI] = useState(0);

  // Mouse parallax: photo drifts one way, lights/particles the other.
  const mx = useMotionValue(0), my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 50, damping: 18 }), sy = useSpring(my, { stiffness: 50, damping: 18 });
  const bgX2 = useTransform(sx, [-0.5, 0.5], [22, -22]), bgY2 = useTransform(sy, [-0.5, 0.5], [14, -14]);
  const fgX = useTransform(sx, [-0.5, 0.5], [-16, 16]), fgY = useTransform(sy, [-0.5, 0.5], [-8, 8]);
  const onMove = (e: React.MouseEvent<HTMLElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
    e.currentTarget.style.setProperty('--gx', `${e.clientX - r.left}px`);
    e.currentTarget.style.setProperty('--gy', `${e.clientY - r.top}px`);
  };

  useEffect(() => {
    const id = setInterval(() => setI((x) => (x + 1) % HERO_SLIDES.length), 6500);
    return () => clearInterval(id);
  }, []);

  const parts = t('hero_title').split('*');
  const rot = t('hero_words').split(',').filter(Boolean);
  let w = 0;

  return (
    <section id="home" className="hero" ref={ref} onMouseMove={onMove}>
      <motion.div className="hero__bg" style={{ y: bgY }}>
        <motion.div className="hero__bgin" style={{ x: bgX2, y: bgY2 }}>
          <AnimatePresence initial={false}>
            <motion.img
              key={i} className="hero__slide" src={G(HERO_SLIDES[i])} alt=""
              initial={{ opacity: 0, scale: 1.14 }}
              animate={{ opacity: 1, scale: 1, transition: { opacity: { duration: 1.4 }, scale: { duration: 8, ease: 'linear' } } }}
              exit={{ opacity: 0, transition: { duration: 1.4 } }}
            />
          </AnimatePresence>
        </motion.div>
      </motion.div>
      <div className="hero__shade" />
      <div className="hero__glow" />
      <motion.div className="hero__fg" style={{ x: fgX, y: fgY }}>
        <FairyLights />
        <Particles />
      </motion.div>

      <motion.div className="hero__copy" style={{ y: copyY, opacity: fade }}>
        <motion.span className="badge" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <i /> {t('badge')}
        </motion.span>
        <h1 key={lang}>
          {parts.map((chunk, pi) => chunk.split(' ').filter(Boolean).map((word) => {
            const d = 0.35 + w++ * 0.09;
            return (
              <Fragment key={`${pi}-${w}`}>
                <span className="word">
                  <motion.span className={pi % 2 ? 'em' : ''} initial={{ y: '110%' }} animate={{ y: 0 }} transition={{ delay: d, duration: 0.8, ease: [0.2, 0.7, 0.2, 1] }}>{word}</motion.span>
                </span>{' '}
              </Fragment>
            );
          }))}
          {rot.length > 0 && <Rotator words={rot} delay={0.35 + w * 0.09} />}
        </h1>
        <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.2 }}>{t('hero_sub')}</motion.p>
        <motion.div className="row" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.4 }}>
          <a className="btn btn--light" href="#farm">{t('hero_cta1')}</a>
          <a className="btn btn--ghost" href="#plan">{t('hero_cta2')}</a>
        </motion.div>
      </motion.div>

      <div className="hero__dots" role="tablist" aria-label="Hero photos">
        {HERO_SLIDES.map((s, n) => (
          <button key={s} type="button" role="tab" aria-selected={n === i} aria-label={`Photo ${n + 1}`} className={n === i ? 'on' : ''} onClick={() => setI(n)} />
        ))}
      </div>
      <a className="hero__scroll" href="#farm" aria-label={t('scroll')}><span>{t('scroll')}</span><ChevronDown size={18} /></a>
    </section>
  );
}
