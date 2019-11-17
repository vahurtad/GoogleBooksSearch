const utils = require('../lib/utils');
const chalk = require('chalk');

describe('Formatting', () => {
  test('should return a string with no style', async () => {
    const str = {
      volumeInfo: {
        title: 'Title',
        authors: ['Author'],
        publisher: 'Publisher'
      }
    };
    expect(utils.formatNoStyle(str)).toBe(
      'Title Authors: Author Publisher: Publisher'
    );
  });

  // test('should return a string with chalk style', async () => {
  //   const str = {
  //     volumeInfo: {
  //       title: 'Title',
  //       authors: ['Author'],
  //       publisher: 'Publisher'
  //     }
  //   };
  //   expect(utils.formatResponse(str)).toBe(
  //     `\n${chalk.bold.blue('Title')}${chalk.red(
  //       ' Authors: Author Publisher: Publisher'
  //     )}\n`
  //   );
  // });
});
