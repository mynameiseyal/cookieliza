# 🍪 Cookie Liza - קוקי ליזה

A modern, accessible e-commerce bakery website built with Next.js 15, React 19, and TypeScript.

![Cookie Liza Banner](public/Liza.jpg)

## ✨ Features

### Customer-Facing Features
- 🎨 **Modern UI/UX** - Beautiful gradient design with smooth animations
- ♿ **WCAG 2.1 AA Compliant** - Full accessibility support
- 📱 **Fully Responsive** - Mobile-first design that works on all devices
- 🛒 **Shopping Cart** - Persistent cart with localStorage
- 🔥 **Real-time Updates** - Toast notifications for user feedback
- 📊 **Analytics** - Vercel Analytics and Speed Insights integrated
- 🌐 **RTL Support** - Full Hebrew (עברית) language support
- ⚡ **Performance Optimized** - Next.js Image optimization and caching
- 🎯 **SEO Ready** - Comprehensive metadata and Open Graph tags

### Admin Dashboard Features
- 🔐 **Secure Authentication** - Password-protected admin panel
- 📈 **Analytics Dashboard** - Key metrics and business insights
- 🏷️ **Product Management** - View, search, and filter products
- 📦 **Order Management** - Track and manage customer orders
- 👥 **Customer Management** - Customer profiles and history
- 📊 **Reports & Analytics** - Sales data and trends visualization

See [ADMIN_README.md](ADMIN_README.md) for detailed admin documentation.

## 🚀 Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org/) with App Router
- **React**: 19.1.2 (Latest)
- **TypeScript**: Full type safety
- **Styling**: Tailwind CSS 4.0
- **State Management**: Zustand with persistence
- **Icons**: Hero Icons
- **Fonts**: Google Fonts (Heebo for Hebrew)
- **Analytics**: Vercel Analytics & Speed Insights
- **Notifications**: React Hot Toast

## 📦 Installation

```bash
# Clone the repository
git clone https://github.com/mynameiseyal/cookieliza.git
cd cookieliza

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
# Edit .env.local with your configuration

# Run development server
npm run cookieliza
# or
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## 🔐 Environment Variables

Create a `.env.local` file in the root directory (copy from `.env.example`):

```env
# Admin Panel Configuration
NEXT_PUBLIC_ADMIN_PASSWORD=your-secure-password

# Site Configuration (optional - defaults provided)
NEXT_PUBLIC_SITE_URL=https://your-domain.com
NEXT_PUBLIC_CONTACT_PHONE=050-123-4567
NEXT_PUBLIC_CONTACT_EMAIL=info@cookieliza.co.il
```

**Note**: `.env.local` is ignored by git for security. For deployment to Vercel, set these variables in the Vercel dashboard.

## 🔧 Environment Variables

Create a `.env.local` file in the root directory:

```env
NEXT_PUBLIC_SITE_URL=https://your-domain.com
NEXT_PUBLIC_CONTACT_PHONE=050-123-4567
NEXT_PUBLIC_CONTACT_EMAIL=info@cookieliza.co.il
```

## 📁 Project Structure

```
cookieliza/
├── app/
│   ├── cart/              # Shopping cart page
│   ├── store/             # Zustand state management
│   ├── error.tsx          # Error boundary
│   ├── loading.tsx        # Loading state
│   ├── layout.tsx         # Root layout with metadata
│   └── page.tsx           # Homepage
├── lib/
│   ├── products.ts        # Product data and helpers
│   └── config.ts          # Site configuration
├── public/
│   ├── Cakes/             # Cake product images
│   ├── Cookies/           # Cookie product images
│   └── Breads/            # Bread product images
└── README.md
```

## 🛠️ Key Features Implementation

### Cart Persistence
Cart state is automatically saved to localStorage and persists across page refreshes:

```typescript
// app/store/cart.ts
export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      // Cart logic here
    }),
    {
      name: 'cookie-liza-cart-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
);
```

### Product Management
Products are defined in a structured format:

```typescript
// lib/products.ts
export const PRODUCTS: Product[] = [
  {
    id: 'cake-1',
    name: 'עוגת שוקולד מפנקת',
    description: 'עוגת שוקולד עשירה...',
    price: 159.90,
    image: '/Cakes/cake1.jpg',
    category: 'cake',
    badge: 'חדש',
    inStock: true,
  },
  // ... more products
];
```

### Toast Notifications
User-friendly feedback on cart actions:

```typescript
import toast from 'react-hot-toast';

const handleAddToCart = (product) => {
  addItem(product);
  toast.success(`${product.name} נוסף לעגלה! 🎉`);
};
```

## 🎨 Design System

### Colors
- **Primary**: Pink (`#db2777`) to Purple (`#9333ea`) gradients
- **Secondary**: Amber (`#d97706`) to Orange (`#ea580c`)
- **Accent**: Yellow (`#ca8a04`) to Amber (`#b45309`)

### Typography
- **Hebrew**: Heebo (Google Fonts)
- **Latin**: Geist Sans
- **Monospace**: Geist Mono

### Breakpoints
- **Mobile**: < 640px
- **Tablet**: 640px - 1024px
- **Desktop**: > 1024px

## ♿ Accessibility Features

- ✅ Skip to main content link
- ✅ ARIA labels and landmarks
- ✅ Keyboard navigation support
- ✅ Screen reader optimized
- ✅ Focus indicators
- ✅ Semantic HTML
- ✅ Alt text for all images
- ✅ Color contrast compliance

## 📊 Performance

- Lighthouse Score: 95+
- First Contentful Paint: < 1.5s
- Time to Interactive: < 3s
- Cumulative Layout Shift: < 0.1

## 🚀 Deployment

### Vercel (Recommended)

1. Push code to GitHub
2. Import project in [Vercel](https://vercel.com)
3. Add environment variables
4. Deploy!

```bash
# Or use Vercel CLI
npm i -g vercel
vercel
```

### Other Platforms
- **Netlify**: Configure build command as `npm run build`
- **AWS Amplify**: Use Next.js SSR hosting
- **Docker**: Build with `docker build -t cookieliza .`

## 📈 Analytics

Vercel Analytics is automatically enabled. View insights in your Vercel dashboard:
- Page views
- Web Vitals
- User demographics
- Performance metrics

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is private and proprietary.

## 👨‍💻 Author

**Cookie Liza Bakery**
- Website: [cookieliza.vercel.app](https://cookieliza.vercel.app)
- Email: info@cookieliza.co.il
- Phone: 050-123-4567

## 🙏 Acknowledgments

- Next.js team for an amazing framework
- Vercel for hosting and analytics
- Tailwind CSS for utility-first styling
- The open-source community

---

**Made with ❤️ and 🍪 in Tel Aviv, Israel**
