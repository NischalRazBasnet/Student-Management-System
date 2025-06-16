import { useState } from 'react';
import { Formik } from 'formik';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { Avatar, Input } from '@material-tailwind/react';
import { useAdminSignUPMutation } from './authApi';
import toast from 'react-hot-toast';
import { NavLink, useNavigate } from 'react-router';

const Setup = () => {
  const [adminSignUP, { isLoading }] = useAdminSignUPMutation();
  const nav = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className='min-h-screen  flex items-center justify-center'>
      <div className='w-full max-w-md bg-gray-900 rounded-xl card-shadow overflow-hidden'>
        <div className='p-8'>
          <div className='text-center mb-8'>
            <Avatar
              src='../public/sms-favicon.svg'
              className='w-20 h-20 mb-2.5'
            />
            <h1 className='text-3xl font-bold text-primary mb-2'>
              EnrollX Setup
            </h1>
            <p className='text-white'>
              Please set up your admin profile to get started
            </p>
          </div>

          <Formik
            initialValues={{
              fullName: '',
              email: '',
              password: '',
            }}
            onSubmit={async (val) => {
              try {
                await adminSignUP(val).unwrap();
                toast.success(`WELCOME TO ENROLLX ${val.fullName}`);
                nav('/login', { replace: true });
              } catch (err) {
                console.log('Setup Error:', err);

                let errorMessage = 'Unknown error occurred.';
                if (err.originalStatus === 400) {
                  errorMessage = 'Api not found';
                } else if (err.data) {
                  errorMessage = err.data.message || JSON.stringify(err.data);
                }
                toast.error(errorMessage);
              }
            }}
          >
            {({ handleSubmit, handleChange, values }) => (
              <form onSubmit={handleSubmit} className='space-y-5'>
                <div>
                  <Input
                    className='input-primary appearance-none !border-primary  focus:!border-primary  text-white placeholder:text-gray-500 placeholder:opacity-80'
                    labelProps={{
                      className: 'before:content-none after:content-none',
                    }}
                    onChange={handleChange}
                    value={values.fullName}
                    name='fullName'
                    placeholder='Full Name'
                  />
                </div>
                <div>
                  <Input
                    className='input-primary appearance-none !border-primary  focus:!border-primary  text-white placeholder:text-gray-500 placeholder:opacity-80'
                    labelProps={{
                      className: 'before:content-none after:content-none',
                    }}
                    onChange={handleChange}
                    value={values.email}
                    name='email'
                    placeholder='Email Address'
                  />
                </div>

                <div>
                  <div className='relative'>
                    <Input
                      className='input-primary appearance-none !border-primary  focus:!border-primary  text-white placeholder:text-gray-500 placeholder:opacity-80'
                      labelProps={{
                        className: 'before:content-none after:content-none',
                      }}
                      onChange={handleChange}
                      name='password'
                      value={values.password}
                      type={showPassword ? 'text' : 'password'}
                      placeholder='Enter Your Password'
                    />
                    <button
                      type='button'
                      className='absolute inset-y-0 right-0 pr-3 flex items-center'
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <FaEyeSlash className='h-5 w-5 text-gray-400' />
                      ) : (
                        <FaEye className='h-5 w-5 text-gray-400' />
                      )}
                    </button>
                  </div>
                </div>

                <button
                  className='primary-button'
                  type='submit'
                  disabled={isLoading}
                >
                  {isLoading && (
                    <span className='loading loading-spinner'></span>
                  )}
                  SIGN Up
                </button>
                <div className='flex items-center justify-center gap-2'>
                  <p>Already have an account?</p>
                  <NavLink to='/login' className={`text-primary`}>
                    Login
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

export default Setup;
