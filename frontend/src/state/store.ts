import { configureStore } from '@reduxjs/toolkit';
import signUpReducer from '../state/Auth/signupSlice';
import signInReducer from '../state/Auth/siginSlice';
import categorySlice from '../state/category/CategorySlice';
import accountSlice from '../state/accounts/accountSlice';
import transactionSlice from '../state/transaction/transactionSlice';
import budgetSlice from '../state/burget/BurgetSlice';

export const store = configureStore({
    reducer: {
        signIn: signInReducer,
        signUp: signUpReducer,
        category: categorySlice,
        account: accountSlice,
        transaction: transactionSlice,
        budget: budgetSlice
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;