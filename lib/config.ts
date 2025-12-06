// Site Configuration Constants
export const SITE_CONFIG = {
  name: 'קוקי ליזה',
  nameEn: 'Cookie Liza Bakery',
  description: 'מאפים טריים שנעשו באהבה מ-2010',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://cookieliza.vercel.app',
  contact: {
    phone: process.env.NEXT_PUBLIC_CONTACT_PHONE || '050-123-4567',
    phoneLink: 'tel:+972501234567',
    email: process.env.NEXT_PUBLIC_CONTACT_EMAIL || 'info@cookieliza.co.il',
    address: 'תל אביב, ישראל',
  },
  social: {
    // Add social media links when available
    // instagram: 'https://instagram.com/cookieliza',
    // facebook: 'https://facebook.com/cookieliza',
  },
  business: {
    foundedYear: 2010,
    currency: '₪',
    currencySymbol: '₪',
  },
} as const;

export const NAV_LINKS = [
  { href: '#cakes', label: 'עוגות' },
  { href: '#cookies', label: 'עוגיות' },
  { href: '#breads', label: 'לחמים' },
] as const;

export const FOOTER_LINKS = [
  { href: '#cakes', label: 'עוגות' },
  { href: '#cookies', label: 'עוגיות' },
  { href: '#breads', label: 'לחמים' },
  { href: '/cart', label: 'עגלת קניות' },
] as const;

