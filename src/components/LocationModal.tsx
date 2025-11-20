import React, { useState } from 'react';
import { Location } from '../types';
import { Star, X, Clock, AlertCircle } from 'lucide-react';
import { BusynessChart } from './BusynessChart';
import { isLocationOpen } from '../utils';

interface LocationModalProps {
  location: Location;
  onClose: () => void;
  onSubmitReport: (rating: number, comment: string) => void;
  isDarkMode: boolean;
}

export function LocationModal({ location, onClose, onSubmitReport, isDarkMode }: LocationModalProps) {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmitReport(rating, comment);
    onClose();
  };

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const formatLastReported = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));

    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes} minutes ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)} hours ago`;
    return `${Math.floor(diffInMinutes / 1440)} days ago`;
  };

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 overflow-y-auto z-50"
      onClick={handleOverlayClick}
    >
      <div 
        className={`rounded-lg max-w-2xl w-full p-6 ${isDarkMode ? 'bg-gray-800' : 'bg-white'} max-h-[90vh] overflow-y-auto`}
        onClick={e => e.stopPropagation()}
      >
        <div className="flex justify-between items-start mb-6 sticky top-0 bg-inherit pb-4">
          <div>
            <h2 className={`text-2xl font-bold mb-1 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              {location.name}
            </h2>
            <p className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}>
              {location.description}
            </p>
          </div>
          <button 
            onClick={onClose} 
            className={`${isDarkMode ? 'text-gray-400 hover:text-gray-200' : 'text-gray-500 hover:text-gray-700'} p-2`}
            aria-label="Close modal"
          >
            <X size={24} />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="space-y-4">
            <div>
              <h3 className={`text-lg font-semibold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                Current Status
              </h3>
              <div className="flex items-center mb-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    size={24}
                    className={`${
                      isLocationOpen(location) && location.currentBusyness >= star 
                        ? 'text-yellow-400' 
                        : (isDarkMode ? 'text-gray-600' : 'text-gray-300')
                    }`}
                  />
                ))}
                <span className={isDarkMode ? 'ml-2 text-gray-300' : 'ml-2 text-gray-600'}>
                  {isLocationOpen(location) 
                    ? `(${location.currentBusyness} out of 5)` 
                    : '(Closed)'}
                </span>
              </div>
              <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                Last updated: {formatLastReported(location.lastReported)}
              </p>
            </div>

            <div>
              <div className={`flex items-center mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                <Clock size={18} className="mr-2" />
                <span>{location.hours}</span>
              </div>
              {location.deals && location.deals.length > 0 && (
                <div className={`flex items-center ${isDarkMode ? 'text-purple-400' : 'text-purple-600'}`}>
                  <AlertCircle size={18} className="mr-2" />
                  <span>{location.deals[0]}</span>
                </div>
              )}
            </div>
          </div>

          <div>
            <h3 className={`text-lg font-semibold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              Submit New Report
            </h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  How busy is it right now?
                </label>
                <div className="flex items-center mb-4">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      size={24}
                      className={`cursor-pointer ${
                        rating >= star ? 'text-yellow-400' : (isDarkMode ? 'text-gray-600' : 'text-gray-300')
                      }`}
                      onClick={() => setRating(star)}
                    />
                  ))}
                </div>
              </div>

              <div>
                <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  Additional Comments
                </label>
                <textarea
                  className={`w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent ${
                    isDarkMode 
                      ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                      : 'bg-white border-gray-300 text-gray-900 placeholder-gray-400'
                  }`}
                  rows={3}
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Add any additional details..."
                />
              </div>

              <button
                type="submit"
                className={`w-full py-2 px-4 rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${
                  isDarkMode 
                    ? 'bg-purple-600 hover:bg-purple-700 text-white' 
                    : 'bg-purple-600 hover:bg-purple-700 text-white'
                }`}
                disabled={!rating}
              >
                Submit Report
              </button>
            </form>
          </div>
        </div>

        <div className="mt-6">
          <BusynessChart data={location.historicalData} isDarkMode={isDarkMode} />
        </div>
      </div>
    </div>
  );
}