const http = require('http');
var redis = require("redis");
var url = require('url');
const crypto = require('crypto');

/********************************
# Redis connection
********************************/
var client = redis.createClient(6379, 'redis');

client.on("error", (err) => {
    console.log("Error " + err);
});
client.on("connect", () => {
    console.log("connected to redis");
});

function replyWith(res, status='', data={}){
    switch(status){
        case("SERVER_ERROR"):
            res.writeHead(503, { 'Content-Type': 'application/json' });
            res.end('Something went wrong');
            break;
        case("BAD_USER_INPUT"):
            res.writeHead(403, { 'Content-Type': 'application/json' });
            res.end('Bad user input');
            break;
        case("PAGE_NOT_FOUND"):
            res.writeHead(404, { 'Content-Type': 'application/json' });
            res.end('404 Not found');
            break;        
        case("DATA_NOT_FOUND"):
            res.writeHead(404, { 'Content-Type': 'application/json' });
            res.end('Data Not found');
            break;
        case("DATA_FOUND"):
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(data));
            break;             
        case("CREATED"):
            res.writeHead(201, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(data));
            break;     
        default:
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end('Hello,World');
            break;
    }
}

/********************************
# Create http server
********************************/
var server = http.createServer((req, res) =>{
    var headers = req.headers
    var pathname = url.parse(req.url, true).pathname;
    console.log(pathname);

    if( headers['content-type'] && headers['content-type'] != "application/json"){
        replyWith(res, "OK")
        return
    }
    switch(req.method){
        case("GET"):
            var paths = pathname.split('/').filter((value, index) =>{
                return value.length > 0;
            })
            console.log(paths);
            if( paths.length == 2 && paths[0] == "messages" ){
                client.get(paths[1], (err, reply)=>{
                    if( err != null){
                        console.log(err);
                        replyWith(res, "SERVER_ERROR");
                        return
                    }
                    if( reply == null){
                        console.log("Key" + paths[1] + "not found");
                        replyWith(res, "DATA_NOT_FOUND");
                        return
                    }else{
                        replyWith(res, "DATA_FOUND", {"message": reply});
                        return  
                    }
                    
                })
            }else{
                replyWith(res, "PAGE_NOT_FOUND")
                return
            }
            break;
        case("POST"):
            var buffer = ""
            if(pathname == "/messages"){
                req.on('data', (chunk) => {
                    buffer += chunk
                })
                req.on('end', () => {
                    console.log(buffer);
                    var jdata = JSON.parse(buffer);
                    var message = jdata['message'];
                    var emessage = crypto.createHash('sha256').update(message).digest('hex');
                    client.set(emessage, message);
                    console.log(message, emessage)
                    replyWith(res, "CREATED", {"digest": emessage});
                })
            }else{
                replyWith("PAGE_NOT_FOUND");
            }
            break;
        default:
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end('Hello, Paxos!!!');
            break;

    }
    
})

/********************************
# Start listening
********************************/
server.listen(process.env['NODE_PORT'] || 3000, "0.0.0.0")