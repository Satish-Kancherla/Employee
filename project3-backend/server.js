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
            // return res.json(result);
          }
    })
})

// app.post("/create", (req, res) => {
//     const values = [req.body.employeeid,req.body.employeename, req.body.projectname, req.body.shifttimings, req.body.holidaydate, req.body.description, req.body.managername,req.body.status]
         
//     db.query(
//       "INSERT INTO register (`employeeid`,`employeename`,`projectname`,`shifttimings`,`holidaydate`,`description`,`managername`,`status`) Values(?)",
//       [values],(err, res) => {
//         if (err) {
//           console.log(err);
//         } else {
//           result.send("You have registered successfully!");
//         }
//       }
//     );
// }); 


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
   
  // app.put("/users/:id", (req, res) => {
  //   const userId = req.params.id;
  //   // const id =req.params.id;
  //   const sql ="UPDATE register SET  `status` = ? WHERE id = ?";

  //   const values = [req.body.id,req.body.status];

  //   db.query(sql, [...values,userId], (err, result) => {
  //       if (err) {
  //         console.log(err);
  //       } else {
  //         res.send(result);
  //       }
  //     }
  //   );
  // });

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