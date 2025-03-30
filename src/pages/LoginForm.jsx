import React, { useContext, useState } from 'react'
import { useLoginMutation } from '../features/user/userSlice';
import { Link, useNavigate } from 'react-router-dom';
import { isAuthenticated } from '../auth/auth';
import { AuthContext } from '../context/AuthContext';
import { toast } from 'react-toastify';

const LoginForm = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        is_restaurant_owner: false,
      });   

      const { isLoggedIn, setIsLoggedIn, setCartItemCount } = useContext(AuthContext);

      const [login, { isLoading, isError }] = useLoginMutation();
      const navigate = useNavigate();
    
      

      const handleChange = (e) => {
        const { name, value, type, checked } = e.target;

        setFormData({
          ...formData,
          [name]: type === 'checkbox' ? checked : value,
        });
      };

        
      const handleSubmit = async(e) => {
        e.preventDefault();
        try {
            const response = await login(formData).unwrap();

            localStorage.setItem("a_token", response.access); 
            localStorage.setItem("r_token", response.refresh); 
            localStorage.setItem("u_id", response.user_id);
            localStorage.setItem("is_ro", response.is_restaurant_owner);
            
            setIsLoggedIn(isAuthenticated());
            setCartItemCount(JSON.parse(localStorage.getItem("cart")) || [])
            navigate("/"); 
          } catch (err) {
            toast.error("Login failed. Please try again.",{
              position: "top-right",
            });
          }
    
        setFormData({
          email: '',
          password: '',
        });
      };
    
      return (
        <div>
          <div>
            <h1 className="text-3xl md:text-3xl lg:text-4xl font-bold text-center pb-5">Login</h1>
            <div className="max-w-xl mx-auto p-6 bg-white shadow-lg rounded-lg">
              <form onSubmit={handleSubmit}>

                <div className="mb-4">
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full mt-1 px-4 py-2 border border-gray-300 bg-white rounded-md"
                    required
                  />
                </div>

                <div className="mb-4">
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full mt-1 px-4 py-2 border border-gray-300 bg-white rounded-md"
                    required
                  />
                </div>

                <div className="mb-4 flex justify-start items-center gap-3">
                    <input
                        type="checkbox"
                        id="is_restaurant_owner"
                        name="is_restaurant_owner"
                        checked={formData.is_restaurant_owner} 
                        onChange={handleChange} 
                        className=" mt-1 px-4 py-2 border bg-white rounded-md"
                    />
                    <label htmlFor="is_restaurant_owner" className="block text-sm font-medium text-gray-700">Login As Restaurant Manager</label>
                  </div>
                
                <button
                  type="submit"
                  className="w-full bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-600 font-bold cursor-pointer"
                  disabled={isLoading}
                >
                  Login
                </button>

                {isError && (
                    <p className="text-red-500 text-center mt-4">Invalid credentials. Please try again.</p>
                )}
              </form>
                <div className="">
                    <p className="text-center mt-4 text-black">Don't have an account? {" "}
                        <Link to="/signup" className="text-blue-500 hover:underline">
                        Sign up
                        </Link>
                    </p>
                </div>
            </div>
          </div>
        </div>
      );
}

export default LoginForm
