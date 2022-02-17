import json from './json.js';
import plain from './plain.js';
import stylish from './stylish.js';

const getFormatted = (date, format) => {
  const formatters = {
    json,
    plain,
    stylish,
  };
  return formatters[format](date);
};

export default getFormatted;
