CREATE DATABASE IF NOT EXISTS databasename;
ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'password';

USE databasename;

DROP TABLE IF EXISTS databasename;

CREATE TABLE urldatabase (
  id INT PRIMARY KEY AUTO_INCREMENT,

);

INSERT INTO  urldatabase(url, alias, secretCode)
VALUES
('8gag.com', '8gag', 1235),
('9gag.com', '9gag', 1234);

SELECT * FROM databasename;