import {generateTripDestination, generateTripOffer, generateTripPoint} from '../mock/trip-mock';


export default class TripModel {
  constructor(length) {
    this._trips = Array.from({ length }, generateTripPoint );
    this._offers = Array.from({ length }, (item, index) => generateTripOffer(index % 2) );
    this._destinations = Array.from({ length }, generateTripDestination );
  }

  get tripsInfo() {
    return this._trips;
  }

  get tripsOffers() {
    return this._offers;
  }

  get tripsDestinations() {
    return this._destinations;
  }
}
