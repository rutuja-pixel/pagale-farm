import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { useI18n } from '../i18n';
import { G, galleryCats, galleryItems } from '../data/site';
import Reveal from './Reveal';

export default function Gallery() {
  const { t } = useI18n();
  const [cat, setCat] = useState<string>('all');
  const [open, setOpen] = useState<number | null>(null);
  const list = cat === 'all' ? galleryItems : galleryItems.filter((i) => i.cat === cat);
  const step = (d: number) => setOpen((o) => (o === null ? o : (o + d + list.length) % list.length));

  useEffect(() => {
    if (open === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(null);
      if (e.key === 'ArrowRight') step(1);
      if (e.key === 'ArrowLeft') step(-1);
    };
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKey);
    return () => { window.removeEventListener('keydown', onKey); document.body.style.overflow = ''; };
  });

  const cur = open === null ? null : list[open];

  return (
    <section id="gallery" className="wrap gallery">
      <Reveal><h2><span /> {t('gal_h')} <span /></h2></Reveal>
      <Reveal delay={0.1}><p className="muted center">{t('gal_p')}</p></Reveal>
      <div className="gallery__tabs">
        {galleryCats.map((c) => (
          <button type="button" key={c.id} className={cat === c.id ? 'on' : ''} onClick={() => { setCat(c.id); setOpen(null); }}>{t(c.key)}</button>
        ))}
      </div>
      <div className="gallery__grid" key={cat}>
        {list.map((i, idx) => (
          <motion.button
            type="button" key={i.n} className="gallery__item" onClick={() => setOpen(idx)} aria-label={i.label}
            initial={{ opacity: 0, y: 24, scale: 0.97 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ delay: idx * 0.05, duration: 0.5 }}
          >
            <img src={G(i.n)} alt={i.label} loading="lazy" />
          </motion.button>
        ))}
      </div>

      <AnimatePresence>
        {cur && (
          <motion.div className="lightbox" role="dialog" aria-modal="true" aria-label={cur.label} onClick={() => setOpen(null)}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <button type="button" className="lightbox__x" aria-label={t('close')} onClick={() => setOpen(null)}><X size={26} /></button>
            <button type="button" className="lightbox__nav lightbox__prev" aria-label={t('prev')} onClick={(e) => { e.stopPropagation(); step(-1); }}><ChevronLeft size={32} /></button>
            <figure onClick={(e) => e.stopPropagation()}>
              <motion.img
                key={cur.n} src={G(cur.n)} alt={cur.label}
                initial={{ opacity: 0, scale: 0.94 }} animate={{ opacity: 1, scale: 1 }}
                drag="x" dragConstraints={{ left: 0, right: 0 }} dragElastic={0.4}
                onDragEnd={(_, info) => { if (info.offset.x < -70) step(1); else if (info.offset.x > 70) step(-1); }}
              />
              <figcaption>{cur.label} · {(open ?? 0) + 1}/{list.length}</figcaption>
            </figure>
            <button type="button" className="lightbox__nav lightbox__next" aria-label={t('next')} onClick={(e) => { e.stopPropagation(); step(1); }}><ChevronRight size={32} /></button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
