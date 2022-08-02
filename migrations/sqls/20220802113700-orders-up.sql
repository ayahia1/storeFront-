CREATE TYPE STATUS AS ENUM ('active', 'complete');

CREATE TABLE orders(
    id SERIAL PRIMARY KEY,
    status STATUS,
    product_ids INT[],
    quantities INT[]
);