const chalk = require('chalk');

const formatNoStyle = resp => {
  const str = `${resp.volumeInfo.title} Authors: ${
    resp.volumeInfo.authors
      ? resp.volumeInfo.authors.map(item => item)
      : ' None '
  } Publisher: ${resp.volumeInfo.publisher}`;
  return str;
};

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

const sleep = ms => data =>
  new Promise(resolve => setTimeout(resolve, ms, data));

module.exports = {
  formatNoStyle,
  formatResponse,
  sleep
};
