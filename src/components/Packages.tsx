import Section from './ui/Section';
import { Check } from 'lucide-react';
import { formatINR, packages } from '../data/content';

export default function Packages() {
  return (
    <Section id="packages" tone="white" title="Packages" intro="Starting packages for the venue. All prices are placeholders.">
      <div className="pkg-grid">
        {packages.map((p) => (
          <article key={p.name} className={`pkg ${p.featured ? 'pkg--featured' : ''}`}>
            {p.featured && <span className="pkg__tag">Most popular</span>}
            <h3>{p.name}</h3>
            <p className="pkg__guests">{p.guests}</p>
            <p className="pkg__price">{formatINR(p.price)} <small>placeholder price</small></p>
            <ul className="ticks">
              {p.features.map((f) => <li key={f}><Check size={16} aria-hidden /> {f}</li>)}
            </ul>
            <a className={`btn ${p.featured ? 'btn--gold' : 'btn--outline'}`} href="#booking">Enquire</a>
          </article>
        ))}
      </div>
    </Section>
  );
}
