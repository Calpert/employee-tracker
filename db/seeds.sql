USE employees;
INSERT INTO department
(name)
VALUES
("accounting"), ("sales"), ("human resources"), ("customer service");

INSERT INTO role
(title, salary, department_id)
VALUES
("accounting manager", 80000, 1),
("sales person", 50000, 2),
("human resources manager", 70000, 3),
("customer service representative", 40000, 4);
