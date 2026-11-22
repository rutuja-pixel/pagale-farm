import Section from './ui/Section';
import Placeholder from './ui/Placeholder';
import { events } from '../data/content';

export default function Events() {
  return (
    <Section id="events" title="Events & Celebrations" intro="From first birthdays to golden anniversaries, the garden adapts to the occasion.">
      <div className="event-grid">
        {events.map(({ id, title, blurb, icon: Icon, tone, src }) => (
          <article className="event-card" key={id} tabIndex={0}>
            <Placeholder className="event-card__img" tone={tone} src={src} label={`${title} photo (placeholder)`} />
            <div className="event-card__body">
              <Icon size={22} aria-hidden />
              <h3>{title}</h3>
              <p>{blurb}</p>
            </div>
          </article>
        ))}
      </div>
    </Section>
  );
}
