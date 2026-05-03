import { Link } from 'react-router-dom';
import { Mail, MapPin, Phone } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="bg-emerald-600 text-white font-black text-xl rounded-lg w-10 h-10 flex items-center justify-center">
                MT
              </div>
              <div>
                <span className="font-bold text-xl text-white">Mait Tic</span>
                <span className="block text-xs text-gray-500 -mt-0.5">Comparateur de prix Maroc</span>
              </div>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed">
              Comparez les prix des smartphones et laptops au Maroc en un seul clic. 
              Trouvez les meilleures offres des boutiques marocaines.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="text-white font-semibold mb-4">Navigation</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/" className="hover:text-emerald-400 transition">Accueil</Link></li>
              <li><Link to="/smartphones" className="hover:text-emerald-400 transition">Smartphones</Link></li>
              <li><Link to="/laptops" className="hover:text-emerald-400 transition">Laptops</Link></li>
              <li><Link to="/about" className="hover:text-emerald-400 transition">À propos</Link></li>
            </ul>
          </div>

          {/* Boutiques */}
          <div>
            <h3 className="text-white font-semibold mb-4">Boutiques partenaires</h3>
            <ul className="space-y-2 text-sm">
              <li className="text-gray-400">Jumia Maroc</li>
              <li className="text-gray-400">Microchoix</li>
              <li className="text-gray-400">Publinet</li>
              <li className="text-gray-400">Discount PC</li>
              <li className="text-gray-400">Almond Store</li>
              <li className="text-gray-400">Luxor Store</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-semibold mb-4">Contact</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-2">
                <Mail size={16} className="text-emerald-500 shrink-0" />
                <span>contact@maittic.ma</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone size={16} className="text-emerald-500 shrink-0" />
                <span>+212 5XX-XXXXXX</span>
              </li>
              <li className="flex items-start gap-2">
                <MapPin size={16} className="text-emerald-500 shrink-0 mt-0.5" />
                <span>Casablanca, Maroc</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-10 pt-6 flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-gray-500">
          <p>© 2024 Mait Tic. Tous droits réservés.</p>
          <p className="flex items-center gap-1">
            Fait avec <span className="text-red-500">❤️</span> au Maroc 🇲🇦
          </p>
        </div>
      </div>
    </footer>
  );
}
