const fetch = require('node-fetch');
const Configstore = require('configstore');
const chalk = require('chalk');

const searchQueryOut = require('./lib/searchQueryOut');
const asciiTitle = require('./lib/asciitTitle');
const packageJson = require('./package.json');
const util = require('./lib/utils.js');
const prompts = require('./lib/prompts');

const { log } = console;
// Create a Configstore instance
const config = new Configstore(packageJson.name);

// check connection status to google
const checkStatus = res => {
  if (res.ok) {
    log('Connected...');
    // res.status >= 200 && res.status < 300
    return res;
  }
  throw new Error("Sorry, there's been a problem.");
};

// check and clear if the list is not empty else print message
const checkReadingList = json =>
  Object.keys(json).length === 0
    ? 'Sorry. Nothing in your Reading List!'
    : json;

// shows a menu for reading list
const readingListMenu = json => {
  prompts.readingListMenu().then(ans => {
    if (ans.choice === 'Delete Reading List') {
      // eslint-disable-next-line no-unused-expressions
      json ? json.clear() : log('Nothing to Delete');
    } else if (ans.choice === 'Exit') {
      log(chalk.cyan('Good Bye 👋\n'));
      process.exit();
    }
  });
};

// waits on user for input then waits on google for the query result
const searchGoogle = async () => {
  await prompts.searchGooglePrompt().then(ans => {
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

// main function that asks user what they would like to do
const main = () => {
  prompts.initialPrompt().then(ans => {
    if (ans.choice === 'Make a Search Query') {
      searchGoogle();
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
  main();
};
