const figlet = require('figlet');
const chalk = require('chalk');

const { log } = console;

module.exports = () => {
  log(
    chalk.yellow(figlet.textSync('Google Books', { horizontalLayout: 'full' }))
  );
};
