CREATE DATABASE IF NOT EXISTS todoDB;
ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'password';

USE todoDB;

DROP TABLE IF EXISTS todoDB;

CREATE TABLE  todoList(
	id INT PRIMARY KEY AUTO_INCREMENT,
	completed BOOLEAN DEFAULT 0,
    text VARCHAR(255) NOT NULL
);

INSERT INTO  todoList(text)
VALUES
('Watch movie'),
('Buy milk');

SELECT * FROM todoList;