

const CustomButton = ({title, handlepress, containerstyle, textstyle,iconstyle,isloading, icon}:any) => {
  return (
    <button
    className={`${containerstyle}`}
    onClick={handlepress}
    disabled = {isloading}
    >
      <div className="flex flex-row justify-center items-center">
         <div className={`${iconstyle}`}>{icon}</div>
         <div className={`${textstyle}`}>{title}</div>
      </div>
    </button>
  )
}

export default CustomButton