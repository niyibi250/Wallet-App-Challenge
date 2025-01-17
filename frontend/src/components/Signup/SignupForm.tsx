import { useNavigate } from 'react-router-dom';
const Signupform = () => {
    const navigate = useNavigate();
  return (
        <div className="bg-white p-8 shadow-lg w-full max-w-md h-full">
            <h1 className="text-3xl font-bold text-primary text-center">
            Money<br />Minder
            </h1>
            <h2 className="text-xl text-Grey-80 font-accent font-bold text-start mb-4">Login</h2>
            <form className="space-y-5 h-full flex flex-col justify-center">
                <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-600">
                    UserName
                    </label>
                    <input
                    type="Username"
                    id="username"
                    className="w-full mt-1 px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-400"
                    placeholder="Enter your username"
                    required
                    />
                </div>
                <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-600">
                    Email
                    </label>
                    <input
                    type="email"
                    id="email"
                    className="w-full mt-1 px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-400"
                    placeholder="Enter your email"
                    required
                    />
                </div>
                <div>
                    <label htmlFor="password" className="block text-sm font-medium text-gray-600">
                    Password
                    </label>
                    <input
                    type="password"
                    id="password"
                    className="w-full mt-1 px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-400"
                    placeholder="Enter your password"
                    required
                    />
                </div>
                <button
                    type="submit"
                    className="w-full bg-primary text-white py-2 rounded-lg hover:bg-green-700 transition"
                >
                    Signup
                </button>
            </form>
            <div className="flex items-center my-6">
                <hr className="flex-grow border-1 border-Grey-50 mt-4" />
            </div>
            <div className="flex justify-center space-x-4">
               <div className="font-bold text-Grey-80 text-xl font-accent mx-6">Stay in control of your finances.</div>
            </div>
            <p className="text text-center text-gray-600 mt-6">
                You have an account yet?{" "}
                <a onClick={()=>navigate('/login')} className="text-primary hover:border-b-2 hover:border-primary">
                    Login
                </a>
            </p>
        </div>
  );
};

export default Signupform;

