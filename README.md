# Pagale Farm – Frontend

React + Vite + TypeScript + SCSS + Lucide + Framer Motion. Frontend only: no backend, API, database or payments.

    npm install
    npm run dev      # development
    npm run build    # type-check + production build

## Replace the placeholders
All business data lives in `src/data/content.ts`:
- `WHATSAPP_NUMBER`, `CONTACT` (address, phone, email, social links)
- prices (`bookingEvents`, `addOns`, `packages`), testimonials, FAQs
- Photos: every image item has an optional `src`. Put real photos in `public/images/` and set `src: '/images/garden-1.jpg'`. Until then a green placeholder is shown.
