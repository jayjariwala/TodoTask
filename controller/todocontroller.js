var moment = require('moment');
var model = require('../model/todomodel');
var mongoose=require('mongoose');


var connection=model.getConnection();

var user=model.createSchema(connection);

module.exports = function(app,useragent)
{


  var source;
  // ua has unique browser information
  var ua;



  app.get('/',function(req,res){

    var updatedTask =[];

    var finishedUpdatedTask=[];
    source =req.headers['user-agent'];
    // ua has unique browser information
    ua=useragent.parse(source);


  user.find({user_browser : ua.source,status:"unfinished"},function(err,task){
    if(err) throw err;
    console.log("the task length is"+task.length);

    for(var i=0;i<task.length;i++)
    {
      console.log("goes in");
      updatedTask[i] = {
      user_browser:task[i].user_browser,
      user_task:task[i].user_task,
      status:task[i].status,
      time:moment.unix(task[i].time).format("MMMM DD YYYY @ hh:mm A"),
      id:task[i].time

      }

    }
      findfinishedTask();
  }).sort({'time':-1});


function findfinishedTask()
{
  user.find({user_browser : ua.source , status:"finished"},function(err,task){
    if(err) throw err;

    for(var i=0;i<task.length;i++)
    {
      finishedUpdatedTask[i] = {
      user_browser:task[i].user_browser,
      user_task:task[i].user_task,
      status:task[i].status,
      time:moment.unix(task[i].time).format("MMMM DD YYYY @ hh:mm A")
      }

    }
     randerdata();
  }).sort({'time':-1});
}
function randerdata()
    {
      res.render('index',{incomplete:updatedTask,complete:finishedUpdatedTask});
    }


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
    var newobj={};
    var todotask = new user({
      user_browser: ua.source,
      user_task:req.body.task,
      time:unixtimestamp,
      status:"unfinished",
    });

    todotask.save(function(err){
      if(err) throw err;
      console.log("information stored successfully");
    })
    newobj.user_task=req.body.task;
    newobj.time=moment.unix(todotask.time).format("MMMM DD YYYY @ hh:mm A");
    newobj.status=todotask.status;
    newobj.t_id=todotask.time;
res.json(newobj);
  }

})

app.post('/completetask',function(req,res){
  var unixtimestamp = Math.floor((new Date).getTime()/1000);
  source =req.headers['user-agent'];
  // ua has unique browser information
  ua=useragent.parse(source);
  var id=req.body.id;
  var query={ user_browser:ua.source, time:id}
  user.update(query,{ $set: {time:unixtimestamp, status:"finished" }}, function(data){
    res.end();
  } )


})



}
