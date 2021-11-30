const pipe = (...functions): Function => {
  return (first_value) => functions.reduce((prev_value, func) => func(prev_value), first_value);
};

export default pipe;
