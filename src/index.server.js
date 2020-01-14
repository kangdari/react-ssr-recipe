import React from "react";
import ReactDOMServer from "react-dom/server";

import express from "express";
import { StaticRouter } from "react-router-dom";
import App from "./App";
import path from "path";
import fs from "fs";

// asset-manifest.json 에서 파일 경로들을 조회
const manifest = JSON.parse(
    fs.readFileSync(path.resolve("./build/asset-manifest.json"), "utf8")
);

const chunks = Object.keys(manifest.files)
    .filter(key => /chunk\.js$/.exec(key)) // chunk.js로 끝나는 키를 찾아서
    .map(key => `<script src=${manifest.files[key]}></script>`)// 스크립트 태그로 변환하고
    .join('')

function createPage(root) {
    return `<!DOCTYPE html>
        <html lang="en">
            <head>
                <meta charset="utf-8" />
                <link rel="icon" href="/favicon.ico" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <meta name="theme-color" content="#000000" />
                <link rel="stylesheet" href="${manifest.files["main.css"]}" />
                <title>React App</title>
            </head>
            <body>
                <noscript>You need to enable JavaScript to run this app.</noscript>
                <div id="root">
                ${root}
                </div>
                <script src="${manifest.files["runtime-main.js"]}"></script>
                ${chunks}
                <script src="${manifest.files["main.js"]}"></script>
            </body>
            </html>
        `;
}

const app = express();

// SSR을 처리할 핸들러 함수.
const serverRender = (req, res, next) => {
    // 이 함수는 404가 떠야하는 상황에서 404를 띄우지 않고
    // SSR을 해줌.
    const context = {};
    const jsx = (
        // StaticRouter 주로 SSR 용도로 사용되는 라우터
        <StaticRouter location={req.url} context={context}>
            <App />
        </StaticRouter>
    );
    const root = ReactDOMServer.renderToString(jsx); // 렌더링
    res.send(createPage(root)); // 클라이언트에 결과물을 응답
};

const serve = express.static(path.resolve('./build'), {
    index: false //  '/' 경로에서 index.html을 보여 주지 않도록 설정
});

app.use(serve); // serverRender 전에 위치 해야함.
app.use(serverRender);

// 4000번 포트로 서버 가동
app.listen(4000, () => {
    console.log("Running on https://localhost:4000");
});
