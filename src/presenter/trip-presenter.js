import {render} from '../render';
import TripListView from '../view/trip-list-view';
import RoutePointView from '../view/route-point-view';
import FormCreateView from '../view/form-create-view';

export default class TripPresenter {
  init(tripEventsContainer, tripModel) {
    const tripListContainer = new TripListView();
    const trips = tripModel.tripsInfo;
    const offers = tripModel.tripsOffers;
    const destinations = tripModel.tripsDestinations;
    render(tripListContainer, tripEventsContainer);
    render(new FormCreateView(trips[0], offers, destinations), tripListContainer.element);
    render(new FormCreateView(null, offers, destinations), tripListContainer.element);
    for (let i = 0; i < trips.length; i++) {
      const matchOffers = offers.filter((offer) => trips[i].offers.includes(offer.id));
      const matchDestination = destinations.filter((destination) => trips[i].destination === destination);

      render(new RoutePointView(trips[i], matchOffers, matchDestination), tripListContainer.element);
    }
  }
}
