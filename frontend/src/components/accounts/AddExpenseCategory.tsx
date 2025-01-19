import { IoCloseCircleOutline } from 'react-icons/io5';
import { AiOutlinePlus, AiOutlineMinus } from 'react-icons/ai';
import { Formik, Field, Form, ErrorMessage, FieldArray } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

interface SubCategory {
  name: String,
}
interface AddExpenseCategoryCardProps {
  onClose: () => void;
  onSave: (accountData: {
    userId: string;
    accountName: string
    subcategories?: SubCategory[];
  }) => void;
}

const AddExpenseCategory = ({ onClose}: AddExpenseCategoryCardProps) => {
  const navigate = useNavigate();
  const validationSchema = Yup.object().shape({
    categoryName: Yup.string().required('Category name is required'),
    subcategories: Yup.array()
      .of(Yup.string().required('Subcategory cannot be empty'))
      .min(1, 'At least one subcategory is required'),
  });
  const initialValues = {
    categoryName: '',
    subcategories: [''],
  };

  interface user {
    id: string;
    name: string;
    email: string;
  }
  // const url = 'http://localhost:3000/api'
  const url = 'https://wallet-app-challenge-backend.onrender.com/api'
  const handleSubmit = async (values: typeof initialValues) => {
    try {
      const user: user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user') || '') : { id: '', name: '', email: '' };
      const formData = { ...values, userId: user.id};
  
      const response = await axios.post(`${url}/categories/create`, formData);
      console.log('Response:', response.data);
      navigate('/dashboard');
    } catch (error) {
      console.error('Account creation failed:', error);
    }
    onClose();
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-Grey-80 bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-lg p-6 md:w-1/2 lg:w-1/3 xl:w-1/4 shadow-lg">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-bold">Add Category</h2>
          <IoCloseCircleOutline
            className="w-6 h-6 text-Grey-80 hover:text-primary cursor-pointer"
            onClick={onClose}
            aria-label="Close"
          />
        </div>
        <Formik
          initialValues={{ categoryName: '', subcategories: [] }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ values, isSubmitting }) => (
            <Form className="space-y-4">
              <div>
                <label htmlFor="categoryName" className="block text-Grey-100 font-semibold">
                  Category Name
                </label>
                <Field
                  type="text"
                  id="categoryName"
                  name="categoryName"
                  className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-400"
                  placeholder="Enter Category Name"
                />
                <div className="h-5">
                  <ErrorMessage
                    name="categoryName"
                    component="div"
                    className="text-Red font-accent font-bold text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-Grey-100 font-semibold mb-2">Subcategories</label>
                <FieldArray name="subcategories">
                  {({ push, remove }) => (
                    <>
                      {values.subcategories.map((_subcategory, index) => (
                        <div key={index} className="flex items-center space-x-2 mb-2">
                          <Field
                            name={`subcategories[${index}]`}
                            type="text"
                            className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-400"
                            placeholder="Enter Subcategory Name"
                          />
                          {values.subcategories.length > 1 && (
                            <button
                              type="button"
                              onClick={() => remove(index)}
                              className="text-red-500 hover:text-red-700"
                              aria-label="Remove subcategory"
                            >
                              <AiOutlineMinus className="w-6 h-6" />
                            </button>
                          )}
                        </div>
                      ))}
                      <button
                        type="button"
                        onClick={() => push('')}
                        className="flex items-center text-primary hover:text-Grey-100 mt-2"
                        aria-label="Add subcategory"
                      >
                        <AiOutlinePlus className="w-5 h-5 mr-1" />
                        Add Subcategory
                      </button>
                    </>
                  )}
                </FieldArray>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-primary text-white py-2 rounded-lg hover:bg-green-700 transition"
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

export default AddExpenseCategory;
