const http = require('http')
const fs = require('fs')
const url = require('url')
const qs = require('querystring')
const sanitizeHtml = require('sanitize-html')
const template = require('./views/template.js')

const app = http.createServer(function (request, response) {
    const _url = request.url
    const queryData = url.parse(_url, true).query
    const pathname = url.parse(_url, true).pathname
    if (pathname === '/') {
        if (queryData.id === undefined) {
            const title = '간단한 ToDo 리스트 예제 실습'
            fs.readdir('data/', function (err, data) {
                const list = template.List(data)

                const html = template.HTML(title, list);
                response.writeHead(200)
                response.end(html)
            })
        } else {
            fs.readdir('data/', function (err, data) {
                let list = `<tr style="margin-bottom:20px;">`

                for(let i = 0; i < data.length; i++){
                    list += `<td>#</td>
                <td id="todo_${data[i]}">
                    <a href="/id=${data[i]}" style="text-decoration:none; color:#333;">${data[i]}</a>
                </td>
                <td>
                    <button type="button" class="btn btn-success" id="todo_success_${data[i]}">완료</button>
                    <button type="button" class="btn btn-success" id="todo_cancel_${data[i]}" style="display:none">취소</button>
                </td>
                <td><button type="button" class="btn btn-danger" id="todo_delete_${data[i]}">삭제</button></td>`
                }

                list += `</tr>`

                fs.readFile(`data/${queryData.id}`, 'utf8', function (err, description) {
                    const title = queryData.id

                    // XSS 방지(게시물 제목과 내용에  script를 못 넣도록 함)
                    const sanitizedTitle = sanitizeHtml(title)
                    const sanitizedDescription = sanitizeHtml(description)


                    const html = template.HTML(title, list);
                    response.writeHead(200)
                    response.end(html)
                })
            });
        }
    }
})
app.listen(3434)