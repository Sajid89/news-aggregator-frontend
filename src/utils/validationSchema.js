import * as yup from 'yup';

export const generateValidationSchema = (fields) => {
    return yup.object().shape(
        fields.reduce((acc, field) => {
            switch (field.name) {
                case 'name':
                    acc[field.name] = yup
                        .string()
                        .min(2, 'Name must be at least 2 characters')
                        .max(50, 'Name must be at most 50 characters')
                        .matches(/^[A-Za-z ]+$/, 'Name must only contain letters')
                        .required('Name is required');
                    break;
                case 'email':
                    acc[field.name] = yup
                        .string()
                        .email('Invalid email address')
                        .required('Email is required');
                    break;
                case 'password':
                    acc[field.name] = yup
                        .string()
                        .min(8, 'Password must be at least 8 characters')
                        .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
                        .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
                        .matches(/[0-9]/, 'Password must contain at least one number')
                        .matches(/[@$!%*#?&]/, 'Password must contain at least one special character')
                        .required('Password is required');
                    break;
                case 'confirmPassword':
                    acc[field.name] = yup
                        .string()
                        .oneOf([yup.ref('password'), null], 'Passwords must match')
                        .required('Confirm Password is required');
                    break;
                default:
                    break;
            }
            return acc;
        }, {})
    );
};