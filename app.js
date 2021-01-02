
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");

app.use(bodyParser.urlencoded({extended: true}));

//Adding all the local CSS file and images files..

app.use(express.static("public"));

app.get("/", function(req, res){
  res.sendFile(__dirname + "/signup.html");
});

app.post("/", function(req, res){
  const first = req.body.First;
  const last = req.body.Last;
  const email = req.body.Email;

  //Fetching the value from the Login Page / HTML Page

  const data = {
    members : [
      {
        email_address : email,
        status : "subscribed",
        merge_fields : {
          FNAME : first,
          LNAME : last
        }
      }
    ]
  };
const jsonData = JSON.stringify(data);

const url = "https://us7.api.mailchimp.com/3.0/lists/e7d6c83916";
const options = {
  method : "post",
  auth : "Luffy57:ceb840f11fba853eddf9d09474638d92-us7"
}

//Connecting with Server and fetching Data

const request = https.request(url, options, function(response){
  response.on("data", function(data){
    console.log(JSON.parse(data));

    if (response.statusCode === 200){
      res.sendFile(__dirname + "/success.html");
    }
    else{
      res.sendFile(__dirname + "/failure.html");
    }
  });
});

//Passing data to mailChimps ( external server )
request.write(jsonData);
request.end();
});

app.post("/failure", function(req1, res1){
  res1.redirect("/");
});

app.listen(process.env.PORT, function(){
  console.log("Server working on port 3000 Yo");
})

//API Key -- ceb840f11fba853eddf9d09474638d92-us7
//Unique List ID -- e7d6c83916
