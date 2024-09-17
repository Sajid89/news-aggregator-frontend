import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import { generateValidationSchema } from '../../utils/validationSchema';
import api from '../../api/api';

const Register = () => {
    const navigate = useNavigate();
    const validationSchema = generateValidationSchema([
        { name: 'name' },
        { name: 'email' },
        { name: 'password' },
        { name: 'confirmPassword' },
    ]);

    const formik = useFormik({
        initialValues: {
            name: '',
            email: '',
            password: '',
            confirmPassword: '',
        },
        validationSchema,
        onSubmit: async (values, { setSubmitting, setErrors }) => {
            try {
                const response = await api.post('/register', values);
                console.log('Register successful:', response.data);
                toast.success('Registration successful! Redirecting to login page...');
                setTimeout(() => {
                    navigate('/login');
                }, 2000);
            } catch (error) {
                console.error('Register error:', error);
                if (error.response && error.response.data) {
                    setErrors({ api: error.response.data.message });
                }
            } finally {
                setSubmitting(false);
            }
        },
    });

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="p-6 bg-white rounded-lg shadow-lg w-full max-w-md">
                <h2 className="text-2xl font-bold mb-4">Register</h2>
                <form onSubmit={formik.handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700">Name</label>
                        <input
                            type="text"
                            name="name"
                            value={formik.values.name}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            className="w-full p-2 border rounded"
                            required
                        />
                        {formik.touched.name && formik.errors.name ? (
                            <div className="text-red-500 text-sm">{formik.errors.name}</div>
                        ) : null}
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Email</label>
                        <input
                            type="email"
                            name="email"
                            value={formik.values.email}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            className="w-full p-2 border rounded"
                            required
                        />
                        {formik.touched.email && formik.errors.email ? (
                            <div className="text-red-500 text-sm">{formik.errors.email}</div>
                        ) : null}
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Password</label>
                        <input
                            type="password"
                            name="password"
                            value={formik.values.password}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            className="w-full p-2 border rounded"
                            required
                        />
                        {formik.touched.password && formik.errors.password ? (
                            <div className="text-red-500 text-sm">{formik.errors.password}</div>
                        ) : null}
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Confirm Password</label>
                        <input
                            type="password"
                            name="confirmPassword"
                            value={formik.values.confirmPassword}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            className="w-full p-2 border rounded"
                            required
                        />
                        {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
                            <div className="text-red-500 text-sm">{formik.errors.confirmPassword}</div>
                        ) : null}
                    </div>
                    <button
                        type="submit"
                        className="w-full p-2 bg-blue-500 text-white rounded"
                        disabled={formik.isSubmitting}
                    >
                        {formik.isSubmitting ? 'Registering...' : 'Register'}
                    </button>
                </form>

                <div className="mt-4 text-center">
                    <span className="text-gray-700">Already have an account? </span>
                    <Link to="/login" className="text-blue-500 hover:underline">
                        Login
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Register;