//check the client is sourced right
console.log('js')

$( document ).ready( function(){
//check if jquery is sourced right
console.log('jquery');
//setup event listeners 

})

function setupClickListeners (){
    $( '#addButton' ).on( 'click', function(){
        console.log( 'in addButton on click' );
        // get user input and put in an object
        let taskToSend = {
          name : $('#taskIn').val(),
          age : $('#dueDateIn').val(),
        };
        // call saveTask with the new object
        saveTask( taskToSend );
      });     
};

function getKoalas(){
    console.log( 'in getKoalas' );
  // ajax call to server to get koalas
    $.ajax({
      method: 'GET',
      url: '/tasks',
    }).then((response) => {
      console.log(`Got tasks from server`, response);
      renderKoalas(response);
    }).catch((error) => {
      console.log(`error in GET`, error);
    });
}//end getTask

