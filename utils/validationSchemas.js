import Joi from 'joi';
import { shifts } from '../models/Student.js';
import { levels } from '../models/Course.js';
import validate from 'express-joi-validation';

export const validates = validate.createValidator({});

export const adminLoginValidation = Joi.object({
  email: Joi.string()
    .trim()
    .email({ tlds: { allow: true } })
    .required()
    .messages({
      'string.email': 'Please enter a valid email address',
      'string.empty': 'Email cannot be empty',
      'any.required': 'Email is required',
    }),
  password: Joi.string().trim().min(8).max(16).required().messages({
    'string.min': 'Password must be at least 8 characters',
    'string.max': 'Password cannot be more than 16 characters',
    'string.empty': 'Password cannot be empty',
  }),
}).unknown(true);

export const adminSetupValidation = Joi.object({
  fullName: Joi.string().trim().min(3).max(20).required(),
  email: Joi.string()
    .trim()
    .email({ tlds: { allow: true } })
    .required()
    .messages({
      'string.email': 'Please enter a valid email address',
      'string.empty': 'Email cannot be empty',
      'any.required': 'Email is required',
    }),
  password: Joi.string().trim().min(8).max(16).required().messages({
    'string.min': 'Password must be at least 8 characters',
    'string.max': 'Password cannot be more than 16 characters',
    'string.empty': 'Password cannot be empty',
  }),
}).unknown(true);

export const studentValidationSchema = Joi.object({
  firstName: Joi.string().trim().min(3).max(20).required(),
  lastName: Joi.string().trim().min(3).max(20).required(),
  age: Joi.number().integer().min(14).max(40).required(),
  address: Joi.string().trim().min(5).max(50).required(),
  email: Joi.string()
    .trim()
    .email({ tlds: { allow: true } })
    .required(),
  phoneNo: Joi.string()
    .trim()
    .pattern(/^[0-9]{10}$/)
    .required()
    .messages({
      'string.pattern.base': 'Phone number must be exactly 10 digits',
      'string.empty': 'Phone number is required',
    }),
  course: Joi.string().required(),
  shift: Joi.string()
    .valid(...shifts)
    .required(),
}).unknown(true);

export const courseValidationSchema = Joi.object({
  title: Joi.string().trim().min(4).max(50).required(),
  description: Joi.string().trim().min(20).max(150).required().messages({
    'string.min': 'Description must be at least 20 characters',
    'string.max': 'Description cannot be more than 150 characters',
    'string.empty': 'Description cannot be empty',
  }),
  duration: Joi.number().min(1).required(),
  level: Joi.string()
    .valid(...levels)
    .required(),
}).unknown(true);
