const express = require("express");
const app = express();


function log(){
    console.log("requested");
}

app.get("/notes", async (req, res)=> {
    log();
   
    res.send( "Hello");
})

app.listen(9091, () =>{
    console.log('Server is running on port 9091');
})