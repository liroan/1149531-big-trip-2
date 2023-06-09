import AbstractView from '../framework/view/abstract-view';

const createFilter = (filter) => {
  const id = filter.toLowerCase();
  return (`
      <div class="trip-filters__filter">
         <input id=${`filter-${id}`} class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value=${id}>
         <label class="trip-filters__filter-label" for=${`filter-${id}`}>${filter}</label>
      </div>
  `);
};

const createFilterTemplate = (filters) => (`
    <form class="trip-filters" action="#" method="get">
      ${filters.map((filter) => createFilter(filter)).join('')}
      <button class="visually-hidden" type="submit">Accept filter</button>
    </form>`);

export default class FilterView extends AbstractView {
  constructor(filters) {
    super();
    this.filters = filters;
  }

  get template() {
    return createFilterTemplate(this.filters);
  }
}
