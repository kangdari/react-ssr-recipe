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

## 데이터 로딩
>데이터 로딩은 API 요청을 의미하며 SSR을 구현할 때 매우 까다로운 문제입니다.
>일반적인 브라우저 환경에서는 API를 요청하고 응답을 받아 리액트 state or 리덕스 스토어에
>넣으면 자동으로 리렌더링되지만 서버의 경우 문자열 형태로 렌더링하는 것이므로
>state나 리덕스 스토어의 상태가 바뀐다고 자동으로 리렌더링되지 않습니다.
>게다가 서버에서는 componentDidMount 같은 라이프사이클 API도 사용할 수 없습니다.

>redux-thunk or reudx-saga 미들웨어를 사용하여 API호출하는 환경에서 SSR 하는 법
>필요한 라이브러리 설치
>yarn add redux react-redux redux-thunk axios

>리덕스 모듈 작성 + redux 적용
>Users, UsersContainer 컴포넌트 작성, Route 설정

## preloadContext 만들기
>현재 getUsers 함수는 UsersContainer의 useEffect 부분에서 호출됩니다.
>클래스형이라면 componentDidMount에서 호출됩니다.
>SSR을 할 때는 useEffect나 componentDidMount에서 정한 작업이 호출X

>서버 환경에서 이러한 작업을 하기 위해 PreloadContext를 만들고 
>이를 사용하는 Preloader 컴포넌트를 만들어 처리해봅시다.

## 서버에서 리덕스 설정 및 PreloadContext 사용

## 스크립트로 스토어 초기 상태 주입하기
>API를 통해 받아 온 데이터를 렌더링하지만, 렌더링하는 과정에서 만들어진 스토어의 상태를
>브라우저에서 재사용하지 못하는 상황임. 서버에서 만들어 준 상태를 브라우저에서 재사용하려면
>현재 스토어 상태를 문자열로 변환한 뒤 스크립트로 주입해주어야 함.

## redux-saga를 사용한 SSR
>$ yarn add redux-saga

> users 모듈에서 redux-saga를 사용해 특정 사용자의 정보 가져오기.

## User, UserContainer 컴포넌트 작성
>connect 대신 useSelector와 useDispatch Hook 사용

>#### useSelector
>connect 함수를 사용하지 않고도 리덕스의 상태 조회 가능
>const res = useSelector(상태 선택 함수)

>#### useDispatch
>컴포넌트 내부에서 스터어의 내장 함수 dispatch를 사용하게 해줌.
>컨테이너 컴포넌트에서 dispatch 해야한다면 이 Hook 사용.
>import { useSelector, useDispatch } from 'react-redux';
>const dispatch = useDispatch();

## redux-saga SSR 작업

## userPreloader 커스텀 Hook 만들어 사용하기

## SSR과 코드 스플리팅

>#### 코드 스플리팅
>코드 스플리팅을 하면 지금 당장 필요한 코드가 아니라면 따로 분리시켜 나중에 필요할 때 불러와 사용할 수 있음.
>이를 통하여 페이지의 로딩 속도를 개선 할 수 있음.

>현재 리액트에서 공식적으로 제공하는 코드 스플리팅 기능인 React.lazy와 Suspense는 SSR을 아직 지원하지 않는다.

>SSR과 코드 스플리팅을 함께 사용할 때는 Loadable Components를 사용.

>필요한 라이브러리 다운

>$ yarn add @loadable/component @loadable/server @loadable/webpack-plugin @loadable/babel-plugin


