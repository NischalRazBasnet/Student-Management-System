import Joi from 'joi';
import { shifts } from '../models/Student.js';
import { levels } from '../models/Course.js';
import validate from 'express-joi-validation';

export const validates = validate.createValidator({});

export const studentValidationSchema = Joi.object({
  firstName: Joi.string().min(3).max(20).trim().required(),
  lastName: Joi.string().min(3).max(20).trim().required(),
  age: Joi.number().integer().min(14).max(40).required(),
  address: Joi.string().min(5).max(50).trim().required(),
  email: Joi.string()
    .email({ tlds: { allow: true } })
    .required(),
  phoneNo: Joi.string()
    .pattern(/^[0-9]{10}$/)
    .message('Phone number must be 10 digits')
    .required(),
  course: Joi.string().required(),
  shift: Joi.string()
    .valid(...shifts)
    .required(),
}).unknown(true);

export const courseValidationSchema = Joi.object({
  title: Joi.string().min(4).max(50).trim().required(),
  description: Joi.string()
    .min(15)
    .message('Must be at least 15 charaters')
    .trim()
    .required(),
  duration: Joi.number().min(1).required(),
  level: Joi.string()
    .valid(...levels)
    .required(),
}).unknown(true);
