/*
* This file configurates the webpack server used to run the demonstration. Is not required for the functionality of the base library.
*/

const path = require('path');
const fs = require('fs');
const HtmlWebpackPlugin = require('html-webpack-plugin');

// App directory
const appDirectory = fs.realpathSync(process.cwd());

// Gets absolute path of file within app directory
const resolveAppPath = relativePath => path.resolve(appDirectory, relativePath);

// Host
const host = process.env.HOST || 'localhost';

// Required for babel-preset-react-app
process.env.NODE_ENV = 'development';

module.exports = {// Environment mode
    mode: 'development',
  
    // Entry point of app
    entry: resolveAppPath('demo/public'),
  
    output: {
  
      // Development filename output
      filename: 'static/js/bundle.js', //keep this in mind
    },
    devServer: {

        // Serve index.html as the base
        contentBase: resolveAppPath('demo/public'), 
        
       // Enable compression
        compress: true,
    
        // Enable hot reloading
        hot: true,
    
        host,
    
        port: 3000,
    
        // Public path is root of content base
        publicPath: '/',
    
      },

}