import { IoCloseCircleOutline } from 'react-icons/io5';
import { Formik, Field, ErrorMessage, Form } from 'formik';
import * as Yup from 'yup';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useCategories } from '../../utils/CategoriesContext';

interface AddBudgetProps {
  onClose: () => void;
  onSave: (values: BudgetValues) => void;
}

interface user {
  id: string;
  name: string;
  email: string;
}
interface BudgetValues {
  categoryName: string;
  amount: string;
  period: number;
  startDate: Date | null;
  endDate: Date | null;
}

const AddBudget = ({ onClose, onSave }: AddBudgetProps) => {
  const { categories } = useCategories();
  const navigate = useNavigate();

  const validationSchema = Yup.object().shape({
    categoryName: Yup.string().required('Category is required'),
    amount: Yup.number()
      .typeError('Amount must be a number')
      .positive('Amount must be positive')
      .required('Amount is required'),
    period: Yup.number()
      .typeError('Period must be a number')
      .positive('Period must be positive')
      .required('Period is required'),
    startDate: Yup.date()
      .nullable()
      .required('Start date is required'),
    endDate: Yup.date()
      .nullable()
      .required('End date is required')
      .min(Yup.ref('startDate'), 'End date cannot be before start date'),
  });

  const initialValues = {
    categoryName: '',
    amount: '',
    period: 1,
    startDate: null,
    endDate: null,
  };

  const handleSubmit = async (values: BudgetValues) => {
    try {
      const user: user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user') || '') : { id: '', name: '', email: '' };
      const formData = { ...values, userId: user.id};
      const response = await axios.post(`http://localhost:3000/api/budgets/`, formData);
      console.log('Response:', response.data);
      navigate('/dashboard');
    } catch (error) {
      console.error('Budget creation failed:', error);
    }
    onSave(values);
    onClose();
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-lg p-6 md:w-1/2 lg:w-1/3 xl:w-1/4">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-bold">Add Budget</h2>
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
              <div className="space-y-4">
                <div>
                  <label className="block font-semibold">Category</label>
                  <Field
                    as="select"
                    name="categoryName"
                    className="w-full font-semibold text-lg border-2 rounded-lg p-2 mt-1 focus:border-primary focus:outline-none"
                  >
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
                <div>
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
                <div>
                  <label className="block font-semibold">Period (in months)</label>
                  <Field
                    type="number"
                    name="period"
                    className="w-full font-semibold text-lg border-2 rounded-lg p-2 mt-1 focus:border-primary focus:outline-none"
                    min={1}
                  />
                  <ErrorMessage
                    name="period"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>
                <div>
                  <label className="block font-semibold">Start Date</label>
                  <DatePicker
                    selected={values.startDate}
                    onChange={(date) => setFieldValue('startDate', date)}
                    dateFormat="yyyy-MM-dd"
                    className="w-full font-semibold text-lg border-2 rounded-lg p-2 mt-1 focus:border-primary focus:outline-none"
                  />
                  <ErrorMessage
                    name="startDate"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>
                <div>
                  <label className="block font-semibold">End Date</label>
                  <DatePicker
                    selected={values.endDate}
                    onChange={(date) => setFieldValue('endDate', date)}
                    dateFormat="yyyy-MM-dd"
                    className="w-full font-semibold text-lg border-2 rounded-lg p-2 mt-1 focus:border-primary focus:outline-none"
                  />
                  <ErrorMessage
                    name="endDate"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
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

export default AddBudget;
