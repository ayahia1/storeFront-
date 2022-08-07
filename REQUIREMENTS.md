# API Requirements

The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application.

## API Endpoints

#### Products

- Index `[GET] 'products/'`
- Show `[GET] 'products/:id'`
- Create [token and admin required] `[POST] products/`
- [OPTIONAL] Products by category (args: product category) `[GET] products/category/:category`
- [OPTIONAL] Top 5 most popular products

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
