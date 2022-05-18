CREATE TABLE order_items(
    ID SERIAL PRIMARY KEY,
    product_id bigint REFERENCES products(ID) ON DELETE CASCADE,
    order_id bigint REFERENCES orders(ID) ON DELETE CASCADE,
    quantity integer NOT NULL
);