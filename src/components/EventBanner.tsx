import React from 'react';
import { Event } from '../types';
import { Calendar } from 'lucide-react';

interface EventBannerProps {
  event: Event;
  isDarkMode: boolean;
}

export function EventBanner({ event, isDarkMode }: EventBannerProps) {
  return (
    <div className={`${isDarkMode ? 'bg-purple-800' : 'bg-purple-900'} text-white p-4 rounded-lg shadow-md mb-6`}>
      <div className="flex items-center">
        <Calendar className="mr-2" size={24} />
        <div>
          <h2 className="font-semibold text-lg">{event.title}</h2>
          <p className={`${isDarkMode ? 'text-purple-300' : 'text-purple-200'}`}>{event.description}</p>
          <p className={`${isDarkMode ? 'text-purple-400' : 'text-purple-300'} text-xs mt-1`}>Location: {event.location}</p>
        </div>
      </div>
    </div>
  );
}