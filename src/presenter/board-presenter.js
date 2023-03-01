import {render} from '../render';
import NavigationView from '../view/navigation-view';
import FilterView from '../view/filter-view';
import TripListView from '../view/trip-list-view';
import RoutePointView from '../view/route-point-view';
import SortView from '../view/sort-view';

export default class PagePresenter {
  init(navigationContainer, filterContainer, tripEventsContainer) {
    const tripListContainer = new TripListView();
    render(new NavigationView(), navigationContainer);
    render(new FilterView(), filterContainer);
    render(new SortView(), tripEventsContainer);
    render(tripListContainer, tripEventsContainer);
    for (let i = 0; i < 3; i++) {
      render(new RoutePointView(), tripListContainer.getElement());
    }
  }
}
