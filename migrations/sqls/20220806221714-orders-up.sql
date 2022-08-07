CREATE TABLE orders (
    id SERIAL PRIMARY KEY, 
    status boolean DEFAULT true, 
    user_name VARCHAR(50) REFERENCES users(user_name)
)