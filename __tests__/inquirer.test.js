const inquirer = require('inquirer');
const prompts = require('../lib/prompts');

jest.mock('inquirer');

describe('prompts and validation', () => {
  test('should ask for a search string', async () => {
    inquirer.prompt = jest.fn(() => Promise.resolve({ name: 'search-test' }));
    await prompts.searchGooglePrompt(['must be valid']);
    expect(inquirer.prompt).toHaveBeenCalledTimes(1);
    expect(inquirer.prompt).toHaveBeenCalledWith(expect.any(Array));
  });

  test('should ask for a index', async () => {
    inquirer.prompt = jest.fn(() => Promise.resolve({ name: 'index-test' }));
    await prompts.addIndexToReadingList(['must be valid number']);
    expect(inquirer.prompt).toHaveBeenCalledTimes(1);
    expect(inquirer.prompt).toHaveBeenCalledWith(expect.any(Array));
  });

  test('an index should be a number 0-4', () => {
    expect(prompts.validateNumber(1)).toBe(true);
  });

  test('an index should not be a number >=5 or <0', () => {
    expect(prompts.validateNumber(5)).toBe('Please type a number 0 - 4');
  });
});
