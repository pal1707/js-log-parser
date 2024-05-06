// logParser.test.js

const fs = require('fs');
const LogParser = require('./logParser');

// Read the log data from the log.txt file
const exampleData = fs.readFileSync('./log.txt', 'utf8');

// Test case to check the getUniqueIPCount method
test('Test getUniqueIPCount', () => {
  const logParser = new LogParser(exampleData);
  // The number of unique IP addresses in the log data should be 10
  expect(logParser.getUniqueIPCount()).toBe(10);
});

// Test case to check the getTopVisitedURLs method
test('Test getTopVisitedURLs', () => {
  const logParser = new LogParser(exampleData);
  // The top 3 most visited URLs in the log data should be '/docs/manage-websites/', 'http://example.net/faq/', and '/intranet-analytics/'
  expect(logParser.getTopVisitedURLs()).toEqual(['/docs/manage-websites/', 'http://example.net/faq/', '/intranet-analytics/']);
});

// Test case to check the getTopActiveIPs method
test('Test getTopActiveIPs', () => {
  const logParser = new LogParser(exampleData);
  // The top 3 most active IP addresses in the log data should be '168.41.191.40', '177.71.128.21', and '50.112.00.11'
  expect(logParser.getTopActiveIPs()).toEqual(['168.41.191.40', '177.71.128.21', '50.112.00.11']);
});
