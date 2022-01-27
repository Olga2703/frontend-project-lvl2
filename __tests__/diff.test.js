import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import diff from '../src/diff.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const getFixturePath = (filenames) => path.join(__dirname, '..', '__fixtures__', filenames);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf8');

test('diff', () => {
  const file1 = readFile('file1.json');
  const file2 = readFile('file2.json');
  const result = diff(file1, file2);
  expect(result).toEqual('');
});
