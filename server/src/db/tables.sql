--users table
CREATE TABLE users (
  user_no SERIAL PRIMARY KEY,
  user_email VARCHAR(50) UNIQUE NOT NULL,
  user_password TEXT NOT NULL,
  user_name VARCHAR(50) NOT NULL,
  reg_date double precision
);