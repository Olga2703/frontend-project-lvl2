import { readFileSync } from 'fs';
import path from 'path';
import diff from './diff.js';

const gendiff = (filepath1, filepath2) => {
  const pathOne = path.resolve(filepath1);
  const pathTwo = path.resolve(filepath2);
  const jsonOne = readFileSync(pathOne);
  const jsonTwo = readFileSync(pathTwo);

  const obj1 = JSON.parse(jsonOne);
  const obj2 = JSON.parse(jsonTwo);

  const result = diff(obj1, obj2);
  console.log(result);
};

export default gendiff;
