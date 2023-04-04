import AbstractView from '../framework/view/abstract-view';

const createNavigation = (nav) => (`
      <a class="trip-tabs__btn" href="#">${nav}</a>
`);

const createNavigationTemplate = (navigations) => (
  `
  <div class="trip-controls__navigation">
    <h2 class="visually-hidden">Switch trip view</h2>
    <nav class="trip-controls__trip-tabs  trip-tabs">
    ${navigations.map((nav) => createNavigation(nav)).join('')}
    </nav>
  </div>
  `
);

export default class NavigationView extends AbstractView {
  constructor(navigations) {
    super();
    this.navigations = navigations;
  }

  get template() {
    return createNavigationTemplate(this.navigations);
  }
}
