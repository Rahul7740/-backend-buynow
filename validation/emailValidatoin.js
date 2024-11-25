import * as Yup from 'yup';

// Email validation schema
export const emailSchema = Yup.object().shape({
    email: Yup.string()
        .required('Email is required')
        .email('Invalid email format')
        .matches(
            /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
            'Email must contain only valid characters and format'
        )
        .min(5, 'Email must be at least 5 characters long')
        .max(50, 'Email must be at most 50 characters long'),
});