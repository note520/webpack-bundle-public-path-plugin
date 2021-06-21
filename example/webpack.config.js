const path = require('path');
const { VueLoaderPlugin } = require('vue-loader');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin'); // 复制html模板注入
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const WebpackBundlePublicPathPlugin = require('../src/index');

const webpackConfig = {
    entry: {
        'app': path.resolve(__dirname, 'src', 'main.js'),
        // 'index': path.resolve(__dirname, 'src', 'index.js'),
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].js',
        // publicPath: "http://localhost/webpackCode/webpack-bundle-public-path-plugin/example/dist/"
        // 为动态加载的 Chunk 配置输出文件的名称
        // chunkFilename: '[name].bundle.js',
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader'
            },
            {
                test: /\.(js)$/,
                include: [
                    path.resolve(__dirname, 'src')
                ],
                exclude: [
                    path.resolve(__dirname, '../node_modules')
                ],
                loader: require.resolve('babel-loader'),
                options: {
                    presets: ['@babel/preset-env'],
                    plugins: ['@babel/plugin-syntax-dynamic-import']
                }
            },
            // 图片加载
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                loader: 'url-loader',
                // 测试css资源图片
                options: {
                    limit: 10,
                    name: '[name].[hash:7].[ext]'
                }
            },
            // 字体加载
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                loader: 'url-loader',
            },
            // 多媒体
            {
                test: /\.(mp4|webm|ogg|mp3|wav|flac|aac|avi)(\?.*)?$/,
                loader: 'url-loader',
            },
            {
                test: /\.css$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            publicPath: (resourcePath, context) => {
                                return webpackConfig.output.publicPath?webpackConfig.output.publicPath:"";
                            }
                        }
                    },
                    // 'style-loader',
                    'css-loader'
                ]
            }
        ]
    },
    resolve: {
        modules: [
            'node_modules',
            path.resolve(__dirname, 'src')
        ],
        extensions: ['.js', '.json', '.jsx', '.css'],
        alias:{
            '@':'src',
            'vue$': 'vue/dist/vue.esm.js'
        }
    },
    mode: 'production',// 'development'
    optimization: {
        minimize: false,
        splitChunks: {
            chunks: 'async',
            cacheGroups: {
                libs: {
                    name: 'common',
                    test: /[\\/]node_modules[\\/]/,
                    priority: 10,
                    chunks: 'initial' // 只打包初始时依赖的第三方
                },
            }
        },
        runtimeChunk: {
            name: 'common'
        }
    },
    //devtool: 'cheap-module-source-map',
    devtool: false,
    context: __dirname,
    target: 'web',
    stats: 'errors-only',
    plugins: [
        new VueLoaderPlugin(),// 请确保引入这个插件！
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({
            filename: '[name].css',
        }),
        // 顺序问题很重要
        new WebpackBundlePublicPathPlugin(),
        // 配置化模板注入替换
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: 'index.html',
            inject: true,
            minify:false,
            // scriptLoading:"blocking"
        })
    ],
    // externals:{
    //     'Vue': 'Vue',
    //     'element-ui': 'Element',
    // },
}

module.exports = webpackConfig;
