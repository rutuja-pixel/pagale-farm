import { useState } from 'react';
import {
  Users, Car, Sun, ArrowRight, Cake, Heart, CalendarDays, Sunrise, CloudSun, Moon,
  Leaf, MessageCircle, Phone, Info, HeartHandshake,
} from 'lucide-react';
import { images } from './data/images';

function Img({ src, label, className = '' }: { src?: string; label: string; className?: string }) {
  const [failed, setFailed] = useState(false);
  if (src && !failed) {
    return <img className={`img ${className}`} src={src} alt={label} loading="lazy" onError={() => setFailed(true)} />;
  }
  return <div className={`img img--ph ${className}`} role="img" aria-label={label}><Leaf size={26} strokeWidth={1.2} /></div>;
}

const nav = ['Home', 'The Venue', 'Celebrations', 'Gallery', 'Contact'];
const slots = [
  { id: 'Morning', icon: Sunrise },
  { id: 'Afternoon', icon: CloudSun },
  { id: 'Evening', icon: Moon },
];
const addons = ['Garden decoration', 'Catering assistance', 'Sound system', 'Photography support'];
const celebrations = [
  { title: 'Birthday Celebrations', icon: Cake, src: images.birthday },
  { title: 'Intimate Weddings', icon: HeartHandshake, src: images.wedding },
  { title: 'Anniversaries', icon: Heart, src: images.anniversary },
  { title: 'Family Gatherings', icon: Users, src: images.family },
];
const PHONE = '9890370183';
const WHATSAPP = `91${PHONE}`;

export default function App() {
  const [slot, setSlot] = useState('Evening');
  const [guests, setGuests] = useState(50);
  const [name, setName] = useState('');
  const [event, setEvent] = useState('');
  const [date, setDate] = useState('');
  const [extras, setExtras] = useState<string[]>([]);

  const toggle = (a: string) => setExtras((x) => (x.includes(a) ? x.filter((i) => i !== a) : [...x, a]));
  const msg = encodeURIComponent(
    `Hi Pagale Farm! I'd like to enquire.\nName: ${name.trim() || '-'}\nEvent: ${event || '-'}\nDate: ${date || '-'}\nTime: ${slot}\nGuests: ${guests}\nAdd-ons: ${extras.join(', ') || 'None'}`,
  );

  return (
    <>
      <header className="nav">
        <a className="logo" href="#home"><Leaf size={22} /><span>PAGALE FARM<small>GARDEN EVENTS VENUE</small></span></a>
        <nav>
          {nav.map((n, i) => (
            <a key={n} href={`#${n.toLowerCase().replace(' ', '-')}`} className={i === 0 ? 'active' : ''}>{n}</a>
          ))}
        </nav>
        <a className="btn btn--dark" href="#plan"><CalendarDays size={16} /> BOOK YOUR DATE</a>
      </header>

      <section id="home" className="hero">
        <Img src={images.hero} label="Garden set up for a celebration at golden hour" className="hero__bg" />
        <div className="hero__shade" />
        <div className="hero__copy">
          <h1>Your own <em>garden</em><br />for every celebration.</h1>
          <span className="rule" />
          <p>A beautiful open-air setting for life's most memorable moments.</p>
          <div className="row">
            <a className="btn btn--light" href="#the-venue">EXPLORE THE VENUE</a>
            <a className="btn btn--ghost" href="#plan">CHECK AVAILABILITY</a>
          </div>
        </div>
      </section>

      <div className="strip">
        <div><Users size={28} strokeWidth={1.4} /> UP TO 200 GUESTS</div>
        <div><Car size={28} strokeWidth={1.4} /> PARKING ON THE FARM</div>
        <div><Sun size={28} strokeWidth={1.4} /> DAY &amp; EVENING EVENTS</div>
      </div>

      <section id="the-venue" className="about wrap">
        <div>
          <p className="eyebrow">A PLACE TO COME TOGETHER <span /></p>
          <h2>Make room for moments that matter.</h2>
          <p className="muted">Pagale Farm is a serene, open garden venue designed for celebrations of all kinds — from joyful birthdays and milestone anniversaries to intimate weddings, family gatherings and special events.</p>
          <a className="btn btn--outline" href="#plan">KNOW MORE ABOUT THE VENUE <ArrowRight size={15} /></a>
        </div>
        <div className="about__imgs">
          <div className="about__a"><Img src={images.about} label="Wooden viewing tower at Pagale Farm" /></div>
          <div className="about__b"><Img src={images.aboutSign} label="Pagale Farm entrance sign" /></div>
          <div className="about__c"><Img src={images.aboutGroup} label="Guests gathered at the Pagale Celebration Farm entrance" /></div>
        </div>
      </section>

      <section id="celebrations" className="wrap celebrate">
        <h2><span /> Celebrate your way. <span /></h2>
        <p className="muted center">A versatile garden space for life's special occasions.</p>
        <div className="cards">
          {celebrations.map(({ title, icon: Icon, src }) => (
            <a key={title} href="#plan" className="card">
              <Img src={src} label={title} />
              <div className="card__foot"><Icon size={20} strokeWidth={1.5} /><span>{title}</span><ArrowRight size={16} /></div>
            </a>
          ))}
        </div>
      </section>

      <section id="plan" className="plan wrap">
        <div className="plan__intro">
          <h2>Let's plan your day.</h2>
          <span className="rule" />
          <p className="muted">Tell us about your celebration and we'll get in touch with the details and availability.</p>
        </div>

        <form className="plan__form" onSubmit={(e) => e.preventDefault()}>
          <label>Your name <b>*</b>
            <input type="text" placeholder="Enter your full name" autoComplete="name" value={name} onChange={(e) => setName(e.target.value)} />
          </label>
          <div className="grid2">
            <label>Event type <b>*</b>
              <select value={event} onChange={(e) => setEvent(e.target.value)}>
                <option value="">Select your event</option>
                {celebrations.map((c) => <option key={c.title}>{c.title}</option>)}
              </select>
            </label>
            <label>Preferred date <b>*</b>
              <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
            </label>
          </div>

          <fieldset>
            <legend>Preferred time slot <b>*</b></legend>
            <div className="slots">
              {slots.map(({ id, icon: Icon }) => (
                <button type="button" key={id} className={slot === id ? 'on' : ''} onClick={() => setSlot(id)}><Icon size={15} /> {id}</button>
              ))}
            </div>
          </fieldset>

          <label>Number of guests (max 200)
            <div className="range">
              <input type="range" min={10} max={200} value={guests} onChange={(e) => setGuests(+e.target.value)} />
              <span className="pill">{guests} guests</span>
            </div>
          </label>

          <fieldset>
            <legend>Add-ons (optional)</legend>
            <div className="grid2 checks">
              {addons.map((a) => (
                <label key={a} className="check"><input type="checkbox" checked={extras.includes(a)} onChange={() => toggle(a)} /> {a}</label>
              ))}
            </div>
          </fieldset>
        </form>

        <aside className="plan__side">
          <div className="estimate">
            <Leaf size={20} />
            <small>ESTIMATED COST</small>
            <p>Price shared<br />on enquiry</p>
          </div>
          <a className="btn btn--dark wa" href={`https://wa.me/${WHATSAPP}?text=${msg}`} target="_blank" rel="noreferrer">
            <MessageCircle size={18} /> ENQUIRE ON WHATSAPP <ArrowRight size={16} />
          </a>
          <p className="note"><Info size={14} /> Your date is confirmed personally by our team.</p>
        </aside>
      </section>

      <footer id="contact" className="foot">
        <h2>Contact us</h2>
        <a className="foot__phone" href={`tel:+91${PHONE}`}><Phone size={18} /> +91 {PHONE}</a>
        <p>© {new Date().getFullYear()} Pagale Farm · Garden Events Venue</p>
      </footer>
    </>
  );
}
