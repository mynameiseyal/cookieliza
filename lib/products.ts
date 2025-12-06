export interface Product {
  id: string
  name: string
  description: string
  price: number
  unit?: string
  image: string
  category: 'cake' | 'cookie' | 'bread'
  badge?: string
  inStock: boolean
}

export const PRODUCTS: Product[] = [
  // Cakes
  {
    id: 'cake-1',
    name: 'עוגת שוקולד מפנקת',
    description: 'עוגת שוקולד עשירה עם קרם חמאה וציפוי גנאש',
    price: 159.90,
    image: '/Cakes/20210327_201219.jpg',
    category: 'cake',
    badge: 'חדש',
    inStock: true,
  },
  {
    id: 'cake-2',
    name: 'עוגת וניל קלאסית',
    description: 'עוגת וניל אוורירית עם קרם חמאה ופירות טריים',
    price: 169.90,
    image: '/Cakes/20220617_185816.jpg',
    category: 'cake',
    badge: 'פופולרי',
    inStock: true,
  },
  {
    id: 'cake-3',
    name: 'עוגת גבינה אפויה',
    description: 'עוגת גבינה קרמית על בסיס עוגיות',
    price: 179.90,
    image: '/Cakes/20220925_195313.jpg',
    category: 'cake',
    inStock: true,
  },
  {
    id: 'cake-4',
    name: 'עוגת פירות יער',
    description: 'עוגה אוורירית עם פירות יער טריים וקרם שמנת',
    price: 189.90,
    image: '/Cakes/20210115_175132.jpg',
    category: 'cake',
    inStock: true,
  },
  {
    id: 'cake-5',
    name: 'עוגת קרמל מלוח',
    description: 'עוגת שכבות עם קרם קרמל מלוח וציפוי שוקולד',
    price: 199.90,
    image: '/Cakes/20230714_194746.jpg',
    category: 'cake',
    badge: 'מומלץ',
    inStock: true,
  },
  {
    id: 'cake-6',
    name: 'עוגת תפוחים ביתית',
    description: 'עוגת תפוחים עם קינמון וציפוי פריך',
    price: 149.90,
    image: '/Cakes/20210316_154216.jpg',
    category: 'cake',
    inStock: true,
  },
  {
    id: 'cake-7',
    name: 'עוגת לימון ולבנדר',
    description: 'עוגה רעננה עם לימון וטאץ לבנדר',
    price: 169.90,
    image: '/Cakes/20210115_181048.jpg',
    category: 'cake',
    inStock: true,
  },
  {
    id: 'cake-8',
    name: 'עוגת שכבות אדומה',
    description: 'רד וולווט קלאסית עם קרם גבינה',
    price: 189.90,
    image: '/Cakes/20210219_123623.jpg',
    category: 'cake',
    inStock: true,
  },
  {
    id: 'cake-9',
    name: 'עוגת מוס שוקולד',
    description: 'מוס שוקולד מריר על בסיס עוגיות',
    price: 179.90,
    image: '/Cakes/20210327_201124.jpg',
    category: 'cake',
    inStock: true,
  },
  {
    id: 'cake-10',
    name: 'עוגת טירמיסו',
    description: 'טירמיסו איטלקי אותנטי עם קפה ומסקרפונה',
    price: 199.90,
    image: '/Cakes/20210327_201419.jpg',
    category: 'cake',
    badge: 'חדש',
    inStock: true,
  },
  
  // Cookies
  {
    id: 'cookie-1',
    name: 'עוגיות שוקולד צ\'יפס',
    description: 'עוגיות פריכות עם שברי שוקולד מריר',
    price: 44.90,
    unit: 'תריסר',
    image: '/Cookies/IMG-20221021-WA0059.jpg',
    category: 'cookie',
    badge: 'פופולרי',
    inStock: true,
  },
  {
    id: 'cookie-2',
    name: 'עוגיות חמאה דניות',
    description: 'עוגיות חמאה פריכות בסגנון דני',
    price: 49.90,
    unit: 'תריסר',
    image: '/Cookies/IMG-20221021-WA0062.jpg',
    category: 'cookie',
    inStock: true,
  },
  {
    id: 'cookie-3',
    name: 'עוגיות אגוזים',
    description: 'עוגיות עשירות עם אגוזי פקאן קלויים',
    price: 54.90,
    unit: 'תריסר',
    image: '/Cookies/20221021_155404.jpg',
    category: 'cookie',
    inStock: true,
  },
  {
    id: 'cookie-4',
    name: 'עוגיות שקדים',
    description: 'עוגיות שקדים רכות ועסיסיות',
    price: 59.90,
    unit: 'תריסר',
    image: '/Cookies/IMG-20221021-WA0070.jpg',
    category: 'cookie',
    inStock: true,
  },
  {
    id: 'cookie-5',
    name: 'עוגיות שוקולד לבן',
    description: 'עוגיות עם שוקולד לבן ומקדמיה',
    price: 64.90,
    unit: 'תריסר',
    image: '/Cookies/20210415_165628.jpg',
    category: 'cookie',
    badge: 'חדש',
    inStock: true,
  },
  
  // Breads
  {
    id: 'bread-1',
    name: 'חלה ביתית',
    description: 'חלה רכה ואוורירית לשבת',
    price: 29.90,
    unit: 'כיכר',
    image: '/Breads/20210720_131623.jpg',
    category: 'bread',
    badge: 'טרי מהתנור',
    inStock: true,
  },
  {
    id: 'bread-2',
    name: 'לחם מחמצת',
    description: 'לחם מחמצת עם קליפה פריכה',
    price: 32.90,
    unit: 'כיכר',
    image: '/Breads/20210720_140447.jpg',
    category: 'bread',
    badge: 'טרי מהתנור',
    inStock: true,
  },
  {
    id: 'bread-3',
    name: 'לחם שיפון',
    description: 'לחם שיפון רך ועסיסי',
    price: 35.90,
    unit: 'כיכר',
    image: '/Breads/20210722_082834.jpg',
    category: 'bread',
    inStock: true,
  },
  {
    id: 'bread-4',
    name: 'לחם מלא',
    description: 'לחם מקמח מלא 100%',
    price: 38.90,
    unit: 'כיכר',
    image: '/Breads/20210724_082425.jpg',
    category: 'bread',
    inStock: true,
  },
  {
    id: 'bread-5',
    name: 'לחם זיתים',
    description: 'לחם עם זיתים ירוקים ושמן זית',
    price: 41.90,
    unit: 'כיכר',
    image: '/Breads/20210724_083844.jpg',
    category: 'bread',
    badge: 'פופולרי',
    inStock: true,
  },
  {
    id: 'bread-6',
    name: 'פוקאצ\'ה',
    description: 'פוקאצ\'ה איטלקית עם רוזמרין',
    price: 34.90,
    unit: 'כיכר',
    image: '/Breads/20210726_200052.jpg',
    category: 'bread',
    inStock: true,
  },
  {
    id: 'bread-7',
    name: 'לחם שום',
    description: 'לחם עם שום טרי וחמאה',
    price: 36.90,
    unit: 'כיכר',
    image: '/Breads/20210726_200244.jpg',
    category: 'bread',
    inStock: true,
  },
  {
    id: 'bread-8',
    name: 'בגט צרפתי',
    description: 'בגט פריזאי קלאסי',
    price: 28.90,
    unit: 'כיכר',
    image: '/Breads/20210726_200638.jpg',
    category: 'bread',
    inStock: true,
  },
  {
    id: 'bread-9',
    name: 'לחם שיבולת שועל',
    description: 'לחם עם שיבולת שועל וזרעים',
    price: 39.90,
    unit: 'כיכר',
    image: '/Breads/20240127_173950.jpg',
    category: 'bread',
    badge: 'טרי מהתנור',
    inStock: true,
  },
  {
    id: 'bread-10',
    name: 'לחם דגנים',
    description: 'לחם עשיר בדגנים מלאים',
    price: 42.90,
    unit: 'כיכר',
    image: '/Breads/20240217_150100.jpg',
    category: 'bread',
    inStock: true,
  },
]

// Helper functions
export const getProductsByCategory = (category: 'cake' | 'cookie' | 'bread') => {
  return PRODUCTS.filter(product => product.category === category)
}

export const getProductById = (id: string) => {
  return PRODUCTS.find(product => product.id === id)
}

export const getAllProducts = () => {
  return PRODUCTS
}

export const getInStockProducts = () => {
  return PRODUCTS.filter(product => product.inStock)
}

