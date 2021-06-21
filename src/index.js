/**
 * webpack public path 页面运行动态覆盖publicPath
 */
const pluginName = 'WebpackBundlePublicPathPlugin';
const InsertCode = require('./insertCode');// __webpack_public_path__ 取值方式

class WebpackBundlePublicPathPlugin {

    constructor(options){
        this.options = options || {};
        this.insertCode = this.options.dynamicPublicPath?this.options.dynamicPublicPath:InsertCode;// 外部定义
    }

    /**
     * apply 方法会被 webpack compiler 调用，并且在 整个 编译生命周期都可以访问 compiler 对象
     * @param compiler
     */
    apply(compiler) {
        compiler.hooks.thisCompilation.tap(pluginName,compilation=>{
            compilation.mainTemplate.hooks.requireExtensions.tap({
                name:pluginName
            }, (source, chunk, hash)=>{
                return this.buf(this.insertCode, source)
            })
        })
    }

    /**
     * 牛逼 buf
     * @param path
     * @param source
     * @returns {string}
     */
    buf(path, source) {
        let buf = [];
        buf.push(source);
        buf.push('');
        buf.push('// Dynamic assets path override (webpack-bundle-public-path-plugin)');
        buf.push('__webpack_require__.p = (' + path + ') || __webpack_require__.p;');
        return buf.join('\n');
    }
}

module.exports =  WebpackBundlePublicPathPlugin
