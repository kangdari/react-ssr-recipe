import React from 'react';
import ReactDOMServer from 'react-dom/server';

import express from 'express';
import { StaticRouter } from 'react-router-dom';
import App from './App';

const app = express();

// SSR을 처리할 핸들러 함수.
const serverRender = (req, res, next) =>{
    // 이 함수는 404가 떠야하는 상황에서 404를 띄우지 않고
    // SSR을 해줌.
    const context = {};
    const jsx = (
        // StaticRouter 주로 SSR 용도로 사용되는 라우터
        <StaticRouter location={req.url} context={context}>
            <App/>
        </StaticRouter>
    );
    const root = ReactDOMServer.renderToString(jsx); // 렌더링
    res.send(root); // 클라이언트에 결과물 응답
}

app.use(serverRender);

// 4000번 포트로 서버 가동
app.listen(4000, ()=>{
    console.log('Running on https://localhost:4000');
})
