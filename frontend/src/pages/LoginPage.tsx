import moneyplant from '../assets/images/moneyplant.png'
import Loginform from '../components/Login/Loginform';
const SignUpPage = () => {
  return (
    <div className="min-h-screen min-w-screen bg-Grey-5 flex justify-center items-center">
      <div className="grid grid-cols-4 grid-rows-4 gap-8">
        <div className="col-start-1 col-span-2 row-start-1 row-span-4">
          <img src={moneyplant} alt="Moneyplant" className="hadow-lg w-full max-w-md h-full" />
        </div>
        <div className="col-start-3 col-span-2 row-start-1 row-span-4">
          <Loginform/>
        </div>
      </div>
    </div>
  )
}
export default SignUpPage
