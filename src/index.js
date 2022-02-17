import { readFileSync } from 'fs';
import path from 'path';
import diff from './diff.js';
import parsers from './parsers.js';
import getFormat from './formatters/index.js';

const gendiff = (filepath1, filepath2, format = 'stylish') => {
  const getDate = (filepath) => {
    const normalPath = path.resolve(filepath);
    return readFileSync(normalPath);
  };
  const getTypeDate = (filepath) => path.extname(filepath).slice(1);

  // const pathOne = path.resolve(filepath1);
  // const pathTwo = path.resolve(filepath2);
  // const dateOne = getDate(filepath1);
  // const dateTwo = readFileSync(pathTwo);
  // const typeDateOne = path.extname(filepath1).slice(1);
  // const typeDateTwo = path.extname(filepath2).slice(1);

  const obj1 = parsers(getDate(filepath1), getTypeDate(filepath1));
  const obj2 = parsers(getDate(filepath2), getTypeDate(filepath2));

  const result = diff(obj1, obj2);

  return getFormat(result, format);
};

export default gendiff;
