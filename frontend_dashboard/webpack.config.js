const path = require('path');
const Dotenv = require('dotenv-webpack');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');

// Ensure that environment variables are loaded properly
const isDevelopment = process.env.NODE_ENV !== 'production';
const port = process.env.PORT || 8088;  // Fallback to 8088 if PORT is not defined
const backEndHost = process.env.REACT_APP_BACK_END_HOST || '10.60.10.193:8089';  // Fallback to localhost:8080 if not defined

// Separate host and port (in case REACT_APP_BACK_END_HOST includes port)
const [host, backendPort] = backEndHost.split(':');

module.exports = {
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'public'),
        filename: 'bundle.js',
    },
    mode: isDevelopment ? 'development' : 'production',
    devtool: isDevelopment ? 'eval-source-map' : 'source-map',
    devServer: {
        static: path.resolve(__dirname, 'public'),
        hot: true,
        open: true,
        port: port,  // Use port from .env or fallback to 8088
        host: host || 'localhost',  // Use extracted host from REACT_APP_BACK_END_HOST
        proxy: [
            {
                context: ['/api'],  // Context for API routes to be proxied
                target: `http://${host}:${backendPort || 8080}`,  // Use the extracted host and port from .env
                changeOrigin: true,
            },
        ],
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
        new Dotenv({
            systemvars: true,  // Ensures environment variables from the system are loaded as well
        }),  // Load environment variables from .env
    ].filter(Boolean),
};