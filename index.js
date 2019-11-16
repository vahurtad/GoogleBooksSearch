const fetch = require('node-fetch');

const Configstore = require('configstore');
const inquirer = require('inquirer');
const chalk = require('chalk');
const searchQueryOut = require('./CLI/searchQueryOut');
const asciiTitle = require('./CLI/asciitTitle');
const packageJson = require('./package.json');

const { log } = console;
// Create a Configstore instance
const config = new Configstore(packageJson.name);

const checkStatus = res => {
  if (res.ok) {
    log(res.ok, res.status);
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

const sleep = ms => data =>
  new Promise(resolve => setTimeout(resolve, ms, data));

const searchQueryAsk = async () => {
  await inquirer.prompt([searchPrompt]).then(ans => {
    log('Looking for :', chalk.red(ans.query));
    try {
      fetch(
        `https://www.googleapis.com/books/v1/volumes?q=${ans.query}&maxResults=5`
      )
        .then(checkStatus)
        .then(res => res.json())
        .then(sleep(1000))
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
        log('>', config.all);
        log(Object.values(config.all));
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
