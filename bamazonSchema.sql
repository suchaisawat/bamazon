DROP DATABASE IF EXISTS products_DB;
CREATE DATABASE products_DB;

-- Create a MySQL Database called bamazon.
-- Then create a Table inside of that database called products.
USE products_DB;

CREATE TABLE products(
  item_id INT NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(100) NOT NULL,
  department_name VARCHAR(45) NOT NULL,
  price INT default 0,
  stock_quantity INT default 0,
  PRIMARY KEY (item_id)
);


-- Insert 10 different products
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ('Sceptre 75"Class 4K (2160P) LED TV (U750CV-U)', 'TV', 1199.00, 26);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ('Samsung 65" Class Curved 4K (2160P)Smart LED TV)', 'TV', 1179.00, 35);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ('HP Stream 14" Laptop, Windows 10 Home', 'Laptop', 179.00, 3);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ('HP Silver Iridium Ci5 15-cc050wm 15.6" Laptop', 'Laptop', 569.00, 10);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ('Microsoft Office Home and Student 2016', 'Software', 129.00, 2);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ('H&R Block Tax Software Basic 2017', 'Software', 14.97, 5);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ('WD Blue 1TB Desktop Hard Disk Drive', 'Digital Storage', 50.57, 10);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ('SanDisk Ultra II 480GB SATA III 2.5-Inch 7mm Solid State Drive', 'Digital Storage', 159.99, 15);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ('WD 4TB My Book Desktop External Hard Drive - USB 3.0', 'Digital Storage', 119.99, 5);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ('Link Depot Gold-Plated HDMI to VGA Converter Adapter for PC and Laptop', 'Computer Cables', 7.60, 20);
