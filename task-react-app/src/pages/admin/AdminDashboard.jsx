import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Context, server } from "../../main";
import { toast } from "react-hot-toast";
import { Navigate } from "react-router-dom";
import Student from "../../components/student";
import LeaveItem from "../../components/LeaveItem";

const AdminDashboard = () => {
  const [loading, setLoading] = useState(false);
  const [leave, setLeave] = useState(false);
  const [isStudentsVisible, setIsStudentsVisible] = useState(false);
  const [allLeaves, setAllLeaves]= useState([]);
  const [allStudents, setAllStudents]= useState([]);
  const [refresh, setRefresh] = useState(false);
  const { isAuthenticated, isAdmin, setIsAdmin } = useContext(Context);

  const deleteHandler = async (id) => {
    try {
      const {data} = await axios.delete(`${server}/users/admin/${id}`,{
        withCredentials:true
      });
      await axios.post(`${server}/leave/admin/delete/all`,{id}, {
        withCredentials:true
      });
      await axios.post(`${server}/attendence/admin/delete/all`,{id}, {
        withCredentials:true
      });
      
      toast.success(data.message);
      setRefresh(!refresh);
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  const handleGetAllLeaves = async()=>{
    const { data } = await axios.get(`${server}/leave/admin/all`,{
      withCredentials: true
    })
    setAllLeaves(data.records);
    console.log("clikced all leaves");
    console.log(allLeaves);
  }

  const handleGetAllStudents = async() =>{
    const {data} = await axios.get(`${server}/users/admin/all`,{
      withCredentials:true
    })
    console.log(data.users);
    setAllStudents(data.users);
  }

  useEffect(() => {
    axios
      .get(`${server}/users/me`, {
        withCredentials: true,
      })
      .then((res) => {
        console.log(res.data.user);
        setIsAdmin(user.role === "admin");
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });
  }, [refresh]);
  
  if(!isAuthenticated) return <Navigate to={"/login"} />
  if (!isAdmin) return <Navigate to={"/login"} />

  return (
    <div className="flex flex-col ">
      <h1 className="flex justify-center p-4 mb-8 text-2xl">Admin Dashboard</h1>
      <div className="flex flex-col w-2/3 m-auto border border-black recordItem">
        <button
          className="p-2 m-2 text-white bg-black border border-gray-400 border-solid rounded-md outline-none hover:bg-white hover:text-black"
          disabled={loading}
          onClick={() => {
            setLeave(!leave);
            setIsStudentsVisible(false);
            handleGetAllLeaves();
          }}
        >
          Leave approvals
        </button>
        <button
          className="p-2 m-2 text-white bg-black border border-gray-400 border-solid rounded-md outline-none hover:bg-white hover:text-black"
          disabled={loading}
          onClick={() => {
            setIsStudentsVisible(!isStudentsVisible);
            setLeave(false);
            handleGetAllStudents();
          }}
        >
          View all students
        </button>
      </div>

      <section className={leave ? "block" : "hidden"}>
      {
          allLeaves.map((i) =>(
            
            !i.isApproved && <LeaveItem
            reason={i.reason}
            dateOfRecord={i.createdAt}
            isApproved={i.isApproved}
            id={i._id}
            key={i._id}
            currUser={i.user}
            />
            ))
        }
      </section>

      <section className={isStudentsVisible ? "block" : "hidden"}>
        {
          allStudents.map((i)=>(
            i.role !== "admin"?
            <Student
            name={i.name}
            email={i.email}
            grade={i.grade}
            presents={""+i.presents}
            absents={i.absents}
            leaves={i.leaves}
            deleteHandler={deleteHandler}
            id={i._id}
            key={i._id}
            />: ""
            ))
          }
      </section>
    </div>
  );
};

export default AdminDashboard;
