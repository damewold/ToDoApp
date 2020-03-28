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
    let taskObj = req.body;
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













module.exports = taskRouter;