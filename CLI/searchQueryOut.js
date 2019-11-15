const chalk = require('chalk');
const inquirer = require('inquirer');
const Configstore = require('configstore');
const packageJson = require('../package.json');

const utils = require('./utils.js');

const { log } = console;
const readingList = [];
// Create a Configstore instance
const config = new Configstore(packageJson.name);

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
        log(config.get('one'));
      } else if (ans.choice === 'Back?') {
        log(chalk.cyan('Good Bye 👋\n'));
        process.exit();
      }
    })
    .then(utils.sleep(1000));
};

const setIndexForReadingList = ar => {
  let key = 0;
  if (config.get(key)) {
    key += 1;
    config.set(key, utils.formatNoStyle(ar));
  } else {
    config.set(0, utils.formatNoStyle(ar));
  }

  readingList.push(ar);
  log('setter', readingList.length);
  afterData();
};

const getIndexForReadingList = async ar => {
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
        chalk.bold.bgYellow.black('Adding to Reading List =>'),
        utils.formatResponse(ar[ans.index])
      );
      return setIndexForReadingList(ar[ans.index]);
    });
};

const formatQuery = query => {
  // print response
  Object.keys(query).map((val, idx) => {
    log(chalk.bold.bgYellow.black(idx, '=>'), utils.formatResponse(query[val]));
  });

  // ask if user wants to add to reading list
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
        getIndexForReadingList(query);
      } else if (ans.choice === 'Exit?') {
        log(chalk.cyan('Good Bye 👋\n'));
        process.exit();
      }
    });
};

module.exports = props => {
  formatQuery(props.items);
};
