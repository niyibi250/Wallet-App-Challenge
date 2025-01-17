import { IoSettingsOutline } from "react-icons/io5";

function Settings() {
  return (
    <div className="flex flex-row items-center my-4 text-GreyScale-2 text-lg font-semibold font-accent gap-2 hover:text-White_Smoke">
      <IoSettingsOutline className=""/>
      <div>Settings</div>
    </div>
  )
}

export default Settings