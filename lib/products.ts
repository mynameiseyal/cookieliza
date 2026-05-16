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
    name: 'עוגת שוקולד עם קצפת',
    description: 'עוגת שוקולד עשירה עם קרם שוקולד ועיטורי קצפת, מאובקת באבקת קקאו',
    price: 159.90,
    image: '/Cakes/638322538939787777.jpg',
    category: 'cake',
    badge: 'חדש',
    inStock: true,
  },
  {
    id: 'cake-2',
    name: 'פבלובה פירות יער',
    description: 'מרנג אוורירי עם קצפת ומגוון פירות יער טריים – תות, אוכמניות, ענבים ודובדבנים',
    price: 169.90,
    image: '/Cakes/1546467015832101443.jpg',
    category: 'cake',
    badge: 'פופולרי',
    inStock: true,
  },
  {
    id: 'cake-3',
    name: 'עוגת שוקולד קרמל',
    description: 'עוגת שוקולד מריר עם מילוי קרמל עשיר וציפוי גנאש שוקולד',
    price: 179.90,
    image: '/Cakes/2480825663693983247.jpg',
    category: 'cake',
    inStock: true,
  },
  {
    id: 'cake-4',
    name: 'עוגת קוקוס ותות',
    description: 'עוגת ספוג קלילה עם קצפת ושבבי קוקוס, מקושטת בתות ופירות יער',
    price: 189.90,
    image: '/Cakes/1325492804583082977.jpg',
    category: 'cake',
    inStock: true,
  },
  {
    id: 'cake-5',
    name: 'עוגת גנאש שוקולד',
    description: 'עוגת שוקולד מהודרת עם ציפוי גנאש מבריק, אגוזים קצוצים ועיטור שוקולד',
    price: 199.90,
    image: '/Cakes/2391304221621611312.jpg',
    category: 'cake',
    badge: 'מומלץ',
    inStock: true,
  },
  {
    id: 'cake-6',
    name: 'עוגת לב עם פטל',
    description: 'עוגת ספוג בצורת לב עם קצפת ופטל טרי',
    price: 149.90,
    image: '/Cakes/2020630104708680872.jpg',
    category: 'cake',
    inStock: true,
  },
  {
    id: 'cake-7',
    name: 'עוגת שוקולד פקאן',
    description: 'עוגת שוקולד בצורת עוגת טבעת עם ציפוי גנאש ואגוזי פקאן',
    price: 169.90,
    image: '/Cakes/1971055613087352815.jpg',
    category: 'cake',
    inStock: true,
  },
  {
    id: 'cake-8',
    name: 'שרלוט דובדבנים',
    description: 'עוגת שרלוט עם אצבעות ליידי ודובדבנים טריים על קרם גבינה',
    price: 189.90,
    image: '/Cakes/1892188979701617294.jpg',
    category: 'cake',
    inStock: true,
  },
  {
    id: 'cake-9',
    name: 'עוגת גבינה עם תות',
    description: 'עוגת גבינה אפויה עם ציפוי תות ורוד, עיטורי קצפת ופרוסות תות טרי',
    price: 179.90,
    image: '/Cakes/2261037307470019233.jpg',
    category: 'cake',
    inStock: true,
  },
  {
    id: 'cake-10',
    name: 'עוגת טירמיסו',
    description: 'טירמיסו איטלקי אותנטי עם קפה ומסקרפונה',
    price: 199.90,
    image: '/Cakes/2938810377064056123.webp',
    category: 'cake',
    badge: 'חדש',
    inStock: true,
  },
  
  // Cookies
  {
    id: 'cookie-1',
    name: 'פאדג\' שוקולד',
    description: 'קוביות פאדג\' שוקולד ביתיות עשירות עם אגוזים',
    price: 44.90,
    unit: 'קופסה',
    image: '/Cookies/1963807568774459067.jpg',
    category: 'cookie',
    badge: 'פופולרי',
    inStock: true,
  },
  {
    id: 'cookie-2',
    name: 'מקרונים צרפתיים',
    description: 'מקרונים עדינים בטעמי ורד וווניל עם מילוי קרם גנאש',
    price: 49.90,
    unit: 'תריסר',
    image: '/Cookies/1042110502590851089.jpg',
    category: 'cookie',
    inStock: true,
  },
  {
    id: 'cookie-3',
    name: 'עוגיות פרחוניות',
    description: 'עוגיות חמאה פריכות בצורת פרח בשני טעמים – וניל ושוקולד',
    price: 54.90,
    unit: 'תריסר',
    image: '/Cookies/2273538484556056803.jpg',
    category: 'cookie',
    inStock: true,
  },
  {
    id: 'cookie-4',
    name: 'עוגיות שוקולד מריר',
    description: 'עוגיות שוקולד מריר רכות מבפנים עם קרום פריך',
    price: 59.90,
    unit: 'תריסר',
    image: '/Cookies/1959554886295432679.jpg',
    category: 'cookie',
    inStock: true,
  },
  {
    id: 'cookie-5',
    name: 'רוגלך',
    description: 'רוגלך פריך ממולא ריבה, מגולגל ומאובק באבקת סוכר',
    price: 54.90,
    unit: 'תריסר',
    image: '/Cookies/2495213009013037805.jpg',
    category: 'cookie',
    badge: 'חדש',
    inStock: true,
  },
  
  // Breads
  {
    id: 'bread-1',
    name: 'חלה ביתית',
    description: 'חלות קטנות רכות ואווריריות, טריות מהתנור',
    price: 29.90,
    unit: 'יחידה',
    image: '/Breads/2653155982206718798.jpg',
    category: 'bread',
    badge: 'טרי מהתנור',
    inStock: true,
  },
  {
    id: 'bread-2',
    name: 'לחם מחמצת',
    description: 'לחם מחמצת עם קליפה פריכה ופירור אוורירי',
    price: 32.90,
    unit: 'כיכר',
    image: '/Breads/2973493150651439961.webp',
    category: 'bread',
    badge: 'טרי מהתנור',
    inStock: true,
  },
  {
    id: 'bread-3',
    name: 'לחם זרעים',
    description: 'לחם מחמצת כהה עם זרעים – דלעת, חמניות ופשתן',
    price: 35.90,
    unit: 'כיכר',
    image: '/Breads/2689295442153558785.jpg',
    category: 'bread',
    inStock: true,
  },
  {
    id: 'bread-4',
    name: 'לחם שיפון כהה',
    description: 'לחם שיפון כהה וסמיך עם ארומה עמוקה',
    price: 38.90,
    unit: 'כיכר',
    image: '/Breads/2741726849592744103_2741726842085176849.jpg',
    category: 'bread',
    inStock: true,
  },
  {
    id: 'bread-5',
    name: 'לחם מחמצת כפרי',
    description: 'לחם מחמצת כפרי עם פירור פתוח ופריך',
    price: 41.90,
    unit: 'כיכר',
    image: '/Breads/2687250029158203634_2687250021155484611.jpg',
    category: 'bread',
    badge: 'פופולרי',
    inStock: true,
  },
  {
    id: 'bread-6',
    name: 'לחם טאבון',
    description: 'לחם טאבון עגול ופריך, אפוי על אבן',
    price: 34.90,
    unit: 'יחידה',
    image: '/Breads/2741721889450819579_2741721881850875035.jpg',
    category: 'bread',
    inStock: true,
  },
  {
    id: 'bread-7',
    name: 'בבקה שוקולד',
    description: 'בבקה שוקולד עגולה עשירה עם שכבות שוקולד וציפוי קרמל',
    price: 45.90,
    unit: 'כיכר',
    image: '/Breads/1968353595935879330.jpg',
    category: 'bread',
    badge: 'מומלץ',
    inStock: true,
  },
  {
    id: 'bread-8',
    name: 'לחם מחבת',
    description: 'לחם שטוח ביתי מטוגן במחבת, פריך מבחוץ ורך מבפנים',
    price: 28.90,
    unit: 'יחידה',
    image: '/Breads/2480751196720437700.jpg',
    category: 'bread',
    inStock: true,
  },
  {
    id: 'bread-9',
    name: 'לחם כפרי',
    description: 'לחם כפרי עם קרום זהוב ופירור מחמצת',
    price: 39.90,
    unit: 'כיכר',
    image: '/Breads/2687285297164680551_2687285288532811643.jpg',
    category: 'bread',
    badge: 'טרי מהתנור',
    inStock: true,
  },
  {
    id: 'bread-10',
    name: 'לחם מלא',
    description: 'לחם מקמח מלא 100% עם פירור צפוף וטעם עמוק',
    price: 42.90,
    unit: 'כיכר',
    image: '/Breads/2741726849592744103_2741726842127051722.jpg',
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

