import axios from "axios";
import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { server } from "../main";

const Leave = ({userId}) => {
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const { data } = await axios.post(
        `${server}/leave/new`,
        {
          id:userId,
          status:"leave",
          reason: description,
        },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setDescription("");
      toast.success(data.message);
      setLoading(false);
    } catch (error) {
      toast.error(error.response.data.message);
      setLoading(false);
    }
  };

  return (
    <div className="leave">
      <form
        className="flex flex-col w-2/3 p-20 m-auto"
        onSubmit={submitHandler}
      >
        <input
          className="p-2 m-2 border border-gray-400 border-solid rounded-md outline-none"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          type="text"
          name="text"
          placeholder="Reason"
          required
        />
        <button
          className="p-2 m-2 text-white bg-black border border-gray-400 border-solid rounded-md outline-none hover:bg-white hover:text-black"
          disabled={loading}
          type="submit"
        >
          Submit leave application
        </button>
      </form>
    </div>
  );
};

export default Leave;
