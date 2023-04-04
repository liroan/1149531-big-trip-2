import AbstractView from '../framework/view/abstract-view';

const createSortParam = (param) => {
  const id = param.toLowerCase();
  return (`
      <div class=${`trip-sort__item  trip-sort__item--${id}`}>
        <input id=${`sort-${id}`} class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value=${`sort-${id}`}>
        <label class="trip-sort__btn" for=${`sort-${id}`}>${param}</label>
      </div>
  `);
};

const createSortTemplate = (params) => (`
  <form class="trip-events__trip-sort  trip-sort" action="#" method="get">
    ${params.map((param) => createSortParam(param)).join('')}
  </form>`
);

export default class SortView extends AbstractView {
  constructor(params) {
    super();
    this.params = params;
  }

  get template() {
    return createSortTemplate(this.params);
  }
}
