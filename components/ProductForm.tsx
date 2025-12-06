'use client';

import { useState, useEffect } from 'react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { Product } from '@/lib/products';
import Image from 'next/image';

interface ProductFormProps {
  product?: Product;
  onSave: (product: Omit<Product, 'id'>) => void;
  onClose: () => void;
}

export default function ProductForm({ product, onSave, onClose }: ProductFormProps) {
  const [formData, setFormData] = useState({
    name: product?.name || '',
    description: product?.description || '',
    price: product?.price || 0,
    unit: product?.unit || '',
    image: product?.image || '',
    category: product?.category || 'cake' as 'cake' | 'cookie' | 'bread',
    badge: product?.badge || '',
    inStock: product?.inStock ?? true,
  });

  const [imagePreview, setImagePreview] = useState(product?.image || '');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setFormData({ ...formData, image: value });
    setImagePreview(value);
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div 
        className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto" 
        onClick={(e) => e.stopPropagation()}
        dir="rtl"
      >
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-900">
            {product ? 'ערוך מוצר' : 'הוסף מוצר חדש'}
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <XMarkIcon className="h-6 w-6 text-gray-500" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Name */}
          <div>
            <label htmlFor="name" className="block text-sm font-semibold text-gray-900 mb-2">
              שם המוצר <span className="text-red-600">*</span>
            </label>
            <input
              id="name"
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-4 focus:ring-pink-300 focus:border-pink-600 transition-all"
              placeholder="לדוגמה: עוגת שוקולד מפנקת"
            />
          </div>

          {/* Description */}
          <div>
            <label htmlFor="description" className="block text-sm font-semibold text-gray-900 mb-2">
              תיאור <span className="text-red-600">*</span>
            </label>
            <textarea
              id="description"
              required
              rows={3}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-4 focus:ring-pink-300 focus:border-pink-600 transition-all resize-none"
              placeholder="תאר את המוצר..."
            />
          </div>

          {/* Category and Badge */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="category" className="block text-sm font-semibold text-gray-900 mb-2">
                קטגוריה <span className="text-red-600">*</span>
              </label>
              <select
                id="category"
                required
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value as any })}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-4 focus:ring-pink-300 focus:border-pink-600 transition-all"
              >
                <option value="cake">🎂 עוגה</option>
                <option value="cookie">🍪 עוגיה</option>
                <option value="bread">🍞 לחם</option>
              </select>
            </div>

            <div>
              <label htmlFor="badge" className="block text-sm font-semibold text-gray-900 mb-2">
                תווית (אופציונלי)
              </label>
              <input
                id="badge"
                type="text"
                value={formData.badge}
                onChange={(e) => setFormData({ ...formData, badge: e.target.value })}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-4 focus:ring-pink-300 focus:border-pink-600 transition-all"
                placeholder="לדוגמה: חדש, פופולרי"
              />
            </div>
          </div>

          {/* Price and Unit */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="price" className="block text-sm font-semibold text-gray-900 mb-2">
                מחיר (₪) <span className="text-red-600">*</span>
              </label>
              <input
                id="price"
                type="number"
                required
                min="0"
                step="0.01"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) || 0 })}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-4 focus:ring-pink-300 focus:border-pink-600 transition-all"
                placeholder="0.00"
              />
            </div>

            <div>
              <label htmlFor="unit" className="block text-sm font-semibold text-gray-900 mb-2">
                יחידה (אופציונלי)
              </label>
              <input
                id="unit"
                type="text"
                value={formData.unit}
                onChange={(e) => setFormData({ ...formData, unit: e.target.value })}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-4 focus:ring-pink-300 focus:border-pink-600 transition-all"
                placeholder="לדוגמה: כיכר, תריסר"
              />
            </div>
          </div>

          {/* Image URL */}
          <div>
            <label htmlFor="image" className="block text-sm font-semibold text-gray-900 mb-2">
              נתיב תמונה <span className="text-red-600">*</span>
            </label>
            <input
              id="image"
              type="text"
              required
              value={formData.image}
              onChange={handleImageChange}
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-4 focus:ring-pink-300 focus:border-pink-600 transition-all"
              placeholder="/Cakes/image.jpg"
            />
            <p className="text-sm text-gray-500 mt-1">
              יש להעלות את התמונה לתיקיית public/{formData.category === 'cake' ? 'Cakes' : formData.category === 'cookie' ? 'Cookies' : 'Breads'}
            </p>
            {imagePreview && (
              <div className="mt-4 relative h-48 w-full rounded-lg overflow-hidden border-2 border-gray-200">
                <Image
                  src={imagePreview}
                  alt="תצוגה מקדימה"
                  fill
                  className="object-cover"
                  onError={() => setImagePreview('')}
                />
              </div>
            )}
          </div>

          {/* In Stock */}
          <div className="flex items-center gap-3">
            <input
              id="inStock"
              type="checkbox"
              checked={formData.inStock}
              onChange={(e) => setFormData({ ...formData, inStock: e.target.checked })}
              className="w-5 h-5 text-pink-600 border-gray-300 rounded focus:ring-4 focus:ring-pink-300"
            />
            <label htmlFor="inStock" className="text-sm font-semibold text-gray-900">
              המוצר במלאי
            </label>
          </div>

          {/* Buttons */}
          <div className="flex items-center gap-3 pt-4 border-t border-gray-200">
            <button
              type="submit"
              className="flex-1 bg-gradient-to-r from-pink-600 to-purple-600 text-white px-6 py-3 rounded-xl hover:from-pink-700 hover:to-purple-700 focus:outline-none focus:ring-4 focus:ring-pink-300 transition-all font-semibold shadow-lg"
            >
              {product ? 'שמור שינויים' : 'הוסף מוצר'}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 focus:outline-none focus:ring-4 focus:ring-gray-300 transition-all font-semibold"
            >
              ביטול
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

