import React from 'react';
import {render} from 'react-dom';

import configureStore from './store/configure_store';

import { syncHistoryWithStore } from 'react-router-redux';
import createHistory from 'history/createBrowserHistory';

import AppProvider from './components/app_provider';
import AppRouter from './components/app_router';

const history = createHistory()

const store = configureStore(history);

const buildUrl = (url, params) => {
	const _url = new URL(url);
	Object.keys(params).forEach(key => _url.searchParams.append(key, params[key]));
	return _url;
};

console.log("HELLO");

const url = "https://maps.googleapis.com/maps/api/directions/json?";
const key = "AIzaSyDieL1nnb3nrdILx7KKJGDjhRLiJ40zDzU";

const origin = "1518 4th Avenue, Oakland, CA";
const destination = "Pacifica State Beach, Pacifica, CA"
const traffic_model = "best_guess";
const departure_time = "now";
const mode = "driving";

const params = { key, traffic_model, departure_time, mode, origin, destination };

fetch(buildUrl(url, params), { mode: "cors" })
	.then((res) => { console.dir(res); });

const App = () => (
	<AppProvider store={store}>
		<AppRouter history={history}/>
	</AppProvider>
)

document.addEventListener("DOMContentLoaded", ()=>{
	render(<App/>, document.querySelector("#root"))
})
