import React from 'react'
import "./employeedata.css";
import { useState } from 'react';
import axios from "axios";


const EmployeeData = () => {

    const[content,setContent] = useState({
     employeename: "",projectname: "",shifttimings: "",holidaydate: "",description:"",managername:""
    });
    const[disable, setDisable]=useState('typing');
  
    let name,value;

    const handleInputs = (e) => {
        console.log(e);
        name = e.target.name;
        value = e.target.value;

        setContent({...content,[name]:value});
    }
   
    const handleSubmit =()=>{
     
      axios.post('http://localhost:8082/emp',content)
      .then(res => console.log(res))
      .catch(err => console.log(err));
      setDisable('submitted');    
      window.location.reload(false);
      //  setContent({employeename:"",projectname: "",shifttimings: "",holidaydate:"",description:"",managername:""})
      
    }

  return (
    <div className='employee'>
    <div className='employeedata'>
        <div className="form-data">
            <h1>Employee Details</h1>
				 <div className='input'>
         <form  >  
          <table >
          <thead>
					<tr><td><span >Employee Name</span></td><td>
            <select name="employeename"  id="employeename" value={content.employeename} onChange={handleInputs} >
            <option value="" disable="true"  hidden>Select Employee Name</option>
              <option value="" disabled ></option>
              <option value="Poorna Mani Vulavalapudi">Poorna Mani Vulavalapudi</option><option value="Rasmita Pradhan">Rasmita Pradhan</option><option value="Goutham Garalapati">Goutham Garalapati</option>
              <option value="Kolli Raghu">Kolli Raghu</option><option value="Pithani Chidvinay">Pithani Chidvinay</option><option value="Nukala Lalitha Bhavani">Nukala Lalitha Bhavani</option><option value="Sanjay Wudali">Sanjay Wudali</option>
              <option value="Jagadish Sharla">Jagadish Sharla</option><option value="Kodali Harshitha">Kodali Harshitha</option><option value="Ramisetty Yaswanth Sai"> Ramisetty Yaswanth Sai</option><option value="Pakkala Akshitha">Pakkala Akshitha</option>
              <option value="Atmakuru Jithendra Kumar">Atmakuru Jithendra Kumar</option><option value="Meghana Sribhashyam">Meghana Sribhashyam</option><option value="Avilala Gowtham Kumar">Avilala Gowtham Kumar</option><option value="Chandrika Gummalla">Chandrika Gummalla</option>
              <option value="Katta Shailaja">Katta Shailaja</option><option value="Edpuganti Jasmine">Edpuganti Jasmine</option><option value="Gorla Sravani">Gorla Sravani</option><option value="Avula Venkat Yeswanth Royal">Avula Venkat Yeswanth Royal</option>
              <option value="Kalasaudram Keerthana">Kalasaudram Keerthana</option><option value="Pamuru Sudeshna">Pamuru Sudeshna</option><option value="Ramgiri Harsha Vardhan">Ramgiri Harsha Vardhan</option><option value="Vikas Vinod Jadhav">Vikas Vinod Jadhav</option>
              <option value="Sitarami Reddy Eda">Sitarami Reddy Eda</option><option value="Murtaza Zakiuddin Bhori">Murtaza Zakiuddin Bhori</option><option value="Lakshmipalem Anil Venkata Babu">Lakshmipalem Anil Venkata Babu</option>
              <option value="Vemula Laxman Reddy">Vemula Laxman Reddy</option><option value="Bonda Shalom">Bonda Shalom</option><option value="Gangireddy Suneetha">Gangireddy Suneetha</option>
              <option value="Nehru Hatkar">Nehru Hatkar</option>
              <option value="Prasanth Pullaganti">Prasanth Pullaganti</option><option value="Gunna Pavan Sai">Gunna Pavan Sai</option><option value="Gade Narendra">Gade Narendra</option>
              <option value="Sanchi Muneendra Kumar">Sanchi Muneendra Kumar</option><option value="Sabreen Banu Shaik">Sabreen Banu Shaik</option>
              <option value="Chandan Charchit Sahu">Chandan Charchit Sahu</option><option value="Thumati Narendra Reddy">Thumati Narendra Reddy</option>
              <option value="hi" disabled ></option>
            </select></td></tr>
            
					<tr><td><span >Project Name</span></td><td>
            <select name="projectname" id="projectname" value={content.projectname} onChange={handleInputs} > 
              <option disable="true"  hidden>Select Project Name</option>
              <option value="hi" disabled ></option>
              <option value="CRUNCH TIME"  >CRUNCH TIME</option>
              <option value="TOC">TOC</option>
              <option value="MZP">MZP</option>
              <option value="TECHOPS">TECHOPS</option>
              <option value="hi" disabled   ></option>
			      </select></td></tr>
								
					<tr><td><span > Shift Timings</span></td><td>
            <select name="shifttimings" id="shifttimings" value={content.shifttimings} onChange={handleInputs} >
            <option disable="true"  hidden>Select Shift Timings</option>
            <option value="hi" disabled ></option>
            <option value="07:00 AM - 04:00 PM IST" name="shifttimings">07:00 AM - 04:00 PM IST</option>
            <option value="02:00 PM - 11:00 PM IST" name="shifttimings">02:00 PM - 11:00 PM IST</option>
            <option value="10:00 PM - 07:00 AM IST" name="shifttimings" >10:00 PM - 07:00 AM IST</option>
            <option value="06:00 AM - 02:00 PM IST" name="shifttimings" >06:00 AM - 02:00 PM IST</option>
            <option value="02:00 PM - 10:00 PM IST" name="shifttimings" >02:00 PM - 10:00 PM IST</option>
            <option value="10:00 PM - 06:00 AM IST" name="shifttimings" >10:00 PM - 06:00 AM IST</option>
            <option value="hi" disabled ></option>
          </select></td></tr>
				
					<tr><td><span >Holiday Date</span></td><td>
            <select name="holidaydate" id="holidaydate" value={content.holidaydate} onChange={handleInputs} >
            <option disable="true"  hidden>Select Holiday Date</option>
            <option value="hi" disabled ></option>
            <option value="01/01/2024" >01/01/2024</option>
            <option value="01/15/2024" >15/01/2024</option>
            <option value="01/26/2024" >26/01/2024</option>
            <option value="03/08/2024" >08/03/2024</option>
            <option value="03/23/2024" >23/03/2024</option>
            <option value="04/09/2024" >09/04/2024</option>
            <option value="04/11/2024" >11/04/2024</option>
            <option value="07/15/2024" >15/07/2024</option>
            <option value="10/11/2024" >11/10/2024</option>
            <option value="10/30/2024" >30/10/2024</option>
            <option value="12/25/2024" >25/12/2024</option>
            <option value="hi" disabled ></option>
					 </select></td></tr>
								
					<tr><td><span >Description</span></td><td>
            <select  name="description" id="description" value={content.description} onChange={handleInputs} >
            <option disable="true"  hidden>Select Description</option>
            <option value="hi" disabled ></option>
					  <option value="New Year">New Year</option><option value="Pongal">Pongal</option><option value="Republic Day">Republic Day</option>
            <option value="Maha Shivaratri">Maha Shivaratri</option><option value="Holi">Holi</option><option value="Ugadi">Ugadi</option>
            <option value="Ramzan">Ramzan</option><option value="Independence Day">Independence Day</option><option value="Dussehra">Dussehra</option>
            <option value="Deepavali">Deepavali</option><option value="Christmas">Christmas</option>
            <option value="hi" disabled ></option>
            </select></td></tr>
                
          <tr><td><span>Manager Name</span></td><td><input  placeholder="Enter Manager Name"
					name="managername" id="managername" value={content.managername} onChange={handleInputs} required></input></td></tr>
        
        </thead>
        </table>
        </form> 
				</div>	       	
				<div className="button">
					<button type="submit" onClick={handleSubmit} disabled={content.employeename.length===0 || 
                                    content.projectname.length===0 ||                                     
                                    content.shifttimings.length===0 ||
                                    content.holidaydate.length===0 ||
                                    content.description.length===0 ||
                                    content.managername.length===0 ||
                                    disable==='submitted'}>Submit</button>
				</div>	
               	
			</div>
      </div> 
        </div>  
  )
}

export default EmployeeData;