import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useI18n } from '../i18n';
import { useMedia } from '../hooks';
import { G, tourItems } from '../data/site';

const CARD = 56, GAP = 3, PAD = 8; // vw units
const N = tourItems.length;
const TOTAL = PAD * 2 + N * CARD + (N - 1) * GAP;

/** Scroll-pinned horizontal walk through the farm (plain swipe carousel on small screens). */
export default function Tour() {
  const { t } = useI18n();
  const desktop = useMedia('(min-width: 901px)');
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] });
  const x = useTransform(scrollYProgress, [0, 1], ['0vw', `-${TOTAL - 100}vw`]);
  const bar = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  return (
    <section id="farm" ref={ref} className="tour" style={desktop ? { height: `${N * 48 + 100}vh` } : undefined}>
      <div className="tour__sticky">
        <div className="tour__head">
          <h2>{t('tour_h')}</h2>
          <p>{t('tour_p')}</p>
        </div>
        <motion.div className="tour__track" style={desktop ? { x } : undefined}>
          {tourItems.map((it, i) => (
            <article className="tour__card" key={it.n}>
              <img src={G(it.n)} alt={t(it.t)} loading="lazy" />
              <div className="tour__cap">
                <span>0{i + 1}</span>
                <h3>{t(it.t)}</h3>
                <p>{t(it.p)}</p>
              </div>
            </article>
          ))}
        </motion.div>
        {desktop && <div className="tour__bar"><motion.i style={{ width: bar }} /></div>}
      </div>
    </section>
  );
}
