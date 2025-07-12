const parseRangeParam = (param: string, defaultFrom: number, defaultTo: number) => {

  if (!param) {
    return [defaultFrom, defaultTo];
  }

  const parts = param.toString().split('-').map(Number).filter(n => !isNaN(n));

  if (parts.length === 1) {
    return [parts[0], parts[0]];
  }
  if (parts.length === 2) {
    return [parts[0], parts[1]];
  }
  return [defaultFrom, defaultTo];

};

export default parseRangeParam;


