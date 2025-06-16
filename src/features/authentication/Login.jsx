import { useState } from 'react';
import { Formik } from 'formik';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { Avatar, Input } from '@material-tailwind/react';
import { useAdminLoginMutation } from './authApi';
import toast from 'react-hot-toast';
import { NavLink, useNavigate } from 'react-router';
import { useDispatch } from 'react-redux';
import { setAdmin } from '../admin/adminSlice';

const Login = () => {
  const [adminLogin, { isLoading }] = useAdminLoginMutation();
  const nav = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();

  return (
    <div className='min-h-screen flex items-center justify-center'>
      <div className='w-full max-w-md bg-gray-900 rounded-xl card-shadow overflow-hidden'>
        <div className='p-6 sm:p-8'>
          <div className='text-center mb-6 sm:mb-8'>
            <Avatar
              src='../src/assets/sms-favicon.svg'
              className='w-16 h-16 sm:w-20 sm:h-20 mb-3 mx-auto'
            />
            <h1 className='text-2xl sm:text-3xl font-bold text-primary mb-1 sm:mb-2'>
              EnrollX
            </h1>
            <p className='text-white text-sm sm:text-base'>
              Login to your account
            </p>
          </div>

          <Formik
            initialValues={{
              email: '',
              password: '',
            }}
            onSubmit={async (val) => {
              try {
                const response = await adminLogin(val).unwrap();
                dispatch(setAdmin(response));
                nav('/');
                toast.success(`Welcome ${response.fullName}`);
              } catch (err) {
                console.error('Login Error:', err);

                let errorMessage = 'Something went wrong';

                if (err.originalStatus === 404) {
                  errorMessage = 'API endpoint not found';
                } else if (err.data) {
                  errorMessage = err.data.message || JSON.stringify(err.data);
                }

                toast.error(errorMessage);
              }
            }}
          >
            {({ handleSubmit, handleChange, values }) => (
              <form onSubmit={handleSubmit} className='space-y-4 sm:space-y-5'>
                <div>
                  <Input
                    className='input-primary appearance-none !border-primary focus:!border-primary text-white placeholder:text-gray-500 placeholder:opacity-80 text-sm sm:text-base'
                    labelProps={{
                      className: 'before:content-none after:content-none',
                    }}
                    onChange={handleChange}
                    value={values.email}
                    name='email'
                    placeholder='Email Address'
                    size='md'
                  />
                </div>

                <div>
                  <div className='relative'>
                    <Input
                      className='  input-primary appearance-none !border-primary focus:!border-primary text-white placeholder:text-gray-500 placeholder:opacity-80 text-sm sm:text-base'
                      labelProps={{
                        className: 'before:content-none after:content-none',
                      }}
                      onChange={handleChange}
                      name='password'
                      value={values.password}
                      type={showPassword ? 'text' : 'password'}
                      placeholder='Enter Your Password'
                      size='md'
                    />
                    <button
                      type='button'
                      className='absolute inset-y-0 right-0 pr-3 flex items-center'
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <FaEyeSlash className='h-4 w-4 sm:h-5 sm:w-5 text-gray-400' />
                      ) : (
                        <FaEye className='h-4 w-4 sm:h-5 sm:w-5 text-gray-400' />
                      )}
                    </button>
                  </div>
                </div>

                <button
                  className={`primary-button w-full py-2.5 text-sm sm:text-base sm:py-3 ${
                    isLoading ? 'opacity-75 cursor-not-allowed' : ''
                  }`}
                  type='submit'
                  disabled={isLoading}
                >
                  {isLoading && (
                    <span className='loading loading-spinner'></span>
                  )}
                  SIGN IN
                </button>
                <div className='flex items-center justify-center gap-2'>
                  <p>Don&apos;t have an account?</p>
                  <NavLink to='/setup' className={`text-primary`}>
                    Create Admin
                  </NavLink>
                </div>
              </form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default Login;
