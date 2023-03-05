import {generateTripDestination, generateTripOffer, generateTripPoint} from '../mock/trip-mock';


export default class TripModel {
  constructor(length) {
    this.trips = Array.from({ length }, generateTripPoint );
    this.offers = Array.from({ length }, (item, index) => generateTripOffer(index % 2) );
    this.destinations = Array.from({ length }, generateTripDestination );
  }

  getTripsInfo() {
    return this.trips;
  }

  getTripsOffers() {
    return this.offers;
  }

  getTripsDestinations() {
    return this.destinations;
  }
}
