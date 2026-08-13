"use client";

import Link from 'next/link';
import { Home, Construction, ArrowLeft, MapPin } from 'lucide-react';

const NotFound = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Header similar to your site */}
      <nav className="flex items-center justify-between px-6 lg:px-16 py-4 border-b border-gray-100">
        <div className="flex items-center space-x-2">
          <div className="flex space-x-1">
            <div className="w-2 h-6 bg-black"></div>
            <div className="w-2 h-6 bg-black"></div>
            <div className="w-2 h-6 bg-black"></div>
          </div>
          <span className="text-xl font-bold text-black ml-2">Elit Project</span>
        </div>
      </nav>

      {/* Main Content */}
      <div className="flex flex-col lg:flex-row min-h-[calc(100vh-80px)]">
        {/* Left Side - Text Content */}
        <div className="flex-1 flex items-center justify-center px-6 lg:px-16 py-12">
          <div className="max-w-2xl">
            <div className="mb-8">
              <h1 className="text-5xl lg:text-7xl font-bold text-black mb-6 leading-tight">
                Stranica nije
                <br />
                <span className="text-gray-400">pronađena</span>
              </h1>

              <div className="space-y-4 text-gray-600 text-lg leading-relaxed">
                <p>
                  Tražena stranica trenutno nije dostupna. Možda je uklonjena,
                  preimenovana ili je privremeno nedostupna.
                </p>
                <p>
                  Pregledajte naše planirane projekte koji spajaju suvremenu
                  arhitekturu, kvalitetne materijale i vrhunsku lokaciju.
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/"
                className="inline-flex items-center justify-center px-8 py-4 bg-black text-white font-semibold rounded-none transition-all duration-300 hover:bg-gray-800 no-underline"
              >
                <Home className="w-5 h-5 mr-3" />
                Povratak na početnu
              </Link>

              <button
                onClick={() => window.history.back()}
                className="inline-flex items-center justify-center px-8 py-4 border-2 border-black text-black font-semibold rounded-none transition-all duration-300 hover:bg-black hover:text-white"
              >
                <ArrowLeft className="w-5 h-5 mr-3" />
                Nazad
              </button>
            </div>

            {/* Error Code */}
            <div className="mt-12 flex items-center space-x-4">
              <span className="text-6xl font-light text-gray-300">404</span>
              <div className="h-16 w-px bg-gray-200"></div>
              <div>
                <p className="text-sm text-gray-500 uppercase tracking-wider">Greška</p>
                <p className="text-lg text-black">Stranica nije pronađena</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Visual Content */}
        <div className="flex-1 bg-gray-50 flex items-center justify-center px-6 lg:px-16 py-12">
          <div className="max-w-md text-center">
            {/* Architectural Icon Illustration */}
            <div className="relative mb-8">
              <div className="w-48 h-48 mx-auto bg-white rounded-lg shadow-lg flex items-center justify-center relative overflow-hidden">
                {/* Building outline */}
                <div className="absolute inset-4 border-2 border-gray-200">
                  <div className="grid grid-cols-3 grid-rows-4 h-full gap-1">
                    {Array.from({ length: 12 }).map((_, i) => (
                      <div
                        key={i}
                        className={`border border-gray-100 ${
                          [2, 5, 8, 11].includes(i) ? 'bg-yellow-100' : 'bg-gray-50'
                        }`}
                      ></div>
                    ))}
                  </div>
                </div>

                {/* Floating construction elements */}
                <Construction
                  className="absolute top-2 right-2 text-gray-400 w-6 h-6 animate-pulse"
                />
                <MapPin
                  className="absolute bottom-2 left-2 text-gray-400 w-5 h-5 animate-pulse"
                  style={{ animationDelay: '0.5s' }}
                />
              </div>
            </div>

            {/* Brand Message */}
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-black">
                Gradimo domove s vizijom
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Svaki projekt razvijamo s posebnom pažnjom kako bismo vam
                osigurali nekretninu koja traje.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
