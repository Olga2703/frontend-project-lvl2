import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import diff from '../src/diff.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const getFixturePath = (filenames) => path.join(__dirname, '..', '__fixtures__', filenames);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf8');

let file1;
let file2;
let expected;

beforeAll(() => {
  file1 = readFile('file1.json');
  file2 = readFile('file2.json');
  expected = readFile('resultJson.txt');
});

test('diff', () => {
  const file1ToObj = JSON.parse(file1);
  const file2ToObj = JSON.parse(file2);
  const result = diff(file1ToObj, file2ToObj);
  expect(result).toEqual(expected);
});
