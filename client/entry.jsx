import React from 'react';
import {render} from 'react-dom';

import configureStore from './store/configure_store';

import { syncHistoryWithStore } from 'react-router-redux';
import createHistory from 'history/createBrowserHistory';

import AppProvider from './components/app_provider';
import AppRouter from './components/app_router';

import { distanceQuery, processDistanceResponse } from './distanceQuery';

// const history = createHistory();
// const store = configureStore(history);

var origins = ['Oakland, CA'];
var destinations = ['Pacifica, CA'];

const params = {
  origins,
  destinations,
  travelMode: 'DRIVING',
};

window.onGoogleMapsClientLoaded = () => {
	distanceQuery(params).then(processDistanceResponse)
};


// const App = () => (
// 	<AppProvider store={store}>
// 		<AppRouter history={history}/>
// 	</AppProvider>
// )
//
// document.addEventListener("DOMContentLoaded", ()=>{
// 	render(<App/>, document.querySelector("#root"))
// })
