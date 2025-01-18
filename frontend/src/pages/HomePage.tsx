import { AiOutlineNotification } from "react-icons/ai";
import { GrOverview } from "react-icons/gr";
import { GrTransaction } from "react-icons/gr";
import { GoGoal } from "react-icons/go";
import { TbReportAnalytics } from "react-icons/tb";
import { MdOutlineAccountBalanceWallet } from "react-icons/md";
import { FaArrowRight } from "react-icons/fa6";
import { useNavigate } from 'react-router-dom';
const HomePage = () => {
  const navigate = useNavigate();
    const features = [
        {
            icon: (
              <MdOutlineAccountBalanceWallet className="font-bold text-xl" />
            ),
            title: 'Account Management',
            description: 'Easily manage multiple accounts with our account management feature, allowing you to link, organize, and track your finances from various accounts all in one place.'
        },
        {
          icon: (
            <GrOverview className="font-bold text-xl"/>
          ),
          title: 'Statistical overview',
          description: 'Get a quick snapshot of your financial situation with our statistical overview feature, providing valuable insights at a glance.'
        },
        {
          icon: (
            <GrTransaction className="font-bold text-xl"/>
          ),
          title: 'Track transactions',
          description: 'Easily track and categorize your transactions to monitor your spending habits, helping you make smarter financial decisions.'
        },
        {
          icon: (
            <GoGoal className="font-bold text-xl"/>
          ),
          title: 'Set budget goals',
          description: 'Set clear budget goals to track and manage your expenses, ensuring you stay on target and within your financial limits.'
        },
        {
          icon: (
            <AiOutlineNotification className="font-bold text-xl"/>
          ),
          title: 'Notification on budget limit reached',
          description: 'Receive notifications when you approach or exceed your set budget limits, allowing you to take quick action and avoid overspending.'
        },
        {
          icon: (
            <TbReportAnalytics className="font-bold text-xl"/>
          ),
          title: 'Generate financial report',
          description: 'Generate comprehensive financial reports to understand your spending patterns, income sources, and areas for improvement.'
        },
      ];
      
      

  return (
    <div className="min-h-screen bg-white text-Grey-100 font-accent">
      {/* Navigation */}
      <nav className="flex justify-between items-center p-6">
        <div className="flex items-center space-x-2">
          <div className="text-primary font-bold text-2xl">Smart Wallet</div>
        </div>
        <div className="flex space-x-2">
          <button onClick={()=>navigate('/login')} className=" bg-Grey-30 text-Grey-100 font-bold px-10 py-2 rounded-lg hover:bg-white hover:text-primary hover:border-2 hover:border-primary">Log in</button>
          <button onClick={()=>navigate('/signup')} className="bg-primary px-8 py-2 font-bold rounded-lg text-Grey-5 hover:bg-white hover:text-primary hover:border-2 hover:border-primary">Sign up</button>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="max-w-6xl mx-auto px-4">
        <div className="">
          <div className="text-5xl font-bold mb-4">
            <span className="text-primary font-bold">Revolutionize Finances</span>
            <br />
            <span>Simplify Life</span>
          </div>
          <p className="mb-8 font-accent font-semibold">
            Say goodbye to stress and confusion when managing your finances! Our service offers simple and effective control over your finances, making financial management truly easy and convenient.
          </p>
          <div className="flex">
            <button 
            onClick={()=>navigate('/signup')} 
            className="bg-primary text-Grey-5 font-bold px-6 py-3 rounded-lg hover:bg-white hover:border-2 hover:border-primary hover:text-primary  flex items-center gap-2">
              Get started for free
              <FaArrowRight/>
            </button>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-6xl mx-auto px-4 py-20">
        <div className="mb-12">
          <h2 className="text-3xl font-bold mb-4">
            We offer <span className="text-primary">top features</span>
            <br />
            for financial freedom
          </h2>
          <p className="text-Grey-80 font-semibold">
            Discover the strength of our robust feature set, crafted with precision to empower you in managing your finances and reaching your financial goals.
          </p>
        </div>

        <div className="grid grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <div key={index} className="p-6 rounded-xl bg-Grey-5 border border-primary">
              <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center text-Grey-100 mb-4">
                {feature.icon}
              </div>
              <h3 className="text-xl text-Grey-100 font-semibold mb-2">{feature.title}</h3>
              <p className="text-Grey-80 font-medium mb-4">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
