const fs = require('fs');
const http = require("http");
const path = require('path');



// var myReadStream = fs.createReadStream( __dirname + '/new.txt',  { encoding: 'utf8', highWaterMark: 10 * 1024 }); //max chunk size 10kb

// myReadStream.on('data', (chunk)=>{

//     console.log('new chunk received');
//     console.log(chunk);
//     console.log(chunk.length);
//     console.log("|--------------------------------|\n| \t\t\t\t |\n| \t\t\t\t |\n| \t\t\t\t |\n| \t\t\t\t |\n| \t\t\t\t |\n| \t\t\t\t |\n| \t\t\t\t |\n| \t\t\t\t |\n| \t\t\t\t |\n| \t\t\t\t |\n| \t\t\t\t |\n| \t\t\t\t |\n| \t\t\t\t |\n| \t\t\t\t |\n| \t\t\t\t |\n| \t\t\t\t |\n|--------------------------------|\n")
// }); 
//Stream events


const servefile = async(filePath,contentType,response)=>{
   
    try {


        const rawDataStream  = fs.createReadStream(path.join(__dirname,  'new.txt'),  { encoding: !contentType.includes('image') ? 'utf8' : '', highWaterMark: 10 * 1024 });
        // const rawData = await fsPromises.readFile(
        //     filePath,
        //     !contentType.includes('image') ? 'utf8' : ''
        // );
        // const data = contentType === 'application/json'
        //     ? JSON.parse(rawData) : rawData;
        // response.writeHead(
        //     filePath.includes('404.html') ? 404 : 200,
        //     { 'Content-Type': contentType }
        // );

        rawDataStream.on('data', (chunk) => {
            response.write(chunk);
          });

          rawDataStream.on('end', () => {
            response.end();
          });
        // rawDataStream.pipe(response);
        // response.end(
        //     contentType === 'application/json' ? JSON.stringify(data) : data
        // );
    }
    catch(err){
        console.log(err);
        response.statusCode = 500;
        response.end('Server Error');
    }
};




const server = http.createServer((req, res) => {
    res.writeHead(200, { "Content-Type": "text/plain" });
    servefile(path.join(__dirname,  'new.txt'), 'text/html', res);
    // myReadStream.pipe(res); // Pipe the read stream to the response
});

server.listen(3000, () => {
    console.log("Server listening on port 3000");
});
