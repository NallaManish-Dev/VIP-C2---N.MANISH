import AppError from '../utils/AppError.js';

const validateRequest = (schema) => (req, res, next) => {
  const errors = schema(req);

  if (errors.length > 0) {
    throw new AppError(errors[0], 400);
  }

  next();
};

export default validateRequest;
