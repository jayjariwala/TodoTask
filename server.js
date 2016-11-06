var express=require('express');
var app=express();
var controller=require('./controller/todocontroller');
app.use(express.static('./public'));
controller(app);

// setup template engine
app.set('view engine','ejs');

app.get('/',function(req,res){

  res.sendFile(__dirname+"/index.html");

});

var port = Number(process.env.PORT || 8080);
app.listen(port);
