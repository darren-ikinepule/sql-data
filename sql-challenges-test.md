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