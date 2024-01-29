const express = require ("express");
const app= express();
const  mysql = require('mysql');
const cors = require('cors');

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  user            : 'admin',
  host            : 'acq-emp-db.crmeuqwsiwsg.eu-north-1.rds.amazonaws.com',
  password        : 'accentiqa123',
  database        : 'acq-emp'
});

app.get('/',(req,res)=>{
    res.send('Hello')
})

app.post('/emp',(req,res)=>{
  const sql="INSERT INTO register(`employeename`,`projectname`,`shifttimings`,`holidaydate`,`description`,`managername`) Values(?)";

  const values = [req.body.employeename, req.body.projectname, req.body.shifttimings, req.body.holidaydate, req.body.description, req.body.managername]

  db.query(sql,[ values],(err,data)=>{
      if(err)
      return res.json(data);
  })
})

app.get("/users",(req,res)=>{
    db.query("SELECT * FROM register",(err,result)=>{
        if(err){
            console.log(err);
            return result.json(err);
        } else {
            res.send(result);
          }
    })
})


app.get("/userdetails/:id", (req, res) => {
    const id = req.params.id;
    db.query("SELECT * FROM register WHERE id = ?",id, (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    });
  });
   

  app.put("/users/:id", (req, res) => {
    const userId = req.params.id;

    const sql ="UPDATE register SET status = ? WHERE id = ?";

    db.query(sql, [req.body.status,userId], (err, result) => {
        if (err) {
          console.log(err);
        } else {
          res.send(result);
        }
      }
    );
  });

  app.post('/details/:id',(req,res)=>{
    const sql="INSERT INTO register(`id`,`employeename`,`projectname`,`shifttimings`,`holidaydate`,`description`,`managername`,`status`) Values(?)";

    const values = [req.body.id, req.body.employeename, req.body.projectname, req.body.shifttimings, req.body.holidaydate, req.body.description, req.body.managername,req.body.status]

    db.query(sql,[ values],(err,data)=>{
        if(err)
        return res.json(data);
    })
})

app.listen(8082,()=>{
    console.log("Listening on port number 8082");
})
