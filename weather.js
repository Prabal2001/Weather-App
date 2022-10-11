const express=require('express');
const https=require('https');
const bodyParser=require("body-parser");
const app=express();
app.use(bodyParser.urlencoded({extended:true}));
app.get("/",function(req,res){
  res.sendFile(__dirname + "/index.html");
});
app.post("/",function(req,res){
  const query=req.body.cityName;
 const apikey="bae7a0dae82dbab91fe95ad4bc05ec86";
  const url="https://api.openweathermap.org/data/2.5/weather?q=" + query +"&appid=" + apikey +"&units=metric";
  https.get(url,function(response){
    console.log(response.statusCode);
    response.on("data",function(data){
     const weatherData=JSON.parse(data);
     console.log(weatherData);
     console.log(data);
     const temp=weatherData.main.temp;
     const weatherDesc=weatherData.weather[0].description;
     res.setHeader("Content-Type", "text/html");
     res.write("<h1>The temperature in " + query + " is " + temp + " degrees Celcius.</h1>");
     res.write("<h3><em>The Weather is currently "+weatherDesc+"</h3></em>");
     res.send();
    });
});
  });

app.listen(process.env.PORT || 3000,function(){
    console.log("server is running on port 3000");
});
