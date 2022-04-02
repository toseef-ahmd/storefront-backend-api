# API Requirements

## API Endpoints
#### Products
- Index **[GET]** (http://localhost:8000/products)
- Show (args: product id) **[GET]** (http://localhost:8000/products/:id)
- Create (args: Product) ***[token required]* [POST]** (http://localhost:8000/products)
- Update (args: id, Product) ***[token required]* [PUT]** (http://localhost:8000/products/:id)
- Delete (args: product id) ***[token required]* [DELETE]** (http://localhost:8000/products/:id)

#### Users
- Index ***[token required]* [GET]** (http://localhost:8000/users)
- Show (args: id) ***[token required]* **[GET]** (http://localhost:8000/users/:id)
- Create (args: User) **[POST]** (http://localhost:8000/users)
- Update (args: id) ***[token required]* [UPDATE]** (http://localhost:8000/users/:id)
- Delete (args: id) ***[token required]* [DELETE]** (http://localhost:8000/users/:id)
- Authenticate (args: user, password) ***[token required]* [POST]** (http://localhost:8000/users/authenticate)

#### Orders
- Create a new Order (args: Order) ***[token required]* [POST]** (http://localhost:8000/orders)
- Index *[token required]* **[GET]** (http://localhost:8000/orders/)
- Show (args: id) ***[token required]* [GET]** (http://localhost:8000/orders/:id)
- Update (args: id) ***[token required]* [PUT]** (http://localhost:8000/orders/:id)
- Delete (args: id) ***[token required]* [DELETE]** (http://localhost:8000/orders/:id)
- Add Products in an order (args: product_id, quantity) ***[token required]* [POST]** (http://localhost:8000/orders/:id/products)
- Current Order by user (args: user id) ***[token required]* [GET]** (http://localhost:8000/user_orders/) 

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


