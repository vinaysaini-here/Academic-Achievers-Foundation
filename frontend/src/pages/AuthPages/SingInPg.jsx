import { React } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { FaUser, FaLock } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { FaMicrosoft } from "react-icons/fa";
import { NavLink, useNavigate, Link } from "react-router-dom";
import assets from "../../assets/assets";
import { useAuthStore } from "../../store/useAuthStore";

const SingInPg = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { login, isLogin , isAuthenticated} = useAuthStore();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(formData);

  };

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/", { replace: true });
    }
  }, [isAuthenticated, navigate]);

  const handleGoogleLogin = () =>{
    window.location.href = "http://localhost:8000/auth/google";
  }

  return (
    <div className="min-h-screen w-full flex flex-col md:flex-row items-center justify-center bg-gray-50">
      <div className="flex flex-col justify-center items-center md:w-[35vw] p-6 md:p-0">
        <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-md">
          <h2 className="text-2xl font-bold text-center mb-2">SIGN IN</h2>
          <p className="text-center text-gray-500 mb-6">
            Let’s Get Started With Your NGO account
          </p>
          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div className="flex items-center bg-gray-100 rounded-lg px-3">
                <FaUser className="text-gray-400 mr-2" />
                <input
                  type="text"
                  placeholder="Email"
                  className="w-full p-3 bg-transparent focus:outline-none"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                />
              </div>
              <div className="flex items-center bg-gray-100 rounded-lg px-3">
                <FaLock className="text-gray-400 mr-2" />
                <input
                  type="password"
                  placeholder="Password"
                  className="w-full p-3 bg-transparent focus:outline-none"
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                />
              </div>
            </div>
            <div className="w-full flex flex-col mt-2 items-end">
              <Link
                to="/reset-password"
                className="text-sm text-blue-600 underline underline-offset-2 cursor-pointer"
              >
                Forgot Password?
              </Link>
            </div>
            <button
              className="w-full mt-5 bg-gradient-to-r from-purple-500 to-indigo-600 text-white py-3 rounded-lg shadow-lg hover:opacity-90 transition"
              disabled={isLogin}
            >
              {/* Sign In Now */}
              {isLogin ? "Signing In..." : "SignIn Now"}
            </button>
          </form>
          <div className="my-6 flex items-center">
            <div className="flex-grow border-t border-gray-300"></div>
            <span className="mx-4 text-gray-500 text-sm">
              Sign In with Others
            </span>
            <div className="flex-grow border-t border-gray-300"></div>
          </div>
          <div className="space-y-3">
            <button onClick={handleGoogleLogin}
            className="w-full flex items-center justify-center border border-gray-300 rounded-lg py-2 hover:bg-gray-100 transition">
              <FcGoogle className="text-xl mr-2" />
              <span>
                Sign In with <strong>Google</strong>{" "}
              </span>
            </button>
            {/* <button className="w-full flex items-center justify-center border border-gray-300 rounded-lg py-2 hover:bg-gray-100 transition">
              <FaMicrosoft className="text-blue-500 text-xl mr-2" />
              <span>
                Sign In with <strong>Microsoft</strong>
              </span>
            </button> */}
          </div>

          {/* New Member Sign In Button */}
          <div className="mt-4">
            <button
              onClick={() => navigate("/member-signin", { replace: true })}
              className="w-full flex items-center justify-center bg-green-600 text-white py-3 rounded-lg shadow-md hover:bg-green-700 transition"
            >
              Sign In as Member
            </button>
          </div>

          <p className="text-center text-gray-600 mt-6">
            Create an account?{" "}
            <NavLink
              href="/signin"
              className="text-blue-600 font-medium hover:underline"
              onClick={() => navigate("/signup", { replace: true })}
            >
              Sign Up
            </NavLink>
          </p>
        </div>
      </div>

      <div className="justify-center items-center hidden md:flex">
        <img src={assets.logo} alt="NGO Logo" className="max-w-[32vw] w-full" />
      </div>
    </div>
  );
};

export default SingInPg;