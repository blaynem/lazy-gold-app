import React from 'react';
import ReactDOM from 'react-dom';
import App from './containers/App';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

import reducers from './reducers';
import registerServiceWorker from './registerServiceWorker';

const store = createStore(reducers, composeWithDevTools(
  applyMiddleware(thunk),
));

ReactDOM.render(
	<Provider store={store}>
    <App />
	</Provider>,
	document.getElementById('root')
);
registerServiceWorker();
