import React from 'react';
import {render} from 'react-dom';

import configureStore from './store/configure_store';

import { syncHistoryWithStore } from 'react-router-redux';
import createHistory from 'history/createBrowserHistory';

import AppProvider from './components/app_provider';
import AppRouter from './components/app_router';

import { distanceQuery, processDistanceResponse, clientIsReady } from './distanceQuery';

const history = createHistory();
const store = configureStore(history);

window.onGoogleMapsClientLoaded = () => {
	console.log('ready');
	clientIsReady();
};

var origins = ['Oakland, CA'];
var destinations = ['Pacifica, CA'];

const params = {
  origins,
  destinations,
  travelMode: 'DRIVING',
};

distanceQuery(params)
	.then(processDistanceResponse)
	.then(res => console.log(res))


const App = () => (
	<AppProvider store={store}>
		<AppRouter history={history}/>
	</AppProvider>
)

document.addEventListener("DOMContentLoaded", ()=>{
	render(<App/>, document.querySelector("#root"))
})
