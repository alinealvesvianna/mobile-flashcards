import React from 'react'
import { Provider } from 'react-redux'
import configureStore from './store/configureStore'
import App from './App'

const store = configureStore();

render(
    <Provider store={store}>
        <App/>
    </Provider>,
);