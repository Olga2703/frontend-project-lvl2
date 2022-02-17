import yaml from 'js-yaml';

const parser = (date, typeDate) => {
  const type = {
    json: JSON.parse,
    yaml: yaml.load,
    yml: yaml.load,
  };
  return type[typeDate](date);
};

export default parser;
