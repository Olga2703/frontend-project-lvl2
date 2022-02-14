import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import gendiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const getFixturePath = (filenames) => path.join(__dirname, '..', '__fixtures__', filenames);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf8');

const expectedStylish = readFile('resultStylish.txt');
const expectedPlain = readFile('resultPlain.txt');
const expectedJson = readFile('resultJson.txt');

describe.each([
  ['__fixtures__/file1.json', '__fixtures__/file2.json', 'stylish', expectedStylish],
  ['__fixtures__/file1.json', '__fixtures__/file2.json', 'plain', expectedPlain],
  ['__fixtures__/file1.json', '__fixtures__/file2.json', 'json', expectedJson],
  ['__fixtures__/file1.yaml', '__fixtures__/file2.yaml', 'stylish', expectedStylish],
  ['__fixtures__/file1.yaml', '__fixtures__/file2.yaml', 'plain', expectedPlain],
  ['__fixtures__/file1.yaml', '__fixtures__/file2.yaml', 'json', expectedJson],
])('gendiff', (a, b, c, expected) => {
  test(`diff into ${c}`, () => {
    const result = gendiff(a, b, c);
    expect(result).toEqual(expected);
  });
});
