import { Location } from './types';

export function isLocationOpen(location: Location): boolean {
  const now = new Date();
  const day = now.getDay(); // 0 = Sunday, 1 = Monday, etc.
  const hour = now.getHours();
  const minutes = now.getMinutes();
  const currentTime = hour + minutes / 60;

  if (location.id === 'dining-hall') {
    switch (day) {
      case 0: // Sunday
        return (currentTime >= 10 && currentTime <= 13.5) || (currentTime >= 17 && currentTime <= 22);
      case 5: // Friday
        return currentTime >= 7 && currentTime <= 20;
      case 6: // Saturday
        return (currentTime >= 7 && currentTime <= 13.5) || (currentTime >= 17 && currentTime <= 22);
      default: // Monday-Thursday
        return currentTime >= 7 && currentTime <= 22;
    }
  }

  // For other locations, parse the hours string
  const [open, close] = location.hours.split(' - ').map(time => {
    const [hours, minutes] = time.split(':');
    let hour = parseInt(hours);
    const isPM = time.includes('PM');
    if (isPM && hour !== 12) hour += 12;
    if (!isPM && hour === 12) hour = 0;
    return hour + (parseInt(minutes) || 0) / 60;
  });

  if (close < open) { // Handles cases where closing time is next day
    return currentTime >= open || currentTime <= close;
  }
  return currentTime >= open && currentTime <= close;
}