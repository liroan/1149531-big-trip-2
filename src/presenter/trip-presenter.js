import {render} from '../render';
import TripListView from '../view/trip-list-view';
import RoutePointView from '../view/route-point-view';
import FormCreateView from '../view/form-create-view';

export default class TripPresenter {
  constructor(tripEventsContainer, tripModel) {
    this._tripEventsContainer = tripEventsContainer;
    this._trips = tripModel.tripsInfo;
    this._tripListContainer = new TripListView();
    this._offers = tripModel.tripsOffers;
    this._destinations = tripModel.tripsDestinations;
    this._renderRoutePoints = this._renderRoutePoints.bind(this);
    this._settingsRenderPoint = this._settingsRenderPoint.bind(this);
  }

  init() {
    render(this._tripListContainer, this._tripEventsContainer);
    this._renderRoutePoints();
  }

  _renderRoutePoints() {
    for (let i = 0; i < this._trips.length; i++) {
      const matchOffers = this._offers.filter((offer) => this._trips[i].offers.includes(offer.id));
      const matchDestination = this._destinations.filter((destination) => this._offers[i].destination === destination);
      const routePoint = new RoutePointView(this._trips[i], matchOffers, matchDestination);
      this._settingsRenderPoint(routePoint);
      render(routePoint, this._tripListContainer.element);
    }
  }

  _settingsRenderPoint(routePoint) {
    const form = new FormCreateView(this._trips[0], this._offers, this._destinations);
    const closeForm = (event) => {
      event.preventDefault();
      this._tripListContainer.element.replaceChild(routePoint.element, form.element);
      document.removeEventListener('keydown', escCloseForm);
    };
    function escCloseForm(e) {
      if (e.key !== 'Esc' && e.key !== 'Escape') {return;}
      closeForm(e);
    }

    const openForm = () => {
      this._tripListContainer.element.replaceChild(form.element, routePoint.element);
      document.addEventListener('keydown', escCloseForm);
    };
    form.element.addEventListener('submit', closeForm);
    form.element.querySelector('.event__rollup-btn').addEventListener('click', closeForm);
    routePoint.element.querySelector('.event__rollup-btn').addEventListener('click', openForm);

  }
}
