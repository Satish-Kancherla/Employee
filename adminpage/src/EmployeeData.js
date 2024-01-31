import React from 'react'
import "./employeedata.css";
import { useState } from 'react';
import axios from "axios";
import emailjs from '@emailjs/browser';
import Swal from 'sweetalert2';

const Employee = () => {

    const project =[{
        name:"Cruch Time",
        employee:[
            {name:"Nehru Hatkar"},{name:"Prasanth Pullaganti"},{name:"Gunna Pavan Sai"},{name:"Gade Narendra"},{name:"Sanchi Muneendra Kumar"},{name:"Sabreen Banu Shaik"},{name:"Chandan Charchit Sahu"}
            ,{name:"Thumati Narendra Reddy"}
        ],
        shift:[
            {name:"06:00 AM - 02:00 PM IST"},{name:"02:00 PM - 10:00 PM IST"},{name:"10:00 PM - 06:00 AM IST"}
        ]
    }
    ,{
        name:"Data-axle TOC",
        employee:[
            {name:"Kolli Raghu"},{name:"Pithani Chidvinay"},{name:"Nukala Lalitha Bhavani"},{name:"Sanjay Wudali"},{name:"Jagadish Sharla"},{name:"Kodali Harshitha"},{name:"Ramisetty Yaswanth Sai"}
            ,{name:"Pakkala Akshitha"},{name:"Atmakuru Jithendra Kumar"},{name:"Bonda Shalom"},{name:"Lakshmipalem Anil Venkata Babu"}
            
            ],
            shift:[
                {name:"07:00 AM - 04:00 PM IST"},{name:"02:00 PM - 11:00 PM IST"},{name:"11:00 PM - 07:00 AM IST"}
            ]
    },
    {
        name:"Data-axle MZP",
        employee:[
            {name:"Meghana Sribhashyam"},{name:"Avilala Gowtham Kumar"},{name:"Chandrika Gummalla"},{name:"Katta Shailaja"},{name:"Edpuganti Jasmine"},{name:"Gangireddy Suneetha"},{name:"Vemula Laxman Reddy"}
            ,{name:"Gorla Sravani"},{name:"Avula Venkat Yeswanth Royal"},{name:"Kalasaudram Keerthana"},{name:"Pamuru Sudeshna"}
            
        ],
        shift:[
            {name:"07:00 AM - 04:00 PM IST"},{name:"02:00 PM - 11:00 PM IST"},{name:"11:00 PM - 07:00 AM IST"}
        ]
    },
    {
        name:"Data-axle TechOps",
        employee:[
            {name:"Ramgiri Harsha Vardhan"},{name:"Vikas Vinod Jadhav"},{name:"Sitarami Reddy Eda"}
            ,{name:"Murtaza Zakiuddin Bhori"}
        ],
        shift:[
            {name:"07:00 AM - 04:00 PM IST"},{name:"02:00 PM - 11:00 PM IST"},{name:"11:00 PM - 07:00 AM IST"}
        ]
   },
   {
    name:"Data-axle MZP & TechOps",
    employee:[
        {name:"Poorna Mani Vulavalapudi"},{name:"Rasmita Pradhan"},{name:"Goutham Garalapati"}
    ],
    shift:[
        {name:"07:00 AM - 04:00 PM IST"},{name:"02:00 PM - 11:00 PM IST"},{name:"11:00 PM - 07:00 AM IST"}
    ]
   }]


    
    const[content,setContent] = useState({
        projectname: "", employeename: "",shifttimings: "",holidaydate: "",description:"",managername:""
       });
       const[projects,setProjects]=useState({projectname: ""});
       const[disable, setDisable]=useState('typing');
       const [employee,setEmployee]=useState({employeename:" "});
       const[empname,setEmpname] =useState([]);
       const[shifts,setShifts]=useState([]);
       
       let name,value;
   
       const handleInputs = (e) => {
           name = e.target.name;
           value = e.target.value;
   
           setContent({...content,[name]:value});
                  
       }

       const handleEmployee =(e)=>{
        setEmployee(e.target.value)
        setContent({...content,"employeename":e.target.value})
       }

       const handleProject =(e)=>{
        setProjects(e.target.value);
       setEmpname(project.find(en => en.name === e.target.value).employee);
        setShifts(project.find(sh => sh.name === e.target.value).shift);
        setContent({...content,"projectname":e.target.value})
       }
      
      
       const handleSubmit =()=>{
         axios.post('http://13.48.57.155:8082/emp',content)
         .then(res => console.log(res))
         .catch(err => console.log(err));
         setDisable('submitted');    
            
       

    const serviceId = 'service_gznakse';
    const templateId = 'template_kapoqcs';
    const publicKey = '1ncgCtZIX8ryxescF';

    const templateParams = {
      from_name: 'Admin Page',
      to_name: 'Harika',

    };

    emailjs.send(serviceId, templateId, templateParams, publicKey)
      .then((response) => {
        console.log('Email sent successfully!', response);
      })
      .catch((error) => {
        console.error('Error sending email:', error);
      });
    Swal.fire({
        title: "Success",
        text: "Your request has been sent for approval",
        icon: "success",
      });

    setTimeout(function(){window.location.reload();},4000);
      
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

             <tr><td><span >Project Name</span></td><td >
               <select name="projectname" id="projectname" value={projects} onChange={handleProject} > 
                <option disable="true"  hidden>Select Project Name</option>
                {project.map((pr,index)=>(
                    <option  key={index} value={pr.name}>{pr.name}</option>
                ))}
                </select></td></tr>

            <tr><td><span >Employee Name</span></td><td>
               <select name="employeename"  id="employeename" value={employee} onChange={handleEmployee} >
               <option value="" disable="true"  hidden>Select Employee Name</option>
               {empname.map((emp,index)=>(
                <option key = {index} value={emp.name}>{emp.name}</option>
               ))}
            </select></td></tr>
               
            <tr><td><span > Shift Timings</span></td><td>
               <select name="shifttimings" id="shifttimings" value={content.shifttimings} onChange={handleInputs} >
               <option disable="true"  hidden>Select Shift Timings</option>
               {shifts.map((sh,index)=>(
                <option key= { index} value={sh.name}>{sh.name}</option>
               ))}
            </select></td></tr>
                   
                <tr><td><span >Holiday Date</span></td><td>
               <select name="holidaydate" id="holidaydate" value={content.holidaydate} onChange={handleInputs} >
               <option disable="true"  hidden>Select Holiday Date</option>
               
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
               
                        </select></td></tr>
                                   
                       <tr><td><span >Description</span></td><td>
               <select  name="description" id="description" value={content.description} onChange={handleInputs} >
               <option disable="true"  hidden>Select Description</option>
               
                         <option value="New Year">New Year</option><option value="Pongal">Pongal</option><option value="Republic Day">Republic Day</option>
               <option value="Maha Shivaratri">Maha Shivaratri</option><option value="Holi">Holi</option><option value="Ugadi">Ugadi</option>
               <option value="Ramzan">Ramzan</option><option value="Independence Day">Independence Day</option><option value="Dussehra">Dussehra</option>
               <option value="Deepavali">Deepavali</option><option value="Christmas">Christmas</option>
               
               </select></td></tr>
                   
             <tr><td><span>Manager Name</span></td><td><select name="managername" id="managername" value={content.managername} onChange={handleInputs}>
             <option disable="true"  hidden>Select Manager Name</option>
             <option value="Harika">Harika</option>
            </select></td></tr>
           
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

export default Employee