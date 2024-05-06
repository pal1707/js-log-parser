// logParser.js

const fs = require('fs');
const readline = require('readline');

class LogParser {
  constructor(logFilePath) {
    this.logFilePath = logFilePath;
  }

  async getUniqueIPCount() {
    // Using a Set to store unique IP addresses
    const uniqueIPs = new Set();

    // Asynchronously process the log file line by line
    await this.processLogFile(line => {
      // Extracting IP address from each line and adding it to the set
      const ip = line.split(' ')[0];
      uniqueIPs.add(ip);
    });

    // Returning the size of the set, which is the count of unique IP addresses
    return uniqueIPs.size;
  }

  async getTopVisitedURLs() {
    // Using a Map to store URLs and their visit counts
    const urlMap = new Map();

    // Asynchronously process the log file line by line
    await this.processLogFile(line => {
      // Extracting URL from each line and adding it to the map
      const url = line.split('"')[1].split(' ')[1];
      const count = urlMap.get(url) || 0;
      urlMap.set(url, count + 1);
    });

    // Returning the top 3 visited URLs
    return this.getTopItems(urlMap, 3);
  }

  async getTopActiveIPs() {
    // Using a Map to store IP addresses and their activity counts
    const ipMap = new Map();

    // Asynchronously process the log file line by line
    await this.processLogFile(line => {
      // Extracting IP address from each line and adding it to the map
      const ip = line.split(' ')[0];
      const count = ipMap.get(ip) || 0;
      ipMap.set(ip, count + 1);
    });

    // Returning the top 3 active IP addresses
    return this.getTopItems(ipMap, 3);
  }

    //Here, we're using fs.createReadStream() along with the readline module to read the log file line by line. 
  //This way, we don't load the entire file into memory, making it efficient for extremely large log files.
  async processLogFile(callback) {
    // Create a readable stream from the log file
    const inputStream = fs.createReadStream(this.logFilePath);

    // Create a readline interface to read the stream line by line
    const rl = readline.createInterface({
      input: inputStream,
      crlfDelay: Infinity // Detecting line breaks correctly
    });

    // Iterate over each line in the log file
    for await (const line of rl) {
      // Call the callback function with each line
      callback(line);
    }
  }

  // Utility function to get the top items from a Map
  getTopItems(map, count) {
    return [...map.entries()]
      .sort((a, b) => b[1] - a[1]) // Sort by value (count) in descending order
      .slice(0, count) // Take the top 'count' items
      .map(([key]) => key); // Extract only the keys (URLs or IP addresses)
  }
}

module.exports = LogParser;


