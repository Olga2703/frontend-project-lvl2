import _ from 'lodash';

const findComplexValue = (value) => {
  if (_.isObject(value)) {
    return '[complex value]';
  }
  if (typeof value === 'string') {
    return `'${value}'`;
  }
  return value;
};

const getPath = (value, path) => {
  if (path === '') {
    return `${value.name}`;
  }
  const newPath = `${path}.${value.name}`;
  return newPath;
};
const plain = (dates) => {
  const iter = (nodes, path = '') => {
    const string = nodes
      .map((node) => {
        const types = {
          added: () => `Property '${getPath(node, path)}' was added with value: ${findComplexValue(node.value)}`,
          removed: () => `Property '${getPath(node, path)}' was removed`,
          changed: () => `Property '${getPath(node, path)}' was updated. From ${findComplexValue(node.valueOne)} to ${findComplexValue(node.valueTwo)}`,
          nested: () => iter(node.value, getPath(node, path)),
          unchanged: () => '',
        };
        return types[node.type]();
      })
      .filter((type) => type !== '');
    return string.join('\n');
  };
  return iter(dates);
};

export default plain;
