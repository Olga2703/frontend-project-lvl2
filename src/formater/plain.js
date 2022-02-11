import _ from 'lodash';

const getPath = (value, path) => {
  if (path === '') {
    return `${value.name}`;
  }
  const newPath = `${path}.${value}`;
  return newPath;
};
const plain = (dates) => {
  const iter = (nodes, path = '') => {
    const string = nodes.map((node) => {
      const types = {
        added: () => `Property '${getPath(node, path)}' was added with value: ${node.value}`,
        removed: () => `Property '${getPath(node, path)}' was removed`,
        changed: () => `Property '${getPath(node, path)}' was updated. From ${node.valueOne} to ${node.valueTwo}`,
        nested: () => iter(node.value, ''),
        unchanged: () => '',
      };
      return types[node.type]();
    });
    return string.join('\n');
  };
  return iter(dates);
};

export default plain;
