const http = require('http')
const fs = require('fs')

const app = http.createServer(function(req, res){
    let url = '/views/index.html'
    res.end(fs.readFileSync(__dirname + url))
});

app.listen(3434)