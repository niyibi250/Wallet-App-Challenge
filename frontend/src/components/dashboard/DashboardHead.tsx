import CustomButton from "../CustomButton"
import { IoMdNotificationsOutline } from "react-icons/io";
import { ProfileDropdown } from "./Profile";

function DashboardHead() {
  return (
    <div className="h-20 flex flex-row justify-between items-center px-5">
        <div className="flex flex-row text-xl text-White_Smoke font-semibold font-accent">
          <div className="text-Grey-80">Today:</div>
          <div className="text-Grey-80">March-5-2024 (Tuesday)</div>
        </div>
        <div className=" flex flex-row items-center gap-2">
           <CustomButton
            handlepress = {()=>{}}
            containerstyle = 'hover:border hover:border-primary rounded-full p-2'
            iconstyle='text-2xl text-Grey-100'
            icon= {<div className="relative"><IoMdNotificationsOutline className="text-2xl" /><div className="absolute top-0 right-0 bg-primary h-2 w-2 rounded-full"></div></div>}
            /> 
            <ProfileDropdown/>
            
        </div>
    </div>
  )
}

export default DashboardHead