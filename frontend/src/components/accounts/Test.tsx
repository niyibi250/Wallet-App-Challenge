import React, { useState, useEffect } from 'react';
import { IoCloseCircleOutline } from 'react-icons/io5';
import { Formik, Field, ErrorMessage, Form } from 'formik';
import * as Yup from 'yup';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useCategories } from '../../utils/CategoriesContext';

interface AddTransactionCardProps {
  onClose: () => void;
  onSave: (values: TransactionValues) => void;
}

interface user {
  id: string;
  name: string;
  email: string;
}

interface TransactionValues {
  userId: string;
  accountName: string;
  type: string;
  amount: string;
  categoryName: string;
  description: string;
  date: Date | null;
}

const AddTransactiontable = ({ onClose, onSave }: AddTransactionCardProps) => {
  const { categories } = useCategories(); // Fetch categories from context
  const navigate = useNavigate();

  const validationSchema = Yup.object().shape({
    type: Yup.string().required('Transaction type is required'),
    description: Yup.string().required('Description is required'),
    categoryName: Yup.string().required('Category is required'),
    accountName: Yup.string().required('Account is required'),
    amount: Yup.number()
      .typeError('Amount must be a number')
      .positive('Amount must be positive')
      .required('Amount is required'),
    date: Yup.date().nullable().required('Date is required'),
  });

  const initialValues = {
    userId: '',
    accountName: '',
    type: 'Expense',
    amount: '',
    categoryName: 'Food', // Default category
    description: '',
    date: null,
  };

  const handleSubmit = async (values: typeof initialValues) => {
    try {
      const user: user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user') || '') : { id: '', name: '', email: '' };
      const formData = { ...values, userId: user.id };
  
      const response = await axios.post('http://localhost:3000/api/transactions/', formData);
      console.log('Response:', response.data);
      navigate('/dashboard');
    } catch (error) {
      console.error('Account creation failed:', error);
    }
    onSave({ ...values, userId: localStorage.getItem('userid') || '' });
    onClose();
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-lg p-6 md:w-1/2 lg:w-1/3 xl:w-1/4">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-bold">Add Transaction</h2>
          <IoCloseCircleOutline
            className="w-6 h-6 text-gray-800 hover:text-primary cursor-pointer"
            onClick={onClose}
          />
        </div>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ values, setFieldValue, isSubmitting }) => (
            <Form>
              <div className="flex justify-between mb-4">
                {['Income', 'Expense', 'Saving'].map((type) => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => setFieldValue('type', type)}
                    className={`flex-1 py-2 font-semibold rounded-lg ${
                      values.type === type
                        ? 'bg-primary text-white'
                        : 'bg-gray-100 text-gray-700'
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
              <div className="space-y-4">
                <div>
                  <label className="block font-semibold">Description</label>
                  <Field
                    type="text"
                    name="description"
                    className="w-full font-semibold text-lg border-2 rounded-lg p-2 mt-1 focus:border-primary focus:outline-none"
                    placeholder="Enter Transaction Description"
                    autoFocus
                  />
                  <ErrorMessage
                    name="description"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>
                <div className="flex space-x-4">
                  <div className="w-1/2">
                    <label className="block font-semibold">Category</label>
                    <Field
                      as="select"
                      name="categoryName"
                      className="w-full font-semibold text-lg border-2 rounded-lg p-2 mt-1 focus:border-primary focus:outline-none"
                    >
                      {/* Render dynamic category options */}
                      {categories && categories.length > 0 ? (
                        categories.map((category) => (
                          <option key={category._id} value={category.categoryName}>
                            {category.categoryName}
                          </option>
                        ))
                      ) : (
                        <option value="">No categories available</option>
                      )}
                    </Field>
                    <ErrorMessage
                      name="categoryName"
                      component="div"
                      className="text-red-500 text-sm mt-1"
                    />
                  </div>
                </div>
                <div className="flex space-x-4">
                  <div className="w-1/2">
                    <label className="block font-semibold">Amount</label>
                    <Field
                      type="number"
                      name="amount"
                      className="w-full font-semibold text-lg border-2 rounded-lg p-2 mt-1 focus:border-primary focus:outline-none"
                      placeholder="$"
                    />
                    <ErrorMessage
                      name="amount"
                      component="div"
                      className="text-red-500 text-sm mt-1"
                    />
                  </div>
                  <div className="w-1/2">
                    <label className="block font-semibold">Date</label>
                    <DatePicker
                      selected={values.date}
                      onChange={(date) => setFieldValue('date', date)}
                      placeholderText="Select Date"
                      className="w-full font-semibold text-lg border-2 rounded-lg p-2 mt-1 focus:border-primary focus:outline-none"
                    />
                    <ErrorMessage
                      name="date"
                      component="div"
                      className="text-red-500 text-sm mt-1"
                    />
                  </div>
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-2 bg-primary text-white rounded-lg font-medium mt-4 hover:bg-green-700 transition"
                >
                  {isSubmitting ? 'Saving...' : 'Save'}
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default AddTransactiontable;
