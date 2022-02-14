import yaml from 'js-yaml';

export default (date, extension) => {
  if (extension === '.json') {
    return JSON.parse(date);
  }
  return extension === '.yml' || extension === '.yaml' ? yaml.load(date) : undefined;
};
