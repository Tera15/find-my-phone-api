'use strict'

const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors');
const accountSid = 'AC4c225d10bc768dc81bb6bcc8d68e3e8e';
const authToken = '05727e6eec9a4a78e8ecea2a9c768d06';
const client = require('twilio')(accountSid, authToken);

// Create a new instance of express
const app = express()
const phoneNumber = []
const nums = phoneNumber[0];
app.use(cors())

// Tell express to use the body-parser middleware and to not parse extended bodies
app.use(bodyParser.json())

const makeCall = () => {
      client.calls.create({
            twiml: '<Response><Say>You found me!</Say></Response>',
            to: `+1${phoneNumber[0]}`,
            from: '+19564310314'
          })
         .then(call => console.log(call.sid));
         console.log(`calling ${phoneNumber[0]}`)
}

// Route that receives a POST request to /sms
app.post('/', function(request, response){
      console.log(request.body.number);      // your JSON
      response.send(request.body);    // echo the result back
      phoneNumber.pop() //make sure array only contains one index
      phoneNumber.push(request.body.number)
      console.log(phoneNumber, `+1${phoneNumber[0]}`)
      makeCall();
      
    });
    

// Tell our app to listen on port 3000
app.listen(3001, function (err) {
  if (err) {
    throw err
  }

  console.log('Server started on port 3001')
})