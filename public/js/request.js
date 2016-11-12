$(document).ready(function(){

  $('form').submit(function(){
    var taskdata=$('#task').val();
    var formdata={ task: taskdata }

    $.ajax({
        type:"POST",
        url:"/todo",
        data: formdata,
        success: function(data)
        {
          console.log("I have "+data);
        },
        error: function(err)
        {
          console.log("something went wrong");
        }

      })
  })

})
