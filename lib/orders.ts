import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import type { PaymentMethod } from './payment/types'

export interface OrderItem {
  productId: string
  productName: string
  quantity: number
  price: number
  image: string
}

export interface Order {
  id: string
  orderNumber: string
  customer: {
    name: string
    phone: string
    email: string
    address: string
  }
  items: OrderItem[]
  total: number
  status: 'pending' | 'processing' | 'completed' | 'cancelled'
  orderDate: string
  deliveryDate?: string
  notes?: string
  payment?: {
    method: PaymentMethod
    transactionId?: string
    paidAt?: string
  }
}

interface OrdersStore {
  orders: Order[]
  addOrder: (order: Omit<Order, 'id' | 'orderNumber' | 'orderDate' | 'status'>) => void
  updateOrderStatus: (orderId: string, status: Order['status']) => void
  getOrderById: (orderId: string) => Order | undefined
  getAllOrders: () => Order[]
  getOrdersByStatus: (status: Order['status']) => Order[]
  getTotalRevenue: () => number
  getTodayOrders: () => Order[]
  getMonthlyOrders: () => Order[]
}

// Generate order number
const generateOrderNumber = (count: number): string => {
  return `ORD-${String(count + 1001).padStart(4, '0')}`
}

export const useOrdersStore = create<OrdersStore>()(
  persist(
    (set, get) => ({
      orders: [],
      
      addOrder: (orderData) => {
        const currentOrders = get().orders
        const newOrder: Order = {
          ...orderData,
          id: `order-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
          orderNumber: generateOrderNumber(currentOrders.length),
          orderDate: new Date().toISOString(),
          status: 'pending',
        }
        set({ orders: [...currentOrders, newOrder] })
      },
      
      updateOrderStatus: (orderId, status) => {
        set({
          orders: get().orders.map(order =>
            order.id === orderId ? { ...order, status } : order
          ),
        })
      },
      
      getOrderById: (orderId) => {
        return get().orders.find(order => order.id === orderId)
      },
      
      getAllOrders: () => {
        return get().orders.sort((a, b) => 
          new Date(b.orderDate).getTime() - new Date(a.orderDate).getTime()
        )
      },
      
      getOrdersByStatus: (status) => {
        return get().orders.filter(order => order.status === status)
      },
      
      getTotalRevenue: () => {
        return get().orders
          .filter(order => order.status !== 'cancelled')
          .reduce((total, order) => total + order.total, 0)
      },
      
      getTodayOrders: () => {
        const today = new Date().toDateString()
        return get().orders.filter(order => 
          new Date(order.orderDate).toDateString() === today
        )
      },
      
      getMonthlyOrders: () => {
        const currentMonth = new Date().getMonth()
        const currentYear = new Date().getFullYear()
        return get().orders.filter(order => {
          const orderDate = new Date(order.orderDate)
          return orderDate.getMonth() === currentMonth && 
                 orderDate.getFullYear() === currentYear
        })
      },
    }),
    {
      name: 'cookie-liza-orders-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
)

// Helper to extract unique customers from orders
export const getCustomersFromOrders = (orders: Order[]) => {
  const customerMap = new Map<string, {
    name: string
    email: string
    phone: string
    address: string
    totalOrders: number
    totalSpent: number
    lastOrderDate: string
    status: 'active' | 'inactive'
  }>()

  orders.forEach(order => {
    const key = order.customer.email
    if (customerMap.has(key)) {
      const existing = customerMap.get(key)!
      customerMap.set(key, {
        ...existing,
        totalOrders: existing.totalOrders + 1,
        totalSpent: existing.totalSpent + order.total,
        lastOrderDate: order.orderDate > existing.lastOrderDate ? order.orderDate : existing.lastOrderDate,
      })
    } else {
      customerMap.set(key, {
        ...order.customer,
        totalOrders: 1,
        totalSpent: order.total,
        lastOrderDate: order.orderDate,
        status: 'active',
      })
    }
  })

  // Convert to array and mark inactive customers (no orders in last 30 days)
  const thirtyDaysAgo = new Date()
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)

  return Array.from(customerMap.entries()).map(([email, data]) => ({
    id: email,
    ...data,
    status: new Date(data.lastOrderDate) > thirtyDaysAgo ? 'active' as const : 'inactive' as const,
  }))
}

