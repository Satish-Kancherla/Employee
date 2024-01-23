import React from 'react'
import { useState,useEffect,useRef } from "react";
import axios from "axios";
import { useReactToPrint } from "react-to-print";

const AdminPage = () => {
    const[data,setData] = useState([]);
    const [filterdata, setFilterdata]= useState([]);
    // const [query, setQuery] = useState('');
    
    // const[status,setStatus]=useState("pending");
   
    const conponentPDF= useRef();
    
/*     const sorting =(col)=>{
        if (order === "ASC"){
            const sorted =[...data].sort((a,b)=>
                a[col].toLowerCase() > b[col].toLowerCase() ? 1: -1);
                setData(sorted);
                setOrder("DSC")
        }
        if (order === "DSC"){
            const sorted =[...data].sort((a,b)=>
                a[col].toLowerCase() > b[col].toLowerCase() ? 1: -1
            );
            setData(sorted);
            setOrder("ASC")
        }
    } */
       
      /* const sortData =()=>{
        data.sort((a,b)=> new Date(a.date)- new Date(b.date))
        setOrder(data)
      } */  

    useEffect(()=>{
        fetchData();
    })
    

    const fetchData = async()=>{
        try{
            const result = await axios("http://localhost:8082/register");
            // console.log(result.data);
            setData(result.data);
            setFilterdata(result.data);
        } catch (err) {
            console.log("something Wrong");
        }
    }
    const Filter =(e)=>{
        setFilterdata(data.filter(f =>f.projectname.toLowerCase().includes(e.target.value)))
    }
    // const handleStatus =(e)=>{
    //     e.preventDefault();
    //     // setStatus(e.target.value);
    //     setStatus("Aprooved")
    // }

    // const handlesearch=(event)=>{
    //     const getSearch= event.target.value; 
    //     if(getSearch.length > 0)
    //     {     
    //      const searchdata= data.filter( (item)=> item.projectname.toLowerCase().includes(getSearch));
    //      setData(searchdata);
    //     } else {
    //       setData(filterdata);
    //     }
    //     setQuery(getSearch);
    //   }

    
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
        <select className='sort-option'>
            <option value="v">Sort By</option>
            <option value="Jan">Jan</option><option value="Feb">Feb</option><option value="Mar">Mar</option>
            <option value="Apr">Apr</option><option value="May">May</option><option value="Jun">Jun</option>
            <option value="Jul">Jul</option><option value="Aug">Aug</option><option value="Sep">Sep</option>
            <option value="Oct">Oct</option><option value="Nov">Nov</option><option value="Dec">Dec</option>

        </select>
      </div>
        <button className="btn" onClick={ generatePDF}>PDF</button>
        </div>
        <div className="adminpage-content" >
            <div className="search">                
                <input  type="text" name='name' /* value={query} onChange={(e)=>handlesearch(e)} */ onChange={Filter} placeholder='Search...' />
            </div>
            <table className='adminpage-table'>
                <thead >
                    <tr>
			        <th className='heading'>EMPLOYEE NAME </th>
			        <th className='heading'>PROJECT NAME </th>
			        <th className='heading'>SHIFT TIMINGS </th>
			        <th className='heading'>HOLIDAY DATE </th>
			        <th className='heading'>DESCRIPTION </th>
			        <th className='heading'>MANAGER NAME </th>
                    <th className='heading'>WORKING DAYS </th>
                    <th className='heading'>STATUS </th>
                    
                    </tr>
                </thead >
                <tbody>
                    {
                    filterdata.map((user,i) => {
                        const{employeename,projectname,shifttimings,holidaydate,description,managername,status} =user;
                        return (
                            <tr key={i}>
                                {/* <td>{i+1} </td> */}
                                <td className='data'>{employeename}</td>
                                <td className='data'>{projectname}</td>
                                <td className='data'>{shifttimings}</td>
                                <td className='data'>{holidaydate}</td>
                                <td className='data'>{description}</td>
                                <td className='data'>{managername}</td>
                                <td className='data'></td>
                                <td className='data'><select  className='data' value={status} /* onClick={handleStatus} */>
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

export default AdminPage