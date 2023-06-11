
const parseRequest = (datas) => datas.map((data) => ({
  id: data.id,
  type: data.type,
  destination: data.destination,
  offers: data.offers || [],
  startDate: data.date_from,
  endDate: data.date_to,
  price: data.base_price,
  isFavorite: Boolean(data.is_favorite)
}));

const parseResponse = (data) => ({
  id: data.id,
  type: data.type,
  destination: data.destination,
  offers: data.offers || [],
  'date_from': data.startDate,
  'date_to': data.endDate,
  'base_price': data.price,
  'is_favourite': Boolean(data.isFavorite)
});

export default class API {
  constructor(endPoint, authorization) {
    this.end = endPoint;
    this.auth = authorization;
  }

  fet({ url, body, headers = new Headers(), m = 'GET' }) {
    headers.append('Authorization', this.auth);

    return fetch(`${this.end  }/${  url}`, {method: m, body: body || null, headers})
      .then((response) => {
        if (response.status >= 200 && response.status < 300) {
          return response;
        } else {
          throw new Error(`${response.status}: ${response.statusText}`);
        }
      })
      .catch((err) => {
        throw err;
      });
  }

  getDestinations() {
    return this.fet({url: 'destinations'})
      .then((response) => response.json());
  }

  getPoints() {
    return this.fet({url: 'points'})
      .then((response) => response.json())
      .then(parseRequest);
  }

  getOffers() {
    return this.fet({url: 'offers'})
      .then((response) => response.json());
  }

  updatePoint(id, data) {
    return this.fet({
      url: `points/${  id}`,
      m: 'PUT',
      body: JSON.stringify(parseResponse(data)),
      headers: new Headers({ 'Content-Type': 'application/json' })
    })
      .then((response) => response.json());
  }
}
