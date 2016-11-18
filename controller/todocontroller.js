var moment = require('moment');
var requesttype;
module.exports = function(app,useragent,mongoose,model)
{

  var updatedTask =[];
  var finishedUpdatedTask=[];
  var source;
  // ua has unique browser information
  var ua;

  var connection=model.getConnection();
  var user=model.createSchema(connection);

  app.get('/',function(req,res){

    source =req.headers['user-agent'];
    // ua has unique browser information
    ua=useragent.parse(source);
    findunfinishedTask();
function findunfinishedTask()
{
  user.find({user_browser : ua.source,status:"unfinished"},function(err,task){
    if(err) throw err;

    for(var i=0;i<task.length;i++)
    {
      updatedTask[i] = {
      user_browser:task[i].user_browser,
      user_task:task[i].user_task,
      status:task[i].status,
      time:moment.unix(task[i].time).format("MMMM DD YYYY @ hh:mm A")
      }

    }
      findfinishedTask();
  }).sort({'time':-1});

}
function findfinishedTask()
{
  user.find({user_browser : ua.source , status:"unfinished"},function(err,task){
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

    var todotask = new user({
      user_browser: ua.source,
      user_task:req.body.task,
      time:unixtimestamp,
      status:"unfinished"
    });

    todotask.save(function(err){
      if(err) throw err;
      console.log("information stored successfully");
      todotask.time=moment.unix(todotask.time).format("MMMM DD YYYY @ hh:mm A");
      res.json(todotask);
    })


  }

})

app.post('/completedtask',function(req,res){
requesttype = req.body.type;


})



}
