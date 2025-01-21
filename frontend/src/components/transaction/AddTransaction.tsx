import { IoCloseCircleOutline } from 'react-icons/io5';
import { Formik, Field, ErrorMessage, Form } from 'formik';
import * as Yup from 'yup';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useNavigate } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../../state/hooks';
import { RootState } from '../../state/store';
import { createTransaction } from '../../state/transaction/transactionSlice'; // Adjust path to your transaction slice

interface AddTransactionCardProps {
  onClose: () => void;
}

interface TransactionValues {
  userId: string;
  accountId: string;
  type: string;
  amount: string;
  categoryId: string;
  description: string;
  date: Date | null;
}

const validationSchema = Yup.object().shape({
  type: Yup.string().required('Transaction type is required'),
  description: Yup.string().required('Description is required'),
  categoryId: Yup.string().required('Category is required'),
  accountId: Yup.string().required('Account is required'),
  amount: Yup.number()
    .typeError('Amount must be a number')
    .positive('Amount must be positive')
    .required('Amount is required'),
  date: Yup.date().nullable().required('Date is required'),
});

const initialValues: TransactionValues = {
  userId: '',
  accountId: '',
  type: 'Expense',
  amount: '',
  categoryId: '',
  description: '',
  date: null,
};

const AddTransactiontable = ({ onClose }: AddTransactionCardProps) => {
  const { categories } = useAppSelector((state: RootState) => state.category);
  const { accounts } = useAppSelector((state: RootState) => state.account);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  
  const handleSubmit = async (values: TransactionValues) => {
    try {
      const validType = values.type.toLowerCase() as "income" | "expense" | "saving";
  
      if (!["income", "expense", "saving"].includes(validType)) {
        throw new Error("Invalid transaction type");
      }
  
      const transactionData = {
        account: values.accountId,
        category: values.categoryId,
        subcategory: '',
        amount: parseFloat(values.amount),
        type: validType,
        date: values.date ? values.date.toISOString() : '',
        notes: values.description,
      };
  
      await dispatch(createTransaction({ transactionData }));
      navigate('/dashboard');
      onClose();
    } catch (error) {
      console.error('Transaction creation failed:', error);
    }
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
                      name="categoryId"
                      className="w-full font-semibold text-lg border-2 rounded-lg p-2 mt-1 focus:border-primary focus:outline-none"
                    >
                      {categories && categories.length > 0 ? (
                        categories.map((category) => (
                          <option key={category._id} value={category._id}>
                            {category.name}
                          </option>
                        ))
                      ) : (
                        <option value="">No categories available</option>
                      )}
                    </Field>
                    <ErrorMessage
                      name="categoryId"
                      component="div"
                      className="text-red-500 text-sm mt-1"
                    />
                  </div>
                  <div className="w-1/2">
                    <label className="block font-semibold">Account</label>
                    <Field
                      as="select"
                      name="accountId"
                      className="w-full font-semibold text-lg border-2 rounded-lg p-2 mt-1 focus:border-primary focus:outline-none"
                    >
                      {accounts && accounts.length > 0 ? (
                        accounts.map((account) => (
                          <option key={account._id} value={account._id}>
                            {account.accountName}
                          </option>
                        ))
                      ) : (
                        <option value="">No accounts available</option>
                      )}
                    </Field>
                    <ErrorMessage
                      name="accountId"
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
