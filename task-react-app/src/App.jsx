import {BrowserRouter as Router, Routes, Route} from "react-router-dom"
import Home from "./pages/Home"
import Profile from "./pages/Profile"
import Login from "./pages/Login"
import Register from "./pages/Register"
import Header from "./components/Header"
import { Toaster } from "react-hot-toast"
import { useContext, useEffect } from "react"
import axios from "axios"
import { Context, server } from "./main"
import Records from "./pages/Records"
import AdminLogin from "./pages/admin/AdminLogin"
import AdminDashboard from "./pages/admin/AdminDashboard"
import StdRecords from "./pages/admin/StdRecords"


function App() {

  const {setUser, setIsAuthenticated, setLoading} = useContext(Context);
  useEffect(() => {
  setLoading(true);
    axios.get(`${server}/users/me`, {
      withCredentials: true,
    }).then(res => {
      setUser(res.data.user);
      setIsAuthenticated(true);
      setLoading(false);
    }).catch((e) => {
      setUser({})
      setIsAuthenticated(false);
      setLoading(false)
    })
  }, [])
  


  return (
<Router>
  <Header />
  <Routes>
    <Route  path="/" element={<Home/>}/>
    <Route  path="/profile" element={<Profile/>}/>
    <Route  path="/login" element={<Login/>}/>
    <Route  path="/register" element={<Register/>}/>
    <Route  path="/records" element={<Records/>}/>
    <Route  path="/admin/login" element={<AdminLogin/>}/>
    <Route  path="/admin/dashboard" element={<AdminDashboard/>}/>
    <Route  path="/admin/students/records" element={<StdRecords/>}/>
  </Routes>
  <Toaster />
</Router>
  )
}

export default App