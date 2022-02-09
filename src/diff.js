import _ from 'lodash';

// const getDiff = (obj1, obj2) => {
//   const keysObj1 = _.keys(obj1);
//   const keysObj2 = _.keys(obj2);
//   const keys = _.sortBy(_.union(keysObj1, keysObj2));

//   const result = keys.reduce((acc, key) => {
//     if (!_.has(obj1, key)) {
//       acc[`+ ${key}`] = obj2[key];
//     } else if (!_.has(obj2, key)) {
//       acc[`- ${key}`] = obj1[key];
//     } else if (obj1[key] !== obj2[key]) {
//       acc[`- ${key}`] = obj1[key];
//       acc[`+ ${key}`] = obj2[key];
//     } else {
//       acc[`  ${key}`] = obj1[key];
//     }
//     return acc;
//   }, {});

//   const entries = Object.entries(result);
//   const stringResult = `{\n  ${entries.map((entry) => entry.join(': ')).join('\n  ')}\n}`;
//   return stringResult;
// };

// export default getDiff;

// const stringify = (value, replacer = ' ', spacesCount = 1) => {
//   const iter = (node, depth) => {
//     if (typeof node !== 'object') {
//       return `${node}`;
//     }
//     const rep = replacer.repeat(depth * spacesCount);
//     const repClose = replacer.repeat(depth * spacesCount - spacesCount);
//     const entries = Object.entries(node);
//     const newValue = entries.map(([key, val]) => `${rep}${key}: ${iter(val, depth + 1)}`);
//     return `{\n${newValue.join('\n')}\n${repClose}}`;
//   };
//   return iter(value, 1);
// };

// const data = { hello: 'world', is: true, nested: { count: 5 } };
// console.log(stringify(data, '|-', 2));

const getDiff = (obj1, obj2) => {
  const keysObj1 = _.keys(obj1);
  const keysObj2 = _.keys(obj2);
  const nodes = _.sortBy(_.union(keysObj1, keysObj2));

  const result = nodes.map((node) => {
    if (!_.has(obj1, node)) {
      return {
        name: node,
        value: obj2[node],
        type: 'added',
      };
    }

    if (!_.has(obj2, node)) {
      return {
        name: node,
        value: obj1[node],
        type: 'removed',
      };
    }

    if (_.isPlainObject(obj1[node]) && _.isPlainObject(obj2[node])) {
      return {
        name: node,
        value: getDiff(obj1[node], obj2[node]),
        type: 'nested',
      };
    }

    if (obj1[node] !== obj2[node]) {
      return {
        name: node,
        valueOne: obj1[node],
        valueTwo: obj2[node],
        type: 'changed',
      };
    }

    return {
      name: node,
      value: obj1[node],
      type: 'unchanged',
    };
  });

  return result;
};

// const data1 = { hello: 'world', is: true, nested: { count: 2 } };
// const data2 = { hello: 'world', is: false, nested: { count: 5 } };
// console.log(getDiff(data1, data2));
export default getDiff;
