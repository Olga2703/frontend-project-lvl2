import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import yaml from 'js-yaml';
import diff from '../src/diff.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const getFixturePath = (filenames) => path.join(__dirname, '..', '__fixtures__', filenames);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf8');

let fileJsonOne;
let fileJsonTwo;
let fileYmlOne;
let fileYmlTwo;
let expected;

beforeAll(() => {
  fileJsonOne = readFile('file1.json');
  fileJsonTwo = readFile('file2.json');
  fileYmlOne = readFile('file1.yaml');
  fileYmlTwo = readFile('file2.yaml');
  expected = readFile('resultJson.txt');
});

describe('gendiff', () => {
  test('diff into JSON', () => {
    const file1ToObj = JSON.parse(fileJsonOne);
    const file2ToObj = JSON.parse(fileJsonTwo);
    const result = diff(file1ToObj, file2ToObj);
    expect(result).toEqual(expected);
  });

  test('diff into YML', () => {
    const file1ToObj = yaml.load(fileYmlOne);
    const file2ToObj = yaml.load(fileYmlTwo);
    const result = diff(file1ToObj, file2ToObj);
    expect(result).toEqual(expected);
  });
});
