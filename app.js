const express=require("express");
const app=express();
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
const https=require("https");



app.use(express.static("public"));


app.get("/",function(req,res){
  res.sendFile(__dirname+"/index.html");
});




app.post("/",function(req,res){
  const fname=req.body.fname;
  const mname=req.body.mname;
  const mail=req.body.em;

  const data={
    members:[{
      email_address:mail,
      status:"subscribed",
      merge_fields:{
        FNAME:fname,
        LNAME:mname

      }
    }]
  };
  const jsonData=JSON.stringify(data);
  const url="https://us5.api.mailchimp.com/3.0/lists/2ea07112e3"
  const options={
    method:"POST",
    auth:"rishabh_agni:025ca68d59ce2171c7810a9294533023-us5"
  };
  const request=https.request(url,options,function(response){
    if(response.statusCode === 200){
      res.sendFile(__dirname+"/success.html");
    }
    else{
      res.sendFile(__dirname+"/failure.html");

    }
 response.on("data",function(data){
   console.log(JSON.parse(data));
 })
  })
  request.write(jsonData);
  request.end();

})

app.post("/failure",function(req,res){
  res.redirect("/");
});




app.listen(process.env.PORT || 3000,function(){
  console.log("server is running");
});

//025ca68d59ce2171c7810a9294533023-us5
//list id: 2ea07112e3
