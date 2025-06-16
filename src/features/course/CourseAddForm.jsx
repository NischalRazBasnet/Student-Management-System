import { Formik } from 'formik';
import { useAddCoursesMutation } from '../course/courseApi';
import * as Yup from 'yup';
import toast from 'react-hot-toast';

const courseSchema = Yup.object().shape({
  title: Yup.string().required('Title is required'),
  duration: Yup.number().required('Duration is required'),
  level: Yup.string().required('Level is required'),
  description: Yup.string().required('Description is required'),
});

const CourseAddForm = ({ closeModal }) => {
  const [addCourse, { isLoading }] = useAddCoursesMutation();

  return (
    <Formik
      initialValues={{
        title: '',
        duration: '',
        level: '',
        description: '',
      }}
      onSubmit={async (val) => {
        try {
          await addCourse({
            body: val,
          }).unwrap();
          toast.success('New Course Added Successfully!');
          closeModal();
        } catch (err) {
          toast.error(err.data?.message || err.data);
        }
      }}
      validationSchema={courseSchema}
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
                <span className='label-text'>Title</span>
              </label>
              <input
                type='text'
                name='title'
                value={values.title}
                onChange={handleChange}
                className='input input-bordered w-full'
                required
              />
              {touched.title && errors.title && (
                <p className='text-red-500'>{errors.title}</p>
              )}
            </div>

            <div className='form-control'>
              <label className='label'>
                <span className='label-text'>Duration</span>
              </label>
              <input
                type='number'
                name='duration'
                value={values.duration}
                onChange={handleChange}
                className='input input-bordered w-full'
                required
              />
              {touched.duration && errors.duration && (
                <p className='text-red-500'>{errors.duration}</p>
              )}
            </div>

            <div className='form-control'>
              <label className='label'>
                <span className='label-text'>Level</span>
              </label>
              <select
                name='level'
                value={values.level}
                onChange={(e) => setFieldValue('level', e.target.value)}
                className='select select-bordered w-full'
                required
              >
                <option value='Beginner'>Beginner</option>
                <option value='Intermediate'>Intermediate</option>
                <option value='Advanced'>Advanced</option>
                <option value='Expert'>Expert</option>
              </select>
            </div>
            {touched.level && errors.level && (
              <p className='text-red-500'>{errors.level}</p>
            )}
          </div>

          <div className='form-control md:col-span-2'>
            <label className='label'>
              <span className='label-text'>Description</span>
            </label>
            <textarea
              name='description'
              value={values.description}
              onChange={handleChange}
              className='textarea textarea-bordered w-full h-24'
              required
            ></textarea>
            {touched.description && errors.description && (
              <p className='text-red-500'>{errors.description}</p>
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
              {isLoading ? 'Adding Course...' : 'Add Course'}
            </button>
          </div>
        </form>
      )}
    </Formik>
  );
};

export default CourseAddForm;
