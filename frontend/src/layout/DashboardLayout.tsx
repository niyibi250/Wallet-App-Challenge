import { Outlet } from 'react-router-dom';
import Logo from '../components/dashboard/Logo';
import Navbar from '../components/dashboard/Navbar';
import DashboardHead from '../components/dashboard/DashboardHead';
import { Logout } from '../components/dashboard/Logout';

function DashboardLayout() {
  return (
    <div className='bg-GreyScale-5 min-h-screen flex flex-row '>
        <div className='bg-GreyScale-4 flex flex-col w-72'>
            <div className='pl-8'>
                <Logo/>
            </div>
            <div className=" h-full flex flex-col justify-between pt-5">
                <div className="pl-8">
                    <Navbar/>
                </div>
                <div className="flex flex-row items-center pl-8 mb-4">
                    <Logout/>
                </div>
            </div>
        </div>
        <div className="w-full bg-Grey-5">
            <div className=" border-b-2 border-Grey-30"><DashboardHead/></div>
            <Outlet/>
        </div>
    </div>
  )
}

export default DashboardLayout