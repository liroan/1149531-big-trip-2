import NavigationView from './view/navigation-view';
import FilterView from './view/filter-view';
import SortView from './view/sort-view';
import TripPresenter from './presenter/trip-presenter';
import TripModel from './model/trip-model';
import {render} from './framework/render';
import {filters} from './mock/filter-mock';
import {navigations} from './mock/navigation-mock';
import {sortParams} from './mock/sort-mock';

import API from './api/index';
import Provider from './api/adapter';


const auth = 'Basic 4ttregfewr435ttesfewg';
const end = 'https://18.ecmascript.pages.academy/big-trip';
const api = new API(end, auth);
const provider = new Provider(api, {});

const pageElement = document.querySelector('.page-body');
const tripContainer = document.querySelector('.trip-events');
const navigationContainer = pageElement.querySelector('.trip-controls__navigation');
const filterContainer = pageElement.querySelector('.trip-controls__filters');
const tripEventsContainer = pageElement.querySelector('.trip-events');
const updatePoint = provider.updatePoint.bind(provider);


const tripPresenter = new TripPresenter(tripEventsContainer, new TripModel(10), updatePoint);

render(new NavigationView(navigations), navigationContainer);
render(new FilterView(filters), filterContainer);
render(new SortView(sortParams), tripEventsContainer);

tripPresenter.init(true);

tripContainer.innerHTML = 'Loading route...';


document.addEventListener('DOMContentLoaded', () => {
  Promise.all([provider.getPoints(), provider.getDestinations(), provider.getOffers()])
    .then(([responseTripPoints, responseDestinations, responseOffers]) => {
      tripContainer.innerHTML = '';

      tripPresenter.init(false, responseTripPoints, responseOffers, responseDestinations);
    });
  // .catch((e) => {
  //   console.log(e)
  //   tripContainer.innerHTML = `Error`;
  // });
});
