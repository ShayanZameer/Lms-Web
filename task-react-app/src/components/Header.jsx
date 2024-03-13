import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { Context, server } from '../main'
import axios from 'axios';
import { toast } from 'react-hot-toast';

const Header = () => {

  const {isAuthenticated, setIsAuthenticated, loading, setLoading} = useContext(Context);

  
  const logoutHandler = async (e) => {
    setLoading(true);
    try {
      await axios.get(`${server}/users/logout`, {
        withCredentials: true,
      });

      toast.success("Logged out successfully!")
      setIsAuthenticated(false);
      setLoading(false);
    } catch (error) {
      toast.error(error.response.data.message);
      console.log(error);
      setIsAuthenticated(true);
      setLoading(false);
    }

  }

  return <nav className='flex p-1 bg-black header'>
    <div className='flex-[1] items-center py-2 ml-5 flex-'>
        <Link className='text-white hover:cursor-pointer' to={"/"}>Task</Link>
    </div>
    <article className='flex-[4] text-white flex justify-center text-center'>
        <Link className='px-8 py-2 hover:cursor-pointer hover:bg-white hover:text-black' to={"/"}>Home </Link>
        <Link className='px-8 py-2 hover:cursor-pointer hover:bg-white hover:text-black' to={"/profile"}> Profile </Link>
        <Link className='px-8 py-2 hover:cursor-pointer hover:bg-white hover:text-black' to={"/records"}> Records </Link>
        {
          isAuthenticated ? <button disabled={loading} onClick={logoutHandler} className='px-8 py-2 hover:cursor-pointer hover:bg-white hover:text-black'>Logout</button> : 
            <Link className='px-8 py-2 hover:cursor-pointer hover:bg-white hover:text-black' to={"/login"}> Login </Link>
        }
    </article>
     </nav>
}

export default Header