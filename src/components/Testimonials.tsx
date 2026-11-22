import { Quote } from 'lucide-react';
import Section from './ui/Section';
import { testimonials } from '../data/content';

export default function Testimonials() {
  return (
    <Section id="reviews" tone="white" title="Kind words" intro="Sample placeholder reviews. Replace with real guest feedback.">
      <div className="reviews">
        {testimonials.map((t) => (
          <figure className="review" key={t.name}>
            <Quote size={28} aria-hidden />
            <blockquote>{t.text}</blockquote>
            <figcaption><strong>{t.name}</strong><span>{t.event}</span></figcaption>
          </figure>
        ))}
      </div>
    </Section>
  );
}
