//setting up express for access
const express =require('express');
const app=express();
const bodyparser=require('body-parser');
const port = 3000;
const taskRouter=require('./routes/task.router');

//use bodyparser 
app.use(bodyparser.urlencoded({extended:true}));
app.use(express.static('server/public'));

//setup the routes
app.use('/tasks', taskRouter);

//start listening
app.listen(3000, ()=>{
    console.log('listening on port', 3000);
})


