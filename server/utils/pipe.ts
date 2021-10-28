function pipe(...functions: any): any {
  return (first_value: any) =>
    functions.reduce((prev_value: any, func: any) => func(prev_value), first_value);
}

export default pipe;
