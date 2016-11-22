var moment = require('moment');
var model = require('../model/todomodel');
var mongoose=require('mongoose');


var connection=model.getConnection();

var user=model.createSchema(connection);

//global function

function globalretrivedata(req,res,useragent,reqtype)
{
  var updatedTask =[];
  var renderdata={};
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
    user.find({user_browser : ua.source , status:"finished"},function(err,task){
      if(err) throw err;

      for(var i=0;i<task.length;i++)
      {
        finishedUpdatedTask[i] = {
        user_browser:task[i].user_browser,
        user_task:task[i].user_task,
        status:task[i].status,
        time:moment.unix(task[i].time).format("MMMM DD YYYY @ hh:mm A"),
        id:task[i].time
        }

      }
      if(reqtype == 'completetask')
      {
        console.log("comes in completetask");
         renderdata={incomplete:updatedTask,complete:finishedUpdatedTask}
         res.json(renderdata);
      }
      else {
          res.render('index',{incomplete:updatedTask,complete:finishedUpdatedTask});
      }
    }).sort({'time':-1});

  }).sort({'time':-1});



}









module.exports = function(app,useragent)
{


  var source;
  // ua has unique browser information
  var ua;



  app.get('/',function(req,res){


globalretrivedata(req,res,useragent);



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
  var reqtype=req.body.reqtype;
  console.log("recieved id::"+id);
  console.log("req type"+reqtype);
  var query={ user_browser:ua.source, time:id}
 if( reqtype == " incomplete ")
  {
    console.log("goes in");
    user.update(query,{ $set: {time:unixtimestamp, status:"finished" }}, function(data){
      var sendreq='completetask'
      globalretrivedata(req,res,useragent,sendreq);

    } )

  }
  if( reqtype == " complete ")
  {

    user.update(query,{ $set: {time:unixtimestamp, status:"unfinished" }}, function(data){
      var sendreq='completetask'
      globalretrivedata(req,res,useragent,sendreq);

    } )

  }




})



}
