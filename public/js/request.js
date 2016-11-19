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

function completetask(value)
{
  console.log(value);
  $.ajax({
    type:"POST",
    data:{id:value},
    url:"/completetask",
    success:function(dataobj)
    {
      console.log(dataobj);
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
            $('.currenttask').prepend("<div class='tasks'><span class='check'><input type='checkbox' class='check'  id='checkbox_id' value='value'/></span><span class='text'><span class='title'><label for='checkbox_id' class='title'>"+data.user_task+"</label></span><br/><span class='time'>"+data.time+"</span></span></div>")
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
