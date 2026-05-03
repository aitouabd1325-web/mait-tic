import { Link } from 'react-router-dom';
import { Code, Database, Globe, Heart, Smartphone, Laptop, Mail } from 'lucide-react';

export default function About() {
  const techStack = [
    { icon: <Globe size={24} />, name: 'Web Scraping', desc: 'Python + BeautifulSoup pour collecter les prix en temps réel' },
    { icon: <Code size={24} />, name: 'Frontend', desc: 'React + TypeScript + Tailwind CSS pour une interface moderne' },
    { icon: <Database size={24} />, name: 'Base de données', desc: 'SQLite pour stocker les historiques de prix' },
    { icon: <Heart size={24} />, name: 'Open Source', desc: 'Projet communautaire et transparent' },
  ];

  const timeline = [
    { date: 'Janvier 2024', event: 'Lancement du projet Mait Tic', emoji: '🚀' },
    { date: 'Mars 2024', event: 'Intégration de 6 boutiques marocaines', emoji: '🏪' },
    { date: 'Juin 2024', event: 'Ajout du suivi des prix historiques', emoji: '📈' },
    { date: 'Septembre 2024', event: 'Lancement du système d\'alertes', emoji: '🔔' },
    { date: 'Décembre 2024', event: '1000+ produits référencés', emoji: '🎉' },
  ];

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="bg-gradient-to-r from-emerald-700 via-teal-600 to-cyan-600 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-black mb-4">À propos de Mait Tic</h1>
          <p className="text-xl text-emerald-100 leading-relaxed max-w-2xl mx-auto">
            Le premier comparateur de prix de smartphones et laptops 100% marocain. 
            Notre mission : vous aider à trouver les meilleures offres au Maroc.
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-12">
        {/* Mission */}
        <section className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            🎯 Notre Mission
          </h2>
          <div className="prose prose-gray max-w-none">
            <p className="text-gray-600 leading-relaxed mb-4">
              Au Maroc, le marché des smartphones et laptops est en pleine expansion. Avec de nombreuses boutiques en ligne 
              proposant des prix variables, il devient difficile pour les consommateurs de trouver la meilleure offre. 
              <strong className="text-gray-900"> Mait Tic</strong> résout ce problème en agrégeant et comparant les prix 
              de tous les principaux revendeurs marocains.
            </p>
            <p className="text-gray-600 leading-relaxed">
              Notre plateforme utilise des techniques de <strong className="text-gray-900">web scraping</strong> pour collecter 
              les prix en temps réel depuis les sites des boutiques partenaires, puis les présente de manière claire et 
              comparative pour vous faire économiser du temps et de l'argent.
            </p>
          </div>
        </section>

        {/* Tech Stack */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            🛠️ Stack Technique
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {techStack.map((tech, i) => (
              <div key={i} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-md hover:border-emerald-200 transition">
                <div className="w-12 h-12 bg-emerald-50 rounded-xl flex items-center justify-center text-emerald-600 mb-3">
                  {tech.icon}
                </div>
                <h3 className="font-bold text-gray-900 mb-1">{tech.name}</h3>
                <p className="text-sm text-gray-500">{tech.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Architecture */}
        <section className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            🏗️ Architecture du Projet
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-3 text-3xl">
                🕷️
              </div>
              <h3 className="font-bold text-gray-900 mb-1">Scraping Engine</h3>
              <p className="text-sm text-gray-500">Python + BeautifulSoup scrape les prix toutes les 6 heures depuis les boutiques partenaires</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-emerald-100 rounded-2xl flex items-center justify-center mx-auto mb-3 text-3xl">
                🗄️
              </div>
              <h3 className="font-bold text-gray-900 mb-1">Base de données</h3>
              <p className="text-sm text-gray-500">SQLite stocke les produits, prix, et historique pour permettre le suivi des évolutions</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-3 text-3xl">
                🖥️
              </div>
              <h3 className="font-bold text-gray-900 mb-1">Interface Web</h3>
              <p className="text-sm text-gray-500">React + Tailwind CSS offre une interface rapide, responsive et facile à utiliser</p>
            </div>
          </div>
        </section>

        {/* Timeline */}
        <section className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            📅 Notre Parcours
          </h2>
          <div className="space-y-4">
            {timeline.map((item, i) => (
              <div key={i} className="flex items-start gap-4">
                <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center text-xl shrink-0">
                  {item.emoji}
                </div>
                <div>
                  <span className="text-sm font-semibold text-emerald-600">{item.date}</span>
                  <p className="text-gray-700">{item.event}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Boutiques */}
        <section className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            🏪 Boutiques Partenaires
          </h2>
          <p className="text-gray-500 mb-4">Nous comparons les prix dans les boutiques suivantes :</p>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {['Jumia Maroc', 'Microchoix', 'Publinet', 'Discount PC', 'Almond Store', 'Luxor Store'].map((store) => (
              <div key={store} className="bg-gray-50 rounded-xl p-4 text-center text-sm font-medium text-gray-700 hover:bg-emerald-50 hover:text-emerald-700 transition cursor-default">
                {store}
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="bg-gradient-to-r from-emerald-700 to-teal-600 rounded-2xl p-8 text-center text-white">
          <h2 className="text-2xl font-bold mb-3">Commencez à comparer maintenant !</h2>
          <p className="text-emerald-100 mb-6">Explorez notre catalogue de smartphones et laptops</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              to="/smartphones"
              className="inline-flex items-center justify-center gap-2 bg-white text-emerald-700 px-6 py-3 rounded-full font-bold hover:bg-emerald-50 transition"
            >
              <Smartphone size={18} /> Smartphones
            </Link>
            <Link
              to="/laptops"
              className="inline-flex items-center justify-center gap-2 bg-white/15 text-white border-2 border-white/30 px-6 py-3 rounded-full font-bold hover:bg-white/25 transition"
            >
              <Laptop size={18} /> Laptops
            </Link>
          </div>
        </section>

        {/* Contact */}
        <div className="mt-8 text-center text-sm text-gray-500">
          <p className="flex items-center justify-center gap-2">
            <Mail size={14} /> contact@maittic.ma
          </p>
          <p className="flex items-center justify-center gap-2 mt-2">
            {/* */}📦 github.com/maittic
          </p>
        </div>
      </div>
    </div>
  );
}
