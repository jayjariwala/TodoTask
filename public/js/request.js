function abc()
{
  if($(".check_main").is(":checked") == true)
  {
    $.ajax({
      type:"POST",
      data:{type:"switch"},
      url:"/completedtask",
      success: function(data)
      {
        console.log("data recieved"+data);
      },
      error: function(err)
      {
        console.log("something went wrong");
      }
    })
    $('.completedtask').show();
    $('.currenttask').hide();
  }
  else {
    $(".completedtask").hide();
    $('.currenttask').show();

  }
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


})
