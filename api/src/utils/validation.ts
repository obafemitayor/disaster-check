import Joi from 'joi';

export const validateRequest = <T>(data: unknown, schema: Joi.Schema): { 
  error?: string; 
  value?: T 
} => {
  const validation = schema.validate(data, { abortEarly: false });
  
  if (validation.error) {
    const errorMessage = validation.error.details
      .map(detail => detail.message)
      .join(', ');
    return { error: errorMessage };
  }

  return { value: validation.value };
};
