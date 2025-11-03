# node-grep

A simple grep-like tool written in Node.js that searches for a pattern in one or more files and displays matching lines.

## Installation

Link the package to make the `ngrep` command available globally:

```bash
npm link
```

## Usage

```bash
ngrep <pattern> [-i] <file1> [file2] ...
```

### Options

- `-i` : Case-insensitive search (ignore case)

### Examples

**Search in a single file:**
```bash
ngrep "hello" input.txt
```

**Search in multiple files:**
```bash
ngrep "hello" input.txt output.txt
```

**Case-insensitive search:**
```bash
ngrep -i "Hello" input.txt
```

**Case-insensitive search in multiple files:**
```bash
ngrep "hello" -i file1.txt file2.txt file3.txt
```

When searching multiple files, results are displayed with the filename prefix (e.g., `filename:line`). Single file searches display results without the filename prefix.
