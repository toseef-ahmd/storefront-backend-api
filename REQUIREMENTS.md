# API Requirements

## API Endpoints
#### Products
- Index 
- Show (args: product id) (https://link-url-here.org)
- Create (args: Product)[token required]
- Update (args: id, Product)[token required]
- Delete (args: product id)[token required]

#### Users
- Index [token required]
- Show (args: id)[token required]
- Create (args: User)
- Update (args: id)[token required]
- Delete (args: id)[token required]
- Authenticate (args: user, password)[token required]

#### Orders
- Create a new Order (args: Order)[token required]
- Index [token required]
- Show (args: id)[token required]
- Update (args: id)[token required]
- Delete (args: id)[token required]
- Add Products in an order (args: product_id, quantity)[token required] (http://localhost:8000/orders/:id/products)[token required]
- Current Order by user (args: user id)[token required] (http://localhost:8000/user_orders/)[token required]

## Data Shapes
#### Product
- id
- name
- price
- category

#### User
- id
- username
- firstName
- lastName
- password

#### Orders
- id
- user_id
- status of order (active or complete)

#### Order Items
- id
- product_id
- quantity


