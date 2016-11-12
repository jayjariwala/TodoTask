var mongoose=require('mongoose');

module.exports =
{

getConnection : function()
{
  return mongoose.connect('mongodb://test:test@ds149567.mlab.com:49567/fcctodotask');
}
,
createSchema : function(mongoose)
{
  var Schema=mongoose.Schema;
  var taskSchema= new Schema({
    user_browser: Object,
    user_task:String,
    time:String,
    status:String
  });

return user=mongoose.model('user-task',taskSchema);

}


}
