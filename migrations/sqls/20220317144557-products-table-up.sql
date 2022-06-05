CREATE TABLE products (
    ID SERIAL PRIMARY KEY,
    product  VARCHAR(250) NOT NULL,
    price INTEGER NOT NULL,
    quantity INTEGER NOT NULL,
    details VARCHAR(255) NOT NULL,
    rating INTEGER NOT NULL,
    avatar VARCHAR(255)
);