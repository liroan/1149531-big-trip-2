import {nanoid} from 'nanoid';

export const offerTransports = ['taxi', 'bus', 'train', 'ship', 'drive', 'flight', 'check-in', 'sightseeing', 'restaurant'];


export const generateTripDestination = (id) => ({
  id,
  description: `${id === 1 ? 'Chamonix' : 'Lol'}, is a beautiful city, a true asian pearl, with crowded streets.`,
  name: id === 1 ? 'Chamonix' : 'Lol',
  pictures: id === 1 ? [
    {
      src: 'img/photos/1.jpg',
      description: 'Chamonix parliament building'
    }
  ] : [
    {
      src: 'img/photos/1.jpg',
      description: 'Chamonix parliament building'
    },
    {
      src: 'img/photos/1.jpg',
      description: 'Chamonix parliament building'
    },
  ],
});

export const generateTripOffer = (id) => ({
  id,
  title: 'Order Uber',
  price: 120
});

export const generateTripPoint = () => ({
  basePrice: 1100,
  dateFrom: '2019-07-10T23:55:56.845Z',
  dateTo: '2019-07-11T00:22:13.375Z',
  destination: 1,
  id: nanoid(),
  isFavorite: false,
  offers: [1,2,3],
  type: 'bus'
});
