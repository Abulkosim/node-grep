#!/usr/bin/env node
import fs from "fs";
import readline from "readline";

const pattern = process.argv[2];
const filename = process.argv[3];
const isCaseSensitive = process.argv[4] === '-i';

const fileStream = fs.createReadStream(filename);
const readLine = readline.createInterface({
  input: fileStream,
  crlfDelay: Infinity
});

let results = [];

readLine.on('line', (line) => {
  processLine(line);
});

readLine.on('close', () => {
  results.forEach((item, idx) => {
    console.log(`${idx + 1}. "...${item}..."`);
  })
});

const processLine = (line) => {
  const matches = isCaseSensitive
    ? line.includes(pattern)
    : line.toLowerCase().includes(pattern.toLowerCase());

  if (matches) {
    results.push(line);
  }
};