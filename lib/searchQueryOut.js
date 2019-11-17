const chalk = require('chalk');
const Configstore = require('configstore');
const packageJson = require('../package.json');

const utils = require('./utils.js');
const prompts = require('./prompts.js');

const { log } = console;
// Create a Configstore instance
const config = new Configstore(packageJson.name);

// function is called after user asks to add to reading list
// then asks user to show reading list or exit
const afterData = () => {
  prompts
    .showReadingList()
    .then(ans => {
      if (ans.choice === 'Show Reading List') {
        log(config.all);
      } else if (ans.choice === 'Exit?') {
        log(chalk.cyan('Good Bye 👋\n'));
        process.exit();
      }
    })
    .then(utils.sleep(1000));
};

// sets index that user had input to add to the reading list
const setIndexForReadingList = res => {
  log(res.id);
  const key = res.id;
  if (config.has(key)) {
    log('This book is already in your reading list');
  } else {
    config.set(res.id, utils.formatNoStyle(res));
  }
  afterData();
};

// asks user for the index to add to the reading list
const getIndexForReadingList = async ar => {
  await prompts.addIndexToReadingList().then(ans => {
    log(
      chalk.bold.bgYellow.black('Adding to Reading List =>'),
      utils.formatResponse(ar[ans.index])
    );
    return setIndexForReadingList(ar[ans.index]);
  });
};

// shows query with styling after user entered a query search term,
// then asks user if they would like to add an index to the reading list
const formatQuery = query => {
  Object.keys(query).map((val, idx) =>
    log(chalk.bold.bgYellow.black(idx, '=>'), utils.formatResponse(query[val]))
  );

  // ask if user wants to add to reading list
  prompts.addToReadingListMenu().then(ans => {
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
