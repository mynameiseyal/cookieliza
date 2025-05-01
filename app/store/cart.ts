import { create } from 'zustand'

// Instagram post IDs for each product type
const INSTAGRAM_POSTS = {
  cake: ['C1', 'C2', 'C3'], // Replace with actual Instagram post IDs
  cookie: ['K1', 'K2', 'K3'], // Replace with actual Instagram post IDs
  bread: ['B1', 'B2', 'B3'], // Replace with actual Instagram post IDs
}

export interface CartItem {
  id: string
  name: string
  price: number
  quantity: number
  instagramPostId: string // Now used to store the local image path
}

interface CartStore {
  items: CartItem[]
  addItem: (item: Omit<CartItem, 'quantity'>) => void
  removeItem: (id: string) => void
  updateQuantity: (id: string, quantity: number) => void
  getTotalItems: () => number
  getTotalPrice: () => number
}

export const useCartStore = create<CartStore>((set, get) => ({
  items: [],
  addItem: (item) => {
    const currentItems = get().items
    const existingItem = currentItems.find((i) => i.id === item.id)

    if (existingItem) {
      set({
        items: currentItems.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        ),
      })
    } else {
      set({ items: [...currentItems, { ...item, quantity: 1 }] })
    }
  },
  removeItem: (id) => {
    set({ items: get().items.filter((item) => item.id !== id) })
  },
  updateQuantity: (id, quantity) => {
    if (quantity <= 0) {
      get().removeItem(id)
      return
    }
    set({
      items: get().items.map((item) =>
        item.id === id ? { ...item, quantity } : item
      ),
    })
  },
  getTotalItems: () => {
    return get().items.reduce((total, item) => total + item.quantity, 0)
  },
  getTotalPrice: () => {
    return get().items.reduce((total, item) => total + (item.price * item.quantity), 0)
  },
})) 