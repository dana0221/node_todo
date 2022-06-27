const http = require('http')
const fs = require('fs')

// 서버생성
const app = http.createServer(function(req, res){
    let url = '/views/index.html'
    res.end(fs.readFileSync(__dirname + url))   // index.html 불러와서 보여주기
});

// 포트번호 지정
app.listen(3434)