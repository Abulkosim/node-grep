#!/usr/bin/env node
import fs from "fs";
import readline from "readline";

let { pattern, isCaseSensitive, filenames } = parseCommandLineArgs();

if (!pattern || filenames.length === 0) {
  console.error("Usage: ngrep <pattern> [-i] <file1> [file2] ...");
  process.exit(1);
}

let results = [];
const multipleFiles = filenames.length > 1;

async function processFiles() {
  for (const filename of filenames) {
    await processFile(filename);
  }
  displayResults();
}

function processFile(filename) {
  return new Promise((resolve, reject) => {
    if (!fs.existsSync(filename)) {
      console.error(`Error: File "${filename}" not found`);
      resolve(); 
      return;
    }

    const fileStream = fs.createReadStream(filename);
    const readLine = readline.createInterface({
      input: fileStream,
      crlfDelay: Infinity
    });

    readLine.on('line', (line) => {
      processLine(line, filename);
    });

    readLine.on('close', () => {
      resolve();
    });

    readLine.on('error', (err) => {
      reject(err);
    });
  });
}

function processLine(line, filename) {
  const matches = isCaseSensitive
    ? line.includes(pattern)
    : line.toLowerCase().includes(pattern.toLowerCase());

  if (matches) {
    results.push({ line, filename });
  }
}

function displayResults() {
  results.forEach((item, idx) => {
    const prefix = multipleFiles ? `${item.filename}:` : '';
    console.log(`${idx + 1}. ${prefix}"...${item.line}..."`);
  });
}

function parseCommandLineArgs() {
  let pattern = null;
  let isCaseSensitive = true;
  const filenames = [];

  for (const arg of process.argv.slice(2)) {
    if (arg === '-i') {
      isCaseSensitive = false;
    } else if (arg.startsWith('-')) {
      continue;
    } else if (!pattern) {
      pattern = arg;
    } else {
      filenames.push(arg);
    }
  }

  return { pattern, isCaseSensitive, filenames };
}

processFiles().catch((err) => {
  console.error('Error:', err.message);
  process.exit(1);
});