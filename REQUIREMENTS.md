# API Requirements

## API Endpoints

#### Products

- Index `[GET] 'products/'`
- Show `[GET] 'products/:id'`
- Create [token and admin required] `[POST] products/`
- Products by category (args: product category) `[GET] products/category/:category`

#### Users

- Index [token and admin required] `[GET] 'users/'`
- Show [token and admin required] `[GET] 'users/:user_name'`
- Create `[POST] 'users/'`
- Authenticate `[POST] 'users/authenticate'`
- Current Orders by user (args: user id) [token and identity required] `[GET] 'users/:user_name/orders/'`
- Completed Orders by user [token and identity required] `[GET] 'users/:user_name/orders/completed'`

#### Orders

- Index [token and admin required] `[GET] 'orders/'`
- Show [token and admin required] `[GET] 'orders/:id'`
- Create [token required] `[POST] 'orders/'`

## Data Shapes

#### Product

- id
- name
- price
- [OPTIONAL] category

`TABLE: products (id: SERIAL PRIMARY KEY, name: VARCHAR(50) NOT NULL, price: REAL NOT NULL, category: VARCHAR(100))`

#### User

- id
- user_name
- firstName
- lastName
- password
- role

`TABLE: users (id: SERIAL PRIMARY KEY, user_name: VARCHAR(50), first_name: VARCHAR(50) NOT NULL, last_name: VARCHAR(50), password: text NOT NULL, role:VARCHAR(10) DEFAULT 'client'`

#### Orders

- id
- user_id
- status of order (true for active or false for complete)

`TABLE: orders (id: SERIAL PRIMARY KEY, status: boolean DEFAULT true, user_id: int [REFERENCES users(id)]`

### Orders_Products

- id
- order_id
- product_id
- quantity of each product in the order

`TABLE: orders_products (id SERIAL PRIMARY KEY, order_id INT [REFERENCES orders(id)], product_id INT[REFERENCES products(id)], quantity BIGINT)`
