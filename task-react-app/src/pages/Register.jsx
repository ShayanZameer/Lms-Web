import React, { useContext, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import axios from "axios";
import { Context, server } from "../main";
import toast from "react-hot-toast";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { isAuthenticated, setIsAuthenticated, loading, setLoading } =
    useContext(Context);

  const submitHandler = async (e) => {
    console.log("heelel");
    e.preventDefault();
    setLoading(true);

    try {
      const rsp = await axios.post(
        `${server}/users/new`,
        {
          name,
          email,
          password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: false,
        }
      );
      console.log("hello");
      console.log(rsp);
      console.log("hell");
      toast.success(rsp?.data?.message);
      setIsAuthenticated(true);
      setLoading(false);
    } catch (error) {
      toast.error(error?.response?.data?.messgae);
      console.log(error);
      setIsAuthenticated(false);
      setLoading(false);
    }
  };

  if (isAuthenticated) return <Navigate to={"/"} />;
  return (
    <div className="login">
      <section>
        <form
          className="flex flex-col w-2/3 p-10 m-auto"
          // onSubmit={submitHandler}
        >
          <h1 className="flex justify-center p-1 mb-1 text-2xl">Register</h1>
          <input
            className="p-2 m-2 border border-gray-400 border-solid rounded-md outline-none"
            value={name}
            onChange={(e) => setName(e.target.value)}
            type="text"
            name="name"
            placeholder="Name"
            required
          />
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
            onClick={submitHandler}
            className="p-2 m-2 text-white bg-black border border-gray-400 border-solid rounded-md outline-none hover:bg-white hover:text-black"
            disabled={loading}
            type="submit"
          >
            Sign Up
          </button>
          <h4 className="flex justify-center p-2 m-2 outline-none">Or</h4>
          <Link
            className="p-2 m-2 text-center text-white bg-black border border-gray-400 border-solid rounded-md outline-none hover:bg-white hover:text-black"
            to="/login"
          >
            Log In
          </Link>
        </form>
      </section>
    </div>
  );
};

export default Register;
