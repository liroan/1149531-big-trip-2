
class Model {
  constructor(data) {
    this.id = data.id;
    this.type = data.type;
    this.destination = data.destination;
    this.offers = data.offers || [];
    this.startDate = data.date_from;
    this.endDate = data.date_to
    this.price = data.base_price;
    this.isFavorite = Boolean(data.is_favorite);
  }

  toStr() {
    return {
      'id': this.id,
      'type': this.type,
      'destination': this.destination,
      'offers': this.offers,
      'date_from': moment(this.startDate).toISOString(),
      'date_to': moment(this.endDate).toISOString(),
      'base_price': this.price,
      'is_favorite': this.isFavorite
    };
  }


}

const RequestMethod = {
  GET: `GET`,
  POST: `POST`,
  PUT: `PUT`,
  DELETE: `DELETE`
 }

const checkStatus = (response) => {
  if (response.status >= 200 && response.status < 300) {
    return response;
  } else {
    throw new Error(`${response.status}: ${response.statusText}`);
  }
};

export default class Api {
  constructor(endPoint, authorization) {
    this._endPoint = endPoint;
    this._authorization = authorization;
  }

  _load({url, method = RequestMethod.GET, body = null, headers = new Headers()}) {
    headers.append(`Authorization`, this._authorization);

    return fetch(`${this._endPoint}/${url}`, {method, body, headers})
      .then(checkStatus)
      .catch((err) => {
        throw err;
      });
  }

  createEvent(event) {
    return this._load({
      url: `points`,
      method: RequestMethod.POST,
      body: JSON.stringify(event.toStr()),
      headers: new Headers({'Content-Type': `application/json`})
    })
      .then((response) => response.json())
      .then(Model.parseEvent);
  }

  deleteEvent(id) {
    return this._load({url: `points/${id}`, method: RequestMethod.DELETE});
  }

  getDestinations() {
    return this._load({url: `destinations`})
      .then((response) => response.json());
  }

  getPoints() {
    return this._load({url: `points`})
      .then((response) => response.json())
      .then(Model.parseEvents);
  }

  getOffers() {
    return this._load({url: `offers`})
      .then((response) => response.json());
  }

  sync(data) {
    return this._load({
      url: `points/sync`,
      method: RequestMethod.POST,
      body: JSON.stringify(data),
      headers: new Headers({'Content-Type': `application/json`})
    })
      .then((response) => response.json());
  }

  updateEvent(id, data) {
    return this._load({
      url: `points/${id}`,
      method: RequestMethod.PUT,
      body: JSON.stringify(data.toStr()),
      headers: new Headers({'Content-Type': `application/json`})
    })
      .then((response) => response.json())
      .then(EventModel.parseEvent);
  }
}