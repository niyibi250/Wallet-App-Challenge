import { RiLogoutBoxRLine } from "react-icons/ri";

export function Logout() {

  return (
    <div className="flex flex-row items-center gap-2 pb-3 pr-4 pl-8 pt-3 text-lg font-semibold text-Grey-50 hover:text-primary hover:border hover:border-primary">
      <RiLogoutBoxRLine/>    
      <div>Logout</div>
    </div>
  );
}