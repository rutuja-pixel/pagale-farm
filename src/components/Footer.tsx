import { Facebook, Instagram, Mail, MapPin, Phone } from 'lucide-react';
import { CONTACT, navLinks } from '../data/content';

export default function Footer() {
  return (
    <footer id="contact" className="footer">
      <div className="container footer__grid">
        <div>
          <p className="footer__logo">Pagale Farm</p>
          <p>Your own garden for every celebration.</p>
          <div className="footer__social">
            <a href={CONTACT.instagram} aria-label="Instagram (placeholder link)"><Instagram size={20} /></a>
            <a href={CONTACT.facebook} aria-label="Facebook (placeholder link)"><Facebook size={20} /></a>
          </div>
        </div>
        <nav aria-label="Footer">
          <h3>Explore</h3>
          {navLinks.map((l) => <a key={l.id} href={`#${l.id}`}>{l.label}</a>)}
        </nav>
        <div>
          <h3>Contact</h3>
          <p><MapPin size={16} aria-hidden /> {CONTACT.address}</p>
          <p><Phone size={16} aria-hidden /> {CONTACT.phone}</p>
          <p><Mail size={16} aria-hidden /> {CONTACT.email}</p>
        </div>
      </div>
      <p className="footer__legal">© {new Date().getFullYear()} Pagale Farm. All business details on this site are placeholders.</p>
    </footer>
  );
}
