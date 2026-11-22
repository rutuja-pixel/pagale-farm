import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import Section from './ui/Section';
import { faqs } from '../data/content';

export default function Faq() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <Section id="faq" title="Questions, answered">
      <div className="faq">
        {faqs.map((item, i) => {
          const isOpen = open === i;
          return (
            <div className="faq__item" key={item.q}>
              <h3>
                <button aria-expanded={isOpen} aria-controls={`faq-${i}`} onClick={() => setOpen(isOpen ? null : i)}>
                  {item.q}
                  <ChevronDown size={20} className={isOpen ? 'is-open' : ''} aria-hidden />
                </button>
              </h3>
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div id={`faq-${i}`} className="faq__panel" initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.25 }}>
                    <p>{item.a}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </Section>
  );
}
