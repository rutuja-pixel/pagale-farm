import { useCallback, useEffect, useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import Section from './ui/Section';
import Placeholder from './ui/Placeholder';
import { galleryCategories, galleryItems, type GalleryCategory } from '../data/content';

export default function Gallery() {
  const [filter, setFilter] = useState<'All' | GalleryCategory>('All');
  const [active, setActive] = useState<number | null>(null);

  const items = useMemo(
    () => (filter === 'All' ? galleryItems : galleryItems.filter((i) => i.category === filter)),
    [filter]
  );

  const move = useCallback(
    (dir: 1 | -1) => setActive((a) => (a === null ? a : (a + dir + items.length) % items.length)),
    [items.length]
  );

  useEffect(() => {
    if (active === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setActive(null);
      if (e.key === 'ArrowRight') move(1);
      if (e.key === 'ArrowLeft') move(-1);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [active, move]);

  const current = active !== null ? items[active] : null;

  return (
    <Section id="gallery" title="Gallery" intro="A look at the garden and the celebrations it has hosted (sample placeholders).">
      <div className="chips" role="group" aria-label="Filter gallery">
        {galleryCategories.map((c) => (
          <button key={c} className={`chip ${filter === c ? 'chip--on' : ''}`} aria-pressed={filter === c} onClick={() => { setFilter(c); setActive(null); }}>
            {c}
          </button>
        ))}
      </div>
      <div className="masonry">
        {items.map((it, i) => (
          <button key={it.id} className="masonry__item" onClick={() => setActive(i)} aria-label={`Open ${it.title}`}>
            <Placeholder tone={it.tone} src={it.src} ratio={it.ratio} label={it.title} />
          </button>
        ))}
      </div>
      <AnimatePresence>
        {current && (
          <motion.div className="lightbox" role="dialog" aria-modal="true" aria-label={current.title}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setActive(null)}>
            <button className="lightbox__btn lightbox__close" onClick={() => setActive(null)} aria-label="Close"><X /></button>
            <button className="lightbox__btn lightbox__prev" onClick={(e) => { e.stopPropagation(); move(-1); }} aria-label="Previous"><ChevronLeft /></button>
            <div className="lightbox__frame" onClick={(e) => e.stopPropagation()}>
              <Placeholder tone={current.tone} src={current.src} ratio={current.ratio} label={current.title} />
              <p>{current.title}</p>
            </div>
            <button className="lightbox__btn lightbox__next" onClick={(e) => { e.stopPropagation(); move(1); }} aria-label="Next"><ChevronRight /></button>
          </motion.div>
        )}
      </AnimatePresence>
    </Section>
  );
}
