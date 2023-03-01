import BoardPresenter from './presenter/board-presenter';

const pageElement = document.querySelector('.page-body');
const navigationContainer = pageElement.querySelector('.trip-controls__navigation');
const filterContainer = pageElement.querySelector('.trip-controls__filters');
const tripEventsContainer = pageElement.querySelector('.trip-events');

const boardPresenter = new BoardPresenter();
boardPresenter.init(navigationContainer, filterContainer, tripEventsContainer);
