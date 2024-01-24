import React from 'react'
import { useState,useEffect } from "react";
import axios from "axios";
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';

const Update = () => {
    const {id} = useParams();
    const[user,setUser] = useState({
         id:"",
        //  employeename:"",
        //  projectname: "",
        //  shifttimings: "",
        //  holidaydate:"",
        //  description:"",
        //  managername:"",
         status:"",
        });

    const location = useLocation();
    const navigate = useNavigate();   

    const userId = location.pathname.split("/")[2];

    const handleInputs = (e) => {
        setUser((prev)=>({...prev,[ e.target.name]:e.target.value}));
    }

    useEffect(()=>{
        axios.get("http://localhost:8082/userdetails/"+id)
        // .then(res => console.log(res))
        .then(res =>{
            console.log(res)
            setUser(res.data[0])
        })/* setUser(res.data.status); */
        .catch(err => console.log(err));
    },[]);

    const handleUpdate= async (e) => {
        e.preventDefault();
        try{
            await axios.post(`http://localhost:8082/users/${userId}`, user);
            // navigate("/");
        }catch(err){
            console.log(err);
        } 
    };   

    const handleSubmit = async (e)=>{
        e.preventDefault(); 
        console.log(user);
    const res = await axios.post(`http://localhost:8082/details/${id}`,user)
        .then(res => console.log(res))
        .catch(err => console.log(err));
    }  

    // const handleUpdate =(e)=>{
    //     e.preventDefault(); 
    //     console.log(update);
    //     axios.post('http://localhost:8082/details',update)
    //     .then(res => console.log(res))
    //     .catch(err => console.log(err));
    // }        


  return (
    <div className='adminpage' >
    <h1>Admin Page</h1>
    <hr/> 
    <form>  
    <div className="adminpage-update" >
    <table className='adminpage-table'>
        <thead >
            <tr>
            <th className='heading' name="id">ID</th>
            {/* <th className='heading' name="employeeid">EMPLOYEE NAME </th>   */}
            {/* <th className='heading' name="employeename">EMPLOYEE NAME </th>
            <th className='heading' name="projectname">PROJECT NAME </th>
            <th className='heading' name="shifttimings">SHIFT TIMINGS </th>
            <th className='heading' name="holidaydate">HOLIDAY DATE </th>
            <th className='heading' name="description">DESCRIPTION </th>
            <th className='heading' name="managername">MANAGER NAME </th>
            <th className='heading' name="workingdays">WORKING DAYS </th> */}
            <th className='heading' name="status">STATUS</th>
            </tr>
        </thead >
        <tbody>
        <tr key={id}>
            {/* <td>{id+1} </td> */}
            <td className='data'>
                <input type="text"  name="id" id="id" value={id} disabled /></td>
            {/* <td className='data'><input type="text"  name="employeename" id="employeename" value={user.employeename} onChange={handleInputs} /></td>
            <td className='data'> <input type="text" name="projectname" id="projectname" value={user.projectname} onChange={handleInputs} /></td>
            <td className='data'><input type="text" name="shifttimings" id="shifttimings" value={user.shifttimings} onChange={handleInputs}/></td>
            <td className='data'><input type="text" name="holidaydate" id="holidaydate" value={user.holidaydate} onChange={handleInputs}/></td>
            <td className='data'><input type="text" name="description" id="description" value={user.description} onChange={handleInputs}/></td>
            <td className='data'><input type="text" name="managername" id="managername" value={user.managername} onChange={handleInputs}/></td>
            <td className='data'>1</td> */}
            <td className='data'  name="status"  id="status" >
            <select  className='data' id="status" name="status" value={user.status}  onChange={handleInputs}>
                <option  value="Pending">Pending</option>
                <option  value="Aprooved">Aprooved</option>
            </select></td>
            </tr>
        </tbody>
    </table>     
    </div>    
    </form>
    <button onClick={handleUpdate}>Save</button>
    <button onClick={handleSubmit}><Link to="/">submit</Link></button>
    </div>
    
  )
  }
export default Update;