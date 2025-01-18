import React from 'react';
import { IoCloseCircleOutline } from 'react-icons/io5';
import { Formik, Field, ErrorMessage, Form } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

interface AddAccountCardProps {
  onClose: () => void;
  onSave: (accountData: {
    userid: string;
    accountName: string;
    accountNumber: string;
    accountType: string;
    accountBalance: string;
  }) => void;
}

const AddAccountTable = ({ onClose, onSave }: AddAccountCardProps) => {
  const navigate = useNavigate();
  const validationSchema = Yup.object().shape({
    accountName: Yup.string().required('Account Name is required'),
    accountNumber: Yup.string().required('Account Number is required'),
    accountType: Yup.string().required('Account Type is required'),
    accountBalance: Yup.number()
      .typeError('Account Balance must be a number')
      .required('Account Balance is required'),
  });

  const initialValues = {
    accountName: '',
    accountNumber: '',
    accountType: 'Bank',
    accountBalance: '',
  };

  interface user {
    id: string;
    name: string;
    email: string;
  }

  const handleSubmit = async (values: typeof initialValues) => {
    try {
      const user: user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user') || '') : { id: '', name: '', email: '' };
      const formData = { ...values, userid: user.id};
  
      const response = await axios.post('http://localhost:3000/api/accounts/create', formData);
      console.log('Response:', response.data);
      navigate('/dashboard');
    } catch (error) {
      console.error('Account creation failed:', error);
    }
    onSave({ ...values, userid: localStorage.getItem('userid') || '' });
    onClose();
  };
  

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-Grey-80 bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-lg p-6 md:w-1/2 lg:w-1/3 xl:w-1/4">
        <div className="flex flex-row justify-between">
          <h2 className="text-lg font-bold mb-4">Add Account</h2>
          <IoCloseCircleOutline
            className="w-6 h-6 font-bold text-lg text-Grey-80 hover:text-primary cursor-pointer"
            onClick={onClose}
          />
        </div>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form className="space-y-4">
              <div>
                <label className="block font-semibold" htmlFor="accountName">
                  Account Name
                </label>
                <Field
                  type="text"
                  id="accountName"
                  name="accountName"
                  className="w-full font-semibold text-lg border-2 rounded-lg p-2 mt-1 focus:border-primary focus:outline-none"
                  placeholder="Enter Account Name"
                />
                <ErrorMessage
                  name="accountName"
                  component="div"
                  className="text-Red font-bold text-sm"
                />
              </div>
              <div>
                <label className="block font-semibold" htmlFor="accountNumber">
                  Account Number
                </label>
                <Field
                  type="text"
                  id="accountNumber"
                  name="accountNumber"
                  className="w-full font-semibold text-lg border-2 rounded-lg p-2 mt-1 focus:border-primary focus:outline-none"
                  placeholder="Enter Account Number"
                />
                <ErrorMessage
                  name="accountNumber"
                  component="div"
                  className="text-Red font-bold text-sm"
                />
              </div>
              <div>
                <label className="block font-semibold" htmlFor="accountType">
                  Account Type
                </label>
                <Field
                  as="select"
                  id="accountType"
                  name="accountType"
                  className="w-full font-semibold text-lg border-2 rounded-lg p-2 mt-1 focus:border-primary focus:outline-none"
                >
                  <option value="Bank">Bank</option>
                  <option value="Cash">Cash</option>
                  <option value="MobileMoney">Mobile Money</option>
                </Field>
                <ErrorMessage
                  name="accountType"
                  component="div"
                  className="text-Red font-bold text-sm"
                />
              </div>
              <div>
                <label className="block font-semibold" htmlFor="accountBalance">
                  Account Balance
                </label>
                <Field
                  type="text"
                  id="accountBalance"
                  name="accountBalance"
                  className="w-full font-semibold text-lg border-2 rounded-lg p-2 mt-1 focus:border-primary focus:outline-none"
                  placeholder="Enter Balance"
                />
                <ErrorMessage
                  name="accountBalance"
                  component="div"
                  className="text-Red font-bold text-sm"
                />
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-2 bg-primary text-white rounded-lg font-medium mt-4"
              >
                {isSubmitting ? 'Saving...' : 'Save'}
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default AddAccountTable;
