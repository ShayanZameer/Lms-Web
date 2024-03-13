import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Context, server } from "../main";
import { toast } from "react-hot-toast";
import { Navigate } from "react-router-dom";
import Leave from "../components/Leave";

const Home = () => {

  const [leave, setLeave] = useState(false);
  const [present, setPresent] = useState(false); 
  const [absent, setAbsent] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);

  const [refresh, setRefresh] = useState(false);
  const { isAuthenticated, user, setUser, isAdmin, setIsAdmin } = useContext(Context);

  useEffect(() => {
    axios
      .get(`${server}/users/me`, {
        withCredentials: true,
      })
      .then((res) => {
        setUser(res.data.user);
        setIsAdmin(res.data.user.role === "admin");
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });
  }, [refresh]);

  if (!isAuthenticated) return <Navigate to={"/login"} />
  if(isAuthenticated && isAdmin) return <Navigate to={"/admin/dashboard"} />

  const handleSubmitAttendence = async ()=>{
    try {
      let status = present? "present":"absent";
      if(!leave){
        const {data} = await axios.post(`${server}/attendence/new`, {
          status,
          id: user._id,
        },{withCredentials:true})
        toast.success("Attendence submitted successfully successfully");
        setIsDisabled(true);
      }
    } catch (error) {
      console.log(error);
      toast.error("Attendence not marked! Some error");
    }
  }

  return (
    <div className="flex flex-col ">
      <h1 className="flex justify-center p-4 mb-8 text-2xl">Dashboard</h1>
      <div className="flex flex-col w-2/3 m-auto border border-black recordItem">
        <div className="flex justify-center">
          <h1>Mark your attendence </h1>
        </div>
        <div className="flex justify-center gap-2">

          <input disabled={isDisabled} onClick={()=>{
            setPresent(true);
              setLeave(false);
              setAbsent(false);
            }} type="radio" name="attend" id="present" />

          <p>Present</p>
        </div>


        <div className="flex justify-center gap-2">

          <input disabled={isDisabled} onClick={()=>{
            setAbsent(true);
              setLeave(false);
              setPresent(false);
            }} id="absent" type="radio" name="attend" />  

          <p className="btn">Absent</p>
        </div>


        
        <div className="flex justify-center gap-2">

          <input disabled={isDisabled} onClick={()=>{
            setLeave(true);
              setPresent(false);
              setAbsent(false);
            }} id="leave" type="radio" name="attend" />

          <button className="btn">Leave</button>
        </div>


        <button onClick={handleSubmitAttendence} disabled={isDisabled} className={`${leave?"hidden":"block"} p-2 text-xl text-white transition-all bg-black rounded-md btn hover:text-black hover:bg-white`}> Submit your attendence</button>
      </div>

      <section className={leave?"block":"hidden"}>
        <Leave userId={user._id} />
      </section>
      
    </div>
  );
};

export default Home;
