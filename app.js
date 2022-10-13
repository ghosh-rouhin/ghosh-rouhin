const express=require("express");
const body_parser=require("body-parser");
const https=require("https");
const request  = require("request");
//const client=require("@mailchimp/mailchimp_marketing");
const app=express();
app.use(express.static("public"));
app.use(body_parser.urlencoded({extended: true}))
app.get("/",function(req,res){
    res.sendFile(__dirname+ "/signup.html");
})
app.post("/",function(req,res){
    const email=req.body.email1;
    const contract=req.body.contract1;
    const first=req.body.firstName1;
    const last=req.body.lastName1;
    const data = {
        members:[{
      email_address: email,
      status: "subscribed",
      merge_fields: {
        FNAME: first,
        LNAME: last,
        PHONE: contract
    }
    }]
};
    console.log(data); // (optional) 
    var jSONDATA=JSON.stringify(data);
    const url="https://us11.api.mailchimp.com/3.0/lists/aff64832e9";
    const option={
        method: "POST",
        headers:{
        Authorization: "auth 7f037b6ff4a8242fee37242aa5387ffa-us11"},
        body: jSONDATA
    }
    const re=https.request(url,option,function(response){
        if(response.statusCode===200){
            res.sendFile(__dirname+ "/success.html")
        }else{
            res.sendFile(__dirname+ "/failure.html")
        }
        response.on("data",function(data){
            console.log(JSON.parse(data));
        })
    })
    re.write(jSONDATA);
    re.end();
});
app.post("/failure",function(req,res){
    res.redirect("/");
})
app.listen(process.env.PORT || 3000,function(){
    console.log("Server is running at 3000");
})
//          7f037b6ff4a8242fee37242aa5387ffa-us11
//API KEY : 7f037b6ff4a8242fee37242aa5387ffa-us11
//Unique Id : aff64832e9