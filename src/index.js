import _ from 'lodash';
import { readFileSync } from 'fs';
import * as path from 'path';

const gendiff = (filepath1, filepath2) => {
  const pathOne = path.resolve(filepath1);
  const pathTwo = path.resolve(filepath2);
  const jsonOne = readFileSync(pathOne);
  const jsonTwo = readFileSync(pathTwo);

  const obj1 = JSON.parse(jsonOne);
  const obj2 = JSON.parse(jsonTwo);

  const keysObj1 = _.keys(obj1);
  const keysObj2 = _.keys(obj2);
  const keys = _.sortBy(_.union(keysObj1, keysObj2));

  const result = keys.reduce((acc, key) => {
    if (!_.has(obj1, key)) {
      acc[`+ ${key}`] = obj2[key];
    } else if (!_.has(obj2, key)) {
      acc[`- ${key}`] = obj1[key];
    } else if (obj1[key] !== obj2[key]) {
      acc[`- ${key}`] = obj1[key];
      acc[`+ ${key}`] = obj2[key];
    } else {
      acc[key] = obj1[key];
    }
    return acc;
  }, {});
  console.log(result);

  return result;
};

export default gendiff;
