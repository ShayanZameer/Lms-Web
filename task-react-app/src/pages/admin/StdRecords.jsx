import axios from "axios";
import React, { useContext, useEffect, useId, useState } from "react";
import { Context, server } from "../../main";
import { toast } from "react-hot-toast";
import { Navigate, useLocation } from "react-router-dom";
import StdAttendenceItem from "../../components/stdAttendenceItem";

const StdRecords = (props) => {
  // state from previous screen
  const location = useLocation();
  const userId = location.state.id;

  const [loading, setLoading] = useState(false);

  const [refresh, setRefresh] = useState(false);
  const { isAuthenticated } = useContext(Context);
  const [records, setRecords] = useState([]);
  const [leaveRecords, setLeaveRecords] = useState([]);

  useEffect(() => {
    axios
      .get(`${server}/attendence/admin/${userId}`, {
        withCredentials: true,
      })
      .then((res) => {
        console.log(res.data);
        setRecords(res.data.records);
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });

    axios
      .get(`${server}/leave/admin/${userId}`, {
        withCredentials: true,
      })
      .then((res) => {
        setLeaveRecords(res.data.records);
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });
  }, [refresh]);

  if (!isAuthenticated) return <Navigate to={"/login"} />;

  return (
    <>
      <h1 className="flex justify-center p-2 text-4xl">Attendence reocrds</h1>
      <div className="flex flex-col ">
        {records.map((i) => (
          <StdAttendenceItem
            dateOfRecord={i.ceatedAt || i.createdAt}
            reason={i.reason || null}
            isApproved={i.reason || null}
            type={i.status}
            currUser={userId}
            id={i._id}
            key={i._id}
          />
        ))}
        {leaveRecords.map((i) => (
          <StdAttendenceItem
            dateOfRecord={i.ceatedAt || i.createdAt}
            reason={i.reason || null}
            isApproved={i.isApproved || null}
            type={i.status}
            id={i._id}
            currUser={userId}
            key={i._id}
          />
        ))}
      </div>
    </>
  );
};

export default StdRecords;
