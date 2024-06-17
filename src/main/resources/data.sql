CREATE TABLE users (
                       id BIGINT PRIMARY KEY,
                       name VARCHAR(255) NOT NULL,
                       email VARCHAR(255) UNIQUE NOT NULL,
                       password VARCHAR(255) NOT NULL
);


INSERT INTO users (id, name, email, password) VALUES ('1', 'John Doe', 'john.doe@example.com', 'john');
INSERT INTO users (id, name, email, password) VALUES ('2', 'Jane Smith', 'jane.smith@example.com', 'jane');
