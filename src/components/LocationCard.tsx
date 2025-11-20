import React from 'react';
import { Star, Clock, AlertCircle } from 'lucide-react';
import { Location } from '../types';
import { isLocationOpen } from '../utils';

interface LocationCardProps {
  location: Location;
  onClick: () => void;
  isDarkMode: boolean;
}

export function LocationCard({ location, onClick, isDarkMode }: LocationCardProps) {
  const getBusynessColor = (level: number) => {
    if (!isLocationOpen(location)) return 'bg-gray-500';
    const colors = {
      1: 'bg-green-500',
      2: 'bg-lime-500',
      3: 'bg-yellow-500',
      4: 'bg-orange-500',
      5: 'bg-red-500',
    };
    return colors[level as keyof typeof colors] || 'bg-gray-500';
  };

  const getCurrentDayHours = (hoursString: string): string => {
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const currentDay = days[new Date().getDay()];
    
    if (location.id === 'dining-hall') {
      const lines = hoursString.split('\n');
      for (const line of lines) {
        if (line.includes(currentDay)) {
          return line.split(': ')[1];
        }
        if (line.includes('Mon-Thu') && currentDay.match(/^(Mon|Tue|Wed|Thu)$/)) {
          return line.split(': ')[1];
        }
      }
    }
    
    return hoursString;
  };

  return (
    <div
      onClick={onClick}
      className={`rounded-lg shadow-md p-4 cursor-pointer hover:shadow-lg transition-shadow ${
        isDarkMode ? 'bg-gray-800' : 'bg-white'
      }`}
    >
      <div className="flex justify-between items-start mb-2">
        <h3 className={`text-lg font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
          {location.name}
        </h3>
        <div className={`${getBusynessColor(isLocationOpen(location) ? location.currentBusyness : 0)} text-white px-2 py-1 rounded-full text-sm flex items-center`}>
          <Star size={16} className="mr-1" />
          {isLocationOpen(location) ? location.currentBusyness : 0}
        </div>
      </div>
      <p className={`text-sm mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
        {location.description}
      </p>
      <div className={`flex items-center text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
        <Clock size={16} className="mr-1" />
        {getCurrentDayHours(location.hours)}
      </div>
      {location.deals && location.deals.length > 0 && (
        <div className={`mt-2 flex items-center text-sm ${isDarkMode ? 'text-purple-400' : 'text-purple-600'}`}>
          <AlertCircle size={16} className="mr-1" />
          {location.deals[0]}
        </div>
      )}
    </div>
  );
}