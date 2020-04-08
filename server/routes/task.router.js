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
    let tasksObj= req.body;
    //add the treats to the database
    let sqlText = `INSERT INTO "tasksTable" ("status", "task", "dueDate")
    VALUES($1,$2,$3);`;
    pool.query(sqlText, [tasksObj.status, tasksObj.task, tasksObj.dueDate])
    .then((result) => {
        console.log(`tasks added to database`, result);
        res.sendStatus(200);
    }).catch((error) => {
        console.log(`error in adding tasks to database`, error);
        res.sendStatus(500);
    });


});//end POST request

// DELETE
taskRouter.delete('/:id', (req, res) => {
    let tasksId = req.params.id;
    console.log('In delete tasks', tasksId);
    let sqlText = `DELETE FROM "tasksTable" WHERE "id" = $1;`;
    pool.query(sqlText, [tasksId])
    .then((result) => {
        res.sendStatus(200);
    }).catch((error) => {
        console.log('Error:', error);
        res.sendStatus(500);
    })
});

//PUT

taskRouter.put(`/:id`, (req, res) => {
    let tasksObj = req.body; 
    let tasksId = req.params.id; 
    console.log(`updating tasks${tasksId} status"${tasksObj.status}`);
    let sqlText = `UPDATE "tasksTable" SET "status" = $1 WHERE "id" = $2;`;
    pool.query(sqlText, [tasksObj.status, tasksId])
    .then((result) => {
        console.log(`tasks with id ${tasksId} updated`,result);
        res.sendStatus(200);
    })
    .catch((error) => {
        console.log(`error updating tasks status`, error);
        res.sendStatus(500);
    });

});

module.exports = taskRouter;