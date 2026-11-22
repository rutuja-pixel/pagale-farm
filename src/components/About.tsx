import { Check } from 'lucide-react';
import { venueHighlights } from '../data/content';
import Placeholder from './ui/Placeholder';

export default function About() {
  return (
    <section id="about" className="section section--white">
      <div className="container about">
        <Placeholder className="about__img" tone={2} ratio="4/5" label="Editorial garden photograph (placeholder)" />
        <div className="about__text">
          <h2>A garden made for gathering</h2>
          <p>
            Pagale Farm is a private garden venue where the setting does most of the work. Open lawns, tall trees and
            soft light give every celebration a natural backdrop, whether it is thirty guests or two hundred.
          </p>
          <p>Placeholder copy: add the story of the farm, its history and what makes it special here.</p>
          <ul className="ticks">
            {venueHighlights.map((h) => <li key={h}><Check size={18} aria-hidden /> {h}</li>)}
          </ul>
        </div>
      </div>
    </section>
  );
}
