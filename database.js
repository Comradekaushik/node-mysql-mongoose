const mysql = require('mysql2');

const dotenv = require ('dotenv');
dotenv.config()



// const pool = mysql.createPool({
//     host: "127.0.0.1",
    
//     user: "root",
//     password: "2992Kaushik@returntothemotherland",
//     database : "notes_app"
// }).promise();



const pool = mysql.createPool({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE
}).promise()



// pool.query(
//     "SELECT * FROM notes"
// ).then((result)=>{
//     console.log(result[0])
// })

// async function getAllnotes() {
//     // const [rows] = await pool.query("select * from notes");
//     const rows = await pool.query("select * from notes");
//     return rows[0];
// }
// const notes = async ()=> await getAllnotes();
// console.log(notes);

async function getAllnotes() {
    const [rows] = await pool.query("select * from notes");
     //destructuring the array
    // This is an example of array destructuring. It extracts the first element from 
    // the  array and assigns it to the variable rows. 
    // If the result is an array, rows will hold the value of its first element.
    return rows;
  }
 

async function main() {
    try {
        const notes = await getAllnotes();
        console.log(notes);
    } catch (error) {
        console.error("Error fetching notes:", error);
    }
}

// main();
async function getNote(id) {
    // const [rows] = await pool.query(`SELECT *  FROM notes WHERE id = ${id} `);


    //  Through a url perhaps where someone could try and
    //  manipulate the value to perform a SQL injection attack. To prevent this,
    //  we should use prepared statements. This means putting a quesion mark
    //  where the potentially unsafe value should be and passing 
    //  the value to the query function in an array.
    
    const [rows] = await pool.query(`SELECT *  FROM notes WHERE id = ? `,[id]);
    return rows;

    // Now the id and the query will get sent to MySQL separatly and MySQL will only treat 
    // id as a value, it won't execute it as a query. This is much safer.
}

// getNote(1).then((note)=>{
//     console.log(note);

// });

// getNote(3).then((note)=>{
//     console.log(`note:`,note[0].contents);

// });


//insert statement

async function createNote(title, contents) {
    const [result] = await pool.query(`
    INSERT INTO notes (title, contents)
    VALUES (?, ?)
    `, [title, contents]);
    // const id = result.insertId;

    // return getNote(id);
    return result;
}



let queryAnswer ; // Declare globally

createNote("test title", "test content")
    .then((result) => {
        queryAnswer = result; // Assign value
        // Use queryAnswer here
        console.log(queryAnswer);
    })
    .catch((error) => {
        console.error("Error:", error);
    }).finally(() => {
        // Use queryAnswer here (inside another .then() or async function)
        console.log("Outside .then():", queryAnswer);});









// createNote("test title","test content").then((result)=>{
//     const queryAnswer = result;
//     console.log(`note:`,result);

// });

module.exports = {getAllnotes, getNote, createNote}


  



