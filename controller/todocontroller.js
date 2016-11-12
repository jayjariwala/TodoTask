
module.exports = function(app,useragent,mongoose,model)
{

  var source;
  // ua has unique browser information
  var ua;

  var connection=model.getConnection();
  var user=model.createSchema(connection);

  app.get('/',function(req,res){

    source =req.headers['user-agent'];
    // ua has unique browser information
    ua=useragent.parse(source);

    user.find({user_browser : ua.source,status:"unfinished"},function(err,task){
      if(err) throw err;

      res.render('index',{incomplete:task});

    }).sort({'time':-1});




  });
app.post('/',function(req,res)
{
  res.end("came here?");
})

app.post('/todo',function(req,res){


  source =req.headers['user-agent'];
  // ua has unique browser information
  ua=useragent.parse(source);


  console.log(req.body.task);
  if(req.body.task=="")
  {
    var error={ Error:"Please Enter Valid Data"};
    res.render('index',{nodata:error});
  }
  else {
    var unixtimestamp = Math.floor((new Date).getTime()/1000);

    var todotask = new user({
      user_browser: ua.source,
      user_task:req.body.task,
      time:unixtimestamp,
      status:"unfinished"
    });

    todotask.save(function(err){
      if(err) throw err;
      console.log("information stored successfully");
      res.json(todotask);


    })


  }

})

app.post('/completed',function(req,res){


})



}
