rootPath = __dirname + "/..";
srcPath = rootPath + "/src/";      
const path = require('path');

const ModuleScopePlugin = require('react-dev-utils/ModuleScopePlugin');

module.exports = {
    entry: srcPath + "index.tsx",
    output: {
        path: rootPath + "/public",
        filename: "bundle.js"
    },
    resolve: {
        modules: [
            'node_modules',
            srcPath + "/components/"
        ],
        extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
        plugins: [
            new ModuleScopePlugin(srcPath),
          ],
    },
    devtool: 'eval-source-map',
    devServer: {
        contentBase: "./public",
        historyApiFallback: true,
    },
    module: {
        strictExportPresence: true,
        rules:[
            {
                test: /\.(ts|tsx)$/,
                loader: require.resolve('tslint-loader'),
                enforce: 'pre',
            },
            {
                test: /\.js$/,
                loader: require.resolve('source-map-loader'),
                enforce: 'pre',
            },
            {
                test: /\.(ts|tsx)$/,
                loader: require.resolve('ts-loader'),
            },
            {
                test: /\.css$/,
                use: [
                    {
                        loader: 'style-loader'
                    },
                    {
                        loader: 'typings-for-css-modules-loader',
                        options: {
                            modules: true,
                            namedExport: true,
                            localIdentName: '[name]_[local]_[hash:base64:5]'
                        }
                    }
                ]
            }
        ],
    },
    plugins: [
    ]

}