CREATE TABLE products (
    ID SERIAL PRIMARY KEY,
    name  VARCHAR(250) NOT NULL,
    price INTEGER NOT NULL,
    quantity INTEGER NOT NULL,
    category VARCHAR(255) NOT NULL,
    details VARCHAR(255) NOT NULL,
    rating INTEGER NOT NULL,
    avatar VARCHAR(255)
);