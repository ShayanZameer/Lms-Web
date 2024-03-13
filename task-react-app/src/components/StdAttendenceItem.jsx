import React, { useEffect, useState } from "react";
import { server } from "../main";
import axios from "axios";
import { toast } from "react-hot-toast";

const StdAttendenceItem = ({
  dateOfRecord,
  reason,
  isApproved,
  type,
  id,
  currUser,
}) => {
  
  const [leave, setLeave] = useState(false);
  const [present, setPresent] = useState(false);
  const [absent, setAbsent] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);

  const updateAttendence = async () => {
    try {
      if (!leave) {
        // click on other then leave
        if (type === "present" || type === "absent") {
          await axios.put(
            `${server}/attendence/admin/${id}`,
            {
              status: present ? "present" : "absent",
              id: currUser,
            },
            {
              withCredentials: true,
            }
          );
        } else {
          await axios.post(
            `${server}/attendence/new`,
            {
              status: type,
              id: currUser,
            },
            {
              withCredentials: true,
            }
          );

          // delete the leave that is converted into present or absent by admin.
          await axios.post(
            `${server}/leave/admin/${id}`,
            { id: currUser },
            {
              withCredentials: true,
            }
          );
        }
      } else {
        if (type === "present" || type === "absent") {
          await axios.post(
            `${server}/leave/new`,
            {
              reason: "by admin",
              id: currUser,
              status: "leave",
            },
            { withCredentials: true }
          );

          // delete the attendence that is converted into leave by admin.
          await axios.post(
            `${server}/attendence/admin/${id}`,
            { id: currUser },
            {
              withCredentials: true,
            }
          );
        }
      }
      // setIsDisabled(true);
      toast.success("Attendence updated successfully!");
    } catch (error) {
      toast.error("Some error occured! Try again.");
      console.log(error);
    }
  };

  const delHandler = async () => {
    try {
      if (type !== "leave") {
        console.log("here id for records is : ", id);
        await axios.post(
          `${server}/attendence/admin/${id}`,
          { id: currUser },
          {
            withCredentials: true,
          }
        );
        toast.success("deleted");
      } else {
        console.log("here id for leaves is : ", id);
        console.log("user id is : ", currUser);
        await axios.post(
          `${server}/leave/admin/${id}`,
          {
            id: currUser,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
            withCredentials: true,
          }
        );
        toast.success("successfully");
      }
    } catch (error) {
      toast.error("error while dell button");
      console.log(error);
    }
  };

  return (
    <div className="flex w-2/3 p-8 mx-auto my-2 border border-black recordItem">
      <div className="justify-start flex-[4] flex items-center">
        <h4>{dateOfRecord}</h4>
        <div className={type !== "leave" ? "hidden" : ""}>
          <p>{reason} </p>
          <p><span className="font-bold">Status: </span> {isApproved ? " Approved" : " Not Approved"}</p>
        </div>
      </div>
      <div className="flex justify-end flex-[4] items-center gap-8">
        <div className="flex gap-2">
          <input
            disabled={isDisabled}
            defaultChecked={type === "present"}
            onClick={() => {
              setPresent(true);
              setLeave(false);
              setAbsent(false);
            }}
            type="radio"
            name={`attend-${id}`}
            id="present"
          />

          <p className="btn">Present</p>
        </div>
        <div className="flex gap-2">
          <input
            disabled={isDisabled}
            defaultChecked={type === "absent"}
            onClick={() => {
              setAbsent(true);
              setLeave(false);
              setPresent(false);
            }}
            id="absent"
            type="radio"
            name={`attend-${id}`}
          />

          <p className="btn">Absent</p>
        </div>
        <div className="flex gap-2">
          <input
            disabled={isDisabled}
            defaultChecked={type === "leave"}
            onClick={() => {
              setLeave(true);
              setPresent(false);
              setAbsent(false);
            }}
            id="leave"
            type="radio"
            name={`attend-${id}`}
          />

          <p className="btn">Leave</p>
        </div>
      </div>
      <div className="flex justify-end flex-[5] items-center">
        <button
          onClick={updateAttendence}
          className="p-2 m-2 text-white bg-black border border-gray-400 border-solid rounded-md outline-none hover:bg-white hover:text-black"
        >
          Update record
        </button>
        <button
          onClick={delHandler}
          className="p-2 m-2 text-white bg-black border border-gray-400 border-solid rounded-md outline-none hover:bg-white hover:text-black"
        >
          Delete record
        </button>
      </div>
    </div>
  );
};

export default StdAttendenceItem;
