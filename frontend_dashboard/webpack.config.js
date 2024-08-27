const path = require('path');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');

const isDevelopment = process.env.NODE_ENV !== 'production';

module.exports = {
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'public'),
        filename: 'bundle.js',
    },
    mode: isDevelopment ? 'development' : 'production',
    devtool: isDevelopment ? 'eval-source-map' : 'source-map',
    devServer: {
        static: path.resolve(__dirname, 'public'), // Updated from contentBase to static
        hot: true,
        open: true,
        port: 3000,
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env', '@babel/preset-react'],
                        plugins: [isDevelopment && require.resolve('react-refresh/babel')].filter(Boolean),
                    },
                },
            },
            {
                test: /\.css$/,  // Handle CSS files
                use: ['style-loader', 'css-loader'],
            },
        ],
    },
    plugins: [
        isDevelopment && new ReactRefreshWebpackPlugin(),
    ].filter(Boolean),
};
