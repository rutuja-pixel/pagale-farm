import { motion } from 'framer-motion';
import { quickFacts } from '../data/content';
import Placeholder from './ui/Placeholder';

export default function Hero() {
  return (
    <section id="home" className="hero">
      {/* Replace with a full-width landscape photo: src="/images/hero.jpg" */}
      <Placeholder className="hero__bg" tone={3} label="Hero garden photograph (placeholder)" />
      <div className="hero__shade" />
      <div className="container hero__inner">
        <motion.h1 initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
          Your own garden for every celebration.
        </motion.h1>
        <motion.p initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.15 }}>
          Weddings, birthdays, anniversaries and holiday camps in a private garden farm, with space for the whole family.
        </motion.p>
        <motion.div className="hero__actions" initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.3 }}>
          <a className="btn btn--gold" href="#about">Explore the Venue</a>
          <a className="btn btn--ghost" href="#booking">Check Availability</a>
        </motion.div>
        <ul className="hero__facts">
          {quickFacts.map(({ icon: Icon, label }) => (
            <li key={label}><Icon size={20} aria-hidden /> {label}</li>
          ))}
        </ul>
      </div>
    </section>
  );
}
