import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { BrowserRouter } from "react-router-dom";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import rootReducer, { rootSaga } from "./module.js/index";
import createSagaMiddelware from "redux-saga";
import { loadableReady } from "@loadable/component";

const sagaMiddleware = createSagaMiddelware();

// store 생성 및 thunk 미들웨어 적용
const store = createStore(
    rootReducer,
    window.__PRELOADED_STATE__, // 이 값을 초기 상태로 사용
    applyMiddleware(thunk, sagaMiddleware)
);

sagaMiddleware.run(rootSaga);

const Root = () => {
    return (
        <Provider store={store}>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </Provider>
    );
};

const root = document.getElementById('root');

if(process.env.NODE_ENV === 'production'){
    loadableReady(()=>{
        ReactDOM.hydrate(<Root />, root);
    });
}else{
    ReactDOM.render(<Root />, root);
}

serviceWorker.unregister();
