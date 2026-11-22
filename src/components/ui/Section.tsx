import type { ReactNode } from 'react';
import { motion } from 'framer-motion';

interface Props {
  id: string;
  title: string;
  intro?: string;
  tone?: 'cream' | 'white' | 'forest';
  children: ReactNode;
}

export default function Section({ id, title, intro, tone = 'cream', children }: Props) {
  return (
    <section id={id} className={`section section--${tone}`}>
      <div className="container">
        <motion.header
          className="section__head"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5 }}
        >
          <h2>{title}</h2>
          {intro && <p>{intro}</p>}
        </motion.header>
        {children}
      </div>
    </section>
  );
}
