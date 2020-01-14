const paths = require("./paths");
const getCSSModuleLocalIdent = require("react-dev-utils/getCSSModuleLocalIdent");
// CSS Module의 고유 className을 만들 때 필요한 옵션

const cssRegex = /\.css$/;
const cssModuleRegex = /\.module\.css$/;
const sassRegex = /\.(scss|sass)$/;
const sassModuleRegex = /\.module\.(scss|sass)$/;

module.exports = {
    mode: "production", // 프로덕션 모드로 설정하여 최적화 옵션들을 활성화
    entry: paths.ssrIndexJs, // 엔트리 경로
    target: "node", // node 환경에서 실행
    output: {
        path: paths.ssrBuild, // 빌드 경로
        filename: "server.js", // 파일 이름
        chunkFilename: "js/[name].chunk.js", // 청크 파일 이름
        publicPath: paths.servedPath // 정적 파일이 제공될 경로
    },
    // 로더 설정
    // 웹팩의 로더는 파일을 불러올 때 확장자에 맞게 필요한 처리를 해줌.
    module: {
        rules: [
            {
                oneOf: [
                    // 자바스크립트를 위한 처리
                    // 기존 webpack.config.js 참고해 작성
                    {
                        test: /\.(js|mjs|jsx|ts|tsx)$/,
                        include: paths.appSrc,
                        loader: require.resolve("babel-loader"),
                        options: {
                            customize: require.resolve(
                                "babel-preset-react-app/webpack-overrides"
                            ),
                            plugins: [
                                [
                                    require.resolve(
                                        "babel-plugin-named-asset-import"
                                    ),
                                    {
                                        loaderMap: {
                                            svg: {
                                                ReactComponent:
                                                    "@svgr/webpack?-svgo,+titleProp,+ref![path]"
                                            }
                                        }
                                    }
                                ]
                            ],
                            cacheDirectory: true,
                            cacheCompression: false,
                            compact: false
                        }
                    },
                    // CSS 처리
                    {
                        test: cssRegex,
                        exclude: cssModuleRegex,
                        // onlyLocals: true 옵션을 설정해야 실제 CSS 파일을 생성하지 않는다.
                        loader: require.resolve("css-loader"),
                        options: {
                            onlyLocals: true
                        }
                    },
                    // CSS Module 처리
                    {
                        test: cssModuleRegex,
                        loader: require.resolve("css-loader"),
                        options: {
                            modules: true,
                            onlyLocals: true,
                            getLocalIdent: getCSSModuleLocalIdent
                        }
                    },
                    // SASS 처리
                    {
                        test: sassRegex,
                        exclude: sassModuleRegex,
                        use: [
                            {
                                loader: require.resolve("css-loader"),
                                options: {
                                    onlyLocals: true
                                }
                            },
                            require.resolve("sass-loader")
                        ]
                    },
                    // Sass + CSS Module을 위한 처리
                    {
                        test: sassRegex,
                        exclude: sassModuleRegex,
                        use: [
                            {
                                loader: require.resolve("css-loader"),
                                options: {
                                    module: true,
                                    onlyLocals: true,
                                    getLocalIdent: getCSSModuleLocalIdent
                                }
                            },
                            require.resolve("sass-loader")
                        ]
                    },
                    // url-loader를 위한 설정
                    {
                        test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
                        loader: require.resolve("url-loader"),
                        options: {
                            emitFile: false, // 파일 따로 저장 안함
                            limit: 10000, // 원래는 9.67KB가 넘어가면 파일로 저장하는데,
                            // emitFlie 값이 false일 때는 경로만 준비하고 파일은 저장 안함.
                            name: "static/media/[name].[hash:8].[ext]"
                        }
                    },
                    // 위에서 설정된 확장자를 제외한 파일은
                    // file-loader를 사용
                    {
                        loader: require.resolve("file-loader"),
                        exclude: [
                            /\.(js|mjs|jsx|ts|tsx)$/,
                            /\.html$/,
                            /\.json$/
                        ],
                        options: {
                            emitFlie: false, // 파일을 따로 저장하지 않는 옵션
                            name: "static/media/[name].[hash:8].[ext]"
                        }
                    }
                ]
            }
        ]
    },
    resolve: {
        modules: ["node_modules"]   // node_modules 내부의 라이브러리를 불러 옴.
        // 라이브러리를 불러오면 빌드할 때 결과물 파일 안에 해당 라이브러리 관련 코드가 함께 번들링 됨.
    },
    // yarn add webpack-node-externals
    // 서버에서는 굳이 결과물 파일안에 리액트 라이브러리가 들어 있지 않아도 됨.
    // 서버를 위해 번들링할 때는 node_modules에서 불러오는 것을 제외하고 번들링하는 것이 좋음
    externals: [nodeExternals()],
    plugins: [
        new webpack.DefinePlugin(env.stringified) // 환경변수 주입
    ]
};
