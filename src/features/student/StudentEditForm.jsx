import { Formik } from 'formik';
import { useUpdateStudentMutation } from './studentApi';
import * as Yup from 'yup';
import toast from 'react-hot-toast';
import { useGetCoursesQuery } from '../course/courseApi';
import { useSelector } from 'react-redux';
import { baseUrl } from '../../app/MainApi';

const studentSchema = Yup.object().shape({
  firstName: Yup.string().required('First Name is required'),
  lastName: Yup.string().required('Last Name is required'),
  age: Yup.number().required('Age is required'),
  address: Yup.string().required('Address is required'),
  email: Yup.string().required('Email is required'),
  phoneNo: Yup.string().required('Contact is required'),
  course: Yup.string().required('Course is required'),
  shift: Yup.string().required('Shift is required'),
  image: Yup.mixed().test('fileType', 'Unsupported File Format', (value) => {
    if (!value) return true;
    return ['image/jpeg', 'image/png', 'image/jpg', 'image/webp'].includes(
      value.type
    );
  }),
});

const StudentEditForm = ({ closeModal, student }) => {
  const [updateStudent, { isLoading }] = useUpdateStudentMutation();
  const { data: courses, isLoading: coursesLoading } = useGetCoursesQuery();

  const { admin } = useSelector((state) => state.adminSlice);

  return (
    <Formik
      initialValues={{
        image: '',
        firstName: student.firstName,
        lastName: student.lastName,
        age: student.age,
        address: student.address,
        email: student.email,
        phoneNo: student.phoneNo,
        course: student.course?._id || '',
        shift: student.shift,
        imagePrev: student.image,
      }}
      onSubmit={async (val) => {
        const formData = new FormData();
        formData.append('firstName', val.firstName);
        formData.append('lastName', val.lastName);
        formData.append('age', val.age);
        formData.append('address', val.address);
        formData.append('email', val.email);
        formData.append('phoneNo', val.phoneNo);
        formData.append('course', val.course);
        formData.append('shift', val.shift);
        try {
          if (val.image) {
            formData.append('image', val.image);
            await updateStudent({
              id: student._id,
              body: formData,
            }).unwrap();
          } else {
            await updateStudent({
              id: student._id,
              token: admin?.token,
              body: formData,
            }).unwrap();
          }
          toast.success('Student Updated successfully!');
          closeModal();
        } catch (err) {
          toast.error(err.data?.message || err.data);
        }
      }}
      validationSchema={studentSchema}
    >
      {({
        handleSubmit,
        handleChange,
        values,
        touched,
        errors,
        setFieldValue,
      }) => (
        <form onSubmit={handleSubmit} className='space-y-4'>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            <div className='form-control'>
              <label className='label'>
                <span className='label-text'>Upload Profile</span>
              </label>
              <input
                onChange={(e) => {
                  const file = e.target.files[0];
                  setFieldValue('imagePrev', URL.createObjectURL(file));
                  setFieldValue('image', file);
                }}
                name='image'
                type='file'
                className='input input-bordered w-full'
              />
              {touched.image && errors.image && (
                <p className='text-red-500'>{errors.image}</p>
              )}
            </div>
            <div>
              {!errors.image && values.imagePrev && (
                <img
                  className='w-[150px] h-[150px] rounded-full object-contain'
                  src={`${baseUrl}${values.imagePrev}`}
                />
              )}
            </div>

            <div className='form-control'>
              <label className='label'>
                <span className='label-text'>First Name</span>
              </label>
              <input
                type='text'
                name='firstName'
                value={values.firstName}
                onChange={handleChange}
                className='input input-bordered w-full'
                required
              />
              {touched.firstName && errors.firstName && (
                <p className='text-red-500'>{errors.firstName}</p>
              )}
            </div>

            <div className='form-control'>
              <label className='label'>
                <span className='label-text'>Last Name</span>
              </label>
              <input
                type='text'
                name='lastName'
                value={values.lastName}
                onChange={handleChange}
                className='input input-bordered w-full'
                required
              />
              {touched.lastName && errors.lastName && (
                <p className='text-red-500'>{errors.lastName}</p>
              )}
            </div>

            <div className='form-control'>
              <label className='label'>
                <span className='label-text'>Age</span>
              </label>
              <input
                type='number'
                name='age'
                value={values.age}
                onChange={handleChange}
                className='input input-bordered w-full'
                min='10'
                max='60'
                required
              />
              {touched.age && errors.age && (
                <p className='text-red-500'>{errors.age}</p>
              )}
            </div>

            <div className='form-control'>
              <label className='label'>
                <span className='label-text'>Contact Number</span>
              </label>
              <input
                type='tel'
                name='phoneNo'
                value={values.phoneNo}
                onChange={handleChange}
                className='input input-bordered w-full'
                required
              />
              {touched.phoneNo && errors.phoneNo && (
                <p className='text-red-500'>{errors.phoneNo}</p>
              )}
            </div>

            <div className='form-control md:col-span-2'>
              <label className='label'>
                <span className='label-text'>Email Address</span>
              </label>
              <input
                type='email'
                name='email'
                value={values.email}
                onChange={handleChange}
                className='input input-bordered w-full'
                required
              />
              {touched.email && errors.email && (
                <p className='text-red-500'>{errors.email}</p>
              )}
            </div>

            <div className='form-control md:col-span-2'>
              <label className='label'>
                <span className='label-text'>Address</span>
              </label>
              <textarea
                name='address'
                value={values.address}
                onChange={handleChange}
                className='textarea textarea-bordered w-full h-24'
                required
              ></textarea>
              {touched.address && errors.address && (
                <p className='text-red-500'>{errors.address}</p>
              )}
            </div>

            <div className='form-control'>
              <label className='label'>
                <span className='label-text'>Enrolled Course</span>
              </label>
              <select
                name='course'
                value={values.course}
                onChange={(e) => setFieldValue('course', e.target.value)}
                className='select select-bordered w-full'
                required
                disabled={coursesLoading}
              >
                <option value='' disabled>
                  {coursesLoading ? 'Loading courses...' : 'Select a course'}
                </option>
                {courses?.map((course) => (
                  <option key={course._id} value={course._id}>
                    {course.title}
                  </option>
                ))}
              </select>
              {touched.course && errors.course && (
                <p className='text-red-500'>{errors.course}</p>
              )}
            </div>

            <div className='form-control'>
              <label className='label'>
                <span className='label-text'>Shift</span>
              </label>
              <select
                name='shift'
                value={values.shift}
                onChange={(e) => setFieldValue('shift', e.target.value)}
                className='select select-bordered w-full'
                required
              >
                <option value='Morning'>Morning</option>
                <option value='Day'>Day</option>
                <option value='Evening'>Evening</option>
              </select>
            </div>
            {touched.shift && errors.shift && (
              <p className='text-red-500'>{errors.shift}</p>
            )}
          </div>

          <div className='modal-action mt-6'>
            <button
              type='button'
              className='btn btn-ghost'
              onClick={closeModal}
            >
              Cancel
            </button>

            <button
              type='submit'
              className={`btn btn-primary ${isLoading ? 'loading' : ''}`}
              disabled={isLoading}
            >
              {isLoading ? 'Updating Student...' : 'Update Student'}
            </button>
          </div>
        </form>
      )}
    </Formik>
  );
};

export default StudentEditForm;
