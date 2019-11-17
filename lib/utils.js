const chalk = require('chalk');

// format json to return no style using chalk
const formatNoStyle = resp => {
  const str = `${resp.volumeInfo.title} Authors: ${
    resp.volumeInfo.authors
      ? resp.volumeInfo.authors.map(item => item)
      : ' None '
  } Publisher: ${resp.volumeInfo.publisher}`;
  return str;
};

// format json to return using styling with chalk
const formatResponse = resp => {
  const str = `${chalk.bold('\n') +
    chalk.bold.blue(resp.volumeInfo.title) +
    chalk.red(' Authors: ') +
    (resp.volumeInfo.authors
      ? resp.volumeInfo.authors.map(item => item)
      : ' None ') +
    chalk.red(' Publisher: ') +
    resp.volumeInfo.publisher}\n`;
  return str;
};

// function that waits then resolves data
const sleep = ms => data =>
  new Promise(resolve => setTimeout(resolve, ms, data));

module.exports = {
  formatNoStyle,
  formatResponse,
  sleep
};
