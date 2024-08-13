const express = require("express");
const app = express();

app.get("/notes", async (req, res)=> {
   
    res.send( "Hello");
})

app.listen(9090, () =>{
    console.log('Server is running on port 9090');
})

