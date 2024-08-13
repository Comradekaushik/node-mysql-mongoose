const express = require('express');
const app = express();
const {MongoClient} = require('mongodb');
const port = 9090;
const host = 'http://127.0.0.1:' + port;

// MongoDB Connection
const mongodbURL = 'mongodb://127.0.0.1:27017';
const client = new MongoClient (mongodbURL);
async function connect(){

    try {
        const conn = await client.connect();
        const database =  conn.db('school');
        const coll =  database.collection('students');
        const result = await coll.find().toArray();

        //to find  a data with a id of 5

        // const result = await coll.find({"age":32}).toArray();

        return result;
    } catch(error) {
        console.error("Error:", error);
    }
}

async function connect2(options = {}){

    try {
        const conn = await client.connect();
        const database =  conn.db('school');
        const coll =  database.collection('students');
        // const result = await coll.find().toArray();

        //to find  a data with a id of 5

        const result = await coll.find(options).toArray();

        return result;
    } catch(error) {
        console.error("Error:", error);
    }
}




// APIs
app.get('/', async (req, res) => {
    res.send('Hi');
});


app.get('/students', async (req, res)=>{
    const result = await connect();

    res.send(result);

});

// app.get('/a/b/:t', async (req, res)=>{
    

//     res.send(`Hello /a/b/:t ${req.params.t}`);

// })

// app.get('/a/c/:u', async (req, res)=>{
    

//     res.send(`Hello /a/c/:u ${req.params.u}`);

// })


app.get('/students/age/:age', async (req, res)=>{
    let age = Number(req.params.age);
    const result = await connect2({"age" : age});

    res.send(result);

});

app.get('/students/name/:name', async (req, res)=>{
    let name = req.params.name;
    const result = await connect2({"name" : name});

    res.send(result);

});



app.listen(port, () => console.log( `Server is running on port ${port} and host is ${host}`));