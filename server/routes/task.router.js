const express = require('express');
const taskRouter = express.Router();

const pool = require('../modules/pool');

// GET
taskRouter.get('/', (req, res) => {
    let sqlText = `SELECT * FROM "tasksTable" ORDER BY "id";`;
    pool.query(sqlText)
    .then((response) => {
        res.send(response.rows);
    }).catch((error) => {
        console.log('Error on GET:', error);
        res.sendStatus(500);
    });
});

taskRouter.post('/', (req, res) => {
    console.log('tasks arrived on server', req.body);
     taskObj = req.body;
    //add the tasks to the database
    let sqlText = `INSERT INTO "tasksTable" ("status,"task","dueDate") VALUES($1,$2,$3);`;
    pool.query(sqlText, [taskobj.status,taskobj.task, taskObj.dueDate])
    .then((result) => {
        console.log(`task added to database`);
        res.sendStatus(200);
    }).catch((error) => {
        console.log(`error in adding task to database`, error);
        res.sendStatus(500);
    });


});//end POST request

// DELETE
taskRouter.delete('/:id', (req, res) => {
    let taskId = req.params.id;
    console.log('In delete task', taskId);
    let sqlText = `DELETE FROM "tasksTable" WHERE "id" = $1;`;
    pool.query(sqlText, [taskId])
    .then((result) => {
        res.sendStatus(200);
    }).catch((error) => {
        console.log('Error:', error);
        res.sendStatus(500);
    })
});

//PUT

taskRouter.put(`/:id`, (req, res) => {
    let taskObj = req.body; //this is the information about the task, 
    //even though we only care about the status right now, I'm sending a whole task
    let taskId = req.params.id; //id of the task to update
    console.log(`updating task${taskId} status${taskObj.status}`);
    let sqlText = `UPDATE "tasksTable" SET "status" = $1 WHERE "id" = $2;`;
    pool.query(sqlText, [taskObj.status, taskId])
    .then((result) => {
        console.log(`task with id ${taskId} updated`,result);
        res.sendStatus(200);
    })
    .catch((error) => {
        console.log(`error shifting task status`, error);
        res.sendStatus(500);
    });

});












module.exports = taskRouter;