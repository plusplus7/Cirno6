import * as React from 'react';
import { render } from 'react-dom';
import { createStore } from 'redux';
import { BrowserRouter } from 'react-router-dom';
import { AppPage } from './pages/AppPage';
import { Provider } from 'react-redux';
import { CirnoApp } from './reducers/Store';

const store = createStore(CirnoApp);

render(
    <Provider store={store}>
        <BrowserRouter>
            <AppPage />
        </BrowserRouter>
    </Provider>
, document.getElementById('root'));