import React, { useState } from 'react';
import { Leaf, LogIn, UserPlus } from 'lucide-react';
import { MonthSelector } from './components/MonthSelector';
import { SearchBar } from './components/SearchBar';
import { AuthModal } from './components/AuthModal';
import { CropCard } from './components/CropCard';
import { cropData } from './data/crops';

function App() {
  const [selectedMonth, setSelectedMonth] = useState('january');
  const [searchTerm, setSearchTerm] = useState('');
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');
  const [user, setUser] = useState<{ email: string } | null>(null);

  const monthData = cropData[selectedMonth];

  const handleAuth = (email: string, password: string) => {
    // In a real app, you would handle authentication with a backend service
    setUser({ email });
    setIsAuthModalOpen(false);
  };

  const openAuthModal = (mode: 'login' | 'register') => {
    setAuthMode(mode);
    setIsAuthModalOpen(true);
  };

  const filteredRecommendedCrops = monthData.recommendedCrops.filter(crop =>
    crop.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredAlternatives = monthData.alternatives.filter(crop =>
    crop.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onSubmit={handleAuth}
        mode={authMode}
      />

      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Leaf className="h-8 w-8 text-green-500" />
              <h1 className="text-2xl font-bold text-gray-900">Crop Advisor</h1>
            </div>
            <div className="flex items-center gap-4">
              <SearchBar searchTerm={searchTerm} onSearch={setSearchTerm} />
              <MonthSelector
                selectedMonth={selectedMonth}
                onMonthChange={setSelectedMonth}
              />
              {user ? (
                <span className="text-sm text-gray-600">{user.email}</span>
              ) : (
                <div className="flex gap-2">
                  <button
                    onClick={() => openAuthModal('login')}
                    className="flex items-center gap-1 px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900"
                  >
                    <LogIn className="h-4 w-4" />
                    Login
                  </button>
                  <button
                    onClick={() => openAuthModal('register')}
                    className="flex items-center gap-1 px-4 py-2 text-sm font-medium bg-green-600 text-white rounded-md hover:bg-green-700"
                  >
                    <UserPlus className="h-4 w-4" />
                    Register
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-8">
          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Recommended Crops for {selectedMonth.charAt(0).toUpperCase() + selectedMonth.slice(1)}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredRecommendedCrops.map((crop) => (
                <CropCard key={crop.id} crop={crop} />
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Alternative Options</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredAlternatives.map((crop) => (
                <CropCard key={crop.id} crop={crop} />
              ))}
            </div>
          </section>

          <section className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Market Insights</h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium text-gray-500">Trending Crops</h3>
                <div className="mt-2 flex flex-wrap gap-2">
                  {monthData.customerPreferences.trending.map((crop) => (
                    <span
                      key={crop}
                      className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800"
                    >
                      {crop}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">Market Demand</h3>
                <span className="mt-2 inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                  {monthData.customerPreferences.marketDemand.toUpperCase()}
                </span>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

export default App;