import {render} from '../render';
import TripListView from '../view/trip-list-view';
import RoutePointView from '../view/route-point-view';
import FormCreateView from '../view/form-create-view';

export default class TripPresenter {
  init(tripEventsContainer) {
    const tripListContainer = new TripListView();
    const form = new FormCreateView();
    render(tripListContainer, tripEventsContainer);
    render(form, tripEventsContainer);
    for (let i = 0; i < 3; i++) {
      render(new RoutePointView(), tripListContainer.getElement());
    }
  }
}
