import { RiLogoutBoxRLine } from "react-icons/ri";
import { useNavigate } from 'react-router-dom';
export function Logout() {
  const navigate = useNavigate();
  return (
    <button 
    onClick={()=>{navigate('/')}}
    className="flex flex-row items-center gap-2 pb-3 pr-4 pl-8 pt-3 text-lg font-semibold text-primary border border-primary hover:bg-primary hover:text-Grey-5">
      <RiLogoutBoxRLine/>    
      <div>Logout</div>
    </button>
  );
}