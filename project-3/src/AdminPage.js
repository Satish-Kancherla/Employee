import React from 'react'
import { useState,useEffect,useRef } from "react";
import axios from "axios";
import { useReactToPrint } from "react-to-print";
import { Link} from 'react-router-dom';



const AdminPage = () => {
    const[data,setData] = useState([]);
    const[content,setContent]= useState(
        {id:"", employeename:"",projectname: "",shifttimings: "",holidaydate:"",description:"",managername:"",status:""});
    const [filterdata, setFilterdata]= useState([content]);  

   
    const conponentPDF= useRef();   

    useEffect(()=>{
        fetchData();
    })
    
    const fetchData = async()=>{
        try{
            const result = await axios("http://localhost:8082/users");
            // console.log(result.data);
            setData(result.data);
            setFilterdata(result.data);
        } catch (err) {
            console.log("something Wrong");
        }
    }
   
    let name,values;
    const handleInputs = (e) => {
        console.log(e);
        name = e.target.name;
        values= e.target.value;

        setContent({...content,[name]:values});
    }
    

    // const handleSubmit =(e)=>{
    //     e.preventDefault(); 
    //     console.log(content);
    //     axios.post('http://localhost:8082/details',content)
    //     .then(res => console.log(res))
    //     .catch(err => console.log(err));
    // }        

    /* const handlesearch =(e)=>{
        setFilterdata(data.filter(item =>item.employeename.toLowerCase().includes(e.target.value)))
    } */
    
    const generatePDF= useReactToPrint({
        content: ()=>conponentPDF.current,
        documentTitle:"EmployeeData",
        onAfterPrint:()=>alert("Data saved in PDF")
    });
   
  return (
    <div className='adminpage' ref={conponentPDF} style={{width:'100%'}}>
        <h1>Admin Page</h1>
        <hr/> 
        <div className="btn-1">
        <div className='sort'>
        
        <Link to="/filter"><button className='button'>FILTER</button></Link>
      </div>
      {/* <div className="search">                
                <input  type="text" name='name'  onChange={handlesearch} placeholder='Search...' />
            </div> */}
        <button className="btn" onClick={generatePDF}>PDF</button>
        </div>
        
        <div className="adminpage-content" >
            <table className='adminpage-table'>
                <thead >
                    <tr>
                    {/* <th className='heading' name="id">ID </th>   */}
			        <th className='heading' name="employeename">EMPLOYEE NAME </th>
			        <th className='heading' name="projectname">PROJECT NAME </th>
			        <th className='heading' name="shifttimings">SHIFT TIMINGS </th>
			        <th className='heading' name="holidaydate">HOLIDAY DATE </th>
			        <th className='heading' name="description">DESCRIPTION </th>
			        <th className='heading' name="managername">MANAGER NAME </th>
                    <th className='heading' name="workingdays">WORKING DAYS </th>
                    <th className='heading' name="status">STATUS </th>
                    {/* <th className='heading' name="action">Action</th> */}
                    </tr>
                </thead >
                <tbody>
                    {filterdata.map((user,id) => {
                        // const{employeename,projectname,shifttimings,holidaydate,description,managername,status} =user;
                        return (
                            <tr key={id}>
                                {/* <td className='data' name="id" id="id">{id+1} </td> */}
                                {/* <td className='data' name="id" value={content.id} onChange={handleInputs}>{user.id}</td>  */}
                                <td className='data' name="employeename" value={content.employeename} onChange={handleInputs}>{user.employeename}</td>
                                <td className='data' name="projectname" value={content.projectname} onChange={handleInputs}>{user.projectname}</td>
                                <td className='data' name="shifttimings"  value={content.shifttimings} onChange={handleInputs}>{user.shifttimings}</td>
                                <td className='data' name="holidaydate"  value={content.holidaydate} onChange={handleInputs}>{user.holidaydate}</td>
                                <td className='data' name="description"  value={content.description} onChange={handleInputs}>{user.description}</td>
                                <td className='data' name="managername"  value={content.managername} onChange={handleInputs}>{user.managername}</td>
                                <td className='data' >1</td>
                                {/* <td className='data' name="status"  id="status" value={content.status}  onChange={handleInputs}>{user.status}</td> */}
                                <td className='data'  /* name="status"  id="status" */><Link to={`/update/${user.id}`}>
                                 
                                    <select  className='data1'  name="status" value={user.status}  onChange={handleInputs}>
                                        <option value="Pending">Pending</option>
                                        <option value="Aprooved">Aprooved</option>
                                     </select></Link></td>
                                {/* <td className='data'  name="status">{user.status}</td> 
                                <td className='data'  name="status"  id="status" value={content.status}  onChange={handleInputs}>
                                    <p  className='data' name="status" value={content.status}/* onClick={handleStatus} /></p>
                                     <option value="Pending">Pending</option>
                                    <option value="Aprooved">Aprooved</option>
                                </select></td> */}
                                
                            </tr>
                        )
                    })
                }
                </tbody>
            </table>
            
          
        </div>

    </div>
  )
}

export default AdminPage
