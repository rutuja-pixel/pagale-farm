import { useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Check, ChevronLeft, ChevronRight, MessageCircle, Minus, Plus } from 'lucide-react';
import Section from './ui/Section';
import { addOns, bookingEvents, formatINR, MAX_GUESTS, timeSlots, WHATSAPP_NUMBER } from '../data/content';

interface FormState {
  eventId: string;
  date: string;
  slotId: string;
  guests: number;
  addOnIds: string[];
  name: string;
  phone: string;
  notes: string;
}

const STEPS = ['Event', 'Date & time', 'Guests', 'Your details'];
const initial: FormState = { eventId: '', date: '', slotId: '', guests: 50, addOnIds: [], name: '', phone: '', notes: '' };
const today = new Date().toISOString().slice(0, 10);

export default function Booking() {
  const [step, setStep] = useState(0);
  const [f, setF] = useState<FormState>(initial);
  const [error, setError] = useState('');

  const set = <K extends keyof FormState>(k: K, v: FormState[K]) => { setF((s) => ({ ...s, [k]: v })); setError(''); };
  const setGuests = (n: number) => set('guests', Math.min(MAX_GUESTS, Math.max(1, Number.isFinite(n) ? Math.round(n) : 1)));

  const event = bookingEvents.find((e) => e.id === f.eventId);
  const slot = timeSlots.find((s) => s.id === f.slotId);
  const chosenAddOns = addOns.filter((a) => f.addOnIds.includes(a.id));

  const total = useMemo(() => {
    let t = (event?.basePrice ?? 0) + (slot?.surcharge ?? 0);
    chosenAddOns.forEach((a) => { t += a.perGuest ? a.price * f.guests : a.price; });
    return t;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [event, slot, f.addOnIds, f.guests]);

  const validate = (): string => {
    if (step === 0 && !f.eventId) return 'Please choose an event type.';
    if (step === 1 && (!f.date || !f.slotId)) return 'Please pick a date and a time slot.';
    if (step === 1 && f.date < today) return 'Please choose a future date.';
    if (step === 3 && !f.name.trim()) return 'Please enter your name.';
    if (step === 3 && f.phone.replace(/\D/g, '').length < 10) return 'Please enter a valid phone number.';
    return '';
  };

  const next = () => { const e = validate(); if (e) return setError(e); setStep((s) => s + 1); };
  const back = () => { setError(''); setStep((s) => s - 1); };

  const toggleAddOn = (id: string) =>
    set('addOnIds', f.addOnIds.includes(id) ? f.addOnIds.filter((x) => x !== id) : [...f.addOnIds, id]);

  const message = [
    'Hello Pagale Farm, I would like to enquire about a booking (website enquiry).',
    `Name: ${f.name}`, `Phone: ${f.phone}`, `Event: ${event?.label}`,
    `Date: ${f.date} (${slot?.label}, ${slot?.time})`, `Guests: ${f.guests}`,
    `Add-ons: ${chosenAddOns.map((a) => a.label).join(', ') || 'none'}`,
    `Estimate: ${formatINR(total)} (placeholder pricing)`, f.notes && `Notes: ${f.notes}`,
  ].filter(Boolean).join('\n');
  const waLink = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

  return (
    <Section id="booking" title="Book Your Date" intro="Plan your event in four steps, then send the enquiry on WhatsApp. This is an enquiry only: dates are confirmed by the team.">
      <div className="wizard">
        <ol className="wizard__steps" aria-label="Booking progress">
          {STEPS.map((s, i) => (
            <li key={s} className={i === step ? 'is-current' : i < step ? 'is-done' : ''} aria-current={i === step ? 'step' : undefined}>
              <span>{i < step ? <Check size={14} /> : i + 1}</span><em>{s}</em>
            </li>
          ))}
        </ol>

        <div className="wizard__body">
          <AnimatePresence mode="wait">
            <motion.div key={step} initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -16 }} transition={{ duration: 0.2 }}>
              {step === 0 && (
                <fieldset className="opts">
                  <legend>What are you celebrating?</legend>
                  {bookingEvents.map((e) => (
                    <label key={e.id} className={`opt ${f.eventId === e.id ? 'opt--on' : ''}`}>
                      <input type="radio" name="event" checked={f.eventId === e.id} onChange={() => set('eventId', e.id)} />
                      {e.label}
                    </label>
                  ))}
                </fieldset>
              )}

              {step === 1 && (
                <div className="fields">
                  <label className="field">Event date
                    <input type="date" min={today} value={f.date} onChange={(e) => set('date', e.target.value)} />
                  </label>
                  <fieldset className="opts">
                    <legend>Time slot</legend>
                    {timeSlots.map((s) => (
                      <label key={s.id} className={`opt ${f.slotId === s.id ? 'opt--on' : ''}`}>
                        <input type="radio" name="slot" checked={f.slotId === s.id} onChange={() => set('slotId', s.id)} />
                        <span>{s.label}<small>{s.time}</small></span>
                      </label>
                    ))}
                  </fieldset>
                </div>
              )}

              {step === 2 && (
                <div className="fields">
                  <div className="field">
                    <span id="guests-label">Number of guests (max {MAX_GUESTS})</span>
                    <div className="stepper" role="group" aria-labelledby="guests-label">
                      <button type="button" onClick={() => setGuests(f.guests - 10)} aria-label="Remove 10 guests"><Minus size={18} /></button>
                      <input type="number" inputMode="numeric" min={1} max={MAX_GUESTS} value={f.guests} onChange={(e) => setGuests(+e.target.value)} aria-label="Guest count" />
                      <button type="button" onClick={() => setGuests(f.guests + 10)} aria-label="Add 10 guests"><Plus size={18} /></button>
                    </div>
                    <input className="range" type="range" min={1} max={MAX_GUESTS} value={f.guests} onChange={(e) => setGuests(+e.target.value)} aria-label="Guest slider" />
                  </div>
                  <fieldset className="opts">
                    <legend>Add-ons (optional)</legend>
                    {addOns.map((a) => (
                      <label key={a.id} className={`opt ${f.addOnIds.includes(a.id) ? 'opt--on' : ''}`}>
                        <input type="checkbox" checked={f.addOnIds.includes(a.id)} onChange={() => toggleAddOn(a.id)} />
                        <span>{a.label}<small>{formatINR(a.price)}{a.perGuest ? ' / guest' : ''} (placeholder)</small></span>
                      </label>
                    ))}
                  </fieldset>
                </div>
              )}

              {step === 3 && (
                <div className="fields">
                  <label className="field">Your name
                    <input type="text" autoComplete="name" value={f.name} onChange={(e) => set('name', e.target.value)} />
                  </label>
                  <label className="field">Phone number
                    <input type="tel" inputMode="tel" autoComplete="tel" value={f.phone} onChange={(e) => set('phone', e.target.value)} />
                  </label>
                  <label className="field">Special requests
                    <textarea rows={3} value={f.notes} onChange={(e) => set('notes', e.target.value)} />
                  </label>
                  <dl className="summary">
                    <div><dt>Event</dt><dd>{event?.label}</dd></div>
                    <div><dt>Date</dt><dd>{f.date} · {slot?.label} ({slot?.time})</dd></div>
                    <div><dt>Guests</dt><dd>{f.guests}</dd></div>
                    <div><dt>Add-ons</dt><dd>{chosenAddOns.map((a) => a.label).join(', ') || 'None'}</dd></div>
                  </dl>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
          <p className="wizard__error" role="alert">{error}</p>
        </div>

        <div className="wizard__bar">
          <div className="wizard__total">
            <small>Estimate (placeholder pricing)</small>
            <strong>{formatINR(total)}</strong>
          </div>
          <div className="wizard__nav">
            {step > 0 && <button type="button" className="btn btn--outline" onClick={back}><ChevronLeft size={18} /> Back</button>}
            {step < STEPS.length - 1 ? (
              <button type="button" className="btn btn--forest" onClick={next}>Next <ChevronRight size={18} /></button>
            ) : (
              <a className="btn btn--wa" href={waLink} target="_blank" rel="noreferrer"
                 onClick={(e) => { const er = validate(); if (er) { e.preventDefault(); setError(er); } }}>
                <MessageCircle size={18} /> Send on WhatsApp
              </a>
            )}
          </div>
        </div>
      </div>
    </Section>
  );
}
