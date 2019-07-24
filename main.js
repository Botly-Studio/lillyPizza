#!/usr/bin/env node
//Raspizza JS remote Arduino uploader

//Web interaction library
const express    = require('express')
    , cors       = require('cors')
    , bodyParser = require('body-parser')
    , fs         = require('fs')
    , path       = require('path');
    
const app        = express()

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));

var basepath    = path.resolve(__dirname);

var corsOptions = {
    origin: 'http://botly-studio.fr',
    optionsSuccessStatus: 200
}

var Blink = "void setup() {pinMode(13, OUTPUT);}void loop() {digitalWrite(13, HIGH);delay(1000);digitalWrite(13, LOW);delay(1000);}"

page = '<!DOCTYPE html>' +
    '<html lang="fr">' +
    '  <head>' +
    '    <title>BotlyStudio Agent</title>' +
    '    <meta charset="utf-8">' +
    '    <style>' +
    '      body {' +
    '        font-family: sans-serif;' +
    '      }' +
    '' +
    '      img {' +
    '        width: 245px;' +
    '      }' +
    '' +
    '      #container {' +
    '        border: 1px dashed #0000ff;' +
    '        border-radius: 6px;' +
    '        padding: 5px 15px 15px 15px;' +
    '        margin: 30px;' +
    '        width: 350px;' +
    '        text-align: center;' +
    '      }' +
    '    </style>' +
    '  </head>' +
    '  <body>' +
    '    <div id="container">' +
    '      <h2>BotlyStudio secret agent</h1>' +
    '      <p>My name is Studio, BotlyStudio</p>' +
    '      <p><img src="https://66.media.tumblr.com/1c8951d890769241ea2c626f9a7446bb/tumblr_n4r027wZBd1rr6qpdo1_250.gif" alt="a spy fox"/></p>' +
    '      <p> Listenning on port : ';

pageEnd = '</p>' +
    '      <form>' +
    '       <input name="code" type="hidden" value="' + Blink + '">' +
    '       <input name="type" type="hidden" value="compile">' +
    '       <button type="submit" formaction="/compile" formmethod="post">Upload Blink.ino</button>' +
    '      </form>' +
    '    </div>' +
    '  </body>' +
    '</html>';



var port = 3000;
page += port + pageEnd;

app.listen(port);

app.get('/', (req, res) => res.send(page))

app.options('/', cors(corsOptions)) // enable pre-flight request for OPTIONS request

app.post('/', cors(corsOptions), function (req, res) {
    res.end("OK");
});

app.options('/compile', cors(corsOptions)) // enable pre-flight request for OPTIONS request

app.post('/compile', cors(corsOptions), function (req, res) {
    console.log(req);
    //return;
    var base64encoded = req.body.data;
    var code = Blink;
    console.log("Base 64 Code : " + base64encoded);
    if (base64encoded != undefined) {
        code = Buffer.from(base64encoded, 'base64').toString('utf8');
        try { fs.writeFileSync(basepath + '/sketch/sketch.ino', code, 'utf-8'); }
        catch (e) {
            console.log('Failed to save the file : ');
            console.log(e); res.end("fail");
            return;
        }
    }else{
        console.log('Nothing received ...')
        console.log(req);
        res.end("fail");
        return;
    }

    console.log("UTF-8 Code : " + code);
    Builder.compile(res);
    //res.end(code);
});





/************************************************
*
*
*					Builder
*
*
*
*************************************************
*/

var Builder = {};
const executablePath = "/opt/lillyPizza/compile.sh";


Builder.compile = function (res) {
    script = executablePath;

    var child = require('child_process').exec;

    child(script, function (err, data) {
        console.log('Error : ' + err);
        var hex = undefined;
        try {
            hex = fs.readFileSync(basepath + '/build/sketch.ino.hex');
            console.log('COMPILED HEX : ' + hex);
        } catch (error) {
            res.end("fail");
            console.log(err);
            return;
        }

        if (err) {
            res.end("fail");
            console.log('Fail : ' + err);
        }
        else {
            var base64Code = Buffer.from(hex, 'hex').toString('base64')
            console.log('COMPILED Base64 : ' + base64Code)
            res.end(base64Code);
        }
    });
}
