CREATE TABLE "tasksTable"(
    "id" SERIAL PRIMARY KEY,
    "task" VARCHAR(250) NOT NULL,
    "dueDate" DATE
);

INSERT INTO "tasksTable" ("task","dueDate") VALUES('Finish the weekend challenge', '03/29/2020');
INSERT INTO "tasksTable" ("task","dueDate") VALUES('Do your laundry', '03/28/2020');
INSERT INTO "tasksTable" ("task","dueDate") VALUES('Study and read some books', '03/28/2020');
INSERT INTO "tasksTable" ("task","dueDate") VALUES('Buy some Groceries', '03/29/2020');
INSERT INTO "tasksTable" ("task","dueDate") VALUES('Practice meditation and self-reflection', '03/29/2020');
INSERT INTO "tasksTable" ("task","dueDate") VALUES('Write some poems', '03/28/2020');
INSERT INTO "tasksTable" ("task","dueDate") VALUES('Clean the kitchen', '03/28/2020');
INSERT INTO "tasksTable" ("task","dueDate") VALUES('Get your room in order', '03/28/2020');
INSERT INTO "tasksTable" ("task","dueDate") VALUES('Cook some food', '03/28/2020');