import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter } from 'react-router-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import rootReducer, { rootSaga } from './module.js/index';
import createSagaMiddelware from 'redux-saga';

const sagaMiddleware = createSagaMiddelware();

// store 생성 및 thunk 미들웨어 적용
const store = createStore(
    rootReducer,
    window.__PRELOADED_STATE__, // 이 값을 초기 상태로 사용
    applyMiddleware(thunk, sagaMiddleware));

sagaMiddleware.run(rootSaga);

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>
, document.getElementById('root'));

serviceWorker.unregister();
