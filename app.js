const express = require("express");
const bodyParser = require("body-parser");
const request  = require("request");
const https = require("https");

const app = new express();

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));

app.get("/", function(req, res){
    res.sendFile(__dirname + "/signup.html");
})

app.post("/", function(req,res){
    //get info from form
    const info = req.body;
    const firstName = info.firstName;
    const lastName = info.lastName;
    const email = info.email;
    // console.log(info);
    //crete oject to send to mailchimp api call
    const data = {
        members : [
            {
                email_address : email,
                status : "subscribed",
                merge_fields : {
                    FNAME : firstName,
                    LNAME : lastName
                }
            }
        ]
    }

    //convert object to string
    const jsonData = JSON.stringify(data);

    //make request
    const url  = "https://us8.api.mailchimp.com/3.0/lists/f667fcf01f";
    const options = {
        method : "POST",
        auth : "prasad:1ddf575a183695f6ed9674a260c6cd79-us8"
    }

    const request = https.request(url, options, function(response){
        //redirect based on status code
        if(response.statusCode == 200){
            //res.send("Sucessfully subscribed!");
            res.sendFile(__dirname + "/success.html");
        } else{
            //res.send("There was an error with signing up, please try again!");
            res.sendFile(__dirname + "/failure.html");
        }

        response.on("data", function(data){
            console.log(JSON.parse(data));
        })
    });

    request.write(jsonData);
    request.end();

});

app.post("/failure", function(req, res){
    res.redirect("/");
});


app.listen(3000, function(){
    console.log("Server is running on port 3000");
});


// Api Key
// 1ddf575a183695f6ed9674a260c6cd79-us8

// List Id
// f667fcf01f