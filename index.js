const fetch = require('node-fetch');

const inquirer = require('inquirer');
const chalk = require('chalk');
const searchQuery = require('./CLI/searchQuery');

const { log } = console;
let arr = [];

function checkStatus(res) {
  if (res.ok) {
    // res.status >= 200 && res.status < 300
    return res;
  }
  throw new Error("Sorry, there's been a problem. ");
}

module.exports = () => {
  inquirer
    .prompt([
      {
        type: 'input',
        name: 'query',
        message: 'Make a Search Query'
      }
    ])
    .then(ans => {
      log('Looking for :', chalk.red(ans.query));
      try {
        fetch(
          `https://www.googleapis.com/books/v1/volumes?q=${ans.query}&maxResults=5`
        )
          .then(checkStatus)
          .then(res => res.json())
          .then(val => searchQuery(val));
      } catch (e) {
        log('Could not make a query', 'error', e);
      }
    });
};
