 ## CREATE TABLE todos (
   id INTEGER PRIMARY KEY AUTOINCREMENT,
   title TEXT NOT NULL,
   completed_at TIMESTAMPTZ,
   user_id INTEGER NOT NULL
 );

 ## sqlite> 
   INSERT INTO users (name, password, birthday)
   VALUES ('Antonio', '2b00042f7481c7b056c4b410d28f33cf',
   '24-07-1900 11:44');

 ## sqlite> 
    INSERT INTO users (name, password)
   VALUES ('Bertha', '55555555555555555555555555555555');

 ## sqlite> 
         SELECT users.name, todos.title, todos.completed_at 
         FROM todos
         INNER JOIN users on todos.user_id = users.id;
 ┌─────────┬─────────────┬──────────────┐
 │ name    │    title    │ completed_at │
 ├─────────┼─────────────┼──────────────┤
 │ Antonio │ wash dishes │ ...          │
 ├─────────┼─────────────┼──────────────┤
 │ Antonio │ feed cat    │ ...          │
 ├─────────┼─────────────┼──────────────┤
 │ Bertha  │ do laundry  │ ...          │
 └─────────┴─────────────┴──────────────┘

 ## sqlite> SELECT * FROM users;

## 1
 -- Selecting the "first_name" column and renaming it as "First Name"
 -- Selecting the "last_name" column and renaming it as "Last Name"
 ## answer
 SELECT first_name "First Name", last_name "Last Name" FROM employees

 SQLite Exercise: Get unique department ID from employee table
 answer
SELECT DISTINCT department_id FROM employees;

 ## Selecting all columns from the "employees" table
 SELECT * 
 -- Specifying the table from which to retrieve the data, in this case, "employees"
 FROM employees 
 ## Sorting the result set in descending order based on the "first_name" column
 ORDER BY first_name DESC;

 ## Selecting the "first_name," "last_name," and "salary" columns
 ## Calculating the 15% of the "salary" and aliasing it as "PF" (Provident Fund)
 SELECT first_name, last_name, salary, salary * 0.15 PF 
 ## Specifying the table from which to retrieve the data, in this case, "employees"
 FROM employees;

 ## Selecting the "employee_id," "first_name," "last_name," and "salary" columns
 ## Specifying the table from which to retrieve the data, in this case, "employees"
 SELECT employee_id, first_name, last_name, salary 
 -- Sorting the result set in ascending order based on the "salary" column
 FROM employees ORDER BY salary;


## USING WHERE, GROUPBY, HAVING
 SELECT
     customer_id,
     COUNT(order_id) AS total_orders,
     SUM(total_amount) AS total_spent
 FROM
     orders
 WHERE
     order_date >= '2025-06-01' AND order_date <= '2025-06-30'  -- Orders within June 2025
 GROUP BY
     customer_id
 HAVING
     COUNT(order_id) > 1  -- Customers with more than 1 order
 ORDER BY
     total_spent DESC;

## USING UPDATE
 Let's say you want to update the price of a product in the products table.

 products Table Structure (Example):
 id	name	description	price
 1	Laptop	High-performance laptop	1200.00
 2	Mouse	Wireless mouse	25.00
 3	Keyboard	Ergonomic keyboard	75.00

 ## UPDATE products
 SET price = 1250.00
 WHERE id = 1;

## USING DELETE
 DELETE FROM products
 WHERE id = 2;

## USING ALTER
 ALTER TABLE products
 ADD COLUMN weight REAL;

 ## USING LIKE
 ## Find products whose names start with "L":
 SELECT name FROM products WHERE name LIKE 'L%';
 ## This will return "Laptop".

 ## Find products whose names contain "Mouse":
 SELECT name FROM products WHERE name LIKE '%Mouse%';
 ## This will return "Wireless Mouse" and "Gaming Mouse".

 ## Find products whose names end with "e":
 SELECT name FROM products WHERE name LIKE '%e';
 ## This will return "Keyboard".

 ## Find products whose names have "i" as the second character:
 SELECT name FROM products WHERE name LIKE '_i%';
 ## This will return "Wireless Mouse" and "Gaming Mouse".

 ## Find products whose names are exactly 6 characters long:
 SELECT name FROM products WHERE name LIKE '______';  -- Six underscores
 ## This will return "Laptop" and "Keyboard".

 ## Case-Insensitive Search (using LOWER()):
 SELECT name FROM products WHERE LOWER(name) LIKE LOWER('%mouse%');
 ## This will return "Wireless Mouse" and "Gaming Mouse" regardless of the case of "mouse".

## USING I LIKE
 Given the following products table:

 id	name	description	price	weight
 1	Laptop	High-performance laptop	1250.00	2.5
 3	Keyboard	Ergonomic keyboard	75.00	1.0
 4	Wireless Mouse	Standard wireless mouse	20.00	0.2
 5	Gaming Mouse	High-precision gaming mouse	35.00	0.25
 6	Apple Product	An apple a day	5.00	0.1

 ## The query:
 SELECT name FROM products WHERE LOWER(name) LIKE LOWER('%apple%');
 ## Will return:
 Apple Product

 ## And the query:
 SELECT name FROM products WHERE LOWER(description) LIKE LOWER('%apple%');

 ## Key Takeaway:
 When you want a case-insensitive LIKE search in SQLite, always use LOWER() or UPPER() 
 to convert both the column and the search pattern
 to the same case before performing the LIKE comparison. 
 There is no direct ILIKE operator in SQLite.
 
## 1. Write a query to find the addresses (location_id, street_address, city, state_province, country_name) of all the departments.
Hint : Use NATURAL JOIN.
 SELECT
     l.location_id,
     l.street_address,
     l.city,
     l.state_province,
     c.country_name
 FROM
     departments d
 NATURAL JOIN
     locations l
 NATURAL JOIN
     countries c;

## Select all records from the Customers table, sort the result alphabetically, first by the column Country, then, by the column City.
SELECT * FROM Customers
ORDER BY
Country,
City;

## Select all records where the City column has the value 'Berlin' and the PostalCode column has the value '12209'.
SELECT
 * FROM Customers
WHERE
 City = 'Berlin'
AND
Postalcode
 = '12209';

## Select all records where the City column has the value 'Berlin' OR 'London'.
SELECT
 * FROM Customers
WHERE
 City = 'Berlin'
OR
City
 = 'London';

## Which SQL query would select all Spanish customers whose names start with 'G' or 'R'?
SELECT * FROM Customers
WHERE Country = 'Spain' AND (CustomerName LIKE 'G%' OR CustomerName LIKE 'R%');

## Use the NOT keyword to select all records where City is NOT "Berlin".
SELECT * FROM Customers
WHERE NOT City
 = 'Berlin';

## INNER JOIN
SELECT
    column1,
    column2,
    ...
FROM
    TableA
INNER JOIN
    TableB ON TableA.common_column = TableB.common_column;

## SQL WHERE
Products Table:
ProductID	ProductName	Price	CategoryID
1	Laptop	        1200	        1
2	Mouse	        25	            2
3	Keyboard	    75	            2
4	Monitor	        300	            1
5	Headphones	    150	            3
6	Webcam	        40	            2
7	Speaker	        90	            3

## SELECT
    ProductName,
    Price
## FROM
    Products
## WHERE
    Price > 100;
## the result
Product Name	Price
Laptop	        1200
Monitor	        300
Headphones	    150

## GROUP BY
The GROUP BY clause is used in SQL to arrange identical data into groups. It's often used with aggregate functions like COUNT(), MAX(), MIN(), SUM(), and AVG().
Think of it like sorting items into bins based on a shared characteristic, and then doing something (like counting or summing) for each bin.

Products Table:
ProductID	ProductName	Price	CategoryID
1	Laptop	        1200	        1
2	Mouse	        25	            2
3	Keyboard	    75	            2
4	Monitor	        300	            1
5	Headphones	    150	            3
6	Webcam	        40	            2
7	Speaker	        90	            3

Categories Table:
CategoryID	CategoryName
1	Electronics
2	Peripherals
3	Audio

## SELECT
    C.CategoryName,
    COUNT(P.ProductID) AS NumberOfProducts
## FROM
    Products P
## INNER JOIN
    Categories C ON P.CategoryID = C.CategoryID
## GROUP BY
    C.CategoryName;

## the result
CategoryName	NumberOfProducts
Audio	                2
Electronics	            2
Peripherals	            3

## HAVING
The HAVING clause is used to filter the results of GROUP BY aggregates. While WHERE filters individual rows before grouping, HAVING filters groups of rows after the GROUP BY operation has been applied and aggregate functions have been calculated.
Think of it this way:
WHERE is like a bouncer at the entrance of a club, only letting certain people in (filtering individual rows).
GROUP BY is like gathering those people into specific groups (e.g., by age, by common interest).
## HAVING is like a second bouncer checking those groups after they've formed (e.g., "only allow groups with more than 10 people").
You cannot use aggregate functions directly in a WHERE clause because WHERE evaluates conditions on individual rows before aggregation occurs. That's where HAVING comes in.

## SELECT
    C.CategoryName,
    COUNT(P.ProductID) AS NumberOfProducts
## FROM
    Products P
## INNER JOIN
    Categories C ON P.CategoryID = C.CategoryID
## GROUP BY
    C.CategoryName
## HAVING
    COUNT(P.ProductID) > 2;

## the result:
CategoryName	NumberOfProducts
Peripherals	3

## AND Operator
The AND operator is a logical operator used in the WHERE clause (and sometimes in JOIN conditions or HAVING clauses) to combine multiple conditions. When you use AND, all the conditions it connects must be TRUE for a row to be included in the result set. If even one of the conditions is FALSE, the entire condition connected by AND becomes FALSE, and that row is excluded.
Think of it like saying: "Give me rows where this is true AND that is also true."

Employees Table:

EmployeeID	FirstName	LastName	Department	Salary	StartDate
    1	    Alice	    Smith	        HR	    60000	2022-01-15
    2	    Bob	        Johnson	        Sales	75000	2021-03-20
    3	    Charlie	    Brown	        IT	    80000	2020-07-01
    4	    Diana	    Miller	        Sales	65000	2023-05-10
    5	    Eve	        Davis	        HR	    70000	2022-11-01
    6	    Frank	    Green	        Sales	90000	2021-01-01
Scenario: We want to find employees who work in the 'Sales' department AND have a Salary greater than $70,000.

## SELECT
    FirstName,
    LastName,
    Department,
    Salary
## FROM
    Employees
## WHERE
    Department = 'Sales' AND Salary > 70000;

## the result
FirstName	LastName	Department	Salary
    Bob	    Johnson	        Sales	75000
    Frank	Green	        Sales	90000

## UPDATE
The UPDATE statement is used to change existing records in a table. You specify which table to update, what columns to change, and most importantly, which rows to apply those changes to using a WHERE clause.
Warning: Always be extremely careful with UPDATE statements, especially without a WHERE clause. If you omit the WHERE clause, the UPDATE will affect every single row in the table, which can lead to disastrous data loss or corruption if it's not what you intended.

## Scenario: Bob Johnson has received a raise! We need to update his salary to $80,000.

## UPDATE Employees
## SET
    Salary = 80000
## WHERE
    EmployeeID = 2; -- Target Bob specifically by his unique ID

## DELETE
The DELETE statement is used to remove one or more rows from a table. Similar to UPDATE, it's often used with a WHERE clause to specify which rows should be deleted.

Critical Warning: Just like UPDATE, if you omit the WHERE clause from a DELETE statement, you will delete every single row from the table, effectively emptying it. This is a very common and potentially disastrous mistake if not done intentionally. Always double-check your WHERE clause before executing a DELETE command.
Employees Table:

EmployeeID	FirstName	LastName	Department	Salary	StartDate
    1	    Alice	    Smith	        HR	    60000	2022-01-15
    2	    Bob	        Johnson	        Sales	75000	2021-03-20
    3	    Charlie	    Brown	        IT	    80000	2020-07-01
    4	    Diana	    Miller	        Sales	65000	2023-05-10
    5	    Eve	        Davis	        HR	    70000	2022-11-01
    6	    Frank	    Green	        Sales	90000	2021-01-01

## DELETE FROM Employees
## WHERE EmployeeID = 4; -- Target Diana specifically by her unique ID

## LIKE Operator
The LIKE operator is used in a WHERE clause to search for a specified pattern in a column. It's case-sensitive or insensitive depending on your database system's configuration.

Instead of looking for an exact match (like with = operator), LIKE allows you to find partial matches using special wildcard characters:

% (Percent Sign): Represents zero, one, or multiple characters.
'A%' means "starts with 'A'".
'%A' means "ends with 'A'".
'%A%' means "has 'A' anywhere in the string".
_ (Underscore): Represents a single character.
'A_C' means "starts with 'A', followed by any single character, then 'C'".

Products Table:

ProductID	ProductName	Price	CategoryID
    1	        Laptop	 1200	    1
    2	        Mouse	 25	        2
    3	        Keyboard 75	        2
    4	        Monitor	 300	    1
    5	      Headphones 150	    3
    6	        Webcam	 40	        2
    7	        Speaker	 90	        3
    8	        Router	 80	        1

## Scenario: You want to find all products whose names begin with the letter 'M'.

## SELECT
    ProductName,
    Price
## FROM
    Products
## WHERE
    ProductName LIKE 'M%';

## the result
ProductName	    Price
    Mouse	    25
    Monitor	    300

## ILIKE
The ILIKE operator is essentially a case-insensitive version of the LIKE operator. This means that when you use ILIKE, it doesn't matter if the characters in your pattern are uppercase or lowercase; it will find matches regardless.

Key Point: ILIKE is primarily supported by PostgreSQL and some other database systems. If you're using MySQL, SQL Server, or Oracle, the behavior of LIKE is often configured to be case-insensitive by default or can be made so using specific collation settings. However, ILIKE explicitly signifies case-insensitivity where it's supported.

Why use ILIKE?
Imagine you're searching for "apple" in a product list. If some entries are "Apple", "apple", and "APPLE", a case-sensitive LIKE 'apple' would only find "apple". ILIKE 'apple' (or LIKE '%apple%' with case-insensitive settings) would find all three.

## Scenario: You want to find all products that contain the sequence of letters "MOU" (regardless of their casing).

## SELECT
    ProductName,
    Price
## FROM
    Products
## WHERE
    ProductName ILIKE '%MOU%';

## the result
ProductName	    Price
mouse	        25
