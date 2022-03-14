DROP TABLE IF EXISTS items;

CREATE TABLE items (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    title TEXT NOT NULL,
    textfield TEXT NOT NULL,
    website TEXT NOT NULL,
    logo TEXT NOT NULL,
    truthy_thing BOOLEAN,
    number_thing INT
);