const chalk = require('chalk');
const inquirer = require('inquirer');

const { log } = console;
const readingList = [];

const getIndexForReadingList = ar => {
  inquirer
    .prompt([
      {
        type: 'input',
        name: 'index',
        message: 'Add which index to Reading List?'
      }
    ])
    .then(ans => {
      log('Adding to Reading List', ar[ans.index]);
      readingList.push(ar[ans.index]);
    });
};

const formatQuery = query => {
  const ar = query;
  Object.keys(ar).map((val, idx) => {
    log(
      chalk.bold(idx, '📚\n'),
      chalk.bold.blue(ar[val].volumeInfo.title),
      chalk.red('💁 Authors:'),
      ar[val].volumeInfo.authors
        ? ar[val].volumeInfo.authors.map((item, index) => item)
        : 'None',
      chalk.red('Publisher:'),
      ar[val].volumeInfo.publisher
    );
  });

  inquirer
    .prompt([
      {
        type: 'rawlist',
        name: 'choice',
        message: 'Choose Option?',
        choices: ['Add index to Reading List', 'Exit?']
      }
    ])
    .then(ans => {
      if (ans.choice === 'Add index to Reading List') {
        getIndexForReadingList(ar);
      } else if (ans.choice === 'Exit?') {
        log(chalk.cyan('Good Bye 👋\n'));
        process.exit();
      }
    });
};

module.exports = props => {
  formatQuery(props.items);
};
