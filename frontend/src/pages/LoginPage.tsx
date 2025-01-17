import Loginform from "../components/Login/Loginform";
import moneyplant from '../assets/images/moneyplant.png'
const LoginPage = () => {
  return (
    <div className="min-h-screen min-w-screen bg-Grey-5 flex justify-center items-center">
      <div className="flex flex-row justify-center items-center gap-4">
        <div className="flex-shrink-0">
          <img src={moneyplant} alt="Moneyplant" className="h-auto w-auto" />
        </div>
        <div className="flex-shrink-0">
          <Loginform />
        </div>
      </div>
    </div>
  )
}
export default LoginPage;

