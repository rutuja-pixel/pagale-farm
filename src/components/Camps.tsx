import Placeholder from './ui/Placeholder';
import { campActivities } from '../data/content';

export default function Camps() {
  return (
    <section id="experiences" className="section section--forest">
      <div className="container camps">
        <div className="camps__text">
          <h2>Kids' Holiday Camps</h2>
          <p>
            Summer and Diwali break programs where children spend the day outdoors: planting, making, playing and
            listening to stories. Dates and fees are announced for each batch (placeholder).
          </p>
          <p className="camps__age">Ages 5 to 14 · 3, 5 or 10 day batches</p>
          <ul className="camps__list">
            {campActivities.map(({ title, icon: Icon }) => (
              <li key={title}><Icon size={20} aria-hidden /> {title}</li>
            ))}
          </ul>
          <a className="btn btn--gold" href="#booking">Register Your Child</a>
        </div>
        <Placeholder className="camps__img" tone={4} ratio="4/5" label="Kids' camp photograph (placeholder)" />
      </div>
    </section>
  );
}
