const path = require('path');
const webpack = require('webpack');

module.exports = {
    watch: false,
    entry: path.join(__dirname, '/gallerybuilder.src/src/typescript/index.ts'),
    output: {
        filename: 'index.js',
        publicPath: '/app/',
        path: __dirname + '/gallerybuilder.src/content/js/'
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                loader: 'ts-loader',
                exclude: file => (
                    /node_modules/.test(file)
                )
            },
            {
                test: /\.css$/,
                use: [
                    {
                        loader: 'css-loader',
                        options: {
                            sourceMap: true
                        }
                    }
                ]
            },
            {
                test: /\.scss$/,
                use: [
                    {
                        loader: 'css-loader',
                        options: {
                            sourceMap: true
                        }
                    },
                    {
                        loader: 'sass-loader',
                        options: {
                            sourceMap: true
                        }
                    }
                ]
            }
        ]
    },
    resolve: {
        extensions: [".ts", ".json", ".js", ".scss", ".css"],
    },
    devtool: '#eval-source-map',
    plugins: [
        new webpack.SourceMapDevToolPlugin({
            filename: 'sourcemaps/[file].map',
            fileContext: 'public'
        })
    ]
};

if (process.env.NODE_ENV === 'production') {
    module.exports.devtool = '#source-map';
    module.exports.plugins = (module.exports.plugins || []).concat([
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"production"'
            }
        }),
        new webpack.optimize.UglifyJsPlugin({
            sourceMap: true,
            compress: {
                warnings: false
            }
        }),
        new webpack.LoaderOptionsPlugin({
            minimize: true
        })
    ]);
}