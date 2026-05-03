import { Link } from 'react-router-dom';
import { Star, TrendingDown, ArrowRight } from 'lucide-react';
import { Product } from '../types';
import { formatPrice, getLowestPrice, getSavings, getStoreById } from '../data/products';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const lowestPrice = getLowestPrice(product);
  const savings = getSavings(product);
  const bestStore = product.prices.find(p => p.price === lowestPrice && p.inStock);
  const store = bestStore ? getStoreById(bestStore.storeId) : null;

  const stars = [];
  for (let i = 1; i <= 5; i++) {
    if (i <= Math.floor(product.rating)) {
      stars.push(<Star key={i} size={14} className="fill-amber-400 text-amber-400" />);
    } else if (i - 0.5 <= product.rating) {
      stars.push(<Star key={i} size={14} className="fill-amber-400/50 text-amber-400" />);
    } else {
      stars.push(<Star key={i} size={14} className="text-gray-300" />);
    }
  }

  return (
    <Link
      to={`/${product.category}/${product.id}`}
      className="group bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl hover:border-emerald-200 transition-all duration-300 overflow-hidden flex flex-col"
    >
      {/* Image area */}
      <div className="relative bg-gradient-to-br from-gray-50 to-gray-100 p-6 flex items-center justify-center h-44">
        <span className="text-7xl group-hover:scale-110 transition-transform duration-300">{product.image}</span>
        
        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1">
          {savings > 0 && (
            <span className="inline-flex items-center gap-1 bg-red-500 text-white text-[11px] font-bold px-2 py-0.5 rounded-full">
              <TrendingDown size={12} />
              -{formatPrice(savings)}
            </span>
          )}
          {bestStore?.originalPrice && (
            <span className="bg-emerald-500 text-white text-[11px] font-bold px-2 py-0.5 rounded-full">
              PROMO
            </span>
          )}
        </div>

        <span className="absolute top-3 right-3 bg-white/90 text-gray-600 text-xs font-medium px-2 py-1 rounded-full">
          {product.prices.filter(p => p.inStock).length} offres
        </span>
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col flex-1">
        <span className="text-xs font-semibold text-emerald-600 uppercase tracking-wide">{product.brand}</span>
        <h3 className="font-semibold text-gray-900 mt-1 line-clamp-2 group-hover:text-emerald-700 transition-colors">
          {product.name}
        </h3>
        
        {/* Rating */}
        <div className="flex items-center gap-1 mt-2">
          <div className="flex">{stars}</div>
          <span className="text-xs text-gray-500">({product.numReviews})</span>
        </div>

        {/* Specs preview */}
        <div className="mt-3 flex flex-wrap gap-1">
          {Object.entries(product.specs).slice(0, 2).map(([key, val]) => (
            <span key={key} className="text-[11px] bg-gray-100 text-gray-600 px-2 py-0.5 rounded-md">
              {val.length > 20 ? val.substring(0, 20) + '…' : val}
            </span>
          ))}
        </div>

        {/* Price section */}
        <div className="mt-auto pt-4 border-t border-gray-50">
          <div className="flex items-end justify-between">
            <div>
              <span className="text-xs text-gray-500">À partir de</span>
              <div className="text-xl font-bold text-emerald-700">{formatPrice(lowestPrice)}</div>
              {store && (
                <span className="text-[11px] text-gray-500 flex items-center gap-1">
                  {store.logo} {store.name}
                </span>
              )}
            </div>
            <span className="flex items-center gap-1 text-emerald-600 text-sm font-medium group-hover:gap-2 transition-all">
              Comparer <ArrowRight size={14} />
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
