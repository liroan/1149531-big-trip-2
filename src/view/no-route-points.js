import AbstractView from '../framework/view/abstract-view';

const createNoRoutePointsTemplate = () => '<p class="trip-events__msg">Click New Event to create your first point</p>';


export default class NoRoutePointsView extends AbstractView {
  get template() {
    return createNoRoutePointsTemplate();
  }
}
