import { Location, Event } from './types';

// Generate mock historical data for each hour
const generateHistoricalData = () => {
  return Array.from({ length: 24 }, (_, i) => ({
    hour: i,
    busyness: Math.floor(Math.random() * 3) + 2, // Random busyness between 2-4
  }));
};

export const locations: Location[] = [
  {
    id: 'dining-hall',
    name: 'Dining Hall',
    type: 'dining',
    currentBusyness: 3,
    lastReported: new Date().toISOString(),
    description: 'Main campus dining facility offering diverse meal options',
    hours: 'Mon-Thu: 7:00 AM - 10:00 PM\nFri: 7:00 AM - 8:00 PM\nSat: 7:00 AM - 1:30 PM, 5:00 PM - 10:00 PM\nSun: 10:00 AM - 1:30 PM, 5:00 PM - 10:00 PM',
    historicalData: generateHistoricalData(),
  },
  {
    id: 'rsc',
    name: 'Rhatigan Student Center (RSC)',
    type: 'dining',
    currentBusyness: 4,
    lastReported: new Date().toISOString(),
    description: 'Central hub for student activities and dining',
    hours: '7:00 AM - 10:00 PM',
    historicalData: generateHistoricalData(),
  },
  {
    id: 'chick-fil-a',
    name: 'Chick-fil-A',
    type: 'restaurant',
    currentBusyness: 5,
    lastReported: new Date().toISOString(),
    description: 'Popular chicken sandwich restaurant',
    deals: ['10% off with student ID'],
    hours: '10:30 AM - 7:00 PM',
    historicalData: generateHistoricalData(),
  },
  {
    id: 'freddys',
    name: "Freddy's",
    type: 'restaurant',
    currentBusyness: 2,
    lastReported: new Date().toISOString(),
    description: 'Steakburgers and frozen custard',
    deals: ['Free drink with combo meal'],
    hours: '10:30 AM - 9:00 PM',
    historicalData: generateHistoricalData(),
  },
  {
    id: 'panda-express',
    name: 'Panda Express',
    type: 'restaurant',
    currentBusyness: 3,
    lastReported: new Date().toISOString(),
    description: 'Chinese-American cuisine',
    hours: '10:30 AM - 8:00 PM',
    historicalData: generateHistoricalData(),
  },
  {
    id: 'fuji-san',
    name: 'Fuji-San',
    type: 'restaurant',
    currentBusyness: 2,
    lastReported: new Date().toISOString(),
    description: 'Japanese cuisine and sushi',
    deals: ['Bogo rolls on Wednesday'],
    hours: '11:00 AM - 8:00 PM',
    historicalData: generateHistoricalData(),
  },
  {
    id: 'starbucks',
    name: 'Starbucks',
    type: 'cafe',
    currentBusyness: 4,
    lastReported: new Date().toISOString(),
    description: 'Premium coffee and beverages',
    hours: '6:30 AM - 8:00 PM',
    historicalData: generateHistoricalData(),
  },
];

export const events: Event[] = [
  {
    id: '1',
    title: 'Student Organization Fair',
    description: 'Explore various student clubs and organizations',
    date: new Date().toISOString(),
    location: 'RSC Ballroom',
  },
  {
    id: '2',
    title: 'Live Music at the RSC',
    description: 'Local student bands performing',
    date: new Date().toISOString(),
    location: 'RSC Commons',
  },
  {
    id: '3',
    title: 'Career Fair',
    description: 'Meet potential employers and explore career opportunities',
    date: new Date().toISOString(),
    location: 'RSC Third Floor',
  },
];