import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRight, CalendarDays, Info, Leaf, MessageCircle, Minus, Plus, Users } from 'lucide-react';
import { en, useI18n } from '../i18n';
import { addonList, allEvents, slotIds, WHATSAPP } from '../data/site';
import Reveal from './Reveal';

const COLORS = ['#ffd27a', '#ff9f68', '#f7b2c4', '#bfe3a1', '#ffffff', '#7fd1b9'];

function Crowd({ guests }: { guests: number }) {
  const { t } = useI18n();
  const unit = guests <= 60 ? 1 : guests <= 300 ? 5 : 20;
  const dots = Math.ceil(guests / unit);
  return (
    <div className="crowd" aria-hidden="true">
      <div className="crowd__dots">
        <AnimatePresence initial={false}>
          {Array.from({ length: dots }, (_, i) => (
            <motion.i key={i} initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }} transition={{ delay: Math.min(i, 30) * 0.008 }} />
          ))}
        </AnimatePresence>
      </div>
      {unit > 1 && <small>{unit} {t('tk_dot')}</small>}
    </div>
  );
}

function Confetti() {
  const bits = Array.from({ length: 44 }, (_, i) => {
    const a = (i / 44) * Math.PI * 2 + Math.random() * 0.5, d = 90 + Math.random() * 150;
    return { x: Math.cos(a) * d, y: Math.sin(a) * d - 40, r: Math.random() * 540, c: COLORS[i % COLORS.length], s: 6 + Math.random() * 6 };
  });
  return (
    <div className="confetti" aria-hidden="true">
      {bits.map((b, i) => (
        <motion.i key={i} style={{ background: b.c, width: b.s, height: b.s * 0.5 }}
          initial={{ x: 0, y: 0, opacity: 1, rotate: 0 }}
          animate={{ x: b.x, y: b.y + 120, opacity: 0, rotate: b.r }}
          transition={{ duration: 1.5, ease: 'easeOut' }} />
      ))}
    </div>
  );
}

export default function Plan({ eventId, setEventId }: { eventId: string; setEventId: (id: string) => void }) {
  const { t } = useI18n();
  const today = new Date().toISOString().slice(0, 10);
  const [name, setName] = useState('');
  const [date, setDate] = useState('');
  const [slot, setSlot] = useState('Evening');
  const [guests, setGuests] = useState(50);
  const [extras, setExtras] = useState<string[]>([]);
  const [burst, setBurst] = useState(0);

  const ev = allEvents.find((e) => e.id === eventId);
  const ready = !!(name.trim() && ev && date);
  const toggle = (a: string) => setExtras((x) => (x.includes(a) ? x.filter((i) => i !== a) : [...x, a]));
  const setG = (n: number) => setGuests(Math.max(1, Math.min(2000, Math.round(n) || 1)));

  const msg = encodeURIComponent(
    `Hi Pagale Celebration Farm! I'd like to enquire.\nName: ${name.trim() || '-'}\nEvent: ${ev ? en[ev.key] : '-'}\nDate: ${date || '-'}\nTime: ${slot}\nGuests: ${guests}\nAdd-ons: ${extras.join(', ') || 'None'}`,
  );

  const send = (e: React.MouseEvent) => {
    if (!ready) { e.preventDefault(); return; }
    setBurst((b) => b + 1);
  };

  const niceDate = date ? new Date(date + 'T00:00').toLocaleDateString(undefined, { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' }) : '';
  const slotKey = slotIds.find((s) => s.id === slot)?.key;

  return (
    <section id="plan" className="plan wrap">
      <Reveal className="plan__intro">
        <h2>{t('plan_h')}</h2>
        <span className="rule" />
        <p className="muted">{t('plan_p')}</p>
      </Reveal>

      <Reveal className="plan__form" delay={0.1}>
        <form onSubmit={(e) => e.preventDefault()}>
          <label>{t('f_name')} <b>*</b>
            <input type="text" placeholder={t('f_name_ph')} autoComplete="name" value={name} onChange={(e) => setName(e.target.value)} />
          </label>
          <div className="grid2">
            <label>{t('f_event')} <b>*</b>
              <select value={eventId} onChange={(e) => setEventId(e.target.value)}>
                <option value="">{t('f_event_ph')}</option>
                {allEvents.map((e) => <option key={e.id} value={e.id}>{t(e.key)}</option>)}
              </select>
            </label>
            <label>{t('f_date')} <b>*</b>
              <input type="date" min={today} value={date} onChange={(e) => setDate(e.target.value)} />
            </label>
          </div>

          <fieldset>
            <legend>{t('f_time')}</legend>
            <div className="slots">
              {slotIds.map((s) => (
                <button type="button" key={s.id} className={slot === s.id ? 'on' : ''} onClick={() => setSlot(s.id)}>
                  {slot === s.id && <motion.span layoutId="slot-bg" className="slots__bg" transition={{ type: 'spring', stiffness: 400, damping: 32 }} />}
                  <span className="slots__txt">{t(s.key)}</span>
                </button>
              ))}
            </div>
          </fieldset>

          <div className="field">
            <span className="legend">{t('f_guests')}</span>
            <div className="stepper">
              <button type="button" aria-label="-10" onClick={() => setG(guests - 10)}><Minus size={16} /></button>
              <input type="number" min={1} inputMode="numeric" value={guests} onChange={(e) => setG(+e.target.value)} aria-label={t('f_guests')} />
              <button type="button" aria-label="+10" onClick={() => setG(guests + 10)}><Plus size={16} /></button>
            </div>
          </div>

          <fieldset>
            <legend>{t('f_addons')}</legend>
            <div className="addons">
              {addonList.map((a) => (
                <button type="button" key={a.id} className={extras.includes(a.id) ? 'on' : ''} aria-pressed={extras.includes(a.id)} onClick={() => toggle(a.id)}>{t(a.key)}</button>
              ))}
            </div>
          </fieldset>
        </form>
      </Reveal>

      <Reveal className="plan__side" delay={0.2}>
        <div className="ticket">
          <div className="ticket__top"><Leaf size={18} /> {t('tk_title')}</div>
          <dl>
            <div><dt>{t('tk_event')}</dt><dd><AnimatePresence mode="wait"><motion.span key={eventId} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>{ev ? t(ev.key) : <i>{t('tk_pick')}</i>}</motion.span></AnimatePresence></dd></div>
            <div><dt>{t('tk_date')}</dt><dd><CalendarDays size={14} /> {niceDate || <i>{t('tk_pick')}</i>}</dd></div>
            <div><dt>{t('tk_time')}</dt><dd>{slotKey ? t(slotKey) : ''}</dd></div>
            <div><dt>{t('tk_guests')}</dt><dd><Users size={14} /> {guests}</dd></div>
            <div><dt>{t('tk_extras')}</dt><dd>{extras.length ? extras.length : <i>{t('tk_none')}</i>}</dd></div>
          </dl>
          <Crowd guests={guests} />
          <div className="ticket__est"><small>{t('est_label')}</small><p>{t('est_val')}</p></div>
        </div>
        <div className="wa-wrap">
          <a className={`btn btn--wa wa${ready ? '' : ' is-disabled'}`} aria-disabled={!ready}
            href={ready ? `https://wa.me/${WHATSAPP}?text=${msg}` : '#plan'} target={ready ? '_blank' : undefined} rel="noreferrer" onClick={send}>
            <MessageCircle size={18} /> {t('wa_btn')} <ArrowRight size={16} />
          </a>
          {burst > 0 && <Confetti key={burst} />}
        </div>
        {!ready && <p className="note"><Info size={14} /> {t('wa_fill')}</p>}
        <p className="note"><Info size={14} /> {t('note')}</p>
      </Reveal>
    </section>
  );
}
