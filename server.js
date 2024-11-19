const { createServer } = require('http');

const host = "127.0.0.1";
const port = 3000;

const server = createServer((req, res) => {
    res.statusCode = 200
    res.setHeader("Content-Type", 'text/plain');
    res.end("Hello, Node.js!")

})

server.listen(port, host, ()=> {
    console.log(`server is running at https://${host}:${port}`)
})