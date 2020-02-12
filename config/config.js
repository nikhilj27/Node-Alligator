var config = require('./config.json');  // fetch configurations
var env = process.env.NODE_ENV || 'development';  // check environment
var envConfig = config[env];

Object.keys(envConfig).forEach(key => {
    process.env[key] = envConfig[key];
});