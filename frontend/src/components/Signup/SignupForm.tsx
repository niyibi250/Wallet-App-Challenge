import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Formik, Field, ErrorMessage, Form} from 'formik';
import * as Yup from 'yup';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import { useAppDispatch } from '../../state/hooks';
import { registerUser } from '../../state/Auth/signupSlice';
import { showSuccessToast } from '../../utils/ToastConfig';
import { AppDispatch } from '../../state/store';


interface FormValues {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}
const validationSchema = Yup.object().shape({
  firstName: Yup.string().required('First name is required'),
  lastName: Yup.string().required('Last name is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string()
    .min(8, 'Password must be at least 8 characters')
    .required('Password is required'),
});

const Signupform = () => {
  const dispatch: AppDispatch = useAppDispatch();
  const navigate = useNavigate();
  const [passwordVisible, setPasswordVisible] = useState(false);
  
   const handleSubmit = async (values: FormValues) => {
      const resultAction = await dispatch(registerUser(values));
      if (registerUser.fulfilled.match(resultAction)) {
        showSuccessToast(`${resultAction.payload.user.lastName} Logged in Successfully`);
        navigate('/dashboard');
      }     
      else if (registerUser.rejected.match(resultAction)) {
        console.error(resultAction.payload || 'Login failed.');
      }
    };

  return (
    <div className="bg-white p-8 shadow-lg w-full h-full">
      <h1 className="text-3xl font-bold text-primary text-center">
        Money<br />Minder
      </h1>
      <h2 className="text-xl text-Grey-80 mb-4 font-bold text-start">Sign Up</h2>
      <Formik
        initialValues={{ firstName: '', lastName: '', email: '', password: '' }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({isSubmitting }) => (
          <Form className="space-y-4 flex flex-col justify-center">
            <div>
              <label htmlFor="firstName" className="block text-Grey-80 font-semibold">
                FirstName
              </label>
              <Field
                type="text"
                id="firstName"
                name="firstName"
                className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-400"
                placeholder="Enter your FirstName"
              />
              <div className="h-5">
                <ErrorMessage
                  name="firstName"
                  component="div"
                  className="text-Red font-accent font-bold text-sm"
                />
              </div>
            </div>
            <div>
              <label htmlFor="lastName" className="block text-Grey-80 font-semibold">
                LastName
              </label>
              <Field
                type="text"
                id="lastName"
                name="lastName"
                className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-400"
                placeholder="Enter your LastName"
              />
              <div className="h-5">
                <ErrorMessage
                  name="lastName"
                  component="div"
                  className="text-Red font-accent font-bold text-sm"
                />
              </div>
            </div>
            <div>
              <label htmlFor="email" className="block text-Grey-80 font-semibold">
                Email
              </label>
              <Field
                type="email"
                id="email"
                name="email"
                className="w-full mt-1 px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-400"
                placeholder="Enter your email"
              />
              <div className="h-5">
                <ErrorMessage
                  name="email"
                  component="div"
                  className="text-Red font-accent font-bold text-sm"
                />
              </div>
            </div>
            <div>
              <label htmlFor="password" className="block text-Grey-80 font-semibold">
                Password
              </label>
              <div className="relative">
                <Field
                  type={passwordVisible ? 'text' : 'password'}
                  id="password"
                  name="password"
                  className="w-full mt-1 px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-400"
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-3 flex items-center text-Grey-80"
                  onClick={() => setPasswordVisible(!passwordVisible)}
                  aria-label={passwordVisible ? 'Hide password' : 'Show password'}
                >
                  {passwordVisible ? <AiOutlineEyeInvisible size={20} /> : <AiOutlineEye size={20} />}
                </button>
              </div>
              <div className="h-5">
                <ErrorMessage
                  name="password"
                  component="div"
                  className="text-Red font-accent font-bold text-sm"
                />
              </div>
            </div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-primary text-white py-2 rounded-lg hover:bg-green-700 transition"
            >
              {isSubmitting  ? 'Submitting...' : 'Sign Up'}
            </button>
          </Form>
        )}
      </Formik>
      <div className="flex items-center">
        <hr className="flex-grow border-1 border-gray-200" />
      </div>
      <div className="flex justify-center space-x-4">
        <div className="font-bold text-gray-800 text-xl mx-6 mt-4">
          Stay in control of your finances.
        </div>
      </div>
      <p className="text-center text-Grey-80">
        Already have an account?{' '}
        <a
          onClick={() => navigate('/login')}
          className="text-primary cursor-pointer hover:border-b-2 hover:border-primary"
        >
          Login
        </a>
      </p>
    </div>
  );
};

export default Signupform;

