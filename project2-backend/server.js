const express = require ("express");
const  mysql = require('mysql');
const cors = require('cors');


const app= express()

app.use(express.json());
app.use(cors())

const db = mysql.createConnection({
  host            : 'localhost',
  user            : 'root',
  password        : '',
  database        : 'employee'
})

app.post('/emp',(req,res)=>{
    const sql="INSERT INTO register(`id`,`employeename`,`projectname`,`shifttimings`,`holidaydate`,`description`,`managername`) Values(?)";

    const values = [req.body.id, req.body.employeename, req.body.projectname, req.body.shifttimings, req.body.holidaydate, req.body.description, req.body.managername]

    db.query(sql,[ values],(err,data)=>{
        if(err)
        return res.json(data);
    })
})

app.listen(8081,()=>{
    console.log("Listening on port number 8081")
})