import React from 'react'
import { useState,useEffect } from "react";
import axios from "axios";
import { NavLink, useLocation, useNavigate, useParams } from 'react-router-dom';

const Update = () => {
    const {id} = useParams();
    const[update,setUpdate] = useState({
         employeeid:"",
         employeename:"",
         projectname: "",
         shifttimings: "",
         holidaydate:"",
         description:"",
         managername:"",
         status:"",
        });

    const location = useLocation();
    const navigate = useNavigate();   

    const userId = location.pathname.split("/")[2];

    const handleInputs = (e) => {
        setUpdate((prev)=>({...prev,[ e.target.name]:e.target.value}));
    }

    useEffect(()=>{
        axios.get('http://localhost:8082/userdetails/'+id)
        // .then(res => console.log(res))
        .then(res =>{
            console.log(res)
            setUpdate(res.data[0])
        })/* setUpdate(res.data.status); */
        .catch(err => console.log(err));
    },[]);

    const handleUpdate= async (e) => {
        e.preventDefault();
        try{
            await axios.put(`http://localhost:8082/users/${userId}`, update);
            navigate('/');
        }catch(err){
            console.log(err);
        } 
    };   


  return (
    <div className='adminpage' >
        <h1>Admin Page</h1>
        <hr/> 
        
    <div className="adminpage-update" >
    <table className='adminpage-table'>
        <thead >
            <tr>
            <th className='heading' name="employee Id">ID</th>
            {/* <th className='heading' name="employeeid">EMPLOYEE NAME </th>   */}
            <th className='heading' name="employeename">EMPLOYEE NAME </th>
            <th className='heading' name="projectname">PROJECT NAME </th>
            <th className='heading' name="shifttimings">SHIFT TIMINGS </th>
            <th className='heading' name="holidaydate">HOLIDAY DATE </th>
            <th className='heading' name="description">DESCRIPTION </th>
            <th className='heading' name="managername">MANAGER NAME </th>
            <th className='heading' name="workingdays">WORKING DAYS </th>
            <th className='heading' name="status">STATUS</th>
            </tr>
        </thead >
        <tbody>
        <tr key={id}>
            {/* <td>{id+1} </td> */}
            <td className='data'>
                <label>ID:</label>
                <input type="text"  name="id" id="id" value={id} disabled /></td>
            <td className='data'><input type="text"  name="employeename" id="employeename" value={update.employeename} onChange={handleInputs} /></td>
            <td className='data'> <input type="text" name="projectname" id="projectname" value={update.projectname} onChange={handleInputs} /></td>
            <td className='data'><input type="text" name="shifttimings" id="shifttimings" value={update.shifttimings} onChange={handleInputs}/></td>
            <td className='data'><input type="text" name="holidaydate" id="holidaydate" value={update.holidaydate} onChange={handleInputs}/></td>
            <td className='data'><input type="text" name="description" id="description" value={update.description} onChange={handleInputs}/></td>
            <td className='data'><input type="text" name="managername" id="managername" value={update.managername} onChange={handleInputs}/></td>
            <td className='data'>1</td>
            <td className='data'  name="status"  id="status" >
            <select  className='data' id name="status" value={update.status}  onChange={e => setUpdate(e.target.value)}>
                <option value="Pending">Pending</option>
                <option value="Aprooved">Aprooved</option>
            </select><NavLink to="/"><button onClick={handleUpdate}>update</button></NavLink></td>
            </tr>
        </tbody>
    </table>
            
          
    </div>    
    </div>
  )
}

export default Update