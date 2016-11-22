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

function completetask(value, reqstatus)
{

  $.ajax({
    type:"POST",
    data:{id:value,reqtype:reqstatus},
    url:"/completetask",
    success:function(dataobj)
    {
      $('.currenttask').html('');
      $('.completedtask').html('');
      if(dataobj.incomplete.length == 0)
      {
        $('.currenttask').html('<div class="notasks"><h4>No Task Found</h4> Add a task using form above, or switch the toggle to see completed task </center></div>');
      }
      if(dataobj.complete.length == 0)
      {
        $('.completedtask').html('  <div class="notasks"><h4>No History Found</h4>complete some task first and comeback to see the task history</div>');
      }
      for(var i=0; i< dataobj.incomplete.length;i++)
      {
      $('.currenttask').append("<div class='tasks'><span class='check'><input type='checkbox' class='check'  id='check"+i+"' value='' onclick='completetask("+dataobj.incomplete[i].id+",&quot incomplete &quot)'/></span><span class='text'><span class='title'><label for='check"+i+"'class='title'>"+dataobj.incomplete[i].user_task+"</label></span><br/><span class='time'>Created on "+dataobj.incomplete[i].time +"</span></span></div>");
      }
      for(var i=0; i< dataobj.complete.length;i++)
      {
          $('.completedtask').append("<div class='c_tasks'><span class='check'><input type='checkbox' class='check'  id='discheck"+i+"' value='' onclick='completetask("+dataobj.complete[i].id+",&quot complete &quot)'/></span><span class='text'><span class='title'><label for='discheck"+i+"'><strike>"+dataobj.complete[i].user_task+"</strike></label></span><br/><span class='time'>Finished on "+dataobj.complete[i].time +"</span></span></div>");
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
      var formdata={ task: taskdata };

      $.ajax({
          type:"POST",
          url:"/todo",
          data: formdata,
          success: function(data)
          {
            $('.notasks').hide();
            var inc="incomplete";
            $('.currenttask').prepend("<div class='tasks'><span class='check'><input type='checkbox' class='check'  id='"+data.t_id+"' value='value' onclick= 'completetask("+data.t_id+",&quot incomplete &quot)'/></span><span class='text'><span class='title'><label for='"+data.t_id+"' class='title'>"+data.user_task+"</label></span><br/><span class='time'> Created on "+data.time+"</span></span></div>");
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
