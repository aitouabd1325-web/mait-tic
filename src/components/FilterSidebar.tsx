import { SlidersHorizontal, RotateCcw } from 'lucide-react';

interface FilterSidebarProps {
  brands: string[];
  selectedBrands: string[];
  onBrandsChange: (brands: string[]) => void;
  priceMin: number | null;
  priceMax: number | null;
  onPriceMinChange: (val: number | null) => void;
  onPriceMaxChange: (val: number | null) => void;
  inStockOnly: boolean;
  onInStockChange: (val: boolean) => void;
  sortBy: string;
  onSortChange: (val: string) => void;
  onReset: () => void;
}

export default function FilterSidebar({
  brands,
  selectedBrands,
  onBrandsChange,
  priceMin,
  priceMax,
  onPriceMinChange,
  onPriceMaxChange,
  inStockOnly,
  onInStockChange,
  sortBy,
  onSortChange,
  onReset,
}: FilterSidebarProps) {
  const toggleBrand = (brand: string) => {
    if (selectedBrands.includes(brand)) {
      onBrandsChange(selectedBrands.filter(b => b !== brand));
    } else {
      onBrandsChange([...selectedBrands, brand]);
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
      <div className="flex items-center justify-between mb-5">
        <h3 className="font-bold text-gray-900 flex items-center gap-2">
          <SlidersHorizontal size={18} className="text-emerald-600" />
          Filtres
        </h3>
        <button
          onClick={onReset}
          className="text-xs text-emerald-600 hover:text-emerald-700 flex items-center gap-1 font-medium"
        >
          <RotateCcw size={12} /> Réinitialiser
        </button>
      </div>

      {/* Sort */}
      <div className="mb-6">
        <label className="block text-sm font-semibold text-gray-700 mb-2">Trier par</label>
        <select
          value={sortBy}
          onChange={(e) => onSortChange(e.target.value)}
          className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500"
        >
          <option value="price-asc">Prix croissant</option>
          <option value="price-desc">Prix décroissant</option>
          <option value="rating">Meilleures notes</option>
          <option value="name">Nom (A-Z)</option>
        </select>
      </div>

      {/* Brands */}
      <div className="mb-6">
        <label className="block text-sm font-semibold text-gray-700 mb-2">Marques</label>
        <div className="space-y-2">
          {brands.map(brand => (
            <label key={brand} className="flex items-center gap-2 cursor-pointer group">
              <input
                type="checkbox"
                checked={selectedBrands.includes(brand)}
                onChange={() => toggleBrand(brand)}
                className="w-4 h-4 rounded border-gray-300 text-emerald-600 focus:ring-emerald-500"
              />
              <span className="text-sm text-gray-600 group-hover:text-gray-900 transition">{brand}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Price range */}
      <div className="mb-6">
        <label className="block text-sm font-semibold text-gray-700 mb-2">Prix (MAD)</label>
        <div className="flex gap-2">
          <input
            type="number"
            placeholder="Min"
            value={priceMin ?? ''}
            onChange={(e) => onPriceMinChange(e.target.value ? Number(e.target.value) : null)}
            className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500"
          />
          <span className="self-center text-gray-400">-</span>
          <input
            type="number"
            placeholder="Max"
            value={priceMax ?? ''}
            onChange={(e) => onPriceMaxChange(e.target.value ? Number(e.target.value) : null)}
            className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500"
          />
        </div>
      </div>

      {/* In stock */}
      <div>
        <label className="flex items-center gap-2 cursor-pointer group">
          <input
            type="checkbox"
            checked={inStockOnly}
            onChange={(e) => onInStockChange(e.target.checked)}
            className="w-4 h-4 rounded border-gray-300 text-emerald-600 focus:ring-emerald-500"
          />
          <span className="text-sm text-gray-600 group-hover:text-gray-900 transition">En stock uniquement</span>
        </label>
      </div>
    </div>
  );
}
