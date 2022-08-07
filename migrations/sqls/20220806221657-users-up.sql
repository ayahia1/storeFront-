CREATE TABLE users (
    id SERIAL PRIMARY KEY, 
    user_name VARCHAR(50) NOT NULL, 
    first_name VARCHAR(50) NOT NULL, 
    last_name VARCHAR(50), 
    password text NOT NULL, 
    role VARCHAR(10) DEFAULT 'client',
    UNIQUE(user_name)
);