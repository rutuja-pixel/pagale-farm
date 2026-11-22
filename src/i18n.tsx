import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';

export const en = {
  nav_home: 'Home', nav_farm: 'The Farm', nav_celebrations: 'Celebrations', nav_gallery: 'Gallery', nav_contact: 'Contact',
  book: 'BOOK YOUR DATE',
  badge: 'Booking open',
  hero_title: 'Your own *garden* for every', hero_words: 'birthday,wedding,reunion,haldi ceremony,engagement,anniversary,get-together',
  hero_sub: "A beautiful open-air setting for life's most memorable moments.",
  hero_cta1: 'EXPLORE THE FARM', hero_cta2: 'CHECK AVAILABILITY', scroll: 'Scroll',
  s_open: 'BOOKING OPEN', s_park: 'PARKING ON THE FARM', s_loc: 'BARAMATI, PUNE',
  about_eyebrow: 'A PLACE TO COME TOGETHER',
  about_h: 'Make room for moments that matter.',
  about_p: 'Pagale Celebration Farm in Baramati is a serene, open garden venue for birthday and anniversary parties, weddings and engagements, haldi ceremonies, school and college get-togethers, family parties and corporate events.',
  about_btn: 'FIND THE FARM',
  tour_h: 'Take a walk around the farm.',
  tour_p: 'Keep scrolling to wander through the gardens, swings and shaded corners.',
  tr1_t: 'Welcome Arch', tr1_p: 'Step in through the green entrance arch, wrapped in creepers and palms.',
  tr2_t: 'Flower-lined Walkways', tr2_p: 'Gravel paths between hedges and flowering creepers, made for slow evening walks.',
  tr3_t: 'Swings & Play', tr3_p: 'Swing sets and a covered garden swing for kids and grown-ups alike.',
  tr4_t: 'Viewing Deck', tr4_p: 'An upper deck with seating and open views across the farm.',
  tr5_t: 'Shaded Sit-outs', tr5_p: 'Tables and chairs tucked into shaded corners for family and friends.',
  tr6_t: 'Green Lawns', tr6_p: 'Soft lawns, banana leaves and a few friendly deer statues.',
  cel_h: 'Celebrate your way.', cel_p: "A versatile garden space for life's special occasions.", cel_tap: 'Tap a card to start your enquiry',
  also: 'Also hosting',
  ev_birthday: 'Birthday & Anniversary Parties', ev_wedding: 'Weddings & Engagements',
  ev_corporate: 'Family Parties & Corporate Events', ev_school: 'School & College Get-togethers',
  ev_haldi: 'Haldi Ceremonies', ev_corp: 'Corporate Events', ev_family: 'Family Gatherings', ev_photo: 'Photoshoots',
  gal_h: 'Glimpses of the farm.', gal_p: 'Real photos from the farm. Tap any photo to view it full size.',
  c_all: 'All', c_entrance: 'Entrance', c_gardens: 'Gardens & Paths', c_swings: 'Swings & Play', c_seating: 'Seating & Deck',
  plan_h: "Let's plan your day.", plan_p: "Tell us about your celebration and we'll get in touch with the details and availability.",
  f_name: 'Your name', f_name_ph: 'Enter your full name', f_event: 'Event type', f_event_ph: 'Select your event',
  f_date: 'Preferred date', f_time: 'Preferred time',
  slot_morning: 'Morning', slot_afternoon: 'Afternoon', slot_evening: 'Evening',
  f_guests: 'Approximate guests', f_addons: 'Add-ons (optional)',
  ad_decor: 'Garden decoration', ad_cater: 'Catering assistance', ad_sound: 'Sound system', ad_photo: 'Photography support',
  tk_title: 'Your enquiry', tk_event: 'Event', tk_date: 'Date', tk_time: 'Time', tk_guests: 'Guests', tk_extras: 'Add-ons', tk_none: 'None yet', tk_pick: 'Not chosen',
  est_label: 'ESTIMATED COST', est_val: 'Price shared on enquiry',
  wa_btn: 'ENQUIRE ON WHATSAPP', wa_fill: 'Add your name, event and date to send.', note: 'Your date is confirmed personally by our team.',
  loc_h: 'Find us.', loc_p: 'Just off the Palkhi Mahamarg in Baramati. Call us or tap directions and come see the farm.',
  loc_addr: 'Pagale Celebration Farm, Jalchi–Kanheri Road, near Palkhi Mahamarg, Shivsrushti Nagar, Baramati, Dist. Pune, Maharashtra',
  directions: 'GET DIRECTIONS', call: 'CALL NOW',
  foot_tag: 'A scenic and comfortable place for your celebrations.',
  th_day: 'Day', th_dusk: 'Golden hour', th_night: 'Night', th_label: 'Time of day',
  day_h: 'A day at the farm.', day_p: 'Drag the sun to feel the farm from morning to night.', day_btn: 'SEE THE WHOLE SITE AT THIS HOUR',
  ph_m_t: 'Morning', ph_m_p: 'Soft light for haldi, photoshoots and breakfast gatherings.',
  ph_a_t: 'Afternoon', ph_a_p: 'Shade and open lawns for reunions, corporate events and family lunches.',
  ph_g_t: 'Golden hour', ph_g_p: 'Warm light for engagements, birthdays and the best photos of the day.',
  ph_n_t: 'Night', ph_n_p: 'Fairy lights, dinners and music under the open sky.',
  th_auto: 'Auto (your local time)', tk_dot: 'guests per dot',
  up: 'Back to top', close: 'Close', prev: 'Previous photo', next: 'Next photo', menu: 'Menu', lang_btn: 'मराठी',
} as const;

export type Key = keyof typeof en;

export const mr: Record<Key, string> = {
  nav_home: 'मुख्यपृष्ठ', nav_farm: 'फार्म', nav_celebrations: 'समारंभ', nav_gallery: 'गॅलरी', nav_contact: 'संपर्क',
  book: 'तारीख बुक करा',
  badge: 'बुकींग चालू',
  hero_title: 'प्रत्येक समारंभासाठी तुमची स्वतःची *बाग.*', hero_words: '',
  hero_sub: 'जीवनातील संस्मरणीय क्षणांसाठी एक निसर्गरम्य आणि आरामदायी ठिकाण.',
  hero_cta1: 'फार्म पहा', hero_cta2: 'तारीख तपासा', scroll: 'खाली पहा',
  s_open: 'बुकींग चालू', s_park: 'फार्मवर पार्किंग', s_loc: 'बारामती, पुणे',
  about_eyebrow: 'एकत्र येण्यासाठी एक ठिकाण',
  about_h: 'महत्त्वाच्या क्षणांसाठी जागा करा.',
  about_p: 'बारामतीतील पागळे सेलिब्रेशन फार्म हे वाढदिवस, वर्धापनदिन, लग्न, साखरपुडा, हळदी समारंभ, शाळा-कॉलेज गेट-टुगेदर, फॅमिली पार्टी आणि कॉर्पोरेट इव्हेंट्ससाठी योग्य असे शांत, मोकळे बागेचे ठिकाण आहे.',
  about_btn: 'फार्म शोधा',
  tour_h: 'फार्मवर एक फेरफटका.',
  tour_p: 'बागा, झोके आणि सावलीचे कोपरे पाहण्यासाठी खाली स्क्रोल करा.',
  tr1_t: 'स्वागत कमान', tr1_p: 'वेली आणि माडांनी सजलेल्या हिरव्या प्रवेशद्वारातून आत या.',
  tr2_t: 'फुलांच्या वाटा', tr2_p: 'हेजेस आणि फुलांच्या वेलींमधून जाणाऱ्या खडीच्या वाटा, संध्याकाळच्या निवांत फेरफटक्यासाठी.',
  tr3_t: 'झोके व खेळ', tr3_p: 'लहान-मोठ्यांसाठी झोके आणि सावलीतील बागेचा झोका.',
  tr4_t: 'व्ह्यूइंग डेक', tr4_p: 'संपूर्ण फार्मचे मोकळे दृश्य देणारा, बसण्याची सोय असलेला वरचा डेक.',
  tr5_t: 'सावलीचे कोपरे', tr5_p: 'कुटुंब आणि मित्रांसाठी सावलीतील टेबल-खुर्च्यांचे कोपरे.',
  tr6_t: 'हिरवळ', tr6_p: 'मऊ हिरवळ, केळीची पाने आणि काही गोंडस हरणांचे पुतळे.',
  cel_h: 'तुमच्या पद्धतीने साजरे करा.', cel_p: 'जीवनातील खास प्रसंगांसाठी बहुउपयोगी बागेची जागा.', cel_tap: 'चौकशी सुरू करण्यासाठी कार्डवर टॅप करा',
  also: 'याशिवाय',
  ev_birthday: 'वाढदिवस व वर्धापनदिन समारंभ', ev_wedding: 'लग्न समारंभ व साखरपुडा',
  ev_corporate: 'फॅमिली पार्टी व कॉर्पोरेट इव्हेंट्स', ev_school: 'शाळा-कॉलेज गेट-टुगेदर',
  ev_haldi: 'हळदी समारंभ', ev_corp: 'कॉर्पोरेट इव्हेंट्स', ev_family: 'कौटुंबिक स्नेहमेळावे', ev_photo: 'फोटोशूट',
  gal_h: 'फार्मची झलक.', gal_p: 'फार्मवरील खरे फोटो. मोठा पाहण्यासाठी फोटोवर टॅप करा.',
  c_all: 'सर्व', c_entrance: 'प्रवेशद्वार', c_gardens: 'बागा व वाटा', c_swings: 'झोके व खेळ', c_seating: 'बसण्याची जागा',
  plan_h: 'चला तुमचा दिवस ठरवूया.', plan_p: 'तुमच्या समारंभाविषयी सांगा, आम्ही तारखेच्या उपलब्धतेसह संपर्क करू.',
  f_name: 'तुमचे नाव', f_name_ph: 'तुमचे पूर्ण नाव लिहा', f_event: 'समारंभाचा प्रकार', f_event_ph: 'समारंभ निवडा',
  f_date: 'आवडती तारीख', f_time: 'आवडती वेळ',
  slot_morning: 'सकाळ', slot_afternoon: 'दुपार', slot_evening: 'संध्याकाळ',
  f_guests: 'अंदाजे पाहुणे', f_addons: 'अतिरिक्त सेवा (ऐच्छिक)',
  ad_decor: 'बागेची सजावट', ad_cater: 'केटरिंग मदत', ad_sound: 'साउंड सिस्टीम', ad_photo: 'फोटोग्राफी मदत',
  tk_title: 'तुमची चौकशी', tk_event: 'समारंभ', tk_date: 'तारीख', tk_time: 'वेळ', tk_guests: 'पाहुणे', tk_extras: 'अतिरिक्त सेवा', tk_none: 'अजून नाही', tk_pick: 'निवडलेले नाही',
  est_label: 'अंदाजे खर्च', est_val: 'दर चौकशीवर कळवले जातील',
  wa_btn: 'व्हॉट्सअ‍ॅपवर चौकशी करा', wa_fill: 'पाठवण्यासाठी नाव, समारंभ व तारीख भरा.', note: 'तुमची तारीख आमची टीम स्वतः निश्चित करेल.',
  loc_h: 'आम्हाला शोधा.', loc_p: 'बारामतीतील पालखी महामार्गाजवळ. आम्हाला कॉल करा किंवा मार्ग पाहून फार्मला भेट द्या.',
  loc_addr: 'पागळे सेलिब्रेशन फार्म, जळोची–कऱ्हेरी रोड, पालखी महामार्गाजवळ, शिवसृष्टी नगर, बारामती, जि. पुणे, महाराष्ट्र',
  directions: 'मार्ग पहा', call: 'आत्ता कॉल करा',
  foot_tag: 'तुमच्या समारंभांसाठी एक निसर्गरम्य आणि आरामदायी ठिकाण.',
  th_day: 'दिवस', th_dusk: 'सायंकाळ', th_night: 'रात्र', th_label: 'दिवसाची वेळ',
  day_h: 'फार्मवरील एक दिवस.', day_p: 'सकाळपासून रात्रीपर्यंत फार्म कसा दिसतो ते पाहण्यासाठी सूर्य ओढा.', day_btn: 'संपूर्ण साइट या वेळी पहा',
  ph_m_t: 'सकाळ', ph_m_p: 'हळदी, फोटोशूट आणि सकाळच्या स्नेहभोजनासाठी मऊ प्रकाश.',
  ph_a_t: 'दुपार', ph_a_p: 'गेट-टुगेदर, कॉर्पोरेट इव्हेंट्स आणि कौटुंबिक जेवणासाठी सावली आणि मोकळी हिरवळ.',
  ph_g_t: 'सायंकाळ', ph_g_p: 'साखरपुडा, वाढदिवस आणि दिवसातील सर्वोत्तम फोटोंसाठी उबदार प्रकाश.',
  ph_n_t: 'रात्र', ph_n_p: 'मोकळ्या आकाशाखाली दिव्यांच्या माळा, जेवण आणि संगीत.',
  th_auto: 'ऑटो (तुमच्या वेळेनुसार)', tk_dot: 'पाहुणे प्रति ठिपका',
  up: 'वर जा', close: 'बंद करा', prev: 'मागील फोटो', next: 'पुढील फोटो', menu: 'मेनू', lang_btn: 'English',
};

type Lang = 'en' | 'mr';
interface Ctx { lang: Lang; t: (k: Key) => string; toggle: () => void }
const I18n = createContext<Ctx>({ lang: 'en', t: (k) => en[k], toggle: () => {} });

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>(() => (localStorage.getItem('lang') === 'mr' ? 'mr' : 'en'));
  useEffect(() => {
    localStorage.setItem('lang', lang);
    document.documentElement.lang = lang;
  }, [lang]);
  const t = useCallback((k: Key) => (lang === 'mr' ? mr[k] : en[k]), [lang]);
  const value = useMemo(() => ({ lang, t, toggle: () => setLang((l) => (l === 'en' ? 'mr' : 'en')) }), [lang, t]);
  return <I18n.Provider value={value}>{children}</I18n.Provider>;
}

export const useI18n = () => useContext(I18n);
