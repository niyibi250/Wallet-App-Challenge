import { useNavigate } from 'react-router-dom';
const Loginform = () => {
    const navigate = useNavigate();
  return (
        <div className="bg-white p-8 shadow-lg w-full max-w-md h-full">
            <h1 className="text-3xl font-bold text-primary text-center mb-16">
            Money<br />Minder
            </h1>
            <h2 className="text-xl text-Grey-80 font-accent font-bold text-start mb-6">Login</h2>
            <form className="space-y-4 h-full flex flex-col justify-center">
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
                    <a
                    href="/forgot-password"
                    className="text-sm text-primary hover:underline mt-1 block text-right"
                    >
                    Forgot your password?
                    </a>
                </div>
                <button
                    type="submit"
                    className="w-full bg-primary text-white py-2 rounded-lg hover:bg-green-700 transition"
                >
                    Login
                </button>
            </form>
            <div className="flex items-center my-6">
                <hr className="flex-grow border-1 border-Grey-50 mt-3" />
            </div>
            <div className="flex justify-center">
                <div className="font-bold text-Grey-80 text-xl font-accent mx-6">Stay in control of your finances.</div>
            </div>
            <p className="text text-center text-gray-600 mt-6">
                Do not have an account yet?{" "}
                <a onClick={()=>navigate('/signup')} className="text-primary hover:border-b-2 hover:border-primary">
                    Register
                </a>
            </p>
        </div>
  );
};

export default Loginform;

