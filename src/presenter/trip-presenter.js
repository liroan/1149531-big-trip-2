import {render} from '../render';
import TripListView from '../view/trip-list-view';
import NoRoutePointsView from '../view/no-route-points';
import RoutePresenter from './route-presenter';

export default class TripPresenter {
  constructor(tripEventsContainer, tripModel) {
    this._tripEventsContainer = tripEventsContainer;
    this._trips = tripModel.tripsInfo;
    this._tripListContainer = new TripListView();
    this._offers = tripModel.tripsOffers;
    this._destinations = tripModel.tripsDestinations;
    this._renderRoutePoints = this._renderRoutePoints.bind(this);
    this._renderNoRoutePoints = this._renderNoRoutePoints.bind(this);
  }

  init() {
    render(this._tripListContainer, this._tripEventsContainer);
    if (this._trips.length > 0) {
      this._renderRoutePoints();
    } else {
      this._renderNoRoutePoints();
    }
  }

  _renderNoRoutePoints() {
    render(new NoRoutePointsView(), this._tripListContainer.element);
  }

  _renderRoutePoints() {
    for (let i = 0; i < this._trips.length; i++) {
      const matchOffers = this._offers.filter((offer) => this._trips[i].offers.includes(offer.id));
      const matchDestination = this._destinations.filter((destination) => this._offers[i].destination === destination);
      const routePresenter = new RoutePresenter({
        tripListContainer: this._tripListContainer,
      });
      routePresenter.init(this._trips[i], matchDestination, matchOffers, this._offers, this._destinations)
    }
  }
}
