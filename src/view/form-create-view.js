import dayjs from 'dayjs';
import {nanoid} from "nanoid";
import AbstractStatefulView from '../framework/view/abstract-stateful-view.js';
import {offerTransports} from '../mock/trip-mock.js'

const createOfferTransportsTemplate = (type) => (`
  <div class="event__type-item">
    <input id="event-type-${type}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${type}">
    <label class="event__type-label  event__type-label--${type}" for="event-type-${type}-1">${type}</label>
  </div>
`);

const createOfferTemplate = ({title, price, id, isActive}) => (`
    <div class="event__offer-selector">
       <input ${isActive ? 'checked' : ''} class="event__offer-checkbox  visually-hidden" id=${`event-offer-seats-${  id}`} type="checkbox" name="event-offer-seats">
       <label class="event__offer-label" for=${`event-offer-seats-${  id}`}>
       <span class="event__offer-title">${title}</span>
         &plus;&euro;&nbsp;
       <span class="event__offer-price">${price}</span>
       </label>
    </div>
`);
const createDestinationPhotosTemplate = ({src, description}) => `<img class="event__photo" src=${src} alt=${description}>`;
const createDestinationTemplate = ({name}) => ` <option value=${name}></option>`;
const createFormCreateTemplate = (point) => {
  const {  price, dateFromTransform, dateToTransform, currentDestination, 
    showDestinations, destinationsPhotos, showOffers, destinations, type } = point;
  return (
    `
    <li class="trip-events__item">
  <form class="event event--edit" action="#" method="post">
                <header class="event__header">
                  <div class="event__type-wrapper">
                    <label class="event__type  event__type-btn" for="event-type-toggle-1">
                      <span class="visually-hidden">Choose event type</span>
                      <img class="event__type-icon" width="17" height="17" src="img/icons/${type}.png" alt="Event type icon">
                    </label>
                    <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">

                    <div class="event__type-list">
                      <fieldset class="event__type-group">
                        <legend class="visually-hidden">Event type</legend>
                        ${offerTransports.map(createOfferTransportsTemplate).join('')}
                      </fieldset>
                    </div>
                  </div>

                  <div class="event__field-group  event__field-group--destination">
                    <label class="event__label  event__type-output" for="event-destination-1">
                      Flight
                    </label>
                    <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value=${currentDestination ? currentDestination.name : destinations?.[0]?.name} list="destination-list-1">
                    <datalist id="destination-list-1">
                      ${showDestinations}
                    </datalist>
                  </div>

                  <div class="event__field-group  event__field-group--time">
                    <label class="visually-hidden" for="event-start-time-1">From</label>
                    <input class="event__input
                    event__input--time" id="event-start-time-1" type="text" name="event-start-time"
                    value=${dateFromTransform}>
                    &mdash;
                    <label class="visually-hidden" for="event-end-time-1">To</label>
                    <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time"
                    value=${dateToTransform}>
                  </div>

                  <div class="event__field-group  event__field-group--price">
                    <label class="event__label" for="event-price-1">
                      <span class="visually-hidden">Price</span>
                      &euro;
                    </label>
                    <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value=${price}>
                  </div>

                  <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
                  <button class="event__reset-btn" type="reset">Cancel</button>
                  <button class="event__rollup-btn" type="button">
                </header>
                <section class="event__details">
                  <section class="event__section  event__section--offers">
                    <h3 class="event__section-title  event__section-title--offers">Offers</h3>

                    <div class="event__available-offers">
                        ${showOffers}
                    </div>
                  </section>
                  ${currentDestination ? (`
      <section class="event__section  event__section--destination">
        <h3 class="event__section-title  event__section-title--destination">Destination</h3>
        <p class="event__destination-description">${currentDestination.description}</p>

        <div class="event__photos-container">
          <div class="event__photos-tape">
            ${destinationsPhotos}
          </div>
        </div>
      </section>
    </section>`) : ''
    }

              </form>
              </li>
    `
  );};

export default class FormCreateView extends AbstractStatefulView {
  constructor(point, destination, offers, allOffers, destinations) {
    super()


    this._state = FormCreateView.parseTaskToState(point, destination, offers, allOffers, destinations);
    this._handlerClick = this._handlerClick.bind(this);
    this._handlerSubmit = this._handlerSubmit.bind(this);

    this.#setInnerHandlers();
  }

  _restoreHandlers = () => {
    this.#setInnerHandlers();
    this.setSubmitForm(this._callback.submit);
    this.setClickCloseForm(this._callback.click);
  };

  setClickCloseForm(callback) {
    this._callback.click = callback;
    this.element.querySelector('.event__rollup-btn').addEventListener('click', this._handlerClick);
  }

  setSubmitForm(callback) {
    this._callback.submit = callback;
    this.element.addEventListener('submit', this._handlerSubmit);
  }

  #setInnerHandlers = () => {
    this.element.querySelector('.event__type-group')
      .addEventListener('click', this.#selectTypeTransportHandler);
    this.element.querySelector('.event__input--destination')
      .addEventListener('input', this.#changeDestinastionHandler);
  };

  _handlerClick() {
    this._callback.click();
  }

  #selectTypeTransportHandler = (evt) => {
    evt.preventDefault();

    const option = evt.target.closest('.event__type-item')?.querySelector('.event__type-input').value;
    if (!option) return;

    this.updateElement({
      type: option,
    });
  };

  #changeDestinastionHandler = (evt) => {
    const destination = this._state.destinations.find(d => d.name === evt.target.value)
    if (!destination) return;
    this.updateElement({
      currentDestination: destination,
    });
  };

  _handlerSubmit(e) {
    e.preventDefault();
    const r = FormCreateView.parseStateToTask(this._state)
    this._callback.submit(r.id, r);
  }

  reset(point, offers, destinations) {
    this.updateElement(
      FormCreateView.parseTaskToState(point, offers, destinations),
    );
  };

  static parseTaskToState = (point, destinations, offers, allOffers, destinations1) => {
    const newPoint = point || {
      price: 0,
      dateFrom: new Date(),
      dateTo: new Date(),
      destination: null,
      isFavorite: false,
      offers: [],
      type: 'bus',
      id: nanoid()
    }

    const typeOff = allOffers.filter(o => o.type === point.type)[0].offers

    console.log(offers)
    const currentDestination = destinations1 && destinations1.find((des) => des.id === newPoint.destination)
    return ({
      ...newPoint,
      dateFromTransform: dayjs(newPoint.dateFrom).format('DD/MM/YYHH:mm'),
      dateToTransform: dayjs(newPoint.dateTo).format('DD/MM/YYHH:mm'),
      currentDestination,
      showDestinations: destinations1 && destinations1.map(createDestinationTemplate).join(''),
      destinationsPhotos: currentDestination && currentDestination.pictures.map(createDestinationPhotosTemplate).join(''),
      showOffers: typeOff.map((el, i) => createOfferTemplate({ ...el, isActive: Boolean(offers.find(o => o.id === typeOff[i].id)) })).join(''), 
      destinations
    })
  };

  static parseStateToTask = (state) => {
    const point = {...state};

    delete point.dateFromTransform
    delete point.dateToTransform
    delete point.currentDestination
    delete point.showDestinations
    delete point.destinationsPhotos
    delete point.showOffers

    return point;
  };

  get template() {
    return createFormCreateTemplate(this._state);
  }
}
