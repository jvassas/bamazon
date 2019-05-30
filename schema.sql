DROP DATABASE IF EXISTS bamazon;
CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products(
  item_id INT AUTO_INCREMENT NOT NULL,
  product_name VARCHAR(45) NOT NULL,
  department_name VARCHAR(45) NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  stock_quantity INT(10) NOT NULL,
  primary key(item_id)
);

SELECT * FROM products;

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Basketball", "Sports", 49.99, 200), 
("Sunglasses", "Apparel", 70.99, 100),
("Beach Chair", "Outdoor", 40.00, 50),
("Football", "Sports", 45.99, 150),
("Heavy Duty Cooler", "Outdoor", 89.99, 50),
("Boat Shoes", "Shoes", 75.99, 40),
("Nike Kyrie 5", "Shoes", 99.99, 15),
("Insulated Water Bottle", "Outdoor", 29.99, 100),
("Swim Trunks", "Apparel", 25.99, 40),
("Bucket Hat", "Apparel", 20.99, 10);