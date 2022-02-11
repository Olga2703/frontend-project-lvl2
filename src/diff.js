import _ from 'lodash';

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

export default getDiff;
