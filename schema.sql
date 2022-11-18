DROP TABLE IF EXISTS articles_categories;
DROP TABLE IF EXISTS categories;
DROP TABLE IF EXISTS comments;
DROP TABLE IF EXISTS articles;
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS roles;

CREATE TABLE roles(
  name varchar(10) UNIQUE NOT NULL PRIMARY KEY
);

CREATE TABLE users(
  id SERIAL PRIMARY KEY,
  email varchar(255) UNIQUE NOT NULL,
  password_hash varchar(255) NOT NULL,
  first_name varchar(255) NOT NULL,
  last_name varchar(255) NOT NULL,
  avatar varchar(50),
  role varchar(10) NOT NULL,
  FOREIGN KEY (role) REFERENCES roles(name)
);

CREATE TABLE articles(
  id SERIAL PRIMARY KEY,
  title varchar(255) NOT NULL,
  created_at timestamp DEFAULT current_timestamp,
  picture varchar(50) NOT NULL,
  full_text text NOT NULL,
  user_id integer NOT NULL,
  FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE categories(
  id SERIAL PRIMARY KEY,
  name varchar(255) NOT NULL
);

CREATE TABLE comments(
  id SERIAL PRIMARY KEY,
  text text NOT NULL,
  created_at timestamp DEFAULT current_timestamp,
  user_id integer NOT NULL,
  article_id integer NOT NULL,
  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (article_id) REFERENCES articles(id)
);

CREATE TABLE articles_categories (
  article_id integer NOT NULL,
  category_id integer NOT NULL,
  PRIMARY KEY (article_id, category_id),
  FOREIGN KEY (article_id) REFERENCES articles(id),
  FOREIGN KEY (category_id) REFERENCES categories(id)
);

CREATE INDEX ON articles(title);
