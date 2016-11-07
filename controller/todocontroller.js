


module.exports = function(app,useragent)
{

  app.get('/',function(req,res){
    var source=req.headers['user-agent'];

    // ua has unique browser information
    var ua=useragent.parse(source);

    res.render('index');

  });


app.post('/todo',function(req,res){

  console.log(req.body.task);
  if(req.body.task=="")
  {
    console.log("blank");
  }

})

app.post('/completed',function(req,res){


})



}
