import AbstractView from '../framework/view/abstract-view';
// eslint-disable-next-line no-undef
const dayjs = require('dayjs');

const createOfferTemplate = ({ title, price }) => (`
  <li class="event__offer">
    <span class="event__offer-title">${ title }</span>
    &plus;&euro;&nbsp;
    <span class="event__offer-price">${ price }</span>
  </li>
`);

const createRoutePointTemplate = (point, offers, destination) => {
  const {  basePrice, dateFrom, dateTo, type } = point;
  const offersView = offers && offers.map(createOfferTemplate);
  const isShowDestination = false;
  const timeDiffHours = dayjs(dateTo).diff(dayjs(dateFrom), 'h');
  const timeDiffMinutes = dayjs(dateTo).diff(dayjs(dateFrom), 'm');
  return (`
    <li class="trip-events__item">
       <div class="event">
          <time class="event__date" datetime="2019-03-18">
            ${dayjs(dateFrom).format('MMM DD')}
          </time>
          <div class="event__type">
             <img class="event__type-icon" width="42" height="42" src="img/icons/${type}.png" alt="Event type icon">
          </div>
             <h3 class="event__title">Taxi Amsterdam</h3>
             <div class="event__schedule">
               <p class="event__time">
                 <time class="event__start-time" datetime="2019-03-18T10:30">
                    ${dayjs(dateFrom).format('H:m') }
                </time>
                 &mdash;
                 <time class="event__end-time" datetime="2019-03-18T11:00">
                     ${dayjs(dateTo).format('H:m') }
                 </time>
               </p>
               <p class="event__duration">
                    ${ timeDiffHours > 0 ? `${timeDiffHours  }H` : '' }
                    ${ timeDiffMinutes > 0 ? `${timeDiffMinutes % 60  }M` : '' }
               </p>
             </div>
             <p class="event__price">
               &euro;&nbsp;<span class="event__price-value">${basePrice}</span>
             </p>
             <h4 class="visually-hidden">Offers:</h4>
             <ul class="event__selected-offers">
                ${offersView && offersView.join('')}
             </ul>
             <button class="event__favorite-btn event__favorite-btn--active" type="button">
               <span class="visually-hidden">Add to favorite</span>
               <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
                 <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>
               </svg>
             </button>
             <button class="event__rollup-btn" type="button">
                <span class="visually-hidden">Open event</span>
             </button>
             ${isShowDestination ? destination : ''}
          </div>
      </li>
`);};


export default class RoutePointView extends AbstractView {
  constructor(point, offers, destination, onFavoriteClick) {
    super();
    this._point = point;
    this._offers = offers;
    this._destination = destination;
    this._handlerClick = this._handlerClick.bind(this);
    this._handleFavoriteClick = onFavoriteClick;
    this.element.querySelector('.event__favorite-btn')
      .addEventListener('click', this._favoriteClickHandler);
  }

  _favoriteClickHandler = (evt) => {
    evt.preventDefault();
    this._handleFavoriteClick();
  };

  setClickRoute(callback) {
    this._callback.click = callback;
    this.element.querySelector('.event__rollup-btn').addEventListener('click', this._handlerClick);
  }

  _handlerClick() {
    this._callback.click();
  }

  get template() {
    return createRoutePointTemplate(this._point, this._offers, this._destination);
  }
}
