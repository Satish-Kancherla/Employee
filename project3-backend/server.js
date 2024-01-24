const express = require ("express");
const app= express();
const  mysql = require('mysql');
const cors = require('cors');

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  user            : 'root',
  host            : 'localhost',
  password        : '',
  database        : 'employee'
});

app.get('/',(req,res)=>{
    res.send('Hello World!')
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
   
  app.post("/users/:id", (req, res) => {
    const userId = req.params.id;
    // const id =req.params.id;
    const sql ="UPDATE register SET  status = ? WHERE id = ?";

    // const values = [req.bod
console.log("22",req.body)
    db.query(sql, ["Approved",userId], (err, result) => {
        if (err) {
          console.log(err);
        } else {
          res.send(result);
        }
      }
    );
  });

  app.post('/details/:id',(req,res)=>{
    // const sql="INSERT INTO register(`id`,`employeename`,`projectname`,`shifttimings`,`holidaydate`,`description`,`managername`,`status`) Values(?)";

    // const values = [req.body.id, req.body.employeename, req.body.projectname, req.body.shifttimings, req.body.holidaydate, req.body.description, req.body.managername,req.body.status]

    // db.query(sql,[ values],(err,data)=>{
      const userId = req.params.id;
      const sql ="UPDATE register SET  `status` = ? WHERE id = ?";

    const values = [req.body.id,req.body.status];

    db.query(sql, [...values,userId], (err, data) => {

        if(err)
        return res.json(data);
    })
})

app.listen(8082,()=>{
    console.log("Listening on port number 8082");
})


// const express = require ('express');
// const  mysql = require('mysql');
// const cors = require('cors');


// const app= express()

// app.use(express.json());
// app.use(cors())

// const db = mysql.createConnection({
//   host            : 'localhost',
//   user            : 'root',
//   password        : '',
//   database        : 'employee'
// })
// app.get('/',(req,res)=>{
//     res.send('Hello World!')
// })

// app.get("/users",(req,res)=>{
//     db.query("SELECT * FROM register",(err,result)=>{
//         if(err){
//             console.log(err);
//         } else {
//             res.send(result);
//           }
//     })
// })

// app.post("/create", (req, res) => {
//     const values = [req.body.employeeid,req.body.employeename, req.body.projectname, req.body.shifttimings, req.body.holidaydate, req.body.description, req.body.managername,req.body.status]
         
//     db.query(
//       "INSERT INTO register (`employeeid`,`employeename`,`projectname`,`shifttimings`,`holidaydate`,`description`,`managername`,`status`) Values(?)",
//       [values],(err, result) => {
//         if (err) {
//           console.log(err);
//         } else {
//           result.send("You have registered successfully!");
//         }
//       }
//     );
// }); 


// app.get("/userdetails/:id", (req, res) => {
//     const id = req.params.id;
//     db.query("SELECT * FROM register WHERE id = ?",id, (err, result) => {
//       if (err) {
//         console.log(err);
//       } else {
//         res.send(result);
//       }
//     });
//   });
   
//   app.put("/users/:id", (req, res) => {
//     const id =req.params.id;
//     const sql ="UPDATE register SET `employeename`= ?,`projectname`= ?, `status` = ? WHERE id = ?";

//     const values = [req.body.employeename, req.body.projectname, req.body.shifttimings, req.body.holidaydate, req.body.description, req.body.managername,req.body.status];

//     db.query(sql, [...values,userId], (err, result) => {
//         if (err) {
//           console.log(err);
//         } else {
//           res.send(result);
//         }
//       }
//     );
//   });

//   app.post('/details',(req,res)=>{
//     const sql="INSERT INTO register(`employeename`,`projectname`,`shifttimings`,`holidaydate`,`description`,`managername`,`status`) Values(?)";

//     const values = [ req.body.employeename, req.body.projectname, req.body.shifttimings, req.body.holidaydate, req.body.description, req.body.managername,req.body.status]

//     db.query(sql,[ values],(err,data)=>{
//         if(err)
//         return res.json(data);
//     })
// })

// app.listen(8082,()=>{
//     console.log("Listening on port number 8082")
// })