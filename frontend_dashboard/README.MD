1. Initialize the Project

npm init -y

2. Install Dependencies

npm install express react react-dom react-router-dom webpack webpack-cli babel-loader @babel/core @babel/preset-env @babel/preset-react
npm install --save-dev style-loader css-loader
npm install dotenv-webpack --save-dev
npm install --save-dev webpack-dev-server react-refresh @pmmmwh/react-refresh-webpack-plugin
npm install axios
npm install styled-components recharts



npx webpack --mode development

node server.js

3. Project Structure

node-frontend-app/
├── public/
│   └── index.html
├── src/
│   ├── App.js
│   ├── index.js
│   ├── Login.js
│   └── Dashboard.js
├── server.js
├── webpack.config.js
└── .babelrc

8. Build and Run the Project

8.1. Build the Project

npx webpack --mode development

2.2. Start the Express Server

node server.js


http://localhost:3000

.env

PORT=8088
NODE_ENV=development
REACT_APP_BACK_END_HOST=http://192.168.1.99:8089

//note them http://

