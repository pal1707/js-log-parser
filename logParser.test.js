// logParser.test.js

const LogParser = require('./logParser');

describe('LogParser', () => {
  const logFilePath = './log.txt';
  const logParser = new LogParser(logFilePath);

  test('getUniqueIPCount', async () => {
    const uniqueIPCount = await logParser.getUniqueIPCount();
    expect(uniqueIPCount).toBe(11);
  });

  test('getTopVisitedURLs', async () => {
    const topVisitedURLs = await logParser.getTopVisitedURLs();
    expect(topVisitedURLs).toEqual([
      '/intranet-analytics/',
      'http://example.net/faq/',
      '/this/page/does/not/exist/'
    ]);
  });

  test('getTopActiveIPs', async () => {
    const topActiveIPs = await logParser.getTopActiveIPs();
    expect(topActiveIPs).toEqual([
      '168.41.191.40',
      '177.71.128.21',
      '50.112.00.11'
    ]);
  });
});
