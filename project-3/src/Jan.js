import React from 'react'
import { useState,useEffect,useRef } from "react";
import axios from "axios";
import { useReactToPrint } from "react-to-print";
import {DateRangePicker} from "react-date-range";
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import { NavLink } from 'react-router-dom';


const Jan = () => {
    const [data,setData] = useState([]);
    const [allData,setAllData]=useState([]);
    const [filterdata, setFilterdata]= useState([]);  
    const [startDate,setStartDate] =useState(new Date());
    const [endDate,setEndDate] =useState(new Date());
   
    const conponentPDF= useRef();   

    useEffect(()=>{
        fetchData();
    },[])
    
    const fetchData = async()=>{
        try{
            const result = await axios("http://localhost:8082/register");
            setData(result.data);
            setAllData(result.data);
            setFilterdata(result.data);
            // console.log(result.data);
            // console.log(result.data[0].holidaydate);
        } catch (err) {
            console.log("something Wrong");
        }
        
    }

    let name,values;

    const handleInputs = (e) => {
        console.log(e);
        name = e.target.name;
        values = e.target.value;
        setData({...data,[name]:values});
    }   

    const handlesearch =(e)=>{
        setFilterdata(data.filter(item =>item.employeename.toLowerCase().includes(e.target.value)))
    }

    const generatePDF= useReactToPrint({
        content: ()=>conponentPDF.current,
        documentTitle:"EmployeeData",
        onAfterPrint:()=>alert("Data saved in PDF")
    });

    const handleSelect = (date) => {
        let filtered= allData.filter((product)=>{
            let productDate =new Date(product["holidaydate"]);
            return(
                productDate >= date.selection.startDate && productDate <= date.selection.endDate
            );
        });
        setStartDate(date.selection.startDate)
        setEndDate(date.selection.endDate);
        setData(filtered);
        console.log(date);
        console.log(filtered);
    };

    const selectionRange ={
        startDate: startDate,
        endDate:endDate,
        key:"selection",
    }
  
  return (
    <div className='adminpage' ref={conponentPDF} style={{width:'100%'}}>
         <h1>Admin Page</h1>
        <hr/>  
        
        <div className='sort'>

        <div className="search"> 
            <NavLink to="/"><button className='button'>Back</button></NavLink>               
                <input  type="text" name='name'  onChange={handlesearch} placeholder='Search...' />
                <button className="btn" onClick={generatePDF}>PDF</button>       
        </div>
        <div className='date'>
            <DateRangePicker ranges={[selectionRange]} onChange={handleSelect}/><button className='date-button' type='reset' onClick={handlesearch}>submit</button>
            </div>
      </div>
        <div className="adminpage-content" >
            <table className='adminpage-table'>
                <thead >
                    <tr>
			        <th className='heading' name="employeename">EMPLOYEE NAME </th>
			        <th className='heading' name="projectname">PROJECT NAME </th>
			        <th className='heading'name="shifttimings">SHIFT TIMINGS </th>
			        <th className='heading' name="holidaydate">HOLIDAY DATE </th>
			        <th className='heading' name="description">DESCRIPTION </th>
			        <th className='heading' name="managername">MANAGER NAME </th>
                    <th className='heading' name="workingdays">WORKING DAYS </th>
                    <th className='heading' name="status">STATUS </th>
                    </tr>
                </thead >
                <tbody>
                    {filterdata.map((user,i) => {
                        const{employeename,projectname,shifttimings,description,managername,status} =user;
                        let date= new Date(user['holidaydate']);
                        return (
                            <tr key={i}>
                                {/* <td>{i+1} </td> */}
                                <td className='data' value={user.employeename} onChange={handleInputs}>{employeename}</td>
                                <td className='data' value={user.projectname} onChange={handleInputs}>{projectname}</td>
                                <td className='data' value={user.shifttimings} onChange={handleInputs}>{shifttimings}</td>
                                <td className='data' value={user.holidaydate} onChange={handleInputs}>{date.toLocaleDateString()}{/* {holidaydate} */}</td>
                                <td className='data' value={user.description} onChange={handleInputs}>{description}</td>
                                <td className='data' value={user.managername} onChange={handleInputs}>{managername}</td>
                                <td className='data' >1</td>
                                <td className='data' value={user.status} onChange={handleInputs}><select  className='data' value={status} /* onClick={handleStatus} */>
                                    <option value="Pending">Pending</option>
                                    <option value="Aprooved">Aprooved</option>
                                </select></td>
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

export default Jan;