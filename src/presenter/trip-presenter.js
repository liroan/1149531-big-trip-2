import { render } from "../render";
import TripListView from "../view/trip-list-view";
import NoRoutePointsView from "../view/no-route-points";
import RoutePresenter from "./route-presenter";

function updateItem(items, update) {
  return items.map((item) => (item.id === update.id ? update : item));
}

export default class TripPresenter {
  _taskPresenters = new Map();
  constructor(tripEventsContainer, tripModel, updatePoint) {
    this._tripEventsContainer = tripEventsContainer;
    this._trips = [];
    this._tripListContainer = new TripListView();
    this._offers = [];
    this._destinations = {};
    this._renderRoutePoints = this._renderRoutePoints.bind(this);
    this._renderNoRoutePoints = this._renderNoRoutePoints.bind(this);
    this._updatePoint = updatePoint
  }

  init(isLoading, trips, offers, destinations) {
    if (trips && offers && destinations) {
      this._trips = trips;
      this._offers = offers;
      this._destinations = destinations;
    }
    render(this._tripListContainer, this._tripEventsContainer);
    if (isLoading || this._trips.length > 0) {
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
      const matchOffers = this._offers
        .filter((offer) => offer.type === this._trips[i]?.type)?.[0]
        ?.offers.filter((off) => this._trips[i].offers.includes(off.id));
      const matchDestination = this._destinations.filter((destination) => {
        return this._trips[i].destination == destination.id;
      });
      

      if (this._trips.length > 0) {
        const routePresenter = new RoutePresenter({
          tripListContainer: this._tripListContainer,
          onDataChange: this._handleTaskChange,
          onModeChange: this._handleModeChange,
          updatePoint: this._updatePoint
        });
        routePresenter.init(
          this._trips[i],
          matchDestination[0],
          matchOffers,
          this._offers,
          this._destinations
        );
        this._taskPresenters.set(this._trips[i].id, routePresenter);
      }
    }
  }

  _clearRoutePointsList() {
    this._taskPresenters.forEach((presenter) => presenter.destroy());
    this._taskPresenters.clear();
  }

  _handleModeChange = () => {
    this._taskPresenters.forEach((presenter) => presenter.resetView());
  };

  _handleTaskChange = (updatedTask) => {
    this._trips = updateItem(this._trips, updatedTask);
    const matchOffers = this._offers.filter((offer) =>
      updatedTask.offers.includes(offer.id)
    );
    const matchDestination = this._destinations.filter(
      (destination) => updatedTask.destination === destination
    );
    console.log(updatedTask);
    this._taskPresenters
      .get(updatedTask.id)
      .init(
        updatedTask,
        matchDestination,
        matchOffers,
        this._offers,
        this._destinations
      );
  };
}
