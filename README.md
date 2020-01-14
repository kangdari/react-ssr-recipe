SSR(Server Side Rendering)
==========================
UI를 서버에서 렌더링하는 것.

#### SSR의 장점
>SEO(Search Engine Optimization) 가능 - 검색 엔진 최적화 가능
>초기 렌더링 성능 개선.

#### SSR 단점
>서버 리소스 사용 - 서버 과부하 발생 가능
>SSR을 하면 프로젝트의 구조가 더 복잡해질 수 있고, 데이터 미리 불러오기, 코드 스플리팅과의 호환 등 고려해야 할 사항이 많아짐.

Loadable Component 라이브러리에서 제공하는 기능을 사용해 SSR 후 
필요한 파일의 경로를 추추하여 렌더링 결과에 스크립트/스타일 태그를 삽입

## 웹팩 설정
> 1. eject
> 2. SSR 엔트리 만들기
> 3. SSR 전용 웹팩 환경 설정 작성
> 4. 로더 설정
> 5. node_modules 내부의 라이브러리 불러오기
> 6. webpack-node-externals
> 7. 환경 변수 주입

## 빌드 스크립트 작성
>package.json scripts 부분 확인
>$ yarn build:server
>$ yarn start:server

## 서버 코드 작성하기
>SSR을 처리할 서버를 작성, Express 프레임워크 사용
>
>#### StaticRouter
>주로 SSR 용도로 사용되는 라우터

>props로 넣어주는 location 값에 따라 라우팅해 줌.
>context라는 props는 렌더링 컴포넌트에 따라 HTTP 상태 코드 설정.

>빌드, 서버 실행 후 network 탭에서 SSR이 제대로 이루어졌는지 확인 가능.

## 정적 파일 제공하기
>Express에 내장되어 있는 static 미들웨어를 사용하여 서버를 통해 build에 있는 JS, CSS 정적 파일들에 접근 

>JS, CSS 파일을 불러오도록 html에 코드를 삽입해줘야 함.
>yarn build 명령어 실행 후, asset-manifex.json 파일을 참고하여
>"main.js", "main.js", "runtime-main.js", "static/js/2.9ace3854.chunk.js"
>4가지 파일을 html 내부에 삽입해 주어야 함.

>서버 빌드하고 시작하면
>각 페이지는 CSS도 함께 적용되어야 하고, 첫 번째 렌더링은 SSR이 이루어지며,
>이 후 링크를 눌러 이동할 때는 CSR이 되어야 함.