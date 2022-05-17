CREATE TABLE order_items(
    ID SERIAL PRIMARY KEY,
    product_id integer NOT NULL,
    order_id bigint REFERENCES orders(ID) ON DELETE CASCADE,
    quantity integer NOT NULL
);