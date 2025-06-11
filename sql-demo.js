// CREATE TABLE todos (
//   id INTEGER PRIMARY KEY AUTOINCREMENT,
//   title TEXT NOT NULL,
//   completed_at TIMESTAMPTZ,
//   user_id INTEGER NOT NULL
// );

// sqlite> INSERT INTO users (name, password, birthday)
//   VALUES ('Antonio', '2b00042f7481c7b056c4b410d28f33cf',
//   '24-07-1900 11:44');

// sqlite> INSERT INTO users (name, password)
//   VALUES ('Bertha', '55555555555555555555555555555555');

// sqlite> SELECT users.name, todos.title, todos.completed_at 
//         FROM todos
//         INNER JOIN users on todos.user_id = users.id;
// ┌─────────┬─────────────┬──────────────┐
// │ name    │    title    │ completed_at │
// ├─────────┼─────────────┼──────────────┤
// │ Antonio │ wash dishes │ ...          │
// ├─────────┼─────────────┼──────────────┤
// │ Antonio │ feed cat    │ ...          │
// ├─────────┼─────────────┼──────────────┤
// │ Bertha  │ do laundry  │ ...          │
// └─────────┴─────────────┴──────────────┘

// sqlite> SELECT * FROM users;

//#1
// -- Selecting the "first_name" column and renaming it as "First Name"
// -- Selecting the "last_name" column and renaming it as "Last Name"
// ## answer
// SELECT first_name "First Name", last_name "Last Name" FROM employees

// SQLite Exercise: Get unique department ID from employee table
// answer
//SELECT DISTINCT department_id FROM employees;

// -- Selecting all columns from the "employees" table
// SELECT * 
// -- Specifying the table from which to retrieve the data, in this case, "employees"
// FROM employees 
// -- Sorting the result set in descending order based on the "first_name" column
// ORDER BY first_name DESC;

// -- Selecting the "first_name," "last_name," and "salary" columns
// -- Calculating the 15% of the "salary" and aliasing it as "PF" (Provident Fund)
// SELECT first_name, last_name, salary, salary * 0.15 PF 
// -- Specifying the table from which to retrieve the data, in this case, "employees"
// FROM employees;

// -- Selecting the "employee_id," "first_name," "last_name," and "salary" columns
// -- Specifying the table from which to retrieve the data, in this case, "employees"
// SELECT employee_id, first_name, last_name, salary 
// -- Sorting the result set in ascending order based on the "salary" column
// FROM employees ORDER BY salary;


//USING WHERE, GROUPBY, HAVING
// SELECT
//     customer_id,
//     COUNT(order_id) AS total_orders,
//     SUM(total_amount) AS total_spent
// FROM
//     orders
// WHERE
//     order_date >= '2025-06-01' AND order_date <= '2025-06-30'  -- Orders within June 2025
// GROUP BY
//     customer_id
// HAVING
//     COUNT(order_id) > 1  -- Customers with more than 1 order
// ORDER BY
//     total_spent DESC;

//USING UPDATE
// Let's say you want to update the price of a product in the products table.

// products Table Structure (Example):
// id	name	description	price
// 1	Laptop	High-performance laptop	1200.00
// 2	Mouse	Wireless mouse	25.00
// 3	Keyboard	Ergonomic keyboard	75.00

// UPDATE products
// SET price = 1250.00
// WHERE id = 1;

//USING DELETE
// DELETE FROM products
// WHERE id = 2;

//USING ALTER
// ALTER TABLE products
// ADD COLUMN weight REAL;

// USING LIKE
// Find products whose names start with "L":
// SELECT name FROM products WHERE name LIKE 'L%';
// This will return "Laptop".

// Find products whose names contain "Mouse":
// SELECT name FROM products WHERE name LIKE '%Mouse%';
// This will return "Wireless Mouse" and "Gaming Mouse".

// Find products whose names end with "e":
// SELECT name FROM products WHERE name LIKE '%e';
// This will return "Keyboard".

// Find products whose names have "i" as the second character:
// SELECT name FROM products WHERE name LIKE '_i%';
// This will return "Wireless Mouse" and "Gaming Mouse".

// Find products whose names are exactly 6 characters long:
// SELECT name FROM products WHERE name LIKE '______';  -- Six underscores
// This will return "Laptop" and "Keyboard".

// Case-Insensitive Search (using LOWER()):
// SELECT name FROM products WHERE LOWER(name) LIKE LOWER('%mouse%');
// This will return "Wireless Mouse" and "Gaming Mouse" regardless of the case of "mouse".

//USING I LIKE
// Given the following products table:

// id	name	description	price	weight
// 1	Laptop	High-performance laptop	1250.00	2.5
// 3	Keyboard	Ergonomic keyboard	75.00	1.0
// 4	Wireless Mouse	Standard wireless mouse	20.00	0.2
// 5	Gaming Mouse	High-precision gaming mouse	35.00	0.25
// 6	Apple Product	An apple a day	5.00	0.1

// The query:
// SELECT name FROM products WHERE LOWER(name) LIKE LOWER('%apple%');

// Will return:
// Apple Product

// And the query:
// SELECT name FROM products WHERE LOWER(description) LIKE LOWER('%apple%');

// Key Takeaway:

// When you want a case-insensitive LIKE search in SQLite, always use LOWER() or UPPER() 
// to convert both the column and the search pattern
//  to the same case before performing the LIKE comparison. 
//  There is no direct ILIKE operator in SQLite.
 

// SELECT
//     l.location_id,
//     l.street_address,
//     l.city,
//     l.state_province,
//     c.country_name
// FROM
//     departments d
// NATURAL JOIN
//     locations l
// NATURAL JOIN
//     countries c;