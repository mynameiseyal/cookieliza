import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { PRODUCTS, Product } from './products';

interface ProductsStore {
  products: Product[];
  addProduct: (product: Omit<Product, 'id'>) => void;
  updateProduct: (id: string, product: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
  getProductById: (id: string) => Product | undefined;
  getAllProducts: () => Product[];
  getProductsByCategory: (category: 'cake' | 'cookie' | 'bread') => Product[];
  resetToDefaults: () => void;
}

export const useProductsStore = create<ProductsStore>()(
  persist(
    (set, get) => ({
      products: PRODUCTS,
      
      addProduct: (productData) => {
        const newProduct: Product = {
          ...productData,
          id: `product-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        };
        set({ products: [...get().products, newProduct] });
      },
      
      updateProduct: (id, productData) => {
        set({
          products: get().products.map(product =>
            product.id === id ? { ...product, ...productData } : product
          ),
        });
      },
      
      deleteProduct: (id) => {
        set({
          products: get().products.filter(product => product.id !== id),
        });
      },
      
      getProductById: (id) => {
        return get().products.find(product => product.id === id);
      },
      
      getAllProducts: () => {
        return get().products;
      },
      
      getProductsByCategory: (category) => {
        return get().products.filter(product => product.category === category);
      },
      
      resetToDefaults: () => {
        set({ products: PRODUCTS });
      },
    }),
    {
      name: 'cookie-liza-products-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
);

