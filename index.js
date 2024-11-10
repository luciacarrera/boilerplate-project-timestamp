// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/:date", function (req, res) {
  const {date: dateParam} = req.params
  console.log(dateParam)
  let date
  let response

  if(!dateParam){
    date = new Date.now()
  }
  else if(Number(dateParam)){
    date = new Date(Number(dateParam))
  }else if(!dateParam){
    date = new Date.now()
  }else{
    date = new Date(dateParam)
  }


  unix = date.getTime()
  if(isNaN(unix)) {
    response =  {error: "Invalid Date"}
  }else{
    utc = date.toUTCString()
    response = {unix, utc}
  }

  res.json(response);
});

app.get("/api", function (req, res) {
  const date = new Date(Date.now())
  const unix = date.getTime()
  const utc = date.toUTCString()
  res.json({unix, utc});
});


// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
