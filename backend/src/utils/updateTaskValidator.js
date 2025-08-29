
const status = ['todo', 'in-progress', 'done'];

const isValidStatus = (input) => {
  return status.includes(input);
};

export { isValidStatus };
