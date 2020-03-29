//check the client is sourced right
console.log('js')

$( document ).ready( function(){
//check if jquery is sourced right
console.log('jquery');
getTasks();
//setup event listeners 
setupClickListeners();
$('#mainContainer').on('click','.deleteButton', handleDelete);
$('#mainContainer').on('click','.complete-btn', editKoala);

})

function setupClickListeners (){
    $( '#addButton' ).on( 'click', function(){
        console.log( 'in addButton on click' );
        // get user input and put in an object
        let taskToSend = {
         status:'Task Not Completed',
          task: $('#taskIn').val(),
          dueDate: $('#dueDateIn').val(),
        };
        $('#taskIn').val('');
        $('#dueDateIn').val('');

        // call saveTask with the new object
        saveTask( taskToSend );
      });
      
     
};

function getTasks(){
    console.log( 'in getTasks' );
  // ajax call to server to get koalas
  
    $.ajax({
      method: 'GET',
      url: '/tasks',
    }).then((response) => {
      console.log(`Got tasks from server`, response);
      renderTasksToDOM(response);
    }).catch((error) => {
      console.log(`error in getting tasks from server`, error);
    });
}//end getTask

//POST request
function saveTask( newTasks){
    console.log( 'in saveTask', newTasks );
    $.ajax({
      method:'POST',
      url: '/tasks',
      data: newTasks
    }).then((response) => {
      console.log(`tasks added`, response);
      getTasks();
    }).catch((error) => {
      console.log(`error adding tasks`, error);
    });
}

function renderTasksToDOM(tasks){
    console.log('in render');
    //empty the container
     $('#mainContainer').empty();
    //append the data
    for(let i = 0; i <tasks.length; i += 1){
      let task = tasks[i];
     
      let $tr=$(`<tr></tr>`);
//for each task, append a new row to out table
      $tr.data('task', task.id);
// for row, append a button to indicate complition of the task
    if(task.status === 'Task Not Completed'){
        $tr.append(`<td><button class="complete-btn">Complete</button></td>`);
      }
      else{$tr.append(`<td><button class="complete-btn">Task Completed</button></td>`);}
      $tr.append(`<td>${task.task}</td>`);
      $tr.append(`<td>${task.dueDate}</td>`); 
      $tr.append(`<td><button class="deleteButton">Delete</button></td>`);
      $('#mainContainer').append($tr);
    }
  };

  function editKoala(event){
      event.preventDefault();
    let taskId = $(this).parent().parent().data('task');  
    let status = 'Task Not Completed';
    let newStatus= $(this).parent().parent().text();
   
    if (status === 'Task Not Completed'){
      newStatus = 'Task Completed';
    }else if(status === 'Task Completed'){
      newStatus = 'Task Not Completed';
    }
   
    console.log(`in task editor`, taskId, status);
    $.ajax({
      method: 'PUT',
      url: `/tasks/${taskId}`,
      data: {status: newStatus}
    }).then((response) => {
      console.log(`the status of task is changed`, response);
      getTasks();
    }).catch((error) => {
      console.log(`error`, error);
    });
    
    }

  function handleDelete (event){
    event.preventDefault();
    console.log('in handleDelete');
    $.ajax({
      method: 'DELETE',
      url: `/tasks/${$(this).closest('tr').data('task')}`
    }).then((response) => {
      console.log('Got DELETE request to server', response);
      getTasks();
    }).catch((error) => {
      console.log(`error`, error);
    });
  }