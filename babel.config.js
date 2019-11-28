const MIN_BABEL_VERSION = 7;

module.exports = (api) => {
    api.assertVersion(MIN_BABEL_VERSION);
    api.cache(true);

    return {
        comments: false,
        presets: [
            [
                '@babel/preset-env',
                {
                    // 'modules': false,
                    'targets': {
                        'node': '6.9.0',
                        'browsers': [
                            'last 2 versions',
                            'Android >=4',
                            'Chrome >=35',
                            'iOS>=8',
                            'not ie <= 8'
                        ]
                    }
                }
            ],
            [
                "minify"
            ]
            // require("@babel/preset-env"),
        ],
        plugins: [
            "add-module-exports",
            "@babel/plugin-syntax-dynamic-import",
        ]
    };
};
