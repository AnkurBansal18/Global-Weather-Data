const express = require("express");
const https = require("https"); //no need to install it as it is a native node module
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.urlencoded({extended:true}));

app.get("/", function(req,res){
  res.sendFile(__dirname + "/index.html");
  //res.send("server is running");
});

app.post("/", function(req, res){
//  console.log(req.body.cityName);
  //console.log("post req successfull");
  const query = req.body.City;
  const apiKey = "ecaa2e04fe73e78586fcc111b8c539a3";
  const unit  = "metric";
  const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query +"&APPID="+ apiKey +"&units="+ unit;
  https.get(url , function(response){
    console.log(response.statusCode);

    response.on("data",function(data){   //holding of the data
      //console.log(data);    //we will get op in hexadecimal form (buffer) so to overcome this, we need t0 parse json.
      const weatherData = JSON.parse(data);

      const temp = weatherData.main.temp;
      const des = weatherData.weather[0].description;     //using copy path from awesome json viewer.
      const icon = weatherData.weather[0].icon;
      const imgURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png";


      res.write("<h1>The Tempature in " + query + " is " + temp + " degree celcius. </h1>");
      res.write("<h2>The Weather Condition in " + query + " is currently " + des + ".</h2>");
      res.write("<img src=" + imgURL +">");
      res.send();

    });
  });

})




app.listen(8080, function(){
  console.log("server is running on port 8080");
})
