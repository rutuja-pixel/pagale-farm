import {
  Cake, Heart, Gem, Flower2, Users, Camera, Trees, Car, Armchair, Lamp,
  Utensils, Speaker, Palette, Sprout, Gamepad2, BookOpen,
  type LucideIcon,
} from 'lucide-react';

/* ------------------------------------------------------------------
   PLACEHOLDER BUSINESS INFORMATION – replace before going live
------------------------------------------------------------------- */
export const WHATSAPP_NUMBER = '919000000000'; // PLACEHOLDER: country code + number, no "+"
export const MAX_GUESTS = 200;
export const CONTACT = {
  address: '[Placeholder] Pagale Farm, Village Road, City, State 000000',
  phone: '+91 90000 00000 [placeholder]',
  email: 'hello@pagalefarm.example [placeholder]',
  instagram: '#',
  facebook: '#',
};

export const formatINR = (n: number) => '₹' + n.toLocaleString('en-IN');

/* ----------------------------- Types ----------------------------- */
export interface NavLink { id: string; label: string }
export interface EventItem { id: string; title: string; blurb: string; icon: LucideIcon; tone: number; src?: string }
export interface Facility { title: string; text: string; icon: LucideIcon }
export interface CampActivity { title: string; icon: LucideIcon }
export type GalleryCategory = 'Weddings' | 'Birthdays' | 'Celebrations' | 'Garden';
export interface GalleryItem { id: number; title: string; category: GalleryCategory; ratio: string; tone: number; src?: string }
export interface PackageItem { name: string; price: number; guests: string; features: string[]; featured?: boolean }
export interface BookingEvent { id: string; label: string; basePrice: number }
export interface TimeSlot { id: string; label: string; time: string; surcharge: number }
export interface AddOn { id: string; label: string; price: number; perGuest?: boolean }
export interface Testimonial { name: string; event: string; text: string }
export interface FaqItem { q: string; a: string }

/* ------------------------------ Data ----------------------------- */
export const navLinks: NavLink[] = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'events', label: 'Events' },
  { id: 'gallery', label: 'Gallery' },
  { id: 'experiences', label: 'Experiences' },
  { id: 'contact', label: 'Contact' },
];

export const quickFacts = [
  { icon: Users, label: 'Up to 200 Guests' },
  { icon: Car, label: 'On-site Parking' },
  { icon: Lamp, label: 'Day & Evening Events' },
];

export const venueHighlights = [
  'Open lawn with mature trees and flower borders',
  'Natural shade for daytime events',
  'Warm festoon lighting for evenings',
  'Private, gated farm with ample parking',
];

export const events: EventItem[] = [
  { id: 'kids', title: "Kids' Birthdays", blurb: 'A safe lawn for games, cake tables and little explorers.', icon: Cake, tone: 1 },
  { id: 'anniv', title: 'Anniversaries', blurb: 'Candlelit dinners and quiet celebrations under the stars.', icon: Heart, tone: 2 },
  { id: 'wedding', title: 'Weddings & Engagements', blurb: 'A garden stage for up to 200 of your closest people.', icon: Gem, tone: 3 },
  { id: 'haldi', title: 'Haldi Ceremonies', blurb: 'Sunlit grass, marigolds and room for the whole family.', icon: Flower2, tone: 4 },
  { id: 'family', title: 'Family Gatherings', blurb: 'Long tables, slow afternoons and space to spread out.', icon: Users, tone: 5 },
  { id: 'photo', title: 'Photoshoots', blurb: 'Pre-wedding, maternity and portrait sessions by the hour.', icon: Camera, tone: 1 },
];

export const facilities: Facility[] = [
  { title: 'Garden Space', text: 'Landscaped lawn that comfortably hosts up to 200 guests.', icon: Trees },
  { title: 'Parking', text: 'On-site parking for guests and vendors (placeholder capacity).', icon: Car },
  { title: 'Seating', text: 'Chairs, tables and lounge seating arranged to suit your event.', icon: Armchair },
  { title: 'Lighting', text: 'Warm festoon and fairy lights for evening celebrations.', icon: Lamp },
  { title: 'Catering Area', text: 'Dedicated serving space for in-house or outside caterers.', icon: Utensils },
  { title: 'Sound & Security', text: 'Sound system hookup and on-site security (placeholder).', icon: Speaker },
];

export const campActivities: CampActivity[] = [
  { title: 'Planting & farm walks', icon: Sprout },
  { title: 'Art, craft & clay', icon: Palette },
  { title: 'Outdoor games', icon: Gamepad2 },
  { title: 'Storytelling circles', icon: BookOpen },
];

export const galleryCategories: Array<'All' | GalleryCategory> = ['All', 'Weddings', 'Birthdays', 'Celebrations', 'Garden'];

export const galleryItems: GalleryItem[] = [
  { id: 1, title: 'Wedding lawn at golden hour', category: 'Weddings', ratio: '4/5', tone: 3 },
  { id: 2, title: 'Garden entrance', category: 'Garden', ratio: '4/3', tone: 1 },
  { id: 3, title: "Kids' party corner", category: 'Birthdays', ratio: '1/1', tone: 4 },
  { id: 4, title: 'Evening lights', category: 'Celebrations', ratio: '3/4', tone: 2 },
  { id: 5, title: 'Floral arch', category: 'Weddings', ratio: '4/3', tone: 5 },
  { id: 6, title: 'Cake table', category: 'Birthdays', ratio: '4/5', tone: 1 },
  { id: 7, title: 'Tree-lined path', category: 'Garden', ratio: '3/4', tone: 3 },
  { id: 8, title: 'Family lunch', category: 'Celebrations', ratio: '4/3', tone: 4 },
  { id: 9, title: 'Haldi setup', category: 'Weddings', ratio: '1/1', tone: 2 },
];

export const packages: PackageItem[] = [
  { name: 'Garden Day', price: 25000, guests: 'Up to 60 guests', features: ['Lawn access, 5 hours', 'Basic seating', 'On-site parking', 'Power & lighting'] },
  { name: 'Celebration', price: 60000, guests: 'Up to 120 guests', featured: true, features: ['Lawn access, 8 hours', 'Seating & stage area', 'Festoon lighting', 'Parking & security', 'Event coordinator'] },
  { name: 'Grand Garden', price: 120000, guests: 'Up to 200 guests', features: ['Full venue, full day', 'Stage, seating & lounge', 'Premium lighting', 'Parking & security', 'Dedicated coordinator'] },
];

export const bookingEvents: BookingEvent[] = [
  { id: 'kids', label: "Kids' Birthday", basePrice: 15000 },
  { id: 'anniv', label: 'Anniversary', basePrice: 12000 },
  { id: 'wedding', label: 'Wedding / Engagement', basePrice: 60000 },
  { id: 'haldi', label: 'Haldi Ceremony', basePrice: 30000 },
  { id: 'family', label: 'Family Gathering', basePrice: 10000 },
  { id: 'photo', label: 'Photoshoot', basePrice: 5000 },
];

export const timeSlots: TimeSlot[] = [
  { id: 'morning', label: 'Morning', time: '8 am – 1 pm', surcharge: 0 },
  { id: 'evening', label: 'Evening', time: '5 pm – 11 pm', surcharge: 3000 },
  { id: 'full', label: 'Full Day', time: '8 am – 11 pm', surcharge: 10000 },
];

export const addOns: AddOn[] = [
  { id: 'decor', label: 'Decoration', price: 8000 },
  { id: 'catering', label: 'Catering (per guest)', price: 350, perGuest: true },
  { id: 'dj', label: 'DJ & sound', price: 6000 },
  { id: 'photo', label: 'Photographer', price: 7000 },
  { id: 'cake', label: 'Cake', price: 2000 },
];

export const testimonials: Testimonial[] = [
  { name: 'Sample Reviewer A', event: 'Wedding', text: 'Placeholder review: the garden looked magical at sunset and our guests could not stop taking photos.' },
  { name: 'Sample Reviewer B', event: "Kids' Birthday", text: 'Placeholder review: plenty of space for the children to run and an easy day for the parents.' },
  { name: 'Sample Reviewer C', event: 'Anniversary', text: 'Placeholder review: a quiet, beautiful evening with fairy lights. Exactly what we wanted.' },
];

export const faqs: FaqItem[] = [
  { q: 'How many guests can the venue hold?', a: 'The garden holds up to 200 guests. (Placeholder answer.)' },
  { q: 'Is parking available?', a: 'Yes, on-site parking is available for guests and vendors. (Placeholder answer.)' },
  { q: 'Can we bring our own caterer or decorator?', a: 'Yes, outside vendors are welcome, or we can arrange them for you. (Placeholder answer.)' },
  { q: 'How do I confirm a date?', a: 'Send an enquiry on WhatsApp. We confirm availability and hold the date with an advance payment. (Placeholder answer.)' },
  { q: 'What happens if it rains?', a: 'Placeholder answer: describe your covered or rescheduling options here.' },
];
