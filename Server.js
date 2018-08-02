var express = require('express');
var mongoose = require('mongoose')
var path = require('path');
var cors = require('cors');
var bodyParser = require('body-parser');
var base64 = require('base-64');

// Express setup
var app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

// mongoose.connect(/*process.env.MONGODB_URI*/)
// mongoose.connection.on('connected', function() {
//   console.log('Connected to MongoDB!')
// })
// mongoose.connection.on('error', function(err) {
//   console.log(err)
// })

let url = process.env.TONE_ANALYZER_URL;
let username = process.env.TONE_ANALYZER_USERNAME;
let password = process.env.TONE_ANALYZER_PASSWORD;

app.post('/checkEmotionsOfChat', function(req, res) {
  res.send(req.body);
  // fetch(url + "/v3/tone_chat?version=2018-06-15", {
  //   method: "POST",
  //   headers: new Headers({
  //     "Content-Type": "application/json",
  //     "Authorization": "Basic " + base64.encode(username + ":" + password)
  //   }),
  //   body: JSON.stringify({
  //     utterances: arr
  //   })
  // }).then(res => res.json())
  // .then((resp) => {
  //   console.log(resp);
  //   if (resp.utterances_tone.length > 0) {
  //     console.log(resp.utterances_tone);
  //     return resp.utterances_tone;
  //   } else {
  //     console.log("No emotion");
  //     return;
  //   }
  // })
  // .catch((err) => {
  //   // network error
  //   console.log('error', err)
  // })
})



app.listen(1337, function() {
  console.log("Server started!")
})
