const express = require('express');
const taskRouter = express.Router();

const pool = require('../modules/pool');

// GET
taskRouter.get('/', (req, res) => {
    let sqlText = `SELECT * FROM "tasksTable" ORDER BY "id";`;
    pool.query(sqlText)
    .then((response) => {
    console.log('Got rows of tasks from server', response.rows)
        res.send(response.rows);
    }).catch((error) => {
        console.log('Error on GET:', error);
        res.sendStatus(500);
    });
});

taskRouter.post('/', (req, res) => {
    console.log('tasks arrived on server', req.body);
    let taskObj= req.body;
    //add the tasks to the database
    let sqlText = `INSERT INTO "tasksTable" ("status","task","dueDate","priority") VALUES($1,$2,$3,$4)`;
    pool.query(sqlText, [taskObj.status, taskObj.task, taskObj.dueDate,taskObj.priority])
    .then((result) => {
        console.log(`task added to database`, result);
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
    let taskObj = req.body; 
    let taskId = req.params.id; 
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