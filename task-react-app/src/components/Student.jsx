import React, { useState } from "react";
import { Navigate } from "react-router-dom";

const Student = ({
  name,
  email,
  grade,
  presents,
  absents,
  leaves,
  deleteHandler,
  id,
}) => {
  const [clicked, setClicked] = useState(false);
  if (clicked)
    return <Navigate to={"/admin/students/records"} state={{ id }} />;

  return (
    <div className="flex justify-center w-2/3 p-8 mx-auto my-2 border border-black recordItem">
      <div className="flex flex-col justify-center flex-[1]">
        <h4>{name}</h4>
        <p>{email} </p>
        <p>Grade: {grade}</p>
      </div>

      <div className="flex flex-[1] items-center justify-center gap-2 flex-col">
        <div className="flex flex-col gap-2">
          <p className="btn">Presents: {presents} </p>
          <p className="btn">Absent: {absents} </p>
          <p className="btn">Leave: {leaves} </p>
        </div>
      </div>

      <div className="flex flex-col flex-[2] p-2">
        <button
          onClick={() => setClicked(true)}
          className="p-2 m-2 text-white bg-black border border-gray-400 border-solid rounded-md outline-none hover:bg-white hover:text-black"
        >
          View records
        </button>
        <button
          onClick={() => deleteHandler(id)}
          className="p-2 m-2 text-white bg-black border border-gray-400 border-solid rounded-md outline-none hover:bg-white hover:text-black"
        >
          Delete student
        </button>
      </div>
    </div>
  );
};

export default Student;
