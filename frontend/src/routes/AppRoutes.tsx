import { Route, Routes } from 'react-router-dom';
import DashboardLayout from '../layout/DashboardLayout';
import Dashboardpage from '../pages/Dashboardpage';
import BurgetPage from '../pages/BurgetPage';
import TransactionPage from '../pages/TransactionPage';
import Accountpage from '../pages/AccountPage';
import Reportpage from '../pages/ReportPage';
import LoginPage from '../pages/LoginPage';
import SignUpPage from '../pages/SignupPage';
import HomePage from '../pages/HomePage';

function AppRoutes() {
  return (
    <Routes>
        <Route path="/" element={<HomePage/>} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path='/dashboard' element={<DashboardLayout/>}>
           <Route path='/dashboard' element={<Dashboardpage/>}/>
           <Route path='/dashboard/account' element={<Accountpage/>}/>
           <Route path='/dashboard/transaction' element={<TransactionPage/>}/>
           <Route path='/dashboard/burget' element={<BurgetPage/>}/>
           <Route path='/dashboard/report' element={<Reportpage/>}/>
        </Route>
    </Routes>
  )
}

export default AppRoutes