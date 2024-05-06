// logParser.js

class LogParser {
    constructor(logData) {
      this.logData = logData;
    }
  
    // Parses the log data and returns an array of objects containing IP addresses and URLs
    parseLog() {
      const lines = this.logData.split('\n');
      const parsedData = [];
  
      lines.forEach(line => {
        const parts = line.split(' ');
        const ip = parts[0];
        const url = parts[6];
        parsedData.push({ ip, url });
      });
  
      return parsedData;
    }
  
    // Returns the number of unique IP addresses in the log data
    getUniqueIPCount() {
      const parsedData = this.parseLog();
      const uniqueIPs = new Set(parsedData.map(entry => entry.ip));
      return uniqueIPs.size;
    }
  
    // Returns an array of the top 3 most visited URLs in the log data
    getTopVisitedURLs() {
      const parsedData = this.parseLog();
      const urlCount = {};
  
      parsedData.forEach(entry => {
        const { url } = entry;
        if (urlCount[url]) {
          urlCount[url]++;
        } else {
          urlCount[url] = 1;
        }
      });
  
      const sortedURLs = Object.keys(urlCount).sort((a, b) => urlCount[b] - urlCount[a]);
      return sortedURLs.slice(0, 3);
    }
  
    // Returns an array of the top 3 most active IP addresses in the log data
    getTopActiveIPs() {
      const parsedData = this.parseLog();
      const ipCount = {};
  
      parsedData.forEach(entry => {
        const { ip } = entry;
        if (ipCount[ip]) {
          ipCount[ip]++;
        } else {
          ipCount[ip] = 1;
        }
      });
  
      const sortedIPs = Object.keys(ipCount).sort((a, b) => ipCount[b] - ipCount[a]);
      return sortedIPs.slice(0, 3);
    }
  }
  
  module.exports = LogParser;
  