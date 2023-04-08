import {render} from '../render';
import RoutePointView from '../view/route-point-view';
import FormCreateView from '../view/form-create-view';

export default class RoutePresenter {
  constructor({tripListContainer}) {
    this._tripListContainer = tripListContainer;
    this._openForm = this._openForm.bind(this);
    this._escCloseForm = this._escCloseForm.bind(this);
    this._closeForm = this._closeForm.bind(this);
  }

  init(trip, matchDestination, matchOffers, allOffers, allDestination) {
    this._routePoint = new RoutePointView(trip, matchOffers, matchDestination);
    this._form = new FormCreateView(trip, allOffers, allDestination);
    this._form.setClickCloseForm(this._closeForm);
    this._form.setSubmitForm(this._closeForm);

    this._routePoint.setClickRoute(this._openForm);
    render(this._routePoint, this._tripListContainer.element);
  }

  _closeForm() {
    this._tripListContainer.element.replaceChild(this._routePoint.element, this._form.element);
    document.removeEventListener('keydown', this._escCloseForm);
  }

  _escCloseForm(e) {
    if (e.key !== 'Esc' && e.key !== 'Escape') {return;}
    this._closeForm(e);
  }

  _openForm() {
    this._tripListContainer.element.replaceChild(this._form.element, this._routePoint.element);
    document.addEventListener('keydown', this._escCloseForm);
  }
}
