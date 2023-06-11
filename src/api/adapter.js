
export default class Adapter {
  constructor(api) {
    this._api = api;
  }

  getDestinations() {
    return this._api.getDestinations()
      .then((destinations) => destinations);
  }

  updatePoint({ id, data }) {
    return this._api.updatePoint(id, data);
  }

  getPoints() {
    return this._api.getPoints()
      .then((events) => events);
  }

  getOffers() {
    return this._api.getOffers()
      .then((offers) => offers);
  }
}
