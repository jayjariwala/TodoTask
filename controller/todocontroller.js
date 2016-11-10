module.exports = function(app,useragent,mongoose,model)
{

  app.get('/',function(req,res){

    res.render('index');

  });


app.post('/todo',function(req,res){

  var source=req.headers['user-agent'];

  // ua has unique browser information
  var ua=useragent.parse(source);

  console.log(req.body.task);
  if(req.body.task=="")
  {
    var error={ Error:"Please Enter Valid Data"};
    res.render('index',{nodata:error});
  }
  else {
    var unixtimestamp = Math.floor((new Date).getTime()/1000);
    var connection=model.getConnection();
    var user=model.createSchema(connection);
    var todotask = new user({
      user_browser: ua,
      user_task:req.body.task,
      creation_time:unixtimestamp
    });

    todotask.save(function(err){
      if(err) throw err;
      console.log("information stored successfully");
      res.end();
    })


  }

})

app.post('/completed',function(req,res){


})



}
