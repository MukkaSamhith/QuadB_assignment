CREATE TABLE tickers (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50),
    last NUMERIC,
    buy NUMERIC,
    sell NUMERIC,
    volume NUMERIC,
    base_unit VARCHAR(50)
);
