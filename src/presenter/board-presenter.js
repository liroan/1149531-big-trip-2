import {render} from '../render';
import NavigationView from '../view/navigation-view';
import FilterView from '../view/filter-view';
import TripListView from '../view/trip-list-view';
import RoutePointView from '../view/route-point-view';
import SortView from '../view/sort-view';
import FormCreateView from '../view/form-create-view';

export default class PagePresenter {
  init(navigationContainer, filterContainer, tripEventsContainer, tripModel) {
    const tripListContainer = new TripListView();
    const trips = tripModel.getTripsInfo();
    const offers = tripModel.getTripsOffers();
    const destinations = tripModel.getTripsDestinations();

    render(new NavigationView(), navigationContainer);
    render(new FilterView(), filterContainer);
    render(new SortView(), tripEventsContainer);
    render(tripListContainer, tripEventsContainer);
    render(new FormCreateView(trips[0], offers, destinations), tripListContainer.getElement());
    render(new FormCreateView(null, offers, destinations), tripListContainer.getElement());

    for (let i = 0; i < trips.length; i++) {
      const matchOffers = offers.filter((offer) => trips[i].offers.includes(offer.id));
      const matchDestination = destinations.filter((destination) => trips[i].destination === destination);

      render(new RoutePointView(trips[i], matchOffers, matchDestination), tripListContainer.getElement());
    }
  }
}
