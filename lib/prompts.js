const inquirer = require('inquirer');

const initialPrompt = () => {
  const questions = [
    {
      type: 'rawlist',
      name: 'choice',
      message: 'Choose an Option?',
      choices: ['Make a Search Query', 'Check Reading List', 'Exit']
    }
  ];
  return inquirer.prompt(questions);
};

const searchGooglePrompt = () => {
  const questions = [
    {
      type: 'input',
      name: 'query',
      message: 'Make a Search Query'
    }
  ];
  return inquirer.prompt(questions);
};

const addToReadingListMenu = () => {
  const questions = [
    {
      type: 'rawlist',
      name: 'choice',
      message: 'Choose Option?',
      choices: ['Add index to Reading List', 'Exit?']
    }
  ];
  return inquirer.prompt(questions);
};

const addIndexToReadingList = () => {
  const questions = [
    {
      type: 'input',
      name: 'index',
      message: 'Add which index to Reading List?'
    }
  ];
  return inquirer.prompt(questions);
};

const showReadingList = () => {
  const questions = [
    {
      type: 'rawlist',
      name: 'choice',
      message: 'Choose Option?',
      choices: ['Show Reading List', 'Exit?']
    }
  ];
  return inquirer.prompt(questions);
};

const readingListMenu = () => {
  const questions = [
    {
      type: 'rawlist',
      name: 'choice',
      message: 'Choose an Option?',
      choices: ['Delete Reading List', 'Exit']
    }
  ];
  return inquirer.prompt(questions);
};

module.exports = {
  initialPrompt,
  searchGooglePrompt,
  addToReadingListMenu,
  addIndexToReadingList,
  showReadingList,
  readingListMenu
};
