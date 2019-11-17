const inquirer = require('inquirer');
const prompts = require('../lib/prompts');

jest.mock('inquirer');

describe('promptForQuerySearch', () => {
  test('should ask for a search string', async () => {
    inquirer.prompt = jest.fn(() => Promise.resolve({ name: 'search-test' }));
    await prompts.searchGooglePrompt(['must be valid']);
    expect(inquirer.prompt).toHaveBeenCalledTimes(1);
    expect(inquirer.prompt).toHaveBeenCalledWith(expect.any(Array));
  });
});
