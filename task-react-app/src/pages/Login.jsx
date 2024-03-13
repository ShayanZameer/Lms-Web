import React, { useContext, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { Context, server } from "../main";
import { toast } from "react-hot-toast";
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const {
    isAuthenticated,
    setIsAuthenticated,
    loading,
    setLoading,
    isAdmin,
    setIsAdmin,
  } = useContext(Context);

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await axios.post(
        `${server}/users/login`,
        {
          email,
          password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      toast.success(data.message);
      console.log(data);
      
      setIsAuthenticated(true);
      
      // const myUser = await axios.get(`${server}/users/me`, {
      //     withCredentials: true,
      //   });
        
      //   if (myUser.data.user.role === "admin") {
      //     console.log("yes admin redirect to admin");
      //     setIsAdmin(true);
      //   }
      setLoading(false);
    } catch (error) {
      toast.error(error.response.data.message);
      console.log(error);
      setIsAuthenticated(false);
      setIsAdmin(false);
      setLoading(false);
    }
  };

  if (isAuthenticated && !isAdmin) return <Navigate to={"/"} />;
  if (isAuthenticated && isAdmin) return <Navigate to={"/admin/dashboard"} />;

  return (
    <div className="login">
      <section>
        <form
          onSubmit={submitHandler}
          className="flex flex-col w-2/3 p-10 m-auto"
        >
          <h1 className="flex justify-center p-1 mb-1 text-2xl">Login</h1>
          <input
            className="p-2 m-2 border border-gray-400 border-solid rounded-md outline-none"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            name="email"
            placeholder="Email"
            required
          />
          <input
            className="p-2 m-2 border border-gray-400 border-solid rounded-md outline-none"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            name="password"
            placeholder="Password"
            required
          />
          <button
            className="p-2 m-2 text-white bg-black border border-gray-400 border-solid rounded-md outline-none hover:bg-white hover:text-black"
            disabled={loading}
            type="submit"
          >
            Login
          </button>
          <h4 className="flex justify-center p-2 m-2 outline-none">OR</h4>
          <Link
            className="p-2 m-2 text-center text-white bg-black border border-gray-400 border-solid rounded-md outline-none hover:bg-white hover:text-black"
            to="/register"
          >
            Sign Up
          </Link>
        </form>
      </section>
    </div>
  );
};

export default Login;
