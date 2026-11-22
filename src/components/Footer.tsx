import { Leaf, MapPin, Navigation, Phone } from 'lucide-react';
import { useI18n } from '../i18n';
import { MAP_EMBED, MAP_LINK, PHONE } from '../data/site';
import Reveal from './Reveal';

export function Location() {
  const { t } = useI18n();
  return (
    <section id="contact" className="wrap location">
      <Reveal className="location__card">
        <h2>{t('loc_h')}</h2>
        <span className="rule" />
        <p className="muted">{t('loc_p')}</p>
        <p className="addr"><MapPin size={18} /> {t('loc_addr')}</p>
        <a className="foot__phone" href={`tel:+91${PHONE}`}><Phone size={20} /> +91 {PHONE}</a>
        <div className="row">
          <a className="btn btn--gold" href={`tel:+91${PHONE}`}><Phone size={16} /> {t('call')}</a>
          <a className="btn btn--outline" href={MAP_LINK} target="_blank" rel="noreferrer"><Navigation size={16} /> {t('directions')}</a>
        </div>
      </Reveal>
      <Reveal className="location__map" delay={0.15}>
        <iframe title="Map to Pagale Celebration Farm" src={MAP_EMBED} loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
      </Reveal>
    </section>
  );
}

export default function Footer() {
  const { t } = useI18n();
  return (
    <footer className="foot">
      <div className="foot__word"><Leaf size={26} /> Pagale Celebration Farm</div>
      <p>{t('foot_tag')}</p>
      <nav aria-label="Footer">
        <a href="#home">{t('nav_home')}</a><a href="#farm">{t('nav_farm')}</a><a href="#celebrations">{t('nav_celebrations')}</a>
        <a href="#gallery">{t('nav_gallery')}</a><a href="#plan">{t('book')}</a>
      </nav>
      <small>© {new Date().getFullYear()} Pagale Celebration Farm · Baramati, Pune · +91 {PHONE}</small>
    </footer>
  );
}
