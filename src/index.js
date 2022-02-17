import { readFileSync } from 'fs';
import path from 'path';
import diff from './diff.js';
import parsers from './parsers.js';
import getFormat from './formatters/index.js';

const gendiff = (filepath1, filepath2, format = 'stylish') => {
  const pathOne = path.resolve(filepath1);
  const pathTwo = path.resolve(filepath2);
  const dateOne = readFileSync(pathOne);
  const dateTwo = readFileSync(pathTwo);
  const extOne = path.extname(filepath1);
  const extTwo = path.extname(filepath2);

  const obj1 = parsers(dateOne, extOne);
  const obj2 = parsers(dateTwo, extTwo);

  const result = diff(obj1, obj2);

  return getFormat(result, format);
};

export default gendiff;
