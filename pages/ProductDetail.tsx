import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Star, ExternalLink, TrendingDown, CheckCircle, XCircle, Clock, Smartphone, Laptop } from 'lucide-react';
import { allProducts, formatPrice, getLowestPrice, getHighestPrice, getSavings, getStoreById } from '../data/products';

export default function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const product = allProducts.find(p => p.id === id);

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <span className="text-6xl block mb-4">😕</span>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Produit non trouvé</h2>
          <p className="text-gray-500 mb-6">Ce produit n'existe pas ou a été retiré.</p>
          <Link to="/" className="text-emerald-600 font-medium hover:underline flex items-center gap-1 justify-center">
            <ArrowLeft size={16} /> Retour à l'accueil
          </Link>
        </div>
      </div>
    );
  }

  const lowestPrice = getLowestPrice(product);
  const highestPrice = getHighestPrice(product);
  const savings = getSavings(product);

  const sortedPrices = [...product.prices].sort((a, b) => {
    if (a.inStock && !b.inStock) return -1;
    if (!a.inStock && b.inStock) return 1;
    return a.price - b.price;
  });

  const stars = [];
  for (let i = 1; i <= 5; i++) {
    if (i <= Math.floor(product.rating)) {
      stars.push(<Star key={i} size={18} className="fill-amber-400 text-amber-400" />);
    } else if (i - 0.5 <= product.rating) {
      stars.push(<Star key={i} size={18} className="fill-amber-400/50 text-amber-400" />);
    } else {
      stars.push(<Star key={i} size={18} className="text-gray-300" />);
    }
  }

  const categoryPath = product.category === 'smartphone' ? '/smartphones' : '/laptops';
  const categoryLabel = product.category === 'smartphone' ? 'Smartphones' : 'Laptops';
  const CategoryIcon = product.category === 'smartphone' ? Smartphone : Laptop;

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <Link to="/" className="hover:text-emerald-600 transition">Accueil</Link>
            <span>/</span>
            <Link to={categoryPath} className="hover:text-emerald-600 transition flex items-center gap-1">
              <CategoryIcon size={14} />
              {categoryLabel}
            </Link>
            <span>/</span>
            <span className="text-gray-900 font-medium truncate">{product.name}</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Back button */}
        <Link to={categoryPath} className="inline-flex items-center gap-1 text-emerald-600 font-medium mb-6 hover:gap-2 transition-all text-sm">
          <ArrowLeft size={16} /> Retour aux {categoryLabel.toLowerCase()}
        </Link>

        {/* Product header */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden mb-8">
          <div className="grid grid-cols-1 md:grid-cols-[300px_1fr] lg:grid-cols-[350px_1fr]">
            {/* Image */}
            <div className="bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-10 md:p-12">
              <span className="text-[120px] md:text-[140px]">{product.image}</span>
            </div>

            {/* Info */}
            <div className="p-6 md:p-8">
              <div className="flex items-center gap-2 mb-2">
                <span className="bg-emerald-100 text-emerald-700 text-xs font-bold px-2.5 py-1 rounded-full">{product.brand}</span>
                <span className="bg-gray-100 text-gray-600 text-xs font-medium px-2.5 py-1 rounded-full">{categoryLabel}</span>
              </div>
              
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">{product.name}</h1>

              {/* Rating */}
              <div className="flex items-center gap-2 mb-4">
                <div className="flex">{stars}</div>
                <span className="text-sm font-semibold text-gray-900">{product.rating}</span>
                <span className="text-sm text-gray-500">({product.numReviews} avis)</span>
              </div>

              <p className="text-gray-600 leading-relaxed mb-6">{product.description}</p>

              {/* Price summary */}
              <div className="bg-gradient-to-r from-emerald-50 to-teal-50 rounded-xl p-5 border border-emerald-100">
                <div className="flex flex-wrap items-end gap-6">
                  <div>
                    <span className="text-xs text-emerald-600 font-medium block mb-0.5">Meilleur prix</span>
                    <span className="text-3xl font-black text-emerald-700">{formatPrice(lowestPrice)}</span>
                  </div>
                  {savings > 0 && (
                    <div className="flex items-center gap-1 bg-red-100 text-red-600 px-3 py-1.5 rounded-lg">
                      <TrendingDown size={16} />
                      <span className="text-sm font-bold">Économisez {formatPrice(savings)}</span>
                    </div>
                  )}
                  <div className="text-sm text-gray-500">
                    <span className="font-medium text-gray-700">{product.prices.filter(p => p.inStock).length}</span> offres disponibles
                  </div>
                </div>
                {highestPrice > lowestPrice && (
                  <div className="mt-2 text-xs text-gray-500">
                    Prix le plus élevé: <span className="font-medium">{formatPrice(highestPrice)}</span> — soit un écart de <span className="font-bold text-red-500">{Math.round(((highestPrice - lowestPrice) / highestPrice) * 100)}%</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-8">
          {/* Price comparison table */}
          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              📊 Comparaison des prix
            </h2>
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              {/* Table header */}
              <div className="hidden sm:grid grid-cols-[40px_1fr_120px_100px_100px] gap-4 px-6 py-3 bg-gray-50 border-b border-gray-100 text-xs font-semibold text-gray-500 uppercase tracking-wide">
                <span></span>
                <span>Boutique</span>
                <span>Prix</span>
                <span>Stock</span>
                <span></span>
              </div>

              {sortedPrices.map((priceEntry) => {
                const store = getStoreById(priceEntry.storeId);
                if (!store) return null;
                const isBest = priceEntry.price === lowestPrice && priceEntry.inStock;

                return (
                  <div
                    key={priceEntry.storeId}
                    className={`grid grid-cols-1 sm:grid-cols-[40px_1fr_120px_100px_100px] gap-2 sm:gap-4 px-6 py-4 items-center border-b border-gray-50 last:border-0 hover:bg-gray-50/50 transition ${
                      isBest ? 'bg-emerald-50/50 ring-1 ring-emerald-200' : ''
                    }`}
                  >
                    {/* Store logo */}
                    <div className="hidden sm:flex items-center justify-center text-2xl">
                      {store.logo}
                    </div>

                    {/* Store name */}
                    <div className="flex items-center gap-2">
                      <span className="sm:hidden text-xl">{store.logo}</span>
                      <div>
                        <span className="font-semibold text-gray-900 text-sm">{store.name}</span>
                        {isBest && (
                          <span className="ml-2 bg-emerald-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                            MEILLEUR PRIX
                          </span>
                        )}
                        {priceEntry.originalPrice && (
                          <span className="ml-1 text-xs text-gray-400 line-through">{formatPrice(priceEntry.originalPrice)}</span>
                        )}
                      </div>
                    </div>

                    {/* Price */}
                    <div>
                      <span className={`text-lg font-bold ${isBest ? 'text-emerald-700' : 'text-gray-900'}`}>
                        {formatPrice(priceEntry.price)}
                      </span>
                    </div>

                    {/* Stock */}
                    <div>
                      {priceEntry.inStock ? (
                        <span className="inline-flex items-center gap-1 text-xs font-medium text-emerald-600">
                          <CheckCircle size={14} /> En stock
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-xs font-medium text-red-500">
                          <XCircle size={14} /> Rupture
                        </span>
                      )}
                    </div>

                    {/* CTA */}
                    <div className="flex items-center gap-2">
                      <a
                        href={priceEntry.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`inline-flex items-center justify-center gap-1 px-4 py-2 rounded-lg text-sm font-semibold transition ${
                          isBest
                            ? 'bg-emerald-600 text-white hover:bg-emerald-700 shadow-sm'
                            : priceEntry.inStock
                            ? 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                            : 'bg-gray-50 text-gray-400 cursor-not-allowed'
                        }`}
                      >
                        {priceEntry.inStock ? (
                          <>
                            Voir <ExternalLink size={12} />
                          </>
                        ) : (
                          'Indisponible'
                        )}
                      </a>
                    </div>

                    {/* Last updated - mobile */}
                    <div className="sm:hidden flex items-center gap-1 text-xs text-gray-400 mt-1">
                      <Clock size={10} /> Mis à jour le {priceEntry.lastUpdated}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Specs sidebar */}
          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              📋 Spécifications
            </h2>
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                    {Object.entries(product.specs).map(([key, value], idx) => (
                <div
                  key={key}
                  className={`flex justify-between items-start px-5 py-3.5 ${
                    idx % 2 === 0 ? 'bg-gray-50/50' : 'bg-white'
                  }`}
                >
                  <span className="text-sm font-medium text-gray-500 shrink-0 pr-4">{key}</span>
                  <span className="text-sm text-gray-900 text-right">{value}</span>
                </div>
              ))}
            </div>

            {/* Price alert box */}
            <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl p-5 mt-6 border border-amber-200">
              <h3 className="font-bold text-gray-900 mb-2 flex items-center gap-2">
                🔔 Alerte prix
              </h3>
              <p className="text-sm text-gray-600 mb-4">
                Soyez notifié quand le prix de ce produit baisse.
              </p>
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="votre@email.ma"
                  className="flex-1 px-3 py-2 rounded-lg border border-amber-200 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400/30"
                />
                <button className="bg-amber-500 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-amber-600 transition">
                  Activer
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
