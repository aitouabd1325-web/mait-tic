import { useState, useMemo } from 'react';
import { Laptop as LaptopIcon, SlidersHorizontal } from 'lucide-react';
import { laptops as allLaptops, formatPrice, getLowestPrice } from '../data/products';
import ProductCard from '../components/ProductCard';
import FilterSidebar from '../components/FilterSidebar';

export default function Laptops() {
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [priceMin, setPriceMin] = useState<number | null>(null);
  const [priceMax, setPriceMax] = useState<number | null>(null);
  const [inStockOnly, setInStockOnly] = useState(false);
  const [sortBy, setSortBy] = useState('price-asc');
  const [showFilters, setShowFilters] = useState(false);

  const brands = useMemo(() => [...new Set(allLaptops.map(p => p.brand))].sort(), []);

  const filtered = useMemo(() => {
    let result = [...allLaptops];

    if (selectedBrands.length > 0) {
      result = result.filter(p => selectedBrands.includes(p.brand));
    }

    if (priceMin !== null) {
      result = result.filter(p => getLowestPrice(p) >= priceMin);
    }

    if (priceMax !== null) {
      result = result.filter(p => getLowestPrice(p) <= priceMax);
    }

    if (inStockOnly) {
      result = result.filter(p => p.prices.some(pr => pr.inStock));
    }

    switch (sortBy) {
      case 'price-asc':
        result.sort((a, b) => getLowestPrice(a) - getLowestPrice(b));
        break;
      case 'price-desc':
        result.sort((a, b) => getLowestPrice(b) - getLowestPrice(a));
        break;
      case 'rating':
        result.sort((a, b) => b.rating - a.rating);
        break;
      case 'name':
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
    }

    return result;
  }, [selectedBrands, priceMin, priceMax, inStockOnly, sortBy]);

  const priceRange = useMemo(() => {
    const prices = allLaptops.map(p => getLowestPrice(p));
    return { min: Math.min(...prices), max: Math.max(...prices) };
  }, []);

  const resetFilters = () => {
    setSelectedBrands([]);
    setPriceMin(null);
    setPriceMax(null);
    setInStockOnly(false);
    setSortBy('price-asc');
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="bg-gradient-to-r from-teal-700 to-emerald-600 text-white py-10">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center gap-3 mb-2">
            <LaptopIcon size={28} />
            <h1 className="text-3xl font-bold">Laptops</h1>
          </div>
          <p className="text-emerald-100">
            Comparez les prix de {allLaptops.length} laptops dans 6 boutiques marocaines
          </p>
          <div className="flex items-center gap-4 mt-4 text-sm">
            <span className="bg-white/15 px-3 py-1 rounded-full">Prix: {formatPrice(priceRange.min)} - {formatPrice(priceRange.max)}</span>
            <span className="bg-white/15 px-3 py-1 rounded-full">{brands.length} marques</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex gap-8">
          {/* Sidebar - desktop */}
          <div className="hidden lg:block w-72 shrink-0">
            <FilterSidebar
              brands={brands}
              selectedBrands={selectedBrands}
              onBrandsChange={setSelectedBrands}
              priceMin={priceMin}
              priceMax={priceMax}
              onPriceMinChange={setPriceMin}
              onPriceMaxChange={setPriceMax}
              inStockOnly={inStockOnly}
              onInStockChange={setInStockOnly}
              sortBy={sortBy}
              onSortChange={setSortBy}
              onReset={resetFilters}
            />
          </div>

          {/* Main content */}
          <div className="flex-1">
            {/* Mobile filter toggle */}
            <div className="lg:hidden mb-4">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-2 bg-white px-4 py-2.5 rounded-xl border border-gray-200 shadow-sm text-sm font-medium text-gray-700"
              >
                <SlidersHorizontal size={16} />
                Filtres {filtered.length !== allLaptops.length && `(${filtered.length}/${allLaptops.length})`}
              </button>
              {showFilters && (
                <div className="mt-4">
                  <FilterSidebar
                    brands={brands}
                    selectedBrands={selectedBrands}
                    onBrandsChange={setSelectedBrands}
                    priceMin={priceMin}
                    priceMax={priceMax}
                    onPriceMinChange={setPriceMin}
                    onPriceMaxChange={setPriceMax}
                    inStockOnly={inStockOnly}
                    onInStockChange={setInStockOnly}
                    sortBy={sortBy}
                    onSortChange={setSortBy}
                    onReset={resetFilters}
                  />
                </div>
              )}
            </div>

            {/* Results count */}
            <div className="flex items-center justify-between mb-6">
              <p className="text-sm text-gray-500">
                <span className="font-semibold text-gray-900">{filtered.length}</span> laptops trouvés
              </p>
              <div className="hidden lg:block">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-3 py-2 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/30"
                >
                  <option value="price-asc">Prix croissant</option>
                  <option value="price-desc">Prix décroissant</option>
                  <option value="rating">Meilleures notes</option>
                  <option value="name">Nom (A-Z)</option>
                </select>
              </div>
            </div>

            {/* Grid */}
            {filtered.length === 0 ? (
              <div className="bg-white rounded-2xl p-12 text-center">
                <span className="text-6xl mb-4 block">🔍</span>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Aucun laptop trouvé</h3>
                <p className="text-gray-500 mb-4">Essayez de modifier vos critères de recherche</p>
                <button onClick={resetFilters} className="text-emerald-600 font-medium hover:underline">
                  Réinitialiser les filtres
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {filtered.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
