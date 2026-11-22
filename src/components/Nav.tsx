import { useState } from 'react';
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'framer-motion';
import { CalendarDays, Leaf, Menu, X } from 'lucide-react';
import { useI18n, type Key } from '../i18n';
import { useActiveSection, useScrolled } from '../hooks';

const links: { id: string; key: Key }[] = [
  { id: 'home', key: 'nav_home' }, { id: 'farm', key: 'nav_farm' }, { id: 'celebrations', key: 'nav_celebrations' },
  { id: 'gallery', key: 'nav_gallery' }, { id: 'contact', key: 'nav_contact' },
];
const ids = links.map((l) => l.id);

export default function Nav() {
  const { t, toggle } = useI18n();
  const scrolled = useScrolled();
  const active = useActiveSection(ids);
  const [open, setOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, 'change', (y) => setHidden(y > (scrollY.getPrevious() ?? 0) && y > 560 && !open));

  return (
    <header className={`nav ${scrolled ? 'is-solid' : ''} ${hidden ? 'is-hidden' : ''}`}>
      <a className="logo" href="#home"><Leaf size={22} /><span>PAGALE CELEBRATION FARM<small>BARAMATI · PUNE</small></span></a>
      <nav aria-label="Primary">
        {links.map((l) => (
          <a key={l.id} href={`#${l.id}`} className={active === l.id ? 'active' : ''}>{t(l.key)}</a>
        ))}
      </nav>
      <div className="nav__right">
        <button type="button" className="lang" onClick={toggle} aria-label="Switch language">{t('lang_btn')}</button>
        <a className="btn btn--gold nav__book" href="#plan"><CalendarDays size={16} /> {t('book')}</a>
        <button type="button" className="burger" aria-label={t('menu')} aria-expanded={open} onClick={() => setOpen((o) => !o)}>{open ? <X size={22} /> : <Menu size={22} />}</button>
      </div>
      <AnimatePresence>
        {open && (
          <motion.div className="drawer" initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }}>
            {links.map((l) => <a key={l.id} href={`#${l.id}`} onClick={() => setOpen(false)}>{t(l.key)}</a>)}
            <a className="btn btn--gold" href="#plan" onClick={() => setOpen(false)}><CalendarDays size={16} /> {t('book')}</a>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
