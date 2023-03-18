import {createElement} from '../render.js';

const createNewEventButtonTemplate = () => '<button class="trip-main__event-add-btn  btn  btn--big  btn--yellow" type="button">New event</button>';

export default class NewEventButtonView {
  constructor() {
    this._element = null;
  }

  get template() {
    return createNewEventButtonTemplate();
  }

  get element() {
    if (!this._element) {
      this._element = createElement(this.template);
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
