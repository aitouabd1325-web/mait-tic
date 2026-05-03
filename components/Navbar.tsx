import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Search, Menu, X, Smartphone, Laptop } from 'lucide-react';

interface NavbarProps {
  onSearch?: (query: string) => void;
  searchQuery?: string;
}

export default function Navbar({ onSearch, searchQuery = '' }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [localSearch, setLocalSearch] = useState(searchQuery);
  const location = useLocation();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSearch) onSearch(localSearch);
  };

  const isActive = (path: string) => location.pathname === path;

  const navLinks = [
    { path: '/', label: 'Accueil' },
    { path: '/smartphones', label: 'Smartphones', icon: <Smartphone size={16} /> },
    { path: '/laptops', label: 'Laptops', icon: <Laptop size={16} /> },
    { path: '/about', label: 'À propos' },
  ];

  return (
    <nav className="bg-gradient-to-r from-emerald-700 via-emerald-600 to-teal-600 text-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4">
        {/* Top row */}
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 shrink-0">
            <div className="bg-white text-emerald-700 font-black text-xl rounded-lg w-10 h-10 flex items-center justify-center shadow-md">
              MT
            </div>
            <div className="hidden sm:block">
              <span className="font-bold text-xl tracking-tight">Mait Tic</span>
              <span className="block text-[10px] text-emerald-200 -mt-1">Comparateur de prix Maroc</span>
            </div>
          </Link>

          {/* Search bar - desktop */}
          <form onSubmit={handleSearch} className="hidden md:flex flex-1 max-w-lg mx-8">
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Rechercher un produit..."
                value={localSearch}
                onChange={(e) => {
                  setLocalSearch(e.target.value);
                  if (onSearch) onSearch(e.target.value);
                }}
                className="w-full pl-10 pr-4 py-2 rounded-full bg-white/15 border border-white/25 text-white placeholder:text-emerald-200 focus:outline-none focus:ring-2 focus:ring-white/40 focus:bg-white/20 transition"
              />
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-emerald-200" size={18} />
            </div>
          </form>

          {/* Desktop nav links */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map(link => (
              <Link
                key={link.path}
                to={link.path}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition ${
                  isActive(link.path)
                    ? 'bg-white/20 text-white'
                    : 'text-emerald-100 hover:bg-white/10 hover:text-white'
                }`}
              >
                {link.icon}{link.label}
              </Link>
            ))}
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-white/10"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden pb-4 border-t border-white/20 mt-2 pt-4">
            <form onSubmit={handleSearch} className="mb-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Rechercher..."
                  value={localSearch}
                  onChange={(e) => {
                    setLocalSearch(e.target.value);
                    if (onSearch) onSearch(e.target.value);
                  }}
                  className="w-full pl-10 pr-4 py-2 rounded-full bg-white/15 border border-white/25 text-white placeholder:text-emerald-200 focus:outline-none focus:ring-2 focus:ring-white/40"
                />
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-emerald-200" size={18} />
              </div>
            </form>
            {navLinks.map(link => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center gap-2 px-4 py-3 rounded-lg text-sm font-medium transition ${
                  isActive(link.path)
                    ? 'bg-white/20 text-white'
                    : 'text-emerald-100 hover:bg-white/10'
                }`}
              >
                {link.icon}{link.label}
              </Link>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
}
