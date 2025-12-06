export default function Loading() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-purple-50 flex items-center justify-center" dir="rtl">
      <div className="text-center">
        {/* Animated logo/spinner */}
        <div className="relative inline-block">
          <div className="w-20 h-20 sm:w-24 sm:h-24 border-4 border-pink-200 border-t-pink-600 rounded-full animate-spin"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-3xl">🍪</span>
          </div>
        </div>
        
        {/* Loading text */}
        <p className="mt-6 text-xl font-semibold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent animate-pulse">
          טוען...
        </p>
        
        <p className="mt-2 text-gray-600">
          מכינים את המוצרים הטובים ביותר בשבילך
        </p>
      </div>
    </div>
  );
}

