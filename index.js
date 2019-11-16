const fetch = require('node-fetch');

const Configstore = require('configstore');
const inquirer = require('inquirer');
const chalk = require('chalk');
const searchQueryOut = require('./lib/searchQueryOut');
const asciiTitle = require('./lib/asciitTitle');
const packageJson = require('./package.json');
const util = require('./lib/utils.js');

const { log } = console;
// Create a Configstore instance
const config = new Configstore(packageJson.name);

const checkStatus = res => {
  if (res.ok) {
    log('Connected...');
    // res.status >= 200 && res.status < 300
    return res;
  }
  throw new Error("Sorry, there's been a problem.");
};

const searchPrompt = {
  type: 'input',
  name: 'query',
  message: 'Make a Search Query'
};

const checkReadingList = json =>
  Object.keys(json).length === 0
    ? 'Sorry. Nothing in your Reading List!'
    : json;

const readingListMenu = json => {
  inquirer
    .prompt([
      {
        type: 'rawlist',
        name: 'choice',
        message: 'Choose an Option?',
        choices: ['Delete Reading List', 'Exit']
      }
    ])
    .then(ans => {
      if (ans.choice === 'Delete Reading List') {
        // eslint-disable-next-line no-unused-expressions
        json ? json.clear() : log('Nothing to Delete');
      } else if (ans.choice === 'Exit') {
        log(chalk.cyan('Good Bye 👋\n'));
        process.exit();
      }
    });
};

const searchQueryAsk = async () => {
  await inquirer.prompt([searchPrompt]).then(ans => {
    log('Looking for :', chalk.red(ans.query));
    try {
      fetch(
        `https://www.googleapis.com/books/v1/volumes?q=${ans.query}&maxResults=5`
      )
        .then(checkStatus)
        .then(res => res.json())
        .then(util.sleep(1000))
        .then(val => searchQueryOut(val));
    } catch (e) {
      log('Could not make a query', 'error', e);
    }
  });
};

const initialPrompt = () => {
  inquirer
    .prompt([
      {
        type: 'rawlist',
        name: 'choice',
        message: 'Choose an Option?',
        choices: ['Make a Search Query', 'Check Reading List', 'Exit']
      }
    ])
    .then(ans => {
      if (ans.choice === 'Make a Search Query') {
        searchQueryAsk();
      } else if (ans.choice === 'Check Reading List') {
        log(checkReadingList(config.all));
        readingListMenu();
      } else if (ans.choice === 'Exit') {
        log(chalk.cyan('Good Bye 👋\n'));
        process.exit();
      }
    });
};

module.exports = () => {
  asciiTitle();
  initialPrompt();
};
