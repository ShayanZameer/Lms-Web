import React, { useContext, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { Context, server } from "../../main";
import { toast } from "react-hot-toast";
import axios from "axios";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const [isAdmin, setIsAdmin] = useState(false);
  const { isAuthenticated, setIsAuthenticated, loading, setLoading, user, setUser, isAdmin, setIsAdmin } = useContext(Context);

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post(
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

      const {data} = await axios
      .get(`${server}/users/me`, {
        withCredentials: true,
      })

      if (data.user.role === "admin") {
        setUser(data.user);
        setIsAdmin(true);
        toast.success(data.message);
        setIsAuthenticated(true);
        console.log("going to admin dashboard");
      } else {
        toast.error("You are not admin");
        setUser({});
        setIsAuthenticated(false);
        console.log("going to login");
      }
    } catch (error) {
      toast.error(error.response.data.message);
      console.log(error);
      setIsAuthenticated(false);
      setLoading(false);
    }
  };

  if(isAdmin) return <Navigate to={"/admin/dashboard"}/>

  return (
    <div className="login">
      <section>
        <form
          onSubmit={submitHandler}
          className="flex flex-col w-2/3 p-10 m-auto"
        >
          <h1 className="p-4 text-2xl">Admin Login</h1>
          <input
            className="p-2 m-2 border border-gray-400 border-solid rounded-md outline-none"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            name="email"
            placeholder="Admin Email"
            required
          />
          <input
            className="p-2 m-2 border border-gray-400 border-solid rounded-md outline-none"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            name="password"
            placeholder="Admin Password"
            required
          />
          <button
            className="p-2 m-2 text-white bg-black border border-gray-400 border-solid rounded-md outline-none hover:bg-white hover:text-black"
            disabled={loading}
            type="submit"
          >
            Login
          </button>
        </form>
      </section>
    </div>
  );
};

export default AdminLogin;
