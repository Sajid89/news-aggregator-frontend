import React from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import { useFormik } from 'formik';
import { generateValidationSchema } from '../../utils/validationSchema';

import { useDispatch } from 'react-redux';
import { setUser } from '../../features/auth/authSlice';
import api from '../../api/api';

const Login = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const validationSchema = generateValidationSchema([
        { name: 'email' },
        { name: 'password' },
    ]);

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validationSchema,
        onSubmit: async (values, { setSubmitting, setErrors }) => {
            try {
                const response = await api.post('/login', values);
                const { token, user } = response.data.data;

                // Store user info in Redux store
                dispatch(setUser({ user, token }));

                // Save token in localStorage
                localStorage.setItem('accessToken', token);

                toast.success('Login successful! Redirecting...');
                setTimeout(() => {
                    navigate('/');
                }, 2000);
            } catch (error) {
                console.error('Login error:', error);
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
                <h2 className="text-2xl font-bold mb-4">Login</h2>
                <form onSubmit={formik.handleSubmit}>
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
                    <button
                        type="submit"
                        className="w-full p-2 bg-blue-500 text-white rounded"
                        disabled={formik.isSubmitting}
                    >
                        {formik.isSubmitting ? 'Logging in...' : 'Login'}
                    </button>
                </form>

                <div className="mt-4 text-center">
                    <span className="text-gray-700">Don't have an account? </span>
                    <Link to="/register" className="text-blue-500 hover:underline">
                        Register
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Login;