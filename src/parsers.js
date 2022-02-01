import yaml from 'js-yaml';

export default (date, extension) => {
  let parser;
  if (extension === '.json') {
    parser = JSON.parse;
  } else if (extension === '.yml' || extension === '.yaml') {
    parser = yaml.load;
  }
  return parser(date);
};
