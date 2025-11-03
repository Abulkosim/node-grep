# node-grep

A simple grep-like tool written in Node.js that searches for a pattern in a file and displays matching lines.

## Installation

Link the package to make the `ngrep` command available globally:

```bash
npm link
```

## Usage

```bash
ngrep <pattern> <filename>
```

### Example

```bash
ngrep "hello" input.txt
```

This will search for lines containing "hello" in `input.txt` and display numbered results.
