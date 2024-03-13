import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Context, server } from "../main";
import { toast } from "react-hot-toast";
import { Navigate } from "react-router-dom";
import RecordsItem from "../components/RecordsItem";

const Records = () => {
  const [refresh, setRefresh] = useState(false);
  const { isAuthenticated } = useContext(Context);
  const [records, setRecords] = useState([]);
  const [leaveRecords, setLeaveRecords] = useState([]);


  useEffect(() => {
    axios
      .get(`${server}/attendence/me`, {
        withCredentials: true,
      })
      .then((res) => {
        setRecords(res.data.records);
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });

      axios.get(`${server}/leave/me`, {
        withCredentials: true,
      })
      .then((res) => {
        setLeaveRecords(res.data.records);
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });

    }, [refresh]);
    
  if (!isAuthenticated) return <Navigate to={"/login"} />

  return (
    <>
    <h1 className="flex justify-center p-2 text-4xl">Attendence reocrds</h1>
    <div className="flex flex-col ">
      {
        records.map((i)=>(
          <RecordsItem 
          dateOfRecord={i.ceatedAt || i.createdAt}
          reason={i.reason || null}
          isApproved={i.reason || null}
          type={i.status}
          id={i._id}
          key={i._id}
          />
        ))
        }
        {
        leaveRecords.map((i)=>(
          <RecordsItem 
          dateOfRecord={i.ceatedAt || i.createdAt}
          reason={i.reason || null}
          isApproved={i.isApproved || null}
          type={i.status}
          id={i._id}
          key={i._id}
          />
        ))
      }
    </div>
      </>
  );
};

export default Records;
