const express = require("express");
const bodyParser = require("body-parser");
const request  = require("request");

const app = new express();

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));

app.get("/", function(req, res){
    res.sendFile(__dirname + "/signup.html");
})

app.post("/", function(req,res){
    const data = req.body;
    let firstName = data.firstName;
    let lastName = data.lastName;
    let email = data.email;
    console.log(data);
})

app.listen(3000, function(){
    console.log("Server is running on port 3000");
})