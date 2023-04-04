import NavigationView from './view/navigation-view';
import FilterView from './view/filter-view';
import SortView from './view/sort-view';
import TripPresenter from './presenter/trip-presenter';
import TripModel from './model/trip-model';
import {render} from './framework/render';
import {filters} from './mock/filter-mock';
import {navigations} from './mock/navigation-mock';
import {sortParams} from './mock/sort-mock';

const pageElement = document.querySelector('.page-body');
const navigationContainer = pageElement.querySelector('.trip-controls__navigation');
const filterContainer = pageElement.querySelector('.trip-controls__filters');
const tripEventsContainer = pageElement.querySelector('.trip-events');

const tripPresenter = new TripPresenter(tripEventsContainer, new TripModel(10));

render(new NavigationView(navigations), navigationContainer);
render(new FilterView(filters), filterContainer);
render(new SortView(sortParams), tripEventsContainer);
tripPresenter.init();
