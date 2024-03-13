import React, { useContext, useState } from "react";
import { Context } from "../main";
import profile from "../assets/profile.jpg";
import { Navigate } from "react-router-dom";

const Profile = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [profilePic, setProfilePic] = useState("");
  const { isAuthenticated, setIsAuthenticated, loading, setLoading, user } = useContext(Context);

  const submitHandler = async (e) => {
    e.preventDefault();
    // setLoading(true);

    try {
      // const { data } = await axios.put(
      //   `${server}/users/`,
      //   {
      //     name,
      //     email,
      //     profile: profilePic
      //   },
      //   {
      //     headers: {
      //       "Content-Type": "application/json",
      //     },
      //     withCredentials: true,
      //   }
      // );

      // toast.success(data.message);
      toast.success("Profile updated successfully");
      // setIsAuthenticated(true);
      setLoading(false);
    } catch (error) {
      // toast.error(error.response.data.messgae);
      console.log(error);
      setIsAuthenticated(false);
      setLoading(false);
    }
  };

  if (!isAuthenticated) return <Navigate to={"/login"} />
  
  return (
    <>
      <div className="container flex">
        <div className="left-div flex-[2] flex flex-col p-4">
          <img
            className="p-4 mb-4 rounded-full w-52 h-1/2"
            src={profile}
            alt="Profile image"
          />
          <div className="flex flex-col p-6">
            <h2>Name: {user.name}</h2>
            <p>Email: {user.email}</p>
            <p>Grade : {user.grade}</p>
            <p className="flex gap-2">
              <span className="flex-1">Presents: {user.presents}</span>
              <span className="flex-1">Absents: {user.absents}</span>
              <span className="flex-1">Leaves: {user.leaves}</span>
            </p>
          </div>
        </div>
        <div className="right-div flex-[4]">
          <form className="flex flex-col p-20 m-auto" onSubmit={submitHandler}>
            <h1 className="mb-5 text-2xl">Update Profile</h1>
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
              value={profilePic}
              onChange={(e) => setProfilePic(e.target.value)}
              type="file"
              name="Profile pic"
              placeholder="choose a file (Optional)"
              required
            />
            <button
              className="p-2 m-2 text-white bg-black border border-gray-400 border-solid rounded-md outline-none hover:bg-white hover:text-black"
              disabled={loading}
              type="submit"
            >
              Update
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Profile;
