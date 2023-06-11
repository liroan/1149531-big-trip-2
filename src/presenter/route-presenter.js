import {render} from '../render';
import RoutePointView from '../view/route-point-view';
import FormCreateView from '../view/form-create-view';
import {remove, replace} from '../framework/render';

const Mode = {
  DEFAULT: 'DEFAULT',
  EDITING: 'EDITING',
};

export default class RoutePresenter {
  constructor({tripListContainer, onDataChange, onModeChange, updatePoint}) {
    this._tripListContainer = tripListContainer;
    this._openForm = this._openForm.bind(this);
    this._escCloseForm = this._escCloseForm.bind(this);
    this._closeFormWithDeleteNewData = this._closeFormWithDeleteNewData.bind(this);
    this._closeForm = this._closeForm.bind(this);
    this._handleFavoriteClick = this._handleFavoriteClick.bind(this);
    this._routePoint = null;
    this._form = null;
    this._handleDataChange = onDataChange;
    this._handleModeChange = onModeChange;
    this._mode = Mode.DEFAULT;
    this._offers = [];
    this._allDestination = [];
    this._updatePoint = updatePoint;
  }

  init(trip, matchDestination, matchOffers, allOffers, allDestination) {
    const prevRoutePoint = this._routePoint;
    const prevRoutePointForm = this._form;
    this._offers = matchOffers;
    this._allDestination = allDestination;
    this._trip = trip;
    this._routePoint = new RoutePointView(trip, matchOffers, matchDestination,
      this._handleFavoriteClick);
    this._form = new FormCreateView(trip, matchDestination, matchOffers, allOffers, allDestination);
    this._form.setClickCloseForm(this._closeFormWithDeleteNewData);
    this._form.setSubmitForm((id, data) => {
      try {
        this._updatePoint({ id, data });
        this._closeForm();
      }
    });
    this._routePoint.setClickRoute(this._openForm);

    if (prevRoutePoint === null || prevRoutePointForm === null) {
      render(this._routePoint, this._tripListContainer.element);
      return;
    }
    if (this._mode === Mode.DEFAULT) {
      replace(this._routePoint, prevRoutePoint);
    }
    if (this._mode === Mode.EDITING) {
      replace(this._form, prevRoutePointForm);
    }

    remove(prevRoutePoint);
    remove(prevRoutePointForm);
  }

  resetView() {
    if (this._mode !== Mode.DEFAULT) {
      this._closeFormWithDeleteNewData(this._trip);
    }
  }

  destroy() {
    remove(this._routePoint);
    remove(this._form);
  }

  _handleFavoriteClick() {
    this._handleDataChange({...this._trip, isFavorite: !this._trip.isFavorite});
  }

  _closeForm() {
    this._tripListContainer.element.replaceChild(this._routePoint.element, this._form.element);
    document.removeEventListener('keydown', this._escCloseForm);
    this._mode = Mode.DEFAULT;
  }

  _closeFormWithDeleteNewData() {
    this._closeForm();
    this._form.reset(this._trip, this._offers, this._allDestination);
  }

  _escCloseForm(e) {
    if (e.key !== 'Esc' && e.key !== 'Escape') {return;}
    this._closeFormWithDeleteNewData();
  }

  _openForm() {
    this._tripListContainer.element.replaceChild(this._form.element, this._routePoint.element);
    document.addEventListener('keydown', this._escCloseForm);
    this._handleModeChange();
    this._mode = Mode.EDITING;
  }
}
