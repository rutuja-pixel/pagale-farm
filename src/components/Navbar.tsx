import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { navLinks } from '../data/content';

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  return (
    <header className={`nav ${scrolled || open ? 'nav--solid' : ''}`}>
      <div className="container nav__bar">
        <a className="nav__logo" href="#home" onClick={() => setOpen(false)}>Pagale Farm</a>
        <nav className="nav__links" aria-label="Primary">
          {navLinks.map((l) => <a key={l.id} href={`#${l.id}`}>{l.label}</a>)}
        </nav>
        <a className="btn btn--gold nav__cta" href="#booking">Book Your Date</a>
        <button className="nav__toggle" onClick={() => setOpen((o) => !o)} aria-expanded={open} aria-label={open ? 'Close menu' : 'Open menu'}>
          {open ? <X /> : <Menu />}
        </button>
      </div>
      <AnimatePresence>
        {open && (
          <motion.nav
            className="nav__drawer"
            aria-label="Mobile"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.2 }}
          >
            {navLinks.map((l) => <a key={l.id} href={`#${l.id}`} onClick={() => setOpen(false)}>{l.label}</a>)}
            <a className="btn btn--gold" href="#booking" onClick={() => setOpen(false)}>Book Your Date</a>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
