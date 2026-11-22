import Section from './ui/Section';
import { facilities } from '../data/content';

export default function Facilities() {
  return (
    <Section id="facilities" tone="white" title="Venue Facilities" intro="Everything you need for a comfortable event. Details below are placeholders.">
      <div className="facility-grid">
        {facilities.map(({ title, text, icon: Icon }) => (
          <div className="facility" key={title}>
            <span className="facility__icon"><Icon size={24} aria-hidden /></span>
            <h3>{title}</h3>
            <p>{text}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}
