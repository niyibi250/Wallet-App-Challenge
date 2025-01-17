import { IoIosHelpCircleOutline } from "react-icons/io";

function Help() {
  return (
    <div className="flex flex-row items-center my-4 text-GreyScale-2 text-lg font-semibold font-accent gap-2 hover:text-White_Smoke">
      <IoIosHelpCircleOutline/>
      <div className="">Help</div>
    </div>
  )
}

export default Help