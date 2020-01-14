SSR(Server Side Rendering)
==========================
UI를 서버에서 렌더링하는 것.

#### SSR의 장점
>SEO(Search Engine Optimization) 가능 - 검색 엔진 최적화 가능
>초기 렌더링 성능 개선.

#### SSR 단점
>서버 리소스 사용 - 서버 과부하 발생 가능
>SSR을 하면 프로젝트의 구조가 더 복잡해질 수 있고, 데이터 미리 불러오기, 코드 스플리팅과의 호환 등 고려해야 할 사항이 많아짐.

>Loadable Component 라이브러리에서 제공하는 기능을 사용해 SSR 후 
>필요한 파일의 경로를 추추하여 렌더링 결과에 스크립트/스타일 태그를 삽입

## 웹팩 설정
> 1. eject
> 2. SSR 엔트리 만들기
> 3. SSR 전용 웹팩 환경 설정 작성
> 4. 로더 설정
> 5. node_modules 내부의 라이브러리 불러오기
> 6. webpack-node-externals
> 7. 환경 변수 주입

## 빌드 스크립트 작성
package.json scripts 부분 확인
$ yarn build:server
$ yarn start:server