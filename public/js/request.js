function abc()
{
  if($(".check_main").is(":checked") == true)
  {

    $('.completedtask').show();
    $('.currenttask').hide();
  }
  else {
    $(".completedtask").hide();
    $('.currenttask').show();

  }
}
function incompletetask()
{}
function completetask(value)
{

  $.ajax({
    type:"POST",
    data:{id:value},
    url:"/completetask",
    success:function(dataobj)
    {
      $('.currenttask').html('');
      for(var i=0; i< dataobj.incomplete.length;i++)
      {
      $('.currenttask').append("<div class='tasks'><span class='check'><input type='checkbox' class='check'  id='check"+i+"' value='' onclick='completetask("+dataobj.incomplete[i].id+")'/></span><span class='text'><span class='title'><label for='check"+i+"'class='title'>"+dataobj.incomplete[i].user_task+"</label></span><br/><span class='time'>Created on "+dataobj.incomplete[i].time +"</span></span></div>");
      }
    },
    error: function(err)
    {
      console.log("something wrong");
    }

  });
}

$(document).ready(function(){
$(".completedtask").hide();

  $('#post').click(function(){
    console.log("it is clicked");

    var taskdata=$('#task').val();

    if(taskdata == "")
    {
      console.log("do something");
    }
    else
    {
      var formdata={ task: taskdata }

      $.ajax({
          type:"POST",
          url:"/todo",
          data: formdata,
          success: function(data)
          {
            console.log("timestamp value"+data.t_id);
            $('.currenttask').prepend("<div class='tasks'><span class='check'><input type='checkbox' class='check'  id='"+data.t_id+"' value='value' onclick='completetask("+data.t_id+")'/></span><span class='text'><span class='title'><label for='"+data.t_id+"' class='title'>"+data.user_task+"</label></span><br/><span class='time'> Created on "+data.time+"</span></span></div>")
            $('#task').val('')
          },
          error: function(err)
          {
            console.log("something went wrong");
          }

        })


    }


  })

var checkbox=$('.c_tasks:checkbox:checked').val();

console.log("checkbox  value:" +checkbox);



})
