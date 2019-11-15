const chalk = require('chalk');
const inquirer = require('inquirer');

const { log } = console;
const readingList = [];

const sleep = ms => data =>
  new Promise(resolve => setTimeout(resolve, ms, data));

const formatResponse = resp => {
  const str =
    (chalk.bold('📚\n'),
    chalk.bold.blue(resp.volumeInfo.title),
    chalk.red('💁 Authors:'),
    resp.volumeInfo.authors
      ? resp.volumeInfo.authors.map((item, index) => item)
      : 'None',
    chalk.red('Publisher:'),
    resp.volumeInfo.publisher);
  log(str);
};

async function getIndexForReadingList(ar) {
  await inquirer
    .prompt([
      {
        type: 'input',
        name: 'index',
        message: 'Add which index to Reading List?'
      }
    ])
    .then(ans => {
      log(
        'Adding to Reading List =>',
        chalk.bold.blue(ar[ans.index].volumeInfo.title),
        chalk.red(' Authors:'),
        ar[ans.index].volumeInfo.authors
          ? ar[ans.index].volumeInfo.authors.map((item, index) => item)
          : 'None',
        chalk.red('Publisher:'),
        ar[ans.index].volumeInfo.publisher
      );
      return ar[ar.index];
    })
    .then(sleep(1000))
    .then(resp => readingList.push(resp))
    .then(log(readingList));
}

const afterData = () => {
  inquirer
    .prompt({
      type: 'rawlist',
      name: 'choice',
      message: 'Choose Option?',
      choices: ['Show Reading List', 'Back?']
    })
    .then(ans => {
      if (ans.choice === 'Show Reading List') {
        log(readingList);
      } else if (ans.choice === 'Back?') {
        log(chalk.cyan('Good Bye 👋\n'));
        process.exit();
      }
    })
    .then(sleep(1000));
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
        getIndexForReadingList(ar)
          .then(resp => readingList.push(resp))
          .then(log('added to list', readingList))
          .then(sleep(1000));
      } else if (ans.choice === 'Exit?') {
        log(chalk.cyan('Good Bye 👋\n'));
        process.exit();
      }
    })
    .then(sleep(1000));
};

module.exports = props => {
  formatQuery(props.items);
};
