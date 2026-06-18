export const doctorValidator = (req) => {
  const { name, specialization, qualification, experience, fees } = req.body;
  const errors = [];

  if (!name || !name.trim()) errors.push('Doctor name is required');
  if (!specialization || !specialization.trim()) errors.push('Specialization is required');
  if (!qualification || !qualification.trim()) errors.push('Qualification is required');
  if (experience === undefined || Number(experience) < 0) errors.push('Experience must be a positive number');
  if (fees === undefined || Number(fees) < 0) errors.push('Fees must be a positive number');

  return errors;
};
