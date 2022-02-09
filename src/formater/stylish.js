import _ from 'lodash';

const indention = '  ';
const getIndention = (countSpace) => indention.repeat(countSpace);

const getString = (value, countSpace) => {
  if (!_.isObject(value)) {
    return value;
  }
  const string = _.keys(value).map(
    (item) => `${getIndention(countSpace + 2)}  ${item}: ${getString(value[item], countSpace + 2)}`
  );
  return `{\n${string.join('\n')}\n${getIndention(countSpace + 1)}}`;
};

const stylish = (dates) => {
  const iter = (nodes, depth = 1) => {
    const string = nodes.map((node) => {
      const types = {
        added: () => `${getIndention(depth)}+ ${node.name}: ${getString(node.value, depth)}`,
        removed: () => `${getIndention(depth)}- ${node.name}: ${getString(node.value, depth)}`,
        changed: () => `${getIndention(depth)}- ${node.name}: ${getString(node.valueOne, depth)}
${getIndention(depth)}+ ${node.name}: ${getString(node.valueTwo, depth)}`,
        unchanged: () => `${getIndention(depth)}  ${node.name}: ${getString(node.value, depth)}`,
        nested: () => `${getIndention(depth)}  ${node.name}: ${iter(node.value, depth + 2)}`,
      };
      return types[node.type]();
    });
    return `{\n${string.join('\n')}\n${getIndention(depth - 1)}}`;
  };
  return iter(dates);
};

export default stylish;
