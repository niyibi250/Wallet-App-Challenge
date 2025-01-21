import { BrowserRouter} from 'react-router-dom';
import AppRoutes from './routes/AppRoutes';
import { ToastContainer } from 'react-toastify';
function App() {

  return (
    <BrowserRouter>
       <ToastContainer/>
       <AppRoutes/>
    </BrowserRouter>
  )
}

export default App
