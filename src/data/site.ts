import { Cake, Briefcase, Camera, Flower2, GraduationCap, HeartHandshake, Users, type LucideIcon } from 'lucide-react';
import type { Key } from '../i18n';

export const PHONE = '9890370183';
export const WHATSAPP = `91${PHONE}`;
export const MAP_Q = 'Pagale Celebration Farm, Jalchi Kanheri Road, Shivsrushti Nagar, Baramati, Pune';
export const MAP_LINK = 'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent(MAP_Q);
export const MAP_EMBED = 'https://www.google.com/maps?q=' + encodeURIComponent('Shivsrushti Nagar, Baramati') + '&z=14&output=embed';

/** Path to one of the farm photos in /public/images/gallery */
export const G = (n: string) => `${import.meta.env.BASE_URL}images/gallery/farm-${n}.jpg`;

/** Event photo in /public/images/events */
const E = (id: string) => `${import.meta.env.BASE_URL}images/events/${id}.jpg`;

export const HERO_SLIDES = ['14', '09', '15', '03', '13'];

export interface EventItem { id: string; key: Key; icon: LucideIcon; src?: string }
export const mainEvents: EventItem[] = [
  { id: 'birthday', key: 'ev_birthday', icon: Cake, src: E('birthday') },
  { id: 'wedding', key: 'ev_wedding', icon: HeartHandshake, src: E('wedding') },
  { id: 'corporate', key: 'ev_corporate', icon: Briefcase, src: E('corporate') },
  { id: 'school', key: 'ev_school', icon: GraduationCap, src: E('school') },
];
export const moreEvents: EventItem[] = [
  { id: 'haldi', key: 'ev_haldi', icon: Flower2, src: E('haldi') },
  { id: 'corp', key: 'ev_corp', icon: Briefcase, src: E('corp') },
  { id: 'family', key: 'ev_family', icon: Users, src: E('family') },
  { id: 'photo', key: 'ev_photo', icon: Camera, src: E('photo') },
];
export const allEvents = [...mainEvents, ...moreEvents];

export const tourItems: { n: string; t: Key; p: Key }[] = [
  { n: '01', t: 'tr1_t', p: 'tr1_p' },
  { n: '14', t: 'tr2_t', p: 'tr2_p' },
  { n: '03', t: 'tr3_t', p: 'tr3_p' },
  { n: '09', t: 'tr4_t', p: 'tr4_p' },
  { n: '07', t: 'tr5_t', p: 'tr5_p' },
  { n: '08', t: 'tr6_t', p: 'tr6_p' },
];

export type GalleryCat = 'entrance' | 'gardens' | 'swings' | 'seating';
export const galleryCats: { id: 'all' | GalleryCat; key: Key }[] = [
  { id: 'all', key: 'c_all' }, { id: 'entrance', key: 'c_entrance' }, { id: 'gardens', key: 'c_gardens' },
  { id: 'swings', key: 'c_swings' }, { id: 'seating', key: 'c_seating' },
];
export const galleryItems: { n: string; cat: GalleryCat; label: string }[] = [
  { n: '01', cat: 'entrance', label: 'Pagale Celebration Farm entrance arch' },
  { n: '15', cat: 'gardens', label: 'Flowering creepers along the garden path' },
  { n: '09', cat: 'seating', label: 'Upper viewing deck with seating and farm views' },
  { n: '03', cat: 'swings', label: 'Swings set among the trees' },
  { n: '14', cat: 'gardens', label: 'Hedge-lined walkway' },
  { n: '07', cat: 'seating', label: 'Table and chairs in the shaded sit-out' },
  { n: '04', cat: 'swings', label: 'Covered garden swing bench' },
  { n: '12', cat: 'gardens', label: 'Flower-covered pergola walkway' },
  { n: '13', cat: 'seating', label: 'Covered deck with seating' },
  { n: '10', cat: 'swings', label: 'Hanging swing under the tower' },
  { n: '08', cat: 'gardens', label: 'Green lawn with deer statues' },
  { n: '11', cat: 'gardens', label: 'Blooming garden path' },
  { n: '05', cat: 'gardens', label: 'Open courtyard with shade trees' },
  { n: '06', cat: 'gardens', label: 'Garden signpost among the plants' },
];

export const slotIds: { id: string; key: Key }[] = [
  { id: 'Morning', key: 'slot_morning' }, { id: 'Afternoon', key: 'slot_afternoon' }, { id: 'Evening', key: 'slot_evening' },
];
export const addonList: { id: string; key: Key }[] = [
  { id: 'Garden decoration', key: 'ad_decor' }, { id: 'Catering assistance', key: 'ad_cater' },
  { id: 'Sound system', key: 'ad_sound' }, { id: 'Photography support', key: 'ad_photo' },
];
