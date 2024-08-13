const express = require('express');
const { default: mongoose } = require('mongoose');
const app = express();
const cors = require("cors");

const port = 9090;
const host = 'http://127.0.0.1:' + port;



// Middleware setup
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use (express.static('./public'));
app.use(cors()); // whitelist all incoming IP addresses


// MongoDB Connection - mongoose
const mongodbURL = 'mongodb://127.0.0.1:27017/school';
mongoose.connect (mongodbURL,{"dbName": "school" })
.then((result) =>{                   //   |
                                     //   |--->if you have to specify a particular database
    // console.log('*** Connected ***', result);
    console.log("***connected***")
} ) 
.catch((error) => {
    handleError(error.message)
});


function handleError(error) { 
    console.log(error);
}




// Step 2: Create a Schema
const studentSchema =  new mongoose.Schema(
    {
    "id": {type: Number, required: true, unique:true},
    "first_name": {type: String, required:true},
    "last_name": {type: String, required: true},
    "age": {type: Number, required: true},
    "email": {type: String, required: true, unique:true},
    "gender": {type: String, required:true},
    "ip_address": {type: String, required:true}
    }
);
    

// Step 3: Create a model (collection / tables); 13:34
const Student = mongoose.model("students", studentSchema);




// APIs
app.get('/', async (req, res) => {
    res.send('Hi');
});


app.get('/students', async (req, res)=>{
    const result = await Student.find();

    res.send(result);

});




app.get('/students/age/:age', async (req, res)=>{
    let age = Number(req.params.age);
    const result = await Student.find({"age" : age});

    res.send(result);

});

app.get('/students/name/:name', async (req, res)=>{
    let name = req.params.name;
    const result = await Student.find({"name" : name}).collation({"locale" : "en","strength" : 1});

    res.send(result);

});

app.post("/students/post", async(req,res)=>{
    const data = {
        "id":154,
        "first_name": "Karl",
        "last_name": "Venlix",
        "age": 43,
        "email": "andven@duck.com",
        "gender": "Male",
        "ip_address": "220.25.457.256"

    }
    const result = await Student.insertMany(data);
    res.send(result);
})

app.put("/students/update/:id",async(req,res)=>{
    const id = Number(req.params.id);
    const data = req.body;
    const first_name = req.body.first_name;
    
    // const result = await Student.updateOne({id},{$set : {"first_name" : first_name} });
    const result = await Student.updateOne({id},{$set : data });
    res.send(result);
})

app.delete("/students/delete/:id",async(req,res)=>{
    const id = Number(req.params.id);
   
    const result = await Student.deleteOne({id});
    res.send(result);
})



app.listen(port, () => console.log( `Server is running on port ${port} and host is ${host}`));