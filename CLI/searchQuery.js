const chalk = require('chalk');

const { log } = console;

module.exports = props => {
  // log('searchquery', args);
  log(props.items.length);
  Object.keys(props.items).map(val =>
    log(
      chalk.bold.blue(props.items[val].volumeInfo.title),
      chalk.red('Authors:'),
      props.items[val].volumeInfo.authors
        ? props.items[val].volumeInfo.authors.map((item, index) => item)
        : 'None',
      chalk.red('Publisher:'),
      props.items[val].volumeInfo.publisher
    )
  );
};
