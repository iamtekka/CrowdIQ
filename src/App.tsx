import React, { useState } from 'react';
import { LocationCard } from './components/LocationCard';
import { EventBanner } from './components/EventBanner';
import { LocationModal } from './components/LocationModal';
import { EventCard } from './components/EventCard';
import { locations, events } from './data';
import { Location } from './types';
import { Search, Sun, Moon } from 'lucide-react';

function App() {
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState<'locations' | 'events'>('locations');
  const [isDarkMode, setIsDarkMode] = useState(false);

  const randomEvent = events[Math.floor(Math.random() * events.length)];

  const filteredLocations = locations.filter(location =>
    location.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSubmitReport = (rating: number, comment: string) => {
    console.log('Report submitted:', { locationId: selectedLocation?.id, rating, comment });
  };

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900' : 'bg-gray-100'}`}>
      <div className="max-w-6xl mx-auto px-4 py-8">
        <header className="mb-8 flex justify-between items-start">
          <div>
            <h1 className={`text-4xl font-bold ${isDarkMode ? 'text-purple-400' : 'text-purple-900'} mb-2`}>CrowdIQ</h1>
            <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Real-time campus location busyness tracker</p>
          </div>
          <button
            onClick={() => setIsDarkMode(!isDarkMode)}
            className={`p-2 rounded-full ${isDarkMode ? 'bg-gray-800 text-yellow-400' : 'bg-white text-gray-800'} shadow-md`}
          >
            {isDarkMode ? <Sun size={24} /> : <Moon size={24} />}
          </button>
        </header>

        <EventBanner event={randomEvent} isDarkMode={isDarkMode} />

        <div className="flex space-x-4 mb-6">
          <button
            onClick={() => setActiveTab('locations')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              activeTab === 'locations'
                ? `${isDarkMode ? 'bg-purple-700 text-white' : 'bg-purple-600 text-white'}`
                : `${isDarkMode ? 'text-gray-400 hover:bg-gray-800' : 'text-gray-600 hover:bg-gray-200'}`
            }`}
          >
            Locations
          </button>
          <button
            onClick={() => setActiveTab('events')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              activeTab === 'events'
                ? `${isDarkMode ? 'bg-purple-700 text-white' : 'bg-purple-600 text-white'}`
                : `${isDarkMode ? 'text-gray-400 hover:bg-gray-800' : 'text-gray-600 hover:bg-gray-200'}`
            }`}
          >
            Events
          </button>
        </div>

        {activeTab === 'locations' && (
          <>
            <div className="relative mb-6">
              <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`} size={20} />
              <input
                type="text"
                placeholder="Search locations..."
                className={`w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 ${
                  isDarkMode 
                    ? 'bg-gray-800 border-gray-700 text-white placeholder-gray-500'
                    : 'bg-white border-gray-300 text-gray-900 placeholder-gray-400'
                }`}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredLocations.map((location) => (
                <LocationCard
                  key={location.id}
                  location={location}
                  onClick={() => setSelectedLocation(location)}
                  isDarkMode={isDarkMode}
                />
              ))}
            </div>
          </>
        )}

        {activeTab === 'events' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {events.map((event) => (
              <EventCard key={event.id} event={event} isDarkMode={isDarkMode} />
            ))}
          </div>
        )}

        {selectedLocation && (
          <LocationModal
            location={selectedLocation}
            onClose={() => setSelectedLocation(null)}
            onSubmitReport={handleSubmitReport}
            isDarkMode={isDarkMode}
          />
        )}
      </div>
    </div>
  );
}

export default App;