import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { CategoriesProvider } from './utils/CategoriesContext.tsx';
import { TransactionsProvider } from './utils/TransactionsContext.tsx';
import { AccountProvider } from './utils/AccountContext.tsx';
import { BudgetProvider } from './utils/BudgetContext.tsx';
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <TransactionsProvider>
      <CategoriesProvider>
        <AccountProvider>
          <BudgetProvider>
         <App />
          </BudgetProvider>
        </AccountProvider>
      </CategoriesProvider>
    </TransactionsProvider>
  </StrictMode>,
)
