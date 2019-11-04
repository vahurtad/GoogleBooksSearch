const withPreCompression = require('@moxy/next-pre-compression');
const withPlugins = require('next-compose-plugins');

const nextConfiguration = {
  target: 'serverless'
};

module.exports = withPlugins([withPreCompression], nextConfiguration);
