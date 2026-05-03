import { Link } from 'react-router-dom';
import { Smartphone, Laptop, ArrowRight, TrendingDown, Shield, Zap, BarChart3, Star, ChevronRight } from 'lucide-react';
import { smartphones, laptops, formatPrice, getSavings } from '../data/products';
import ProductCard from '../components/ProductCard';

export default function Home() {
  // Get top deals (highest savings)
  const allProducts = [...smartphones, ...laptops];
  const topDeals = [...allProducts]
    .sort((a, b) => getSavings(b) - getSavings(a))
    .slice(0, 4);

  // Get best rated
  const bestRated = [...allProducts]
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 4);

  const features = [
    {
      icon: <TrendingDown size={24} />,
      title: 'Meilleurs Prix',
      desc: 'Comparez les prix de +6 boutiques marocaines en un clic',
    },
    {
      icon: <Shield size={24} />,
      title: 'Données Fiables',
      desc: 'Prix mis à jour quotidiennement depuis les sources officielles',
    },
    {
      icon: <Zap size={24} />,
      title: 'Alertes Rapides',
      desc: 'Soyez notifié quand le prix de votre produit baisse',
    },
    {
      icon: <BarChart3 size={24} />,
      title: 'Historique Prix',
      desc: 'Suivez l\'évolution des prix dans le temps',
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-emerald-700 via-emerald-600 to-teal-500 overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 text-9xl">📱</div>
          <div className="absolute bottom-10 right-10 text-9xl">💻</div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[200px] opacity-20">🇲🇦</div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 py-20 md:py-28">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-white/15 text-white px-4 py-1.5 rounded-full text-sm font-medium mb-6 backdrop-blur-sm">
              <Star size={14} className="fill-amber-400 text-amber-400" />
              Le comparateur #1 au Maroc
            </div>
            <h1 className="text-4xl md:text-6xl font-black text-white mb-6 leading-tight">
              Trouvez le <span className="text-amber-300">meilleur prix</span> pour votre prochain appareil
            </h1>
            <p className="text-lg md:text-xl text-emerald-100 mb-10 leading-relaxed">
              Comparez les prix des smartphones et laptops dans les plus grandes boutiques du Maroc. 
              Économisez jusqu'à <strong className="text-white">{formatPrice(3000)}</strong> sur vos achats high-tech.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/smartphones"
                className="inline-flex items-center justify-center gap-2 bg-white text-emerald-700 px-8 py-3.5 rounded-full font-bold text-lg hover:bg-emerald-50 transition shadow-xl hover:shadow-2xl"
              >
                <Smartphone size={20} />
                Smartphones
              </Link>
              <Link
                to="/laptops"
                className="inline-flex items-center justify-center gap-2 bg-emerald-800/50 text-white border-2 border-white/30 px-8 py-3.5 rounded-full font-bold text-lg hover:bg-emerald-800/70 transition backdrop-blur-sm"
              >
                <Laptop size={20} />
                Laptops
              </Link>
            </div>
          </div>
        </div>

        {/* Wave bottom */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 100V60C240 20 480 0 720 20C960 40 1200 80 1440 60V100H0Z" fill="#f9fafb" />
          </svg>
        </div>
      </section>

      {/* Stats bar */}
      <section className="bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 -mt-2">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { num: `${smartphones.length + laptops.length}+`, label: 'Produits suivis' },
              { num: '6', label: 'Boutiques comparées' },
              { num: '100%', label: 'Gratuit' },
              { num: 'Maroc 🇲🇦', label: 'Prix en MAD' },
            ].map((stat, i) => (
              <div key={i} className="bg-white rounded-xl p-4 text-center shadow-sm border border-gray-100">
                <div className="text-2xl font-black text-emerald-700">{stat.num}</div>
                <div className="text-sm text-gray-500">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-gray-900 mb-3">Pourquoi choisir Mait Tic ?</h2>
            <p className="text-gray-500 max-w-2xl mx-auto">La plateforme de référence pour comparer les prix au Maroc</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feat, i) => (
              <div key={i} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md hover:border-emerald-200 transition">
                <div className="w-12 h-12 bg-emerald-50 rounded-xl flex items-center justify-center text-emerald-600 mb-4">
                  {feat.icon}
                </div>
                <h3 className="font-bold text-gray-900 mb-2">{feat.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{feat.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Top Deals */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold text-gray-900">🔥 Meilleures offres</h2>
              <p className="text-gray-500 mt-1">Les plus grandes économies du moment</p>
            </div>
            <Link to="/smartphones" className="hidden sm:flex items-center gap-1 text-emerald-600 font-medium hover:gap-2 transition-all">
              Voir tout <ChevronRight size={16} />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {topDeals.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Best Rated */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold text-gray-900">⭐ Les mieux notés</h2>
              <p className="text-gray-500 mt-1">Les produits préférés des Marocains</p>
            </div>
            <Link to="/laptops" className="hidden sm:flex items-center gap-1 text-emerald-600 font-medium hover:gap-2 transition-all">
              Voir tout <ChevronRight size={16} />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {bestRated.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-emerald-700 to-teal-600 py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Prêt à économiser ?
          </h2>
          <p className="text-emerald-100 text-lg mb-8">
            Rejoignez des milliers de Marocains qui comparent les prix avant d'acheter.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/smartphones"
              className="inline-flex items-center justify-center gap-2 bg-white text-emerald-700 px-8 py-3.5 rounded-full font-bold text-lg hover:bg-emerald-50 transition"
            >
              Voir les Smartphones <ArrowRight size={20} />
            </Link>
            <Link
              to="/laptops"
              className="inline-flex items-center justify-center gap-2 bg-white/10 text-white border-2 border-white/30 px-8 py-3.5 rounded-full font-bold text-lg hover:bg-white/20 transition"
            >
              Voir les Laptops <ArrowRight size={20} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
