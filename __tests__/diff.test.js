import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import yaml from 'js-yaml';
import diff from '../src/diff.js';
import stylish from '../src/formater/stylish.js';
import plain from '../src/formater/plain.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const getFixturePath = (filenames) => path.join(__dirname, '..', '__fixtures__', filenames);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf8');

let fileJsonOne;
let fileJsonTwo;
let fileYmlOne;
let fileYmlTwo;
let expectedStylish;
let expectedPlain;

beforeAll(() => {
  fileJsonOne = readFile('file1.json');
  fileJsonTwo = readFile('file2.json');
  fileYmlOne = readFile('file1.yaml');
  fileYmlTwo = readFile('file2.yaml');
  expectedStylish = readFile('resultStylish.txt');
  expectedPlain = readFile('resultPlain.txt');
});

describe('gendiff', () => {
  test('diff into JSON', () => {
    const file1ToObj = JSON.parse(fileJsonOne);
    const file2ToObj = JSON.parse(fileJsonTwo);
    const result = stylish(diff(file1ToObj, file2ToObj));
    expect(result).toEqual(expectedStylish);
  });

  test('diff into YML', () => {
    const file1ToObj = yaml.load(fileYmlOne);
    const file2ToObj = yaml.load(fileYmlTwo);
    const result = stylish(diff(file1ToObj, file2ToObj));
    expect(result).toEqual(expectedStylish);
  });

  test('diff JSON in format-plain', () => {
    const file1ToObj = JSON.parse(fileJsonOne);
    const file2ToObj = JSON.parse(fileJsonTwo);
    const result = plain(diff(file1ToObj, file2ToObj));
    expect(result).toEqual(expectedPlain);
  });
});
