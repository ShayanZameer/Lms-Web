import React, { useEffect, useState } from "react";
import { server } from "../main";
import axios from "axios";
import { toast } from "react-hot-toast";

const LeaveItem = ({ dateOfRecord, reason, isApproved, id, currUser }) => {
  const [leave, setLeave] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);
  const [username, setUsername] = useState("");
  const [refresh, setRefresh] = useState(false);

  const handleApproval = async () => {
    try {
        const {data}  = await axios.post(`${server}/leave/admin/approve/${id}`,{}, {
            withCredentials:true
        });
      toast.success(data.message);
      setRefresh(!refresh);

    } catch (error) {
      toast.error("error while dell button");
    }
  };

  useEffect(() => {
    axios.get(`${server}/users/admin/${currUser}`, {withCredentials:true})
    .then((res)=>{
        setUsername(res.data.records.name)
    }).catch((error)=>{
        toast.error("Some error while loading")
    })
  }, [refresh])
  

  return (
    <div className="flex w-2/3 p-6 mx-auto my-2 border border-black recordItem">
      <div className="justify-start flex-[4] flex items-center flex-col">
        <p><span className="font-bold">From: </span> {username} </p>
        <h4>{dateOfRecord}</h4>
      </div>
      <div className="flex justify-end flex-[4] items-center gap-8 flex-col">
        <p><span className="font-bold">Reason: </span> {reason}</p>
        <p>
          Status:
          <span className={isApproved ? "text-green-400" : "text-red-400"}>
            {isApproved ? " Approved" : " Not Approved"}
          </span>
        </p>
      </div>
      <div className="flex justify-end flex-[3] items-center">
        <button
          onClick={handleApproval}
          className="p-2 m-2 text-white bg-black border border-gray-400 border-solid rounded-md outline-none hover:bg-white hover:text-black"
        >
          Approve
        </button>
      </div>
    </div>
  );
};

export default LeaveItem;
