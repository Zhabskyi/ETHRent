DROP TABLE IF EXISTS transactions CASCADE;
DROP TABLE IF EXISTS items CASCADE;
DROP TABLE IF EXISTS users CASCADE;

CREATE TABLE users (
  id SERIAL PRIMARY KEY NOT NULL,
  first_name VARCHAR(255) NOT NULL,
  last_name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL,
  city VARCHAR(255) NOT NULL,
  address VARCHAR(255) NOT NULL,
  province VARCHAR(255) NOT NULL,
  postal_code VARCHAR(7) NOT NULL,
  phone_number VARCHAR(16) NOT NULL,
  map VARCHAR(255)
);


CREATE TABLE items (
  id SERIAL PRIMARY KEY NOT NULL,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  created_on DATE NOT NULL DEFAULT CURRENT_DATE,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  daily_rate DECIMAL DEFAULT 0,
  deposit DECIMAL DEFAULT 0,
  photo VARCHAR(255) NOT NULL
);

CREATE TABLE transactions (
  id SERIAL PRIMARY KEY NOT NULL,
  item_id INTEGER REFERENCES items(id) ON DELETE CASCADE,
  owner_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  borrower_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  start_date DATE NOT NULL DEFAULT CURRENT_DATE
);