
export default class Adapter {
  constructor(api) {
    this._api = api;
  }

  getDestinations() {
    return this._api.getDestinations()
        .then((destinations) => {
          return destinations;
        });
  }

  getPoints() {
    return this._api.getPoints()
        .then((events) => {
          return events;
        });
  }

  getOffers() {
    return this._api.getOffers()
        .then((offers) => {

          return offers;
        });
  }
}