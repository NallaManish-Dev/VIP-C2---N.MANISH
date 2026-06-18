const emailRegex = /^\S+@\S+\.\S+$/;

export const registerValidator = (req) => {
  const { name, email, password } = req.body;
  const errors = [];

  if (!name || name.trim().length < 3) errors.push('Name must be at least 3 characters');
  if (!email || !emailRegex.test(email)) errors.push('Valid email is required');
  if (!password || password.length < 6) errors.push('Password must be at least 6 characters');

  return errors;
};

export const loginValidator = (req) => {
  const { email, password } = req.body;
  const errors = [];

  if (!email || !emailRegex.test(email)) errors.push('Valid email is required');
  if (!password) errors.push('Password is required');

  return errors;
};
