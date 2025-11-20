import React from 'react';
import { Calendar, MapPin } from 'lucide-react';
import { Event } from '../types';

interface EventCardProps {
  event: Event;
  isDarkMode: boolean;
}

export function EventCard({ event, isDarkMode }: EventCardProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
    });
  };

  return (
    <div className={`rounded-lg shadow-md p-6 ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
      <div className="flex items-start justify-between mb-4">
        <h3 className={`text-xl font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
          {event.title}
        </h3>
        <Calendar className={`${isDarkMode ? 'text-purple-400' : 'text-purple-600'}`} size={24} />
      </div>
      <p className={`mb-4 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
        {event.description}
      </p>
      <div className="space-y-2">
        <div className={`flex items-center ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
          <Calendar size={16} className="mr-2" />
          <span>{formatDate(event.date)}</span>
        </div>
        <div className={`flex items-center ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
          <MapPin size={16} className="mr-2" />
          <span>{event.location}</span>
        </div>
      </div>
    </div>
  );
}