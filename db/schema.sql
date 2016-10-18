CREATE DATABASE racer;

USE racer;

CREATE TABLE users (
  id INTEGER(4) NOT NULL AUTO_INCREMENT,
  username VARCHAR(50),
  password VARCHAR(50),
  PRIMARY KEY (id)
);

INSERT INTO users (username, password) VALUES
('Jasmine', 'Australia'),
('Jay', 'India'),
('Jim', 'Germany'),
('Lesley', 'Scotland');
-- mysql -u root < server/schema.sql
