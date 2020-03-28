CREATE TABLE "tasksTable"(
    "id" SERIAL PRIMARY KEY,
    "status"VARCHAR(1),
    "task" VARCHAR(250) NOT NULL,
    "dueDate" DATE
);

INSERT INTO "tasksTable" ("status","task","dueDate") VALUES('N','Finish the weekend challenge', '03/29/2020');
INSERT INTO "tasksTable" ("status","task","dueDate") VALUES('N','Do your laundry', '03/28/2020');
INSERT INTO "tasksTable" ("status","task","dueDate") VALUES('N','Study and read some books', '03/28/2020');
INSERT INTO "tasksTable" ("status","task","dueDate") VALUES('N','Buy some Groceries', '03/29/2020');
INSERT INTO "tasksTable" ("status","task","dueDate") VALUES('N','Practice meditation and self-reflection', '03/29/2020');
INSERT INTO "tasksTable" ("status","task","dueDate") VALUES('N','Write some poems', '03/28/2020');
INSERT INTO "tasksTable" ("status","task","dueDate") VALUES('N','Clean the kitchen', '03/28/2020');
INSERT INTO "tasksTable" ("status","task","dueDate") VALUES('N','Get your room in order', '03/28/2020');
INSERT INTO "tasksTable" ("status","task","dueDate") VALUES('N','Cook some food', '03/28/2020');

SELECT * FROM "tasksTable" ORDER BY "id";